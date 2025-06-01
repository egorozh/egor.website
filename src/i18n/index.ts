
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    resources: {
      en: {
        translation: {
          "nav": {
            "about": "About",
            "skills": "Skills",
            "projects": "Projects",
            "experience": "Experience",
            "contact": "Contact"
          },
          "hero": {
            "greeting": "Hello, I'm",
            "name": "Egor Zheludkov",
            "title": "Mobile & Desktop Developer",
            "description": "Passionate developer with expertise in WPF, Xamarin, and Flutter. Founder of Ovdix startup.",
            "cta": "Get In Touch"
          },
          "about": {
            "title": "About Me",
            "description": "My name is Egor Zheludkov. I am a mobile and desktop developer. I started working in the IT industry in 2018 as a WPF developer. In early 2022, I transitioned to mobile development using Xamarin Native. Since the beginning of 2024, I've been working with Flutter. I am also the founder of a startup – Ovdix.",
            "highlight": "Transforming ideas into powerful applications"
          },
          "skills": {
            "title": "Technical Skills",
            "categories": {
              "mobile": "Mobile Development",
              "desktop": "Desktop Development",
              "languages": "Programming Languages",
              "tools": "Tools & Technologies"
            }
          },
          "projects": {
            "title": "Featured Projects",
            "ovdix": {
              "title": "Ovdix",
              "description": "Innovative startup platform that I founded, focusing on cutting-edge solutions for modern businesses.",
              "tech": "Flutter, Mobile Development",
              "link": "Visit Ovdix"
            },
            "xamarin": {
              "title": "Xamarin Native Projects",
              "description": "Cross-platform mobile applications built with Xamarin Native, delivering native performance across iOS and Android.",
              "tech": "Xamarin Native, C#, Mobile"
            },
            "wpf": {
              "title": "WPF Applications",
              "description": "Desktop applications built with WPF, featuring rich user interfaces and robust functionality.",
              "tech": "WPF, C#, .NET, Desktop"
            }
          },
          "experience": {
            "title": "Work Experience",
            "timeline": [
              {
                "period": "2024 - Present",
                "title": "Flutter Developer & Startup Founder",
                "company": "Ovdix",
                "description": "Leading mobile development with Flutter while founding and growing Ovdix startup."
              },
              {
                "period": "2022 - 2024",
                "title": "Mobile Developer",
                "company": "Xamarin Native",
                "description": "Specialized in cross-platform mobile development using Xamarin Native for iOS and Android."
              },
              {
                "period": "2018 - 2022",
                "title": "Desktop Developer",
                "company": "WPF Development",
                "description": "Started IT career developing desktop applications using WPF and .NET technologies."
              }
            ]
          },
          "contact": {
            "title": "Get In Touch",
            "description": "Let's connect and discuss opportunities to work together.",
            "email": "Email",
            "github": "GitHub",
            "linkedin": "LinkedIn"
          }
        }
      },
      ru: {
        translation: {
          "nav": {
            "about": "Обо мне",
            "skills": "Навыки",
            "projects": "Проекты",
            "experience": "Опыт",
            "contact": "Контакты"
          },
          "hero": {
            "greeting": "Привет, я",
            "name": "Егор Желудков",
            "title": "Мобильный и Десктопный Разработчик",
            "description": "Увлеченный разработчик с опытом в WPF, Xamarin и Flutter. Основатель стартапа Ovdix.",
            "cta": "Связаться"
          },
          "about": {
            "title": "Обо мне",
            "description": "Меня зовут Егор Желудков. Я мобильный и десктопный разработчик. Начал работать в IT-индустрии в 2018 году как WPF разработчик. В начале 2022 года перешел на мобильную разработку, используя Xamarin Native. С начала 2024 года работаю с Flutter. Я также являюсь основателем стартапа – Ovdix.",
            "highlight": "Превращаю идеи в мощные приложения"
          },
          "skills": {
            "title": "Технические навыки",
            "categories": {
              "mobile": "Мобильная разработка",
              "desktop": "Десктопная разработка",
              "languages": "Языки программирования",
              "tools": "Инструменты и технологии"
            }
          },
          "projects": {
            "title": "Избранные проекты",
            "ovdix": {
              "title": "Ovdix",
              "description": "Инновационная стартап-платформа, которую я основал, сосредоточенная на передовых решениях для современного бизнеса.",
              "tech": "Flutter, Мобильная разработка",
              "link": "Посетить Ovdix"
            },
            "xamarin": {
              "title": "Проекты на Xamarin Native",
              "description": "Кроссплатформенные мобильные приложения, созданные с помощью Xamarin Native, обеспечивающие нативную производительность на iOS и Android.",
              "tech": "Xamarin Native, C#, Mobile"
            },
            "wpf": {
              "title": "WPF Приложения",
              "description": "Десктопные приложения, созданные с помощью WPF, с богатыми пользовательскими интерфейсами и надежной функциональностью.",
              "tech": "WPF, C#, .NET, Desktop"
            }
          },
          "experience": {
            "title": "Опыт работы",
            "timeline": [
              {
                "period": "2024 - Настоящее время",
                "title": "Flutter Разработчик и Основатель стартапа",
                "company": "Ovdix",
                "description": "Веду мобильную разработку на Flutter, одновременно основывая и развивая стартап Ovdix."
              },
              {
                "period": "2022 - 2024",
                "title": "Мобильный разработчик",
                "company": "Xamarin Native",
                "description": "Специализировался на кроссплатформенной мобильной разработке с использованием Xamarin Native для iOS и Android."
              },
              {
                "period": "2018 - 2022",
                "title": "Десктопный разработчик",
                "company": "WPF разработка",
                "description": "Начал IT-карьеру с разработки десктопных приложений, используя WPF и .NET технологии."
              }
            ]
          },
          "contact": {
            "title": "Связаться со мной",
            "description": "Давайте свяжемся и обсудим возможности сотрудничества.",
            "email": "Email",
            "github": "GitHub",
            "linkedin": "LinkedIn"
          }
        }
      }
    }
  });

export default i18n;
