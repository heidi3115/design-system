'use client';

import { Button } from '@common/ui';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? 'light' : theme;

  return (
    <Button variant="gradient" onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}>
      현재 테마: {currentTheme} (클릭 시 전환)
    </Button>
  );
}
