'use client';

import { useRef, useState } from 'react';

export function useTabIndicator<T extends HTMLElement>() {
  const listRef = useRef<T>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const updateIndicator = () => {
    if (!listRef.current) return;

    const buttons = Array.from(listRef.current.querySelectorAll('[role=tab]')) as HTMLElement[];
    const activeButton = buttons.find((btn) => btn.getAttribute('data-state') === 'active');

    if (activeButton) {
      setIndicatorStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
      });
    }
  };

  return { listRef, indicatorStyle, updateIndicator };
}
