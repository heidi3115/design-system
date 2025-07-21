'use client';

import { Button } from '@common/ui';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <h2>문제가 발생했습니다</h2>
        <pre>{error.message}</pre>
        <Link href="/login">홈으로</Link>
        <Button onClick={() => reset()}>재시도</Button>
        <button onClick={() => signOut({ callbackUrl: '/login' })}>로그아웃</button>
      </body>
    </html>
  );
}
