import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import '@/i18n';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

interface ProjectItem {
  name: string;
  description: string;
  technologies: string;
}

interface LanguageItem {
  language: string;
  level: string;
}

const Resume = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('hero.name')} - ${t('resume.title')}`;
  }, [t]);

  useEffect(() => {
    // Reset scroll position to top when navigating to resume page
    window.scrollTo(0, 0);
  }, []);

  const skillsData = {
    mobile: ['Flutter', 'Xamarin Native', 'iOS Development', 'Android Development', 'Cross-platform'],
    desktop: ['WPF', '.NET Framework', '.NET Core', 'MVVM', 'Avalonia'],
    languages: ['C#', 'Dart', 'XAML', 'JavaScript', 'TypeScript'],
    tools: ['Visual Studio', 'VS Code', 'Git', 'Azure DevOps', 'Firebase']
  };

  const handleDownloadPDF = () => {
    // Generate PDF from page content
    const printContent = document.getElementById('resume-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      const printContents = printContent.innerHTML;
      
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const experienceItems = t('resume.experience.items', { returnObjects: true }) as ExperienceItem[];
  const projectItems = t('resume.projects.items', { returnObjects: true }) as ProjectItem[];
  const languageItems = t('resume.languages.items', { returnObjects: true }) as LanguageItem[];

  return (
    <div className="min-h-screen bg-white">
      {/* Shared Header - hidden in print */}
      <div className="print:hidden">
        <Header />
      </div>

      <div className="min-h-screen bg-gray-50 py-8 pt-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header with Download PDF - hidden in print */}
          <div className="flex justify-between items-center mb-8 print:hidden">
            <h1 className="text-3xl font-bold text-gray-900">{t('resume.title')}</h1>
            <Button
              onClick={handleDownloadPDF}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('resume.downloadPdf')}
            </Button>
          </div>

          <div id="resume-content">
            <Card className="bg-white shadow-lg print:shadow-none print:border-none">
              <CardContent className="p-8">
                {/* Header Section */}
                <div className="text-center mb-8 border-b pb-6 print:border-b-2 print:border-gray-300">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 print:text-3xl">{t('hero.name')}</h1>
                  <h2 className="text-xl text-blue-600 font-semibold mb-4 print:text-lg print:text-gray-700">{t('resume.header.title')}</h2>
                  
                  <div className="flex flex-wrap justify-center gap-6 text-gray-600 print:gap-4 print:text-sm">
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
                <section className="mb-8 print:mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
                    {t('resume.summary.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed print:text-sm">
                    {t('resume.summary.content')}
                  </p>
                </section>

                {/* Technical Skills */}
                <section className="mb-8 print:mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
                    {t('resume.skills.title')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 print:gap-2">
                    {Object.entries(skillsData).map(([category, skills]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-gray-800 mb-2 print:text-sm">
                          {t(`resume.skills.${category}`)}
                        </h4>
                        <div className="flex flex-wrap gap-2 print:gap-1">
                          {skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm print:px-2 print:py-0 print:text-xs print:bg-transparent print:border print:border-gray-300"
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
                <section className="mb-8 print:mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
                    {t('resume.experience.title')}
                  </h3>
                  <div className="space-y-6 print:space-y-4">
                    {experienceItems.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4 print:border-gray-300 print:pl-3">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 print:text-base">{item.title}</h4>
                            <p className="text-blue-600 font-medium print:text-gray-700 print:text-sm">{item.company}</p>
                          </div>
                          <div className="text-gray-600 text-sm md:text-right print:text-xs">
                            <p>{item.period}</p>
                            <p>{item.location}</p>
                          </div>
                        </div>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 print:space-y-0">
                          {item.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="text-sm print:text-xs">{resp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Key Projects */}
                <section className="mb-8 print:mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
                    {t('resume.projects.title')}
                  </h3>
                  <div className="space-y-4 print:space-y-3">
                    {projectItems.map((project, index) => (
                      <div key={index} className="border-l-4 border-green-200 pl-4 print:border-gray-300 print:pl-3">
                        <h4 className="text-lg font-semibold text-gray-900 print:text-base">{project.name}</h4>
                        <p className="text-gray-700 mb-2 print:text-sm print:mb-1">{project.description}</p>
                        <p className="text-sm text-blue-600 font-medium print:text-xs print:text-gray-600">{project.technologies}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Languages */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
                    {t('resume.languages.title')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 print:gap-2">
                    {languageItems.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 print:text-sm">{lang.language}</span>
                        <span className="text-gray-600 print:text-sm">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Print Styles */}
      <style>{`
        @media print {
          body { 
            background: white !important; 
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden { 
            display: none !important; 
          }
          .print\\:shadow-none { 
            box-shadow: none !important; 
          }
          .print\\:border-none { 
            border: none !important; 
          }
          .print\\:text-3xl { 
            font-size: 1.875rem !important; 
          }
          .print\\:text-lg { 
            font-size: 1.125rem !important; 
          }
          .print\\:text-base { 
            font-size: 1rem !important; 
          }
          .print\\:text-sm { 
            font-size: 0.875rem !important; 
          }
          .print\\:text-xs { 
            font-size: 0.75rem !important; 
          }
          .print\\:text-gray-700 { 
            color: rgb(55 65 81) !important; 
          }
          .print\\:text-gray-600 { 
            color: rgb(75 85 99) !important; 
          }
          .print\\:border-gray-300 { 
            border-color: rgb(209 213 219) !important; 
          }
          .print\\:border-b-2 { 
            border-bottom-width: 2px !important; 
          }
          .print\\:mb-6 { 
            margin-bottom: 1.5rem !important; 
          }
          .print\\:mb-1 { 
            margin-bottom: 0.25rem !important; 
          }
          .print\\:gap-4 { 
            gap: 1rem !important; 
          }
          .print\\:gap-2 { 
            gap: 0.5rem !important; 
          }
          .print\\:gap-1 { 
            gap: 0.25rem !important; 
          }
          .print\\:space-y-4 > * + * { 
            margin-top: 1rem !important; 
          }
          .print\\:space-y-3 > * + * { 
            margin-top: 0.75rem !important; 
          }
          .print\\:space-y-0 > * + * { 
            margin-top: 0 !important; 
          }
          .print\\:px-2 { 
            padding-left: 0.5rem !important; 
            padding-right: 0.5rem !important; 
          }
          .print\\:py-0 { 
            padding-top: 0 !important; 
            padding-bottom: 0 !important; 
          }
          .print\\:pl-3 { 
            padding-left: 0.75rem !important; 
          }
          .print\\:bg-transparent { 
            background-color: transparent !important; 
          }
          .print\\:border { 
            border-width: 1px !important; 
          }
          .bg-gray-50 { 
            background: white !important; 
          }
          @page {
            margin: 1in;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
