'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useState, useEffect } from 'react';
type ProgressProps = { value?: number; totalDuration?: number };

const Progress = ({ value = 0, totalDuration = 100 }: ProgressProps) => {
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    const steps = 30;
    const gap = 100 / steps;
    const intervalTime = totalDuration / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += gap;
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [totalDuration]);

  return (
    <ProgressPrimitive.Root
      className="relative h-[15px] w-full overflow-hidden bg-juiBackground-solidPaper"
      style={{ transform: 'translateZ(0)' }}
      value={progress}>
      <ProgressPrimitive.Indicator
        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] w-full h-full bg-gradient-to-r from-[#2E589B] to-[#69CCF6] transition-transform duration-[660ms] "
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress };
