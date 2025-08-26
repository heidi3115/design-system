'use client';

import { signOut } from 'next-auth/react';
import ErrorFallback from '../components/ErrorFallback';

export default function GlobalError({ error, reset }: { error: Error; reset?: () => void }) {
  if (error.message === 'Unauthorized') {
    signOut({ callbackUrl: '/login' });

    return null;
  }

  return <ErrorFallback message={error.message} reset={reset} />;
}
