import { useState, useCallback, type ChangeEvent } from 'react';
import { useDebounce } from '@common/utils';

/**
 * useQuickSearch 훅은 DataTable 컴포넌트 내에서
 * 빠른 검색(input) 기능을 구현할 때 사용됩니다.
 *
 * - 외부에서 필터 값을 제어할 수도 있고 내부 상태로 관리할 수도 있습니다.
 * - 입력값 변경 시 debounce를 적용해
 *   과도한 렌더링과 불필요한 필터링 호출을 방지합니다.
 *
 * @param externalGlobalFilter 외부에서 전달되는 필터 값 (선택)
 * @param onExternalChange 외부에서 필터 값을 변경하는 콜백 (선택)
 * @returns
 *   - globalFilter: 현재 필터 값
 *   - setGlobalFilter: 필터 값을 직접 변경하는 함수
 *   - handleChange: input onChange 이벤트 핸들러 (DataTable 검색 input에 연결)
 */
export function useQuickSearch(externalGlobalFilter?: string, onExternalChange?: (val: string) => void) {
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');
  const globalFilter = externalGlobalFilter ?? internalGlobalFilter;
  const setGlobalFilter = onExternalChange ?? setInternalGlobalFilter;

  const debouncedSetGlobalFilter = useDebounce((val: string) => {
    setGlobalFilter(val);
  }, 500);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debouncedSetGlobalFilter(e.target.value);
    },
    [debouncedSetGlobalFilter],
  );

  return {
    globalFilter,
    setGlobalFilter,
    handleChange,
  };
}
