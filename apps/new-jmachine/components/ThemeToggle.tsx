'use client';

import { useEffect, useState } from 'react';

import { Tooltip } from '@common/ui';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon, SunMoonIcon } from '@common/ui/icons';

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
      <div className="cursor-pointer p-2 rounded-full hover:bg-juiPrimary/50">
        {currentTheme === 'dark' ? (
          <SunIcon onClick={() => setTheme('light')} />
        ) : (
          <MoonIcon onClick={() => setTheme('dark')} />
        )}
      </div>
    </Tooltip>
  );
}
