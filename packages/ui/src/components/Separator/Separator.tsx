'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@common/ui/lib/utils';
import { tv, type VariantProps } from 'tailwind-variants';

export const separatorVariants = tv({
  base: [
    'size-full shrink-0 outline-none',
    'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    'first:ml-0 last:mr-0',
  ],
  variants: {
    variant: {
      primary: 'bg-juiText-primary',
      secondary: 'bg-juiText-secondary',
      disabled: 'bg-juiText-disabled',
      blue: 'bg-juiText-blue',
      purple: 'bg-juiText-purple',
    },
    size: {
      small: '',
      basic: '',
      medium: '',
      large: '',
    },
    horizontal: {
      true: 'w-full',
      false: 'h-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'basic',
    horizontal: false,
  },
  compoundVariants: [
    { size: 'small', horizontal: true, class: 'h-[1px] my-1' },
    { size: 'small', horizontal: false, class: 'w-[1px] mx-1' },
    { size: 'basic', horizontal: true, class: 'h-0.5 my-2' },
    { size: 'basic', horizontal: false, class: 'w-0.5 mx-2 ' },
    { size: 'medium', horizontal: true, class: 'h-1 my-3 ' },
    { size: 'medium', horizontal: false, class: 'w-1 mx-3' },
    { size: 'large', horizontal: true, class: 'h-2 my-4' },
    { size: 'large', horizontal: false, class: 'w-2 mx-4' },
  ],
});

export type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> &
  Omit<VariantProps<typeof separatorVariants>, 'horizontal'>;

function Separator({
  className,
  orientation = 'vertical',
  decorative = true,
  variant = 'primary',
  size = 'basic',
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      aria-hidden={decorative}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant, size, horizontal: orientation === 'horizontal', className }))}
      {...props}
    />
  );
}

export default Separator;
