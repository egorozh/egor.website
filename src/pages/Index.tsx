
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Videos from '@/components/Videos';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useLanguageWithI18n } from '@/hooks/useLanguageWithI18n';
import '@/i18n';

const Index = () => {
  const { t } = useLanguageWithI18n();
  const location = useLocation();

  useEffect(() => {
    document.title = `${t('hero.name')} - ${t('hero.title')}`;
  }, [t]);

  useEffect(() => {
    // Handle hash-based scrolling when navigating from other pages
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        // Add a delay to ensure the page has rendered completely
        setTimeout(() => {
          const headerHeight = 80; // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Clean up hash from URL after scroll
          window.history.replaceState(null, '', window.location.pathname);
        }, 300); // Increased delay to ensure page is fully loaded
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Videos />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
