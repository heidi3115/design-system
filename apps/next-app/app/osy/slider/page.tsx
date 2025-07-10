'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';
import { cn } from '@common/ui/lib/utils';
import { Button, Separator, Slider } from '@common/ui';
import { CornerDownLeftIcon } from '@common/ui/icons';

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
  const blueTitleClass = 'text-juiText-blue font-bold';

  const val2Ref = useRef(null);
  const [val1, setVal1] = useState<number[]>([130, 650]);
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
          <div className={cn(flexColBoxGap4)}>
            <h2 className={cn(blueTitleClass, 'text-3xl')}>Slider</h2>
            <div className={cn(flexColBoxGap4, 'size-full')}>
              <h3 className={cn(blueTitleClass, 'text-xl my-3')}>Slider test</h3>
              <strong>기본</strong>
              <div className={cn(flexColBoxGap4, 'size-full')}>
                <div className={cn(flexColBoxGap4)}>
                  <span className={cn(blueTitleClass, 'text-base')}>Integer - default [6, 11]</span>
                  <div className={cn(flexRowBoxGap4)}>
                    <div
                      className={cn('relative flex flex-col gap-15', 'w-100 mb-5')}
                      // Slider 의 부모에서 가로 길이 지정 필요.
                    >
                      <Slider
                        variant={'primary'}
                        size={'large'}
                        min={tempStd}
                        max={50}
                        step={5}
                        marks={Array.from({ length: 50 / 5 }, (_, idx) => ({
                          value: idx * 5,
                          label: `${idx * 5} %`,
                        }))}
                        orientation={'horizontal'}
                        showValueLabel={'always'}
                        defaultValue={[5, 15]}
                        // disabled
                      />
                      <Slider
                        variant={'primary'}
                        size={'large'}
                        min={tempStd}
                        max={50}
                        step={5}
                        marks={Array.from({ length: 50 / 5 }, (_, idx) => ({
                          value: idx * 5,
                          label: `${idx * 5} %`,
                          labelClass: idx % 2 === 0 ? 'text-red-500' : '',
                        }))}
                        orientation={'horizontal'}
                        showValueLabel={'always'}
                        defaultValue={[5, 15]}
                        // disabled
                      />
                    </div>
                    <div
                      className={cn('relative flex flex-row gap-10', 'h-100 mb-5')}
                      // Slider 의 부모에서 가로 길이 지정 필요.
                    >
                      <Slider
                        variant={'primary'}
                        size={'large'}
                        min={tempStd}
                        max={50}
                        step={5}
                        marks={Array.from({ length: 50 / 5 }, (_, idx) => ({
                          value: idx * 5,
                          label: `${idx * 5} %`,
                        }))}
                        orientation={'vertical'}
                        showValueLabel={'always'}
                        defaultValue={[5, 15]}
                        // disabled
                      />
                      <Slider
                        variant={'primary'}
                        size={'large'}
                        min={tempStd}
                        max={50}
                        step={5}
                        marks={Array.from({ length: 50 / 5 }, (_, idx) => ({
                          value: idx * 5,
                          label: `${idx * 5} %`,
                          labelClass: idx % 2 === 0 ? 'text-red-500' : '',
                        }))}
                        orientation={'vertical'}
                        showValueLabel={'always'}
                        defaultValue={[5, 15]}
                        // disabled
                      />
                    </div>
                  </div>
                  <span className={cn(blueTitleClass, 'text-base')}>Integer - default [15, 30]</span>
                  <div
                    className={cn(flexRowBoxGap4, 'w-80 h-100 mb-5 gap-0')}
                    // Slider 의 부모에서 가로 길이 지정 필요.
                  >
                    <Slider
                      variant={'primary'}
                      size={'large'}
                      min={tempStd}
                      max={tempMax3}
                      step={tempMax1}
                      orientation={'vertical'}
                      showValueLabel={'auto'}
                      defaultValue={[10, tempDefaultVal1]}
                    />
                    <Slider
                      variant={'primary'}
                      size={'large'}
                      min={tempStd}
                      max={tempMax3}
                      step={tempMax1}
                      orientation={'vertical'}
                      showValueLabel={'auto'}
                      defaultValue={[tempDefaultVal1, 60]}
                    />
                  </div>
                  <span className={cn(blueTitleClass, 'text-base')}>Integer - default [10, 30]</span>
                  <div
                    className={cn(flexRowBoxGap4, 'w-80 mb-5')}
                    // Slider 의 부모에서 가로 길이 지정 필요.
                  >
                    <Slider
                      variant={'primary'}
                      size={'medium'}
                      min={tempStd}
                      max={tempMax3}
                      step={10}
                      orientation={'horizontal'}
                      showValueLabel={'always'}
                      minStepsBetweenThumbs={10}
                      defaultValue={[tempMax2, tempDefaultVal1]} // tempMax2 = 10, tempDefaultVal1 = 30
                    />
                  </div>
                  <div
                    className={cn(flexRowBoxGap4, 'w-100')}
                    // Slider 의 부모에서 가로 길이 지정 필요.
                  >
                    primary - test :
                    <Slider
                      disabled={false}
                      size={'large'}
                      variant={'custom'}
                      showValueLabel={'always'}
                      min={tempStd}
                      max={tempMax3}
                      step={tempMax1}
                      orientation={'horizontal'}
                      defaultValue={[tempDefaultVal1, 78, 99, 15]}
                      // className="[--slider-color:#ac8fd1]"
                      // className="[--slider-color:oklch(0.7_0.1_304/200.86%)]" // 됨
                      // className="[--slider-color:hsl(266.26_42%_69%/0.7286)]" // 됨
                      className="[--slider-color:theme(colors.red.500)]"
                      // className="[--slider-color:var(--juiScore-veryLow)]"
                    />
                  </div>
                </div>
                <div className={cn(flexColBoxGap4)}>
                  <span className={cn(blueTitleClass, 'text-base')}>Float no defaultValue w. marks</span>
                  <div className={cn(flexRowBoxGap4, 'py-10')}>
                    <Slider
                      size={'large'}
                      variant={'primary'}
                      min={tempMin2}
                      max={tempMax1}
                      step={tempMin1}
                      marks
                      unitLabel={'°C'}
                      showValueLabel={'auto'}
                      orientation={'horizontal'}
                      defaultValue={[tempMin3, tempDefaultVal2]}
                    />
                  </div>
                </div>
              </div>
              <div className={cn(flexRowBoxGap4, '[&_div]:items-center [&_div]:justify-center')}>
                <h3 className={cn(blueTitleClass, 'text-xl my-3')}>Slider disabled & uncontrolled & controlled</h3>
                <div className={'flex flex-col gap-2'}>
                  <span className={cn(blueTitleClass, 'text-base')}>{`Integer+Float -> disabled`}</span>
                  <div className={cn(flexRowBoxGap4, 'h-30')}>
                    <Slider
                      disabled={true}
                      min={tempMin3}
                      max={tempMax2}
                      step={tempMin2}
                      orientation={'vertical'}
                      defaultValue={[tempDefaultVal1, tempMax2]}
                    />
                  </div>
                </div>
                <div className={cn(flexColBoxGap4)}>
                  <span className={cn(blueTitleClass, 'text-base')}>Float - Uncontrolled</span>
                  <div className={cn(flexRowBoxGap4, 'h-30')}>
                    <Slider
                      variant={'secondary'}
                      min={tempMin3}
                      max={tempMax1}
                      step={tempMin3}
                      orientation={'vertical'}
                      // defaultValue={[tempDefaultVal2]}
                      defaultValue={[tempDefaultVal2, tempDefaultVal3]}
                      onValueChange={(e) => setVal2(e)}
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
                  <span className={'text-juiText-blue text-base font-bold'}>Integer - Controlled : inverted</span>
                  <div className={'flex flex-row gap-3 h-30'}>
                    <Slider
                      variant={'custom'}
                      min={tempStd}
                      max={tempMax4}
                      step={tempMax2}
                      orientation={'vertical'}
                      value={val1}
                      onValueChange={(e) => setVal1(e)}
                      inverted={true}
                      showValueLabel={'always'}
                      // className="[--slider-color:theme(colors.red.500)]"
                      className={'[--slider-color:theme(colors.pink.500)]'}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h2 className={cn(blueTitleClass, 'text-3xl')}>Slider</h2>
            <div className={cn(flexColBoxGap4, commonBoxClass, 'size-full')}>
              <h3 className={cn(blueTitleClass, 'text-xl my-3')}>Slider test</h3>
              <div
                className={cn(
                  flexRowBoxGap4,
                  // '[&_div]:items-center [&_div]:justify-center'
                )}>
                <div className={cn(flexColBoxGap4, 'w-50')}>
                  <strong className={cn('text-base')}>Slider - horizontal</strong>
                  <Slider orientation={'horizontal'} min={0.1} max={10} step={0.001} showValueLabel={'always'} />
                </div>
                <div className={cn(flexColBoxGap4, 'h-100')}>
                  <strong className={cn('text-base')}>Slider - vertical</strong>
                  <Slider
                    orientation={'vertical'}
                    disabled={false}
                    showValueLabel={'auto'}
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[15, 20]}
                    minStepsBetweenThumbs={5}
                  />
                  <Slider
                    orientation={'horizontal'}
                    disabled={false}
                    showValueLabel={'auto'}
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[15, 20]}
                    minStepsBetweenThumbs={5}
                  />
                </div>
                <div className={cn(flexColBoxGap4, 'h-50')}>
                  <strong className={cn('text-base')}>SliderDefault - horizontal</strong>
                  <Slider
                    orientation={'horizontal'}
                    disabled={false}
                    min={1}
                    max={100}
                    step={5}
                    defaultValue={[5, 15]}
                  />
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
