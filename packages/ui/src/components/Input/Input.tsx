import { type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../lib/utils';

const inputVariants = tv({
  base: [
    ' text-xs shadow-xs outline-none',
    'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
    'border border-transparent focus-visible:border-juiText-primary',
    'transition-all duration-200 ease-in-out',
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
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Input({
  className,
  type,
  variant,
  size,
  iconLeft,
  iconRight,
  ...props
}: React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
  }) {
  return (
    <div className="relative w-full">
      {iconLeft && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none">{iconLeft}</span>
      )}

      <input type={type} data-slot="input" className={cn(inputVariants({ variant, size, className }))} {...props} />

      {iconRight && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none">{iconRight}</span>
      )}
    </div>
  );
}

export default Input;
