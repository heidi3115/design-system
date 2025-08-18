'use client';

import { useState } from 'react';

export default function ClientErrorTest() {
  const [count, setCount] = useState(0);

  if (count === 3) {
    throw new Error('ClientWidget에서 에러 발생!');
  }

  return (
    <div>
      <p>카운트: {count}</p>
      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setCount((c) => c + 1)}>
        증가
      </button>
    </div>
  );
}
