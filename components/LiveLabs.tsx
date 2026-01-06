
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface LabInstance {
  id: string;
  name: string;
  type: string;
  status: 'offline' | 'provisioning' | 'online';
  tools: string[];
  specs: string;
  icon: string;
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
      icon: "fa-brain"
    },
    {
      id: 'fullstack-node',
      name: "Full Stack Node.js Node",
      type: "Ubuntu 22.04 LTS Container",
      status: 'offline',
      tools: ['Node.js', 'React 19', 'PostgreSQL', 'Redis'],
      specs: "4 vCPU / 8GB RAM",
      icon: "fa-layer-group"
    },
    {
      id: 'devsecops-pipeline',
      name: "DevSecOps Automation Lab",
      type: "Kubernetes Cluster Node",
      status: 'offline',
      tools: ['Docker', 'Terraform', 'Jenkins', 'SonarQube'],
      specs: "Shared K8s Cluster",
      icon: "fa-shield-halved"
    },
    {
      id: 'data-science-env',
      name: "Data Intelligence Hub",
      type: "Jupyter Enterprise Node",
      status: 'offline',
      tools: ['Pandas', 'Spark', 'TensorFlow', 'Tableau SDK'],
      specs: "Memory Optimized Instance",
      icon: "fa-chart-pie"
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
  
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Simulated API fetch for live status
  const fetchStatuses = useCallback(async () => {
    setIsSyncing(true);
    try {
      // Mimic network latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setLabs(currentLabs => currentLabs.map(lab => {
        // Don't override statuses of labs that are in transition or currently active
        if (activeLab?.id === lab.id || lab.status === 'provisioning') return lab;
        
        // Dynamic status logic: some labs might be spinning up or online in the background
        const roll = Math.random();
        let newStatus: LabInstance['status'] = 'offline';
        if (roll > 0.95) newStatus = 'online';
        else if (roll > 0.90) newStatus = 'provisioning';
        
        return { ...lab, status: newStatus };
      }));
    } catch (error) {
      console.error("Failed to sync lab statuses:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [activeLab]);

  // Initial sync and polling
  useEffect(() => {
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 12000);
    
    // Load saved sessions from local storage
    const stored = localStorage.getItem('skyline_recorded_sessions');
    if (stored) setSavedSessions(JSON.parse(stored));

    return () => clearInterval(interval);
  }, [fetchStatuses]);

  const startLab = (lab: LabInstance) => {
    setLabs(prev => prev.map(l => l.id === lab.id ? { ...l, status: 'provisioning' } : l));
    setActiveLab(lab);
    setLabStatus('loading');
    setBootProgress(0);
    setRecordingStatus('idle');
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

  const closeLab = () => {
    if (activeLab) {
      setLabs(prev => prev.map(l => l.id === activeLab.id ? { ...l, status: 'offline' } : l));
    }
    setLabStatus('idle');
    setActiveLab(null);
    setTerminalLogs([]);
    setMentorMessages([]);
    setSessionNotes("");
    setIsRecording(false);
    setReviewSession(null);
    
    // Refresh the sessions list
    const stored = localStorage.getItem('skyline_recorded_sessions');
    if (stored) setSavedSessions(JSON.parse(stored));
  };

  const toggleRecording = () => {
    if (isRecording) {
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

  if (labStatus === 'reviewing' && reviewSession) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in-up">
        <div className="h-14 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Reviewing Session</span>
            <span className="text-xs text-white font-bold">{reviewSession.labName}</span>
          </div>
          <button onClick={closeLab} className="text-slate-400 hover:text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">
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
        {/* Lab Header */}
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
               onClick={closeLab}
               className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
             >
               End Practice
             </button>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex-grow flex overflow-hidden">
          {/* Interactive Mentor & Tasks Sidebar */}
          <div className="w-80 bg-slate-900 border-r border-white/5 flex flex-col hidden lg:flex">
             {/* Live Mentor Feed */}
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

             {/* Live Session Notes */}
             <div className="h-64 p-6 bg-black/20">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                  Interactive Notes
                  <i className="fa-solid fa-pen-to-square text-indigo-500"></i>
                </h3>
                <textarea 
                  className="w-full h-full bg-transparent border-none outline-none text-[11px] font-mono text-emerald-500/80 resize-none leading-relaxed"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Draft your session insights here..."
                />
             </div>
          </div>

          {/* Main IDE & Terminal Area */}
          <div className="flex-grow flex flex-col">
            <div className="flex-grow bg-[#1e1e1e] relative overflow-hidden">
               {/* IDE Tab Header */}
               <div className="h-10 bg-[#252526] border-b border-white/5 flex items-center px-4">
                  <div className="bg-[#1e1e1e] px-4 h-full flex items-center gap-2 border-r border-white/5">
                     <i className="fa-brands fa-react text-blue-400 text-xs"></i>
                     <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">SkylineApp.tsx</span>
                  </div>
               </div>
               
               {/* Editor Content */}
               <div className="p-8 font-mono text-xs leading-6 overflow-auto max-h-full">
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">1</span>
                    <span className="text-blue-400">import</span> <span className="text-indigo-300">React</span> <span className="text-blue-400">from</span> <span className="text-emerald-400">'react'</span>;
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">2</span>
                    <span className="text-slate-500">// Real-time collaborative IDE enabled</span>
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">3</span>
                    <span className="text-purple-400">const</span> <span className="text-yellow-300">InteractiveSession</span> = () =&gt; &#123;
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">4</span>
                    &nbsp;&nbsp;<span className="text-blue-400">return</span> (
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">5</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">div</span> <span className="text-amber-300">className</span>=<span className="text-emerald-400">"practice-mode"</span>&gt;
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">6</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-200">Session ID: {activeLab.id}</span>
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">7</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-red-400">div</span>&gt;
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">8</span>
                    &nbsp;&nbsp;);
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-600 text-right pr-4 select-none">9</span>
                    &#125;;
                  </div>
               </div>
            </div>

            {/* Interactive Terminal */}
            <div className="h-72 bg-black border-t border-white/10 flex flex-col">
               <div className="h-8 bg-slate-900 border-b border-white/10 flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Skyline Interactive Shell v2026</span>
                    {isRecording && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 rounded text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        Recording Active
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
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
                    <input 
                      ref={terminalInputRef}
                      className="bg-transparent border-none outline-none text-white w-full" 
                      autoFocus 
                    />
                  </form>
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
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300" 
                  style={{ width: `${bootProgress}%` }}
                ></div>
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
              Launch dedicated lab instances for hands-on technical sessions. Every lab includes an interactive terminal, live mentor guidance, and real-time collaboration tools.
            </p>
          </div>
          <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-2xl border-white/5">
            <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {isSyncing ? 'Syncing Infrastructure Status...' : 'Real-time Health: Operational'}
            </span>
          </div>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {labs.map((lab) => (
            <div key={lab.id} className="glass-card rounded-[3rem] p-10 border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-white border border-white/10 group-hover:border-indigo-500/50 group-hover:scale-105 transition-all">
                    <i className={`fa-solid ${lab.icon}`}></i>
                  </div>
                  <span className={`px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                    lab.status === 'online' ? 'text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
                    lab.status === 'provisioning' ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${lab.status === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : lab.status === 'provisioning' ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`}></span>
                    {lab.status === 'online' ? 'Active Pool' : lab.status === 'provisioning' ? 'Warming Up' : 'On Standby'}
                  </span>
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
                disabled={lab.status === 'provisioning'}
                className="w-full py-5 bg-white hover:bg-indigo-600 text-slate-950 hover:text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                Launch Practice Node
                <i className="fa-solid fa-play text-[10px]"></i>
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
