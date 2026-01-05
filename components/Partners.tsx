
import React from 'react';

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-xs">Collaboration</span>
          <h2 className="text-5xl font-black text-white mt-4 mb-8">University <span className="text-emerald-500">Alliances</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We partner with the world's most forward-thinking institutions to provide students with a trajectory-changing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Curriculum Integration", desc: "Our projects count towards university credits with structured reporting.", icon: "fa-book" },
            { title: "Campus Bootcamps", desc: "Physical and virtual deep-dive sessions led by Skyline Engineers.", icon: "fa-location-dot" },
            { title: "Placement Support", desc: "Verified skill transcripts shared directly with placement offices.", icon: "fa-graduation-cap" }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-[2.5rem] hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <i className={`fa-solid ${item.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-[3rem] p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Official Verification</h3>
          <p className="text-slate-400 mb-8">Interested institutions can verify our program standards and certifications via our direct director line.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <span className="px-6 py-3 glass-card rounded-xl text-emerald-400 font-bold">Director: Abhinav Joseph</span>
            <span className="px-6 py-3 glass-card rounded-xl text-slate-300 font-bold">+1 (408) 614-0468</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
