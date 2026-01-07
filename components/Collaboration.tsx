
import React from 'react';

const Collaboration: React.FC = () => {
  const benefits = [
    {
      title: "IITM Pravartak Advantage",
      description: "Experience a 2-day campus immersion at IIT Madras Research Park and learn from specialized faculty.",
      icon: "fa-building-columns",
      color: "red"
    },
    {
      title: "Prestigious Dual Certification",
      description: "Earn certifications from IITM Pravartak and TechSkyline, plus Microsoft-branded credentials.",
      icon: "fa-certificate",
      color: "indigo"
    },
    {
      title: "AI-Powered Skills",
      description: "Hands-on expertise in AWS, Azure, GCP, and Azure AI Foundry Agents for modern workloads.",
      icon: "fa-brain",
      color: "blue"
    },
    {
      title: "Job Assist Plus",
      description: "Access opportunities from 400+ hiring partners, AI-powered resume reviews, and mentoring.",
      icon: "fa-briefcase",
      color: "green"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Institutional Alliances
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">University Partnership Program</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We bridge academia and industry through a multi-dimensional ecosystem, providing students with production-level skills and institutions with high placement rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
              <div className={`w-14 h-14 rounded-2xl bg-${benefit.color}-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${benefit.icon} text-${benefit.color}-600 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">{benefit.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 relative rounded-[4rem] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1523050335192-ce11558cd97d?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover opacity-20" 
              alt="University Collaboration" 
            />
          </div>
          <div className="relative z-10 p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-2/3">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Empower Your Students with 2026 Skills</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                TechSkyline collaborates with placement cells and faculty to integrate our industry projects directly into the academic timeline. From live workshops to 100% free learning hubs, we offer a comprehensive package for your institution.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 text-white">
                   <i className="fa-solid fa-check-circle text-emerald-500"></i>
                   <span className="text-sm font-bold">IITM Pravartak Partnered</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                   <i className="fa-solid fa-check-circle text-emerald-500"></i>
                   <span className="text-sm font-bold">Microsoft Dual Certifications</span>
                </div>
              </div>
            </div>
            <button className="px-10 py-5 bg-indigo-600 text-white hover:bg-indigo-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-indigo-600/30 whitespace-nowrap">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
