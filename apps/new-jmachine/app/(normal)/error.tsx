'use client';

import { signOut } from 'next-auth/react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4 text-red-500">
      <h2>에러 발생: {error.message}</h2>
      <button onClick={() => reset()}>다시 시도</button>
      <button onClick={() => signOut({ callbackUrl: '/login' })}>로그아웃</button>
    </div>
  );
}
