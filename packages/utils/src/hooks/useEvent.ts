'use client';

import { useLayoutEffect, useRef } from 'react';

/**
 * 현재 RFC로 등록되어있는 `useEvent`의 임시 구현체 입니다.
 * 향후 react에서 해당 hook이 지원되면 대체할 수 있습니다.
 *
 * `useEvent` custom hook은 `useCallback`을 대체하지 않습니다.
 * `useEvent`는 Event Handler에서의 사용을 권장합니다.
 *
 * @see {@link https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md}
 * @see {@link https://yceffort.kr/2022/05/useEvent}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEvent = <Event extends (...args: any[]) => any>(handler: Event): Event => {
  const handlerRef = useRef<Event>(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  const stableRef = useRef<Event>(null);

  if (!stableRef.current) {
    stableRef.current = ((...args: Parameters<Event>) => {
      return handlerRef.current?.(...args);
    }) as Event;
  }

  return stableRef.current;
};
