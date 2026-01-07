
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collaboration from './components/Collaboration';
import TechStack from './components/TechStack';
import CareerCoach from './components/CareerCoach';
import Registration from './components/Registration';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import Partners from './components/Partners';
import Curriculum from './components/Curriculum';
import Terms from './components/Terms';
import SelfLearning from './components/SelfLearning';
import LiveLabs from './components/LiveLabs';
import Dashboard from './components/Dashboard';
import CertificateView from './components/CertificateView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero onRegister={() => setActiveTab('register')} />
            <Collaboration />
            <TechStack onApply={() => setActiveTab('register')} />
          </>
        )}
        {activeTab === 'tech' && <TechStack onApply={() => setActiveTab('register')} />}
        {activeTab === 'career' && <CareerCoach />}
        {activeTab === 'self-learning' && <SelfLearning />}
        {activeTab === 'labs' && <LiveLabs />}
        {activeTab === 'dashboard' && <Dashboard onOpenCert={() => setActiveTab('certificate')} />}
        {activeTab === 'certificate' && <CertificateView />}
        {activeTab === 'register' && <Registration />}
        {activeTab === 'contact' && <Contact />}
        {activeTab === 'about' && <About />}
        {activeTab === 'partners' && <Partners />}
        {activeTab === 'curriculum' && <Curriculum />}
        {activeTab === 'terms' && <Terms />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
