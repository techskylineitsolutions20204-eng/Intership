
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'Internship Query', message: '' });
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setFormState({ name: '', email: '', subject: 'Internship Query', message: '' });
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-widest rounded-full mb-6">
              Contact Center
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
              Connecting the <br/><span className="text-blue-600">Future Workforce.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed">
              Abhinav Joseph and the TechSkyline team are available globally for institutional partnerships and candidate inquiries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { label: 'Program Director', value: 'Abhinav Joseph', icon: 'fa-user-tie', color: 'blue' },
                { label: 'Global WhatsApp', value: '+91 81062 43684', icon: 'fa-whatsapp', color: 'green' },
                { label: 'USA Support', value: '+1 (408) 614-0468', icon: 'fa-phone', color: 'red' },
                { label: 'Official Mail', value: 'techskylineitsolutions20204@gmail.com', icon: 'fa-envelope', color: 'purple' }
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className={`w-10 h-10 bg-${item.color}-50 text-${item.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-300`}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</h4>
                  <p className="font-bold text-slate-800 break-words">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-slate-900 rounded-[2rem] text-white">
              <h4 className="font-bold mb-4">Regional Presence</h4>
              <div className="space-y-4 text-sm text-slate-400">
                <p><strong className="text-white">Silicon Valley:</strong> Tech Park, San Jose, CA, USA</p>
                <p><strong className="text-white">Hyderabad:</strong> Skyline Towers, HITEC City, India</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] blur-3xl opacity-5 transform rotate-3"></div>
            <div className="relative bg-white border border-slate-100 shadow-2xl rounded-[3rem] p-10 lg:p-14">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Send a Message</h3>
              <p className="text-slate-500 text-sm mb-10">Direct inquiry to Abhinav Joseph's desk.</p>

              <form onSubmit={handleSend} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Your Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Inquiry Topic</label>
                  <select 
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  >
                    <option>Internship Query</option>
                    <option>University Partnership</option>
                    <option>Corporate Training</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Message Content</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none" 
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
                    sent ? 'bg-green-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {sent ? (
                    <>
                      <i className="fa-solid fa-check"></i>
                      Message Dispatched
                    </>
                  ) : (
                    <>
                      Dispatch Message
                      <i className="fa-solid fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
