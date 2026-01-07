
import React, { useState, useEffect } from 'react';

interface Course {
  id: string;
  title: string;
  provider: string;
  skills: string[];
  link: string;
  auditLink?: string;
  type: 'Free' | 'Audit Free';
  category: 'AI & GenAI' | 'Data Science' | 'Full Stack' | 'Cloud';
  description?: string;
}

const SelfLearning: React.FC = () => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('AI & GenAI');

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
    {
      id: 'google-ai-essentials',
      title: "Google AI Essentials",
      provider: "Google",
      skills: ["AI Basics", "GenAI", "Prompting"],
      link: "https://grow.google/ai/",
      type: 'Free',
      category: 'AI & GenAI',
      description: "Learn the fundamentals of AI and how it's transforming the industry."
    },
    {
      id: 'intro-to-gen-ai',
      title: "Introduction to Generative AI",
      provider: "Google Cloud (Coursera)",
      skills: ["Large Language Models", "Responsible AI", "Vertex AI"],
      link: "https://www.coursera.org/learn/introduction-to-generative-ai",
      auditLink: "https://www.coursera.org/learn/introduction-to-generative-ai",
      type: 'Audit Free',
      category: 'AI & GenAI',
      description: "A comprehensive intro to generative models and their applications."
    },
    {
      id: 'elements-of-ai',
      title: "Elements of AI",
      provider: "University of Helsinki",
      skills: ["AI Algorithms", "Neural Networks", "Ethics"],
      link: "https://www.elementsofai.com/",
      type: 'Free',
      category: 'AI & GenAI'
    },
    {
      id: 'py-for-everybody',
      title: "Python for Everybody",
      provider: "Coursera",
      skills: ["Python", "Data Structures", "Databases"],
      link: "https://www.coursera.org/specializations/python",
      auditLink: "https://www.coursera.org/specializations/python",
      type: 'Audit Free',
      category: 'Data Science'
    },
    {
      id: 'kaggle-ml',
      title: "Intro to Machine Learning",
      provider: "Kaggle",
      skills: ["Scikit-Learn", "Model Validation", "Random Forests"],
      link: "https://www.kaggle.com/learn/intro-to-machine-learning",
      type: 'Free',
      category: 'Data Science'
    },
    {
      id: 'freecodecamp-fs',
      title: "Full Stack Developer",
      provider: "freeCodeCamp",
      skills: ["React", "Node.js", "MongoDB"],
      link: "https://www.freecodecamp.org/learn/",
      type: 'Free',
      category: 'Full Stack'
    }
  ];

  const categories = Array.from(new Set(courses.map(c => c.category)));

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-indigo-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
            <i className="fa-solid fa-graduation-cap mr-2"></i>
            TechSkyline Learning Hub (Free Courses)
          </div>
          <h2 className="text-5xl font-black text-white mb-6">Professional <span className="text-indigo-500">Learning Track</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Free global learning resources curated by TechSkyline. Complete learning → Apply skills → Earn internship certification.
          </p>
        </div>

        {/* Category Switcher */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-white/5 text-slate-500 border border-white/10 hover:border-indigo-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.filter(c => c.category === activeCategory).map((course) => (
            <div key={course.id} className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-white/5 hover:border-indigo-500/30 transition-all group">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-indigo-600/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-500/20">
                    {course.type}
                  </span>
                  {completedCourses.includes(course.id) && (
                    <span className="text-emerald-500 text-xs font-black uppercase flex items-center gap-1">
                      <i className="fa-solid fa-check-circle"></i> Completed
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                  Provider: <span className="text-slate-300">{course.provider}</span>
                </p>
                
                <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                  {course.description || `Master essential ${course.category} concepts with industry-leading faculty.`}
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
                  {course.type === 'Audit Free' ? 'Audit for Free' : 'Start Free Course'}
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
                  {completedCourses.includes(course.id) ? 'Completed' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Hub Footer */}
        <div className="mt-24 p-12 glass-card rounded-[3.5rem] border-indigo-500/20 bg-indigo-600/5 text-center">
           <i className="fa-solid fa-certificate text-4xl text-indigo-400 mb-6"></i>
           <h3 className="text-3xl font-black text-white mb-4">Certification Eligibility</h3>
           <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
             Completing these foundational courses unlocks your ability to apply for advanced internship certificates. Your progress is synced to our recruitment portal.
           </p>
           <div className="flex flex-wrap justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">{completedCourses.length}</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Completed</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">{courses.length}</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SelfLearning;
