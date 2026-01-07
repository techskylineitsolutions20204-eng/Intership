
import React, { useState, useEffect } from 'react';

interface Course {
  id: string;
  title: string;
  provider: string;
  skills: string[];
  link: string;
  type: '100% Free';
  hasCertificate: boolean;
  category: 'AI & GenAI' | 'Data Science' | 'Full Stack' | 'Cybersecurity' | 'Azure & DevOps' | 'Business Analytics' | 'RPA' | 'Emerging Tech';
  description: string;
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
    // AI & Generative AI
    {
      id: 'google-ai-essentials',
      title: "Google AI Essentials",
      provider: "Google (Skillshop)",
      skills: ["AI Basics", "GenAI", "Prompting"],
      link: "https://skillshop.exceedlms.com",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & GenAI',
      description: "Master the fundamentals of AI at zero cost. No credit card, no trials, just learning with a free certificate."
    },
    {
      id: 'ibm-ai-fundamentals',
      title: "AI Fundamentals",
      provider: "IBM SkillsBuild",
      skills: ["AI Ethics", "Neural Networks", "IBM Watson"],
      link: "https://skillsbuild.org",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & GenAI',
      description: "A comprehensive intro to AI provided by IBM. Always free, no subscription required."
    },
    {
      id: 'gl-intro-ai',
      title: "Introduction to AI",
      provider: "Great Learning",
      skills: ["Machine Learning", "Deep Learning", "Data Science"],
      link: "https://www.mygreatlearning.com/academy",
      type: '100% Free',
      hasCertificate: true,
      category: 'AI & GenAI',
      description: "Foundational AI course for beginners. 100% free access to all modules and certificate."
    },
    // Data Science & Python
    {
      id: 'fcc-py-everybody',
      title: "Python for Everybody",
      provider: "freeCodeCamp",
      skills: ["Python", "Data Structures", "Network Programming"],
      link: "https://www.freecodecamp.org/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Data Science',
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
      category: 'Data Science',
      description: "Learn to process data at scale. Non-profit education with no hidden costs."
    },
    // Full Stack
    {
      id: 'fcc-responsive-web',
      title: "Responsive Web Design",
      provider: "freeCodeCamp",
      skills: ["HTML5", "CSS3", "Flexbox", "Grid"],
      link: "https://www.freecodecamp.org/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Full Stack',
      description: "Learn modern web design from scratch. 100% free and certificate included."
    },
    {
      id: 'fcc-js-algorithms',
      title: "JavaScript Algorithms",
      provider: "freeCodeCamp",
      skills: ["JavaScript", "ES6", "OOP", "Functional Programming"],
      link: "https://www.freecodecamp.org/learn",
      type: '100% Free',
      hasCertificate: true,
      category: 'Full Stack',
      description: "Master the logic behind the web. No payment required at any step."
    },
    // Cybersecurity
    {
      id: 'cisco-intro-cyber',
      title: "Intro to Cybersecurity",
      provider: "Cisco Networking Academy",
      skills: ["Security Principles", "Threat Actor Motives", "Risk Management"],
      link: "https://www.netacad.com",
      type: '100% Free',
      hasCertificate: true,
      category: 'Cybersecurity',
      description: "Start your career in security with Cisco. Zero fees, permanent access."
    },
    {
      id: 'palo-alto-fundamentals',
      title: "Cybersecurity Fundamentals",
      provider: "Palo Alto Networks",
      skills: ["Cloud Security", "Endpoint Protection", "Network Defense"],
      link: "https://www.paloaltonetworks.com/cyberpedia",
      type: '100% Free',
      hasCertificate: true,
      category: 'Cybersecurity',
      description: "Professional security training from an industry leader. Absolutely free."
    },
    // Azure & DevOps
    {
      id: 'ms-azure-fundamentals',
      title: "Azure Fundamentals (AZ-900)",
      provider: "Microsoft Learn",
      skills: ["Cloud Concepts", "Azure Services", "SLA & Lifecycle"],
      link: "https://learn.microsoft.com/training",
      type: '100% Free',
      hasCertificate: true,
      category: 'Azure & DevOps',
      description: "Official Microsoft training for cloud basics. Free and unlimited access."
    },
    {
      id: 'tcs-devops-basics',
      title: "DevOps Basics",
      provider: "TCS iON",
      skills: ["CI/CD", "Configuration Management", "Monitoring"],
      link: "https://learning.tcsionhub.in",
      type: '100% Free',
      hasCertificate: true,
      category: 'Azure & DevOps',
      description: "Learn DevOps culture and tools. No payment gates or trials."
    },
    // Business Analytics
    {
      id: 'ms-powerbi-fundamentals',
      title: "Power BI Fundamentals",
      provider: "Microsoft Learn",
      skills: ["Data Visualization", "DAX", "Power Query"],
      link: "https://learn.microsoft.com/training",
      type: '100% Free',
      hasCertificate: true,
      category: 'Business Analytics',
      description: "Harness the power of data visualization. 100% free with a certificate path."
    },
    // RPA
    {
      id: 'uipath-rpa-starter',
      title: "RPA Starter",
      provider: "UiPath Academy",
      skills: ["UiPath Studio", "Automation Flows", "Bots"],
      link: "https://academy.uipath.com",
      type: '100% Free',
      hasCertificate: true,
      category: 'RPA',
      description: "Automate anything with UiPath. Free academy with permanent access."
    },
    // Emerging Tech
    {
      id: 'cisco-intro-iot',
      title: "Introduction to IoT",
      provider: "Cisco Networking Academy",
      skills: ["Sensors", "Data Analytics", "IoT Connectivity"],
      link: "https://www.netacad.com",
      type: '100% Free',
      hasCertificate: true,
      category: 'Emerging Tech',
      description: "Explore the future of connected devices. Zero cost, 100% value."
    }
  ];

  const categories = Array.from(new Set(courses.map(c => c.category)));

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-emerald-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
            <i className="fa-solid fa-gift mr-2"></i>
            100% Free - No Payment - No Trials - No EMI
          </div>
          <h2 className="text-5xl font-black text-white mb-6">TechSkyline <span className="text-indigo-500">Learning Hub</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Curated list of professional courses that are <span className="text-emerald-500 font-bold">100% free with free certificates</span>. We've eliminated all paywalls, subscription models, and trial traps for our interns.
          </p>
        </div>

        {/* Global Zero-Cost Policy Banner */}
        <div className="mb-12 p-8 bg-emerald-600/5 border border-emerald-500/20 rounded-[3rem] flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-emerald-500/20">
              <i className="fa-solid fa-circle-check"></i>
           </div>
           <div>
              <h4 className="text-white font-black text-lg mb-2 uppercase tracking-widest flex items-center gap-3">
                Zero Cost Education Policy
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Active v2026</span>
              </h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                TechSkyline IT Solutions strictly curates courses with <strong>Zero Payment Requirements</strong>. 
                This platform is dedicated to students who want to learn without financial barriers. 
                Every course listed below includes a <strong>Free Certificate</strong> path.
              </p>
           </div>
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.filter(c => c.category === activeCategory).map((course) => (
            <div key={course.id} className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden h-full">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
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
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-building-columns text-indigo-500"></i>
                  Provider: <span className="text-slate-300">{course.provider}</span>
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
                  className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all shadow-xl group/btn"
                >
                  Start Course (100% Free)
                  <i className="fa-solid fa-arrow-right text-[8px] group-hover/btn:translate-x-1 transition-transform"></i>
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

        {/* Final Information Section */}
        <div className="mt-24 p-12 glass-card rounded-[4rem] border-emerald-500/20 bg-emerald-600/5 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
           
           <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-2xl shadow-emerald-500/10 border border-emerald-500/20">
              <i className="fa-solid fa-stamp"></i>
           </div>
           <h3 className="text-4xl font-black text-white mb-4">Official Path Verification</h3>
           <p className="text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed text-lg">
             Completion of these free foundational courses is the first step toward the <span className="text-white">TechSkyline ISO Certified Internship</span>. Your marks of completion will be reviewed during your final internship assessment.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto border-t border-white/5 pt-12">
              {[
                { label: "Cost", val: "$0.00" },
                { label: "EMI Plans", val: "NONE" },
                { label: "Trials", val: "NONE" },
                { label: "Access", val: "LIFETIME" },
                { label: "Status", val: "VERIFIED" }
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
