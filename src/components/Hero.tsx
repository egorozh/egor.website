import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent/30 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/40 backdrop-blur-md mb-6 text-sm text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t('hero.greeting')}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gradient-brand mb-6 tracking-tight">
              {t('hero.name')}
            </h1>
            <h2 className="text-2xl md:text-3xl text-foreground/90 font-semibold mb-6">
              {t('hero.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-gradient-brand text-primary-foreground border-0 px-8 py-3 text-lg font-semibold rounded-full shadow-glow hover:shadow-card-hover transition-smooth hover:scale-105"
            >
              {t('hero.cta')}
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
