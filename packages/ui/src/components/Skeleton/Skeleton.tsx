import { cn } from '../../lib/utils';
import { type ComponentProps } from 'react';

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="skeleton" className={cn('bg-juiScore-practice animate-pulse rounded-md', className)} {...props} />
  );
}

export default Skeleton;
