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
  Input,
} from '@common/ui';
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

import { useUpdateEffect } from '@common/utils';
import { useForm } from 'react-hook-form';

export default function Page() {
  const [count, setCount] = useState('1');
  const [value, setValue] = useState('');

  useUpdateEffect(() => {
    alert(count);
  }, [count]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onValid = (data: Record<string, string>) => {
    console.log('폼 제출됨', data);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit(onValid)}>
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl text-juiGrey-400 font-bold underline">Hello World</h1>
          <div className="w-2xs flex flex-col gap-2">
            <Input
              {...register('email', { required: '이메일은 필수입니다' })}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
            <Input type="text" placeholder="aaaa" size="large" iconLeft={<LockIcon />} iconRight={<CalendarIcon />} />
            <Input type="text" placeholder="aaaa" size="large" iconLeft={<LockIcon />} />
            <Input type="text" placeholder="aaaa" size="large" iconRight={<CalendarIcon />} />
            <p></p>
            <span>제어</span>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Controlled input" />
            <p></p>
            <span>비제어</span>
            <Input placeholder="Uncontrolled input" onBlur={(e) => console.log(e.target.value)} />

            <Input
              type="text"
              placeholder="aaaa"
              size="large"
              iconLeft={<LockIcon />}
              iconRight={<CalendarIcon />}
              error
              helperText="aaaaa"
            />
            <Input type="text" placeholder="aaaa" size="large" error />
          </div>
          <Button variant="jui" onClick={() => setCount((prev) => (prev += 1))}>
            jui Button
          </Button>
          <Button variant="juiGrey" onClick={() => setCount((prev) => (prev += 1))}>
            jui Grey <CornerDownLeftIcon />
          </Button>
          <Button variant="juiGradient" onClick={() => setCount((prev) => (prev += 1))}>
            jui Button Gradient
          </Button>
          <Badge className="text-juiStatus-urgency">
            {/*{count} <AddIcon className="stroke-juiSecondary" />*/}
            {/*{count} <AddIcon className="fill-juiSecondary" />*/}
            {/*{count} <AddIcon className="fill-current" />*/}
          </Badge>
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
            <CornerDownRightIcon />
            <ArrowLeftIcon fill="var(--juiError)" />
            <CalendarIcon color="var(--juiPrimary)" />
            <ClockIcon variant="secondary" />
            <EyeIcon />
            <FilePlusIcon />
            <FileTextIcon />
            <ListIcon />
            <LockIcon />
            <GlobeIcon />
            <ZoomInIcon />
            <XIcon />
            <TagIcon />
            <UserIcon />
            <HomeIcon />
            <InfoIcon />
            <ChevronUpIcon />
            <ExternalLinkIcon />
            <UserMinusIcon />
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
            <PlusIcon />
            <PlusIcon />
            <PlusSquareIcon />
            <PlusIcon />
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
          <Button type="submit">제출</Button>
        </div>
      </div>
    </form>
  );
}
