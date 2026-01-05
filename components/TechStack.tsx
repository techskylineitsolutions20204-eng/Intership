
import React from 'react';

const TechStack: React.FC = () => {
  const techCategories = [
    {
      title: "Generative AI Engineering",
      icon: "fa-brain",
      color: "from-purple-500 to-indigo-600",
      skills: ["LLM Orchestration", "Vector Databases", "LangChain/LlamaIndex", "Prompt Engineering"],
      difficulty: "Advanced",
      demand: "Critical"
    },
    {
      title: "Advanced Web Systems",
      icon: "fa-code",
      color: "from-blue-500 to-cyan-500",
      skills: ["React 19 Server Components", "Next.js 15+", "WebAssembly (WASM)", "Edge Runtime"],
      difficulty: "Intermediate",
      demand: "High"
    },
    {
      title: "High-Perf Backend",
      icon: "fa-server",
      color: "from-emerald-500 to-teal-600",
      skills: ["Rust for Systems", "Go Microservices", "PostgreSQL Optimization", "Redis Mastery"],
      difficulty: "Advanced",
      demand: "Steady"
    },
    {
      title: "Cloud & DevSecOps",
      icon: "fa-shield-halved",
      color: "from-orange-500 to-red-600",
      skills: ["Kubernetes", "Infrastructure as Code", "Zero Trust Security", "AWS/Azure Mastery"],
      difficulty: "Hard",
      demand: "High"
    },
    {
      title: "Mobile Ecosystems",
      icon: "fa-mobile-screen",
      color: "from-pink-500 to-rose-600",
      skills: ["Flutter Multi-platform", "SwiftUI", "Jetpack Compose", "React Native"],
      difficulty: "Intermediate",
      demand: "Moderate"
    },
    {
      title: "UI/UX & Product Design",
      icon: "fa-palette",
      color: "from-amber-400 to-orange-500",
      skills: ["Figma Variables", "Motion Design", "Design Systems", "User Psychology"],
      difficulty: "Creative",
      demand: "High"
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-6 tracking-tight">2026 Tech Mastery Matrix</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our internship curriculum maps directly to these high-impact domains. 
            Select your track to dominate the 2026 hiring landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((cat, idx) => (
            <div key={idx} className="glass-card rounded-[2rem] p-8 hover:scale-[1.02] transition-all duration-300 group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10`}>
                <i className={`fa-solid ${cat.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{cat.title}</h3>
              
              <div className="space-y-3 mb-8">
                {cat.skills.map((skill, i) => (
                  <div key={i} className="flex items-center text-slate-400">
                    <i className="fa-solid fa-check text-indigo-500 text-[10px] mr-3"></i>
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Complexity</span>
                  <span className="text-sm font-bold text-white">{cat.difficulty}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">2026 Demand</span>
                  <span className="text-sm font-bold text-indigo-400">{cat.demand}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-indigo-600/10 border border-indigo-500/20 rounded-[3rem] text-center">
          <h4 className="text-2xl font-bold text-white mb-4">Master Every Tool in the Box</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {['Git', 'Docker', 'Figma', 'Slack', 'Jira', 'Postman', 'Vercel', 'Datadog'].map(tool => (
              <span key={tool} className="px-6 py-2 glass-card rounded-full text-sm font-bold text-slate-300 border border-white/10">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
