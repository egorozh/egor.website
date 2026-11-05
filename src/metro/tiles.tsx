import { useEffect, useState } from 'react';
import { FileText, Github, Linkedin, Mail, Moon, Play, Settings, Sun, User } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { ACCENTS } from './palette';
import { Cycle, Flip, Peek } from './live';
import type { TileSpec } from './Tile';
import { Article, GITHUB, LINKEDIN, AVATAR, ResumeProject, STACK, useContent, yearsInCode } from './content';
import { BlocksGlyph } from './glyphs';
import { withBase } from '@/lib/utils';

const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 10_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
};

const ClockFace = ({ lang }: { lang: string }) => {
  const now = useClock();
  const locale = lang === 'ru' ? 'ru-RU' : 'en-GB';
  return (
    <div className="lt-clock">
      <div className="lt-clock-time">{now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</div>
      <div className="lt-clock-day">{now.toLocaleDateString(locale, { weekday: 'long' })}</div>
      <div className="lt-clock-date">{now.toLocaleDateString(locale, { day: 'numeric', month: 'long' })}</div>
    </div>
  );
};

/** Settings tile: a swatch grid where the "selected" colour wanders. */
const Swatches = () => {
  const { accent } = useTheme();
  return (
    <div className="lt-swatches" aria-hidden>
      {ACCENTS.slice(0, 16).map((a, i) => (
        <span
          key={a.id}
          style={{ background: a.hex, animationDelay: `${(i * 677) % 5000}ms` }}
          className={a.id === accent ? 'is-current' : undefined}
        />
      ))}
    </div>
  );
};

/** Little looping game of falling blocks for the game tile. */
const BlocksPreview = () => (
  <div className="lt-blocks" aria-hidden>
    <div className="lt-blocks-piece">
      <i style={{ left: '25%', top: 0 }} />
      <i style={{ left: '37.5%', top: 0 }} />
      <i style={{ left: '50%', top: 0 }} />
      <i style={{ left: '37.5%', top: '12.5%' }} />
    </div>
    {[
      [0, 7, '#1BA1E2'],
      [1, 7, '#1BA1E2'],
      [2, 7, '#60A917'],
      [5, 7, '#E3C800'],
      [6, 7, '#E3C800'],
      [7, 7, '#FA6800'],
      [0, 6, '#E51400'],
      [5, 6, '#E3C800'],
      [6, 6, '#E3C800'],
      [7, 6, '#FA6800'],
      [7, 5, '#FA6800'],
    ].map(([x, y, c]) => (
      <i key={`${x}-${y}`} style={{ left: `${(x as number) * 12.5}%`, top: `${(y as number) * 12.5}%`, background: c as string }} />
    ))}
  </div>
);

export function useTiles(lang: string): TileSpec[] {
  const { t, list } = useContent();
  const { theme } = useTheme();
  const projects = list<ResumeProject>('resume.projects.items');
  const articles = list<Article>('resume.articles.items');
  const years = yearsInCode();
  const base = withBase(`/${lang}`);
  const tech = STACK.flatMap((g) => g.items).filter((v, i, a) => a.indexOf(v) === i);
  const ovdix = projects.find((p) => p.name === 'Ovdix');
  const plumix = projects.find((p) => p.name === 'Plumix');

  return [
    {
      key: 'me',
      size: 'large',
      app: 'about',
      href: `${base}/about`,
      label: t('metro.tiles.about'),
      tone: '#6f6b68',
      splash: <User strokeWidth={1} />,
      content: (
        <Peek
          offset={1500}
          front={
            <div className="lt-me">
              <img src={AVATAR} alt="" draggable={false} />
            </div>
          }
          back={
            <div className="lt-me-text">
              <span className="lt-small">{t('hero.greeting')}</span>
              <span className="lt-me-name">{t('hero.name')}</span>
              <span className="lt-me-role">{t('hero.title')}</span>
            </div>
          }
        />
      ),
    },
    {
      key: 'experience',
      size: 'medium',
      app: 'experience',
      href: `${base}/experience`,
      label: t('metro.tiles.experience'),
      splash: <span className="splash-num">{years}</span>,
      content: (
        <Flip
          offset={600}
          front={<ClockFace lang={lang} />}
          back={
            <div className="lt-years">
              <span className="lt-years-num">{years}</span>
              <span>{t('metro.tile.yearsInCode', { count: years })}</span>
            </div>
          }
        />
      ),
    },
    {
      key: 'skills',
      size: 'medium',
      app: 'skills',
      href: `${base}/skills`,
      label: t('metro.tiles.skills'),
      splash: <span className="splash-word">{'</>'}</span>,
      content: <Cycle offset={300} items={tech} render={(s) => <span className="lt-word">{s}</span>} />,
    },
    {
      key: 'projects',
      size: 'wide',
      app: 'projects',
      href: `${base}/projects`,
      label: t('metro.tiles.projects'),
      splash: <span className="splash-word">{projects.length}</span>,
      content: (
        <Cycle
          offset={2100}
          min={3800}
          max={6000}
          items={projects}
          render={(p) => (
            <div className="lt-project">
              <span className="lt-project-name">{p.name}</span>
              <span className="lt-project-tech">{p.technologies}</span>
            </div>
          )}
        />
      ),
    },
    {
      key: 'ovdix',
      size: 'medium',
      app: 'projects',
      pivot: 'ovdix',
      href: `${base}/projects/ovdix`,
      label: 'Ovdix',
      splash: <span className="splash-word">ovdix</span>,
      content: (
        <Flip
          offset={3000}
          front={<span className="lt-wordmark">ovdix</span>}
          back={<p className="lt-blurb">{ovdix?.description}</p>}
        />
      ),
    },
    {
      key: 'plumix',
      size: 'medium',
      app: 'projects',
      pivot: 'plumix',
      href: `${base}/projects/plumix`,
      label: 'Plumix',
      splash: <span className="splash-word">plumix</span>,
      content: (
        <Flip
          offset={4500}
          front={<span className="lt-wordmark">plumix</span>}
          back={<p className="lt-blurb">{plumix?.description}</p>}
        />
      ),
    },
    {
      key: 'contact',
      size: 'medium',
      app: 'contact',
      href: `${base}/contact`,
      label: t('metro.tiles.contact'),
      splash: <Mail strokeWidth={1} />,
      content: (
        <Flip
          offset={1200}
          front={
            <div className="lt-mail">
              <Mail strokeWidth={1.1} />
              <span>1</span>
            </div>
          }
          back={<p className="lt-blurb lt-blurb--big">{t('metro.tile.writeMe')}</p>}
        />
      ),
    },
    {
      key: 'github',
      size: 'small',
      href: GITHUB,
      external: true,
      tone: theme === 'dark' ? '#2b3137' : '#24292f',
      label: 'GitHub',
      content: <Github className="lt-icon" strokeWidth={1.2} />,
    },
    {
      key: 'linkedin',
      size: 'small',
      href: LINKEDIN,
      external: true,
      tone: '#0a66c2',
      label: 'LinkedIn',
      content: <Linkedin className="lt-icon" strokeWidth={1.2} />,
    },
    {
      key: 'theme',
      size: 'small',
      href: '#theme',
      action: 'theme',
      label: t('metro.tiles.theme'),
      content: (
        <div className={'lt-toggle' + (theme === 'light' ? ' is-on' : '')}>
          <Moon className="lt-icon" strokeWidth={1.2} />
          <Sun className="lt-icon" strokeWidth={1.2} />
        </div>
      ),
    },
    {
      key: 'lang',
      size: 'small',
      href: withBase(`/${lang === 'ru' ? 'en' : 'ru'}`),
      action: 'lang',
      label: t('metro.tiles.language'),
      content: (
        <div className={'lt-toggle' + (lang === 'en' ? ' is-on' : '')}>
          <span className="lt-lang">ru</span>
          <span className="lt-lang">en</span>
        </div>
      ),
    },
    {
      key: 'resume',
      size: 'wide',
      app: 'resume',
      href: `${base}/resume`,
      label: t('metro.tiles.resume'),
      splash: <FileText strokeWidth={1} />,
      content: (
        <Peek
          offset={3600}
          front={
            <div className="lt-resume">
              <FileText strokeWidth={1} />
              <div>
                <span className="lt-resume-title">{t('hero.name')}</span>
                <span className="lt-resume-sub">{t('resume.header.title')}</span>
              </div>
            </div>
          }
          back={<p className="lt-blurb">{t('resume.summary.content')}</p>}
        />
      ),
    },
    {
      key: 'videos',
      size: 'medium',
      app: 'videos',
      href: `${base}/videos`,
      tone: '#e51400',
      label: t('metro.tiles.videos'),
      splash: <Play strokeWidth={1} />,
      content: (
        <div className="lt-play">
          <Play strokeWidth={1} />
        </div>
      ),
    },
    {
      key: 'articles',
      size: 'medium',
      app: 'articles',
      href: `${base}/articles`,
      label: t('metro.tiles.articles'),
      splash: <span className="splash-word">{articles.length}</span>,
      content: (
        <Cycle
          offset={5200}
          min={4000}
          max={7000}
          items={[null, ...articles]}
          render={(a) =>
            a ? (
              <div className="lt-article">
                <span>{a.year}</span>
                <p>{a.title}</p>
              </div>
            ) : (
              <div className="lt-count">
                <span>{articles.length}</span>
                <small>{t('metro.tile.onHabr')}</small>
              </div>
            )
          }
        />
      ),
    },
    {
      key: 'settings',
      size: 'medium',
      app: 'settings',
      href: `${base}/settings`,
      label: t('metro.tiles.settings'),
      splash: <Settings strokeWidth={1} />,
      content: <Swatches />,
    },
    {
      key: 'blocks',
      size: 'medium',
      app: 'blocks',
      href: `${base}/blocks`,
      tone: theme === 'dark' ? '#161616' : '#1f1f1f',
      label: t('metro.tiles.blocks'),
      splash: <BlocksGlyph />,
      content: <BlocksPreview />,
    },
  ];
}

/** Which tile an app unfolds from when it is opened without a tap (URL, search, back/forward). */
export const originTileFor = (app: string, pivot?: string) => {
  if (app === 'projects' && (pivot === 'ovdix' || pivot === 'plumix')) return pivot;
  if (app === 'about') return 'me';
  return app;
};

