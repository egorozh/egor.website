import { createContext, useContext, useEffect, useLayoutEffect, useState, ReactNode } from 'react';
import { AccentId, DEFAULT_ACCENT, accentHex, isAccent } from '@/metro/palette';

export type Theme = 'light' | 'dark';

interface SettingsValue {
  theme: Theme;
  accent: AccentId;
  liveTiles: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  setAccent: (a: AccentId) => void;
  setLiveTiles: (v: boolean) => void;
}

const SettingsContext = createContext<SettingsValue | undefined>(undefined);

const read = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — settings just won't persist */
  }
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const stored = read('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const getInitialAccent = (): AccentId => {
  const stored = typeof window === 'undefined' ? null : read('accent');
  return isAccent(stored) ? stored : DEFAULT_ACCENT;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [accent, setAccent] = useState<AccentId>(getInitialAccent);
  const [liveTiles, setLiveTiles] = useState<boolean>(() => read('liveTiles') !== 'off');

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.background = '';
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
    write('theme', theme);
  }, [theme]);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--accent', accentHex(accent));
    write('accent', accent);
  }, [accent]);

  useEffect(() => {
    write('liveTiles', liveTiles ? 'on' : 'off');
  }, [liveTiles]);

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  return (
    <SettingsContext.Provider value={{ theme, accent, liveTiles, toggleTheme, setTheme, setAccent, setLiveTiles }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
