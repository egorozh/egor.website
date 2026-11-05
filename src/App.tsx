import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Metro from '@/metro/Metro';
import NotFound from './pages/NotFound';
import { Language, supportedLanguages } from '@/i18n';
import { ThemeProvider } from '@/hooks/useTheme';
import { BASE_PATH, stripBase, withBase } from '@/lib/utils';

const browserLanguage = (): Language => {
  const lang = navigator.language.substring(0, 2);
  return supportedLanguages.includes(lang as Language) ? (lang as Language) : 'en';
};

/** Sends "/" and "/resume" to the same page under the visitor's language. */
const LanguageRedirect = () => {
  useEffect(() => {
    const path = stripBase(window.location.pathname).substring(1);
    window.location.replace(withBase(`/${browserLanguage()}${path ? `/${path}` : ''}`));
  }, []);
  return null;
};

const App = () => (
  <ThemeProvider>
    <Suspense fallback={null}>
      <BrowserRouter basename={BASE_PATH || undefined}>
        <Routes>
          <Route path="/" element={<LanguageRedirect />} />
          <Route path="resume" element={<LanguageRedirect />} />
          <Route path="/:lang/*" element={<Metro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </ThemeProvider>
);

export default App;
