'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen light:bg-[#1F1A24]">
      <Image src="/images/loading.webp" alt="loading" width={100} height={87} priority />
    </div>
  );
}
