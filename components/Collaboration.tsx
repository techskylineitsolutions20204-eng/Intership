
import React from 'react';

const Collaboration: React.FC = () => {
  const benefits = [
    {
      title: "Hands-on Experience",
      description: "Work on live industry projects using modern software development life cycles.",
      icon: "fa-laptop-code",
      color: "blue"
    },
    {
      title: "Mentorship",
      description: "Get guided by senior engineers and architects from TechSkyline IT Solutions.",
      icon: "fa-users",
      color: "indigo"
    },
    {
      title: "Skill Certification",
      description: "Receive industry-recognized certificates upon successful completion of the program.",
      icon: "fa-certificate",
      color: "green"
    },
    {
      title: "PPO Opportunities",
      description: "Top performers receive Pre-Placement Offers to join our core engineering team.",
      icon: "fa-briefcase",
      color: "purple"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">University Collaboration Program</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We partner with academic institutions to provide a curriculum-integrated internship 
            that complements university learning with real-world applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-xl transition-shadow duration-300">
              <div className={`w-12 h-12 rounded-lg bg-${benefit.color}-100 flex items-center justify-center mb-6`}>
                <i className={`fa-solid ${benefit.icon} text-${benefit.color}-600 text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-blue-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="md:w-2/3">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Are you a Placement Officer?</h3>
            <p className="text-blue-100 text-lg">
              Partner with TechSkyline IT Solutions to enhance your students' employability and 
              exposure to modern tech ecosystems. We offer tailored programs for your institution.
            </p>
          </div>
          <button className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold text-lg whitespace-nowrap transition-colors">
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
