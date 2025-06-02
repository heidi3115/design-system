'use client';

import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
import { Button } from '@common/ui/components/Button';
import { CornerDownLeftIcon } from '@common/ui/icons';
import { Separator, separatorVariants } from '@common/ui/components/Separator';

const Line = () => <hr className={'mt-4 mb-4 text-juiText-primary'} style={{ width: '80%', height: '2px' }} />;

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
      <div className={'flex flex-col gap-4 items-center justify-center w-full'}>
        <h2 className={'text-juiText-blue text-3xl font-bold'}>Separators</h2>
        <div className={'flex flex-col gap-4 items-center justify-center w-full'}>
          <h3 className={'my-3 text-base'}>Content Title</h3>
          <strong className={'text-2xl'}>subtitle</strong>
          <div className={'flex flex-col gap-6 w-3/4'}>
            <div className={'flex flex-col gap-2 w-full'}>
              <span className={'text-juiText-blue text-base font-bold'}>SideBarTitle</span>
              <div className={'flex flex-row gap-3'}>
                <div className={'flex flex-col gap-4 text-juiText-primary font-bold text-base'}>
                  {(
                    Object.keys(
                      separatorVariants.variants.variant,
                    ) as (keyof typeof separatorVariants.variants.variant)[]
                  ).map((variant) => (
                    <div className={'flex flex-row'} key={variant}>
                      <Separator orientation={'vertical'} variant={variant} />
                      <span className={`text-juiText-${variant}`}>{variant} : 컨텐츠 타이틀(figma 참조)</span>
                    </div>
                  ))}
                </div>
              </div>
              <span className={'text-juiText-blue text-base font-bold'}>여러 개 분리 </span>
              <div className={'flex flex-row gap-3'}>
                <div className={'flex flex-row text-juiText-primary font-bold text-base'}>
                  <span>컨텐츠 타이틀(figma 참조)</span>
                  <Separator orientation={'vertical'} size={'medium'} decorative={false} />
                  <span>컨텐츠 타이틀(figma 참조)</span>
                  <Separator orientation={'vertical'} size={'medium'} />
                  <span>컨텐츠 타이틀(figma 참조)</span>
                </div>
              </div>
            </div>
            <div className={'flex flex-col gap-2 w-full'}>
              <span className={'text-juiText-blue text-base font-bold'}>분리선(부모가 w-full이 아닐 경우)</span>
              <div className={'flex flex-row gap-3'}>
                <div className={'flex flex-col text-juiText-primary font-bold text-base'}>
                  <div>위 아래 분리 1</div>
                  <Separator orientation={'horizontal'} />
                  <div>위 아래 분리 2</div>
                  <Separator orientation={'horizontal'} />
                  <div>위 아래 분리 3</div>
                </div>
              </div>
              <span className={'text-juiText-blue text-base font-bold'}>분리선(부모가 w-full 인 경우)</span>
              <div className={'flex flex-row gap-3'}>
                <div className={'flex flex-col w-full text-juiText-primary font-bold text-base'}>
                  <div>위 아래 분리 1</div>
                  <Separator orientation={'horizontal'} />
                  <div>위 아래 분리 2</div>
                  <Separator orientation={'horizontal'} />
                  <div>위 아래 분리 3</div>
                </div>
              </div>
            </div>
          </div>
          <h3 className={'my-3 text-base'}>Title</h3>
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
