'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRect } from '@common/utils';

export function useTabIndicator<T extends HTMLElement>() {
  const listRef = useRef<T>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const updateIndicator = useCallback(() => {
    if (!listRef.current) return;

    const activeTab = listRef.current.querySelector('[data-state="active"]') as HTMLElement | null;

    if (activeTab) {
      const { offsetLeft, offsetWidth } = activeTab;

      setIndicatorStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, []);

  const rect = useRect(listRef, 100);

  // rect가 바뀌면 자동으로 updateIndicator 호출
  useEffect(() => {
    updateIndicator();
  }, [rect, updateIndicator]);

  return { listRef, indicatorStyle, updateIndicator };
}
