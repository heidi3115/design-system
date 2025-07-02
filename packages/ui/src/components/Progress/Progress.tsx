'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@common/ui/lib/utils';
import { type HTMLAttributes } from 'react';

type ProgressProps = HTMLAttributes<HTMLDivElement>;

const Progress = ({ className }: ProgressProps) => {
  return (
    <ProgressPrimitive.Root className="relative h-[15px] w-full overflow-hidden">
      <ProgressPrimitive.Indicator
        className={cn(
          ['w-full h-full', 'animate-progress-bar', 'bg-gradient-to-r from-[#2E589B] via-[#5d2ce9] to-[#69CCF6]'],
          className,
        )}
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress };
