'use client';

import { useDebounce } from '@common/utils';
import { useCallback, useEffect, useState } from 'react';
import type { SearchModeType } from '../TreeView';
import { DEFAULT_INTERNAL_DEBOUNCE } from './useTreeQuickSearch';

export type UseDebouncedTreeInputParams = {
  searchMode: SearchModeType; // 검색 모드 (내부/외부)
  externalValue?: string; // 외부에서 전달받는 검색값
  onSearchValueChange?: (value: string) => void; // 외부로 검색값 전달하는 콜백
  debounceMs?: number; // 디바운스 지연 시간
};

export type UseDebouncedTreeInputResultType = {
  displayValue: string;
  debouncedValue: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * 디바운스된 입력 처리 훅
 * - internal 모드: 내부 상태 관리 + 디바운스 적용
 * - external 모드: 외부 상태 동기화 + 즉시 콜백 호출
 */
export default function useDebouncedTreeInput({
  searchMode = 'internal',
  externalValue = '',
  onSearchValueChange,
  debounceMs = DEFAULT_INTERNAL_DEBOUNCE,
}: UseDebouncedTreeInputParams): UseDebouncedTreeInputResultType {
  const isInternalMode = searchMode === 'internal';
  const [internalValue, setInternalValue] = useState(externalValue || '');
  const [debouncedInternalValue, setDebouncedInternalValue] = useState(externalValue || '');

  // 디바운스 처리 - 내부 모드일 때만 디바운스된 상태 업데이트
  const debouncedUpdate = useDebounce((value: string) => {
    if (isInternalMode) {
      setDebouncedInternalValue(value);
      onSearchValueChange?.(value);
    }
  }, debounceMs);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (isInternalMode) {
        // 내부 모드: 상태 업데이트 + 디바운스 적용
        setInternalValue(value);
        debouncedUpdate(value);
      } else {
        // 외부 모드에서는 즉시 부모에게 즉시 콜백 호출
        onSearchValueChange?.(value);
      }
    },
    [isInternalMode, debouncedUpdate, onSearchValueChange],
  );

  // 외부 값 변경시 내부 상태 동기화(외부 모드일 때만)
  useEffect(() => {
    if (!isInternalMode) {
      setInternalValue(externalValue);
      setDebouncedInternalValue(externalValue);
    }
  }, [externalValue, isInternalMode]);

  return {
    displayValue: isInternalMode ? internalValue : externalValue,
    debouncedValue: isInternalMode ? debouncedInternalValue : externalValue,
    handleInputChange,
  };
}
