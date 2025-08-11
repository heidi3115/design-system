'use client';

import { Input } from '@common/ui';
import { cn } from '@common/ui/lib/utils';
import React, { useCallback, useState } from 'react';

/**
 * TreeView 검색 입력 컴포넌트의 props
 */
export type TreeViewSearchProps = {
  /** 검색창 비활성화 여부 */
  disabled?: boolean;
  /** 검색창에 표시될 플레이스홀더 텍스트 */
  searchPlaceholder?: string;
  /** 검색어 값 (Controlled 모드에서 사용) */
  searchValue?: string;
  /** 기본 검색어 값 (Uncontrolled 모드에서 사용) */
  defaultSearchValue?: string;
  /** 검색어가 변경될 때 호출되는 핸들러 */
  onSearchChange?: (value: string) => void;
  /** 컴포넌트에 추가할 CSS 클래스명 */
  className?: string;
  /** 검색 입력창에 대한 ref */
  searchInputRef?: React.Ref<HTMLInputElement>;
};

export default function TreeViewSearchInput({
  searchValue,
  defaultSearchValue,
  onSearchChange,
  searchPlaceholder = '입력해주세요...',
  disabled = false,
  className,
  searchInputRef,
  ...props
}: TreeViewSearchProps) {
  const [internalValue, setInternalValue] = useState(defaultSearchValue || '');

  // Controlled / Uncontrolled 모드 처리
  const isControlled = searchValue !== undefined;
  const currentValue = isControlled ? searchValue : internalValue;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onSearchChange?.(newValue);
    },
    [isControlled, onSearchChange],
  );

  // keyboard Event : ESC
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        const emptyValue = '';

        if (!isControlled) {
          setInternalValue(emptyValue);
        }

        onSearchChange?.(emptyValue);
      }
    },
    [isControlled, onSearchChange],
  );

  return (
    <div className={cn('w-full mb-4', className)}>
      <Input
        ref={searchInputRef}
        type="text"
        value={currentValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={searchPlaceholder}
        disabled={disabled}
        className="w-full"
        {...props}
      />
    </div>
  );
}
