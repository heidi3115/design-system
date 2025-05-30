'use client';

import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
import { Line } from './badge/page';
import { Button } from '@common/ui/components/Button';
import { CornerDownLeftIcon } from '@common/ui/icons';

export default function CommonOsyPage() {
  return (
    <section>
      <div>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/" title={'to main'}>
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <div className={'flex flex-col gap-4 items-center justify-center'}>
        <h2 className={'text-juiText-blue text-3xl font-bold'}>Separators</h2>
        <div className={'flex flex-col gap-4'}>
          <h3 className={'my-3 text-base'}>title</h3>
          <strong>subtitle</strong>
          <div className={'flex flex-row gap-4'}>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-juiText-blue text-base font-bold'}></span>
              <div className={'flex flex-row gap-3'}></div>
            </div>
          </div>
        </div>
        <Line />
        <div className={'flex flex-col gap-4'}>
          <h2 className={'text-juiText-blue text-3xl font-bold'}>Components</h2>
          <div className={'flex flex-col gap-4'}>
            <h3 className={'my-3 text-base'}>title</h3>
            <strong>subtitle</strong>
            <div className={'flex flex-row gap-4'}>
              <div className={'flex flex-col gap-2'}>
                <span className={'text-juiText-blue text-base font-bold'}></span>
                <div className={'flex flex-row gap-3'}></div>
              </div>
            </div>
          </div>
        </div>
        <Line />
      </div>
    </section>
  );
}
