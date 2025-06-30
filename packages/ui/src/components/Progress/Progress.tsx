'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useState, useEffect } from 'react';

// function Progress({ className, value = 0, ...props }: ComponentProps<typeof ProgressPrimitive.Root>) {
function Progress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <ProgressPrimitive.Root
      value={progress}
      max={100}
      className="bg-primary/20 relative h-full w-full overflow-hidden rounded-full">
      <ProgressPrimitive.Indicator className="bg-juiPrimary h-full transition-all" style={{ width: `${progress}%` }} />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
