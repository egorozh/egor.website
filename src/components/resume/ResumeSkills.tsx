
import { useTranslation } from 'react-i18next';

const ResumeSkills = () => {
  const { t } = useTranslation();

  const skillsData = {
    mobile: ['Flutter', 'Xamarin Native', 'iOS Development', 'Android Development', 'Cross-platform', 'GetIt', 'Injectable', 'Supabase', 'Firebase', 'Google Services', 'Apple Services', 'flutter_chat_ui', 'Azure + Asp.Net.Core', 'Azure Key Vault', 'Provider', 'Bloc', 'Dio', 'Retrofit', 'Slang', 'freezed', 'auto_route', 'infinite_scroll_pagination', 'google_mobile_ads', 'appsflyer'],
    languages: ['C#', 'Dart', 'XAML', 'JavaScript', 'TypeScript'],
    tools: ['Visual Studio', 'VS Code', 'Git', 'Azure DevOps', 'Firebase']
  };

  return (
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
  );
};

export default ResumeSkills;
