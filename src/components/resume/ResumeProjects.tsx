
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

interface ProjectItem {
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

const ResumeProjects = () => {
  const { t } = useTranslation();
  const projectItems = t('resume.projects.items', { returnObjects: true }) as ProjectItem[];

  return (
    <section className="mb-8 print:mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
        {t('resume.projects.title')}
      </h3>
      <div className="space-y-4 print:space-y-3">
        {projectItems.map((project, index) => (
          <div key={index} className="border-l-4 border-green-200 pl-4 print:border-gray-300 print:pl-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
              <h4 className="text-lg font-semibold text-gray-900 print:text-base">{project.name}</h4>
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm print:text-xs print:text-gray-700 print:no-underline"
                >
                  <span className="mr-1">Visit Project</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <p className="text-gray-700 mb-2 print:text-sm print:mb-1">{project.description}</p>
            <p className="text-sm text-blue-600 font-medium print:text-xs print:text-gray-600">{project.technologies}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeProjects;
