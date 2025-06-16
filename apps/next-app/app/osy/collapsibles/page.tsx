'use client';

import Link from 'next/link';
import { cn } from '@common/ui/lib/utils';
import { Button } from '@common/ui';
import { CornerDownLeftIcon } from '@common/ui/icons';
import ThemeToggle from '../../../components/ThemeToggle';

export default function CollapsiblesPage() {
  const alignCenterClass = 'items-center justify-center';
  const flexColClass = 'flex flex-col';
  const flexRowClass = 'flex flex-row';
  const mainBlueTit = 'text-juiText-blue text-3xl font-bold text-center';
  const mainBlueSubTit = 'text-juiText-blue text-2xl font-bold text-center';

  const Line = () => <hr className={'mt-4 mb-4 text-juiText-primary'} style={{ width: '80%', height: '2px' }} />;

  return (
    <main className={'relative w-full'}>
      <div className={'relative'}>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/" title={'to main'}>
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <section className={cn(flexColClass, alignCenterClass, 'relative w-full')}>
        <h2 className={cn(mainBlueTit)}>Accordion</h2>
        <div className={cn(flexColClass, 'gap-4')}>
          <div className={cn(flexColClass, 'gap-4')}>
            <h3 className={cn(mainBlueSubTit)}>Accordion Demo</h3>
            <div className={cn(flexColClass, 'gap-4')}>
              <div className={cn(flexColClass, 'gap-4')}>
                <h4>1</h4>
                <div className={cn(flexRowClass)}>1</div>
              </div>
              <div className={cn(flexColClass, 'gap-4')}>
                <h4>2</h4>
                <div className={cn(flexRowClass)}>2</div>
              </div>
            </div>
          </div>
        </div>
        <Line />
        <h2 className={cn(mainBlueTit)}>Collapsible</h2>
        <div className={cn(flexColClass, 'gap-4')}></div>
        <Line />
      </section>
    </main>
  );
}
