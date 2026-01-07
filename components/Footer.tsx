
import React from 'react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const TECH_GROUPS = [
    {
      title: 'AI & Data Intelligence',
      skills: ['AI with Data Science', 'Foundation of AI', 'AI Automation', 'Python for AI', 'Neural Networks', 'Predictive Modeling']
    },
    {
      title: 'Enterprise ERP & Cloud',
      skills: ['Sap S/4HANA (H4 Hana)', 'Sap Ariba Procurement', 'Sap IBP & Sap OBP', 'Workday HCM', 'AWS Cloud Architecture', 'Azure DevOps']
    },
    {
      title: 'Oracle & Analytics',
      skills: ['Oracle Primavera Unifier', 'Oracle P6 Professional', 'Tableau Analytics', 'Power BI Reporting', 'Strategic SQL', 'Big Data Hub']
    },
    {
      title: 'Emerging Tech & Security',
      skills: ['IOT & Edge 5G', 'RPA & Robotics', 'Google Cloud Security', 'Cyber Security Ops', 'Scrum Master', 'Product Management']
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-20 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full -mr-48 -mb-48 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section: Branding & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <div className="flex items-center mb-6 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
                <i className="fa-solid fa-code text-white text-sm"></i>
              </div>
              <span className="text-white font-black text-2xl tracking-tight">TechSkyline</span>
              <span className="ml-3 px-2 py-0.5 bg-white/5 text-slate-500 border border-white/10 rounded text-[9px] font-black uppercase tracking-widest">Est. 2024</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm mb-8">
              Architecting the next generation of industry leaders through immersive 2026-ready internship ecosystems. We bridge the gap between academic theory and global production standards.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all border border-white/5">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all border border-white/5">
                <i className="fa-brands fa-github text-sm"></i>
              </a>
              <a href="https://wa.me/918106243684" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all border border-white/5">
                <i className="fa-brands fa-whatsapp text-sm"></i>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-500 rounded-full"></span>
              Core Navigation
            </h4>
            <ul className="space-y-4 text-xs font-bold">
              <li><button onClick={() => setActiveTab('about')} className="hover:text-indigo-400 transition-colors">Corporate Identity</button></li>
              <li><button onClick={() => setActiveTab('partners')} className="hover:text-indigo-400 transition-colors">University Alliances</button></li>
              <li><button onClick={() => setActiveTab('career')} className="hover:text-indigo-400 transition-colors">Career AI Architect</button></li>
              <li><button onClick={() => setActiveTab('labs')} className="hover:text-indigo-400 transition-colors">Live Practice Nodes</button></li>
              <li><button onClick={() => setActiveTab('register')} className="hover:text-indigo-400 transition-colors">Intake Application</button></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
              <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
              Global Contact Center
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-500 flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Director</span>
                  <p className="text-sm font-bold text-white">Abhinav Joseph</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">WhatsApp Hub</span>
                  <p className="text-sm font-bold text-white">+91 81062 43684</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-rose-500 flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-all">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">USA Operations</span>
                  <p className="text-sm font-bold text-white">+1 (408) 614-0468</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Official Inquiry</span>
                  <p className="text-sm font-bold text-white truncate max-w-[200px] lg:max-w-none">techskylineitsolutions20204@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Mastery Matrix - Comprehensive List */}
        <div className="pt-16 border-t border-white/5">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Integrated Technology Ecosystem v2026</span>
            <div className="flex-grow h-px bg-white/5"></div>
            <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest border border-indigo-500/20 px-2 py-1 rounded">20+ Tracks Active</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16">
            {TECH_GROUPS.map((group, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <h5 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6 border-b border-indigo-500/10 pb-2">
                  {group.title}
                </h5>
                <ul className="space-y-3">
                  {group.skills.map((skill, j) => (
                    <li key={j} className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors cursor-default flex items-center gap-2">
                      <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">
              © 2026 TechSkyline IT Solutions. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 text-[9px] font-black text-slate-700 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot"></i> Silicon Valley, USA
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot"></i> Hyderabad, India
              </div>
            </div>
          </div>
          
          <div className="flex gap-8 text-[9px] uppercase tracking-widest font-black text-slate-600">
            <button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors">Privacy & Data</button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors">IP Framework</button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors">Global Compliance</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
