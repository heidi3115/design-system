import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'tailwind-variants';
import { cn } from '../../lib/utils';
import buttonVariants from './buttonVariants';

function Button({
  asChild = false,
  className,
  variant,
  size,
  disabled = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, disabled, className }))} {...props} />;
}

export default Button;
