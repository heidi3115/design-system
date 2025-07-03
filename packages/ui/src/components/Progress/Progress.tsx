'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@common/ui/lib/utils';
import { type HTMLAttributes } from 'react';

type ProgressProps = {
  value?: number;
  bgClassName?: string;
};

const Progress = ({ bgClassName, className, value = undefined }: ProgressProps & HTMLAttributes<HTMLDivElement>) => {
  const isNumber = typeof value === 'number' && !isNaN(value);

  return (
    <ProgressPrimitive.Root
      value={value}
      className={cn('bg-juiBackground-input relative h-[15px] w-full overflow-hidden', bgClassName)}>
      <ProgressPrimitive.Indicator
        style={{ width: isNumber ? `${value}%` : '100%' }}
        className={cn(
          ['h-full', !isNumber && 'animate-progress-bar', 'bg-gradient-to-r from-[#2E589B] via-[#5d2ce9] to-[#69CCF6]'],
          className,
        )}
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress };
