import {useTranslation} from 'react-i18next';

const ResumeSkills = () => {
    const {t} = useTranslation();

    const skillsData = {
        architecture: t('resume.skills.categories.architecture', { returnObjects: true }) as string[],
        development: t('resume.skills.categories.development', { returnObjects: true }) as string[],
        integrations: t('resume.skills.categories.integrations', { returnObjects: true }) as string[],
        testing: t('resume.skills.categories.testing', { returnObjects: true }) as string[],
        tools: t('resume.skills.categories.tools', { returnObjects: true }) as string[]
    };

    return (
        <section className="mb-8 print:mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1 print:text-lg print:border-gray-300">
                {t('resume.skills.title')}
            </h3>
            <div className="grid grid-cols-2 gap-x-8 print:gap-x-6">
                <div className="space-y-5 print:space-y-4">
                    {['architecture', 'development', 'integrations', 'testing'].map((category) => (
                        <div key={category}>
                            <h4 className="font-semibold text-gray-800 mb-2 print:text-sm print:mb-1.5">
                                {t(`resume.skills.${category}`)}
                            </h4>
                            <ul className="list-none space-y-1 print:space-y-0.5">
                                {(skillsData[category as keyof typeof skillsData] as string[]).map((skill, index) => (
                                    <li
                                        key={index}
                                        className="text-gray-700 text-sm print:text-xs flex items-start"
                                    >
                                        <span className="mr-2">−</span>
                                        <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2 print:text-sm print:mb-1.5">
                            {t('resume.skills.tools')}
                        </h4>
                        <ul className="list-none space-y-1 print:space-y-0.5">
                            {(skillsData.tools as string[]).map((skill, index) => (
                                <li
                                    key={index}
                                    className="text-gray-700 text-sm print:text-xs flex items-start"
                                >
                                    <span className="mr-2">−</span>
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResumeSkills;
