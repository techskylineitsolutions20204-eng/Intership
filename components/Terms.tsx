
import React from 'react';

const Terms: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Legal Framework</span>
          <h2 className="text-5xl font-black text-white mt-4 mb-8">Terms of <span className="text-slate-500">Service</span></h2>
        </div>

        <div className="glass-card rounded-[3rem] p-10 lg:p-14 prose prose-invert prose-slate max-w-none">
          <h3 className="text-white">1. Program Participation</h3>
          <p className="text-slate-400">Participation in the TechSkyline IT Solutions Internship Program is subject to academic verification. Candidates must maintain the professional standards outlined in the initial offer letter.</p>
          
          <h3 className="text-white">2. Intellectual Property</h3>
          <p className="text-slate-400">All code, designs, and documentation produced during the internship remains the sole property of TechSkyline IT Solutions, unless explicitly stated otherwise in a partnership agreement.</p>
          
          <h3 className="text-white">3. Data Privacy</h3>
          <p className="text-slate-400">Your application data is used solely for recruitment and program management. We do not sell data to third-party entities. All contact information is handled under strict confidentiality.</p>

          <h3 className="text-white">4. Certification</h3>
          <p className="text-slate-400">Certificates are issued only upon successful completion of the required milestones and final assessment by the lead architect, Abhinav Joseph.</p>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-xs text-slate-500 italic">
            Last Updated: January 2026. For specific legal inquiries, please contact our director.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
