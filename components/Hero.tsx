
import React from 'react';

interface HeroProps {
  onRegister: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
          alt="Team collaboration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:w-2/3">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Empowering Next-Gen <span className="text-blue-400">Tech Leaders</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
            TechSkyline IT Solutions collaborates with leading colleges and universities 
            to provide world-class internship programs. Bridge the gap between 
            academic theory and industry practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onRegister}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Start Your Journey
            </button>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-bold text-lg transition-all">
              Learn More
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 grayscale opacity-60">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">50+</span>
              <span className="text-sm uppercase tracking-wider text-slate-400">University Partners</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">2000+</span>
              <span className="text-sm uppercase tracking-wider text-slate-400">Interns Mentored</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">15+</span>
              <span className="text-sm uppercase tracking-wider text-slate-400">Tech Tracks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
