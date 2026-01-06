
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
  const [labStatus, setLabStatus] = useState<'idle' | 'loading' | 'active'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [bootProgress, setBootProgress] = useState(0);
  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([]);
  const [sessionNotes, setSessionNotes] = useState<string>("Initializing session notes...");
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const fetchStatuses = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setLabs(currentLabs => currentLabs.map(lab => {
        if (activeLab?.id === lab.id || lab.status === 'provisioning') return lab;
        const isMaintenance = Math.random() > 0.95;
        return { ...lab, status: isMaintenance ? 'online' : 'offline' };
      }));
    } catch (error) {
      console.error("Failed to sync lab statuses:", error);
    }
  }, [activeLab]);

  useEffect(() => {
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 15000);
    return () => clearInterval(interval);
  }, [fetchStatuses]);

  const startLab = (lab: LabInstance) => {
    setLabs(prev => prev.map(l => l.id === lab.id ? { ...l, status: 'provisioning' } : l));
    setActiveLab(lab);
    setLabStatus('loading');
    setBootProgress(0);
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
          
          // Trigger initial mentor message
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
  };

  const handleTerminalCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!terminalInputRef.current) return;
    const cmd = terminalInputRef.current.value.trim();
    if (!cmd) return;

    setTerminalLogs(prev => [...prev, `root@skyline:~# ${cmd}`]);
    terminalInputRef.current.value = '';

    // Simulate "interactive" responses
    setTimeout(() => {
      let response = `Command '${cmd}' executed successfully.`;
      if (cmd === 'ls') response = `bin/  etc/  projects/  scripts/  var/`;
      if (cmd === 'neofetch') response = `OS: TechSkyline OS v2026\nKernel: 6.8.0-skyline-pro\nShell: zsh 5.9\nCPU: AMD EPYC 7763 (16) @ 3.500GHz\nMemory: 2.4GiB / 64GiB`;
      
      setTerminalLogs(prev => [...prev, response]);

      // Mentor interaction based on command
      if (cmd.includes('npm') || cmd.includes('python')) {
        setMentorMessages(prev => [
          ...prev, 
          { id: Date.now().toString(), sender: 'Mentor AI', text: `I noticed you're using ${cmd.split(' ')[0]}. Ensure your dependencies are pinned for the production build.`, timestamp: new Date().toLocaleTimeString() }
        ]);
      }
    }, 300);
  };

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
          <div className="flex items-center gap-6">
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
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Skyline Interactive Shell v2026</span>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {labs.map((lab) => (
            <div key={lab.id} className="glass-card rounded-[3rem] p-10 border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-white border border-white/10 group-hover:border-indigo-500/50">
                    <i className={`fa-solid ${lab.icon}`}></i>
                  </div>
                  <span className={`px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                    lab.status === 'online' ? 'text-emerald-400' : 
                    lab.status === 'provisioning' ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${lab.status === 'online' ? 'bg-emerald-500' : lab.status === 'provisioning' ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`}></span>
                    {lab.status === 'online' ? 'Online' : lab.status === 'provisioning' ? 'Provisioning' : 'Standby'}
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
                Launch Live Practice
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
