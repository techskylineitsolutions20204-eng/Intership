
import React, { useState } from 'react';

interface Module {
  id: string;
  title: string;
  category: string;
  duration: string;
  recordingUrl: string;
  labUrl: string;
  description: string;
  tasks: string[];
}

const SelfLearning: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const modules: Module[] = [
    {
      id: 'gen-ai-101',
      title: "Generative AI Foundations",
      category: "LLM Systems",
      duration: "45 mins",
      recordingUrl: "#",
      labUrl: "#",
      description: "Dive deep into Transformer architectures, attention mechanisms, and the birth of modern Large Language Models.",
      tasks: [
        "Explore Attention Maps in BERT",
        "Fine-tune a small model for sentiment",
        "Understand Tokenization bottlenecks"
      ]
    },
    {
      id: 'agentic-ai-advanced',
      title: "Agentic AI & Multi-Agent Systems",
      category: "Autonomous AI",
      duration: "60 mins",
      recordingUrl: "#",
      labUrl: "#",
      description: "Learn to build autonomous agents that use tools, reason, and collaborate to solve multi-step complex tasks.",
      tasks: [
        "Implement a ReAct loop",
        "Build a Search-Enabled Assistant",
        "Coordinate two agents for a coding task"
      ]
    },
    {
      id: 'prompt-eng-2026',
      title: "Advanced Prompt Engineering v2026",
      category: "Interface Design",
      duration: "35 mins",
      recordingUrl: "#",
      labUrl: "#",
      description: "Mastering the art of Chain-of-Thought, Tree-of-Thought, and dynamic meta-prompting for zero-latency outputs.",
      tasks: [
        "Craft few-shot reasoning prompts",
        "Minimize hallucination via system constraints",
        "Implement guardrails via structured output"
      ]
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <i className="fa-solid fa-graduation-cap mr-2"></i>
            Self-Paced Mastery Hub
          </div>
          <h2 className="text-5xl font-black text-white mb-6">AI Academy: <span className="text-blue-500">2026 Edition</span></h2>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Access high-definition recordings of previous TechSkyline bootcamps, synchronized with live GPU labs and hands-on practice environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Selection Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Available Sessions</h3>
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className={`w-full text-left p-6 rounded-3xl transition-all border ${
                  selectedModule?.id === mod.id 
                    ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-500/20' 
                    : 'glass-card border-white/5 hover:border-white/10'
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${
                  selectedModule?.id === mod.id ? 'text-blue-100' : 'text-blue-500'
                }`}>
                  {mod.category}
                </span>
                <h4 className={`text-lg font-bold mb-2 ${
                  selectedModule?.id === mod.id ? 'text-white' : 'text-slate-200'
                }`}>
                  {mod.title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className={`text-xs flex items-center gap-1 ${
                    selectedModule?.id === mod.id ? 'text-blue-100' : 'text-slate-500'
                  }`}>
                    <i className="fa-solid fa-clock"></i> {mod.duration}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${
                    selectedModule?.id === mod.id ? 'text-blue-100' : 'text-emerald-500 font-bold'
                  }`}>
                    <i className="fa-solid fa-flask"></i> Lab Ready
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Practice Console */}
          <div className="lg:col-span-2">
            {!selectedModule ? (
              <div className="h-full min-h-[500px] glass-card rounded-[3rem] border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-slate-600">
                  <i className="fa-solid fa-play text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Select a session to begin learning</h3>
                <p className="text-slate-500 max-w-sm">Every session includes a full recording, synchronized transcript, and 2 hours of GPU cloud lab access.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in-up">
                {/* Video Player Mockup */}
                <div className="relative aspect-video glass-card rounded-[2.5rem] overflow-hidden group">
                  <img 
                    src={`https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200`} 
                    alt="Session Thumbnail" 
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                    <button className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
                      <i className="fa-solid fa-play text-2xl ml-1"></i>
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between text-white">
                    <span className="font-bold text-sm bg-black/50 px-3 py-1 rounded-lg backdrop-blur-md">Record: {selectedModule.title}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">HQ 1080p</span>
                  </div>
                </div>

                {/* Lab Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card rounded-[2rem] p-8 border-emerald-500/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <i className="fa-solid fa-terminal text-emerald-500"></i>
                        Live Lab Console
                      </h3>
                      <span className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400 tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active Env
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      Instant access to a Jupyter / VS Code environment pre-configured with the required 2026 tech stacks (LangGraph, PyTorch, etc).
                    </p>
                    <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-500/20">
                      Initialize GPU Instance
                    </button>
                  </div>

                  <div className="glass-card rounded-[2rem] p-8 border-blue-500/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-list-check text-blue-500"></i>
                      Practical Tasks
                    </h3>
                    <div className="space-y-3">
                      {selectedModule.tasks.map((task, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer">
                          <div className="w-5 h-5 rounded border border-slate-600 group-hover:border-blue-500 flex items-center justify-center text-[10px] text-transparent group-hover:text-blue-500">
                            <i className="fa-solid fa-check"></i>
                          </div>
                          <span className="text-sm text-slate-300 font-medium">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Stats Footer */}
        <div className="mt-24 p-12 glass-card rounded-[4rem] border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
          <div>
            <span className="text-4xl font-black text-white block mb-2">120+</span>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Hours of High-Def Content</span>
          </div>
          <div className="border-x border-white/5">
            <span className="text-4xl font-black text-white block mb-2">Infinite</span>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Hands-On Lab Sandbox Access</span>
          </div>
          <div>
            <span className="text-4xl font-black text-white block mb-2">98.2%</span>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Student Mastery Completion Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfLearning;
