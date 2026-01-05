
import React, { useState } from 'react';

const Registration: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center px-4 bg-slate-950">
        <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/50 animate-bounce">
          <i className="fa-solid fa-paper-plane text-4xl"></i>
        </div>
        <h2 className="text-5xl font-black text-white mb-4">Application Dispatched!</h2>
        <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
          Your credentials are being analyzed by our 2026 recruitment engine. 
          Expect a response at your primary email within 72 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-12 px-10 py-4 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-50 transition-all shadow-xl"
        >
          Return to Portal
        </button>
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#0a0f1d]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs">Join the Elite</span>
          <h2 className="text-5xl font-black text-white mt-4 mb-6">2026 Intake Application</h2>
          <p className="text-slate-400 text-lg">Detailed application process for high-impact internship roles.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Personal Profile */}
          <div className="glass-card rounded-[2.5rem] p-10 lg:p-14">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm">1</span>
              Personal Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Legal Full Name</label>
                <input required type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white" placeholder="e.g. Abhinav Joseph" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Contact Email Address</label>
                <input required type="email" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white" placeholder="name@domain.com" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">WhatsApp Identity</label>
                <input required type="tel" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white" placeholder="+91 00000 00000" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Current Location</label>
                <input required type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white" placeholder="City, Country" />
              </div>
            </div>
          </div>

          {/* Section: Academic Background */}
          <div className="glass-card rounded-[2.5rem] p-10 lg:p-14">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm">2</span>
              Academic Pedigree
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Institution Name</label>
                <input required type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white" placeholder="University Name" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Degree & Major</label>
                <input required type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white" placeholder="B.Tech Computer Science" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Expected Graduation</label>
                <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white appearance-none">
                  <option className="bg-slate-900">2025</option>
                  <option className="bg-slate-900">2026</option>
                  <option className="bg-slate-900">2027</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Current GPA/Percentile</label>
                <input required type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white" placeholder="e.g. 3.8/4.0 or 85%" />
              </div>
            </div>
          </div>

          {/* Section: Tech Portfolio */}
          <div className="glass-card rounded-[2.5rem] p-10 lg:p-14">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-sm">3</span>
              Professional Ecosystem
            </h3>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Primary Domain Selection</label>
                  <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white appearance-none">
                    <option className="bg-slate-900">Generative AI Engineering</option>
                    <option className="bg-slate-900">Full Stack Architect</option>
                    <option className="bg-slate-900">Cloud & DevSecOps</option>
                    <option className="bg-slate-900">Product Designer (UI/UX)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">GitHub / Portfolio Link</label>
                  <input required type="url" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white" placeholder="https://github.com/username" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Statement of Intent (Min 100 words)</label>
                <textarea required rows={6} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white resize-none" placeholder="What specific problem in the 2026 tech landscape do you want to solve during your internship?"></textarea>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] transition-all shadow-2xl shadow-indigo-600/20 flex items-center justify-center gap-4 group"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin text-xl"></i>
            ) : (
              <>
                Finalize Application
                <i className="fa-solid fa-chevron-right group-hover:translate-x-2 transition-transform"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Registration;
