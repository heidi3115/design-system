'use client';
import { type DependencyList, useEffect, useRef } from 'react';

/**
 * useUpdateEffect는 컴포넌트가 처음 마운트될 때는 실행되지 않고,
 * 의존성 배열(deps)이 업데이트될 때만 callback 함수를 실행하는 커스텀 훅입니다.
 *
 * 기본적으로 useEffect는 컴포넌트가 처음 렌더링될 때와 의존성 배열이 변경될 때마다 실행됩니다.
 * 하지만 useUpdateEffect는 처음 마운트 시에는 실행을 건너뛰고, 이후 의존성 배열의 변경에만 반응합니다.
 *
 * @param callback - 의존성 배열이 변경될 때 실행할 함수
 * @param deps - 의존성을 나타내는 배열, 배열 내 값이 변경되면 callback이 호출됩니다
 */
export const useUpdateEffect = (callback: () => void, deps: DependencyList) => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      callback();
    } else {
      ref.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
};
