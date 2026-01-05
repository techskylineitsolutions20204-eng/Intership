
import React from 'react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => setActiveTab('home')}>
              <span className="text-white font-black text-2xl tracking-tight">TechSkyline</span>
              <span className="ml-2 px-2 py-0.5 bg-blue-900 text-blue-400 rounded text-[10px] font-black uppercase tracking-widest">IT Solutions</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Empowering the next generation of software architects and AI engineers through high-impact, industry-integrated internship ecosystems.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('partners')} className="hover:text-blue-400 transition-colors">University Partners</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('curriculum')} className="hover:text-blue-400 transition-colors">Program Curriculum</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms')} className="hover:text-blue-400 transition-colors">Terms of Service</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Direct Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <i className="fa-solid fa-phone mr-3 text-blue-400"></i>
                +1 (408) 614-0468
              </li>
              <li className="flex items-center">
                <i className="fa-brands fa-whatsapp mr-3 text-green-400"></i>
                +91 81062 43684
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-envelope mr-3 text-red-400"></i>
                techskylineitsolutions20204@gmail.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 TechSkyline IT Solutions. Lead Architect: Abhinav Joseph.</p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest font-black">
            <button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
