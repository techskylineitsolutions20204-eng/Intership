
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
      icon: "fa-cloud"
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
      description: "Learn how to use a large language model (LLM) to quickly build new and powerful applications. Taught by AI visionary Andrew Ng.",
      tasks: ["Prompting Best Practices", "Iterative Prompting", "Summarizing & Inferring"],
      externalUrl: PARTNER_LINKS.DEEPLEARNING_AI,
      platformColor: "indigo",
      icon: "fa-brain-circuit"
    },
    {
      id: 'udacity-aws-ml',
      title: "AWS ML Foundations",
      category: "Cloud Mastery",
      duration: "Self-Paced",
      embedId: "",
      recordedAt: "Udacity Partner",
      instructor: "AWS Training Team",
      labUrl: PARTNER_LINKS.UDACITY,
      description: "Foundational course on Machine Learning using Amazon Web Services. Covers SageMaker and core AWS ML services.",
      tasks: ["AWS SageMaker", "Model Deployment", "ML Case Studies"],
      externalUrl: PARTNER_LINKS.UDACITY,
      platformColor: "orange",
      icon: "fa-aws"
    },
    {
      id: 'kaggle-ml-intro',
      title: "Intro to Machine Learning",
      category: "Data Track",
      duration: "3 Hours",
      embedId: "",
      recordedAt: "Hands-on",
      instructor: "Kaggle Learn",
      labUrl: PARTNER_LINKS.KAGGLE,
      description: "Learn the core ideas in machine learning, and build your first models using real-world data science tools.",
      tasks: ["Model Validation", "Underfitting & Overfitting", "Random Forests"],
      externalUrl: PARTNER_LINKS.KAGGLE,
      platformColor: "sky",
      icon: "fa-chart-line"
    },
    {
      id: 'gcp-ml-cert',
      title: "GCP Professional ML Engineer",
      category: "Professional Cert",
      duration: "Intensive",
      embedId: "",
      recordedAt: "Official Prep",
      instructor: "Google Training",
      labUrl: PARTNER_LINKS.GCP_CERT,
      description: "Official preparation path for the Google Cloud Professional Machine Learning Engineer certification.",
      tasks: ["ML Pipeline Orchestration", "Feature Engineering at Scale", "Model Monitoring"],
      externalUrl: PARTNER_LINKS.GCP_CERT,
      platformColor: "red",
      icon: "fa-certificate"
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
      tasks: ["Vector DB Integration", "Context Window Management", "Fine-tuning v/s RAG"]
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center px-4 py-2 glass-card text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <i className="fa-solid fa-graduation-cap mr-2"></i>
              TechSkyline Academy Hub
            </div>
            <h2 className="text-5xl font-black text-white mb-6">Multi-Platform <span className="text-blue-500">Learning</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              We've integrated the world's leading AI & ML curricula from Google, DeepLearning.AI, Udacity, and Kaggle into a unified mastery track.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
             {Object.entries({
               'Google': 'fa-google',
               'AWS': 'fa-aws',
               'OpenAI': 'fa-bolt',
               'Kaggle': 'fa-database'
             }).map(([name, icon]) => (
               <div key={name} className="px-4 py-2 glass-card border-white/5 rounded-xl flex items-center gap-2">
                 <i className={`fa-brands ${icon} text-blue-400 text-xs`}></i>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{name} Partner</span>
               </div>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-4 scrollbar-hide">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Select Academy Track</h3>
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
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold ${
                    selectedModule?.id === mod.id ? 'text-blue-100' : 'text-slate-500'
                  }`}>
                    By: {mod.instructor}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${
                    selectedModule?.id === mod.id ? 'text-blue-100' : 'text-emerald-500 font-bold'
                  }`}>
                    <i className={`fa-solid ${mod.externalUrl ? 'fa-arrow-up-right-from-square' : 'fa-lock-open'} mr-1`}></i>
                    {mod.externalUrl ? 'Platform' : 'Access'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Module Content */}
          <div className="lg:col-span-2">
            {!selectedModule ? (
              <div className="h-full min-h-[500px] glass-card rounded-[3rem] border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-slate-600">
                  <i className="fa-solid fa-graduation-cap text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Start Your Specialization</h3>
                <p className="text-slate-500 max-w-sm">Choose between TechSkyline originals or our certified partner tracks from global tech leaders.</p>
              </div>
            ) : (
              <div className="animate-fade-in-up">
                {selectedModule.externalUrl ? (
                  <div className={`glass-card rounded-[3rem] p-12 lg:p-20 text-center flex flex-col items-center border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 to-blue-950/20`}>
                    <div className={`w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/30`}>
                      <i className={`fa-solid ${selectedModule.icon || 'fa-rocket'} text-4xl`}></i>
                    </div>
                    <span className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Official Training Node</span>
                    <h3 className="text-4xl font-black text-white mb-6 leading-tight">{selectedModule.title}</h3>
                    <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed">
                      {selectedModule.description}
                    </p>
                    <a 
                      href={selectedModule.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-12 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:bg-slate-100 transition-all shadow-2xl shadow-white/10 flex items-center gap-4"
                    >
                      Enter Partner Platform
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <div className="mt-12 flex flex-wrap justify-center gap-4 opacity-60">
                       {selectedModule.tasks.map((t, i) => (
                         <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                           {t}
                         </span>
                       ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Video Player for Skyline Originals */}
                    <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl">
                       <div className="aspect-video w-full bg-black">
                          <iframe 
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${selectedModule.embedId}?autoplay=0&controls=1&modestbranding=1`}
                            title={selectedModule.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                       </div>
                       <div className="p-8 bg-slate-900 flex items-center justify-between border-t border-white/5">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-white uppercase tracking-widest mb-1">{selectedModule.title}</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Archived Session • instructor: {selectedModule.instructor}</span>
                          </div>
                          <button className="px-6 py-2 glass-card rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors">
                            Download Notes
                          </button>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="glass-card rounded-[2.5rem] p-8 border-blue-500/20">
                        <h4 className="text-lg font-bold text-white mb-4">Session Abstract</h4>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">{selectedModule.description}</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                             <i className="fa-solid fa-user-graduate text-sm"></i>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Lead Faculty</span>
                             <span className="text-xs font-bold text-white">{selectedModule.instructor}</span>
                           </div>
                        </div>
                      </div>
                      <div className="glass-card rounded-[2.5rem] p-8 border-emerald-500/20">
                        <h4 className="text-lg font-bold text-white mb-4">Milestones</h4>
                        <div className="space-y-3">
                          {selectedModule.tasks.map((t, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs text-slate-300">
                              <i className="fa-solid fa-circle-check text-emerald-500"></i>
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfLearning;
