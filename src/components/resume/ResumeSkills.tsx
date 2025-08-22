import {useTranslation} from 'react-i18next';

const ResumeSkills = () => {
    const {t} = useTranslation();

    const skillsData = {
        mobile: [
            'Flutter (prod, perf/jank-free)',
            'Cross-platform (iOS/Android)',
            'Clean Architecture',
            'State Management (BLoC, Provider)',
            'Dependency Injection (GetIt, Injectable)',
            'Networking (Dio, Retrofit, REST/JSON)',
            'Codegen (freezed, build_runner)',
            'Pagination & Caching (infinite_scroll_pagination)',
            'Localization (slang)',
            'Push Notifications (FCM/APNs)',
            'In-App Purchases (StoreKit/BillingClient)',
            'Deep/Universal Links & Share',
            'Maps SDK (Google/Yandex/NavKit)',
            'Analytics & Attribution (Firebase Analytics, AppsFlyer)',
            'Crash Monitoring (Crashlytics)',
            'Platform Channels (Swift/Kotlin)',
            'Isolates & Performance Profiling (Flutter DevTools)',
            'Realtime & WebSockets (чат)',
            'Supabase (Auth/DB/Storage)',
            'Firebase (Auth/Remote Config/Storage)'
        ],
        languages: [
            'Dart',
            'C#',
            'Swift (interop)',
            'Kotlin (interop)',
            'SQL (PostgreSQL)'
        ],
        tools: [
            'Android Studio',
            'Xcode',
            'JetBrains Rider',
            'Git & GitFlow',
            'GitHub Actions / Azure DevOps (CI/CD)',
            'Fastlane',
            'App Store Connect / Google Play Console',
            'Firebase Console',
            'Azure + ASP.NET Core (бек-интеграции)',
            'Azure Key Vault (secrets)',
            'Postman',
            'Figma (Dev Mode)'
        ]
    };


    return (
        <section className="mb-8 print:mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
                {t('resume.skills.title')}
            </h3>
            <div className="space-y-4 print:space-y-3">
                {Object.entries(skillsData).map(([category, skills]) => (
                    <div key={category}>
                        <h4 className="font-semibold text-gray-800 mb-2 print:text-sm print:mb-1">
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
