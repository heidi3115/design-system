'use client';

import { Button, TooltipContent, TooltipTrigger, TooltipWrapper } from '@common/ui';
import Link from 'next/link';
import { CornerDownLeftIcon } from '@common/ui/icons';
import ThemeToggle from '../../../components/ThemeToggle';

const Line = () => <hr className={'mt-4 mb-4 text-juiText-primary'} style={{ width: '80%', height: '2px' }} />;

export default function TooltipPage() {
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
        <div className={'flex flex-col gap-4'}>
          <h3 className={'my-3 text-4xl font-bold'}>Tooltip with Basic Components</h3>
          <strong className={'text-juiText-blue text-xl font-bold'}>Button</strong>
          <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-3xl font-bold'}></span>
              <div className={'flex flex-row gap-3'}>
                <Button>basic Btn</Button>
                {/*<Tooltip trigger={<Button>basic Btn with Tooltip</Button>}>hover Btn</Tooltip>*/}
              </div>
            </div>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-3xl font-bold'}>TooltipParts</span>
              <div className={'flex flex-row gap-3'}>
                {/*<Button>basic Btn</Button>*/}
                {/*<Tooltip trigger={<Button>BasicTooltip trigger</Button>}>BasicTooltip - hover Btn</Tooltip>*/}
                {/*<Tooltip contents={'BasicTooltip - BasicTooltipContent'}>*/}
                {/*  <Button>BasicTooltip trigger</Button>*/}
                {/*</Tooltip>*/}
                <TooltipWrapper>
                  <TooltipTrigger asChild>
                    <Button>TooltipParts trigger</Button>
                  </TooltipTrigger>
                  <TooltipContent>TooltipParts - TooltipContent</TooltipContent>
                </TooltipWrapper>
              </div>
            </div>
          </div>
          <Line />
          <strong className={'text-juiText-blue text-xl font-bold'}>Link</strong>
          <div className={'flex flex-row gap-4'}>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-3xl font-bold'}></span>
              <div className={'flex flex-row gap-3'}>
                <Link href={'./'}>basic Link</Link>
                {/*<Tooltip trigger={<Link href={'./'}>basic Link with Tooltip</Link>}>Link trigger Tooltip</Tooltip>*/}
              </div>
            </div>
          </div>
          <Line />
        </div>
      </div>
    </section>
  );
}
