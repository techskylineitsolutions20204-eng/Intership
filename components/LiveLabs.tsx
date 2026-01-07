
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
  embedId?: string; // For recorded walkthroughs
  tasks: string[];
}

interface MentorMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const LiveLabs: React.FC = () => {
  const [labs, setLabs] = useState<LabInstance[]>([
    {
      id: 'agentic-ai-sandbox',
      name: "Agentic AI & GenAI Lab",
      type: "Multi-Agent Systems Sandbox",
      status: 'offline',
      tools: ['CrewAI', 'AutoGen', 'LangChain', 'Gemini SDK'],
      specs: "High-Compute GPU Cluster / Python 3.12",
      icon: "fa-robot",
      latency: "0ms",
      uptime: "0%",
      embedId: "q6f_N7J-ZWA",
      tasks: [
        "Initialize CrewAI Orchestrator",
        "Define Autonomous Tool Definitions",
        "Test Multi-agent Collaboration Loop",
        "Audit Agent ReAct reasoning traces"
      ]
    },
    {
      id: 'sap-h4-hana',
      name: "Sap H4 Hana Cloud Hub",
      type: "High-Performance ERP Practice",
      status: 'offline',
      tools: ['S/4HANA', 'ABAP Cloud', 'Fiori', 'HANA DB'],
      specs: "256GB RAM / 128 vCPU / Dedicated VM",
      icon: "fa-database",
      latency: "0ms",
      uptime: "0%",
      embedId: "wS9S_O908yU",
      tasks: [
        "Initialize S/4HANA Instance",
        "Verify Fiori App Deployment",
        "Audit ABAP Cloud Logs",
        "Validate HANA DB Memory Segments"
      ]
    },
    {
      id: 'oracle-p6-unifier',
      name: "Oracle P6 & Unifier Node",
      type: "Project Controls Mastery",
      status: 'offline',
      tools: ['Oracle P6', 'Primavera Unifier', 'BI Publisher'],
      specs: "Windows Server 2022 / Enterprise Access",
      icon: "fa-calendar-check",
      latency: "0ms",
      uptime: "0%",
      embedId: "i_LwzRVP7bg",
      tasks: [
        "Establish Baseline Project Plan",
        "Sync Unifier Business Processes",
        "Generate Global Resource Report",
        "Export Primavera XML Template"
      ]
    },
    {
      id: 'cyber-sec-devops',
      name: "Cyber Security & DevOps Lab",
      type: "DevSecOps Infrastructure",
      status: 'offline',
      tools: ['AWS', 'Azure', 'Kubernetes', 'Kali'],
      specs: "Hardened Container Hub",
      icon: "fa-shield-halved",
      latency: "0ms",
      uptime: "0%",
      embedId: "q6f_N7J-ZWA",
      tasks: [
        "Audit AWS IAM Roles",
        "Setup Azure DevOps CI/CD Tunnel",
        "Penetrate Isolated Staging Node",
        "Hardening K8s Network Policies"
      ]
    }
  ]);

