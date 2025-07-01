import { useCallback, useMemo, useState } from 'react';

/**
 * 렌더링 시 안정적인 고유 ID를 보장하기 위한 아이템 타입
 * @template T - 원본 데이터의 타입
 */
export type StableListItem<T> = {
  // id: 각 아이템의 고유하고 변하지 않는 ID
  id: string;
  // value: 아이템의 실제 값<원본 데이터의 타입>
  value: T;
};

// 간단한 고유 ID 생성기
export const generateUniqueId = () => `stable-item-${Math.random().toString(36).substring(2, 9)}`;

/**
 * 원시 값 배열을 받아 각 아이템에 안정적인 고유 ID를 부여하고, 이를 관리하기 위한 유틸리티 함수들을 제공하는 범용 커스텀 훅.
 * Slider 처럼 값의 배열의 순서가 바뀌어도 각 요소를 정확히 추적할 수 있게 해줍니다.
 *
 * @template T - 배열에 포함될 데이터의 타입 (e.g., number, string, object)
 * @param initialItems - ID를 부여할 초기 데이터 배열
 * @returns stableItems와 이를 조작하는 함수들이 담긴 객체
 */

export function useStableList<T>(initialItems: T[]) {
  const [stableItems, setStableItems] = useState<StableListItem<T>[]>(() =>
    initialItems.map((value) => ({
      id: generateUniqueId(),
      value,
    })),
  );

  /**
   * ID를 기준으로 특정 아이템의 값을 업데이트합니다.
   * 함수형 업데이트를 지원합니다.
   * @param id - 업데이트할 아이템의 고유 ID
   * @param newValue - 새로운 값이거나, 이전 값을 받아 새 값을 반환하는 함수
   */
  const updateItem = useCallback((id: string, newValue: T | ((prevValue: T) => T)) => {
    setStableItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          const finalNewValue =
            typeof newValue === 'function' ? (newValue as (prevValue: T) => T)(item.value) : newValue;

          return { ...item, value: finalNewValue };
        }

        return item;
      }),
    );
  }, []);

  // 원본 값들로만 이루어진 배열을 memoization 하여 제공
  const stableValues = useMemo(() => stableItems.map((item) => item.value), [stableItems]);

  return {
    /** 안정적인 ID가 부여된 객체 배열. map 함수의 key로 id를 사용. */
    stableItems,
    /** 원본 값으로만 이루어진 배열. */
    stableValues,
    /** 특정 아이템을 업데이트하는 함수. */
    updateItem,
    /** 전체 리스트를 교체하는 함수. */
    setStableItems,
  };
}
