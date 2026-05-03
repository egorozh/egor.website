import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="h-9 w-9 px-0 rounded-full hover:bg-accent/15"
    >
      <Sun className={`h-[18px] w-[18px] transition-all ${isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
      <Moon className={`absolute h-[18px] w-[18px] transition-all ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
    </Button>
  );
};

export default ThemeToggle;
