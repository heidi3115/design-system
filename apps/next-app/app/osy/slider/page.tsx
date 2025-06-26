'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';
import { Button, Input, Separator, Slider } from '@common/ui';
import { CornerDownLeftIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils';

export default function SliderPage() {
  const tempStd = 0;
  const tempMin1 = 0.1;
  const tempMin2 = 0.001;
  const tempMin3 = 0.000001;
  const tempMax1 = 1;
  const tempMax2 = 10;
  const tempMax3 = 100;
  const tempMax4 = 1000;
  const tempDefaultVal1 = 30;
  const tempDefaultVal2 = 0.37;
  const tempDefaultVal3 = 0.62587;

  const commonBoxClass = 'items-center justify-center text-juiText-primary';
  const flexColBoxGap4 = 'relative flex flex-col gap-4 text-juiText-primary';
  const flexRowBoxGap4 = 'relative flex flex-row gap-4 text-juiText-primary';

  const val2Ref = useRef(null);
  const [val1, setVal1] = useState<number[]>([10, tempDefaultVal1]);
  const [val2, setVal2] = useState<number[]>([]);

  return (
    <main className={'relative size-full'}>
      <div>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/" title={'to main'}>
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <section className={cn(flexColBoxGap4, commonBoxClass, 'size-full')}>
        <div className={cn(flexColBoxGap4, commonBoxClass, 'w-9/10 min-h-9/10')}>
          <div className={'flex flex-col gap-4'}>
            <h2 className={'text-juiText-blue text-3xl font-bold'}>SliderDefault</h2>
            <div className={'flex flex-col gap-4'}>
              <h3 className={'my-3 text-base'}>SliderDefault test</h3>
              <strong>기본</strong>
              <div className={'flex flex-row gap-4'}>
                <div className={'flex flex-col gap-4'}>
                  <span className={'text-juiText-blue text-base font-bold'}>Integer - default </span>
                  <div
                    className={'flex flex-row gap-3 w-80'}
                    // Slider 의 부모에서 가로 길이 지정 필요.
                  >
                    <Slider
                      variant={'primary'}
                      min={tempStd}
                      max={tempMax3}
                      step={tempMax1}
                      orientation={'horizontal'}
                      defaultValue={[tempDefaultVal1]}
                      onValueChange={(e) => {
                        console.warn('Integer - horizontal - onValueChange => e :', e);
                      }}
                    />
                    {/*<SliderDefault*/}
                    {/*  defaultValue={[tempDefaultVal1]}*/}
                    {/*  min={tempStd}*/}
                    {/*  max={tempMax3}*/}
                    {/*  step={tempMax1}*/}
                    {/*  orientation={'horizontal'}*/}
                    {/*  onValueChange={(e) => {*/}
                    {/*    console.warn('Integer - SliderDefault - horizontal');*/}
                    {/*    console.warn('onValueChange => e :', e);*/}
                    {/*  }}*/}
                    {/*/>*/}
                  </div>
                  <div
                    className={'flex flex-row gap-3 w-100'}
                    // Slider 의 부모에서 가로 길이 지정 필요.
                  >
                    primary - test :
                    <Slider
                      disabled={false}
                      size={'large'}
                      variant={'custom'}
                      min={tempStd}
                      max={tempMax3}
                      step={tempMax1}
                      orientation={'horizontal'}
                      defaultValue={[tempDefaultVal1, 78, 99, 15]}
                      onValueChange={(e) => {
                        console.warn('Integer - horizontal - onValueChange => e :', e);
                      }}
                      // className="[--slider-color:#ac8fd1]"
                      // className="[--slider-color:oklch(0.7_0.1_304/200.86%)]" // 됨
                      // className="[--slider-color:hsl(266.26_42%_69%/0.7286)]" // 됨
                      className="[--slider-color:theme(colors.red.500)]"
                      // className="[--slider-color:var(--juiScore-veryLow)]"
                    />
                  </div>
                </div>
                <div className={cn(flexColBoxGap4)}>
                  <span className={'text-juiText-blue text-base font-bold'}>Float no defaultValue</span>
                  <div className={'flex flex-row gap-3'}>
                    <Slider
                      variant={'primary'}
                      min={tempMin2}
                      max={tempMin1}
                      step={tempMin2}
                      orientation={'horizontal'}
                      defaultValue={[tempMin3, tempDefaultVal2]}
                      onValueChange={(e) => {
                        console.warn('Float no defaultValue - onValueChange => e :', e);
                      }}
                      onValueCommit={(final) => {
                        console.warn('Float no defaultValue - onValueCommit => e :', final);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={cn(flexRowBoxGap4, '[&_div]:items-center [&_div]:justify-center')}>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}>Integer+Float</span>
                  <div className={'flex flex-row gap-3 h-30'}>
                    <Slider
                      min={tempMin3}
                      max={tempMax2}
                      step={tempMin2}
                      orientation={'vertical'}
                      defaultValue={[tempDefaultVal1, tempMax2]}
                      onValueChange={(e) => {
                        console.warn('Integer+Float - onValueChange => e :', e);
                      }}
                      onValueCommit={(final) => {
                        console.warn('Integer+Float - onValueCommit => e :', final);
                      }}
                    />
                  </div>
                </div>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}>Float - Uncontrolled</span>
                  <div className={'flex flex-row gap-3 h-30'}>
                    <Slider
                      variant={'secondary'}
                      min={tempMin3}
                      max={tempMax1}
                      step={tempMin3}
                      orientation={'vertical'}
                      // defaultValue={[tempDefaultVal2]}
                      defaultValue={[tempDefaultVal2, tempDefaultVal3]}
                      onValueChange={(e) => {
                        console.warn('Uncontrolled - onValueChange => e :', e);
                        setVal2(e);
                      }}
                      sliderRef={val2Ref}
                    />
                  </div>
                  <div>
                    <p className={cn(flexRowBoxGap4)}>defaultValue: {[tempDefaultVal2, tempDefaultVal3].join(', ')}</p>
                    <p className={cn(flexRowBoxGap4)}>
                      <span>val2Ref.current :</span>
                      <span>
                        {(val2Ref?.current || [])?.map((v2Current: number, idx: number) => (
                          <span key={v2Current}>
                            {v2Current}
                            {idx !== (val2Ref?.current || []).length && ', '}
                          </span>
                        ))}
                      </span>
                    </p>
                    <p className={cn(flexRowBoxGap4)}>
                      <span>val2 :</span>
                      <span>
                        {val2?.map((v2Current: number, idx: number) => (
                          <span key={v2Current}>
                            {v2Current}
                            {idx !== val2?.length && ', '}
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}>Integer - Controlled</span>
                  <div className={'flex flex-row gap-3 h-30'}>
                    <Slider
                      variant={'custom'}
                      min={tempStd}
                      max={tempMax4}
                      step={tempMax2}
                      orientation={'vertical'}
                      defaultValue={[tempDefaultVal1]}
                      value={val1}
                      onValueChange={(e) => {
                        console.warn('Controlled - onValueChange => e :', e);
                        setVal1(e);
                      }}
                      // className="[--slider-color:theme(colors.red.500)]"
                      className={'[--slider-color:theme(colors.pink.500)]'}
                    />
                  </div>
                  {val1?.map((v1) => <Input value={v1} key={v1} />)}
                </div>
              </div>
            </div>
          </div>
          <Separator orientation={'horizontal'} />
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
          <Separator orientation={'horizontal'} />
        </div>
      </section>
    </main>
  );
}
