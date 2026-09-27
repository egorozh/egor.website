import { createPortal } from 'react-dom';
import { Article, EMAIL, Education, ResumeJob, ResumeProject, SKILL_GROUPS, useContent } from '../content';

/** Plain, ink-friendly copy of the resume that only exists on paper. */
export const ResumePrint = () => {
  const { t, list } = useContent();
  const jobs = list<ResumeJob>('resume.experience.items');
  const projects = list<ResumeProject>('resume.projects.items');
  const education = list<Education>('resume.education.items');
  const articles = list<Article>('resume.articles.items');
  const languages = list<{ language: string; level: string }>('resume.languages.items');

  return createPortal(
    <article className="print-only">
      <header>
        <h1>{t('hero.name')}</h1>
        <p className="p-role">
          {t('resume.header.title')} · {t('resume.header.location')}
        </p>
        <p className="p-contacts">
          {EMAIL} · github.com/egorozh · linkedin.com/in/egorozh
        </p>
      </header>

      <h2>{t('resume.summary.title')}</h2>
      <p>{t('resume.summary.content')}</p>

      <h2>{t('resume.skills.title')}</h2>
      {SKILL_GROUPS.map((g) => (
        <div key={g} className="p-block">
          <h3>{t(`resume.skills.${g}`)}</h3>
          <ul>
            {list<string>(`resume.skills.categories.${g}`).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>{t('resume.experience.title')}</h2>
      {jobs.map((j) => (
        <div key={j.company + j.period} className="p-block">
          <h3>
            {j.title} — {j.company}
          </h3>
          <p className="p-meta">
            {j.period} · {j.location}
          </p>
          {j.description && <p>{j.description}</p>}
          {j.projects.map((p) => (
            <div key={p.name}>
              <h4>{p.name}</h4>
              <ul>
                {p.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      <h2>{t('resume.projects.title')}</h2>
      {projects.map((p) => (
        <div key={p.name} className="p-block">
          <h3>
            {p.name} — {p.link.replace(/^https?:\/\//, '')}
          </h3>
          <p>{p.description}</p>
          <p className="p-meta">{p.technologies}</p>
        </div>
      ))}

      <h2>{t('resume.education.title')}</h2>
      {education.map((e) => (
        <div key={e.university} className="p-block">
          <h3>
            {e.degree}, {e.university}
          </h3>
          <p className="p-meta">
            {e.period} · {e.location}
          </p>
          <p>
            {e.faculty}. {e.specialization}. {e.honors}
          </p>
        </div>
      ))}

      <h2>{t('resume.articles.title')}</h2>
      <ul>
        {articles.map((a) => (
          <li key={a.link}>
            {a.year} — {a.title}
          </li>
        ))}
      </ul>

      <h2>{t('resume.languages.title')}</h2>
      <p>{languages.map((l) => `${l.language}: ${l.level}`).join(' · ')}</p>
    </article>,
    document.body,
  );
};
