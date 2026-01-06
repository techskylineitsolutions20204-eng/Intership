
import React, { useState } from 'react';

interface Module {
  id: string;
  title: string;
  category: string;
  duration: string;
  embedId: string; 
  recordedAt: string;
  instructor: string;
  labUrl: string;
  description: string;
  tasks: string[];
  externalUrl?: string;
  platformColor?: string;
  icon?: string;
  liveNotes?: string;
}

const SelfLearning: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  
  const PARTNER_LINKS = {
    UXCEL: "https://app.uxcel.com/courses/ai-fundamentals-for-ux?_gl=1*1don438*_gcl_au*ODU5OTA0NTg5LjE3Njc2ODQ2ODk.",
    GOOGLE_ML: "https://developers.google.com/machine-learning/crash-course",
    DEEPLEARNING_AI: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
    KAGGLE: "https://www.kaggle.com/learn/intro-to-machine-learning",
    UDACITY: "https://www.udacity.com/course/aws-machine-learning-foundations--ud065",
    GCP_GENAI: "https://cloud.google.com/learn/training/machinelearning-ai?utm_source=chatgpt.com#generative-ai-courses-by-level",
    GCP_ML_ENG: "https://cloud.google.com/learn/training/machinelearning-ai?utm_source=chatgpt.com#hands-on-courses-ml-engineers",
    GCP_WORKFLOW: "https://cloud.google.com/learn/training/machinelearning-ai?utm_source=chatgpt.com#generative-ai-workflow",
    GCP_CERT: "https://cloud.google.com/learn/training/machinelearning-ai?utm_source=chatgpt.com#get-certified-machine-learning"
  };

  const modules: Module[] = [
    {
      id: 'gcp-genai-mastery',
      title: "Google Cloud: GenAI Path",
      category: "Elite Certification",
      duration: "Multi-level",
      embedId: "",
      recordedAt: "GCP Official",
      instructor: "Google Cloud",
      labUrl: PARTNER_LINKS.GCP_GENAI,
      description: "Master Generative AI from foundational concepts to advanced enterprise deployment strategies on Google Cloud Platform.",
      tasks: ["Large Language Models", "Image Generation", "Attention Mechanisms"],
      externalUrl: PARTNER_LINKS.GCP_GENAI,
      platformColor: "blue",
      icon: "fa-cloud",
      liveNotes: "Focus on vertex AI and generative AI studio. Essential for professional cloud certification."
    },
    {
      id: 'gen-ai-2026',
      title: "Generative AI & LLM Architectures",
      category: "Skyline Original",
      duration: "90 mins",
      embedId: "5sLYA48vW3U",
      recordedAt: "Nov 05, 2025",
      instructor: "Abhinav Joseph",
      labUrl: "#",
      description: "Class recording on building production-grade RAG systems and fine-tuning models for specific domain knowledge.",
      tasks: ["Vector DB Integration", "Context Window Management", "Fine-tuning v/s RAG"],
      liveNotes: "Key Takeaways:\n- RAG vs Fine-tuning tradeoffs\n- Vector indexing strategies\n- Hallucination mitigation techniques"
    },
    {
      id: 'deeplearning-prompt',
      title: "ChatGPT Prompt Engineering",
      category: "Specialist Track",
      duration: "Short Course",
      embedId: "",
      recordedAt: "Partner Track",
      instructor: "Andrew Ng / OpenAI",
      labUrl: PARTNER_LINKS.DEEPLEARNING_AI,
      description: "Learn how to use a large language model (LLM) to quickly build new and powerful applications.",
      tasks: ["Prompting Best Practices", "Iterative Prompting", "Summarizing & Inferring"],
      externalUrl: PARTNER_LINKS.DEEPLEARNING_AI,
      platformColor: "indigo",
      icon: "fa-brain-circuit",
      liveNotes: "Essential for all engineering roles. Focus on iterative refinement of prompts."
    },
    {
      id: 'ai-ds-mastery',
      title: "AI & Data Science Deep Dive",
      category: "Skyline Original",
      duration: "120 mins",
      embedId: "i_LwzRVP7bg",
      recordedAt: "Oct 12, 2025",
      instructor: "Dr. Sarah Chen",
      labUrl: "#",
      description: "Session covering the complete pipeline from raw data to predictive modeling using Scikit-Learn and Pandas.",
      tasks: ["Data Cleaning Workflows", "Feature Engineering", "Model Evaluation Metrics"],
      liveNotes: "Notes:\n- Standardization of data is crucial\n- Feature importance visualization\n- Cross-validation best practices"
    },
    {
      id: 'fullstack-modern',
      title: "Full Stack Mastery (React 19 & Node)",
      category: "Skyline Original",
      duration: "150 mins",
      embedId: "wS9S_O908yU",
      recordedAt: "Feb 02, 2026",
      instructor: "Emily Rodriguez",
      labUrl: "#",
      description: "Comprehensive class on end-to-end development using React 19 Server Components and Node.js.",
      tasks: ["Server Components", "State Management v2026", "API Layer Security"],
      liveNotes: "Update: React 19 features 'use' hook and server-side actions are now the standard."
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <i className="fa-solid fa-clapperboard mr-2"></i>
            Recorded Training Archive
          </div>
          <h2 className="text-5xl font-black text-white mb-6">Mastery <span className="text-blue-500">Repository</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Access recorded deep-dive sessions for every technology track. Each session includes live notes and expert curriculum mapping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Knowledge Domains</h3>
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
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
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
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
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold ${
                      selectedModule?.id === mod.id ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      By: {mod.instructor}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-8">
            {!selectedModule ? (
              <div className="h-full min-h-[500px] glass-card rounded-[3rem] flex flex-col items-center justify-center text-center p-12">
                <i className="fa-solid fa-film text-4xl text-slate-700 mb-6"></i>
                <h3 className="text-2xl font-bold text-white mb-4">Select a domain session</h3>
                <p className="text-slate-500 max-w-sm">Every tech track has dedicated high-definition session recordings and interactive notes.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in-up">
                {/* Visualizer / Embed */}
                <div className="glass-card rounded-[3rem] overflow-hidden shadow-2xl relative">
                  {selectedModule.externalUrl ? (
                    <div className="p-16 lg:p-24 text-center">
                       <i className={`fa-solid ${selectedModule.icon || 'fa-rocket'} text-5xl text-blue-500 mb-8`}></i>
                       <h3 className="text-3xl font-black text-white mb-6">{selectedModule.title}</h3>
                       <p className="text-slate-400 mb-10 max-w-lg mx-auto">{selectedModule.description}</p>
                       <a href={selectedModule.externalUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">
                          Enter Platform Node
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                       </a>
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-black">
                      <iframe 
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${selectedModule.embedId}?modestbranding=1&rel=0`}
                        title={selectedModule.title}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>

                {/* Session Details & Interactive Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card rounded-[2.5rem] p-8">
                     <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                        <i className="fa-solid fa-list-check text-blue-500"></i>
                        Session Milestones
                     </h4>
                     <div className="space-y-4">
                        {selectedModule.tasks.map((t, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                             <div className="w-5 h-5 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 text-[10px]">
                                <i className="fa-solid fa-check"></i>
                             </div>
                             <span>{t}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="glass-card rounded-[2.5rem] p-8 border-indigo-500/20">
                     <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <i className="fa-solid fa-note-sticky text-indigo-500"></i>
                           Session Insights
                        </div>
                        <span className="text-[9px] px-2 py-0.5 bg-indigo-600/20 text-indigo-400 rounded">Verified</span>
                     </h4>
                     <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <p className="text-xs font-mono text-slate-400 leading-relaxed whitespace-pre-wrap">
                           {selectedModule.liveNotes || "Notes for this session are being transcribed..."}
                        </p>
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfLearning;
