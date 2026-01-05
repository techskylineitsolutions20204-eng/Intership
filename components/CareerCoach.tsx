
import React, { useState, useRef, useEffect } from 'react';
import { getCareerGuidanceStream } from '../services/geminiService';
import { Message } from '../types';

const CareerCoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to the TechSkyline 2026 Career Strategy Hub. I am your Senior Architect assistant. Let's design your complete career roadmap from baseline to industry lead." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackedSkills, setTrackedSkills] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
            <p key={i} className={line.startsWith('#') ? 'text-white font-black mt-6 mb-2' : ''}>
              {line}
            </p>
          ))}
        </div>
        {skillsFound.length > 0 && (
          <div className="pt-6 border-t border-white/5">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-3">Roadmap Milestones:</span>
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
          <p className="text-slate-400 mt-4 text-xl max-w-3xl mx-auto">Get a verified industry roadmap tailored for the post-AI era.</p>
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
                    Ready for analysis
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
                  placeholder="e.g. Map out a Frontend path focused on React 19"
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
              <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                <i className="fa-solid fa-route text-indigo-500"></i>
                Your Skill Repository
              </h3>

              {trackedSkills.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-600">
                    <i className="fa-solid fa-map text-3xl"></i>
                  </div>
                  <p className="text-slate-500 font-medium">No skills mapped yet. Consult the Architect.</p>
                </div>
              ) : (
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4">
                  {trackedSkills.map((skill, idx) => (
                    <div key={idx} className="group glass-card border-indigo-500/20 p-5 rounded-2xl animate-fade-in-up relative">
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors"
                      >
                        <i className="fa-solid fa-trash-can text-xs"></i>
                      </button>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <i className="fa-solid fa-rocket text-xs"></i>
                          </div>
                          <span className="text-base font-bold text-white tracking-tight">{skill}</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                          <div className="bg-indigo-500 h-full w-[45%]" style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                          <span>Progress</span>
                          <span className="text-indigo-400">Phase 1 Clear</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 space-y-4">
                <button 
                  onClick={() => window.print()}
                  className="w-full py-4 glass-card border-white/20 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  Generate PDF Roadmap
                </button>
                <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-tighter">
                  Updated for 2026 Q1 Market Requirements
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
