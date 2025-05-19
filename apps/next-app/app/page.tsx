'use client';

import { useState } from 'react';

import { Badge, Button, buttonVariants } from '@common/ui';
import { AddIcon } from '@common/ui/src/icons/Icon';

import { useUpdateEffect } from '@common/utils';
import { AlarmIcon } from '@common/ui/icons';
import { SearchIcon } from 'lucide-react';

export default function Page() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    alert(count);
  }, [count]);

  return (
    <section className="flex items-center justify-center w-full min-h-svh">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-juiGrey-400 text-5xl font-bold hover:text-white">
          JUI Design Gallery
        </h1>
        <div className={'flex flex-col gap-4 items-center justify-center'}>
          <h2 className={'text-juiText-blue text-3xl font-bold'}>Buttons</h2>
          <div className={'flex flex-col gap-4'}>
            <h3 className={'text-juiText-blue text-lg font-bold'}>
              Colors(variant)
            </h3>
            <div className={'flex gap-4 flex-row items-center justify-center'}>
              {(
                Object.keys(buttonVariants.variants.variant) as Array<
                  keyof typeof buttonVariants.variants.variant
                >
              ).map((variant) => (
                <Button
                  key={variant}
                  variant={variant}
                  size={'basic'}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
          <div className={'flex flex-col gap-4'}>
            <h3 className={'text-juiText-blue text-lg font-bold'}>Size</h3>
            <div className={'flex flex-row gap-4 items-center justify-center'}>
              {(
                Object.keys(buttonVariants.variants.variant) as Array<
                  keyof typeof buttonVariants.variants.variant
                >
              ).map((variant) => {
                return (
                  <div key={variant} className={'flex flex-col gap-4'}>
                    {(
                      Object.keys(buttonVariants.variants.size) as Array<
                        keyof typeof buttonVariants.variants.size
                      >
                    ).map((size) => (
                      <Button
                        key={`${variant}-${size}`}
                        variant={variant}
                        size={size}
                        onClick={() => setCount((prev) => (prev += 1))}>
                        {size !== 'small' ? (
                          <>
                            {variant === 'transparentGrey' && size}
                            <AlarmIcon
                              size={'small'}
                              color={
                                variant === 'transparentGrey'
                                  ? 'custom'
                                  : undefined
                              }
                              className={
                                variant === 'transparentGrey'
                                  ? 'fill-current'
                                  : ''
                              }
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
              })}
            </div>
          </div>
          <div className={'flex flex-col gap-4'}>
            <h3 className={'text-juiText-blue text-lg font-bold'}>Status</h3>
            <div className={'grid-cols-3 items-center justify-center'}>
              <div className={'flex flex-col'}>
                <h4 className={'text-base'}>Login</h4>
                <Button
                  variant={'gradient'}
                  size={'large'}
                  // className={'w-[400px] h-[60px]'}
                >
                  <SearchIcon />
                  {/*<PieChartIcon />*/}
                  <span className={'font-bold text-2xl'}>Login</span>
                </Button>
              </div>
              <div className={''}>
                <h4 className={'text-base'}>Search</h4>
                <div className={''}></div>
              </div>
              {/*{(*/}
              {/*  Object.keys(buttonVariants.variants.variant) as Array<*/}
              {/*    keyof typeof buttonVariants.variants.variant*/}
              {/*  >*/}
              {/*).map((variant) => (*/}
              {/*  <Button*/}
              {/*    key={variant}*/}
              {/*    variant={variant}*/}
              {/*    size={'basic'}*/}
              {/*    onClick={() => setCount((prev) => (prev += 1))}>*/}
              {/*    {variant}*/}
              {/*  </Button>*/}
              {/*))}*/}
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-4 items-center justify-center'}>
          <h2 className={''}>Badges</h2>
          <div className={'flex gap-4 items-center justify-center'}>
            <Badge className="text-juiStatus-urgency">
              {count} <AddIcon className="stroke-juiSecondary" />
              {count} <AddIcon className="fill-juiSecondary" />
              {count} <AddIcon className="fill-current" />
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
