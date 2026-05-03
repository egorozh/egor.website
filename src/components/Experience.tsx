import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface TimelineItem {
  period: string;
  title: string;
  company: string;
  description: string;
}

const Experience = () => {
  const { t } = useTranslation();
  const timelineItems = t('experience.timeline', { returnObjects: true }) as TimelineItem[];

  return (
    <section id="experience" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">{t('experience.title')}</h2>
            <div className="w-20 h-1 bg-gradient-brand mx-auto rounded-full" />
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-brand hidden md:block" />

            <div className="space-y-8">
              {timelineItems.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-6 w-4 h-4 bg-gradient-brand rounded-full border-4 border-background shadow-glow hidden md:block" />

                  <Card className="md:ml-16 bg-card/60 backdrop-blur-sm border border-border border-l-4 border-l-primary hover:shadow-card-hover hover:border-primary/40 transition-smooth hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                          <p className="text-primary font-semibold">{item.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.period}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
