'use client';

import { cloneElement, useRef, type ReactElement, type TextareaHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';
import { AlertCircle2Icon } from '@common/ui/icons';

import { useInputValue } from '../../hooks/useInputValue';
import { useAutosizeTextarea } from './hooks/useAutosizeTextarea';
import textareaVariaints from './textareaVariaints';
import { type ButtonProps } from '../Button';
import { cn } from '../../lib/utils';

type AutosizeTextareaProps = {
  maxHeight?: number;
  minHeight?: number;
  rightButton?: ReactElement<ButtonProps>;
  error?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariaints>;

function Textarea({
  className,
  disabled,
  size = 'default',
  maxHeight,
  minHeight,
  rightButton,
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

  const isMinHeightSize = typeof minHeight === 'number';
  const isMaxHeightSize = typeof maxHeight === 'number';

  useAutosizeTextarea({
    textAreaRef,
    triggerAutoSize: textareaInput,
  });

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <textarea
        ref={textAreaRef}
        value={textareaInput}
        disabled={disabled}
        style={{
          ...(isMinHeightSize && { minHeight: `${minHeight}px` }),
          ...(isMaxHeightSize && { maxHeight: `${maxHeight}px` }),
        }}
        className={cn(
          textareaVariaints({
            error,
            isRightButton: !!rightButton,
            size,
            disabled,
            className,
          }),
        )}
        onChange={handleChange}
        {...props}
      />
      {error && !rightButton && (
        <AlertCircle2Icon variant="error" size="small" className="absolute top-1/2 right-2.5 -translate-y-1/2" />
      )}
      {rightButton && (
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-24 px-2 flex flex-col items-center gap-1">
          {cloneElement(rightButton, {
            className: 'inline-flex w-full truncate !overflow-hidden',
            disabled,
          })}
          {error && <AlertCircle2Icon variant="error" size="small" />}
        </div>
      )}
    </div>
  );
}

export default Textarea;
