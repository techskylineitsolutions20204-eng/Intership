
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collaboration from './components/Collaboration';
import TechStack from './components/TechStack';
import CareerCoach from './components/CareerCoach';
import Registration from './components/Registration';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero onRegister={() => setActiveTab('register')} />
            <Collaboration />
            <TechStack />
          </>
        )}
        {activeTab === 'tech' && <TechStack />}
        {activeTab === 'career' && <CareerCoach />}
        {activeTab === 'register' && <Registration />}
        {activeTab === 'contact' && <Contact />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
