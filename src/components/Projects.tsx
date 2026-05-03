import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('projects.ovdix.title'),
      description: t('projects.ovdix.description'),
      tech: t('projects.ovdix.tech'),
      link: 'https://ovdix.com',
      linkText: t('projects.ovdix.link'),
      featured: true,
    },
    {
      title: t('projects.vertochat.title'),
      description: t('projects.vertochat.description'),
      tech: t('projects.vertochat.tech'),
      link: 'https://verto.chat',
      linkText: t('projects.vertochat.link'),
      featured: true,
    },
    {
      title: t('projects.xamarin.title'),
      description: t('projects.xamarin.description'),
      tech: t('projects.xamarin.tech'),
    },
    {
      title: t('projects.wpf.title'),
      description: t('projects.wpf.description'),
      tech: t('projects.wpf.tech'),
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">{t('projects.title')}</h2>
            <div className="w-20 h-1 bg-gradient-brand mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`group bg-card/60 backdrop-blur-sm border border-border hover:border-primary/40 hover:shadow-card-hover transition-smooth hover:-translate-y-2 overflow-hidden ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="h-1 bg-gradient-brand" />
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(', ').map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-muted text-foreground/80 px-3 py-1 rounded-full text-sm font-medium border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <Button
                      onClick={() => window.open(project.link, '_blank')}
                      className="w-full bg-gradient-brand text-primary-foreground border-0 hover:shadow-glow transition-smooth"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {project.linkText}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
