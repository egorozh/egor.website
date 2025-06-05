
import { useTranslation } from 'react-i18next';

const ResumeSummary = () => {
  const { t } = useTranslation();

  return (
    <section className="mb-8 print:mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
        {t('resume.summary.title')}
      </h3>
      <p className="text-gray-700 leading-relaxed print:text-sm">
        {t('resume.summary.content')}
      </p>
    </section>
  );
};

export default ResumeSummary;
