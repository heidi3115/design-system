import { useState, useCallback, type ChangeEvent } from 'react';
import { useDebounce } from '@common/utils';

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
