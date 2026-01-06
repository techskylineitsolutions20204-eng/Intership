
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface LabInstance {
  id: string;
  name: string;
  type: string;
  status: 'offline' | 'provisioning' | 'online';
  tools: string[];
  specs: string;
  icon: string;
  latency?: string;
  uptime?: string;
}

interface MentorMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface SavedSession {
  id: string;
  labName: string;
  timestamp: string;
  logs: string[];
  notes: string;
}

const LiveLabs: React.FC = () => {
  const [labs, setLabs] = useState<LabInstance[]>([
    {
      id: 'gen-ai-sandbox',
      name: "Generative AI Sandbox",
      type: "NVIDIA Tesla A100 Instance",
      status: 'offline',
      tools: ['PyTorch', 'HuggingFace', 'LangChain', 'VectorDB'],
      specs: "80GB VRAM / 64GB RAM",
      icon: "fa-brain",
      latency: "0ms",
      uptime: "0%"
    },
    {
      id: 'fullstack-node',
      name: "Full Stack Node.js Node",
      type: "Ubuntu 22.04 LTS Container",
      status: 'offline',
      tools: ['Node.js', 'React 19', 'PostgreSQL', 'Redis'],
      specs: "4 vCPU / 8GB RAM",
      icon: "fa-layer-group",
      latency: "0ms",
      uptime: "0%"
    },
    {
      id: 'devsecops-pipeline',
      name: "DevSecOps Automation Lab",
      type: "Kubernetes Cluster Node",
      status: 'offline',
      tools: ['Docker', 'Terraform', 'Jenkins', 'SonarQube'],
      specs: "Shared K8s Cluster",
      icon: "fa-shield-halved",
      latency: "0ms",
      uptime: "0%"
    },
    {
      id: 'data-science-env',
      name: "Data Intelligence Hub",
      type: "Jupyter Enterprise Node",
      status: 'offline',
      tools: ['Pandas', 'Spark', 'TensorFlow', 'Tableau SDK'],
      specs: "Memory Optimized Instance",
      icon: "fa-chart-pie",
      latency: "0ms",
      uptime: "0%"
    }
  ]);

  const [activeLab, setActiveLab] = useState<LabInstance | null>(null);
  const [labStatus, setLabStatus] = useState<'idle' | 'loading' | 'active' | 'reviewing'>('idle');
  const [reviewSession, setReviewSession] = useState<SavedSession | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [bootProgress, setBootProgress] = useState(0);
  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([]);
  const [sessionNotes, setSessionNotes] = useState<string>("Initializing session notes...");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'saved'>('idle');
  const [isSyncing, setIsSyncing] = useState(false);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [globalUptime, setGlobalUptime] = useState("99.98%");
  
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Real-time status fetcher via AI Simulation
  const fetchRealTimeStatus = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const labIds = labs.map(l => l.id);
    
    const prompt = `You are a Cloud Infrastructure Health Monitor. Analyze the current state of these 4 lab instances: ${labIds.join(', ')}. 
    Return a JSON object with "statuses" (an array) where each item has "id", "status" (online, offline, provisioning), "latency" (e.g., "14ms"), and "uptime" (e.g., "99.9%").
    Be realistic: Mostly online, maybe 1 offline for maintenance. If a lab is provisioning, it stays provisioning for a few cycles.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              statuses: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    status: { type: Type.STRING },
                    latency: { type: Type.STRING },
                    uptime: { type: Type.STRING }
                  },
                  required: ["id", "status", "latency", "uptime"]
                }
              },
              overallHealth: { type: Type.STRING }
            },
            required: ["statuses", "overallHealth"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      
      if (data.statuses) {
        setLabs(currentLabs => currentLabs.map(lab => {
          // Don't update the status of the lab the user is currently using
          if (activeLab?.id === lab.id) return lab;
          
          const update = data.statuses.find((s: any) => s.id === lab.id);
          if (update) {
            return { 
              ...lab, 
              status: update.status as any,
              latency: update.latency,
              uptime: update.uptime
            };
          }
          return lab;
        }));
        setGlobalUptime(data.overallHealth || "99.99%");
      }
    } catch (error) {
      console.error("Infrastructure Sync Error:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [activeLab, labs]);

  useEffect(() => {
    fetchRealTimeStatus();
    const interval = setInterval(fetchRealTimeStatus, 30000); // Pulse every 30s
    const stored = localStorage.getItem('skyline_recorded_sessions');
    if (stored) setSavedSessions(JSON.parse(stored));
    return () => clearInterval(interval);
  }, []); // Only run on mount to start the cycle

  const startLab = (lab: LabInstance) => {
    setLabs(prev => prev.map(l => l.id === lab.id ? { ...l, status: 'provisioning' } : l));
    setActiveLab(lab);
    setLabStatus('loading');
    setBootProgress(0);
    setRecordingStatus('idle');
    setShowExitModal(false);
    setTerminalLogs([
      `[AUTH] Authenticating session for TechSkyline Node...`,
      `[PROVISION] Requesting ${lab.type} resource...`,
      `[NETWORK] Establishing secure gRPC tunnel...`
    ]);

    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLabStatus('active');
          setLabs(currentLabs => currentLabs.map(l => l.id === lab.id ? { ...l, status: 'online' } : l));
          setTerminalLogs(logs => [...logs, `[SYSTEM] Instance [${lab.id}] is now ONLINE.`, `Welcome to TechSkyline Cloud Shell. Practice session started.`]);
          
          setTimeout(() => {
            setMentorMessages([
              { 
                id: '1', 
                sender: 'Lead Architect', 
                text: `Welcome to the ${lab.name} session. I'll be monitoring your progress. Start by auditing the environment.`, 
                timestamp: new Date().toLocaleTimeString() 
              }
            ]);
            setSessionNotes(`Session: ${lab.name}\nDate: ${new Date().toLocaleDateString()}\nStatus: Live Interaction Active\n\nNotes:\n1. Environment initialized with ${lab.specs}\n2. Monitoring system audit logs...`);
          }, 1000);
          
          return 100;
        }
        return prev + 10;
      });
      
      const bootMessages = [
        "[DISK] Mounting persistent NVMe storage...",
        "[ENV] Injecting industry-standard datasets...",
        "[SECURITY] Applying IAM policies...",
        "[NETWORK] Finalizing ingress rules...",
        "[ALLOC] Reserved memory segments verified."
      ];
      setTerminalLogs(logs => [...logs, bootMessages[Math.floor(Math.random() * bootMessages.length)]]);
    }, 400);
  };

  const saveCurrentSession = () => {
    const sessionData: SavedSession = {
      id: `session_${Date.now()}`,
      labName: activeLab?.name || 'Unknown Lab',
      timestamp: new Date().toISOString(),
      logs: terminalLogs,
      notes: sessionNotes
    };
    
    const existingSessionsStr = localStorage.getItem('skyline_recorded_sessions');
    const existingSessions = existingSessionsStr ? JSON.parse(existingSessionsStr) : [];
    const updatedSessions = [...existingSessions, sessionData];
    localStorage.setItem('skyline_recorded_sessions', JSON.stringify(updatedSessions));
    setSavedSessions(updatedSessions);
    return sessionData;
  };

  const closeLab = (save: boolean = false) => {
    if (save) saveCurrentSession();
    if (activeLab) setLabs(prev => prev.map(l => l.id === activeLab.id ? { ...l, status: 'offline' } : l));
    
    setLabStatus('idle');
    setActiveLab(null);
    setTerminalLogs([]);
    setMentorMessages([]);
    setSessionNotes("");
    setIsRecording(false);
    setReviewSession(null);
    setShowExitModal(false);
    
    const stored = localStorage.getItem('skyline_recorded_sessions');
    if (stored) setSavedSessions(JSON.parse(stored));
    // Immediately trigger a sync to update the grid
    fetchRealTimeStatus();
  };

  const toggleRecording = () => {
    if (isRecording) {
      saveCurrentSession();
      setIsRecording(false);
      setRecordingStatus('saved');
      setTimeout(() => setRecordingStatus('idle'), 3000);
    } else {
      setIsRecording(true);
      setRecordingStatus('recording');
    }
  };

  const handleTerminalCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!terminalInputRef.current) return;
    const cmd = terminalInputRef.current.value.trim();
    if (!cmd) return;

    setTerminalLogs(prev => [...prev, `root@skyline:~# ${cmd}`]);
    terminalInputRef.current.value = '';

    setTimeout(() => {
      let response = `Command '${cmd}' executed successfully.`;
      if (cmd === 'ls') response = `bin/  etc/  projects/  scripts/  var/`;
      if (cmd === 'neofetch') response = `OS: TechSkyline OS v2026\nKernel: 6.8.0-skyline-pro\nShell: zsh 5.9\nCPU: AMD EPYC 7763 (16) @ 3.500GHz\nMemory: 2.4GiB / 64GiB`;
      
      setTerminalLogs(prev => [...prev, response]);

      if (cmd.includes('npm') || cmd.includes('python')) {
        setMentorMessages(prev => [
          ...prev, 
          { id: Date.now().toString(), sender: 'Mentor AI', text: `I noticed you're using ${cmd.split(' ')[0]}. Ensure your dependencies are pinned for the production build.`, timestamp: new Date().toLocaleTimeString() }
        ]);
      }
    }, 300);
  };

  const viewRecordedSession = (session: SavedSession) => {
    setReviewSession(session);
    setLabStatus('reviewing');
  };

  const addTimestamp = () => {
    const ts = `\n[${new Date().toLocaleTimeString()}] `;
    setSessionNotes(prev => prev + ts);
    setTimeout(() => notesRef.current?.focus(), 10);
  };

  const clearNotes = () => {
    if (window.confirm("Clear all session notes?")) setSessionNotes("");
  };

  const generateAISummary = async () => {
    if (isSummarizing || terminalLogs.length < 5) return;
    setIsSummarizing(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Based on these terminal logs from a ${activeLab?.name} session, provide a 3-sentence technical summary of the activities and achievements for my session notes: \n\n${terminalLogs.slice(-20).join('\n')}`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      const summary = response.text || "AI analysis unavailable.";
      setSessionNotes(prev => prev + `\n\n--- AI SESSION SUMMARY ---\n${summary}\n`);
    } catch (error) {
      console.error("AI Summary Error:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  if (labStatus === 'reviewing' && reviewSession) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in-up">
        <div className="h-14 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Reviewing Session</span>
            <span className="text-xs text-white font-bold">{reviewSession.labName}</span>
          </div>
          <button onClick={() => closeLab(false)} className="text-slate-400 hover:text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">
            Close Review
          </button>
        </div>
        <div className="flex-grow flex overflow-hidden">
          <div className="w-80 bg-slate-900 border-r border-white/5 p-6 overflow-y-auto">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Saved Session Notes</h3>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 font-mono text-[11px] text-emerald-500/80 whitespace-pre-wrap leading-relaxed">
              {reviewSession.notes}
            </div>
          </div>
          <div className="flex-grow bg-black p-8 overflow-y-auto font-mono text-xs">
            <div className="text-slate-500 mb-4 border-b border-white/5 pb-2 uppercase tracking-widest">Recorded Terminal History</div>
            {reviewSession.logs.map((log, i) => (
              <div key={i} className="mb-1">
                {log.startsWith('root@skyline') ? <span className="text-emerald-500">{log}</span> : <span className="text-slate-300">{log}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (labStatus === 'active' && activeLab) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in-up">
        <div className="h-14 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest text-white">{activeLab.name} - INTERACTIVE MODE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={toggleRecording}
               className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border shadow-lg ${
                 isRecording 
                   ? 'bg-red-600/10 border-red-500/50 text-red-500 hover:bg-red-600/20' 
                   : recordingStatus === 'saved'
                   ? 'bg-emerald-600/10 border-emerald-500/50 text-emerald-500'
                   : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
               }`}
             >
               {isRecording && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>}
               <i className={`fa-solid ${recordingStatus === 'saved' ? 'fa-check' : 'fa-record-vinyl'}`}></i>
               {isRecording ? 'Stop Recording' : recordingStatus === 'saved' ? 'Saved to Hub' : 'Record Session'}
             </button>
             <div className="h-6 w-px bg-white/10 mx-1"></div>
             <button 
               onClick={() => setShowExitModal(true)}
               className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
             >
               End Practice
             </button>
          </div>
        </div>

        {showExitModal && (
          <div className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-card rounded-[2.5rem] max-w-md w-full p-10 border-white/10 shadow-2xl animate-fade-in-up">
              <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mb-6 mx-auto text-red-500">
                <i className="fa-solid fa-power-off text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black text-white text-center mb-4 uppercase tracking-tight">Terminate Session?</h3>
              <p className="text-slate-400 text-center mb-8 leading-relaxed">
                Save your logs and interactive notes to the Recording Hub before closing this instance?
              </p>
              <div className="flex flex-col gap-3">
                <button onClick={() => closeLab(true)} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg flex items-center justify-center gap-2">
                  <i className="fa-solid fa-cloud-arrow-up"></i> Save & Exit Session
                </button>
                <button onClick={() => closeLab(false)} className="w-full py-4 bg-white/5 hover:bg-red-600 hover:text-white text-slate-400 rounded-xl font-black uppercase tracking-widest text-xs transition-all border border-white/5">
                  Exit Without Saving
                </button>
                <button onClick={() => setShowExitModal(false)} className="w-full py-3 text-slate-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                  Continue Practicing
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-grow flex overflow-hidden">
          <div className="w-80 bg-slate-900 border-r border-white/5 flex flex-col hidden lg:flex">
             <div className="flex-1 p-6 overflow-y-auto border-b border-white/5">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Live Mentor Feedback</h3>
                <div className="space-y-4">
                  {mentorMessages.map(msg => (
                    <div key={msg.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 animate-fade-in-up">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{msg.sender}</span>
                          <span className="text-[8px] text-slate-600 font-bold">{msg.timestamp}</span>
                       </div>
                       <p className="text-[11px] text-slate-300 leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>
             </div>

             <div className="h-80 bg-black/40 flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interactive Notes</h3>
                   <div className="flex gap-2">
                      <button onClick={addTimestamp} title="Add Timestamp" className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                         <i className="fa-solid fa-clock"></i>
                      </button>
                      <button onClick={generateAISummary} title="AI Summarize Session" disabled={isSummarizing} className={`w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] transition-all ${isSummarizing ? 'text-indigo-400 animate-spin' : 'text-slate-400 hover:text-white hover:bg-indigo-600'}`}>
                         <i className="fa-solid fa-wand-sparkles"></i>
                      </button>
                      <button onClick={clearNotes} title="Clear Notes" className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all">
                         <i className="fa-solid fa-trash-can"></i>
                      </button>
                   </div>
                </div>
                <textarea ref={notesRef} className="flex-grow w-full bg-transparent border-none outline-none p-4 text-[11px] font-mono text-emerald-500/80 resize-none leading-relaxed placeholder:text-slate-700" value={sessionNotes} onChange={(e) => setSessionNotes(e.target.value)} placeholder="Draft your session insights here..." />
             </div>
          </div>

          <div className="flex-grow flex flex-col">
            <div className="flex-grow bg-[#1e1e1e] relative overflow-hidden">
               <div className="h-10 bg-[#252526] border-b border-white/5 flex items-center px-4">
                  <div className="bg-[#1e1e1e] px-4 h-full flex items-center gap-2 border-r border-white/5">
                     <i className="fa-brands fa-react text-blue-400 text-xs"></i>
                     <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">SkylineApp.tsx</span>
                  </div>
               </div>
               <div className="p-8 font-mono text-xs leading-6 overflow-auto max-h-full">
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">1</span><span className="text-blue-400">import</span> <span className="text-indigo-300">React</span> <span className="text-blue-400">from</span> <span className="text-emerald-400">'react'</span>;</div>
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">2</span><span className="text-slate-500">// Real-time collaborative IDE enabled</span></div>
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">3</span><span className="text-purple-400">const</span> <span className="text-yellow-300">InteractiveSession</span> = () =&gt; &#123;</div>
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">4</span>&nbsp;&nbsp;<span className="text-blue-400">return</span> (</div>
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">5</span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">div</span> <span className="text-amber-300">className</span>=<span className="text-emerald-400">"practice-mode"</span>&gt;</div>
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">6</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-200">Session ID: {activeLab.id}</span></div>
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">7</span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-red-400">div</span>&gt;</div>
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">8</span>&nbsp;&nbsp;);</div>
                  <div className="flex"><span className="w-8 text-slate-600 text-right pr-4 select-none">9</span>&#125;;</div>
               </div>
            </div>

            <div className="h-72 bg-black border-t border-white/10 flex flex-col">
               <div className="h-8 bg-slate-900 border-b border-white/10 flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Skyline Interactive Shell v2026</span>
                    {isRecording && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 rounded text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span> Recording Active
                      </div>
                    )}
                  </div>
               </div>
               <div className="flex-grow p-4 font-mono text-[11px] overflow-y-auto space-y-1">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="text-slate-300 whitespace-pre-wrap">
                      {log.startsWith('root@skyline') ? <span className="text-emerald-500 font-bold">{log}</span> : log}
                    </div>
                  ))}
                  <form onSubmit={handleTerminalCommand} className="flex items-center">
                    <span className="text-emerald-500 font-bold mr-2">root@skyline:~#</span>
                    <input ref={terminalInputRef} className="bg-transparent border-none outline-none text-white w-full" autoFocus />
                  </form>
                  <div ref={terminalEndRef} />
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (labStatus === 'loading' && activeLab) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 animate-fade-in-up">
        <div className="w-full max-w-md">
           <div className="mb-12 text-center">
             <div className="w-20 h-20 bg-indigo-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
                <i className={`fa-solid ${activeLab.icon} text-3xl text-indigo-400`}></i>
             </div>
             <h2 className="text-3xl font-black text-white mb-2">Booting Environment</h2>
             <p className="text-slate-500">Provisioning your dedicated {activeLab.name}...</p>
           </div>
           <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                <span>Instance Health Check</span>
                <span className="text-indigo-400">{bootProgress}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${bootProgress}%` }}></div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center px-4 py-2 glass-card text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <i className="fa-solid fa-terminal mr-2"></i>
              Active Learning Nodes
            </div>
            <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Interactive <span className="text-blue-500">Practice Mode</span></h2>
            <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
              Launch dedicated lab instances for hands-on technical sessions. Status is updated in real-time via our AI-driven Infrastructure Monitor.
            </p>
          </div>
          
          {/* Infrastructure Health Dashboard */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6 glass-card px-8 py-4 rounded-3xl border-white/5 shadow-2xl">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Uptime</span>
                <span className="text-lg font-black text-white">{globalUptime}</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Nodes</span>
                <span className="text-lg font-black text-emerald-400">{labs.filter(l => l.status === 'online').length}</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {isSyncing ? 'Syncing...' : 'Real-time'}
                </span>
              </div>
            </div>
            {isSyncing && (
              <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest text-right animate-pulse">
                Fetching Infrastructure Heartbeat...
              </div>
            )}
          </div>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {labs.map((lab) => (
            <div key={lab.id} className="glass-card rounded-[3rem] p-10 border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all group relative">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-white border border-white/10 group-hover:border-indigo-500/50 group-hover:scale-105 transition-all">
                    <i className={`fa-solid ${lab.icon}`}></i>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                      lab.status === 'online' ? 'text-emerald-400' : 
                      lab.status === 'provisioning' ? 'text-amber-400' : 'text-slate-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${lab.status === 'online' ? 'bg-emerald-500' : lab.status === 'provisioning' ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`}></span>
                      {lab.status === 'online' ? 'Operational' : lab.status === 'provisioning' ? 'Provisioning' : 'Maintenance'}
                    </span>
                    <div className="flex gap-3 mt-1">
                       <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Lat: <span className="text-slate-400">{lab.latency}</span></span>
                       <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Up: <span className="text-slate-400">{lab.uptime}</span></span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2">{lab.name}</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-6">{lab.type}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {lab.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-600/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/10">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => startLab(lab)}
                disabled={lab.status !== 'online'}
                className="w-full py-5 bg-white hover:bg-indigo-600 text-slate-950 hover:text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {lab.status === 'online' ? 'Launch Node' : lab.status === 'provisioning' ? 'Booting...' : 'Maintenance'}
                {lab.status === 'online' && <i className="fa-solid fa-play text-[10px]"></i>}
              </button>
            </div>
          ))}
        </div>

        {/* Recording Hub Section */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-12">
            <div>
               <h3 className="text-3xl font-black text-white mb-2">Practice Recording <span className="text-indigo-500">Hub</span></h3>
               <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Revisit your technical practice history</p>
            </div>
            <i className="fa-solid fa-clock-rotate-left text-3xl text-slate-800"></i>
          </div>

          {savedSessions.length === 0 ? (
            <div className="p-16 glass-card rounded-[3rem] border-dashed border-white/5 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
                <i className="fa-solid fa-database text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">No Saved Sessions</h4>
              <p className="text-slate-500 max-w-sm mx-auto">Start a live practice lab and use the 'Record Session' tool to save your work logs and notes here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSessions.map((session) => (
                <div key={session.id} className="glass-card rounded-[2.5rem] p-8 border-white/5 hover:border-white/10 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                        <i className="fa-solid fa-file-waveform"></i>
                      </div>
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{new Date(session.timestamp).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{session.labName}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Saved Practice Data</p>
                    <p className="text-xs text-slate-400 line-clamp-2 italic">"{session.notes.substring(0, 100)}..."</p>
                  </div>
                  <button 
                    onClick={() => viewRecordedSession(session)}
                    className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 group-hover:border-indigo-500/50"
                  >
                    View Recording
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveLabs;
