'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@common/ui/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Avatar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  Separator,
} from '@common/ui';
import type { AccordionSingleItemProps } from '@common/ui/components/Accordion';
import {
  ChevronDownUpIcon,
  ChevronLeftRightIcon,
  ChevronRightLeftIcon,
  ChevronUpDownIcon,
  CornerDownLeftIcon,
} from '@common/ui/icons';
import ThemeToggle from '../../../components/ThemeToggle';

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
    {
      value: 'item-7',
      trigger: 'trigger-7',
      content: `content-7: tempClasses ${flexRowClass} ${alignCenterClass} ${mainBlueSubTit}`,
      disabled: false,
    },
    {
      value: 'item-8',
      trigger: 'trigger-8',
      content: `content-8: tempClasses ${flexRowClass} ${alignCenterClass} ${mainBlueSubTit}`,
      disabled: false,
    },
  ];

  const largeRef = useRef(null);
  const mediumRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
          <div className={'flex flex-col gap-4'}>
            <h2 className={'text-juiText-blue text-3xl font-bold'}>Collapsible</h2>
            <div className={'flex flex-col gap-4'}>
              <h3 className={'my-3 text-base'}>Collapsible test</h3>
              <div className={'flex flex-col gap-4'}>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}>Collapsible Demo</span>
                  <div className={'flex flex-row gap-3'}>
                    <CollapsibleRoot open={isOpen} onOpenChange={setIsOpen} className="flex w-[350px] flex-col gap-2">
                      <div className="flex items-center justify-between gap-4 px-4">
                        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
                        <CollapsibleTrigger asChild>
                          <Button variant="transparentGrey" size="small" className={''}>
                            <ChevronUpDownIcon />
                            <ChevronDownUpIcon />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
                      <CollapsibleContent className="flex flex-col gap-2">
                        <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
                      </CollapsibleContent>
                    </CollapsibleRoot>
                  </div>
                </div>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}>Collapsible assembled - with Preview</span>
                  <div className={'flex flex-row gap-3'}>
                    <Collapsible
                      trigger={
                        <Button variant={'transparent'}>
                          <ChevronLeftRightIcon />
                          <ChevronRightLeftIcon />
                        </Button>
                      }
                      preview={
                        <div className={cn('flex flex-row gap-2 items-center bg-red-200')}>
                          <Avatar
                            src={
                              'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'
                            }
                            fallback={'web test'}
                            size={'basic'}
                            shape={'square'}
                          />
                          <p>Avatar User Name</p>
                        </div>
                      }>
                      <div className={'flex flex-col gap-4 bg-lime-300'}>
                        <div className={'flex flex-row gap-4'}>
                          <Card
                          // onClick={() => setCount((prev) => (prev += 1))}
                          >
                            <CardHeader>
                              <CardTitle>Card Title 1</CardTitle>
                              <CardDescription>Card Description 1</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                              <p>Card Footer</p>
                            </CardFooter>
                          </Card>
                          <Card
                          // onClick={() => setCount((prev) => (prev += 1))}
                          >
                            <CardHeader>
                              <CardTitle>Card Title 2</CardTitle>
                              <CardDescription>Card Description 2</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                              <p>Card Footer</p>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                    </Collapsible>
                  </div>
                </div>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}>Collapsible assembled - no Preview</span>
                  <div className={'flex flex-row gap-3'}>
                    <Collapsible
                      trigger={
                        <Button variant={'transparent'}>
                          <ChevronUpDownIcon />
                        </Button>
                      }
                      preview={
                        <div className={cn('flex flex-row gap-2 items-center')}>
                          <Avatar
                            src={
                              'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'
                            }
                            fallback={'web test'}
                            size={'basic'}
                            shape={'square'}
                          />
                          <p>Avatar User Name</p>
                        </div>
                      }
                      showPreview={false}>
                      <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-row gap-4'}>
                          <Card
                          // onClick={() => setCount((prev) => (prev += 1))}
                          >
                            <CardHeader>
                              <CardTitle>Card Title 1</CardTitle>
                              <CardDescription>Card Description 1</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                              <p>Card Footer</p>
                            </CardFooter>
                          </Card>
                          <Card
                          // onClick={() => setCount((prev) => (prev += 1))}
                          >
                            <CardHeader>
                              <CardTitle>Card Title 2</CardTitle>
                              <CardDescription>Card Description 2</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                              <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                              <p>Card Footer</p>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                    </Collapsible>
                  </div>
                </div>
              </div>
              <h3 className={'my-3 text-base'}></h3>
              <div className={'flex flex-row gap-4'}>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}></span>
                  <div className={'flex flex-row gap-3'}></div>
                </div>
              </div>
            </div>
          </div>
          <Separator orientation={'horizontal'} />
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
                      collapsible={false}
                      items={accordionItems1.map((d) => ({ ...d, trigger: `basic-${d.trigger}` }))}
                    />
                  </div>
                  <Separator orientation={'vertical'} />
                  <div className={cn(flexColClass, alignCenterClass, 'flex-1 gap-4')}>
                    <h4>Accordion - medium(multiple)</h4>
                    <Accordion
                      type={'multiple'}
                      size={'medium'}
                      defaultValue={accordionItems1
                        .filter((d) => !d?.disabled)
                        .map((d) => d.value)
                        .slice(2, 5)}
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
                      items={accordionItems1.map((d) => ({ ...d, trigger: `large-${d.trigger}-triggerClass 추가` }))}
                      triggerClassName={'hover:text-red-700 focus:text-green-300'}
                      singleValueRef={largeRef}
                    />
                  </div>
                </div>
                <Accordion
                  type={'multiple'}
                  defaultValue={['item-3', 'item-5']}
                  items={accordionItems1}
                  multipleValuesRef={mediumRef}
                />
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
