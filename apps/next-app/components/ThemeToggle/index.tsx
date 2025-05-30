'use client';

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
    <button
      type="button"
      onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
      className="px-4 py-2 rounded bg-juiBackground-default text-juiText-primary border">
      현재 테마: {currentTheme} (클릭 시 전환)
    </button>
  );
}
