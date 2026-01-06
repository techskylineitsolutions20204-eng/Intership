
import React, { useState } from 'react';

interface Module {
  id: string;
  title: string;
  category: string;
  duration: string;
  embedId: string; // Using YouTube embed IDs as placeholders for real recordings
  labUrl: string;
  description: string;
  tasks: string[];
}

const SelfLearning: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const modules: Module[] = [
    {
      id: 'ai-ds-mastery',
      title: "AI & Data Science Deep Dive",
      category: "Data Science",
      duration: "120 mins",
      embedId: "dQw4w9WgXcQ", // Placeholder
      labUrl: "#",
      description: "Master the pipeline from raw data to predictive modeling using Scikit-Learn and Pandas.",
      tasks: ["Data Cleaning Workflows", "Feature Engineering", "Model Evaluation Metrics"]
    },
    {
      id: 'gen-ai-2026',
      title: "Generative AI & LLM Architectures",
      category: "GenAI",
      duration: "90 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Building production-grade RAG systems and fine-tuning models for specific domain knowledge.",
      tasks: ["Vector DB Integration", "Context Window Management", "Fine-tuning v/s RAG"]
    },
    {
      id: 'agentic-systems',
      title: "Agentic AI: Autonomous Workflows",
      category: "Agentic AI",
      duration: "75 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Creating self-correcting AI agents that can use tools and execute multi-step business logic.",
      tasks: ["Tool Definition for LLMs", "Multi-Agent Orchestration", "Error Handling in Agents"]
    },
    {
      id: 'cyber-iam',
      title: "Cybersecurity & Identity Access",
      category: "Cybersecurity",
      duration: "110 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Securing modern enterprise apps with Zero Trust, IAM (SailPoint/Okta), and penetration testing.",
      tasks: ["OAuth2 Flow Setup", "Threat Modeling", "IAM Policy Logic"]
    },
    {
      id: 'fullstack-modern',
      title: "Full Stack Mastery (React 19 & Node)",
      category: "Full Stack",
      duration: "150 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "End-to-end development using the latest React features and high-performance Node.js backends.",
      tasks: ["Server Components", "State Management v2026", "API Layer Security"]
    },
    {
      id: 'python-advanced',
      title: "Python for Senior Engineers",
      category: "Python",
      duration: "85 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Advanced decorators, generators, and async/await patterns for high-concurrency systems.",
      tasks: ["AsyncIO Design Patterns", "Memory Optimization", "Python C-Extensions"]
    },
    {
      id: 'azure-devops-cicd',
      title: "Azure DevOps & Cloud Infrastructure",
      category: "Azure DevOps",
      duration: "95 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Automating the cloud lifecycle with Azure Pipelines, Terraform, and Kubernetes orchestration.",
      tasks: ["Infrastructure as Code", "Blue-Green Deployment", "Log Analytics Setup"]
    },
    {
      id: 'iot-edge-compute',
      title: "IoT Edge & Embedded Systems",
      category: "IoT",
      duration: "70 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Connecting the physical world to the cloud with edge computing and MQTT messaging protocols.",
      tasks: ["Edge Data Filtering", "Device Management", "Real-time Telemetry"]
    },
    {
      id: 'rpa-uipath-pro',
      title: "RPA: Enterprise Process Automation",
      category: "RPA",
      duration: "65 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Automating repetitive corporate workflows using UiPath and intelligent document processing.",
      tasks: ["UI Path Orchestrator", "Document Understanding", "Unattended Bot Logic"]
    },
    {
      id: 'blockchain-web3',
      title: "Blockchain & Decentralized Apps",
      category: "Blockchain",
      duration: "100 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Smart contract development and Web3 integration for transparent, decentralized systems.",
      tasks: ["Solidity Smart Contracts", "Wallet Integrations", "Gas Optimization"]
    },
    {
      id: 'powerbi-intelligence',
      title: "Power BI & Business Intelligence",
      category: "Power BI",
      duration: "80 mins",
      embedId: "dQw4w9WgXcQ",
      labUrl: "#",
      description: "Transforming complex datasets into actionable executive dashboards with DAX and Power Query.",
      tasks: ["DAX Measure Logic", "Data Modeling", "Row-Level Security"]
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
          <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-4 scrollbar-hide">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Knowledge Domains</h3>
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
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest block ${
                    selectedModule?.id === mod.id ? 'text-blue-100' : 'text-blue-500'
                  }`}>
                    {mod.category}
                  </span>
                  <span className={`text-[10px] font-bold ${
                    selectedModule?.id === mod.id ? 'text-blue-200' : 'text-slate-500'
                  }`}>
                    {mod.duration}
                  </span>
                </div>
                <h4 className={`text-lg font-bold mb-2 ${
                  selectedModule?.id === mod.id ? 'text-white' : 'text-slate-200'
                }`}>
                  {mod.title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className={`text-xs flex items-center gap-1 ${
                    selectedModule?.id === mod.id ? 'text-blue-100' : 'text-emerald-500 font-bold'
                  }`}>
                    <i className="fa-solid fa-circle-play"></i> Watch Now
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
                <h3 className="text-2xl font-bold text-white mb-4">Select a domain to begin</h3>
                <p className="text-slate-500 max-w-sm">Every module features industry recordings, cloud-sync labs, and task-based evaluation.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in-up">
                {/* Integrated Video Player */}
                <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                   <div className="aspect-video w-full bg-black">
                      <iframe 
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${selectedModule.embedId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
                        title={selectedModule.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                   </div>
                   <div className="p-6 bg-slate-900 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Recording: {selectedModule.title}</span>
                      </div>
                      <div className="flex gap-4">
                        <button className="text-slate-400 hover:text-white transition-colors"><i className="fa-solid fa-closed-captioning"></i></button>
                        <button className="text-slate-400 hover:text-white transition-colors"><i className="fa-solid fa-gear"></i></button>
                      </div>
                   </div>
                </div>

                {/* Lab & Task Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card rounded-[2rem] p-8 border-emerald-500/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <i className="fa-solid fa-terminal text-emerald-500"></i>
                        Interactive Lab
                      </h3>
                      <span className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400 tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Sync Ready
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      {selectedModule.description}
                    </p>
                    <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-500/20">
                      Launch Practice Cloud
                    </button>
                  </div>

                  <div className="glass-card rounded-[2rem] p-8 border-blue-500/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-list-check text-blue-500"></i>
                      Learning Milestones
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

        {/* Dynamic Footer for Academy */}
        <div className="mt-24 p-12 glass-card rounded-[4rem] border-white/5 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-3xl font-black text-white block mb-1">11</span>
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Core Tracks</span>
          </div>
          <div>
            <span className="text-3xl font-black text-white block mb-1">HD</span>
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Video Rec.</span>
          </div>
          <div>
            <span className="text-3xl font-black text-white block mb-1">24/7</span>
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Lab Access</span>
          </div>
          <div>
            <span className="text-3xl font-black text-white block mb-1">100%</span>
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Hands-On</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfLearning;
