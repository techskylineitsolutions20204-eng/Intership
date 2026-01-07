
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
  const [activeCategory, setActiveCategory] = useState<string>('AI & Generative AI');

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
      category: 'AI & Generative AI',
      description: "Learn how to use generative AI tools to help you at work and in your everyday life. Official Google training path."
    },
    {
      id: 'elements-of-ai',
      title: "Elements of AI",
      provider: "University of Helsinki",
      skills: ["AI Algorithms", "Neural Networks", "Ethics"],
      link: "https://www.elementsofai.com/",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & Generative AI',
      description: "A free massive open online course (MOOC) for everyone interested in learning what AI is, what is possible, and how it affects our lives."
    },
    {
      id: 'ibm-ai-fundamentals',
      title: "AI Fundamentals",
      provider: "IBM SkillsBuild",
      skills: ["AI Ethics", "Neural Networks", "Responsible AI"],
      link: "https://skillsbuild.org",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & Generative AI',
      description: "Comprehensive introduction to AI by IBM. Earn a verifiable badge and industry recognition."
    },
    // Data Science & Machine Learning
    {
      id: 'google-ml-crash-course',
      title: "Machine Learning Crash Course",
      provider: "Google Developers",
      skills: ["TensorFlow", "Feature Engineering", "Regularization", "Neural Nets"],
      link: "https://developers.google.com/machine-learning/crash-course",
      type: '100% Free',
      hasCertificate: false,
      category: 'Data Science & Machine Learning',
      description: "Google's fast-paced, practical introduction to machine learning, featuring a series of lessons with video lectures, real-world case studies, and hands-on practice exercises."
    },
    {
      id: 'fcc-ml-python',
      title: "Machine Learning with Python",
      provider: "freeCodeCamp",
      skills: ["TensorFlow", "Computer Vision", "NLP", "Reinforcement Learning"],
      link: "https://www.freecodecamp.org/learn/machine-learning-with-python/",
      type: '100% Free',
      hasCertificate: true,
      category: 'Data Science & Machine Learning',
      description: "Master the basics of machine learning using Python. You will learn to use the TensorFlow framework to build neural networks and solve complex problems."
    },
    {
      id: 'kaggle-ds',
      title: "Kaggle Data Science Labs",
      provider: "Kaggle",
      skills: ["Pandas", "Machine Learning", "Data Visualization"],
      link: "https://www.kaggle.com/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Data Science & Machine Learning',
      description: "Interactive coding labs for hands-on Data Science mastery on the world's largest data science platform."
    },
    // Software Engineering & DevOps
    {
      id: 'google-sdlc-codelabs',
      title: "Software Development Lifecycle (SDLC)",
      provider: "Google Cloud Codelabs",
      skills: ["CI/CD", "Security", "Automation", "Software Supply Chain"],
      link: "https://codelabs.developers.google.com/sdlc/instructions#0",
      type: '100% Free',
      hasCertificate: false,
      category: 'Software Engineering & DevOps',
      description: "Hands-on guide to securing and optimizing the software development lifecycle using modern cloud tools and best practices."
    },
    {
      id: 'exercism-coding',
      title: "Programming Excellence",
      provider: "Exercism",
      skills: ["Coding Challenges", "Mentorship", "Algorithms", "Clean Code"],
      link: "https://exercism.org/",
      type: '100% Free',
      hasCertificate: false,
      category: 'Software Engineering & DevOps',
      description: "Develop fluency in 70+ programming languages with high-quality exercises and human-led code reviews. 100% free forever."
    },
    {
      id: 'ms-azure-fundamentals',
      title: "Azure Fundamentals (AZ-900)",
      provider: "Microsoft Learn",
      skills: ["Cloud Concepts", "Azure Services", "Security"],
      link: "https://learn.microsoft.com/training",
      type: '100% Free',
      hasCertificate: true,
      category: 'Software Engineering & DevOps',
      description: "Official Microsoft path to cloud proficiency. Access all documentation and practice labs for free."
    },
    // UX & Product Design
    {
      id: 'uxcel-ai-ux',
      title: "AI Fundamentals for UX",
      provider: "Uxcel",
      skills: ["AI Design", "UX Research", "Generative UX", "Workflow AI"],
      link: "https://app.uxcel.com/courses/ai-fundamentals-for-ux",
      type: '100% Free',
      hasCertificate: true,
      category: 'UX & Product Design',
      description: "Learn how to integrate AI tools into your UX design workflow to speed up research, ideation, and production."
    }
  ];

  const categories = Array.from(new Set(courses.map(c => c.category)));

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-emerald-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
            <i className="fa-solid fa-gift mr-2"></i>
            Global Free Education Node
          </div>
          <h2 className="text-5xl font-black text-white mb-6">TechSkyline <span className="text-indigo-500">Learning Hub</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Curated list of premium courses from <span className="text-white font-bold">Google, IBM, University of Helsinki, and more</span>. All are <span className="text-emerald-500 font-bold">100% Free. No Payment Mode Required.</span>
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
          {activeCategory} Track
        </h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.filter(c => c.category === activeCategory).map((course) => (
            <div key={course.id} className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden h-full">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
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
                
                <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                  Partner: <span className="text-slate-300">{course.provider}</span>
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
                  className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all shadow-xl"
                >
                  Access Resource
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
                  {completedCourses.includes(course.id) ? 'Marked: Finished' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Access Policy Section */}
        <div className="mt-24 p-12 glass-card rounded-[4rem] border-emerald-500/20 bg-emerald-600/5 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
           
           <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl shadow-emerald-500/10 border border-emerald-500/20">
              <i className="fa-solid fa-earth-americas"></i>
           </div>
           <h3 className="text-4xl font-black text-white mb-4">Global Zero-Cost Policy</h3>
           <p className="text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed text-lg">
             TechSkyline IT Solutions collaborates with platforms like <span className="text-white">Google Developers, Coursera, and Exercism</span> to verify that these paths remain open to all interns without financial commitment.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/5 pt-12">
              {[
                { label: "Cost", val: "$0.00" },
                { label: "Trials", val: "NONE" },
                { label: "EMI", val: "NONE" },
                { label: "Certificates", val: "FREE PATHS" }
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
