import { useState } from 'react';
import { Copy, Github, Linkedin, Mail, Play, Printer } from 'lucide-react';
import {
  AppId,
  Article,
  EMAIL,
  Education,
  GITHUB,
  LINKEDIN,
  AVATAR,
  ResumeJob,
  ResumeProject,
  SKILL_GROUPS,
  STACK,
  TimelineItem,
  VIDEO_ID,
  slug,
  useContent,
  yearsInCode,
} from '../content';
import { AppBar, Bullets, Button, Chips, Item, Page, Pivot, PivotItem, Section } from '../kit';
import { ArrowOut } from '../glyphs';
import { SettingsApp } from './SettingsApp';
import { BlocksApp } from './BlocksApp';
import { ResumePrint } from './ResumePrint';

export interface AppProps {
  pivot?: string;
  setPivot: (id: string) => void;
  goApp: (app: AppId, pivot?: string) => void;
  lang: string;
  /** False while the app is still unfolding; heavy content can wait for it. */
  active: boolean;
}

export const AppView = ({ app, ...props }: AppProps & { app: AppId }) => {
  switch (app) {
    case 'about':
      return <AboutApp {...props} />;
    case 'experience':
      return <ExperienceApp {...props} />;
    case 'skills':
      return <SkillsApp {...props} />;
    case 'projects':
      return <ProjectsApp {...props} />;
    case 'contact':
      return <ContactApp />;
    case 'videos':
      return <VideosApp {...props} />;
    case 'articles':
      return <ArticlesApp />;
    case 'resume':
      return <ResumeApp {...props} />;
    case 'settings':
      return <SettingsApp {...props} />;
    case 'blocks':
      return <BlocksApp {...props} />;
  }
};

const AboutApp = ({ goApp }: AppProps) => {
  const { t, list } = useContent();
  const cards = list<{ title: string; description: string }>('about.cards');
  return (
    <Page title={t('metro.apps.about')}>
      <div className="about-card">
        <img src={AVATAR} alt={t('hero.name')} />
        <div>
          <div className="about-name">{t('hero.name')}</div>
          <div className="about-role">{t('hero.title')}</div>
        </div>
      </div>
      <p className="lead">{t('hero.description')}</p>
      <p className="body">{t('about.description')}</p>
      <div className="quote">{t('about.highlight')}</div>
      <Section title={t('metro.about.strengths')}>
        {cards.map((c) => (
          <Item key={c.title} title={c.title}>
            {c.description}
          </Item>
        ))}
      </Section>
      <div className="actions">
        <Button onClick={() => goApp('contact')}>{t('hero.cta')}</Button>
        <Button onClick={() => goApp('resume')}>{t('metro.tiles.resume')}</Button>
      </div>
    </Page>
  );
};

export const JobDetail = ({ job }: { job: ResumeJob }) => (
  <div className="job">
    <div className="job-period">{job.period}</div>
    <div className="job-title">{job.title}</div>
    <div className="job-company">
      {job.company} · {job.location}
    </div>
    {job.description && <p className="body">{job.description}</p>}
    {job.projects.map((p) => (
      <div className="job-project" key={p.name}>
        <h3>{p.name}</h3>
        <Bullets items={p.responsibilities} />
      </div>
    ))}
  </div>
);

const ExperienceApp = ({ pivot, setPivot }: AppProps) => {
  const { t, list } = useContent();
  const timeline = list<TimelineItem>('experience.timeline');
  const jobs = list<ResumeJob>('resume.experience.items');
  const items: PivotItem[] = [
    {
      id: 'timeline',
      header: t('metro.pivots.timeline'),
      render: () => (
        <>
          <div className="years-banner">
            <span>{yearsInCode()}</span>
            {t('metro.tile.yearsInCode', { count: yearsInCode() })}
          </div>
          <ol className="timeline">
            {timeline.map((e) => (
              <li key={e.period + e.company}>
                <Item sub={e.period} title={e.title}>
                  <b>{e.company}</b> — {e.description}
                </Item>
              </li>
            ))}
          </ol>
        </>
      ),
    },
    ...jobs.map((job) => ({
      id: slug(job.company),
      header: job.company.toLowerCase(),
      render: () => <JobDetail job={job} />,
    })),
  ];
  return <Pivot items={items} active={pivot} onChange={setPivot} />;
};

const SkillGroups = () => {
  const { t, list } = useContent();
  return (
    <>
      {SKILL_GROUPS.map((g) => (
        <Section key={g} title={t(`resume.skills.${g}`)}>
          <Bullets items={list<string>(`resume.skills.categories.${g}`)} />
        </Section>
      ))}
    </>
  );
};

