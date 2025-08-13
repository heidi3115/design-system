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
  Input,
  Popover,
  RadioGroup,
  RangeDatePicker,
  Select,
  Separator,
  Skeleton,
  Slider,
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

  const [sliderDate, setSliderDate] = useState(new Date(2025, 7, 1, 9, 11));

  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  const convertDateToMinutes = ({
    date,
    returnType = 'slider',
  }: {
    date: Date;
    returnType?: 'slider' | 'hour' | 'minute';
  }) => {
    if (returnType === 'slider') return date.getHours() * 60 + date.getMinutes();
    if (returnType === 'hour') return date.getHours() ?? 0;
    if (returnType === 'minute') return date.getMinutes() ?? 0;

    return 0;
  };

  const formatMinutesToTimeLabel = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const updateSliderDateFromTime = (hour: number, minute: number) => {
    const newDate = new Date(sliderDate);

    newDate.setHours(hour);
    newDate.setMinutes(minute);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    setSliderDate(newDate);
  };

  const updateSliderDateFromMinutes = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    updateSliderDateFromTime(hour, minute);
  };

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
      />

      <RangeDatePicker
        timeType="minute"
        defaultRange={{
          start: new Date(2025, 6, 2, 10, 10),
          end: new Date(2025, 7, 1, 9, 10),
        }}
        minRangeDays={10}
        maxRangeDays={30}
        numberOfMonths={2}
        onRangeChange={(newRange) => {
          console.warn('비제어 선택된 날짜 범위:', newRange);
        }}
        startPlaceholder="시작 날짜 선택"
        isShowTimeSlide
      />

      <RangeDatePicker timeType="minute" startPlaceholder="시작 날짜 선택" />
      <RangeDatePicker timeType="second" startPlaceholder="시작 날짜 선택" isShowTimeSlide numberOfMonths={1} />
      <RangeDatePicker timeType="hour" startPlaceholder="시작 날짜 선택" isShowTimeSlide numberOfMonths={2} />

      <div className="w-120">
        <div className="flex w-80 gap-2">
          <Input
            type="number"
            min={0}
            max={23}
            ref={hourRef}
            value={convertDateToMinutes({ date: sliderDate, returnType: 'hour' })}
            onChange={(e) => {
              const hour = Number(e.target.value);

              updateSliderDateFromTime(hour, sliderDate.getMinutes());
            }}
            onKeyDown={(e) => {
              if (e.key === '.' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            onBlur={(e) => {
              const value = e.target.value.trim();
              const padded = value.padStart(2, '0');

              e.target.value = padded;
            }}
            underline="default"
            className="flex-1"
          />
          <Input
            type="number"
            min={0}
            max={59}
            ref={minuteRef}
            value={convertDateToMinutes({ date: sliderDate, returnType: 'minute' })}
            onChange={(e) => {
              const minute = Number(e.target.value);

              updateSliderDateFromTime(sliderDate.getHours(), minute);
            }}
            onKeyDown={(e) => {
              if (e.key === '.' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            onBlur={(e) => {
              const value = e.target.value.trim();
              const padded = value.padStart(2, '0');

              e.target.value = padded;
            }}
            underline="default"
            className="flex-1"
          />
        </div>
        <Slider
          variant="primary"
          // showValueLabel="always"
          min={0}
          max={1439}
          value={[convertDateToMinutes({ date: sliderDate })]}
          onValueCommit={([val]) => {
            const h = Math.floor((val ?? 0) / 60);
            const m = (val ?? 0) % 60;
            if (hourRef.current) hourRef.current.value = String(h).padStart(2, '0');
            if (minuteRef.current) minuteRef.current.value = String(m).padStart(2, '0');
          }}
          onValueChange={([val]) => updateSliderDateFromMinutes(val ?? 0)}
          onCustomTooltip={(val) => formatMinutesToTimeLabel(val)}
          marks={[
            { value: 0, label: '00:00' },
            { value: 360, label: '06:00' },
            { value: 720, label: '12:00' },
            { value: 1080, label: '18:00' },
            { value: 1439, label: '23:59' },
          ]}
        />
      </div>

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
