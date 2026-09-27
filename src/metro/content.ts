import { useTranslation } from 'react-i18next';

export type AppId =
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'videos'
  | 'articles'
  | 'resume'
  | 'settings'
  | 'blocks';

export const APP_IDS: AppId[] = [
  'about',
  'experience',
  'skills',
  'projects',
  'contact',
  'videos',
  'articles',
  'resume',
  'settings',
  'blocks',
];

export const isAppId = (v: string | undefined): v is AppId => !!v && (APP_IDS as string[]).includes(v);

export const CAREER_START = 2018;
export const EMAIL = 'egorozh.dev@gmail.com';
export const GITHUB = 'https://github.com/egorozh';
export const LINKEDIN = 'https://www.linkedin.com/in/egorozh/';
export const VIDEO_ID = '95l-KzxW9tM';
export const AVATAR = '/avatar.jpg';

export interface ResumeProject {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeJob {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  projects: { name: string; responsibilities: string[] }[];
}

export interface TimelineItem {
  period: string;
  title: string;
  company: string;
  description: string;
}

export interface Article {
  year: string;
  title: string;
  link: string;
}

export interface Education {
  degree: string;
  university: string;
  location: string;
  period: string;
  faculty: string;
  specialization: string;
  honors: string;
}

export const SKILL_GROUPS = ['architecture', 'development', 'integrations', 'testing', 'tools'] as const;

export const STACK: { key: string; items: string[] }[] = [
  { key: 'mobile', items: ['Flutter', 'iOS', 'Android', 'BLoC', 'Firebase', 'Supabase'] },
  { key: 'desktop', items: ['Avalonia', 'WPF', '.NET', 'MVVM'] },
  { key: 'languages', items: ['Dart', 'C#'] },
  { key: 'tools', items: ['Claude Code', 'Codex', 'Android Studio', 'Xcode', 'Rider', 'Git', 'Azure DevOps'] },
];

/** Stable, URL-friendly id for a project name ("Slang.NET" → "slang-net"). */
export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-|-$/g, '');

export function useContent() {
  const { t, i18n } = useTranslation();
  const list = <T,>(key: string): T[] => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? (v as T[]) : [];
  };
  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'en';
  return { t, list, lang };
}

export const yearsInCode = () => new Date().getFullYear() - CAREER_START;
