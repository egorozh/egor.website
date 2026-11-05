import { useTranslation } from 'react-i18next';
import '@/metro/metro.css';
import { withBase } from '@/lib/utils';

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'en';
  return (
    <main className="nf">
      <div className="app-title">{t('hero.name')}</div>
      <h1 className="page-title">404</h1>
      <p className="lead">{t('metro.notFound.title')}</p>
      <p className="body">{t('metro.notFound.text')}</p>
      <a className="m-btn" href={withBase(`/${lang}`)}>
        {t('metro.notFound.home')}
      </a>
    </main>
  );
};

export default NotFound;