const SkillsApp = ({ pivot, setPivot }: AppProps) => {
  const { t, list } = useContent();
  const items: PivotItem[] = [
    {
      id: 'stack',
      header: t('metro.pivots.stack'),
      render: () => (
        <div className="stack">
          {STACK.map((g) => (
            <Section key={g.key} title={t(`skills.categories.${g.key}`)}>
              <div className="stack-words">
                {g.items.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </Section>
          ))}
        </div>
      ),
    },
    ...SKILL_GROUPS.map((g) => ({
      id: g,
      header: t(`metro.pivots.${g}`),
      render: () => <Bullets items={list<string>(`resume.skills.categories.${g}`)} />,
    })),
  ];
  return <Pivot items={items} active={pivot} onChange={setPivot} />;
};

const ProjectsApp = ({ pivot, setPivot }: AppProps) => {
  const { t, list } = useContent();
  const projects = list<ResumeProject>('resume.projects.items');
  const extra: Record<string, string> = {
    ovdix: t('projects.ovdix.description'),
    plumix: t('projects.plumix.description'),
  };
  const items: PivotItem[] = projects.map((p) => ({
    id: slug(p.name),
    header: p.name.toLowerCase(),
    render: () => (
      <div className="project">
        <div className="project-mark" aria-hidden>
          {p.name.slice(0, 1)}
        </div>
        <p className="lead">{p.description}</p>
        {extra[slug(p.name)] && <p className="body">{extra[slug(p.name)]}</p>}
        <Section title={t('metro.projects.stack')}>
          <Chips items={p.technologies.split(',').map((s) => s.trim())} />
        </Section>
        <div className="actions">
          <Button href={p.link}>
            {p.link.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ArrowOut width={16} height={16} />
          </Button>
        </div>
      </div>
    ),
  }));
  return <Pivot items={items} active={pivot} onChange={setPivot} />;
};

const ContactApp = () => {
  const { t } = useContent();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <>
      <Page title={t('metro.apps.contact')}>
        <p className="lead">{t('contact.description')}</p>
        <div className="list">
          <Item href={`mailto:${EMAIL}`} sub={t('metro.contact.write')} title={EMAIL} />
          <Item href={GITHUB} sub="GitHub" title="github.com/egorozh" />
          <Item href={LINKEDIN} sub="LinkedIn" title="linkedin.com/in/egorozh" />
        </div>
      </Page>
      <AppBar
        actions={[
          { label: t('metro.contact.mail'), icon: <Mail strokeWidth={1.4} />, href: `mailto:${EMAIL}` },
          { label: copied ? t('metro.contact.copied') : t('metro.contact.copy'), icon: <Copy strokeWidth={1.4} />, onClick: copy },
          { label: 'GitHub', icon: <Github strokeWidth={1.4} />, href: GITHUB },
          { label: 'LinkedIn', icon: <Linkedin strokeWidth={1.4} />, href: LINKEDIN },
        ]}
      />
    </>
  );
};

const VideosApp = ({ active }: AppProps) => {
  const { t } = useContent();
  const url = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
  return (
    <>
      <Page title={t('metro.apps.videos')}>
        <p className="lead">{t('videos.description')}</p>
        <div className="video">
          {active && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
              title={t('videos.title')}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          )}
        </div>
      </Page>
      <AppBar actions={[{ label: t('metro.videos.open'), icon: <Play strokeWidth={1.4} />, href: url }]} />
    </>
  );
};

const ArticleList = () => {
  const { list } = useContent();
  return (
    <div className="list">
      {list<Article>('resume.articles.items').map((a) => (
        <Item key={a.link} href={a.link} sub={a.year} title={a.title} />
      ))}
    </div>
  );
};

const ArticlesApp = () => {
  const { t } = useContent();
  return (
    <Page title={t('metro.apps.articles')}>
      <ArticleList />
    </Page>
  );
};

const ResumeApp = ({ pivot, setPivot }: AppProps) => {
  const { t, list } = useContent();
  const jobs = list<ResumeJob>('resume.experience.items');
  const projects = list<ResumeProject>('resume.projects.items');
  const education = list<Education>('resume.education.items');
  const languages = list<{ language: string; level: string }>('resume.languages.items');

  const items: PivotItem[] = [
    {
      id: 'summary',
      header: t('metro.pivots.summary'),
      render: () => (
        <>
          <div className="resume-head">
            <div className="about-name">{t('hero.name')}</div>
            <div className="about-role">
              {t('resume.header.title')} · {t('resume.header.location')}
            </div>
          </div>
          <p className="lead">{t('resume.summary.content')}</p>
          <Section title={t('resume.education.title')}>
            {education.map((e) => (
              <Item key={e.university} sub={e.period} title={`${e.degree}, ${e.university}`}>
                {e.faculty}. {e.specialization}. {e.honors}
              </Item>
            ))}
          </Section>
          <Section title={t('resume.languages.title')}>
            {languages.map((l) => (
              <Item key={l.language} title={l.language} sub={l.level} />
            ))}
          </Section>
        </>
      ),
    },
    {
      id: 'experience',
      header: t('metro.pivots.experience'),
      render: () => (
        <>
          {jobs.map((j) => (
            <JobDetail key={j.company + j.period} job={j} />
          ))}
        </>
      ),
    },
    { id: 'skills', header: t('metro.pivots.skills'), render: () => <SkillGroups /> },
    {
      id: 'projects',
      header: t('metro.pivots.projects'),
      render: () => (
        <div className="list">
          {projects.map((p) => (
            <Item key={p.name} href={p.link} sub={p.technologies} title={p.name}>
              {p.description}
            </Item>
          ))}
        </div>
      ),
    },
    { id: 'articles', header: t('metro.pivots.articles'), render: () => <ArticleList /> },
  ];

  return (
    <>
      <Pivot items={items} active={pivot} onChange={setPivot} />
      <AppBar
        actions={[
          { label: t('metro.resume.print'), icon: <Printer strokeWidth={1.4} />, onClick: () => window.print() },
          { label: t('metro.contact.mail'), icon: <Mail strokeWidth={1.4} />, href: `mailto:${EMAIL}` },
        ]}
      />
      <ResumePrint />
    </>
  );
};
