'use client';

import Link from 'next/link';
import { cn } from '@common/ui/lib/utils';
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger, Button } from '@common/ui';
import { CornerDownLeftIcon } from '@common/ui/icons';
import ThemeToggle from '../../../components/ThemeToggle';

export default function CollapsiblesPage() {
  const alignCenterClass = 'items-center justify-center';
  const flexColClass = 'flex flex-col';
  const flexRowClass = 'flex flex-row';
  const mainBlueTit = 'text-juiText-blue text-3xl font-bold text-center';
  const mainBlueSubTit = 'text-juiText-blue text-2xl font-bold text-center';

  const Line = () => <hr className={'mt-4 mb-4 text-juiText-primary'} style={{ width: '80%', height: '2px' }} />;

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
      <section className={cn(flexColClass, alignCenterClass, 'relative w-full')}>
        <h2 className={cn(mainBlueTit)}>Accordion</h2>
        <div className={cn(flexColClass, 'gap-4')}>
          <div className={cn(flexColClass, 'gap-4')}>
            <h3 className={cn(mainBlueSubTit)}>Accordion Demo</h3>
            <div className={cn(flexColClass, 'gap-4')}>
              <div className={cn(flexColClass, 'gap-4')}>
                <h4>Accordion Demo from shadcn</h4>
                <div className={cn(flexRowClass)}>
                  <AccordionRoot type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
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
                  </AccordionRoot>
                </div>
              </div>
              <div className={cn(flexColClass, 'gap-4')}>
                <h4>2</h4>
                <div className={cn(flexRowClass)}>2</div>
              </div>
            </div>
          </div>
        </div>
        <Line />
        <h2 className={cn(mainBlueTit)}>Collapsible</h2>
        <div className={cn(flexColClass, 'gap-4')}></div>
        <Line />
      </section>
    </main>
  );
}
