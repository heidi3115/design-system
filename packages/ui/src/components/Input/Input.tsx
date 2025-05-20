import { type ReactElement, type SVGProps, useState, useEffect, useCallback } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { cn } from '../../lib/utils';
import inputVariants from './inputVariants';
import { AlertCircle2Icon } from '@common/ui/icons';

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
}: Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    iconLeft?: ReactElement<SVGProps<SVGSVGElement>>;
    iconRight?: ReactElement<SVGProps<SVGSVGElement>>;
    error?: boolean;
    helperText?: string;
  }) {
  const hasIconLeft = !!iconLeft;
  const hasIconRight = !!iconRight;

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  // controlled value 반영
  useEffect(() => {
    if (isControlled) {
      setInternalValue(value as string);
    }
  }, [value, isControlled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e); // onChange가 있을 경우에만 실행
    },
    [onChange, isControlled],
  );

  return (
    <div>
      <div className="relative">
        {hasIconLeft && (
          <span
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-current pointer-events-none',
              disabled && 'opacity-50 cursor-not-allowed',
            )}>
            {iconLeft}
          </span>
        )}

        <input
          type={type}
          disabled={disabled}
          data-slot="input"
          value={internalValue}
          onChange={handleChange}
          className={cn(
            inputVariants({ error, size, hasIconLeft, hasIconRight, className }),
            disabled && 'cursor-not-allowed opacity-50',
          )}
          {...props}
        />

        {error && (
          <span className={cn('absolute top-1/2 -translate-y-1/2', hasIconRight ? 'right-9' : 'right-2')}>
            <AlertCircle2Icon variant="error" />
          </span>
        )}

        {hasIconRight && (
          <span
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-current pointer-events-none',
              disabled && 'opacity-50 cursor-not-allowed',
            )}>
            {iconRight}
          </span>
        )}
      </div>
      {error && helperText && <p className="text-xs text-juiError mx-1 mt-1">{helperText}</p>}
    </div>
  );
}

export default Input;
