'use client';

import { useState } from 'react';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@common/ui';

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
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export default function Page() {
  const [count, setCount] = useState('1');

  useUpdateEffect(() => {
    alert(count);
  }, [count]);

  return (
    <section className="flex items-center justify-center w-full min-h-svh">
      <ThemeToggle />
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-juiGrey-400 text-5xl font-bold hover:text-white">JUI Design Gallery</h1>
        <div className={'flex flex-col gap-4 items-center justify-center'}>
          <h2 className={'text-juiText-blue'}>Buttons</h2>
          <Button asChild variant={'primary'} size={'large'}>
            <Link href="/osy/button">to Button Gallery</Link>
          </Button>
        </div>
        <div className={'flex flex-col gap-4 items-center justify-center'}>
          <h2 className={'text-juiText-blue'}>Badges</h2>
          <Button asChild variant={'primary'} size={'large'}>
            <Link href="/osy/badge">to Badges Gallery</Link>
          </Button>
        </div>
        <div className={'flex flex-col gap-4 items-center justify-center'}>
          <h2 className={'text-juiText-blue'}>Tooltips</h2>
          <Button asChild variant={'secondary'} size={'large'}>
            <Link href="/osy/tooltip">to Tooltip Gallery</Link>
          </Button>
        </div>
        <div className={'flex flex-col gap-4 items-center justify-center'}>
          <h2 className={'text-juiText-blue'}>Collapsible Components(Accordion, Collasible)</h2>
          <Button asChild variant={'primary'} size={'large'}>
            <Link href="/osy/collapsibles">to Collapsibles Gallery</Link>
          </Button>
        </div>
        <div className="flex justify-between items-center gap-5">
          <Card onClick={() => setCount((prev) => (prev += 1))}>
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
