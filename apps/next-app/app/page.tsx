'use client';

import { useState } from 'react';

import {
  Badge,
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@common/ui';

import { useUpdateEffect } from '@common/utils';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  BarChartIcon,
  BookmarkIcon,
  CalendarIcon,
  ChevronUpIcon,
  ClockIcon,
  CornerDownLeftIcon,
  CornerDownRightIcon,
  ExternalLinkIcon,
  EyeIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  HomeIcon,
  InfoIcon,
  LayersIcon,
  ListIcon,
  LockIcon,
  LogInIcon,
  MailIcon,
  MaximizeIcon,
  Minimize2Icon,
  MinusCircleIcon,
  MoreHorizontalIcon,
  PaperClipIcon,
  PlayIcon,
  PlusCircleIcon,
  PlusIcon,
  PlusSquareIcon,
  PrinterIcon,
  QuestionCircleIcon,
  RepeatIcon,
  RotateIcon,
  SaveIcon,
  ServerIcon,
  SettingsIcon,
  SquareIcon,
  StarIcon,
  TagIcon,
  Trash2Icon,
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
  XCircleIcon,
  XIcon,
  ZoomInIcon,
} from '@common/ui/icons';

export default function Page() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    alert(count);
  }, [count]);

  return (
    <section className="flex items-center justify-center w-full min-h-svh">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-juiGrey-400 text-5xl font-bold hover:text-white">JUI Design Gallery</h1>
        <div className={'flex flex-col gap-4 items-center justify-center'}>
          <h2 className={'text-juiText-blue text-3xl font-bold'}>Buttons</h2>
          <div className={'flex flex-col gap-4'}>
            <h3 className={'text-juiText-blue text-lg font-bold'}>Colors(variant)</h3>
            <div className={'flex gap-4 flex-row items-center justify-center'}>
              {(
                Object.keys(buttonVariants.variants.variant) as Array<keyof typeof buttonVariants.variants.variant>
              ).map((variant) => (
                <Button key={variant} variant={variant} size={'basic'} onClick={() => setCount((prev) => (prev += 1))}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
          <div className={'flex flex-col gap-4'}>
            <h3 className={'text-juiText-blue text-lg font-bold'}>Size</h3>
            <div className={'flex flex-row gap-4 items-center justify-center'}>
              {(
                Object.keys(buttonVariants.variants.variant) as Array<keyof typeof buttonVariants.variants.variant>
              ).map((variant) => {
                return (
                  <div key={variant} className={'flex flex-col gap-4'}>
                    {(
                      Object.keys(buttonVariants.variants.size) as Array<keyof typeof buttonVariants.variants.size>
                    ).map((size) => (
                      <Button
                        key={`${variant}-${size}`}
                        variant={variant}
                        size={size}
                        onClick={() => setCount((prev) => (prev += 1))}>
                        {size !== 'small' ? (
                          <>
                            {variant === 'transparentGrey' && size}
                            <ZoomInIcon
                              size={'small'}
                              color={variant === 'transparentGrey' ? 'custom' : undefined}
                              className={variant === 'transparentGrey' ? 'fill-current' : ''}
                            />
                            {variant !== 'transparentGrey' && size}
                          </>
                        ) : (
                          size
                        )}
                      </Button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={'flex flex-col gap-4'}>
            <h3 className={'text-juiText-blue text-lg font-bold'}>Status</h3>
            <div className={'flex flex-row gap-5 items-center justify-center'}>
              <div className={''}>
                <h4 className={'my-3 text-base'}>Login</h4>
                <Button variant={'gradient'} size={'large'} className={'w-[400px] h-[60px]'}>
                  <LogInIcon />
                  <span className={'font-bold text-2xl'}>Login</span>
                </Button>
              </div>
              <div className={''}>
                <h4 className={'my-3 text-base'}>Search</h4>
                <Button variant={'gradient'} size={'large'} className={'w-[160px] h-[40px]'}>
                  <PlusIcon />
                  <span className={'font-bold text-base'}>Search</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-4 items-center justify-center'}>
          <h2 className={''}>Badges</h2>
          <div className={'flex gap-4 items-center justify-center'}>
            <Badge className="text-juiStatus-urgency">
              {count} <CornerDownRightIcon className="stroke-juiSecondary" />
              {count} <CornerDownRightIcon className="fill-juiSecondary" />
              {count} <CornerDownRightIcon className="fill-current" />
            </Badge>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
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
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
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
        <div className={'grid grid-cols-10 gap-4'}>
          <CalendarIcon color="var(--juiPrimary)" />
          <ClockIcon variant="secondary" />
          <ArrowLeftIcon fill="var(--juiError)" />
          <GlobeIcon variant="default" />
          <LockIcon variant="disabled" />
          <ZoomInIcon color="var(--juiStatus-progress)" />
          <XIcon color="var(--juiStatus-complete)" />
          <TagIcon fill="var(--juiStatus-failed)" />
          <UserIcon color="var(--juiStatus-info)" />
          <HomeIcon fill="var(--juiStatus-alert)" />
          <EyeIcon size="small" />
          <FilePlusIcon size="basic" />
          <FileTextIcon size="medium" />
          <ListIcon size="large" />
          <InfoIcon size="small" />
          <ChevronUpIcon size="basic" />
          <ExternalLinkIcon size="medium" />
          <UserMinusIcon size="large" />
          <UserPlusIcon />
          <StarIcon />
          <RotateIcon />
          <QuestionCircleIcon />
          <RepeatIcon />
          <SaveIcon />
          <SquareIcon />
          <PrinterIcon />
          <ServerIcon />
          <SettingsIcon />
          <Trash2Icon />
          <XCircleIcon />
          <AlertCircleIcon />
          <BookmarkIcon />
          <BarChartIcon />
          <LayersIcon />
          <CornerDownLeftIcon />
          <MoreHorizontalIcon />
          <MailIcon />
          <MaximizeIcon />
          <MinusCircleIcon />
          <Minimize2Icon />
          <PlayIcon />
          <PaperClipIcon />
          <PlusCircleIcon />
          <PlusSquareIcon />
          <PlusIcon />
        </div>
      </div>
    </section>
  );
}
