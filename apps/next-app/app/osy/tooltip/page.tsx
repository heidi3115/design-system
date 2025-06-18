'use client';

import {
  Button,
  Tooltip,
  TooltipContainer,
  TooltipContent,
  TooltipTrigger,
  tooltipVariants,
  TooltipWrapper,
} from '@common/ui';
import Link from 'next/link';
import {
  AlertCircle2Icon,
  AlertTriangleFilledIcon,
  BarChartIcon,
  BellIcon,
  BookmarkIcon,
  CornerDownLeftIcon,
  QuestionCircleIcon,
} from '@common/ui/icons';
import ThemeToggle from '../../../components/ThemeToggle';
import { useState } from 'react';

const Line = () => <hr className={'mt-4 mb-4 text-juiText-primary'} style={{ width: '80%', height: '2px' }} />;
const sizeKeys = Object.keys(tooltipVariants.variants.size) as (keyof typeof tooltipVariants.variants.size)[];
const variantKeys = Object.keys(tooltipVariants.variants.variant) as (keyof typeof tooltipVariants.variants.variant)[];

const iconMap = {
  AlertCircle: <AlertCircle2Icon size={'small'} />,
  AlertTriangleFilled: <AlertTriangleFilledIcon size={'basic'} />,
  Bell: <BellIcon size={'medium'} />,
  Bookmark: <BookmarkIcon size={'large'} />,
  QuestionCircle: <QuestionCircleIcon className={'size-10'} />,
};

const iconKeys = Object.keys(iconMap) as (keyof typeof iconMap)[];

const LONG_TXT =
  'position: fixed; left: 0px; top: 0px; transform: translate(702px, 565px); min-width: max-content; \n--radix-popper-transform-origin: 103.00000000000004px 69px; will-change: transform; z-index: 10; --radix-popper-available-width: 1545px; --radix-popper-available-height: 629px; --radix-popper-anchor-width: 189.1328125px; --radix-popper-anchor-height: 36px;';

