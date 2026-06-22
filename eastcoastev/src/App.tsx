import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Ribbon from './components/Ribbon';
import LocalSection from './components/LocalSection';
import ShopSection from './components/ShopSection';
import ServiceSection from './components/ServiceSection';
import ExpansionSection from './components/ExpansionSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header isDark={isDark} onThemeToggle={() => setIsDark(d => !d)} />
      <Hero />
      <Ribbon />
      <LocalSection />
      <ShopSection />
      <ServiceSection />
      <ExpansionSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}

export default App;
