import { CSSProperties, MouseEvent, PointerEvent, ReactNode, useRef } from 'react';
import type { AppId } from './content';

export type TileSize = 'small' | 'medium' | 'wide' | 'large';

export interface TileSpec {
  key: string;
  size: TileSize;
  label?: string;
  /** Background of the tile; defaults to the accent colour. */
  tone?: string;
  href: string;
  external?: boolean;
  app?: AppId;
  pivot?: string;
  action?: 'theme' | 'lang';
  /** Icon shown on the splash screen while the tile unfolds into its app. */
  splash?: ReactNode;
  content: ReactNode;
}

interface Props {
  spec: TileSpec;
  register: (key: string, el: HTMLAnchorElement | null) => void;
  onActivate: (spec: TileSpec, el: HTMLAnchorElement, e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * A start-screen tile. Pressing it tilts the tile towards the finger,
 * exactly like the Windows Phone "tilt effect".
 */
export const Tile = ({ spec, register, onActivate }: Props) => {
  const press = useRef<HTMLDivElement>(null);

  const tilt = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = press.current;
    if (!el || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    const strength = 11 * Math.min(1, 190 / Math.max(r.width, r.height));
    const centred = 1 - Math.max(Math.abs(nx), Math.abs(ny));
    el.style.setProperty('--rx', `${(-ny * strength).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(nx * strength).toFixed(2)}deg`);
    el.style.setProperty('--ps', (0.975 - centred * 0.03).toFixed(3));
    el.classList.add('is-pressed');
  };

  const release = () => {
    const el = press.current;
    if (!el) return;
    el.style.removeProperty('--rx');
    el.style.removeProperty('--ry');
    el.style.removeProperty('--ps');
    el.classList.remove('is-pressed');
  };

  return (
    <a
      ref={(el) => register(spec.key, el)}
      className={`tile tile--${spec.size}`}
      href={spec.href}
      target={spec.external ? '_blank' : undefined}
      rel={spec.external ? 'noopener noreferrer' : undefined}
      aria-label={spec.label}
      data-key={spec.key}
      onPointerDown={tilt}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      onClick={(e) => onActivate(spec, e.currentTarget, e)}
      draggable={false}
    >
      <div className="tile-boot">
        <div className="tile-press" ref={press}>
          <div className="tile-face" style={spec.tone ? ({ '--tile-bg': spec.tone } as CSSProperties) : undefined}>
            {spec.content}
            {spec.label && <span className="tile-label">{spec.label}</span>}
          </div>
        </div>
      </div>
    </a>
  );
};
