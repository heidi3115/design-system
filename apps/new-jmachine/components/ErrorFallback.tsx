'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@common/ui';
import { ArrowLeftIcon } from '@common/ui/icons';

export default function ErrorFallback({ message, reset }: { message?: string; reset?: () => void }) {
  const router = useRouter();

  return (
    <div className="w-full h-screen max-h-screen fixed top-0 left-0 flex justify-center items-center dark:bg-[url('/images/bg-error.png')] bg-no-repeat bg-cover top-0 left-0">
      <div className="flex gap-2">
        <div className="flex flex-col gap-4 justify-around">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-9xl">Error</h1>
            {message && <p className="text-sm">{message}</p>}
          </div>
          <div className="flex gap-2">
            <Button variant="gradient" onClick={() => router.back()}>
              <ArrowLeftIcon /> Go Back
            </Button>
            <Button onClick={reset}>재시도</Button>
          </div>
        </div>
        <Image src="/images/error-right.png" alt="" width={513} height={316} />
      </div>
    </div>
  );
}
