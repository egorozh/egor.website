import { useTheme } from '@/hooks/useTheme';
import { useLanguageWithI18n } from '@/hooks/useLanguageWithI18n';
import { Language } from '@/i18n';
import { ACCENTS } from '../palette';
import { ListPicker, Page, Toggle } from '../kit';
import type { AppProps } from './index';

export const SettingsApp = ({ lang }: AppProps) => {
  const { t, setLanguage } = useLanguageWithI18n();
  const { theme, setTheme, accent, setAccent, liveTiles, setLiveTiles } = useTheme();

  return (
    <Page title={t('metro.apps.settings')}>
      <ListPicker
        label={t('metro.settings.background')}
        value={theme}
        options={[
          { id: 'dark', label: t('metro.settings.dark') },
          { id: 'light', label: t('metro.settings.light') },
        ]}
        onChange={setTheme}
      />

      <div className="picker">
        <div className="picker-label">
          {t('metro.settings.accent')} — <span className="accent-text">{t(`metro.accents.${accent}`)}</span>
        </div>
        <div className="accent-grid" role="radiogroup" aria-label={t('metro.settings.accent')}>
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              role="radio"
              aria-checked={a.id === accent}
              aria-label={t(`metro.accents.${a.id}`)}
              title={t(`metro.accents.${a.id}`)}
              style={{ background: a.hex }}
              className={a.id === accent ? 'is-on' : undefined}
              onClick={() => setAccent(a.id)}
            />
          ))}
        </div>
      </div>

      <ListPicker
        label={t('metro.settings.language')}
        value={lang as Language}
        options={[
          { id: 'ru', label: 'русский' },
          { id: 'en', label: 'english' },
        ]}
        onChange={(v) => setLanguage(v as Language)}
      />

      <Toggle
        label={t('metro.settings.liveTiles')}
        checked={liveTiles}
        onChange={setLiveTiles}
        onText={t('metro.settings.on')}
        offText={t('metro.settings.off')}
      />
    </Page>
  );
};
