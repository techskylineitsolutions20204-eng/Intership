
import React, { useState, useEffect } from 'react';

interface LabInstance {
  id: string;
  name: string;
  type: string;
  status: 'offline' | 'provisioning' | 'online';
  tools: string[];
  specs: string;
  icon: string;
}

const LiveLabs: React.FC = () => {
  const [activeLab, setActiveLab] = useState<LabInstance | null>(null);
  const [labStatus, setLabStatus] = useState<'idle' | 'loading' | 'active'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [bootProgress, setBootProgress] = useState(0);

  const availableLabs: LabInstance[] = [
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
  ];

  const startLab = (lab: LabInstance) => {
    setActiveLab(lab);
    setLabStatus('loading');
    setBootProgress(0);
    setTerminalLogs([
      `Initializing ${lab.name}...`,
      `Provisioning ${lab.type} resource...`,
      `Establishing secure SSH tunnel...`
    ]);

    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLabStatus('active');
          setTerminalLogs(logs => [...logs, `Instance [${lab.id}] is ONLINE.`, `Welcome to TechSkyline Cloud Shell. Ready for input.`]);
          return 100;
        }
        return prev + 10;
      });
      
      const bootMessages = [
        "Mounting persistent storage...",
        "Injecting internship datasets...",
        "Checking tool versions...",
        "Finalizing network config...",
        "Allocating memory pools..."
      ];
      setTerminalLogs(logs => [...logs, bootMessages[Math.floor(Math.random() * bootMessages.length)]]);
    }, 400);
  };

  const closeLab = () => {
    setLabStatus('idle');
    setActiveLab(null);
    setTerminalLogs([]);
  };

  if (labStatus === 'active' && activeLab) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in-up">
        {/* Lab Header */}
        <div className="h-14 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest text-white">{activeLab.name}</span>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instance: {activeLab.id}</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                <span>CPU: 14%</span>
                <span>MEM: 2.4GB / {activeLab.specs.split('/')[1]?.trim() || activeLab.specs}</span>
                <span>DISK: 12GB Free</span>
             </div>
             <button 
               onClick={closeLab}
               className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
             >
               Terminate Session
             </button>
          </div>
        </div>

        {/* Lab Content Wrapper */}
        <div className="flex-grow flex overflow-hidden">
          {/* Instructions Sidebar */}
          <div className="w-80 bg-slate-900 border-r border-white/5 p-6 overflow-y-auto hidden lg:block">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
              <i className="fa-solid fa-file-lines mr-2 text-blue-500"></i> Project Tasks
            </h3>
            <div className="space-y-6">
               <div className="space-y-3">
                 <h4 className="text-xs font-bold text-indigo-400">Task 1: Environment Audit</h4>
                 <p className="text-xs text-slate-400 leading-relaxed">Run <code>neofetch</code> or <code>uname -a</code> in the terminal to verify your instance hardware and OS kernel.</p>
               </div>
               <div className="space-y-3">
                 <h4 className="text-xs font-bold text-indigo-400">Task 2: Tool Verification</h4>
                 <p className="text-xs text-slate-400 leading-relaxed">Check if pre-installed tools are active. For this lab, use: <br/><code className="text-emerald-400 bg-black/30 px-1 py-0.5 rounded">npm -v</code> or <code className="text-emerald-400 bg-black/30 px-1 py-0.5 rounded">python --version</code>.</p>
               </div>
               <div className="space-y-3">
                 <h4 className="text-xs font-bold text-indigo-400">Task 3: Production Build</h4>
                 <p className="text-xs text-slate-400 leading-relaxed">Navigate to <code>/projects/starter</code> and execute the build pipeline script.</p>
               </div>
            </div>

            <div className="mt-12 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
               <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-2">Mentor Insight</span>
               <p className="text-[11px] text-slate-300 italic">"Real-world engineering happens in the terminal. Master your shortcuts early."</p>
            </div>
          </div>

          {/* Main Workspace (Terminal + Code View) */}
          <div className="flex-grow flex flex-col">
            {/* Editor Area Mockup */}
            <div className="flex-grow bg-[#1e1e1e] relative">
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500/20 rounded-full border border-red-500/50"></div>
                <div className="w-3 h-3 bg-amber-500/20 rounded-full border border-amber-500/50"></div>
                <div className="w-3 h-3 bg-emerald-500/20 rounded-full border border-emerald-500/50"></div>
              </div>
              <div className="pt-12 px-10 font-mono text-sm">
                 <span className="text-blue-400">import</span> <span className="text-indigo-300">React</span> <span className="text-blue-400">from</span> <span className="text-emerald-400">'react'</span>;
                 <br/><br/>
                 <span className="text-purple-400">const</span> <span className="text-yellow-300">SkylineInternApp</span> = () =&gt; &#123;
                 <br/>
                 &nbsp;&nbsp;<span className="text-slate-500">// TODO: Implement real-time data sync in Task 3</span>
                 <br/>
                 &nbsp;&nbsp;<span className="text-slate-300">console</span>.<span className="text-yellow-300">log</span>(<span className="text-emerald-400">"Connecting to live production node..."</span>);
                 <br/>
                 &nbsp;&nbsp;<span className="text-blue-400">return</span> (
                 <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">div</span>&gt;<span className="text-slate-200">Hello 2026</span>&lt;/<span className="text-red-400">div</span>&gt;
                 <br/>
                 &nbsp;&nbsp;);
                 <br/>
                 &#125;;
                 <br/><br/>
                 <span className="text-blue-400">export default</span> <span className="text-yellow-300">SkylineInternApp</span>;
              </div>
            </div>

            {/* Bottom Terminal Section */}
            <div className="h-64 bg-black border-t border-white/10 p-4 font-mono text-xs overflow-y-auto">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Cloud Terminal - Session Active</span>
                <span className="text-emerald-500">root@skyline:~#</span>
              </div>
              <div className="space-y-1">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="text-slate-300">
                    <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-emerald-500 mr-2">root@skyline:~#</span>
                  <input className="bg-transparent border-none outline-none text-white w-full" autoFocus />
                </div>
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
              <div className="bg-black/50 p-4 rounded-xl font-mono text-[10px] text-slate-400 h-32 overflow-hidden">
                {terminalLogs.map((log, i) => <div key={i} className="mb-1 animate-pulse">{'>'} {log}</div>)}
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <i className="fa-solid fa-server mr-2"></i>
            Live Platform Access
          </div>
          <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Hand-On <span className="text-blue-500">Cloud Labs</span></h2>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Provision dedicated industry-standard environments in seconds. Practice with high-performance GPUs, automated DevOps clusters, and enterprise-grade data nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {availableLabs.map((lab) => (
            <div 
              key={lab.id} 
              className="glass-card rounded-[3rem] p-10 border-white/5 group hover:border-indigo-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform border border-white/10 group-hover:border-indigo-500/50">
                    <i className={`fa-solid ${lab.icon}`}></i>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Status</span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                      Standby
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2">{lab.name}</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-6">{lab.type}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-2">Compute Specs</span>
                    <span className="text-xs font-bold text-slate-300">{lab.specs}</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-2">Network Layer</span>
                    <span className="text-xs font-bold text-slate-300">Dedicated Node</span>
                  </div>
                </div>

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
                className="w-full py-5 bg-white hover:bg-indigo-600 text-slate-950 hover:text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-indigo-500/30 group/btn"
              >
                Launch Virtual Instance
                <i className="fa-solid fa-rocket group-hover/btn:translate-y-[-2px] transition-transform"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Knowledge & Tools Feature Section */}
        <div className="mt-32 p-16 glass-card rounded-[4rem] border-white/10 relative overflow-hidden">
           <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full"></div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h3 className="text-4xl font-black text-white mb-6 leading-tight">In-Depth <span className="text-indigo-400">Subject Mastery</span> via Live Practicals</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  Don't just watch recordings. Interact with the very tools used by Fortune 500 engineering teams. Our 2026 lab platform tracks every command, offering real-time debugging insights and architectural critique.
                </p>
                <div className="space-y-4">
                  {[
                    "Zero-Latency Instance Provisioning",
                    "Synchronized Project Codebases",
                    "Automated Assessment Engine",
                    "Expert Architect Hotline Access"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <span className="text-sm font-bold text-slate-200">{feat}</span>
                    </div>
                  ))}
                </div>
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div className="glass-card p-8 rounded-[3rem] text-center border-indigo-500/10 hover:border-indigo-500/30 transition-all">
                  <span className="text-4xl font-black text-white block mb-2">95%</span>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Practical Retention</span>
                </div>
                <div className="glass-card p-8 rounded-[3rem] text-center border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                  <span className="text-4xl font-black text-white block mb-2">24/7</span>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Live Node Availability</span>
                </div>
                <div className="glass-card p-8 rounded-[3rem] text-center border-amber-500/10 hover:border-amber-500/30 transition-all">
                  <span className="text-4xl font-black text-white block mb-2">15k+</span>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Code Compilations</span>
                </div>
                <div className="glass-card p-8 rounded-[3rem] text-center border-purple-500/10 hover:border-purple-500/30 transition-all">
                  <span className="text-4xl font-black text-white block mb-2">Direct</span>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Root System Control</span>
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default LiveLabs;
