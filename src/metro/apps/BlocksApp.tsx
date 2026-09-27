import { useEffect, useRef, useState, PointerEvent as ReactPointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { Page } from '../kit';
import type { AppProps } from './index';

const COLS = 10;
const ROWS = 20;

type Matrix = number[][];
type Kind = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

// Pieces are painted in Windows Phone accent colours.
const PIECES: Record<Kind, { m: Matrix; color: string }> = {
  I: { m: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: '#1BA1E2' },
  O: { m: [[1, 1], [1, 1]], color: '#E3C800' },
  T: { m: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: '#AA00FF' },
  S: { m: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: '#60A917' },
  Z: { m: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: '#E51400' },
  J: { m: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], color: '#0050EF' },
  L: { m: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: '#FA6800' },
};
const KINDS = Object.keys(PIECES) as Kind[];
const LINE_SCORES = [0, 100, 300, 500, 800];

interface Piece {
  kind: Kind;
  m: Matrix;
  x: number;
  y: number;
}

interface Game {
  board: (string | null)[][];
  piece: Piece;
  next: Kind;
  bag: Kind[];
  score: number;
  lines: number;
  level: number;
  over: boolean;
  paused: boolean;
  acc: number;
  flash: { rows: number[]; until: number } | null;
}

const rotate = (m: Matrix): Matrix => m[0].map((_, c) => m.map((row) => row[c]).reverse());

const readBest = () => {
  try {
    return Number(window.localStorage.getItem('blocks-best') || 0);
  } catch {
    return 0;
  }
};

const saveBest = (v: number) => {
  try {
    window.localStorage.setItem('blocks-best', String(v));
  } catch {
    /* ignore */
  }
};

const draw = (bag: Kind[]): Kind => {
  if (!bag.length) bag.push(...[...KINDS].sort(() => Math.random() - 0.5));
  return bag.pop()!;
};

const spawn = (kind: Kind): Piece => {
  const m = PIECES[kind].m;
  return { kind, m, x: Math.floor((COLS - m.length) / 2), y: kind === 'I' ? -1 : 0 };
};

const collides = (board: Game['board'], p: Piece, dx = 0, dy = 0, m = p.m) =>
  m.some((row, r) =>
    row.some((v, c) => {
      if (!v) return false;
      const x = p.x + c + dx;
      const y = p.y + r + dy;
      return x < 0 || x >= COLS || y >= ROWS || (y >= 0 && !!board[y][x]);
    }),
  );

const newGame = (): Game => {
  const bag: Kind[] = [];
  const first = draw(bag);
  return {
    board: Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
    piece: spawn(first),
    next: draw(bag),
    bag,
    score: 0,
    lines: 0,
    level: 1,
    over: false,
    paused: false,
    acc: 0,
    flash: null,
  };
};

