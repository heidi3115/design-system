'use client';

import ErrorFallback from '../components/ErrorFallback';

export default function GlobalError({ error }: { error: Error }) {
  return <ErrorFallback message={error.message} />;
}
