'use client';

import { useCallback, useRef, useState } from 'react';
import { format, isValid } from 'date-fns';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  DatePicker,
  Popover,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  SplitOtpInput,
  Switch,
  useConfirmDialog,
} from '@common/ui';
import { useCheckDateRangeValidity } from './useCheckDateRangeValidity';

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

  const maxRange = 30;
  const minRange = 7;

  const [startDate, setStartDate] = useState<Date | undefined | 'init'>(undefined);
  const [startError, setStartError] = useState(false);

  const [endDate, setEndDate] = useState<Date | undefined | 'init'>(undefined);
  const [endError, setEndError] = useState(false);

  const startErrorMessageRef = useRef('');
  const endErrorMessageRef = useRef('');

  const { checkDateRangeValidity } = useCheckDateRangeValidity({
    maxRange,
    minRange,
  });

  const handleStartDateChange = useCallback(
    (date: Date | undefined) => {
      if (date && endDate instanceof Date) {
        const { isError, errorMessage } = checkDateRangeValidity({ target: date, compare: endDate, type: 'start' });

        if (isError) {
          setEndDate('init');
          setEndError(true);
          endErrorMessageRef.current = errorMessage ?? '';
        } else {
          setEndError(false);
          endErrorMessageRef.current = '';
        }
      }

      setStartError(false);
      setStartDate(date);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endDate],
  );

  const handleEndDateChange = useCallback(
    (date: Date | undefined) => {
      if (date && startDate instanceof Date) {
        const { isError, errorMessage } = checkDateRangeValidity({ target: date, compare: startDate, type: 'end' });

        if (isError) {
          setStartDate('init');
          setStartError(true);
          startErrorMessageRef.current = errorMessage ?? '';
        } else {
          setStartError(false);
          startErrorMessageRef.current = '';
        }
      }

      setEndError(false);
      setEndDate(date);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate],
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="h-9">
        <h1 className="text-4xl font-bold">BOX LAYOUT</h1>
      </div>
      <div className="flex gap-4 items-center">
        <div>
          <label className="block mb-1">시작 날짜</label>
          <DatePicker
            date={startDate}
            onDateChange={handleStartDateChange}
            onConditionRequestCallback={(condDate) => {
              const { isError, errorMessage } = checkDateRangeValidity({
                target: condDate,
                compare: endDate,
                type: 'start',
              });

              startErrorMessageRef.current = errorMessage ?? '';

              return isError;
            }}
            conditionContent={(condDate) => (
              <span>
                {startErrorMessageRef.current}
                <br />
                {condDate && (
                  <>
                    {format(condDate, 'yyyy-MM-dd')} 선택하면 <br />
                    종료시간이 없어 집니다.
                  </>
                )}
                <br />
                {startDate instanceof Date && isValid(startDate) && <>취소시 {format(startDate, 'yyyy-MM-dd')} 유지</>}
              </span>
            )}
            placeholder="시작 날짜 선택"
            inputProps={{
              error: startError,
              helperText: startError && startErrorMessageRef.current,
            }}
            calendarProps={{
              modifiers: {
                against: (date: Date) => {
                  const { isError, errorMessage } = checkDateRangeValidity({
                    target: date,
                    compare: endDate,
                    type: 'start',
                  });

                  startErrorMessageRef.current = errorMessage ?? '';

                  return isError;
                },
              },
              modifiersClassNames: {
                against: 'text-juiText-secondary',
              },
            }}
          />
        </div>
        <span>~</span>
        <div>
          <label className="block mb-1">종료 날짜</label>
          <DatePicker
            date={endDate}
            onDateChange={handleEndDateChange}
            onConditionRequestCallback={(condDate) => {
              const { isError, errorMessage } = checkDateRangeValidity({
                target: condDate,
                compare: startDate,
                type: 'end',
              });

              endErrorMessageRef.current = errorMessage ?? '';

              return isError;
            }}
            conditionContent={(condDate) => (
              <span>
                {endErrorMessageRef.current}
                <br />
                {condDate && (
                  <>
                    {format(condDate, 'yyyy-MM-dd')} 선택하면 <br />
                    시작시간이 없어집니다.
                  </>
                )}
                <br />
                {endDate instanceof Date && isValid(endDate) && <>취소시 {format(endDate, 'yyyy-MM-dd')} 유지</>}
              </span>
            )}
            placeholder="종료 날짜 선택"
            inputProps={{
              error: endError,
              helperText: endError && endErrorMessageRef.current,
            }}
            calendarProps={{
              modifiers: {
                against: (date: Date) => {
                  const { isError, errorMessage } = checkDateRangeValidity({
                    target: date,
                    compare: startDate,
                    type: 'end',
                  });

                  endErrorMessageRef.current = errorMessage ?? '';

                  return isError;
                },
              },
              modifiersClassNames: {
                against: 'text-juiText-secondary',
              },
            }}
          />
        </div>
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
