import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

/** A tiny start screen: one medium tile, two small ones and a wide one. */
export const StartGlyph = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <rect x="3" y="3" width="12.2" height="12.2" />
    <rect x="16.6" y="3" width="5.4" height="5.4" />
    <rect x="16.6" y="9.8" width="5.4" height="5.4" />
    <rect x="3" y="16.6" width="19" height="5.4" />
  </svg>
);

export const BackGlyph = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden {...p}>
    <path d="M20 12H4.5M10.5 5.5 4 12l6.5 6.5" strokeLinecap="square" />
  </svg>
);

export const SearchGlyph = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden {...p}>
    <circle cx="14" cy="10" r="6" />
    <path d="M9.6 14.4 3.5 20.5" strokeLinecap="square" />
  </svg>
);

export const SignalGlyph = (p: P) => (
  <svg viewBox="0 0 18 12" fill="currentColor" aria-hidden {...p}>
    <rect x="0" y="9" width="3" height="3" />
    <rect x="5" y="6" width="3" height="6" />
    <rect x="10" y="3" width="3" height="9" />
    <rect x="15" y="0" width="3" height="12" opacity=".35" />
  </svg>
);

export const BatteryGlyph = (p: P) => (
  <svg viewBox="0 0 26 12" fill="none" aria-hidden {...p}>
    <rect x=".75" y=".75" width="21.5" height="10.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="23" y="3.5" width="2.5" height="5" fill="currentColor" />
    <rect x="3" y="3" width="13" height="6" fill="currentColor" />
  </svg>
);

/** Tiny stacked blocks used as the icon of the game. */
export const BlocksGlyph = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <rect x="3" y="14" width="5.5" height="5.5" />
    <rect x="9.25" y="14" width="5.5" height="5.5" />
    <rect x="9.25" y="7.75" width="5.5" height="5.5" />
    <rect x="15.5" y="14" width="5.5" height="5.5" />
    <rect x="15.5" y="1.5" width="5.5" height="5.5" opacity=".5" />
  </svg>
);

export const ArrowOut = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" strokeLinecap="square" />
  </svg>
);
