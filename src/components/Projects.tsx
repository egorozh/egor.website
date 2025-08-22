import {useTranslation} from 'react-i18next';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ExternalLink, Github} from 'lucide-react';

const Projects = () => {
    const {t} = useTranslation();

    const projects = [
        {
            title: t('projects.ovdix.title'),
            description: t('projects.ovdix.description'),
            tech: t('projects.ovdix.tech'),
            link: 'https://ovdix.com',
            linkText: t('projects.ovdix.link'),
            gradient: 'from-blue-600 to-purple-600',
            featured: true
        },
        {
            title: t('projects.vertochat.title'),
            description: t('projects.vertochat.description'),
            tech: t('projects.vertochat.tech'),
            link: 'https://verto.chat',
            linkText: t('projects.vertochat.link'),
            gradient: 'from-blue-600 to-purple-600',
            featured: true
        },
        {
            title: t('projects.xamarin.title'),
            description: t('projects.xamarin.description'),
            tech: t('projects.xamarin.tech'),
            gradient: 'from-green-600 to-teal-600'
        },
        {
            title: t('projects.wpf.title'),
            description: t('projects.wpf.description'),
            tech: t('projects.wpf.tech'),
            gradient: 'from-purple-600 to-pink-600'
        }
    ];

    return (
        <section id="projects" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('projects.title')}</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <Card
                                key={index}
                                className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden ${
                                    project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                                }`}
                            >
                                <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                                <CardHeader className="pb-4">
                                    <CardTitle
                                        className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-gray-600 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.split(', ').map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                        {tech}
                      </span>
                                        ))}
                                    </div>
                                    {project.link && (
                                        <Button
                                            onClick={() => window.open(project.link, '_blank')}
                                            className={`w-full bg-gradient-to-r ${project.gradient} hover:shadow-lg transition-all duration-300`}
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2"/>
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
