'use client';

import { useState } from 'react';
import { Badge, Button } from '@common/ui';
import { CornerDownLeftIcon, CornerDownRightIcon } from '@common/ui/icons';
import Link from 'next/link';
// import ThemeToggle from '../../../components/ThemeToggle';

export default function BadgePage() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <div>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/">
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        {/*<ThemeToggle />*/}
      </div>
      <div className={'flex flex-col gap-4 items-center justify-center'}>
        <h2 className={'text-juiText-blue'}>Badges</h2>
        <div className={'flex gap-4 items-center justify-center'}>
          <Badge className="text-juiStatus-urgency">
            {count} <CornerDownRightIcon className="fill-current" onClick={() => setCount((prev) => (prev += 1))} />
          </Badge>
        </div>
      </div>
    </section>
  );
}
