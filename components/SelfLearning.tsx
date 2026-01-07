
import React, { useState, useEffect } from 'react';

interface Course {
  id: string;
  title: string;
  provider: string;
  skills: string[];
  link: string;
  auditLink?: string;
  type: '100% Free' | 'Audit for Free';
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
  };

  const courses: Course[] = [
    // AI & Generative AI Internship
    {
      id: 'google-ai-essentials',
      title: "Google AI Essentials",
      provider: "Google",
      skills: ["AI Basics", "GenAI", "Prompting"],
      link: "https://grow.google/ai/",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & Generative AI Internship',
      description: "Learn how to use generative AI tools to help you at work and in your everyday life. This is a 100% free course with no payment or trial required."
    },
    {
      id: 'intro-to-gen-ai-coursera',
      title: "Introduction to Generative AI",
      provider: "Google Cloud (Coursera)",
      skills: ["Large Language Models", "Responsible AI", "Generative AI Foundations"],
      link: "https://www.coursera.org/learn/introduction-to-generative-ai",
      auditLink: "https://www.coursera.org/learn/introduction-to-generative-ai",
      type: 'Audit for Free',
      hasCertificate: false,
      category: 'AI & Generative AI Internship',
      description: "This course explains what Generative AI is, how it is used, and how it differs from traditional machine learning methods."
    },
    {
      id: 'ibm-ai-fundamentals',
      title: "AI Fundamentals",
      provider: "IBM SkillsBuild",
      skills: ["AI Ethics", "Neural Networks", "IBM Watson"],
      link: "https://skillsbuild.org",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & Generative AI Internship',
      description: "A comprehensive intro to AI provided by IBM. Always free, no subscription required."
    },
    // Data Science & Python Internship
    {
      id: 'fcc-py-everybody',
      title: "Python for Everybody",
      provider: "freeCodeCamp",
      skills: ["Python", "Data Structures", "Network Programming"],
      link: "https://www.freecodecamp.org/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Data Science & Python Internship',
      description: "The gold standard for learning Python. Entirely free, no payment modes or EMI plans."
    },
    {
      id: 'fcc-data-analysis',
      title: "Data Analysis with Python",
      provider: "freeCodeCamp",
      skills: ["NumPy", "Pandas", "Matplotlib"],
      link: "https://www.freecodecamp.org/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Data Science & Python Internship',
      description: "Learn to process data at scale. Non-profit education with no hidden costs."
    },
    // Full Stack Developer Internship
    {
      id: 'fcc-responsive-web',
      title: "Responsive Web Design",
      provider: "freeCodeCamp",
      skills: ["HTML5", "CSS3", "Flexbox", "Grid"],
      link: "https://www.freecodecamp.org/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Full Stack Developer Internship',
      description: "Learn modern web design from scratch. 100% free and certificate included."
    },
    // Cybersecurity Internship
    {
      id: 'cisco-intro-cyber',
      title: "Introduction to Cybersecurity",
      provider: "Cisco Networking Academy",
      skills: ["Security Principles", "Threat Actor Motives", "Risk Management"],
      link: "https://www.netacad.com",
      type: '100% Free',
      hasCertificate: true,
      category: 'Cybersecurity Internship',
      description: "Start your career in security with Cisco. Zero fees, permanent access."
    }
  ];

  const categories = Array.from(new Set(courses.map(c => c.category)));

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-emerald-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
            <i className="fa-solid fa-gift mr-2"></i>
            100% Free Courses - No Payment Mode - No EMI - No Trials
          </div>
          <h2 className="text-5xl font-black text-white mb-6">TechSkyline <span className="text-indigo-500">Learning Hub</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Curated list of professional internship learning tracks. <span className="text-emerald-500 font-bold">Every course is 100% free with NO payments, NO EMI plans, and NO trial versions.</span>
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
                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border w-fit ${
                      course.type === '100% Free' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {course.type}
                    </span>
                    {course.hasCertificate && (
                      <span className="px-3 py-1 bg-white/5 text-slate-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-white/10 w-fit">
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
                  {course.type === 'Audit for Free' ? 'Audit for Free' : 'Start Free Course'}
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

        {/* Information Section */}
        <div className="mt-24 p-12 glass-card rounded-[4rem] border-emerald-500/20 bg-emerald-600/5 text-center relative overflow-hidden">
           <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl shadow-emerald-500/10 border border-emerald-500/20">
              <i className="fa-solid fa-stamp"></i>
           </div>
           <h3 className="text-4xl font-black text-white mb-4">University Verification Node</h3>
           <p className="text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed text-lg">
             Completion of these tracks is vetted as part of the <span className="text-white">TechSkyline ISO Certified Internship</span>. We collaborate with colleges globally to ensure these skills are recognized for academic credits.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/5 pt-12">
              {[
                { label: "Cost", val: "$0.00" },
                { label: "EMI Plans", val: "NONE" },
                { label: "Access", val: "PERMANENT" },
                { label: "Status", val: "100% FREE" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">{stat.label}</span>
                  <span className="text-xl font-black text-white">{stat.val}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default SelfLearning;
