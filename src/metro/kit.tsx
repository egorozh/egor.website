import { ReactNode, useEffect, useRef, useState, PointerEvent as ReactPointerEvent } from 'react';
import { useTranslation } from 'react-i18next';

/** Small uppercase title every WP app carries above its content. */
export const AppTitle = () => {
  const { t } = useTranslation();
  return <div className="app-title">{t('hero.name')}</div>;
};

/** A single page app: huge lowercase title that bleeds off the edge. */
export const Page = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="page feather">
    <AppTitle />
    <h1 className="page-title">{title}</h1>
    {children}
  </div>
);

export interface PivotItem {
  id: string;
  header: string;
  render: () => ReactNode;
}

/**
 * Windows Phone pivot: the active header is always first, the rest trail
 * behind it and wrap around. Swipe, tap a header or use the arrow keys.
 */
export const Pivot = ({ items, active, onChange }: { items: PivotItem[]; active?: string; onChange: (id: string) => void }) => {
  const found = items.findIndex((i) => i.id === active);
  const idx = found < 0 ? 0 : found;
  const [dir, setDir] = useState<1 | -1>(1);
  const root = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const go = (step: number) => {
    const n = (idx + step + items.length) % items.length;
    setDir(step >= 0 ? 1 : -1);
    root.current?.closest('.sheet')?.scrollTo({ top: 0 });
    onChange(items[n].id);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const onDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse') swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: ReactPointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) go(dx < 0 ? 1 : -1);
  };

  const ordered = items.map((_, k) => (idx + k) % items.length);

  return (
    <div className="pivot feather" ref={root} onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (swipe.current = null)}>
      <AppTitle />
      <div className="pivot-heads" role="tablist" key={`h${idx}`} data-dir={dir}>
        {ordered.map((n, k) => (
          <button
            key={items[n].id}
            type="button"
            role="tab"
            aria-selected={k === 0}
            className={k === 0 ? 'is-on' : undefined}
            onClick={() => k && go(k)}
          >
            {items[n].header}
          </button>
        ))}
      </div>
      <div className="pivot-body" role="tabpanel" key={`b${idx}`} data-dir={dir}>
        {items[idx].render()}
      </div>
    </div>
  );
};

/** Classic WP list entry: big light title, accent subtitle, grey body. */
export const Item = ({
  title,
  sub,
  children,
  href,
  onClick,
}: {
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  href?: string;
  onClick?: () => void;
}) => {
  const inner = (
    <>
      {sub && <span className="item-sub">{sub}</span>}
      <span className="item-title">{title}</span>
      {children && <span className="item-body">{children}</span>}
    </>
  );
  if (href)
    return (
      <a className="item item--link" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  if (onClick)
    return (
      <button type="button" className="item item--link" onClick={onClick}>
        {inner}
      </button>
    );
  return <div className="item">{inner}</div>;
};

export const Section = ({ title, children }: { title?: string; children: ReactNode }) => (
  <section className="section">
    {title && <h2 className="section-title">{title}</h2>}
    {children}
  </section>
);

export const Bullets = ({ items }: { items: string[] }) => (
  <ul className="bullets">
    {items.map((s) => (
      <li key={s}>{s}</li>
    ))}
  </ul>
);

export const Chips = ({ items }: { items: string[] }) => (
  <ul className="chips">
    {items.map((s) => (
      <li key={s}>{s}</li>
    ))}
  </ul>
);

export const Button = ({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) =>
  href ? (
    <a className="m-btn" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <button type="button" className="m-btn" onClick={onClick}>
      {children}
    </button>
  );

export interface AppBarAction {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
}

/** Round icon buttons docked at the bottom; "…" reveals their labels. */
export const AppBar = ({ actions }: { actions: AppBarAction[] }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={'appbar' + (expanded ? ' is-expanded' : '')}>
      <div className="appbar-row">
        {actions.map((a) => {
          const body = (
            <>
              <span className="appbar-icon">{a.icon}</span>
              <span className="appbar-label">{a.label}</span>
            </>
          );
          return a.href ? (
            <a key={a.label} className="appbar-btn" href={a.href} target="_blank" rel="noopener noreferrer" aria-label={a.label}>
              {body}
            </a>
          ) : (
            <button key={a.label} type="button" className="appbar-btn" onClick={a.onClick} aria-label={a.label}>
              {body}
            </button>
          );
        })}
      </div>
      <button type="button" className="appbar-more" aria-label="…" onClick={() => setExpanded((v) => !v)}>
        <i />
        <i />
        <i />
      </button>
    </div>
  );
};

/** WP ListPicker: a box that unfolds in place into all of its options. */
export function ListPicker<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.id === value);
  return (
    <div className="picker">
      <div className="picker-label">{label}</div>
      <div className={'picker-box' + (open ? ' is-open' : '')}>
        {open ? (
          options.map((o, i) => (
            <button
              key={o.id}
              type="button"
              className={o.id === value ? 'is-on' : undefined}
              style={{ animationDelay: `${i * 30}ms` }}
              onClick={() => {
                onChange(o.id);
                setOpen(false);
              }}
            >
              {o.label}
            </button>
          ))
        ) : (
          <button type="button" onClick={() => setOpen(true)} aria-haspopup="listbox">
            {current?.label}
          </button>
        )}
      </div>
    </div>
  );
}

/** WP8 toggle switch: a rectangular track with a solid block for a thumb. */
export const Toggle = ({
  label,
  checked,
  onChange,
  onText,
  offText,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  onText: string;
  offText: string;
}) => (
  <div className="toggle">
    <div className="picker-label">{label}</div>
    <button type="button" role="switch" aria-checked={checked} aria-label={label} className="toggle-row" onClick={() => onChange(!checked)}>
      <span className="toggle-state">{checked ? onText : offText}</span>
      <span className={'toggle-track' + (checked ? ' is-on' : '')}>
        <span className="toggle-fill" />
        <span className="toggle-thumb" />
      </span>
    </button>
  </div>
);
