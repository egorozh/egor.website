
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Language, supportedLanguages} from '@/i18n';

export const useLanguageWithI18n = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const currentLangParam = params.lang as Language | undefined;

  // Always set language from URL parameter if it's valid
  useEffect(() => {
    if (currentLangParam && supportedLanguages.includes(currentLangParam)) {
      // Always change language to match URL, regardless of current i18n language
      i18n.changeLanguage(currentLangParam);
    }
  }, [currentLangParam, i18n]);

  // If language param changes, update i18n language
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (lng !== currentLangParam && supportedLanguages.includes(lng as Language)) {
        // Get current path without language prefix
        const currentPath = window.location.pathname;
        const pathWithoutLang = currentPath.replace(/^\/[^/]+/, '') || '/';
        
        // Navigate to new URL with language prefix
        navigate(`/${lng}${pathWithoutLang}`);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [currentLangParam, navigate, i18n]);

  const setLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    // The URL will be updated via the languageChanged event
  };

  return { 
    t, 
    currentLanguage: i18n.language as Language || 'en', 
    setLanguage 
  };
};