  const [activeLab, setActiveLab] = useState<LabInstance | null>(null);
  const [labMode, setLabMode] = useState<'live' | 'recorded' | 'idle'>('idle');
  const [labStatus, setLabStatus] = useState<'idle' | 'loading' | 'active'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [bootProgress, setBootProgress] = useState(0);
  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([]);
  const [sessionNotes, setSessionNotes] = useState<string>("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [globalUptime, setGlobalUptime] = useState("99.98%");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
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
    const prompt = `Act as an Infra Monitor. Returns JSON statuses (online, offline, provisioning), latency, uptime for: ${labs.map(l => l.id).join(', ')}.`;
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
                  }
                }
              }
            }
          }
        }
      });
      const data = JSON.parse(response.text || "{}");
      if (data.statuses) {
        setLabs(current => current.map(lab => {
          if (activeLab?.id === lab.id) return lab;
          const update = data.statuses.find((s: any) => s.id === lab.id);
          return update ? { ...lab, ...update } : lab;
        }));
      }
    } catch (e) { console.error(e); } finally { setIsSyncing(false); }
  }, [activeLab, labs]);

  useEffect(() => {
    fetchRealTimeStatus();
    const interval = setInterval(fetchRealTimeStatus, 25000);
    return () => clearInterval(interval);
  }, []);

  const startLab = (lab: LabInstance, mode: 'live' | 'recorded') => {
    setActiveLab(lab);
    setLabMode(mode);
    setCompletedTasks([]);
    
    if (mode === 'live') {
      setLabStatus('loading');
      setBootProgress(0);
      setTerminalLogs([`[AUTH] Authenticating...`, `[PROVISION] Requesting ${lab.specs}...`]);
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setLabStatus('active');
            setTerminalLogs(logs => [...logs, `[SYSTEM] Instance ONLINE. Ready for ${lab.name} practice.`]);
            setSessionNotes(`--- ${lab.name} LIVE NOTES ---\n\nOBJECTIVES:\n${lab.tasks.map(t => `- [ ] ${t}`).join('\n')}\n\nTECHNICAL NOTES:\n`);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    } else {
      setLabStatus('active');
    }
  };

  const closeLab = () => {
    setLabStatus('idle');
    setActiveLab(null);
    setLabMode('idle');
    setTerminalLogs([]);
    setMentorMessages([]);
  };

  const toggleTask = (task: string) => {
    setCompletedTasks(prev => prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]);
    setTerminalLogs(prev => [...prev, `[USER] Task Completed: ${task}`]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInputRef.current?.value.trim();
    if (!cmd) return;
    setTerminalLogs(prev => [...prev, `root@skyline:~# ${cmd}`]);
    if (terminalInputRef.current) terminalInputRef.current.value = '';
    
    setTimeout(() => {
      let resp = `Command '${cmd}' not found. Try 'ls' or 'status'.`;
      if (cmd === 'ls') resp = `configs/  tasks.md  logs/  production/`;
      if (cmd === 'status') resp = `ID: ${activeLab?.id}\nHEALTH: OPTIMAL\nUPTIME: 0h 12m\nNODES: 3`;
      if (cmd === 'clear') { setTerminalLogs([]); return; }
      setTerminalLogs(prev => [...prev, resp]);
    }, 200);
  };

  if (labStatus === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 animate-fade-in-up">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Provisioning Hardware</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Heartbeat: {bootProgress}%</p>
      </div>
    );
  }

  if (labStatus === 'active' && activeLab) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-slate-900 border-b border-white/5 flex items-center justify-between px-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${labMode === 'live' ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_emerald]' : 'bg-indigo-500'}`}></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">{activeLab.name} - {labMode === 'live' ? 'LIVE LAB' : 'EXPERT RECORDING'}</span>
            </div>
          </div>
          <button onClick={closeLab} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
            Exit Session
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* Left Panel: Tasks & Notes */}
          <div className="w-96 bg-slate-900 border-r border-white/5 flex flex-col overflow-hidden">
             <div className="p-6 border-b border-white/5 flex-shrink-0">
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Lab Manual & Tasks</h3>
                <div className="space-y-3">
                  {activeLab.tasks.map(task => (
                    <button 
                      key={task} 
                      onClick={() => toggleTask(task)}
                      className={`w-full text-left p-3 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-3 ${
                        completedTasks.includes(task) ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <i className={`fa-solid ${completedTasks.includes(task) ? 'fa-check-circle' : 'fa-circle-notch text-slate-700'}`}></i>
                      {task}
                    </button>
                  ))}
                </div>
             </div>
             <div className="flex-grow flex flex-col p-6 min-h-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Live Interactive Notes</h3>
                  <span className="text-[8px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded font-black uppercase">Auto-Syncing</span>
                </div>
                <textarea 
                  value={sessionNotes} 
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="flex-grow w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-xs font-mono text-emerald-500/80 outline-none resize-none leading-relaxed" 
                  placeholder="Record observations, configs, or technical findings here..."
                />
             </div>
          </div>

          {/* Center Content: IDE/Video */}
          <div className="flex-grow flex flex-col bg-[#1e1e1e]">
             <div className="flex-grow overflow-auto relative">
                {labMode === 'recorded' ? (
                  <div className="w-full h-full bg-black">
                    <iframe 
                      className="w-full h-full" 
                      src={`https://www.youtube.com/embed/${activeLab.embedId}?autoplay=1&modestbranding=1`} 
                      frameBorder="0" 
                      allow="autoplay; encrypted-media" 
                      allowFullScreen 
                    />
                  </div>
                ) : (
                  <div className="p-10 font-mono text-[13px] leading-7">
                    <div className="text-slate-600 mb-6 border-b border-white/5 pb-2 uppercase tracking-widest text-[10px]">Production Workspace - {activeLab.id}</div>
                    <span className="text-blue-400"># Cloud Infrastructure for {activeLab.name}</span><br/>
                    <span className="text-purple-400">module</span> <span className="text-yellow-300">SkylineNetwork</span> &#123;<br/>
                    &nbsp;&nbsp;<span className="text-blue-400">def</span> <span className="text-emerald-400">initialize_env</span>() &#123;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Deploying tools: {activeLab.tools.join(', ')}</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;verify_hardware(specs: <span className="text-amber-300">"{activeLab.specs}"</span>)<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> <span className="text-emerald-500">"STABLE"</span><br/>
                    &nbsp;&nbsp;&#125;<br/>
                    &#125;
                    <br/><br/>
                    <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-emerald-400">
                      <i className="fa-solid fa-circle-info mr-2"></i>
                      Environment is healthy. Proceed with task audit.
                    </div>
                  </div>
                )}
             </div>

             {/* Terminal Footer */}
             {labMode === 'live' && (
               <div className="h-64 bg-black border-t border-white/10 flex flex-col">
                 <div className="h-8 bg-slate-900 flex items-center px-4 justify-between">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Skyline Interactive Shell v2026</span>
                    <div className="flex gap-2">
                       <span className="w-2 h-2 rounded-full bg-red-500"></span>
                       <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                       <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                 </div>
                 <div className="flex-grow p-4 font-mono text-[11px] overflow-y-auto space-y-1">
                    {terminalLogs.map((l, i) => (
                      <div key={i} className="text-slate-300">
                        {l.startsWith('root@skyline') ? <span className="text-emerald-500 font-bold">{l}</span> : l}
                      </div>
                    ))}
                    <form onSubmit={handleCommand} className="flex items-center">
                       <span className="text-emerald-500 font-bold mr-2">root@skyline:~#</span>
                       <input ref={terminalInputRef} className="bg-transparent border-none outline-none text-white w-full" autoFocus />
                    </form>
                    <div ref={terminalEndRef} />
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Interactive Mastery Suite</span>
            <h2 className="text-5xl font-black text-white mb-6">Live <span className="text-indigo-500">Practice Nodes</span></h2>
            <p className="text-slate-400 max-w-2xl text-lg">Launch dedicated environments for enterprise training. Choose between a live interactive node or follow an expert walkthrough recording.</p>
          </div>
          <div className="glass-card px-8 py-5 rounded-[2.5rem] flex items-center gap-8 border-white/5">
             <div className="flex flex-col">
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Infrastructure Status</span>
               <span className="text-lg font-black text-white">{globalUptime} Uptime</span>
             </div>
             <div className="w-px h-10 bg-white/10"></div>
             <div className="flex items-center gap-3">
               <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_emerald]'}`}></span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isSyncing ? 'Syncing...' : 'Live Monitoring'}</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {labs.map(lab => (
            <div key={lab.id} className="glass-card rounded-[3rem] p-10 border-white/5 hover:border-indigo-500/30 transition-all group flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-white border border-white/10 group-hover:border-indigo-500/50 transition-all">
                    <i className={`fa-solid ${lab.icon}`}></i>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border ${
                      lab.status === 'online' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${lab.status === 'online' ? 'bg-emerald-500' : 'bg-slate-600'}`}></span>
                      {lab.status === 'online' ? 'Available' : 'Maintenance'}
                    </span>
                    <span className="text-[8px] font-bold text-slate-600 uppercase">Uptime: {lab.uptime}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white mb-2">{lab.name}</h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">{lab.type}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {lab.tools.map(tool => (
                    <span key={tool} className="px-3 py-1 bg-white/5 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-white/5">{tool}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => startLab(lab, 'live')}
                  disabled={lab.status !== 'online'}
                  className="py-4 bg-white hover:bg-indigo-600 text-slate-950 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 disabled:opacity-30"
                >
                  <i className="fa-solid fa-terminal text-[10px]"></i> Launch Live
                </button>
                <button 
                  onClick={() => startLab(lab, 'recorded')}
                  className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/10 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-play text-[10px]"></i> Watch Walkthrough
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 glass-card rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 bg-indigo-600/5">
           <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Enterprise Level Skill Transcript</h3>
              <p className="text-slate-400 leading-relaxed">Every task completed and note recorded in our live labs is synced to your final intern transcript. This data is shared with our hiring partners to verify your hands-on proficiency in critical domains like SAP, Oracle, and AI Infrastructure.</p>
           </div>
           <div className="flex flex-col items-center gap-4 bg-black/30 p-8 rounded-[2rem] border border-white/10">
              <i className="fa-solid fa-certificate text-4xl text-indigo-400"></i>
              <div className="text-center">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Current Certification Path</span>
                 <span className="text-sm font-bold text-white">Advanced Solutions Architect</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default LiveLabs;
