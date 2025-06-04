
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import '@/i18n';

const Resume = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('hero.name')} - ${t('resume.title')}`;
  }, [t]);

  const skillsData = {
    mobile: ['Flutter', 'Xamarin Native', 'iOS Development', 'Android Development', 'Cross-platform'],
    desktop: ['WPF', '.NET Framework', '.NET Core', 'MVVM', 'Avalonia'],
    languages: ['C#', 'Dart', 'XAML', 'JavaScript', 'TypeScript'],
    tools: ['Visual Studio', 'VS Code', 'Git', 'Azure DevOps', 'Firebase']
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Download PDF */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('resume.title')}</h1>
          <Button
            onClick={() => window.open('/files/egor-zheludkov-resume.pdf', '_blank')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('resume.downloadPdf')}
          </Button>
        </div>

        <Card className="bg-white shadow-lg print:shadow-none">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="text-center mb-8 border-b pb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('hero.name')}</h1>
              <h2 className="text-xl text-blue-600 font-semibold mb-4">{t('resume.header.title')}</h2>
              
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{t('resume.header.location')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>egorozh.dev@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>github.com/egorozh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  <span>linkedin.com/in/egorozh</span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
                {t('resume.summary.title')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('resume.summary.content')}
              </p>
            </section>

            {/* Technical Skills */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
                {t('resume.skills.title')}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(skillsData).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {t(`resume.skills.${category}`)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Experience */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
                {t('resume.experience.title')}
              </h3>
              <div className="space-y-6">
                {t('resume.experience.items', { returnObjects: true }).map((item: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-blue-600 font-medium">{item.company}</p>
                      </div>
                      <div className="text-gray-600 text-sm md:text-right">
                        <p>{item.period}</p>
                        <p>{item.location}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {item.responsibilities.map((resp: string, respIndex: number) => (
                        <li key={respIndex} className="text-sm">{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Projects */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
                {t('resume.projects.title')}
              </h3>
              <div className="space-y-4">
                {t('resume.projects.items', { returnObjects: true }).map((project: any, index: number) => (
                  <div key={index} className="border-l-4 border-green-200 pl-4">
                    <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <p className="text-sm text-blue-600 font-medium">{project.technologies}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
                {t('resume.languages.title')}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {t('resume.languages.items', { returnObjects: true }).map((lang: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-gray-600">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:shadow-none { box-shadow: none !important; }
          body { background: white !important; }
          .bg-gray-50 { background: white !important; }
        }
      `}</style>
    </div>
  );
};

export default Resume;
