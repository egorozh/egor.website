
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.categories.mobile'),
      icon: '📱',
      skills: ['Flutter', 'Xamarin Native', 'iOS Development', 'Android Development', 'Cross-platform'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: t('skills.categories.desktop'),
      icon: '💻',
      skills: ['WPF', 'Avalonia', '.NET Core', 'MVVM', 'Desktop Applications'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: t('skills.categories.languages'),
      icon: '⚡',
      skills: ['C#', 'Dart', 'XAML', 'JavaScript', 'TypeScript'],
      color: 'from-green-500 to-teal-500'
    },
    {
      title: t('skills.categories.tools'),
      icon: '🛠️',
      skills: ['Visual Studio', 'VS Code', 'Git', 'Azure DevOps', 'Firebase'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('skills.title')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-white rounded-lg px-3 py-2 text-center text-sm font-medium text-gray-700 shadow-sm border border-gray-100 hover:border-gray-200 transition-colors"
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
