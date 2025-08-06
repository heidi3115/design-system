'use client';

import { useRef, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Popover,
  RadioGroup,
  RangeDatePicker,
  Select,
  Separator,
  Skeleton,
  SplitOtpInput,
  Switch,
  useConfirmDialog,
} from '@common/ui';
import { Link2Icon } from 'lucide-react';

export default function BoxPages() {
  const otpRef = useRef(null);

  const { openDialog } = useConfirmDialog();

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Watermelon', value: 'watermelon' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Mango', value: 'mango' },
    { label: 'Peach', value: 'peach' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Kiwi', value: 'kiwi' },
  ];

  const [range, setRange] = useState<{ start?: Date; end?: Date }>({
    start: new Date(2025, 6, 1),
    end: new Date(2025, 6, 7),
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="h-9">
        <h1 className="text-4xl font-bold">BOX LAYOUT</h1>
      </div>
      <RangeDatePicker
        defaultRange={{
          start: new Date(2025, 6, 2),
          end: new Date(2025, 6, 18),
        }}
        onRangeChange={(newRange) => {
          console.warn('비제어 선택된 날짜 범위:', newRange);
        }}
        minRangeDays={10}
        maxRangeDays={30}
        isConfrimAlert={false}
        startPlaceholder="시작 날짜 선택"
      />
      <RangeDatePicker
        range={range}
        onRangeChange={(newRange) => {
          console.warn('선택된 날짜 범위:', newRange);
          setRange(newRange);
        }}
        minRangeDays={10}
        maxRangeDays={30}
        // isArrow
        // numberOfMonths={2}
        delimiter={<Link2Icon />}
        // direction="vertical"
        // label={{
        //   start: '시작날짜',
        //   end: <Switch />,
        //   // labelDirection: 'side',
        // }}
        // oppositeSign={{
        //   start: { show: true },
        //   end: { show: false },
        // }}
        // customConfirmAlert={({ condDate, type }) => {
        //   console.warn(condDate, type);

        //   return (
        //     <div>
        //       {type} {condDate?.toLocaleDateString()} error
        //     </div>
        //   );
        // }}
        // isConfrimAlert={false}
      />

      <RangeDatePicker
        timeType="minute"
        defaultRange={{
          start: new Date(2025, 6, 2, 10, 10),
          end: new Date(2025, 7, 1, 9, 10),
        }}
        minRangeDays={10}
        maxRangeDays={30}
        onRangeChange={(newRange) => {
          console.warn('비제어 선택된 날짜 범위:', newRange);
        }}
        startPlaceholder="시작 날짜 선택"
      />

      <Switch defaultChecked />
      <Switch variant="secondary" defaultChecked />
      <Switch variant="error" defaultChecked />
      <Switch defaultChecked />
      <Switch defaultChecked />
      <Popover trigger={<Button variant="gradient">popover</Button>} size="small">
        <div className="flex flex-col gap-2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Select
            isContentFitTriggerWidth
            options={[
              { label: 'Eastern Standard Time (EST)ddddddddddddddd', value: 'est1' },
              { label: 'Pacific Standard Time (PST)', value: 'pst1' },
              { type: 'separator' },
              {
                type: 'group',
                label: 'North America',
                items: [
                  { label: 'Eastern Standard Time (EST)', value: 'est' },
                  { label: 'Pacific Standard Time (PST)', value: 'pst' },
                ],
              },
            ]}
          />
        </div>
      </Popover>
      <Separator />
      <SplitOtpInput defaultValue={123456} />
      <SplitOtpInput defaultValue="654321" otpRef={otpRef} />
      <Button
        onClick={() => {
          console.warn(otpRef.current);

          openDialog({
            title: 'warning',
            description: `비제어 ${otpRef.current}`,
            onConfirm: () => console.warn('확인'),
          });
        }}>
        otp unControll
      </Button>
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />

      <Separator className="my-4" />
      <Card className="w-64">
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

      <Card className="w-64">
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

      <Card className="w-64">
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

      <Card className="w-64">
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

      <Card className="w-64">
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

      <Separator />
      <RadioGroup defaultValue="banana" options={options} />
      <Separator />
      <Checkbox label="이벤트 중복 방지" />
      <Checkbox label="이벤트 중복 방지" isBox />
      <Checkbox label="이벤트 중복 방지" defaultChecked />
    </div>
  );
}
