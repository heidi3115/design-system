'use client';

import Link from 'next/link';
import { cn } from '@common/ui/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Button,
  Separator,
} from '@common/ui';
import { CornerDownLeftIcon } from '@common/ui/icons';
import ThemeToggle from '../../../components/ThemeToggle';
import { AccordionSingleItemProps } from '@common/ui/components/Accordion';

export default function CollapsiblesPage() {
  const alignCenterClass = 'items-center justify-center';
  const flexColClass = 'flex flex-col w-full h-full';
  const flexRowClass = 'flex flex-row w-full h-full';
  const mainBlueTit = 'text-juiText-blue text-3xl font-bold text-center';
  const mainBlueSubTit = 'text-juiText-blue text-xl text-center';

  const accordionItems1: AccordionSingleItemProps[] = [
    {
      value: 'item-1',
      trigger: 'trigger-1',
      content: `content-1: \ntempClasses ${flexRowClass} ${alignCenterClass} ${mainBlueSubTit}`,
      disabled: false,
    },
    {
      value: 'item-2',
      trigger: 'trigger-2',
      content: `content-2: <br/>tempClasses ${flexRowClass} ${alignCenterClass} ${mainBlueSubTit}`,
      disabled: false,
    },
    {
      value: 'item-3',
      trigger: 'trigger-3',
      content: `content-3: \ntempClasses ${flexRowClass} ${alignCenterClass} ${mainBlueSubTit}`,
      disabled: false,
    },
    {
      value: 'item-4',
      trigger: 'trigger-4 : disabled',
      content: `disabled\ncontent-4: tempClasses ${flexRowClass} ${alignCenterClass} ${mainBlueSubTit}`,
      disabled: true,
    },
    {
      value: 'item-5',
      trigger: 'trigger-5',
      content: `content-5: tempClasses ${flexRowClass} ${alignCenterClass} ${mainBlueSubTit}`,
      disabled: false,
    },
    {
      value: 'item-6',
      trigger: 'trigger-6',
      content: `content-6: tempClasses ${flexRowClass} ${alignCenterClass} ${mainBlueSubTit}`,
      disabled: false,
    },
  ];

  return (
    <main className={'relative w-full'}>
      <div className={'relative'}>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/" title={'to main'}>
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <section className={cn(flexColClass, alignCenterClass, 'relative w-full min-w-full h-full min-h-9/10')}>
        <div className={cn(flexColClass, alignCenterClass, 'gap-4 w-full h-full')}>
          <h2 className={cn(mainBlueTit)}>Accordion</h2>
          <div className={cn(flexColClass, alignCenterClass, 'gap-4 w-full h-full')}>
            <h3 className={cn(mainBlueSubTit)}>Accordion Demo</h3>
            <div className={cn(flexColClass, alignCenterClass, 'gap-4 w-9/10 h-full min-h-[200px]')}>
              <div className={cn(flexColClass, alignCenterClass, 'gap-4 w-full h-full')}>
                <h4>Accordion Demo from shadcn</h4>
                <div className={cn(flexRowClass, alignCenterClass)}>
                  <AccordionRoot type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible? 1</AccordionTrigger>
                      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it accessible? 2</AccordionTrigger>
                      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern. 2</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" disabled={true}>
                      <AccordionTrigger>Is it accessible? 3 : disabled</AccordionTrigger>
                      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern. 3 : disabled</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Is it accessible? 4</AccordionTrigger>
                      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern. 4</AccordionContent>
                    </AccordionItem>
                  </AccordionRoot>
                </div>
              </div>
              <Separator orientation={'horizontal'} />
              <div className={cn(flexColClass, 'gap-4 w-full h-full')}>
                <h3 className={cn(mainBlueSubTit)}>Accordion custom(single type)</h3>
                <div className={cn(alignCenterClass, flexRowClass, 'gap-6 w-full h-full min-h-[200px]')}>
                  <div className={cn(flexColClass, alignCenterClass, 'flex-1 gap-4')}>
                    <h4>Accordion - small</h4>
                    <Accordion
                      type={'single'}
                      size={'small'}
                      items={accordionItems1.map((d) => ({ ...d, trigger: `small-${d.trigger}` }))}
                    />
                  </div>
                  <Separator orientation={'vertical'} className={'min-h-full'} />
                  <div className={cn(flexColClass, alignCenterClass, 'flex-1 gap-4')}>
                    <h4>Accordion - basic</h4>
                    <Accordion
                      type={'single'}
                      size={'basic'}
                      items={accordionItems1.map((d) => ({ ...d, trigger: `basic-${d.trigger}` }))}
                    />
                  </div>
                  <Separator orientation={'vertical'} />
                  <div className={cn(flexColClass, alignCenterClass, 'flex-1 gap-4')}>
                    <h4>Accordion - medium</h4>
                    <Accordion
                      type={'single'}
                      size={'medium'}
                      defaultValue={accordionItems1[2]?.value}
                      collapsible={false}
                      items={accordionItems1.map((d) => ({ ...d, trigger: `medium-${d.trigger}` }))}
                    />
                  </div>
                  <Separator orientation={'vertical'} />
                  <div className={cn(flexColClass, alignCenterClass, 'flex-1 gap-4')}>
                    <h4>Accordion - large</h4>
                    <Accordion
                      type={'single'}
                      size={'large'}
                      defaultValue={accordionItems1[2]?.value}
                      collapsible={true}
                      items={accordionItems1.map((d) => ({ ...d, trigger: `large-${d.trigger}` }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator orientation={'horizontal'} />
        <h2 className={cn(mainBlueTit)}>Collapsible</h2>
        <div className={cn(flexColClass, alignCenterClass, 'gap-4 w-9/10 h-full')}>
          <Separator orientation={'horizontal'} />
        </div>
      </section>
    </main>
  );
}
