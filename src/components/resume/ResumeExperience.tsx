
import { useTranslation } from 'react-i18next';

interface ProjectItem {
  name: string;
  responsibilities: string[];
}

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  projects: ProjectItem[];
}

const ResumeExperience = () => {
  const { t } = useTranslation();
  const experienceItems = t('resume.experience.items', { returnObjects: true }) as ExperienceItem[];

  return (
    <section className="mb-8 print:mb-6">
      <h3 className="text-xl font-bold text-foreground mb-4 border-b-2 border-primary pb-1 print:text-lg print:border-gray-300">
        {t('resume.experience.title')}
      </h3>
      <div className="space-y-6 print:space-y-4">
        {experienceItems.map((item, index) => (
          <div key={index} className="border-l-4 border-primary/30 pl-4 print:border-gray-300 print:pl-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
              <div>
                <h4 className="text-lg font-semibold text-foreground print:text-base">{item.title}</h4>
                <p className="text-primary font-medium print:text-foreground/90 print:text-sm">{item.company}</p>
              </div>
              <div className="text-muted-foreground text-sm md:text-right print:text-xs">
                <p>{item.period}</p>
                <p>{item.location}</p>
              </div>
            </div>
            
            <div className="space-y-4 print:space-y-3">
              {item.projects.map((project, projectIndex) => (
                <div key={projectIndex}>
                  <h5 className="font-medium text-foreground mb-2 print:text-sm print:mb-1">{project.name}</h5>
                  <ul className="list-disc list-inside text-foreground/90 space-y-1 ml-4 print:space-y-0 print:ml-3">
                    {project.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="text-sm print:text-xs">{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeExperience;
