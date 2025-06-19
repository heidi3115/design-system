'use client';

import { useLayoutEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

function getRect<T extends HTMLElement>(element?: T): DOMRect {
  if (typeof window === 'undefined' || typeof DOMRect === 'undefined') {
    // SSR 또는 DOMRect 미지원 환경에서는 기본값 반환
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON: () => ({}),
    } as DOMRect;
  }

  let rect: DOMRect = new DOMRect(0, 0, 0, 0);
  if (element) rect = element.getBoundingClientRect();

  return rect;
}

export function useRect<T extends HTMLElement>(ref: React.RefObject<T | null>, debounceDelay?: number): DOMRect {
  const [rect, setRect] = useState<DOMRect>(ref && ref.current ? getRect(ref.current) : getRect());

  const handleResize = useDebounce(() => {
    if (!ref.current) return;
    setRect(getRect(ref.current)); // Update client rect
  }, debounceDelay ?? 0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    if (!element) return;

    handleResize();

    if (typeof ResizeObserver === 'function') {
      let resizeObserver: ResizeObserver | null = new ResizeObserver(handleResize);

      resizeObserver.observe(element);

      return () => {
        if (!resizeObserver) return;

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    }

    window.addEventListener('resize', handleResize); // Browser support, remove freely

    return () => window.removeEventListener('resize', handleResize);
  }, [debounceDelay, handleResize, ref]);

  return rect;
}
