'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4 text-red-500">
      <h2>에러 발생: {error.message}</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
