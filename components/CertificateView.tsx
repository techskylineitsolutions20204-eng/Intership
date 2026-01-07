
import React, { useEffect, useState } from 'react';

const CertificateView: React.FC = () => {
  const [name, setName] = useState('STUDENT NAME');
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const savedName = localStorage.getItem('ts_user_name');
    if (savedName) setName(savedName.toUpperCase());
  }, []);

  return (
    <section className="py-24 bg-slate-950 flex justify-center items-center min-h-screen px-4">
      <div className="max-w-4xl w-full">
        <div className="mb-12 flex justify-between items-center text-white">
          <h2 className="text-3xl font-black">Your Official Credentials</h2>
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 bg-white text-slate-950 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-indigo-50"
          >
            <i className="fa-solid fa-print"></i> Print / Save PDF
          </button>
        </div>

        {/* Certificate Container */}
        <div className="certificate-paper bg-white text-slate-900 p-16 md:p-24 border-[20px] border-slate-950 shadow-2xl relative overflow-hidden" style={{ minHeight: '600px' }}>
          {/* Subtle decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-indigo-600 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-indigo-600 opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
             <i className="fa-solid fa-code text-[20rem]"></i>
          </div>

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-8">
               <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl">
                  <i className="fa-solid fa-code"></i>
               </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-2">TechSkyline IT Solutions</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-12">ISO Certified Global Internship Platform</p>
            
            <div className="w-24 h-1 bg-slate-200 mx-auto mb-12"></div>

            <p className="font-serif italic text-lg text-slate-500 mb-8">This is to certify that</p>
            
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-950 mb-8 underline decoration-indigo-600 decoration-4 underline-offset-8">
              {name}
            </h2>

            <p className="font-serif italic text-lg text-slate-500 mb-8">has successfully completed the immersive</p>
            
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-widest">
              Advanced Technology Internship Program
            </h3>
            
            <p className="max-w-xl mx-auto text-slate-600 leading-relaxed mb-16">
              Demonstrating mastery in Generative AI, Cloud Infrastructure, and Enterprise Systems through hands-on projects, mentor evaluation, and professional performance assessment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left pt-12 border-t border-slate-100">
               <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Internship ID</span>
                  <span className="font-bold text-slate-900">TS-INT-2026-00124</span>
               </div>
               <div className="text-center">
                  <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                     <i className="fa-solid fa-shield-halved text-indigo-600 text-3xl"></i>
                  </div>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Verified 2026</span>
               </div>
               <div className="text-right">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Issue Date</span>
                  <span className="font-bold text-slate-900">{date}</span>
               </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
               <div className="w-48 h-px bg-slate-200 mb-4"></div>
               <span className="text-xs font-black uppercase tracking-[0.2em]">Authorized Signatory</span>
               <span className="text-[10px] text-slate-400 font-bold uppercase">TechSkyline IT Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateView;
