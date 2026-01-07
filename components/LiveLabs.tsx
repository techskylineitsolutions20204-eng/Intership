
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
  const [sessionNotes, setSessionNotes] = useState<string>("");
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

  const fetchRealTimeStatus = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const labIds = labs.map(l => l.id);
    
    const prompt = `Act as an Infrastructure Health Monitor. Return JSON statuses for: ${labIds.join(', ')}. Include latency and uptime. Mostly online.`;

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
          if (activeLab?.id === lab.id) return lab;
          const update = data.statuses.find((s: any) => s.id === lab.id);
          if (update) return { ...lab, status: update.status as any, latency: update.latency, uptime: update.uptime };
          return lab;
        }));
        setGlobalUptime(data.overallHealth || "99.99%");
      }
    } catch (error) {
      console.error("Health Monitor Sync Error:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [activeLab, labs]);

  useEffect(() => {
    fetchRealTimeStatus();
    const interval = setInterval(fetchRealTimeStatus, 30000);
    const stored = localStorage.getItem('skyline_recorded_sessions');
    if (stored) setSavedSessions(JSON.parse(stored));
    return () => clearInterval(interval);
  }, []);

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
          setTerminalLogs(logs => [...logs, `[SYSTEM] Instance [${lab.id}] is now ONLINE.`, `Practice session initialized.`]);
          
          setTimeout(() => {
            setMentorMessages([
              { 
                id: '1', 
                sender: 'Lead Architect', 
                text: `Session active on ${lab.name}. Start auditing the local services.`, 
                timestamp: new Date().toLocaleTimeString() 
              }
            ]);
            setSessionNotes(`--- SESSION: ${lab.name} ---\nTIME: ${new Date().toLocaleString()}\nSPECS: ${lab.specs}\n\n[LOG START]\n1. Infrastructure audit complete.\n2. Service mesh connected.\n\nNOTES: `);
          }, 1000);
          
          return 100;
        }
        return prev + 10;
      });
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
    setLabStatus('idle');
    setActiveLab(null);
    setTerminalLogs([]);
    setMentorMessages([]);
    setSessionNotes("");
    setIsRecording(false);
    setShowExitModal(false);
    fetchRealTimeStatus();
  };

  const handleTerminalCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!terminalInputRef.current) return;
    const cmd = terminalInputRef.current.value.trim();
    if (!cmd) return;

    setTerminalLogs(prev => [...prev, `root@skyline:~# ${cmd}`]);
    terminalInputRef.current.value = '';

    setTimeout(() => {
      let response = `Command '${cmd}' completed successfully.`;
      if (cmd === 'ls') response = `bin/  etc/  projects/  scripts/  var/`;
      if (cmd === 'neofetch') response = `OS: TechSkyline OS v2026\nKernel: 6.8.0-skyline-pro\nShell: zsh 5.9\nCPU: AMD EPYC 7763 (16) @ 3.500GHz\nMemory: 2.4GiB / 64GiB`;
      setTerminalLogs(prev => [...prev, response]);
    }, 300);
  };

  const addTimestamp = () => {
    const ts = `\n[${new Date().toLocaleTimeString()}] `;
    setSessionNotes(prev => prev + ts);
    setTimeout(() => notesRef.current?.focus(), 10);
  };

  const generateAISummary = async () => {
    if (isSummarizing || terminalLogs.length < 5) return;
    setIsSummarizing(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Summarize these terminal activities into technical session notes: \n\n${terminalLogs.slice(-20).join('\n')}`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      const summary = response.text || "AI analysis failed.";
      setSessionNotes(prev => prev + `\n\n--- AI AUTO-SUMMARY ---\n${summary}\n`);
    } catch (error) {
      console.error("AI Summary Error:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  if (labStatus === 'active' && activeLab) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in-up">
        {/* Lab Toolbar */}
        <div className="h-14 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-white">{activeLab.name} [LIVE]</span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setShowExitModal(true)} className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">
               Terminate Session
             </button>
          </div>
        </div>

        {showExitModal && (
          <div className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-card rounded-[2.5rem] max-w-md w-full p-10 border-white/10 shadow-2xl">
              <h3 className="text-2xl font-black text-white text-center mb-4 uppercase tracking-tight">End Session?</h3>
              <p className="text-slate-400 text-center mb-8">Save your interactive notes and terminal logs to the Hub?</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => closeLab(true)} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                  <i className="fa-solid fa-cloud-arrow-up"></i> Save & Exit
                </button>
                <button onClick={() => closeLab(false)} className="w-full py-4 bg-white/5 text-slate-400 rounded-xl font-black uppercase tracking-widest text-xs transition-all border border-white/5">
                  Discard & Exit
                </button>
                <button onClick={() => setShowExitModal(false)} className="w-full py-3 text-slate-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-grow flex overflow-hidden">
          {/* Notes & Mentor Sidebar */}
          <div className="w-96 bg-slate-900 border-r border-white/5 flex flex-col">
             <div className="flex-grow flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
                   <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Interactive Session Notes</h3>
                   <div className="flex gap-2">
                      <button onClick={addTimestamp} className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                         <i className="fa-solid fa-clock"></i>
                      </button>
                      <button onClick={generateAISummary} disabled={isSummarizing} className={`w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] transition-all ${isSummarizing ? 'text-indigo-400 animate-spin' : 'text-slate-400 hover:text-white hover:bg-indigo-600'}`}>
                         <i className="fa-solid fa-wand-sparkles"></i>
                      </button>
                   </div>
                </div>
                {/* FULLY EDITABLE TEXTAREA */}
                <textarea 
                  ref={notesRef} 
                  className="flex-grow w-full bg-slate-950 border-none outline-none p-6 text-[12px] font-mono text-emerald-500/90 resize-none leading-relaxed placeholder:text-slate-800" 
                  value={sessionNotes} 
                  onChange={(e) => setSessionNotes(e.target.value)} 
                  placeholder="Record your observations here. Notes are saved automatically to your profile upon termination." 
                />
             </div>
             <div className="h-48 border-t border-white/5 p-4 overflow-y-auto bg-black/20">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Live Intelligence Feed</span>
                {mentorMessages.map(msg => (
                  <div key={msg.id} className="text-[11px] text-slate-400 mb-2 p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-indigo-400 font-bold mr-2">[{msg.sender}]:</span> {msg.text}
                  </div>
                ))}
             </div>
          </div>

          {/* IDE & Terminal */}
          <div className="flex-grow flex flex-col">
            <div className="flex-grow bg-[#1a1a1a] p-10 font-mono text-xs overflow-auto">
               <div className="text-slate-500 mb-4 border-b border-white/5 pb-2 uppercase tracking-widest">Main Workspace</div>
               <div className="text-blue-400">import</div> <span className="text-indigo-300">LabInstance</span> <span className="text-blue-400">from</span> <span className="text-emerald-400">'@skyline/infra'</span>;
               <br/><br/>
               <span className="text-purple-400">const</span> <span className="text-yellow-300">LiveEnvironment</span> = () =&gt; &#123;
               <br/>&nbsp;&nbsp;<span className="text-slate-500">// Interactive training node active</span>
               <br/>&nbsp;&nbsp;<span className="text-blue-400">return</span> (
               <br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">Environment</span> <span className="text-amber-300">id</span>=<span className="text-emerald-400">"{activeLab.id}"</span> /&gt;
               <br/>&nbsp;&nbsp;);
               <br/>&#125;;
            </div>
            <div className="h-64 bg-black border-t border-white/10 flex flex-col">
               <div className="flex-grow p-4 font-mono text-[11px] overflow-y-auto space-y-1">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="text-slate-300">
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

  if (labStatus === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Provisioning Environment</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Heartbeat Pulse: {bootProgress}%</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Hardware Synthesis</span>
            <h2 className="text-5xl font-black text-white mb-6">Interactive <span className="text-indigo-500">Practice Nodes</span></h2>
            <p className="text-slate-400 max-w-2xl text-lg">Deploy into dedicated enterprise environments. All session notes are synced to your intern transcript automatically.</p>
          </div>
          <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-6 border-white/5">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Uptime</span>
              <span className="text-lg font-black text-white">{globalUptime}</span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Pulse</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {labs.map((lab) => (
            <div key={lab.id} className="glass-card rounded-[2.5rem] p-10 border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-white border border-white/10 group-hover:border-indigo-500/50 group-hover:scale-105 transition-all">
                    <i className={`fa-solid ${lab.icon}`}></i>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                      lab.status === 'online' ? 'text-emerald-400' : 'text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${lab.status === 'online' ? 'bg-emerald-500' : 'bg-slate-600'}`}></span>
                      {lab.status === 'online' ? 'Available' : 'Maintenance'}
                    </span>
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Lat: {lab.latency}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{lab.name}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">{lab.type}</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {lab.tools.map(tool => (
                    <span key={tool} className="px-3 py-1 bg-indigo-600/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/10">{tool}</span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => startLab(lab)}
                disabled={lab.status !== 'online'}
                className="w-full py-5 bg-white hover:bg-indigo-600 text-slate-950 hover:text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all disabled:opacity-30 flex items-center justify-center gap-3"
              >
                Launch Learning Node
                <i className="fa-solid fa-play text-[10px]"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveLabs;
