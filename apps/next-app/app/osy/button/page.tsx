'use client';

import { Button, buttonVariants } from '@common/ui';
import { CornerDownLeftIcon, LogInIcon, PlusIcon, ZoomInIcon } from '@common/ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';
import { ScoringBadge } from '@common/ui/components/Badge';

export default function ButtonPage() {
  const [count, setCount] = useState(0);

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
        <h2 className={'text-juiText-blue text-3xl font-bold'}>Buttons</h2>
        <div className={'flex flex-col gap-4'}>
          <h3>basic Button</h3>
          <Button>no variant</Button>
          <Button variant={'secondary'}>secondary</Button>
          <h3 className={'text-juiText-blue text-lg font-bold'}>Colors(variant)</h3>
          <div className={'flex gap-4 flex-row items-center justify-center'}>
            {(Object.keys(buttonVariants.variants.variant) as Array<keyof typeof buttonVariants.variants.variant>).map(
              (variant) => (
                <Button key={variant} variant={variant} size={'basic'} onClick={() => setCount((prev) => (prev += 1))}>
                  {variant}
                </Button>
              ),
            )}
          </div>
        </div>
        <div className={'flex flex-col gap-4'}>
          <h3 className={'text-juiText-blue text-lg font-bold'}>Size</h3>
          <div className={'flex flex-row gap-4 items-center justify-center'}>
            {(Object.keys(buttonVariants.variants.variant) as Array<keyof typeof buttonVariants.variants.variant>).map(
              (variant) => {
                return (
                  <div key={variant} className={'flex flex-col gap-4'}>
                    {(
                      Object.keys(buttonVariants.variants.size) as Array<keyof typeof buttonVariants.variants.size>
                    ).map((size) => (
                      <Button
                        key={`${variant}-${size}`}
                        variant={variant}
                        size={size}
                        onClick={() => setCount((prev) => (prev += 1))}>
                        {size !== 'small' ? (
                          <>
                            {variant === 'transparentGrey' && size}
                            <ZoomInIcon
                              size={'small'}
                              color={variant === 'transparentGrey' ? 'custom' : undefined}
                              className={variant === 'transparentGrey' ? 'fill-current' : ''}
                            />
                            {variant !== 'transparentGrey' && size}
                          </>
                        ) : (
                          size
                        )}
                      </Button>
                    ))}
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className={'flex flex-col gap-4'}>
          <h3 className={'text-juiText-blue text-lg font-bold'}>Status</h3>
          <div className={'flex flex-row gap-5 items-center justify-center'}>
            <div className={''}>
              <h4 className={'my-3 text-base'}>Login</h4>
              <Button variant={'gradient'} size={'large'} className={'w-[400px] h-[60px]'}>
                <LogInIcon />
                <span className={'font-bold text-2xl'}>Login</span>
              </Button>
            </div>
            <div className={''}>
              <h4 className={'my-3 text-base'}>Search</h4>
              <Button variant={'gradient'} size={'large'} className={'w-[160px] h-[40px]'}>
                <PlusIcon />
                <span className={'font-bold text-base'}>Search</span>
              </Button>
            </div>
            <div className={''}>
              <h4 className={'my-3 text-base'}>Count</h4>
              <Button variant={'gradient'} size={'large'}>
                <PlusIcon />
                <span className={'font-bold text-base'}>{count}</span>
              </Button>
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-4'}>
          <h3 className={'text-juiText-blue text-lg font-bold'}>asChild</h3>
          <strong className={'text-juiError'}>
            <Link
              href={'https://www.radix-ui.com/primitives/docs/utilities/slot#basic-example'}
              target={'_blank'}
              title={'to Raidx page'}>
              {`Radix UI 의 Slot 시, asChild={true}일 경우, single children element 이어야 하며, 여러 개의 요소 시 에러 나는 내역 확인`}
            </Link>
          </strong>
          <div className={''}>
            <h4 className={'my-3 text-base'}>Count with asChild Badge</h4>
            <strong>asChild에 순수 문자열만 넣으면 렌더링 되지 않고 무시되는 것 확인</strong>
            <div className={'flex flex-row gap-4'}>
              <Button asChild variant={'primary'} size={'large'}>
                {'asChild TextOnly'}
              </Button>
              <Button asChild variant={'gradient'} size={'large'} onClick={() => setCount((prev) => (prev += 1))}>
                <ScoringBadge score={'veryLow'} scoreVal={count}>
                  btn asChild ScoringBadge
                </ScoringBadge>
              </Button>
              <Button
                asChild
                variant={'transparentGrey'}
                size={'large'}
                onClick={() => setCount((prev) => (prev += 1))}>
                <ScoringBadge score={'veryHigh'} scoreVal={count}>
                  transparentGrey asChild ScoringBadge
                </ScoringBadge>
              </Button>
              <Button>
                <Link href={'https://www.radix-ui.com/primitives/docs/utilities/slot#basic-example'} target={'_blank'}>
                  to Radix-ui(asChild=false)
                </Link>
              </Button>
              <Button asChild>
                <Link href={'https://www.radix-ui.com/primitives/docs/utilities/slot#basic-example'} target={'_blank'}>
                  to Radix-ui(asChild=true)
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
