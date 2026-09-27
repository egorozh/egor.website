import { MouseEvent, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useLanguageWithI18n } from '@/hooks/useLanguageWithI18n';
import { supportedLanguages, Language } from '@/i18n';
import NotFound from '@/pages/NotFound';
import { AppId, isAppId } from './content';
import { Tile, TileSpec } from './Tile';
import { originTileFor, useTiles } from './tiles';
import { NavBar, StatusBar } from './Chrome';
import { AppView } from './apps';
import { Search } from './Search';
import './metro.css';

/** Duration of one "game tick": tiles travel one grid cell per tick. */
const TICK = 46;
const WALL = 16;

type Mode = 'pile' | 'away';
type Phase = 'opening' | 'open' | 'closing' | null;
type Rect = { left: number; top: number; width: number; height: number };

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const modeFor = (vw: number): Mode => (vw >= 1100 ? 'pile' : 'away');
const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

/** The column the open app occupies: centred sheet on wide screens, full screen otherwise. */
const columnRect = (): Rect => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (modeFor(vw) === 'away') return { left: 0, top: 0, width: vw, height: vh };
  const width = Math.round(Math.min(860, Math.max(640, vw * 0.54)));
  return { left: Math.round((vw - width) / 2), top: 0, width, height: vh };
};

const rectToTransform = (r: Rect, col: Rect) =>
  `translate(${r.left - col.left}px, ${r.top - col.top}px) scale(${r.width / col.width}, ${r.height / col.height})`;

const Metro = () => {
  const { lang = '', '*': rest = '' } = useParams();
  if (!supportedLanguages.includes(lang as Language)) return <NotFound />;
  const [appSeg, pivotSeg] = rest.split('/').filter(Boolean);
  if (appSeg && !isAppId(appSeg)) return <Navigate to={`/${lang}`} replace />;
  return <StartScreen lang={lang} app={(appSeg as AppId) ?? null} pivot={pivotSeg} />;
};