export const BlocksApp = ({ active }: AppProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const canvas = useRef<HTMLCanvasElement>(null);
  const nextCanvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const game = useRef<Game>(newGame());
  const [hud, setHud] = useState({ score: 0, lines: 0, level: 1, over: false, paused: false, best: readBest() });
  const [cell, setCell] = useState(24);

  const sync = () => {
    const g = game.current;
    setHud((h) => {
      const best = Math.max(h.best, g.score);
      if (best > h.best) saveBest(best);
      return { score: g.score, lines: g.lines, level: g.level, over: g.over, paused: g.paused, best };
    });
  };

  const lock = () => {
    const g = game.current;
    g.piece.m.forEach((row, r) =>
      row.forEach((v, c) => {
        const y = g.piece.y + r;
        if (v && y >= 0) g.board[y][g.piece.x + c] = PIECES[g.piece.kind].color;
      }),
    );
    if (g.piece.y < 0 && g.piece.m.some((row, r) => row.some((v) => v && g.piece.y + r < 0))) {
      g.over = true;
      return sync();
    }
    const full = g.board.map((row, i) => (row.every(Boolean) ? i : -1)).filter((i) => i >= 0);
    if (full.length) {
      g.flash = { rows: full, until: performance.now() + 140 };
      g.board = g.board.filter((_, i) => !full.includes(i));
      while (g.board.length < ROWS) g.board.unshift(Array(COLS).fill(null));
      g.lines += full.length;
      g.score += LINE_SCORES[full.length] * g.level;
      g.level = Math.floor(g.lines / 10) + 1;
    }
    g.piece = spawn(g.next);
    g.next = draw(g.bag);
    if (collides(g.board, g.piece)) g.over = true;
    sync();
  };

  const move = (dx: number) => {
    const g = game.current;
    if (g.over || g.paused) return;
    if (!collides(g.board, g.piece, dx, 0)) g.piece.x += dx;
  };

  const turn = () => {
    const g = game.current;
    if (g.over || g.paused) return;
    const m = rotate(g.piece.m);
    for (const kick of [0, -1, 1, -2, 2]) {
      if (!collides(g.board, g.piece, kick, 0, m)) {
        g.piece.m = m;
        g.piece.x += kick;
        return;
      }
    }
  };

  const soft = () => {
    const g = game.current;
    if (g.over || g.paused) return;
    if (!collides(g.board, g.piece, 0, 1)) {
      g.piece.y += 1;
      g.score += 1;
      g.acc = 0;
    } else lock();
  };

  const hard = () => {
    const g = game.current;
    if (g.over || g.paused) return;
    while (!collides(g.board, g.piece, 0, 1)) {
      g.piece.y += 1;
      g.score += 2;
    }
    lock();
  };

  const togglePause = () => {
    const g = game.current;
    if (g.over) return;
    g.paused = !g.paused;
    sync();
  };

  const restart = () => {
    game.current = newGame();
    sync();
  };

  // Board size follows the available space.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const byHeight = (window.innerHeight - 330) / ROWS;
      const byWidth = (el.clientWidth - 110) / COLS;
      setCell(Math.max(14, Math.min(30, Math.floor(Math.min(byHeight, byWidth)))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Game loop.
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let last = performance.now();
    const ctx = canvas.current?.getContext('2d');
    const nctx = nextCanvas.current?.getContext('2d');
    if (!ctx || !nctx) return;
    const dpr = window.devicePixelRatio || 1;
    const styles = getComputedStyle(canvas.current!);
    const bg = styles.getPropertyValue('--bg').trim() || '#000';
    const line = styles.getPropertyValue('--line').trim() || 'rgba(255,255,255,.12)';

    const block = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, ghost = false) => {
      if (ghost) {
        c.strokeStyle = color;
        c.globalAlpha = 0.55;
        c.lineWidth = 1.5;
        c.strokeRect(x * size + 2, y * size + 2, size - 4, size - 4);
        c.globalAlpha = 1;
        return;
      }
      c.fillStyle = color;
      c.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
    };

    const render = (now: number) => {
      const g = game.current;
      const w = COLS * cell;
      const h = ROWS * cell;
      const cv = canvas.current!;
      if (cv.width !== w * dpr) {
        cv.width = w * dpr;
        cv.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 1; x < COLS; x++) {
        ctx.moveTo(x * cell + 0.5, 0);
        ctx.lineTo(x * cell + 0.5, h);
      }
      for (let y = 1; y < ROWS; y++) {
        ctx.moveTo(0, y * cell + 0.5);
        ctx.lineTo(w, y * cell + 0.5);
      }
      ctx.globalAlpha = 0.35;
      ctx.stroke();
      ctx.globalAlpha = 1;

      g.board.forEach((row, y) => row.forEach((c, x) => c && block(ctx, x, y, cell, c)));

      if (!g.over) {
        let gy = 0;
        while (!collides(g.board, g.piece, 0, gy + 1)) gy++;
        const color = PIECES[g.piece.kind].color;
        g.piece.m.forEach((row, r) =>
          row.forEach((v, c) => {
            if (!v) return;
            if (g.piece.y + r + gy >= 0) block(ctx, g.piece.x + c, g.piece.y + r + gy, cell, color, true);
            if (g.piece.y + r >= 0) block(ctx, g.piece.x + c, g.piece.y + r, cell, color);
          }),
        );
      }

      if (g.flash && now < g.flash.until) {
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.fillRect(0, 0, w, h);
      }

      const nc = nextCanvas.current!;
      const ns = 14;
      if (nc.width !== 4 * ns * dpr) {
        nc.width = 4 * ns * dpr;
        nc.height = 4 * ns * dpr;
      }
      nctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nctx.clearRect(0, 0, 4 * ns, 4 * ns);
      const nm = PIECES[g.next].m;
      const off = (4 - nm.length) / 2;
      nm.forEach((row, r) => row.forEach((v, c) => v && block(nctx, c + off, r + off, ns, PIECES[g.next].color)));
    };

    const loop = (now: number) => {
      const g = game.current;
      const dt = Math.min(100, now - last);
      last = now;
      if (!g.over && !g.paused && !document.hidden) {
        g.acc += dt;
        const interval = Math.max(90, 820 - (g.level - 1) * 72);
        if (g.acc >= interval) {
          g.acc = 0;
          if (!collides(g.board, g.piece, 0, 1)) g.piece.y += 1;
          else lock();
        }
      }
      render(now);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, cell, theme]);

  // Keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, () => void> = {
        ArrowLeft: () => move(-1),
        ArrowRight: () => move(1),
        ArrowUp: turn,
        ArrowDown: soft,
        ' ': hard,
        p: togglePause,
        P: togglePause,
      };
      const fn = map[e.key];
      if (!fn) return;
      e.preventDefault();
      e.stopPropagation();
      fn();
      if (e.key === 'ArrowDown' || e.key === ' ') sync();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Touch buttons repeat while held, like a real d-pad.
  const holdTimer = useRef<number>();
  const hold = (fn: () => void, repeat = true) => (e: ReactPointerEvent) => {
    e.preventDefault();
    fn();
    sync();
    if (!repeat) return;
    window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(function tick() {
      fn();
      holdTimer.current = window.setTimeout(tick, 55);
    }, 180);
  };
  const release = () => window.clearTimeout(holdTimer.current);
  useEffect(() => release, []);

  const pad = (label: string, glyph: string, fn: () => void, repeat = true) => (
    <button
      type="button"
      aria-label={label}
      onPointerDown={hold(fn, repeat)}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      onContextMenu={(e) => e.preventDefault()}
    >
      {glyph}
    </button>
  );

  return (
    <Page title={t('metro.apps.blocks')}>
      <div className="blocks" ref={wrap}>
        <div className="blocks-board" style={{ width: COLS * cell, height: ROWS * cell }}>
          <canvas ref={canvas} style={{ width: COLS * cell, height: ROWS * cell }} />
          {(hud.over || hud.paused) && (
            <div className="blocks-overlay">
              <div className="blocks-overlay-title">{hud.over ? t('metro.blocks.over') : t('metro.blocks.paused')}</div>
              <button type="button" className="m-btn" onClick={hud.over ? restart : togglePause}>
                {hud.over ? t('metro.blocks.again') : t('metro.blocks.resume')}
              </button>
            </div>
          )}
        </div>
        <div className="blocks-side">
          <div className="blocks-stat">
            <span>{t('metro.blocks.next')}</span>
            <canvas ref={nextCanvas} style={{ width: 56, height: 56 }} />
          </div>
          <div className="blocks-stat">
            <span>{t('metro.blocks.score')}</span>
            <b>{hud.score}</b>
          </div>
          <div className="blocks-stat">
            <span>{t('metro.blocks.lines')}</span>
            <b>{hud.lines}</b>
          </div>
          <div className="blocks-stat">
            <span>{t('metro.blocks.level')}</span>
            <b>{hud.level}</b>
          </div>
          <div className="blocks-stat">
            <span>{t('metro.blocks.best')}</span>
            <b>{hud.best}</b>
          </div>
          <button type="button" className="m-btn m-btn--small" onClick={togglePause} disabled={hud.over}>
            {hud.paused ? '▶' : '❚❚'}
          </button>
        </div>
      </div>
      <div className="blocks-pad">
        {pad(t('metro.blocks.left'), '◀', () => move(-1))}
        {pad(t('metro.blocks.rotate'), '↻', turn, false)}
        {pad(t('metro.blocks.right'), '▶', () => move(1))}
        {pad(t('metro.blocks.down'), '▼', soft)}
        {pad(t('metro.blocks.drop'), '⤓', hard, false)}
      </div>
      <p className="hint">{t('metro.blocks.hint')}</p>
    </Page>
  );
};
