'use client';

import { Button } from '@common/ui';

export default function ClientErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex gap-2 w-full h-full">
      {error.message}
      <Button onClick={resetErrorBoundary}>Reset</Button>
    </div>
  );
}
