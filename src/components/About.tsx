import {useTranslation} from 'react-i18next';
import {Card, CardContent} from '@/components/ui/card';
import {Code, Smartphone, Laptop} from 'lucide-react';

interface CardItem {
    title: string;
    description: string;
}

const icons = [<Laptop className="h-6 w-6 text-blue-600"/>, <Smartphone className="h-6 w-6 text-purple-600"/>,
    <Code className="h-6 w-6 text-green-600"/>];
const iconBg = ["bg-blue-100", "bg-purple-100", "bg-green-100"];
const borderColors = ["hover:border-blue-200", "hover:border-purple-200", "hover:border-green-200"];

const About = () => {
    const {t} = useTranslation();

    const cards = t('about.cards', {returnObjects: true}) as CardItem[];

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
                            <div
                                className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-600">
                                <p className="text-blue-800 font-semibold text-lg">
                                    {t('about.highlight')}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">

                            {cards.map((card, i) => (
                                <Card key={i}
                                      className={`border-2 border-gray-100 ${borderColors[i]} transition-colors duration-300`}>
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className={`${iconBg[i]} p-3 rounded-lg`}>
                                            {icons[i]}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                                            <p className="text-gray-600">{card.description}</p>
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
