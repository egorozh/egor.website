// The twenty accent colours of Windows Phone 8.
export const ACCENTS = [
  { id: 'lime', hex: '#A4C400' },
  { id: 'green', hex: '#60A917' },
  { id: 'emerald', hex: '#008A00' },
  { id: 'teal', hex: '#00ABA9' },
  { id: 'cyan', hex: '#1BA1E2' },
  { id: 'cobalt', hex: '#0050EF' },
  { id: 'indigo', hex: '#6A00FF' },
  { id: 'violet', hex: '#AA00FF' },
  { id: 'pink', hex: '#F472D0' },
  { id: 'magenta', hex: '#D80073' },
  { id: 'crimson', hex: '#A20025' },
  { id: 'red', hex: '#E51400' },
  { id: 'orange', hex: '#FA6800' },
  { id: 'amber', hex: '#F0A30A' },
  { id: 'yellow', hex: '#E3C800' },
  { id: 'brown', hex: '#825A2C' },
  { id: 'olive', hex: '#6D8764' },
  { id: 'steel', hex: '#647687' },
  { id: 'mauve', hex: '#76608A' },
  { id: 'taupe', hex: '#87794E' },
] as const;

export type AccentId = (typeof ACCENTS)[number]['id'];

export const DEFAULT_ACCENT: AccentId = 'cobalt';

export const accentHex = (id: string) => ACCENTS.find((a) => a.id === id)?.hex ?? '#0050EF';

export const isAccent = (id: string | null): id is AccentId => !!id && ACCENTS.some((a) => a.id === id);
