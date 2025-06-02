
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Videos from '@/components/Videos';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import '@/i18n';

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('hero.name')} - ${t('hero.title')}`;
  }, [t]);

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
