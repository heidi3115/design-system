'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@common/ui/lib/utils';
import { type HTMLAttributes } from 'react';

type ProgressProps = {
  value?: number;
};

const Progress = ({ className, value = undefined }: ProgressProps & HTMLAttributes<HTMLDivElement>) => {
  const isNumber = typeof value === 'number' && !isNaN(value);

  return (
    <ProgressPrimitive.Root value={value} className="relative h-[15px] w-full overflow-hidden">
      <ProgressPrimitive.Indicator
        style={{ width: isNumber ? `${value}%` : '100%' }}
        className={cn(
          ['h-full', !value && 'animate-progress-bar', 'bg-gradient-to-r from-[#2E589B] via-[#5d2ce9] to-[#69CCF6]'],
          className,
        )}
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress };
