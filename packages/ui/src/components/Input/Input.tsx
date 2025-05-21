import { type ReactElement, type SVGProps, isValidElement, cloneElement } from 'react';
import { type VariantProps } from 'tailwind-variants';
import { type IconProps } from '@common/ui/icons/types';
import { AlertCircle2Icon } from '@common/ui/icons';

import inputVariants from './inputVariants';
import { useInputValue } from './hooks/useInputValue';
import { cn } from '../../lib/utils';
import NumberStepper from '@common/ui/components/Input/NumberStepper';

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    iconLeft?: ReactElement<SVGProps<SVGSVGElement>>;
    iconRight?: ReactElement<SVGProps<SVGSVGElement>>;
    error?: boolean;
    helperText?: string;
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

  const renderIcon = (icon: ReactElement<SVGProps<SVGSVGElement>> | undefined) =>
    isValidElement<IconProps>(icon) ? cloneElement(icon, { size: 'small' }) : icon;

  return (
    <div>
      <div className={cn('relative group', className)}>
        {hasIconLeft && (
          <span
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-current pointer-events-none',
              disabled && 'opacity-50 cursor-not-allowed',
            )}>
            {renderIcon(iconLeft)}
          </span>
        )}

        <input
          type={type}
          disabled={disabled}
          data-slot="input"
          value={inputValue}
          onChange={handleChange}
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
          {...props}></input>

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

        {hasIconRight && (
          <span
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-current pointer-events-none',
              disabled && 'opacity-50 cursor-not-allowed',
            )}>
            {renderIcon(iconRight)}
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
