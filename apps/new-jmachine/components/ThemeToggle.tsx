'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';

import { Tooltip } from '@common/ui';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <SunMoonIcon />;

  const currentTheme = theme === 'system' ? 'light' : theme;

  return (
    <Tooltip contents={theme === 'dark' ? 'Light' : 'Dark'}>
      <div className="cursor-pointer hover:text-juiText-secondary">
        {currentTheme === 'dark' ? (
          <SunIcon onClick={() => setTheme('light')} />
        ) : (
          <MoonIcon onClick={() => setTheme('dark')} />
        )}
      </div>
    </Tooltip>
  );
}
