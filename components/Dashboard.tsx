
import React, { useState, useEffect } from 'react';

interface DashboardProps {
  onOpenCert: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onOpenCert }) => {
  const [userName, setUserName] = useState('Intern');
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('ts_dashboard_progress');
    if (savedProgress) setProgress(JSON.parse(savedProgress));
    
    // Attempt to get name from local storage or registration simulation
    const savedName = localStorage.getItem('ts_user_name');
    if (savedName) setUserName(savedName);
  }, []);

  const updateProgress = (key: string) => {
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);
    localStorage.setItem('ts_dashboard_progress', JSON.stringify(newProgress));
  };

  const tracks = [
    {
      name: "AI & Generative AI",
      tasks: ["ai_python", "ai_ml_fundamentals", "ai_deep_learning", "ai_labs"]
    },
    {
      name: "Cloud & DevOps",
      tasks: ["cloud_aws_azure", "cloud_cicd", "cloud_docker_k8s", "cloud_deployment"]
    },
    {
      name: "Cybersecurity",
      tasks: ["cyber_fundamentals", "cyber_network_labs", "cyber_ethical_hacking", "cyber_soc_sim"]
    }
  ];

  const totalTasks = tracks.reduce((acc, track) => acc + track.tasks.length, 0);
  const completedTasks = Object.values(progress).filter(Boolean).length;
  const percent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs">Live Performance Tracker</span>
            <h2 className="text-4xl font-black text-white mt-2">Welcome Back, <span className="text-indigo-500">{userName}</span></h2>
          </div>
          <div className="glass-card px-8 py-4 rounded-3xl border-indigo-500/20 text-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Total Progress</span>
            <span className="text-3xl font-black text-indigo-500">{percent}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {tracks.map((track, i) => (
            <div key={i} className="glass-card rounded-[2.5rem] p-10 border-white/5">
              <h3 className="text-xl font-bold text-white mb-8 border-b border-white/5 pb-4">{track.name} Internship Track</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {track.tasks.map((task, j) => (
                  <label key={j} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={!!progress[task]} 
                        onChange={() => updateProgress(task)}
                        className="w-6 h-6 rounded-lg bg-slate-900 border-2 border-slate-700 checked:bg-indigo-600 checked:border-indigo-600 appearance-none transition-all cursor-pointer"
                      />
                      {progress[task] && <i className="fa-solid fa-check absolute inset-0 flex items-center justify-center text-[10px] text-white pointer-events-none"></i>}
                    </div>
                    <span className={`text-sm font-bold transition-colors ${progress[task] ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'}`}>
                      {task.split('_').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-12 glass-card rounded-[4rem] border-indigo-500/20 bg-indigo-600/5 text-center">
           <i className="fa-solid fa-award text-5xl text-indigo-400 mb-8"></i>
           <h3 className="text-3xl font-black text-white mb-4">Internship Certification</h3>
           <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
             Unlock your official TechSkyline ISO Certified Internship Completion Certificate by reaching at least 80% completion in your assigned tracks.
           </p>
           
           <div className="max-w-md mx-auto mb-10">
              <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                 <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${percent}%` }}></div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                 <span>Start</span>
                 <span>{percent}% Completed</span>
                 <span>80% Required</span>
              </div>
           </div>

           <button 
             disabled={percent < 80}
             onClick={onOpenCert}
             className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl ${
               percent >= 80 
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30' 
                : 'bg-white/5 text-slate-700 border border-white/10 cursor-not-allowed'
             }`}
           >
             {percent >= 80 ? 'Generate Certificate' : 'Certificate Locked'}
           </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
