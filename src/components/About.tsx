
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Laptop } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.description')}
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-600">
                <p className="text-blue-800 font-semibold text-lg">
                  {t('about.highlight')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Laptop className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">WPF Development</h3>
                    <p className="text-gray-600">Started IT journey in 2018 building desktop applications</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 hover:border-purple-200 transition-colors duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Smartphone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Mobile Development</h3>
                    <p className="text-gray-600">Transitioned to Xamarin Native in 2022, now using Flutter</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 hover:border-green-200 transition-colors duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Code className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Entrepreneurship</h3>
                    <p className="text-gray-600">Founder of Ovdix startup, creating innovative solutions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
