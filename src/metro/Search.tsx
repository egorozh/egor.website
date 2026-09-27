import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { APP_IDS, AppId, Article, ResumeJob, ResumeProject, SKILL_GROUPS, STACK, slug, useContent } from './content';
import { SearchGlyph } from './glyphs';

interface Result {
  group: string;
  title: string;
  sub?: string;
  app?: AppId;
  pivot?: string;
  href?: string;
}

interface Props {
  open: boolean;
  lang: string;
  onClose: () => void;
  goApp: (app: AppId, pivot?: string) => void;
}

/** The search button opens a quick finder over every app, project, job, skill and article. */
export const Search = ({ open, onClose, goApp }: Props) => {
  const { t, list } = useContent();
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ('');
      window.setTimeout(() => input.current?.focus(), 60);
    }
  }, [open]);

  const index = useMemo<Result[]>(() => {
    const apps = APP_IDS.map((id) => ({ group: t('metro.search.apps'), title: t(`metro.apps.${id}`), app: id }));
    const projects = list<ResumeProject>('resume.projects.items').map((p) => ({
      group: t('metro.search.projects'),
      title: p.name,
      sub: p.technologies,
      app: 'projects' as AppId,
      pivot: slug(p.name),
    }));
    const jobs = list<ResumeJob>('resume.experience.items').map((j) => ({
      group: t('metro.search.experience'),
      title: j.company,
      sub: `${j.title} · ${j.period}`,
      app: 'experience' as AppId,
      pivot: slug(j.company),
    }));
    const skills = [
      ...STACK.flatMap((g) => g.items.map((s) => ({ title: s, pivot: 'stack' }))),
      ...SKILL_GROUPS.flatMap((g) => list<string>(`resume.skills.categories.${g}`).map((s) => ({ title: s, pivot: g }))),
    ].map((s) => ({ group: t('metro.search.skills'), app: 'skills' as AppId, ...s }));
    const articles = list<Article>('resume.articles.items').map((a) => ({
      group: t('metro.search.articles'),
      title: a.title,
      sub: a.year,
      href: a.link,
    }));
    return [...apps, ...projects, ...jobs, ...skills, ...articles];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return index.filter((r) => r.group === t('metro.search.apps'));
    return index.filter((r) => `${r.title} ${r.sub ?? ''}`.toLowerCase().includes(needle)).slice(0, 30);
  }, [q, index, t]);

  const pick = (r: Result) => {
    onClose();
    if (r.href) window.open(r.href, '_blank', 'noopener');
    else if (r.app) goApp(r.app, r.pivot);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (results[0]) pick(results[0]);
  };

  if (!open) return null;

  const groups = results.reduce<Record<string, Result[]>>((acc, r) => {
    (acc[r.group] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="search" role="dialog" aria-label={t('metro.ui.search')}>
      <form className="search-box" onSubmit={submit}>
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('metro.search.placeholder')}
          aria-label={t('metro.ui.search')}
          enterKeyHint="search"
        />
        <button type="submit" aria-label={t('metro.ui.search')}>
          <SearchGlyph width={22} height={22} />
        </button>
      </form>
      <div className="search-results">
        {Object.entries(groups).map(([group, items]) => (
          <section key={group}>
            <h2 className="section-title">{group}</h2>
            {items.map((r) => (
              <button key={group + r.title + (r.pivot ?? '')} type="button" className="item item--link" onClick={() => pick(r)}>
                {r.sub && <span className="item-sub">{r.sub}</span>}
                <span className="item-title">{r.title}</span>
              </button>
            ))}
          </section>
        ))}
        {!results.length && <p className="hint">{t('metro.search.nothing')}</p>}
      </div>
    </div>
  );
};
