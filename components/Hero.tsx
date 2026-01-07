
import React from 'react';

interface HeroProps {
  onRegister: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-32 border-b border-white/5">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
          alt="University Campus Collaboration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:w-2/3">
          <div className="inline-flex items-center px-4 py-2 glass-card text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-fade-in-up">
            University Collaboration Program 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95] animate-fade-in-up">
            Bridge Academia <br/>with <span className="text-indigo-500">Industry Excellence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            TechSkyline IT Solutions partners with leading colleges to provide high-impact internship tracks. <span className="text-white font-bold underline decoration-indigo-500 underline-offset-4">100% Free Learning. Zero Trials. Real Projects.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <button 
              onClick={onRegister}
              className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-indigo-600/30 hover:-translate-y-1"
            >
              Start Internship Track
            </button>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1">
              Explore Technologies
            </button>
          </div>
          
          <div className="mt-16 flex flex-wrap items-center gap-12 border-t border-white/5 pt-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">50+</span>
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">College Partners</span>
            </div>
            <div className="w-px h-10 bg-white/5 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">100%</span>
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Free Learning</span>
            </div>
            <div className="w-px h-10 bg-white/5 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">ISO</span>
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Certified Hub</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
