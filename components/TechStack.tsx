
import React, { useState, useMemo } from 'react';

interface TechStackProps {
  onApply?: () => void;
}

const TechStack: React.FC<TechStackProps> = ({ onApply }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const techCategories = useMemo(() => [
    {
      title: "AI & Data Science",
      icon: "fa-robot",
      color: "from-purple-600 to-indigo-700",
      skills: ["Foundation of AI", "Neural Networks", "Data Modeling", "AI Automation"],
      difficulty: "Advanced",
      demand: "Critical"
    },
    {
      title: "Enterprise Ecosystems (SAP)",
      icon: "fa-database",
      color: "from-blue-600 to-blue-800",
      skills: ["SAP S/4HANA (H4 Hana)", "SAP IBP / OBP", "SAP Ariba", "ABAP Intelligence"],
      difficulty: "Hard",
      demand: "High"
    },
    {
      title: "Project Management (Oracle)",
      icon: "fa-diagram-project",
      color: "from-red-600 to-rose-800",
      skills: ["Oracle Primavera Unifier", "Oracle P6 Professional", "Workday HCM", "Resource Allocation"],
      difficulty: "Intermediate",
      demand: "Steady"
    },
    {
      title: "Automation & Robotics",
      icon: "fa-gears",
      color: "from-emerald-500 to-teal-700",
      skills: ["RPA Workflows", "Industrial Robotics", "IOT Integration", "Edge 5G Systems"],
      difficulty: "Innovation",
      demand: "Emerging"
    },
    {
      title: "Cloud & DevSecOps",
      icon: "fa-cloud-binary",
      color: "from-orange-500 to-red-600",
      skills: ["AWS / Azure DevOps", "Google Cloud Security", "Terraform", "Zero Trust IAM"],
      difficulty: "Hard",
      demand: "Extreme"
    },
    {
      title: "Intelligence Tools",
      icon: "fa-chart-line",
      color: "from-amber-500 to-orange-600",
      skills: ["Power BI", "Tableau", "SQL Analytics", "Predictive Reporting"],
      difficulty: "Standard",
      demand: "High"
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
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SAP, Oracle, AI, RPA..."
              className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-white text-lg placeholder:text-slate-600"
            />
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-slate-500"></i>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="glass-card rounded-[3rem] p-10 hover:border-indigo-500/40 transition-all group animate-fade-in-up">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-8 shadow-lg shadow-black/20`}>
                <i className={`fa-solid ${cat.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 leading-tight">{cat.title}</h3>
              <div className="space-y-3 mb-10">
                {cat.skills.map((skill, i) => (
                  <div key={i} className="flex items-center text-slate-400 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3"></div>
                    {skill}
                  </div>
                ))}
              </div>
              <button onClick={onApply} className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-slate-950 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                Enroll in Track
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
