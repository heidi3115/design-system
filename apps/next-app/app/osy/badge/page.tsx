'use client';

import { useState } from 'react';
import { Badge, badgeVariants, Button } from '@common/ui';
import { CornerDownLeftIcon } from '@common/ui/icons';
import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';

export default function BadgePage() {
  const [count, setCount] = useState(0);
  const MAX_VAL = 99;

  return (
    <section>
      <div>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/">
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <div className={'flex flex-col gap-4 items-center justify-center w-full'}>
        <h2 className={'text-juiText-blue text-4xl font-bold'}>Badges</h2>
        {/*<div className={'flex gap-4 items-center justify-center'}>*/}
        {/*  <Badge className="text-juiStatus-urgency">*/}
        {/*    {count} <CornerDownRightIcon className="fill-current" onClick={() => setCount((prev) => (prev += 1))} />*/}
        {/*  </Badge>*/}
        {/*</div>*/}
        <div className={'flex flex-col gap-5'}>
          <h3 className={'mb-3.5 text-juiText-primary text-2xl font-bold'}>
            State badge - <span className={'text-xl'}>각 badge 클릭 시 숫자가 올라갑니다.</span>
          </h3>
          <h4>status 별 badge - </h4>
          <div className={'flex flex-col gap-4'}>
            <h4>Score only</h4>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.status) as Array<keyof typeof badgeVariants.variants.status>).map(
                (status, idx) => {
                  console.log('status :', status, 'idx :', idx);

                  console.log(
                    'Object.keys(badgeVariants.variants.status).length :',
                    Object.keys(badgeVariants.variants.status).length,
                  );

                  return (
                    <Badge
                      key={status}
                      variant={'state'}
                      status={status}
                      scoreVal={
                        idx === Object.keys(badgeVariants.variants.status).length - 1
                          ? count + idx + 90 - 1
                          : count + idx
                      }
                      onClick={() => setCount((prev) => (prev += 1))}
                    />
                  );
                },
              )}
            </div>
            <h4>Score with maxVal </h4>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.status) as Array<keyof typeof badgeVariants.variants.status>).map(
                (status, idx) => {
                  console.log('status :', status);

                  return (
                    <Badge
                      key={status}
                      variant={'state'}
                      status={status}
                      scoreVal={count + idx + 90}
                      maxVal={MAX_VAL}
                      onClick={() => setCount((prev) => (prev += 1))}
                    />
                  );
                },
              )}
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-5'}>
          <h3 className={'mb-3.5 text-juiText-primary text-2xl font-bold'}>
            Score variant - <span className={'text-xl'}>각 badge 클릭 시 숫자가 올라갑니다.</span>
          </h3>
          <div className={'flex flex-col gap-4'}>
            <h4>Score only</h4>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.score) as Array<keyof typeof badgeVariants.variants.score>).map(
                (score, idx) => {
                  console.log('score :', score, 'idx :', idx);

                  console.log(
                    'Object.keys(badgeVariants.variants.score).length :',
                    Object.keys(badgeVariants.variants.score).length,
                  );

                  return (
                    <Badge
                      key={score}
                      variant={'state'}
                      score={score}
                      scoreVal={
                        idx === Object.keys(badgeVariants.variants.score).length - 1
                          ? count + idx + 90 - 1
                          : count + idx
                      }
                      onClick={() => setCount((prev) => (prev += 1))}
                    />
                  );
                },
              )}
            </div>
            <h4>Score with maxVal </h4>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.score) as Array<keyof typeof badgeVariants.variants.score>).map(
                (score, idx) => {
                  console.log('score :', score);

                  return (
                    <Badge
                      key={score}
                      variant={'state'}
                      score={score}
                      scoreVal={count + idx + 90}
                      maxVal={MAX_VAL}
                      onClick={() => setCount((prev) => (prev += 1))}
                    />
                  );
                },
              )}
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-5'}>
          <h3>title</h3>
          <div className={'flex flex-row gap-4'}>
            <div>flex-row1</div>
            <div>flex-row2</div>
          </div>
        </div>
        <div className={'flex flex-col gap-5'}>
          <h3>title</h3>
          <div className={'flex flex-row gap-4'}>
            <div>flex-row1</div>
            <div>flex-row2</div>
          </div>
        </div>
      </div>
    </section>
  );
}
