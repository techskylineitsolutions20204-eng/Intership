
import React from 'react';

const Curriculum: React.FC = () => {
  const phases = [
    {
      title: "Phase 1: Foundation Architecture",
      period: "Month 1-2",
      focus: ["Modern JS/TS Patterns", "UI Engine Internals (React 19)", "Data Flow Management", "Cloud Fundamentals"],
      icon: "fa-layer-group"
    },
    {
      title: "Phase 2: Specialization Sprint",
      period: "Month 3-4",
      focus: ["Generative AI Integration", "Backend Systems (Rust/Go)", "Edge Computing Concepts", "DevSecOps Workflows"],
      icon: "fa-bolt-lightning"
    },
    {
      title: "Phase 3: Industry Synthesis",
      period: "Month 5-6",
      focus: ["Full-Scale System Design", "Production Deployment", "Agile Leadership", "Client Management"],
      icon: "fa-trophy"
    }
  ];

  return (
    <section className="py-24 bg-slate-950 animate-fade-in-up">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs">The 2026 Roadmap</span>
          <h2 className="text-5xl font-black text-white mt-4 mb-8">Program <span className="text-blue-500">Curriculum</span></h2>
          <p className="text-xl text-slate-400">A rigorous, three-phase journey from academia to professional mastery.</p>
        </div>

        <div className="space-y-12 relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-purple-500/50 hidden md:block"></div>
          
          {phases.map((phase, i) => (
            <div key={i} className="relative md:pl-24 group">
              <div className="absolute left-4 md:left-6 top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-500 z-10 hidden md:flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
              </div>
              
              <div className="glass-card rounded-[2.5rem] p-10 hover:border-blue-500/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <i className={`fa-solid ${phase.icon} text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                      <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">{phase.period}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.focus.map((item, j) => (
                    <div key={j} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                      <i className="fa-solid fa-circle-check text-blue-500 text-xs"></i>
                      <span className="text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