export default function TooltipPage() {
  // const testRef = useRef(null);
  const [sizeTooltipOpenStatus, setSizeTooltipOpenStatus] = useState<boolean[]>(() =>
    Array(sizeKeys.length).fill(false),
  );
  const [sizeLinkTooltipOpenStatus, setSizeLinkTooltipOpenStatus] = useState<boolean[]>(() =>
    Array(sizeKeys.length).fill(false),
  );
  const [variantTooltipOpenStatus, setVariantTooltipOpenStatus] = useState<boolean[]>(() =>
    Array(variantKeys.length).fill(false),
  );
  const [isIconTooltipOpen, setIsIconTooltipOpen] = useState(Object.fromEntries(iconKeys.map((k) => [k, false])));

  const handleVariantToggle = (idx: number) => {
    setVariantTooltipOpenStatus((prev) => prev.map((open, i) => (i === idx ? !open : open)));
  };

  return (
    <section className={'flex flex-col gap-5'}>
      <div>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/" title={'to main'}>
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <div className={'flex flex-col gap-4 items-center justify-center w-11/12'}>
        <h1 className={'my-3 text-5xl font-bold'}>Tooltip</h1>
        <h3 className={'my-3 text-4xl font-bold'}>Tooltip with Basic Components</h3>
        <div className={'flex flex-col gap-4 items-center'}>
          <strong className={'text-juiText-blue text-2xl font-bold'}>Icons</strong>
          <div className={'flex flex-col gap-4 items-center'}>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-3xl font-bold'}></span>
              <div className={'flex flex-row gap-3'}>
                {iconKeys.map((key) => (
                  <Tooltip
                    disabled={false}
                    key={key}
                    variant="error"
                    size="small"
                    textAlign={'center'}
                    open={isIconTooltipOpen[key]}
                    onOpenChange={(open) =>
                      setIsIconTooltipOpen((prev) => ({
                        ...prev,
                        [key]: open,
                      }))
                    }
                    contents={`${key}`}
                    side="top">
                    <span
                    // onClick={() =>
                    //   setIsIconTooltipOpen((prev) => ({
                    //     ...prev,
                    //     [key]: !isIconTooltipOpen[key],
                    //   }))
                    // }
                    >
                      {iconMap[key]}
                    </span>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
          <Line />
          <strong className={'text-juiText-blue text-2xl font-bold'}>Button</strong>
          <div className={'flex flex-col gap-4 items-center'}>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-3xl font-bold'}></span>
              <div className={'flex flex-row gap-3'}>
                <Button>basic Btn</Button>
              </div>
            </div>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-3xl font-bold'}>Tooltip Test</span>
              <div className={'flex flex-col gap-5 items-center'}>
                <h2 className={'text-juiText-blue text-2xl font-semibold'}>size comparison</h2>
                <div className={'flex flex-row gap-6'}>
                  {sizeKeys.map((size, idx) => {
                    if (size === 'default') return null;

                    const duration = (idx + 4) * 100;

                    return (
                      <div key={size} className="flex flex-col gap-4 items-center justify-center">
                        <span className={'text-base font-bold text-juiText-blue'}>{size}</span>
                        <Tooltip
                          size={size}
                          delayDuration={duration}
                          fadeOut={true}
                          open={sizeTooltipOpenStatus[idx]}
                          onOpenChange={() =>
                            setSizeTooltipOpenStatus((prev) => prev.map((open, i) => (i === idx ? !open : open)))
                          }
                          contents={`${size} : Tooltip 내용입니다. ${LONG_TXT}`}>
                          <Button variant={'primary'} size={size === 'custom' ? 'basic' : size} type="button">
                            {size} toggle duration={duration}
                          </Button>
                        </Tooltip>
                        <span className="text-gray-500 text-sm">
                          현재 상태: {sizeTooltipOpenStatus[idx] ? '열림' : '닫힘'}
                          duration={duration} | fadeOut={true}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <span className={'text-3xl font-bold'}>Toggle Test</span>
              <div className={'flex flex-col gap-5 items-center w-7/8'}>
                <h2>variant comparison</h2>
                <div className={'grid grid-rows-2 grid-flow-col gap-x-6 gap-y-50'}>
                  {variantKeys.map((variant, idx) => (
                    <div key={variant} className="flex flex-col gap-4 items-center justify-center">
                      <span className={'text-base font-bold text-juiText-blue'}>{variant}</span>
                      <Tooltip
                        open={variantTooltipOpenStatus[idx]}
                        size={'medium'}
                        variant={variant}
                        contents={`${variant} : Tooltip 내용입니다. \ncustom일 시, className에 bg-lime-400 text-zinc-800를 적용했습니다.\n${LONG_TXT}`}
                        className={variant === 'custom' ? `bg-lime-400 text-zinc-800 ` : ''}>
                        <Button
                          variant={'secondary'}
                          size={'large'}
                          onClick={() => handleVariantToggle(idx)}
                          type="button">
                          {variant} Tooltip toggle
                        </Button>
                      </Tooltip>
                      <span className="text-gray-500 text-sm">
                        현재 상태: {variantTooltipOpenStatus[idx] ? '열림' : '닫힘'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Line />
          <strong className={'text-juiText-primary text-3xl font-bold'}>Link</strong>
          <div className={'flex flex-row gap-4'}>
            <div className={'flex flex-col gap-2 items-center'}>
              <h2 className={'text-juiText-blue text-2xl font-semibold'}>size comparison</h2>
              <div className={'flex flex-col gap-3'}>
                <div className={'flex flex-row gap-6 items-center'}>
                  {sizeKeys.map((size, idx) => (
                    <div key={size} className="flex flex-col flex-1 gap-4 items-center justify-center">
                      <span className={'text-base font-bold text-juiText-blue'}>{size}</span>
                      <Tooltip
                        size={size}
                        variant={'primary'}
                        delayDuration={idx * 100}
                        fadeOut={true}
                        contents={`${size} : Tooltip 내용입니다. ${LONG_TXT}`}
                        open={sizeLinkTooltipOpenStatus[idx]}
                        onOpenChange={() =>
                          setSizeLinkTooltipOpenStatus((prev) => prev.map((open, i) => (i === idx ? !open : open)))
                        }>
                        <Link
                          href={'./'}
                          className={
                            'flex items-center justify-start text-base text-center font-semibold hover:text-juiStatus-complete'
                          }>
                          <BarChartIcon /> Link : {size} - duration={idx * 100} fadeOut={true}
                        </Link>
                      </Tooltip>
                      <span className="text-gray-500 text-sm">
                        현재 상태: {sizeTooltipOpenStatus[idx] ? '열림' : '닫힘'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Line />
          <div className={'flex flex-col gap-2 items-center'}>
            <span className={'text-3xl font-bold'}>TooltipParts Test</span>
            <div className={'flex flex-row gap-4'}>
              <TooltipWrapper>
                <TooltipContainer
                  contents={`TooltipContainer test - fadeOut: true`}
                  portalProps={{ fadeOut: true }}
                  contentProps={{ size: 'medium' }}>
                  <Button variant={'secondary'}>TooltipWrapper & TooltipContainer with fadeOut</Button>
                </TooltipContainer>
              </TooltipWrapper>
              <TooltipWrapper>
                <TooltipTrigger asChild>
                  <Button variant={'gradient'}>TooltipWrapper & TooltipTrigger & TooltipContent</Button>
                </TooltipTrigger>
                <TooltipContent>TooltipParts - TooltipContent</TooltipContent>
              </TooltipWrapper>
            </div>
          </div>
          <Line />
        </div>
      </div>
    </section>
  );
}
