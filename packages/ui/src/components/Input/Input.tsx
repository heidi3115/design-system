'use client';

import { type ChangeEvent, type ComponentType, type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';
import { AlertCircle2Icon, type IconProps } from '@common/ui/icons';
import { sanitizeNumber } from '@common/utils';

import inputVariants from './inputVariants';
import { useInputValue } from '../../hooks/useInputValue';
import NumberStepper from './NumberStepper';
import { cn } from '../../lib/utils';

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    iconLeft?: ComponentType<IconProps>;
    iconRight?: ComponentType<IconProps>;
    error?: boolean;
    helperText?: ReactNode;
  };

function Input({
  className,
  type = 'text',
  size,
  iconLeft,
  iconRight,
  disabled,
  value,
  defaultValue,
  error,
  helperText,
  onChange,
  ...props
}: InputProps) {
  const hasIconLeft = !!iconLeft;
  const hasIconRight = !!iconRight;

  const { value: inputValue, handleChange } = useInputValue({
    value,
    defaultValue,
    onChange,
  });

  const IconLeft = iconLeft;
  const IconRitght = iconRight;

  const preventInvalidInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = sanitizeNumber(event.target.value);
  };

  return (
    <div>
      <div className={cn('relative group min-h-7', className)}>
        {IconLeft && (
          <span
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-current pointer-events-none',
              disabled && 'opacity-50 cursor-not-allowed',
            )}>
            <IconLeft size="small" />
          </span>
        )}

        <input
          type={type}
          disabled={disabled}
          data-slot="input"
          value={inputValue}
          onChange={handleChange}
          {...(type === 'number' && { type: 'text', onInput: preventInvalidInput })}
          className={cn(
            inputVariants({
              error,
              size,
              hasIconLeft,
              hasIconRight,
              disabled,
              className,
            }),
          )}
          {...props}
        />

        {error && (
          <span
            className={cn(
              'absolute top-1/2 -translate-y-1/2',
              hasIconRight ? 'right-9' : 'right-2',
              disabled && 'opacity-50 cursor-not-allowed',
            )}>
            <AlertCircle2Icon variant="error" size="small" />
          </span>
        )}

        {IconRitght && (
          <span
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-current pointer-events-none',
              disabled && 'opacity-50 cursor-not-allowed',
            )}>
            <IconRitght size="small" />
          </span>
        )}

        {type === 'number' && !hasIconRight && !error && (
          <NumberStepper inputValue={inputValue} handleChange={handleChange} />
        )}
      </div>

      {helperText && (
        <p className={cn('text-xs mx-1 mt-1', error && 'text-juiError', disabled && 'opacity-50 cursor-not-allowed')}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