const StartScreen = ({ lang, app, pivot }: { lang: string; app: AppId | null; pivot?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, setLanguage } = useLanguageWithI18n();
  const { toggleTheme } = useTheme();
  const tiles = useTiles(lang);

  const rootRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const tileEls = useRef(new Map<string, HTMLAnchorElement>());
  const prevApp = useRef<AppId | null | undefined>(undefined);
  const originKey = useRef<string | null>(null);
  const pendingOrigin = useRef<string | null>(null);
  const generation = useRef(0);
  const running = useRef<Animation[]>([]);

  const [sheetApp, setSheetApp] = useState<AppId | null>(null);
  const [phase, setPhase] = useState<Phase>(null);
  const [splash, setSplash] = useState<ReactNode>(null);
  const [mode, setMode] = useState<Mode>(() => modeFor(window.innerWidth));
  const [searchOpen, setSearchOpen] = useState(false);

  const specs = useRef<TileSpec[]>(tiles);
  specs.current = tiles;

  const register = useCallback((key: string, el: HTMLAnchorElement | null) => {
    if (el) tileEls.current.set(key, el);
    else tileEls.current.delete(key);
  }, []);

  /** Layout position of a tile, ignoring whatever transform it currently has. */
  const homeRect = (el: HTMLElement): Rect => {
    const g = gridRef.current!.getBoundingClientRect();
    return { left: g.left + el.offsetLeft, top: g.top + el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
  };

  const toneOf = (el: HTMLElement | undefined | null) =>
    el ? getComputedStyle(el.querySelector('.tile-face')!).backgroundColor : getComputedStyle(rootRef.current!).getPropertyValue('--accent');
  const pageBg = () => getComputedStyle(rootRef.current!).getPropertyValue('--bg').trim() || '#000';

  const syncGeometry = () => {
    const col = columnRect();
    const root = rootRef.current;
    if (!root) return col;
    root.style.setProperty('--col-l', `${col.left}px`);
    root.style.setProperty('--col-w', `${col.width}px`);
    setMode(modeFor(window.innerWidth));
    return col;
  };

  const cancelRunning = () => {
    running.current.forEach((a) => a.cancel());
    running.current = [];
  };

  /**
   * Moves every tile except `openKey` out of the way, one grid cell per tick.
   * Wide screens: tiles slide sideways against the screen edges and pile up
   * like blocks, framing the app. Narrow screens: they slide off the edges.
   * With `openKey = null` everything returns home and "locks" into place.
   */
  const scatter = (openKey: string | null, opts: { instant?: boolean } = {}) => {
    const grid = gridRef.current;
    if (!grid) return;
    const vw = window.innerWidth;
    const mid = vw / 2;
    const currentMode = modeFor(vw);
    const cs = getComputedStyle(grid);
    const gap = parseFloat(cs.columnGap) || 8;
    const cols = parseInt(cs.getPropertyValue('--cols')) || 4;
    const cell = (grid.clientWidth + gap) / cols;
    const instant = opts.instant || reduceMotion();

    const items = [...tileEls.current].map(([key, el]) => ({ key, el, r: homeRect(el) }));
    const origin = items.find((i) => i.key === (openKey ?? originKey.current));
    const centre = (r: Rect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    const target = new Map<string, number>();

    if (openKey) {
      const others = items.filter((i) => i.key !== openKey);
      const lefts = others.filter((i) => centre(i.r).x < mid).sort((a, b) => a.r.left - b.r.left);
      const rights = others
        .filter((i) => centre(i.r).x >= mid)
        .sort((a, b) => b.r.left + b.r.width - (a.r.left + a.r.width));
      const overlaps = (a: { top: number; bottom: number }, r: Rect) => a.top < r.top + r.height - 1 && r.top < a.bottom - 1;

      if (currentMode === 'pile') {
        // Sideways gravity: each tile slides until it hits the wall or a tile already stacked there.
        const pileL: { top: number; bottom: number; edge: number }[] = [];
        for (const i of lefts) {
          let x = WALL;
          for (const p of pileL) if (overlaps(p, i.r)) x = Math.max(x, p.edge + gap);
          x = Math.min(x, i.r.left);
          target.set(i.key, x - i.r.left);
          pileL.push({ top: i.r.top, bottom: i.r.top + i.r.height, edge: x + i.r.width });
        }
        const pileR: { top: number; bottom: number; edge: number }[] = [];
        for (const i of rights) {
          let x = vw - WALL;
          for (const p of pileR) if (overlaps(p, i.r)) x = Math.min(x, p.edge - gap);
          x = Math.max(x, i.r.left + i.r.width);
          target.set(i.key, x - (i.r.left + i.r.width));
          pileR.push({ top: i.r.top, bottom: i.r.top + i.r.height, edge: x - i.r.width });
        }
      } else {
        for (const i of lefts) target.set(i.key, -(i.r.left + i.r.width + 12));
        for (const i of rights) target.set(i.key, vw - i.r.left + 12);
      }
    }

    const returning = !openKey;
    let longest = 0;
    for (const { key, el, r } of items) {
      if (key === openKey) continue;
      const tx = target.get(key) ?? 0;
      const prev = Number(el.dataset.tx || 0);
      const steps = Math.max(1, Math.round(Math.abs(tx - prev) / cell));
      const dur = instant || tx === prev ? 0 : steps * TICK;
      let delay = 0;
      if (!instant) {
        if (currentMode === 'pile') {
          // Outer tiles move first on the way out, inner ones first on the way back — no collisions.
          const d = Math.abs(centre(r).x - mid);
          delay = returning ? Math.max(0, 420 - d * 0.7) : d * 0.5;
        } else if (origin) {
          const c = centre(r);
          const o = centre(origin.r);
          delay = Math.min(260, Math.hypot(c.x - o.x, c.y - o.y) * 0.32);
        }
        delay = Math.round(delay);
      }
      el.style.setProperty('--tx', `${tx}px`);
      el.style.setProperty('--n', String(steps));
      el.style.setProperty('--dur', `${dur}ms`);
      el.style.setProperty('--delay', `${delay}ms`);
      el.dataset.tx = String(tx);
      el.toggleAttribute('data-out', tx !== 0);
      if (returning && prev !== 0 && !instant) {
        el.style.setProperty('--land', `${delay + dur}ms`);
        el.classList.remove('is-landing');
        void el.offsetWidth;
        el.classList.add('is-landing');
      }
      longest = Math.max(longest, delay + dur);
    }

    if (instant) {
      grid.classList.add('no-trans');
      void grid.offsetWidth;
      grid.classList.remove('no-trans');
    }
    return longest;
  };

  const placeTileHome = (el: HTMLElement) => {
    el.style.setProperty('--dur', '0ms');
    el.style.setProperty('--delay', '0ms');
    el.style.setProperty('--tx', '0px');
    el.dataset.tx = '0';
    el.removeAttribute('data-out');
  };

  const openSheet = async (next: AppId, key: string, instant = false) => {
    const my = ++generation.current;
    cancelRunning();
    const col = syncGeometry();
    const bg = bgRef.current!;
    const splashEl = splashRef.current!;
    const reduce = reduceMotion();

    // An app is already on screen: let its content fall away first.
    if (sheetApp && !instant) {
      setPhase('closing');
      await wait(150);
      if (my !== generation.current) return;
    }

    const el = tileEls.current.get(key);
    const from = el?.getBoundingClientRect();
    const tone = toneOf(el);

    if (originKey.current && originKey.current !== key) {
      tileEls.current.get(originKey.current)?.removeAttribute('data-hidden');
    }
    originKey.current = key;
    setSplash(specs.current.find((s) => s.key === key)?.splash ?? null);
    setSheetApp(next);
    setPhase('opening');
    if (sheetRef.current) sheetRef.current.scrollTop = 0;

    scatter(key, { instant });
    if (el) {
      el.setAttribute('data-hidden', '');
      placeTileHome(el);
    }

    bg.classList.add('is-visible');
    const visible = from && from.right > 0 && from.left < window.innerWidth && from.bottom > 0 && from.top < window.innerHeight;
    if (instant || reduce || !from || !visible) {
      bg.classList.add('is-settled');
      setPhase('open');
      return;
    }

    bg.classList.remove('is-settled');
    bg.style.background = tone;
    const easing = 'cubic-bezier(.16,.84,.24,1)';
    const grow = bg.animate([{ transform: rectToTransform(from, col) }, { transform: 'none' }], {
      duration: 440,
      delay: 70,
      easing,
      fill: 'both',
    });
    const dx = from.left + from.width / 2 - (col.left + col.width / 2);
    const dy = from.top + from.height / 2 - window.innerHeight / 2;
    const icon = splashEl.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(.45)`, opacity: 0 },
        { opacity: 1, offset: 0.4 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 440, delay: 70, easing, fill: 'both' },
    );
    running.current.push(grow, icon);

    try {
      await grow.finished;
    } catch {
      return;
    }
    if (my !== generation.current) return;

    const fade = bg.animate([{ background: tone }, { background: pageBg() }], { duration: 280, easing: 'ease-out', fill: 'forwards' });
    const out = splashEl.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(1.3)' }], {
      duration: 260,
      easing: 'ease-in',
      fill: 'forwards',
    });
    running.current.push(fade, out);
    setPhase('open');
    sheetRef.current?.focus({ preventScroll: true });

    try {
      await fade.finished;
    } catch {
      return;
    }
    if (my !== generation.current) return;
    bg.classList.add('is-settled');
    bg.style.background = '';
    grow.cancel();
    fade.cancel();
  };

  const closeSheet = async () => {
    const my = ++generation.current;
    cancelRunning();
    const col = syncGeometry();
    const bg = bgRef.current!;
    const key = originKey.current;
    const el = key ? tileEls.current.get(key) : undefined;

    const finish = () => {
      el?.removeAttribute('data-hidden');
      bg.classList.remove('is-visible', 'is-settled');
      bg.style.background = '';
      cancelRunning();
      originKey.current = null;
      setSheetApp(null);
      setPhase(null);
      setSplash(null);
    };

    setPhase('closing');
    if (!el || reduceMotion()) {
      scatter(null);
      finish();
      el?.focus({ preventScroll: true });
      return;
    }

    const to = homeRect(el);
    const tone = toneOf(el);
    bg.classList.remove('is-settled');
    const easing = 'cubic-bezier(.55,0,.2,1)';
    const tint = bg.animate([{ background: pageBg() }, { background: tone }], { duration: 200, delay: 60, fill: 'both' });
    const shrink = bg.animate([{ transform: 'none' }, { transform: rectToTransform(to, col) }], {
      duration: 360,
      delay: 140,
      easing,
      fill: 'forwards',
    });
    running.current.push(tint, shrink);
    window.setTimeout(() => my === generation.current && scatter(null), 140);

    try {
      await shrink.finished;
    } catch {
      return;
    }
    if (my !== generation.current) return;
    finish();
    el.focus({ preventScroll: true });
  };

  const boot = () => {
    const grid = gridRef.current;
    if (!grid || reduceMotion()) return;
    const g = grid.getBoundingClientRect();
    tileEls.current.forEach((el) => {
      const r = homeRect(el);
      el.style.setProperty('--hinge', `${g.left - r.left}px`);
      el.style.setProperty('--boot-delay', `${Math.round(Math.min(760, (r.top - g.top) * 0.32 + (r.left - g.left) * 0.1))}ms`);
    });
    rootRef.current?.classList.add('is-booting');
    window.setTimeout(() => rootRef.current?.classList.remove('is-booting'), 1700);
  };

  // React to the URL: open, switch or close the app.
  useLayoutEffect(() => {
    const prev = prevApp.current;
    prevApp.current = app;
    syncGeometry();
    if (prev === undefined) {
      if (app) openSheet(app, originTileFor(app, pivot), true);
      else boot();
      return;
    }
    if (app === prev) return;
    if (!app) closeSheet();
    else openSheet(app, pendingOrigin.current ?? originTileFor(app, pivot));
    pendingOrigin.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app]);

  // Keep the piles against the walls when the window changes size.
  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        syncGeometry();
        if (originKey.current) scatter(originKey.current, { instant: true });
      });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const appTitle = app ? t(`metro.apps.${app}`) : t('hero.title');
    document.title = `${t('hero.name')} — ${appTitle}`;
    document.documentElement.lang = lang;
  }, [app, lang, t]);

  const goApp = useCallback(
    (next: AppId, nextPivot?: string, origin?: string) => {
      pendingOrigin.current = origin ?? null;
      navigate(`/${lang}/${next}${nextPivot ? `/${nextPivot}` : ''}`, { state: { fromStart: true } });
    },
    [lang, navigate],
  );

  const goBack = useCallback(() => {
    if (searchOpen) return setSearchOpen(false);
    if (!app) return;
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if ((location.state as { fromStart?: boolean } | null)?.fromStart && idx > 0) navigate(-1);
    else navigate(`/${lang}`, { replace: true });
  }, [app, lang, location.state, navigate, searchOpen]);

  const goStart = () => {
    setSearchOpen(false);
    if (app) navigate(`/${lang}`);
    else startRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') goBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goBack]);

  const onActivate = (spec: TileSpec, el: HTMLAnchorElement, e: MouseEvent<HTMLAnchorElement>) => {
    if (spec.external || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (spec.action === 'theme') return toggleTheme();
    if (spec.action === 'lang') return setLanguage(lang === 'ru' ? 'en' : 'ru');
    if (!spec.app) return;
    if (spec.app === app) {
      if (spec.pivot && spec.pivot !== pivot) setPivot(spec.pivot);
      return;
    }
    goApp(spec.app, spec.pivot, spec.key);
  };

  const setPivot = (id: string) =>
    navigate(`/${lang}/${app}/${id}`, { replace: true, state: location.state });

  const onStartClick = (e: MouseEvent) => {
    // Clicking the empty space around the piles closes the app.
    if (app && !(e.target as HTMLElement).closest('.tile')) goBack();
  };

  const year = new Date().getFullYear();

  return (
    <div ref={rootRef} className={`metro mode-${mode}${sheetApp ? ' is-open' : ''}`}>
      <StatusBar lang={lang} />

      <main ref={startRef} className="start" onClick={onStartClick} aria-hidden={!!sheetApp && mode === 'away'}>
        <header className="start-head">
          <h1 className="start-name">{t('hero.name')}</h1>
          <p className="start-role">{t('hero.title')}</p>
        </header>
        <div className="grid-wrap">
          <div ref={gridRef} className="grid">
            {tiles.map((spec) => (
              <Tile key={spec.key} spec={spec} register={register} onActivate={onActivate} />
            ))}
          </div>
        </div>
        <footer className="start-foot">
          © {year} {t('hero.name')}
        </footer>
      </main>

      <div ref={bgRef} className="sheet-bg" aria-hidden />
      <div ref={splashRef} className="sheet-splash" aria-hidden>
        {splash}
      </div>
      <section
        ref={sheetRef}
        className={`sheet${phase ? ` sheet--${phase}` : ''}`}
        tabIndex={-1}
        aria-label={sheetApp ? t(`metro.apps.${sheetApp}`) : undefined}
        hidden={!sheetApp}
      >
        {sheetApp && (
          <div className="sheet-inner" key={sheetApp}>
            <AppView app={sheetApp} pivot={pivot} setPivot={setPivot} goApp={goApp} lang={lang} active={phase === 'open'} />
          </div>
        )}
      </section>

      <Search open={searchOpen} lang={lang} onClose={() => setSearchOpen(false)} goApp={goApp} />

      <NavBar
        onBack={goBack}
        onStart={goStart}
        onSearch={() => setSearchOpen((s) => !s)}
        canGoBack={!!app || searchOpen}
      />
    </div>
  );
};

export default Metro;
