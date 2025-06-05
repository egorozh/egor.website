
import { useTranslation } from 'react-i18next';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

const ResumeExperience = () => {
  const { t } = useTranslation();
  const experienceItems = t('resume.experience.items', { returnObjects: true }) as ExperienceItem[];

  return (
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
  );
};

export default ResumeExperience;
