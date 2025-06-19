'use client';

import { useRef } from 'react';

import { useEvent } from './useEvent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <Callback extends (...args: any[]) => void>(
  callback: Callback,
  /**
   * debounce의 callback이 호출되는 주기를 설정한다.
   * 값이 없거나 null일 경우 debounce 동작을 disable 하고 callback을 즉시 실행한다.
   */
  delay?: number | null,
) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const debounceCallback = useEvent(callback);

  const dispatchDebounce = useEvent((...args: Parameters<Callback>) => {
    // cleanup
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (!delay) {
      debounceCallback(...args);
    } else {
      timer.current = setTimeout(() => {
        debounceCallback(...args);
      }, delay ?? 0);
    }
  });

  return dispatchDebounce;
};
