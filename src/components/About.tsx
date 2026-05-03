import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Laptop } from 'lucide-react';

interface CardItem {
  title: string;
  description: string;
}

const icons = [
  <Laptop className="h-6 w-6" />,
  <Smartphone className="h-6 w-6" />,
  <Code className="h-6 w-6" />,
];

const About = () => {
  const { t } = useTranslation();
  const cards = t('about.cards', { returnObjects: true }) as CardItem[];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">{t('about.title')}</h2>
            <div className="w-20 h-1 bg-gradient-brand mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
              <div className="bg-gradient-brand-soft p-6 rounded-xl border border-primary/20 backdrop-blur-sm">
                <p className="text-foreground font-semibold text-lg">
                  {t('about.highlight')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {cards.map((card, i) => (
                <Card
                  key={i}
                  className="border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:shadow-card-hover transition-smooth"
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-gradient-brand-soft text-primary p-3 rounded-xl border border-primary/20">
                      {icons[i]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                      <p className="text-muted-foreground">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
