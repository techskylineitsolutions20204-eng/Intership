
import React, { useState, useMemo } from 'react';

interface TechStackProps {
  onApply?: () => void;
}

const TechStack: React.FC<TechStackProps> = ({ onApply }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const techCategories = useMemo(() => [
    {
      title: "Quality Engineering (QA)",
      icon: "fa-vial-circle-check",
      color: "from-blue-600 to-indigo-700",
      skills: ["Manual & Automation Testing", "API Testing (Postman/Rest)", "Performance (JMeter/K6)", "Cypress & Playwright"],
      difficulty: "Intermediate",
      demand: "High"
    },
    {
      title: "AI & Agentic Systems",
      icon: "fa-robot",
      color: "from-purple-600 to-fuchsia-700",
      skills: ["Agentic Workflows", "Multi-Agent Systems", "Neural Networks", "Computer Vision"],
      difficulty: "Advanced",
      demand: "Critical"
    },
    {
      title: "Generative AI & LLMs",
      icon: "fa-wand-magic-sparkles",
      color: "from-indigo-500 to-blue-500",
      skills: ["LLM Fine-tuning", "Vector Databases", "LangChain & RAG", "Prompt Engineering"],
      difficulty: "Advanced",
      demand: "Critical"
    },
    {
      title: "Data Intelligence",
      icon: "fa-chart-network",
      color: "from-cyan-500 to-blue-600",
      skills: ["Data Science & Analytics", "Data Engineering (ETL)", "Predictive Modeling", "Big Data (Spark/Hadoop)"],
      difficulty: "Hard",
      demand: "Very High"
    },
    {
      title: "Cloud & DevOps",
      icon: "fa-cloud-binary",
      color: "from-orange-500 to-red-600",
      skills: ["AWS / Azure / GCP", "Kubernetes & Docker", "CI/CD Pipelines", "Infrastructure as Code"],
      difficulty: "Hard",
      demand: "Extreme"
    },
    {
      title: "Cybersecurity & IAM",
      icon: "fa-user-shield",
      color: "from-red-600 to-rose-700",
      skills: ["Identity Access (IAM)", "Okta & SailPoint", "Zero Trust Security", "Threat Intelligence"],
      difficulty: "Advanced",
      demand: "High"
    },
    {
      title: "Enterprise Solutions",
      icon: "fa-building-columns",
      color: "from-amber-500 to-orange-600",
      skills: ["SAP S/4HANA & Oracle", "Workday Integrations", "Salesforce Development", "ERP Modernization"],
      difficulty: "Intermediate",
      demand: "Steady"
    },
    {
      title: "Full Stack Development",
      icon: "fa-code-merge",
      color: "from-emerald-500 to-teal-600",
      skills: ["React 19 & Next.js", "Node.js & Go", "Microservices Design", "System Architecture"],
      difficulty: "Intermediate",
      demand: "Perpetual"
    },
    {
      title: "Business Strategy",
      icon: "fa-briefcase",
      color: "from-slate-600 to-slate-800",
      skills: ["Business Analysis (BA)", "Project Management", "Agile & Scrum Mastery", "Stakeholder Management"],
      difficulty: "General",
      demand: "High"
    },
    {
      title: "Emerging Tech",
      icon: "fa-satellite-dish",
      color: "from-violet-600 to-indigo-800",
      skills: ["Blockchain & Web3", "IoT Edge Systems", "RPA (UiPath)", "6G & Future Networks"],
      difficulty: "Innovative",
      demand: "Emerging"
    }
  ], []);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return techCategories;

    return techCategories.filter(cat => 
      cat.title.toLowerCase().includes(query) || 
      cat.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }, [searchQuery, techCategories]);

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 glass-card text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Evolutionary Mastery
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">2026 Tech Mastery Matrix</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Our internship curriculum maps directly to these high-impact domains. 
            Choose your specialization and lead the next wave of innovation.
          </p>

          {/* Search Bar Implementation */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-slate-500 group-focus-within:text-blue-500 transition-colors"></i>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by technology name or specific skill (e.g. 'React', 'SAP', 'Testing')..."
              className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-white text-lg placeholder:text-slate-600"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-6 flex items-center text-slate-500 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredCategories.map((cat, idx) => (
              <div 
                key={idx} 
                className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between hover:scale-[1.02] hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden animate-fade-in-up"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br opacity-5 blur-2xl group-hover:opacity-20 transition-opacity rounded-full"></div>
                
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10 group-hover:rotate-6 transition-transform`}>
                    <i className={`fa-solid ${cat.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-4 leading-tight">{cat.title}</h3>
                  
                  <div className="space-y-2.5 mb-8">
                    {cat.skills.map((skill, i) => (
                      <div key={i} className="flex items-center text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3 opacity-60"></div>
                        <span className="text-[13px] font-medium tracking-tight">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Market Status</span>
                      <span className="text-xs font-bold text-white">{cat.demand}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Curriculum</span>
                      <span className="text-xs font-bold text-indigo-400">2026 Ver.</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={onApply}
                    className="w-full py-3 bg-white/5 hover:bg-white text-white hover:text-slate-950 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Apply for Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-700">
              <i className="fa-solid fa-microscope text-4xl"></i>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">No matching domains found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Our 2026 Tech Matrix is expansive, but your current query didn't yield results. 
              Try searching for "AI", "SAP", "Cloud", or "Data".
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all"
            >
              Clear Search Filters
            </button>
          </div>
        )}

        <div className="mt-20 p-12 bg-gradient-to-r from-indigo-900/20 to-blue-900/20 border border-white/10 rounded-[3rem] text-center">
          <h4 className="text-2xl font-black text-white mb-6">Cross-Functional Toolkit</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {['GitFlow', 'Docker Engine', 'Figma Pro', 'Agile/Jira', 'Postman AI', 'Vercel Edge', 'DataDog', 'Terraform'].map(tool => (
              <span key={tool} className="px-5 py-2 glass-card rounded-xl text-[11px] font-bold text-slate-300 border border-white/5 hover:border-indigo-500/50 transition-colors cursor-default">
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
