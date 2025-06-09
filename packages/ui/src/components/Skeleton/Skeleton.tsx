import { cn } from '../../lib/utils';
import { type ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const skeletonVariants = tv({
  base: 'bg-juiBackground-skeleton animate-pulse rounded-md w-30 h-5',
  variants: {
    variant: {
      default: 'bg-juiBackground-skeleton',
      primary: 'bg-juiScore-practice',
      secondary: 'bg-juiPrimary',
      error: 'bg-juiSecondary',
    },
    size: {
      basic: 'w-40 h-5',
      small: 'w-20 h-5',
      medium: 'w-20 h-20',
      large: 'w-60 h-30',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'basic',
  },
});

export type SkeletonProps = ComponentProps<'div'> & VariantProps<typeof skeletonVariants>;

function Skeleton({ variant, size, className, ...props }: SkeletonProps) {
  return <div data-slot="skeleton" className={cn(skeletonVariants({ variant, size }), className)} {...props} />;
}

export default Skeleton;
