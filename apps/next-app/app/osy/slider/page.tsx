'use client';

import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';
import { Button } from '@common/ui/components/Button';
import { CornerDownLeftIcon } from '@common/ui/icons';
import { Separator, Slider } from '@common/ui';

export default function SliderPage() {
  const tempStd = 0;
  // const tempMin1 = 0.1;
  // const tempMin2 = 0.001;
  // const tempMin3 = 0.000001;
  const tempMax1 = 1;
  // const tempMax2 = 10;
  const tempMax3 = 100;
  const tempDefaultVal1 = 33;
  // const tempDefaultVal2 = 0.37;

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
      <section className={'flex flex-col items-center justify-center size-full'}>
        <div className={'flex flex-col gap-4 items-center justify-center w-9/10 min-h-9/10'}>
          <div className={'flex flex-col gap-4'}>
            <h2 className={'text-juiText-blue text-3xl font-bold'}>SliderDefault</h2>
            <div className={'flex flex-col gap-4'}>
              <h3 className={'my-3 text-base'}>SliderDefault test</h3>
              <strong>기본</strong>
              <div className={'flex flex-row gap-4'}>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}>Integer</span>
                  <div className={'flex flex-row gap-3'}>
                    <Slider
                      defaultValue={[tempDefaultVal1]}
                      min={tempStd}
                      max={tempMax3}
                      step={tempMax1}
                      orientation={'horizontal'}
                      onValueChange={(e) => {
                        console.warn('Integer - SliderDefault - horizontal');
                        console.warn('onValueChange => e :', e);
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
                </div>
                {/*<div className={'flex flex-col gap-2'}>*/}
                {/*  <span className={'text-juiText-blue text-base font-bold'}>Float</span>*/}
                {/*  <div className={'flex flex-row gap-3'}>*/}
                {/*    <SliderDefault*/}
                {/*      defaultValue={[tempDefaultVal2]}*/}
                {/*      min={tempMin2}*/}
                {/*      max={tempMin1}*/}
                {/*      step={tempMin2}*/}
                {/*      orientation={'horizontal'}*/}
                {/*      onValueChange={(e) => {*/}
                {/*        console.warn('Float - SliderDefault - horizontal');*/}
                {/*        console.warn('onValueChange => e :', e);*/}
                {/*      }}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
              {/*<div className={'flex flex-row gap-4'}>*/}
              {/*  <div className={'flex flex-col gap-2'}>*/}
              {/*    <span className={'text-juiText-blue text-base font-bold'}>Integer+Float</span>*/}
              {/*    <div className={'flex flex-row gap-3'}>*/}
              {/*      <SliderDefault*/}
              {/*        defaultValue={[tempDefaultVal1]}*/}
              {/*        min={tempMin3}*/}
              {/*        max={tempMax2}*/}
              {/*        step={tempMin2}*/}
              {/*        orientation={'vertical'}*/}
              {/*        onValueChange={(e) => {*/}
              {/*          console.warn('Integer - SliderDefault - vertical');*/}
              {/*          console.warn('onValueChange => e :', e);*/}
              {/*        }}*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className={'flex flex-col gap-2'}>*/}
              {/*    <span className={'text-juiText-blue text-base font-bold'}>Float</span>*/}
              {/*    <div className={'flex flex-row gap-3'}>*/}
              {/*      <SliderDefault*/}
              {/*        defaultValue={[tempDefaultVal2]}*/}
              {/*        min={tempMin3}*/}
              {/*        max={tempMax2}*/}
              {/*        step={tempMin3}*/}
              {/*        orientation={'vertical'}*/}
              {/*        onValueChange={(e) => {*/}
              {/*          console.warn('Float - SliderDefault - vertical');*/}
              {/*          console.warn('onValueChange => e :', e);*/}
              {/*        }}*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
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
