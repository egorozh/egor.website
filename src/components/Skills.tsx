import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.categories.mobile'),
      icon: '📱',
      skills: ['Flutter', 'iOS Development', 'Android Development', 'Cross-platform', 'Supabase'],
    },
    {
      title: t('skills.categories.desktop'),
      icon: '💻',
      skills: ['WPF', 'Avalonia', '.NET Core', 'MVVM', 'Desktop Applications'],
    },
    {
      title: t('skills.categories.languages'),
      icon: '⚡',
      skills: ['C#', 'Dart'],
    },
    {
      title: t('skills.categories.tools'),
      icon: '🛠️',
      skills: ['Android Studio', 'JetBrains Rider', 'Supabase', 'Git', 'Azure DevOps', 'Firebase'],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">{t('skills.title')}</h2>
            <div className="w-20 h-1 bg-gradient-brand mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="group bg-card/60 border border-border backdrop-blur-sm hover:shadow-card-hover hover:border-primary/40 transition-smooth hover:-translate-y-2"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-brand flex items-center justify-center text-2xl shadow-glow">
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-muted/60 rounded-lg px-3 py-2 text-center text-sm font-medium text-foreground/90 border border-border hover:border-primary/40 transition-smooth"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
