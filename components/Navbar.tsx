
import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [showTrainings, setShowTrainings] = useState(false);

  const TRAINING_CATEGORIES = [
    {
      title: 'AI & Data Intelligence',
      items: [
        { name: 'Agentic AI Frameworks', icon: 'fa-robot' },
        { name: 'Generative AI Foundations', icon: 'fa-sparkles' },
        { name: 'AI with Data Science', icon: 'fa-brain' },
        { name: 'Python for AI', icon: 'fa-brands fa-python' }
      ]
    },
    {
      title: 'Cloud & Cyber Security',
      items: [
        { name: 'AWS Cloud Architecture', icon: 'fa-brands fa-aws' },
        { name: 'Azure DevOps', icon: 'fa-infinity' },
        { name: 'Google Cloud Security', icon: 'fa-shield-halved' },
        { name: 'Cyber Security Ops', icon: 'fa-user-secret' }
      ]
    },
    {
      title: 'SAP & Enterprise ERP',
      items: [
        { name: 'Sap H4 Hana (S/4HANA)', icon: 'fa-database' },
        { name: 'Sap Ariba Procurement', icon: 'fa-cart-shopping' },
        { name: 'Sap IBP & Sap OBP', icon: 'fa-chart-line' },
        { name: 'Workday HCM', icon: 'fa-users-gear' }
      ]
    },
    {
      title: 'Oracle & Project Control',
      items: [
        { name: 'Oracle Primavera Unifier', icon: 'fa-diagram-project' },
        { name: 'Oracle P6 Professional', icon: 'fa-calendar-check' },
        { name: 'Tableau Analytics', icon: 'fa-chart-pie' },
        { name: 'Power BI Reporting', icon: 'fa-chart-bar' }
      ]
    },
    {
      title: 'Emerging Tech & Mgmt',
      items: [
        { name: 'IOT & Edge 5G', icon: 'fa-tower-broadcast' },
        { name: 'RPA & Robotics', icon: 'fa-gears' },
        { name: 'Scrum Master', icon: 'fa-person-running' },
        { name: 'Product Management', icon: 'fa-box-open' }
      ]
    }
  ];

  const handleTechClick = (name: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(name + " technology training 2026")}`;
    window.open(searchUrl, '_blank');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tech', label: 'Tech Matrix' },
    { id: 'career', label: 'Career AI' },
    { id: 'labs', label: 'Live Labs' },
    { id: 'register', label: 'Apply' },
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
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? 'text-white bg-white/5 shadow-inner border border-white/10' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="relative ml-4 pl-4 border-l border-white/10 group">
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
                   className="absolute top-full right-[-150px] mt-2 w-[900px] bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 animate-fade-in-up grid grid-cols-5 gap-6"
                 >
                    <div className="col-span-5 border-b border-white/5 pb-4 mb-2 flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Training Nodes v2026</span>
                       <span className="text-[9px] bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">Industry Verified</span>
                    </div>
                    {TRAINING_CATEGORIES.map(category => (
                      <div key={category.title} className="space-y-3">
                         <h4 className="text-[9px] font-black text-indigo-500 uppercase tracking-widest border-b border-indigo-500/10 pb-2">{category.title}</h4>
                         <div className="space-y-1">
                           {category.items.map(item => (
                             <div 
                               key={item.name} 
                               onClick={() => handleTechClick(item.name)}
                               className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group/item"
                             >
                                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center group-hover/item:bg-indigo-600 transition-colors">
                                   <i className={`fa-solid ${item.icon} text-[10px] text-slate-400 group-hover/item:text-white`}></i>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 group-hover/item:text-white transition-colors">{item.name}</span>
                                <i className="fa-solid fa-arrow-up-right-from-square text-[8px] text-slate-700 opacity-0 group-hover/item:opacity-100 transition-opacity"></i>
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
