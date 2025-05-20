import { type ReactElement, type SVGProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../lib/utils';

const inputVariants = tv({
  base: [
    'w-full text-xs shadow-xs outline-none bg-black',
    'px-4',
    'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
    'border border-transparent focus-visible:border-juiText-primary',
    'transition-all duration-700 ease-in-out',
  ],
  variants: {
    variant: {
      default: '',
    },
    size: {
      default: 'h-8',
      small: 'h-7',
      large: 'h-9',
    },
    hasIconLeft: {
      true: 'pl-10',
      false: 'px-4',
    },
    hasIconRight: {
      true: 'pr-10',
      false: 'px-4',
    },
  },
  compoundVariants: [
    {
      hasIconLeft: false,
      hasIconRight: false,
      className: 'px-4',
    },
    {
      hasIconLeft: true,
      hasIconRight: false,
      className: 'pl-10 pr-4',
    },
    {
      hasIconLeft: false,
      hasIconRight: true,
      className: 'pl-4 pr-10',
    },
    {
      hasIconLeft: true,
      hasIconRight: true,
      className: 'pl-10 pr-10',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    hasIconLeft: false,
    hasIconRight: false,
  },
});

function Input({
  className,
  type,
  variant,
  size,
  iconLeft,
  iconRight,
  disabled,
  ...props
}: Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    iconLeft?: ReactElement<SVGProps<SVGSVGElement>>;
    iconRight?: ReactElement<SVGProps<SVGSVGElement>>;
  }) {
  const hasIconLeft = !!iconLeft;
  const hasIconRight = !!iconRight;

  return (
    <div className="relative w-full">
      {hasIconLeft && (
        <span
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 text-juiText-primary pointer-events-none',
            disabled && 'opacity-50 cursor-not-allowed',
          )}>
          {iconLeft}
        </span>
      )}

      <input
        type={type}
        disabled={disabled}
        data-slot="input"
        className={cn(
          inputVariants({ variant, size, hasIconLeft, hasIconRight, className }),
          disabled && 'cursor-not-allowed opacity-50',
        )}
        {...props}
      />

      {hasIconRight && (
        <span
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 text-juiText-primary pointer-events-none',
            disabled && 'opacity-50 cursor-not-allowed',
          )}>
          {iconRight}
        </span>
      )}
    </div>
  );
}

export default Input;
