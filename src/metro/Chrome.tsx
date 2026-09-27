import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackGlyph, BatteryGlyph, SearchGlyph, SignalGlyph, StartGlyph } from './glyphs';

export const StatusBar = ({ lang }: { lang: string }) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="statusbar" aria-hidden>
      <div className="statusbar-left">
        <SignalGlyph width={15} height={10} />
        <span>EZ</span>
      </div>
      <div className="statusbar-right">
        <BatteryGlyph width={22} height={10} />
        <span>{now.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

interface NavProps {
  onBack: () => void;
  onStart: () => void;
  onSearch: () => void;
  canGoBack: boolean;
}

/** The three capacitive buttons every Windows Phone had. */
export const NavBar = ({ onBack, onStart, onSearch, canGoBack }: NavProps) => {
  const { t } = useTranslation();
  return (
    <nav className="navbar">
      <button type="button" onClick={onBack} aria-label={t('metro.ui.back')} title={t('metro.ui.back')} data-dim={!canGoBack || undefined}>
        <BackGlyph />
      </button>
      <button type="button" onClick={onStart} aria-label={t('metro.ui.start')} title={t('metro.ui.start')}>
        <StartGlyph />
      </button>
      <button type="button" onClick={onSearch} aria-label={t('metro.ui.search')} title={t('metro.ui.search')}>
        <SearchGlyph />
      </button>
    </nav>
  );
};
