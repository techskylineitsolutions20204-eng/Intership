
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tech', label: 'Technologies' },
    { id: 'career', label: 'Career AI' },
    { id: 'register', label: 'Intake 2026' },
    { id: 'contact', label: 'Contact' },
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
            <span className="ml-2 px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-[9px] font-black uppercase tracking-widest hidden sm:inline-block">Internships</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? 'text-white bg-white/5' 
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
              className="px-6 py-2.5 bg-white text-slate-950 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl hidden sm:block"
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
