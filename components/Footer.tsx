
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-white font-bold text-2xl tracking-tight">TechSkyline</span>
              <span className="ml-2 px-2 py-0.5 bg-blue-900 text-blue-400 rounded text-xs font-semibold uppercase">IT Solutions</span>
            </div>
            <p className="text-slate-400 max-w-md">
              TechSkyline IT Solutions is a leader in technology training, software development, 
              and career transformation. We empower students through high-impact internship 
              programs that bridge the gap between education and industry.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">University Partners</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Program Curriculum</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <i className="fa-solid fa-phone mr-3 text-xs text-blue-400"></i>
                +1 (408) 614-0468
              </li>
              <li className="flex items-center">
                <i className="fa-brands fa-whatsapp mr-3 text-xs text-green-400"></i>
                +91 81062 43684
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-envelope mr-3 text-xs text-red-400"></i>
                techskylineitsolutions20204@gmail.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2024 TechSkyline IT Solutions. All rights reserved.</p>
          <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
