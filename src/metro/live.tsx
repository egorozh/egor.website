import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A counter that ticks at random intervals, like Windows Phone live tiles
 * which never flip in sync. Stops when live tiles are switched off.
 */
export function useLiveTick(min = 4200, max = 9000, offset = 0) {
  const { liveTiles } = useTheme();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!liveTiles || prefersReducedMotion()) {
      setTick(0);
      return;
    }
    let timer: number;
    const schedule = (first: boolean) => {
      const wait = min + Math.random() * (max - min) + (first ? offset : 0);
      timer = window.setTimeout(() => {
        if (!document.hidden) setTick((t) => t + 1);
        schedule(false);
      }, wait);
    };
    schedule(true);
    return () => window.clearTimeout(timer);
  }, [liveTiles, min, max, offset]);

  return tick;
}

/** Flips around the horizontal axis between two faces. */
export const Flip = ({ front, back, offset }: { front: ReactNode; back: ReactNode; offset?: number }) => {
  const tick = useLiveTick(5000, 10000, offset);
  return (
    <div className={'live-flip' + (tick % 2 ? ' is-on' : '')}>
      <div className="live-flip-inner">
        <div className="live-face">{front}</div>
        <div className="live-face live-face--back">{back}</div>
      </div>
    </div>
  );
};

/** Slides the tile content up to peek at a second face, then back. */
export const Peek = ({ front, back, offset }: { front: ReactNode; back: ReactNode; offset?: number }) => {
  const tick = useLiveTick(4500, 8500, offset);
  return (
    <div className={'live-peek' + (tick % 2 ? ' is-on' : '')}>
      <div className="live-peek-inner">
        <div className="live-face">{front}</div>
        <div className="live-face">{back}</div>
      </div>
    </div>
  );
};

/** Cycles through items, each one pushing the previous one up. */
export function Cycle<T>({
  items,
  render,
  offset,
  min = 2600,
  max = 4200,
}: {
  items: T[];
  render: (item: T) => ReactNode;
  offset?: number;
  min?: number;
  max?: number;
}) {
  const tick = useLiveTick(min, max, offset);
  const [state, setState] = useState({ cur: 0, prev: -1 });

  useEffect(() => {
    if (!items.length) return;
    setState((s) => ({ prev: tick === 0 ? -1 : s.cur, cur: tick % items.length }));
  }, [tick, items.length]);

  if (!items.length) return null;
  return (
    <div className="live-cycle">
      {state.prev >= 0 && state.prev !== state.cur && (
        <div key={'out' + tick} className="live-cycle-item is-out">
          {render(items[state.prev])}
        </div>
      )}
      <div key={'in' + tick} className={'live-cycle-item' + (tick ? ' is-in' : '')}>
        {render(items[state.cur])}
      </div>
    </div>
  );
}
