'use client';

import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
} from '@common/ui';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  BarChartIcon,
  BookmarkIcon,
  CalendarIcon,
  ChevronUpIcon,
  ClockIcon,
  EditIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  HomeIcon,
  // InBoxIcon,
  InfoIcon,
  LayersIcon,
  LayoutIcon,
  ListIcon,
  LockIcon,
  LogInIcon,
  MailIcon,
  Maximize2Icon,
  MaximizeIcon,
  Minimize2Icon,
  MinusCircleIcon,
  MoreHorizontalIcon,
  PaperClipIcon,
  PlayIcon,
  PlusCircleIcon,
  PlusIcon,
  PrinterIcon,
  QuestionCircleIcon,
  RepeatIcon,
  RotateIcon,
  SaveIcon,
  ServerIcon,
  SettingsIcon,
  SideBarIcon,
  SlashIcon,
  SquareIcon,
  StarIcon,
  TagIcon,
  Trash2Icon,
  TrashIcon,
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
  XCircleIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@common/ui/icons';

import { useUpdateEffect } from '@common/utils';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@common/ui/components/AlertDialog/AlertDialog';
// import LogInIcon from '@common/ui/icons/Icon/LogInIcon';
// import CournerDownRightIcon from '@common/ui/icons/Icon/CournerDownRightIcon';
// import MailIcon from '@common/ui/icons/Icon/MailIcon';

export default function Page() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    alert(count);
  }, [count]);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl text-juiGrey-400 font-bold underline">Hello World</h1>
        <Button variant="jui" onClick={() => setCount((prev) => (prev += 1))}>
          jui Button
        </Button>
        <Button variant="juiGradient" onClick={() => setCount((prev) => (prev += 1))}>
          jui Button Gradient
        </Button>
        <Badge className="text-juiStatus-urgency">
          <FilePlusIcon />
          <FileTextIcon />
          {/*{count} <AddIcon className="stroke-juiSecondary" />*/}
          {/*{count} <AddIcon className="fill-juiSecondary" />*/}
          {/*{count} <AddIcon className="fill-current" />*/}
        </Badge>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="jui">Alert 열기</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>testAlert</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex justify-between items-center gap-5 bg-white p-5 w-150">
          <Alert>
            <AlertTitle>타이틀</AlertTitle>
            <AlertDescription>내용</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>타이틀</AlertTitle>
            <AlertDescription>내용</AlertDescription>
          </Alert>
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
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <LogInIcon />
          <ArrowLeftIcon />
          <CalendarIcon />
          <ClockIcon />
          <EyeIcon />
          <FilePlusIcon />
          <FileTextIcon />
          <ListIcon />
          <LayoutIcon />
          <LockIcon />
          <EditIcon />
          <GlobeIcon />
          <ZoomInIcon />
          <XIcon />
          <TagIcon />
          <UserIcon />
          <HomeIcon />
          <InfoIcon />
          <ChevronUpIcon />
          <ExternalLinkIcon />
          <ZoomInIcon />
          <ZoomOutIcon />
          <UserMinusIcon />
          <UserPlusIcon />
          <StarIcon />
          <RotateIcon />
          <QuestionCircleIcon />
          <RepeatIcon />
          <SaveIcon />
          <SlashIcon />
          <SquareIcon />
          <PrinterIcon />
          <ServerIcon />
          <SettingsIcon />
          <Trash2Icon />
          <XCircleIcon />
          <AlertCircleIcon />
          <BookmarkIcon />
          <EyeOffIcon />
          <BarChartIcon />
          <LayersIcon />
          <MoreHorizontalIcon />
          <MailIcon />
          <Maximize2Icon />
          <MaximizeIcon />
          <MinusCircleIcon />
          <Minimize2Icon />
          <PlayIcon />
          <PaperClipIcon />
          <PlusCircleIcon />
          <PlusIcon />
          <SideBarIcon />
          <TrashIcon />
        </div>
      </div>
    </div>
  );
}
