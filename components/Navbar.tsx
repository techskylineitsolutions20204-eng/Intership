
import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [showTrainings, setShowTrainings] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tech', label: 'Internship Tracks' },
    { id: 'self-learning', label: 'Learning Hub' },
    { id: 'labs', label: 'Labs & Projects' },
    { id: 'career', label: 'Mentorship' },
    { id: 'terms', label: 'Certification' }, // Reusing terms/legal for now as a cert info placeholder
    { id: 'contact', label: 'Career Support' },
  ];

  const handleTechClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowTrainings(false);
  };

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
          
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? 'text-white bg-white/5 shadow-inner border border-white/10' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('register')}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
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
