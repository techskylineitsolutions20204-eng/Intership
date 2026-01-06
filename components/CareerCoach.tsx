
import React, { useState, useRef, useEffect } from 'react';
import { getCareerGuidanceStream } from '../services/geminiService';
import { Message } from '../types';

const CareerCoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to the TechSkyline 2026 Career Strategy Hub. I am your Senior Architect assistant. Let's design your complete career roadmap—from your first Sandbox commit to full Production Live Access." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackedSkills, setTrackedSkills] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const envTiers = [
    { id: 'sandbox', label: 'The Sandbox', icon: 'fa-box-open', color: 'text-emerald-400', desc: 'Dev/Experimental Access' },
    { id: 'staging', label: 'The Staging Area', icon: 'fa-server', color: 'text-amber-400', desc: 'UAT & Quality Gateway' },
    { id: 'live', label: 'Live Access', icon: 'fa-bolt', color: 'text-red-500', desc: 'Production Deployment' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const saved = localStorage.getItem('ts_tracked_skills');
    if (saved) setTrackedSkills(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ts_tracked_skills', JSON.stringify(trackedSkills));
  }, [trackedSkills]);

  const handleAddSkill = (skill: string) => {
    if (!trackedSkills.includes(skill)) {
      setTrackedSkills(prev => [...prev, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setTrackedSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    let streamAccumulator = "";
    setMessages(prev => [...prev, { role: 'model', text: "" }]);

    await getCareerGuidanceStream(userMsg, (chunk) => {
      streamAccumulator += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'model') {
          return [...prev.slice(0, -1), { ...last, text: streamAccumulator }];
        }
        return prev;
      });
    });

    setIsLoading(false);
  };

  const renderMessageContent = (text: string, isModel: boolean) => {
    if (!isModel) return text;

    const skillRegex = /\[SKILL:\s*([^\]]+)\]/g;
    const skillsFound: string[] = [];
    let match;
    while ((match = skillRegex.exec(text)) !== null) {
      skillsFound.push(match[1].trim());
    }

    const cleanText = text.replace(skillRegex, '').trim();

    return (
      <div className="space-y-6">
        <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed text-base">
          {cleanText.split('\n').map((line, i) => (
            <p key={i} className={line.startsWith('#') || line.startsWith('🎯') || line.startsWith('🗺️') || line.startsWith('🛠️') || line.startsWith('🔐') ? 'text-white font-black mt-6 mb-2 border-l-2 border-indigo-500 pl-4' : ''}>
              {line}
            </p>
          ))}
        </div>
        {skillsFound.length > 0 && (
          <div className="pt-6 border-t border-white/5">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-3">Add to Roadmap:</span>
            <div className="flex flex-wrap gap-2">
              {skillsFound.map((skill, i) => (
                <button
                  key={i}
                  onClick={() => handleAddSkill(skill)}
                  disabled={trackedSkills.includes(skill)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    trackedSkills.includes(skill)
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-white/5 text-indigo-400 border border-white/10 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${trackedSkills.includes(skill) ? 'fa-check' : 'fa-plus'}`}></i>
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Logic to determine environment tier progress based on skill count
  const getProgressTier = () => {
    if (trackedSkills.length > 10) return 2; // Live
    if (trackedSkills.length > 5) return 1; // Staging
    return 0; // Sandbox
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 glass-card text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <i className="fa-solid fa-compass-drafting mr-2"></i>
            Strategic Consultation Mode
          </div>
          <h2 className="text-5xl font-black text-white tracking-tight">2026 Career Architect</h2>
          <p className="text-slate-400 mt-4 text-xl max-w-3xl mx-auto">Verified industry roadmaps for the high-access engineering era.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Chat Stream */}
          <div className="lg:col-span-8 flex flex-col glass-card rounded-[3rem] overflow-hidden min-h-[700px] shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Skyline Architect</h3>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    Systems Online
                  </span>
                </div>
              </div>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-10 space-y-8 max-h-[600px] scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                  <div className={`max-w-[90%] p-8 rounded-[2rem] shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                  }`}>
                    {renderMessageContent(msg.text, msg.role === 'model')}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1].text === "" && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 flex space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-black/20 border-t border-white/5">
              <div className="flex gap-4 items-center relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="e.g. Help me reach Live Access as a DevOps Engineer"
                  className="flex-grow pl-8 pr-14 py-6 bg-white/5 border border-white/10 rounded-3xl focus:border-indigo-500 outline-none transition-all text-white text-lg placeholder:text-slate-600"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-600/20"
                >
                  <i className={`fa-solid ${isLoading ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'} text-xl`}></i>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: Path Progress */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card rounded-[3rem] p-10 sticky top-24">
              
              {/* Environment Access Roadmap */}
              <div className="mb-10 pb-10 border-b border-white/5">
                <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-indigo-500"></i>
                  Access Permissions
                </h3>
                <div className="space-y-4">
                  {envTiers.map((tier, idx) => (
                    <div key={tier.id} className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      idx <= getProgressTier() 
                        ? 'bg-white/5 border-indigo-500/30' 
                        : 'bg-black/20 border-white/5 opacity-40 grayscale'
                    }`}>
                      <div className={`w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-lg ${tier.color}`}>
                        <i className={`fa-solid ${tier.icon}`}></i>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white uppercase tracking-wider">{tier.label}</span>
                        <span className="text-[9px] text-slate-500 font-bold">{tier.desc}</span>
                      </div>
                      {idx <= getProgressTier() && (
                        <div className="absolute right-4">
                           <i className="fa-solid fa-check-circle text-emerald-500"></i>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-sm font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
                <i className="fa-solid fa-route text-indigo-500"></i>
                Skill Repository
              </h3>

              {trackedSkills.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-700">
                    <i className="fa-solid fa-map text-2xl"></i>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Repository Empty</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                  {trackedSkills.map((skill, idx) => (
                    <div key={idx} className="group bg-white/5 border border-white/5 p-4 rounded-2xl animate-fade-in-up relative hover:border-indigo-500/30 transition-all">
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <i className="fa-solid fa-xmark text-[10px]"></i>
                      </button>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                         <span className="text-xs font-bold text-slate-200 tracking-tight">{skill}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <button 
                  onClick={() => window.print()}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/10 flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-key"></i>
                  Export Access Token
                </button>
                <p className="text-[9px] text-center text-slate-600 font-black uppercase tracking-widest">
                  Valid for 2026 Q1 TechStack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerCoach;
