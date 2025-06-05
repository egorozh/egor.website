
import { useTranslation } from 'react-i18next';

interface LanguageItem {
  language: string;
  level: string;
}

const ResumeLanguages = () => {
  const { t } = useTranslation();
  const languageItems = t('resume.languages.items', { returnObjects: true }) as LanguageItem[];

  return (
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
  );
};

export default ResumeLanguages;
