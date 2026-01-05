
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs">Our Identity</span>
          <h2 className="text-5xl font-black text-white mt-4 mb-8">Architecting the <span className="text-indigo-500">Next Decade</span></h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            TechSkyline IT Solutions isn't just a training provider. We are a nexus of innovation, bringing together academia and the cut-throat demands of modern industry.
          </p>
        </div>

        <div className="glass-card rounded-[3rem] p-10 lg:p-14 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Our Core Mission</h3>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Founded with the vision to eliminate the "experience gap," TechSkyline specializes in rapid deployment of talent into complex tech stacks. Under the leadership of Abhinav Joseph, we have successfully bridged 50+ international universities with Silicon Valley standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="font-bold text-indigo-400 mb-2">Innovation First</h4>
              <p className="text-sm text-slate-400">We prioritize GenAI, Web3, and high-performance systems over legacy patterns.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="font-bold text-indigo-400 mb-2">Global Mentorship</h4>
              <p className="text-sm text-slate-400">Our mentors come from Fortune 500 engineering backgrounds to guide our interns.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
