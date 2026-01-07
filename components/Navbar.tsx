
import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [showTrainings, setShowTrainings] = useState(false);

  const TRAINING_CATEGORIES = [
    {
      title: 'AI & Intelligence',
      items: [
        { name: 'AI with Data Science', icon: 'fa-brain' },
        { name: 'Foundation of AI', icon: 'fa-atom' },
        { name: 'AI Automation', icon: 'fa-robot' },
        { name: 'Python for AI', icon: 'fa-brands fa-python' }
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      items: [
        { name: 'AWS', icon: 'fa-brands fa-aws' },
        { name: 'Azure DevOps', icon: 'fa-infinity' },
        { name: 'Google Cloud Security', icon: 'fa-shield-halved' },
        { name: 'Edge 5G', icon: 'fa-tower-broadcast' }
      ]
    },
    {
      title: 'Enterprise Solutions',
      items: [
        { name: 'SAP S/4HANA (H4 Hana)', icon: 'fa-database' },
        { name: 'SAP Ariba', icon: 'fa-cart-shopping' },
        { name: 'SAP IBP & OBP', icon: 'fa-chart-line' },
        { name: 'Workday HCM', icon: 'fa-users-gear' },
        { name: 'Oracle Primavera Unifier', icon: 'fa-diagram-project' },
        { name: 'Oracle P6', icon: 'fa-calendar-check' }
      ]
    },
    {
      title: 'Data & Security',
      items: [
        { name: 'Cyber Security', icon: 'fa-user-secret' },
        { name: 'Power BI', icon: 'fa-chart-bar' },
        { name: 'Tableau', icon: 'fa-chart-pie' },
        { name: 'RPA & Robotics', icon: 'fa-gears' },
        { name: 'IOT Systems', icon: 'fa-house-signal' }
      ]
    },
    {
      title: 'Management & Agile',
      items: [
        { name: 'Scrum Master', icon: 'fa-person-running' },
        { name: 'Product Management', icon: 'fa-box-open' }
      ]
    }
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
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
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
                   className="absolute top-full right-[-100px] mt-2 w-[800px] bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 animate-fade-in-up grid grid-cols-3 gap-8"
                 >
                    <div className="col-span-3 border-b border-white/5 pb-4 mb-2 flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Industry Mastery Nodes v2026</span>
                       <span className="text-[9px] bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">Verified Curriculums</span>
                    </div>
                    {TRAINING_CATEGORIES.map(category => (
                      <div key={category.title} className="space-y-3">
                         <h4 className="text-[10px] font-black text-indigo-500/80 uppercase tracking-widest">{category.title}</h4>
                         <div className="space-y-1">
                           {category.items.map(item => (
                             <div key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                   <i className={`fa-solid ${item.icon} text-[10px] text-slate-400 group-hover:text-white`}></i>
                                </div>
                                <span className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">{item.name}</span>
                             </div>
                           ))}
                         </div>
                      </div>
                    ))}
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
