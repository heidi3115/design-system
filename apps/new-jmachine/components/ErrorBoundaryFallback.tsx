'use client';

import ErrorFallback from './ErrorFallback';

export default function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return <ErrorFallback message={error.message} reset={resetErrorBoundary} />;
}
