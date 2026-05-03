
import { useTranslation } from 'react-i18next';

interface EducationItem {
  degree: string;
  university: string;
  location: string;
  period: string;
  faculty: string;
  specialization: string;
  honors?: string;
}

const ResumeEducation = () => {
  const { t } = useTranslation();
  const educationItems = t('resume.education.items', { returnObjects: true }) as EducationItem[];

  return (
    <section className="mb-8 print:mb-6">
      <h3 className="text-xl font-bold text-foreground mb-4 border-b-2 border-primary pb-1 print:text-lg print:border-gray-300">
        {t('resume.education.title')}
      </h3>
      <div className="space-y-4 print:space-y-3">
        {educationItems.map((item, index) => (
          <div key={index} className="border-l-4 border-primary/30 pl-4 print:border-gray-300 print:pl-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h4 className="text-lg font-semibold text-foreground print:text-base">{item.degree}</h4>
                <p className="text-primary font-medium print:text-foreground/90 print:text-sm">{item.university}</p>
              </div>
              <div className="text-muted-foreground text-sm md:text-right print:text-xs">
                <p>{item.period}</p>
                <p>{item.location}</p>
              </div>
            </div>
            <p className="text-foreground/90 text-sm mb-1 print:text-xs">{item.faculty}</p>
            <p className="text-muted-foreground text-sm print:text-xs">{item.specialization}</p>
            {item.honors && (
              <p className="text-primary text-sm font-medium mt-1 print:text-foreground/90 print:text-xs">{item.honors}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeEducation;
