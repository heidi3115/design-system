'use client';

import { Button, Tooltip, TooltipContainer, TooltipContent, TooltipTrigger, TooltipWrapper } from '@common/ui';
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
              </div>
            </div>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-3xl font-bold'}>Tooltip Test</span>
              <div className={'flex flex-row gap-20'}>
                <Tooltip trigger={<Button variant={'primary'}>small trigger</Button>} size={'small'}>
                  small Tooltip contents
                </Tooltip>
                <Tooltip trigger={<Button variant={'primary'}>medium trigger</Button>} size={'medium'}>
                  medium Tooltip contents
                </Tooltip>
                <Tooltip trigger={<Button variant={'primary'}>large trigger</Button>} size={'large'}>
                  large Tooltip contents
                </Tooltip>
              </div>
            </div>
            <div className={'flex flex-col gap-2'}>
              <span className={'text-3xl font-bold'}>TooltipParts Test</span>
              <div className={'flex flex-row gap-4'}>
                <TooltipWrapper>
                  <TooltipContainer
                    trigger={<Button variant={'secondary'}>TooltipParts btn trigger</Button>}
                    contentProps={{ size: 'medium' }}>
                    TooltipContainer test
                  </TooltipContainer>
                </TooltipWrapper>
                <TooltipWrapper>
                  <TooltipTrigger asChild>
                    <Button variant={'gradient'}>TooltipParts TooltipTrigger</Button>
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
