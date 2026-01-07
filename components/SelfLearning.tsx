
import React, { useState, useEffect } from 'react';

interface Course {
  id: string;
  title: string;
  provider: string;
  skills: string[];
  link: string;
  type: '100% Free';
  hasCertificate: boolean;
  category: string;
  description: string;
}

const SelfLearning: React.FC = () => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('AI & Generative AI Internship');

  useEffect(() => {
    const saved = localStorage.getItem('ts_completed_courses');
    if (saved) setCompletedCourses(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: string) => {
    const updated = completedCourses.includes(id) 
      ? completedCourses.filter(c => c !== id) 
      : [...completedCourses, id];
    setCompletedCourses(updated);
    localStorage.setItem('ts_completed_courses', JSON.stringify(updated));
    
    // Also sync to dashboard progress for certificate unlocking
    const savedDashboard = localStorage.getItem('ts_dashboard_progress');
    const dashboard = savedDashboard ? JSON.parse(savedDashboard) : {};
    dashboard[id] = !completedCourses.includes(id);
    localStorage.setItem('ts_dashboard_progress', JSON.stringify(dashboard));
  };

  const courses: Course[] = [
    // AI & Generative AI
    {
      id: 'google-ai-essentials',
      title: "Google AI Essentials",
      provider: "Google Skillshop",
      skills: ["AI Basics", "GenAI", "Prompting"],
      link: "https://grow.google/ai/",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & Generative AI Internship',
      description: "Master the fundamentals of AI at zero cost. Official Google training path."
    },
    {
      id: 'ibm-ai-fundamentals',
      title: "AI Fundamentals",
      provider: "IBM SkillsBuild",
      skills: ["AI Ethics", "Neural Networks", "Responsible AI"],
      link: "https://skillsbuild.org",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & Generative AI Internship',
      description: "Comprehensive introduction to AI by IBM. Earn a verifiable badge."
    },
    {
      id: 'google-genai-path',
      title: "Generative AI Learning Path",
      provider: "Google Cloud",
      skills: ["LLMs", "Image Generation", "Vertex AI"],
      link: "https://www.cloudskillsboost.google/paths/118",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & Generative AI Internship',
      description: "Official Google Cloud path for mastering Generative AI models."
    },
    // Data Science & Python
    {
      id: 'fcc-py-everybody',
      title: "Python for Everybody",
      provider: "freeCodeCamp",
      skills: ["Python", "Data Structures", "Web Scraping"],
      link: "https://www.freecodecamp.org/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Data Science & Python Internship',
      description: "The world's most popular free Python course. Non-profit education."
    },
    {
      id: 'kaggle-ds',
      title: "Kaggle Data Science Labs",
      provider: "Kaggle",
      skills: ["Pandas", "Machine Learning", "Data Visualization"],
      link: "https://www.kaggle.com/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Data Science & Python Internship',
      description: "Interactive coding labs for hands-on Data Science mastery."
    },
    // Cybersecurity
    {
      id: 'cisco-intro-cyber',
      title: "Introduction to Cybersecurity",
      provider: "Cisco Networking Academy",
      skills: ["Security Ops", "Network Defense", "Threat Intel"],
      link: "https://skillsforall.com",
      type: '100% Free',
      hasCertificate: true,
      category: 'Cybersecurity Internship',
      description: "Foundational security training from Cisco. Industry recognized."
    },
    {
      id: 'ibm-cyber-fundamentals',
      title: "Cybersecurity Fundamentals",
      provider: "IBM SkillsBuild",
      skills: ["Cryptography", "Cloud Security", "SOC Operations"],
      link: "https://www.ibm.com/skills/learn/cybersecurity",
      type: '100% Free',
      hasCertificate: true,
      category: 'Cybersecurity Internship',
      description: "Professional grade security curriculum provided for free by IBM."
    },
    // Cloud & DevOps
    {
      id: 'ms-azure-fundamentals',
      title: "Azure Fundamentals (AZ-900)",
      provider: "Microsoft Learn",
      skills: ["Cloud Concepts", "Azure Services", "Security"],
      link: "https://learn.microsoft.com/training",
      type: '100% Free',
      hasCertificate: true,
      category: 'Azure & DevOps Internship',
      description: "Official Microsoft path to cloud proficiency. Unlimited access."
    },
    {
      id: 'aws-free-tier',
      title: "AWS Technical Essentials",
      provider: "AWS Training",
      skills: ["EC2", "S3", "IAM", "VPC"],
      link: "https://www.aws.training/LearningLibrary?filters=free",
      type: '100% Free',
      hasCertificate: true,
      category: 'Azure & DevOps Internship',
      description: "Get started with the world's most popular cloud platform for free."
    }
  ];

  const categories = Array.from(new Set(courses.map(c => c.category)));

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-emerald-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
            <i className="fa-solid fa-gift mr-2"></i>
            Verified 100% Free Program
          </div>
          <h2 className="text-5xl font-black text-white mb-6">TechSkyline <span className="text-indigo-500">Learning Hub</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Curated list of globally trusted courses. <span className="text-emerald-500 font-bold">No Payments. No EMI. No Trial Versions.</span> Complete these to unlock TechSkyline project access.
          </p>
        </div>

        {/* Category Switcher */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-white/5 text-slate-500 border border-white/10 hover:border-indigo-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Track Title */}
        <h2 className="text-3xl font-black text-white mb-10 border-l-4 border-indigo-600 pl-6">
          {activeCategory}
        </h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.filter(c => c.category === activeCategory).map((course) => (
            <div key={course.id} className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden h-full">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 w-fit">
                      {course.type}
                    </span>
                    {course.hasCertificate && (
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-blue-500/20 w-fit">
                        Free Certificate
                      </span>
                    )}
                  </div>
                  {completedCourses.includes(course.id) && (
                    <span className="text-emerald-500 text-[10px] font-black uppercase flex items-center gap-1">
                      <i className="fa-solid fa-circle-check"></i> Completed
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                  Provider: <span className="text-slate-300">{course.provider}</span>
                </p>
                
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {course.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-white/5 text-slate-500 text-[9px] font-bold rounded-lg border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={course.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all shadow-xl"
                >
                  Start Course (Free)
                  <i className="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
                </a>
                <button 
                  onClick={() => toggleComplete(course.id)}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                    completedCourses.includes(course.id)
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {completedCourses.includes(course.id) ? 'Status: Completed' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelfLearning;
