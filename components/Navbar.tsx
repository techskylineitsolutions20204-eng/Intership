
import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [showTrainings, setShowTrainings] = useState(false);

  const PARTNERS = [
    { name: 'Gen AI Foundations', url: 'https://cloud.google.com/learn/training/machinelearning-ai?utm_source=chatgpt.com#generative-ai-courses-by-level' },
    { name: 'Agentic AI Workflows', url: 'https://www.deeplearning.ai/short-courses/ai-agentic-workflows-with-crewai/' },
    { name: 'Google Cloud ML', url: 'https://cloud.google.com/learn/training/machinelearning-ai?utm_source=chatgpt.com#get-certified-machine-learning' },
    { name: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
    { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
    { name: 'Udacity AWS', url: 'https://www.udacity.com/course/aws-machine-learning-foundations--ud065' },
    { name: 'Uxcel AI Design', url: 'https://app.uxcel.com/courses/ai-fundamentals-for-ux' }
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tech', label: 'Tech' },
    { id: 'career', label: 'Career AI' },
    { id: 'self-learning', label: 'Academy' },
    { id: 'labs', label: 'Live Labs' },
    { id: 'register', label: 'Intake 2026' },
  ];

  return (
    <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
              <i className="fa-solid fa-code text-white text-lg"></i>
            </div>
            <span className="text-white font-black text-xl tracking-tighter">TechSkyline</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? 'text-white bg-white/5 shadow-inner' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="relative ml-4 pl-4 border-l border-white/10">
               <button 
                 onMouseEnter={() => setShowTrainings(true)}
                 className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2 hover:bg-indigo-600/10 transition-all"
               >
                 Training Hub
                 <i className={`fa-solid fa-chevron-down text-[8px] transition-transform ${showTrainings ? 'rotate-180' : ''}`}></i>
               </button>

               {showTrainings && (
                 <div 
                   onMouseLeave={() => setShowTrainings(false)}
                   className="absolute top-full right-0 mt-2 w-72 bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/50 animate-fade-in-up"
                 >
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Official Partner Nodes</div>
                    <div className="space-y-1">
                      {PARTNERS.map(p => (
                        <a 
                          key={p.name}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all group"
                        >
                          <span className="text-xs font-bold">{p.name}</span>
                          <i className="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </a>
                      ))}
                    </div>
                 </div>
               )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('register')}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 hidden sm:block"
            >
              Apply Now
            </button>
            <button className="lg:hidden text-slate-400 hover:text-white p-2">
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
