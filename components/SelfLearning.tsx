
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
  const [activeCategory, setActiveCategory] = useState<string>('GenAI & Advanced LLMs');

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
    // GenAI & Advanced LLMs (Google Skills & deeplearning.ai)
    {
      id: 'google-genai-softdev',
      title: "Gen AI for Software Developers",
      provider: "Google Cloud Skills",
      skills: ["AI coding", "Duet AI", "Software Lifecycle"],
      link: "https://www.skills.google/paths/1951",
      type: '100% Free',
      hasCertificate: true,
      category: 'GenAI & Advanced LLMs',
      description: "Harness the power of Generative AI to accelerate your development workflow and software creation process."
    },
    {
      id: 'google-intro-genai',
      title: "Introduction to Generative AI",
      provider: "Google Cloud Skills",
      skills: ["GenAI Foundations", "LLM Theory"],
      link: "https://www.skills.google/paths/118/course_templates/554",
      type: '100% Free',
      hasCertificate: true,
      category: 'GenAI & Advanced LLMs',
      description: "The official introductory course to Generative AI concepts from Google Cloud engineers."
    },
    {
      id: 'google-responsible-ai',
      title: "Introduction to Responsible AI",
      provider: "Google Cloud Skills",
      skills: ["AI Ethics", "Safety", "Bias Mitigation"],
      link: "https://www.skills.google/course_templates/1076",
      type: '100% Free',
      hasCertificate: true,
      category: 'GenAI & Advanced LLMs',
      description: "Learn how Google implements responsible AI in its products and how to apply ethics to your own AI builds."
    },
    {
      id: 'google-intro-llms',
      title: "Introduction to Large Language Models",
      provider: "Google Cloud Skills",
      skills: ["LLM Architecture", "Prompting"],
      link: "https://www.skills.google/course_templates/552",
      type: '100% Free',
      hasCertificate: true,
      category: 'GenAI & Advanced LLMs',
      description: "Deep dive into what Large Language Models are, their use cases, and how to use prompt tuning."
    },
    {
      id: 'google-attention-mechanism',
      title: "Attention Mechanism Deep Dive",
      provider: "Google Cloud Skills",
      skills: ["Neural Networks", "Attention", "Transformers"],
      link: "https://www.skills.google/paths/118/course_templates/536",
      type: '100% Free',
      hasCertificate: true,
      category: 'GenAI & Advanced LLMs',
      description: "Master the attention mechanism that revolutionized the way neural networks handle sequential data."
    },
    {
      id: 'dl-multi-agent-crewai',
      title: "Multi-AI Agent Systems with CrewAI",
      provider: "DeepLearning.AI",
      skills: ["AI Agents", "CrewAI", "Orchestration"],
      link: "https://learn.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai/lesson/wwou5/introduction",
      type: '100% Free',
      hasCertificate: false,
      category: 'GenAI & Advanced LLMs',
      description: "Learn to build teams of autonomous AI agents that collaborate to solve complex business tasks."
    },
    {
      id: 'dl-orchestrating-genai',
      title: "Orchestrating GenAI Workflows",
      provider: "DeepLearning.AI",
      skills: ["Workflows", "LangChain", "LLMOps"],
      link: "https://learn.deeplearning.ai/courses/orchestrating-workflows-for-genai-applications/lesson/tw64g/introduction",
      type: '100% Free',
      hasCertificate: false,
      category: 'GenAI & Advanced LLMs',
      description: "Advanced techniques for chaining LLM calls and creating production-grade AI applications."
    },
    // Machine Learning & Data Intelligence (fCC & Google)
    {
      id: 'fcc-ml-python-track',
      title: "Machine Learning with Python",
      provider: "freeCodeCamp",
      skills: ["TensorFlow", "Keras", "Scikit-Learn"],
      link: "https://www.freecodecamp.org/learn/machine-learning-with-python/",
      type: '100% Free',
      hasCertificate: true,
      category: 'Machine Learning & Data Intelligence',
      description: "Complete machine learning curriculum starting from linear regression to deep neural networks."
    },
    {
      id: 'google-ml-crash-course-2026',
      title: "Google Machine Learning Crash Course",
      provider: "Google Developers",
      skills: ["TensorFlow", "Validation", "Classification"],
      link: "https://developers.google.com/machine-learning/crash-course",
      type: '100% Free',
      hasCertificate: false,
      category: 'Machine Learning & Data Intelligence',
      description: "Google's fast-paced, practical introduction to ML. Used internally by Google engineers."
    },
    {
      id: 'dl-pytorch-professional',
      title: "PyTorch for Deep Learning",
      provider: "DeepLearning.AI",
      skills: ["PyTorch", "Computer Vision", "NLP"],
      link: "https://learn.deeplearning.ai/specializations/pytorch-for-deep-learning-professional-certificate/",
      type: '100% Free',
      hasCertificate: true,
      category: 'Machine Learning & Data Intelligence',
      description: "Professional path to mastering PyTorch, featuring insights from Laurence Moroney and Andrew Ng."
    },
    // Software Engineering & Security (Google Codelabs)
    {
      id: 'google-sdlc-security',
      title: "Secure SDLC Implementation",
      provider: "Google Cloud Codelabs",
      skills: ["Security", "Software Supply Chain", "Automation"],
      link: "https://codelabs.developers.google.com/sdlc/instructions#0",
      type: '100% Free',
      hasCertificate: false,
      category: 'Software Engineering & Security',
      description: "Hands-on implementation of a secure software development lifecycle using modern cloud primitives."
    },
    {
      id: 'google-image-gen',
      title: "Introduction to Image Generation",
      provider: "Google Cloud Skills",
      skills: ["Diffusion Models", "Stable Diffusion", "Generative Art"],
      link: "https://www.skills.google/paths/118/course_templates/539",
      type: '100% Free',
      hasCertificate: true,
      category: 'GenAI & Advanced LLMs',
      description: "Learn the mechanics of diffusion models and how to generate high-quality visual assets using AI."
    }
  ];

  const categories = Array.from(new Set(courses.map(c => c.category)));

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-emerald-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
            <i className="fa-solid fa-graduation-cap mr-2"></i>
            Enterprise Training Hub v2026
          </div>
          <h2 className="text-5xl font-black text-white mb-6">TechSkyline <span className="text-indigo-500">Training Hub</span></h2>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Curated high-performance learning tracks featuring content from <span className="text-white font-bold">DeepLearning.AI, Google Cloud, and freeCodeCamp</span>. <span className="text-emerald-500 font-bold underline underline-offset-4 decoration-emerald-500/30">All 100% Free. No Paywalls.</span>
          </p>
        </div>

        {/* Global Policy Alert */}
        <div className="mb-12 p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl group-hover:bg-indigo-600/10 transition-colors"></div>
           <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-indigo-600/20">
              <i className="fa-solid fa-lock-open"></i>
           </div>
           <div>
              <h4 className="text-white font-black text-lg mb-2 uppercase tracking-widest flex items-center gap-3">
                Zero-Cost Integration Policy
              </h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                TechSkyline ensures that every training resource listed here is verified for <strong>Zero Cost Access</strong>. If you are prompted for a credit card or trial, look for the 'Audit' or 'Free' path. Our mission is pure skill acquisition.
              </p>
           </div>
        </div>

        {/* Category Switcher */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-white/5 text-slate-500 border border-white/10 hover:border-indigo-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Track Label */}
        <div className="mb-10 flex items-center gap-4">
           <div className="h-px bg-indigo-500/20 flex-grow"></div>
           <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] whitespace-nowrap">
            {activeCategory} Specialization
           </h2>
           <div className="h-px bg-indigo-500/20 flex-grow"></div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.filter(c => c.category === activeCategory).map((course) => (
            <div key={course.id} className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden h-full">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 w-fit">
                      {course.type}
                    </span>
                    {course.hasCertificate && (
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-blue-500/20 w-fit">
                        Free Cert Path
                      </span>
                    )}
                  </div>
                  {completedCourses.includes(course.id) && (
                    <span className="text-emerald-500 text-[10px] font-black uppercase flex items-center gap-1">
                      <i className="fa-solid fa-circle-check"></i> Verified
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-building-columns text-indigo-500"></i>
                  Partner: <span className="text-slate-300">{course.provider}</span>
                </p>
                
                <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
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
                  className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all shadow-xl group/btn"
                >
                  Enter Lab Environment
                  <i className="fa-solid fa-arrow-up-right-from-square text-[8px] group-hover/btn:rotate-45 transition-transform"></i>
                </a>
                <button 
                  onClick={() => toggleComplete(course.id)}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                    completedCourses.includes(course.id)
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {completedCourses.includes(course.id) ? 'Certification: Unlocked' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Access Verification Node */}
        <div className="mt-24 p-12 glass-card rounded-[4rem] border-indigo-500/20 bg-indigo-600/5 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
           
           <div className="w-20 h-20 bg-indigo-500/10 text-indigo-400 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl shadow-indigo-500/10 border border-indigo-500/20">
              <i className="fa-solid fa-passport"></i>
           </div>
           <h3 className="text-4xl font-black text-white mb-4">Official Verification Node</h3>
           <p className="text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed text-lg">
             TechSkyline IT Solutions collaborates with platforms like <span className="text-white">Google Developers, DeepLearning.AI, and freeCodeCamp</span> to provide a unified training portal for our interns. Your completion of these tracks is verifiable via your Dashboard.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/5 pt-12">
              {[
                { label: "Cost", val: "$0.00" },
                { label: "Trials", val: "NONE" },
                { label: "Partner Labs", val: "ACTIVE" },
                { label: "Global Status", val: "VERIFIED" }
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
