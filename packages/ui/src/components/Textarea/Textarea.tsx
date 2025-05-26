'use client';

import { useRef, type TextareaHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { useInputValue } from '../hooks/useInputValue';
import { useAutosizeTextarea } from './hooks/useAutosizeTextarea';
import textareaVariaints from './textareaVariaints';
import { cn } from '../../lib/utils';

type AutosizeTextareaProps = {
  maxHeight?: number;
  minHeight?: number;
  error?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariaints>;

function Textarea({
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight,
  className,
  disabled,
  size = 'default',
  onChange,
  defaultValue,
  value,
  error,
  ...props
}: AutosizeTextareaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { value: textareaInput, handleChange } = useInputValue<HTMLTextAreaElement>({
    value,
    defaultValue,
    onChange,
  });

  // size에 따른 minHeight 기본값 매핑
  const sizeToMinHeightMap: Record<NonNullable<typeof size>, number> = {
    small: 48, // 12 * 4px = 48px
    default: 64, // 16 * 4px = 64px
    large: 80, // 20 * 4px = 80px
  };

  useAutosizeTextarea({
    textAreaRef,
    triggerAutoSize: textareaInput,
    maxHeight,
    minHeight: minHeight ?? sizeToMinHeightMap[size],
  });

  return (
    <textarea
      {...props}
      ref={textAreaRef}
      value={textareaInput}
      disabled={disabled}
      className={cn(
        textareaVariaints({
          error,
          size,
          disabled,
          className,
        }),
      )}
      onChange={handleChange}
    />
  );
}

export default Textarea;
