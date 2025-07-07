'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  Button,
  Checkbox,
  Input,
  Select,
  RadioGroup,
  SplitOtpInput,
  Textarea,
  Toggle,
  Popover,
  Tooltip,
  Switch,
  Skeleton,
  CardSkeleton,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
  Dialog,
  AutoComplete,
  MultiSelect,
  useConfirmDialog,
  ConfirmAlertDialog,
} from '@common/ui';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  CornerDownRightIcon,
  EyeIcon,
  EyeOffIcon,
  FilePlusIcon,
  FileTextIcon,
  LockIcon,
  PlusCircleIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from '@common/ui/icons';

import { useController, useForm } from 'react-hook-form';
import { useUpdateEffect } from '@common/utils';
import { CalculatorIcon, SmileIcon, TvIcon } from 'lucide-react';

export default function Page() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const inputOTPRef = useRef<HTMLInputElement>(null);

  useUpdateEffect(() => {
    console.warn('제어', value);
  }, [value]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; tv: boolean; area: string; fruit: string; timeZone: string; auto: string }>({
    mode: 'onBlur',
  });

  const onValid = (data: {
    email: string;
    tv: boolean;
    area: string;
    fruit: string;
    timeZone: string;
    auto: string;
  }) => {
    console.warn('폼 제출됨', data);
  };

  const {
    field: { ref: tvRef, value: tvValue, onChange: tvOnChange },
  } = useController({
    name: 'tv',
    defaultValue: false,
    control,
  });

  const {
    field: { ref: fruitRef, value: fruitValue, onChange: fruitOnChange, ...fruitField },
  } = useController({
    name: 'fruit',
    defaultValue: 'apple',
    control,
  });

  const {
    field: { ref: timeZoneRef, value: timeZoneValue, onChange: timeZoneOnChange, ...timeZoneField },
    fieldState: { error: timeZoneError },
  } = useController({
    name: 'timeZone',
    // defaultValue: 'est1',
    control,
    rules: { required: '필수 입력 항목입니다.' },
  });

  const {
    field: { value: autoValue, onChange: autoOnChange, ...autoField },
    fieldState: { error: autoError },
  } = useController({
    name: 'auto',
    control,
    rules: { required: '필수 입력 항목입니다.' },
  });

  const [isPress, setIsPress] = useState(false);
  const pressedRef = useRef(null);

  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  useUpdateEffect(() => {
    console.warn(isPress, '제어 toggle');
  }, [isPress]);

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  const radioRef = useRef(null);

  const [selectValue, setSelectValue] = useState('est1');
  const selectRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selectAutoValue, setSelectAutoValue] = useState('est');
  const selectAutoRef = useRef(null);

  useUpdateEffect(() => {
    console.warn(selectValue);
  }, [selectValue]);

  useUpdateEffect(() => {
    console.warn(selectAutoValue);
  }, [selectAutoValue]);

  const [selectMultiValue, setSelectMultiValue] = useState<string[]>([]);
  const selectMultiRef = useRef(null);

  useUpdateEffect(() => {
    console.warn(setSelectMultiValue);
  }, [setSelectMultiValue]);

  const portalRef = useRef<HTMLDivElement | null>(null);

  const { openDialog } = useConfirmDialog();

  return (
    <form className="relative" onSubmit={handleSubmit(onValid)}>
      <div className="flex items-center justify-center min-h-svh" ref={wrapperRef}>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h1 className="text-4xl font-bold">FLEX LAYOUT</h1>
          <input type="datetime-local" />
          <Button
            onClick={() =>
              toast.error('Event has been created', {
                description: 'test',
                action: {
                  label: 'test',
                  onClick: () => {},
                },
                richColors: true,
              })
            }>
            Show Toast
          </Button>
          <Button
            onClick={() =>
              toast('Event has been created', {
                description: 'test',
                action: (
                  <div className="ml-auto">
                    <Button variant="gradient">test</Button>
                  </div>
                ),
                richColors: true,
              })
            }>
            Show Toast
          </Button>

          <PlusCircleIcon />

          <Button onClick={() => toast(<Switch />)}>Custom</Button>
          <Button onClick={() => toast.success(<Switch />)}>Custom success</Button>
          <Button onClick={() => toast.info(<Switch />)}>Custom info</Button>
          <Button onClick={() => toast.warning(<Switch />)}>Custom warring</Button>
          <Button onClick={() => toast.loading(<Switch />)}>Custom loading</Button>

          <RadioGroup direction="horizontal" defaultValue="banana" valueRef={radioRef} options={options} />
          <Button
            onClick={() => {
              if (radioRef.current) {
                console.warn('비제어', radioRef.current);
              }
            }}>
            라디오그룹 비제어
          </Button>

          <Dialog title="dialog" trigger={<Button>aa</Button>}>
            aaaa
          </Dialog>
          <CommandDialog trigger={<Button>command</Button>}>
            {/* <CommandRoot> */}
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <CalendarIcon />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <SmileIcon />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem disabled>
                  <CalculatorIcon />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <CalculatorIcon />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CalculatorIcon />
                  <span>Billing2</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandSeparator />
                <CommandItem>
                  <CalculatorIcon />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CalculatorIcon />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
            {/* </CommandRoot> */}
          </CommandDialog>

          <RadioGroup
            direction="vertical"
            ref={fruitRef}
            value={fruitValue}
            onChange={fruitOnChange}
            options={options}
            {...fruitField}
          />

          <Popover trigger={FilePlusIcon} size="small">
            <div className="flex flex-col gap-2">
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <CardSkeleton />
              <Select
                isContentfitTriggerWidth
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
          <Popover
            trigger={<Button>popover</Button>}
            isArrow
            side="top"
            align="start"
            portalContainer={wrapperRef.current}>
            default popover
          </Popover>

          <Tooltip contents="aa" defaultOpen className="bg-juiStatus-alert">
            <Button>aa</Button>
          </Tooltip>
          <Tooltip trigger={<Button>aaa</Button>} contents="aaa" className="bg-juiStatus-alert" />

          <div className="flex gap-1">
            <Button
              onClick={() => {
                setIsOpenPopover(!isOpenPopover);
              }}>
              다른곳 클릭
            </Button>
          </div>

          <div ref={anchorRef} className="absolute top-28 right-20">
            this is popover position
          </div>
          <Popover anchorRef={anchorRef} trigger={<Button>Anchor</Button>} side="left" align="start" isArrow>
            AnchorRef로 오픈
          </Popover>

          <Popover open={isOpenPopover} trigger={<div className="absolute top-28 left-20">aa</div>}>
            State로 오픈
          </Popover>

          <div ref={portalRef}>
            <Popover defaultOpen portalContainer={portalRef.current} trigger={<Button>open</Button>}>
              portal
            </Popover>
          </div>

          <ConfirmAlertDialog title="warning" trigger={<Button>confirm</Button>} />

          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />
          <SplitOtpInput />

          <Toggle
            defaultPressed
            pressedRef={pressedRef}
            onIcon={CalendarIcon}
            onText="on"
            offText="off"
            onPressedChange={(on) => console.warn('toggle', on)}>
            비제어
          </Toggle>

          <Toggle pressed={isPress} onPressedChange={(on) => setIsPress(on)}>
            제어
          </Toggle>

          <span>비제어</span>
          <SplitOtpInput
            size="small"
            variant="normal"
            ref={inputOTPRef}
            onBlur={() => {
              console.warn('비제어', inputOTPRef.current?.value);
            }}
          />
          <p></p>
          <span>제어</span>
          <SplitOtpInput size="small" variant="normal" value={value} onChange={(e: string) => setValue(e)} />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Accept terms and conditions
            </label>
          </div>
          <Checkbox label="이벤트 중복 방지" />
          <Checkbox
            ref={tvRef}
            checked={tvValue}
            onCheckedChange={tvOnChange}
            isBox
            label={
              <div className="flex flex-row gap-1 items-center">
                <TvIcon size={15} /> <span>텔레비전(from 제출용)</span>
              </div>
            }
          />
          <Checkbox
            defaultChecked
            isBox
            label={
              <div className="flex flex-row gap-1 items-center">
                <TvIcon size={15} /> 텔레비전
              </div>
            }
          />
          <Checkbox label="normal" customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }} />
          <Checkbox id="aa" defaultChecked />
          <div className="w-2xs flex flex-col gap-2">
            <AutoComplete
              defaultValue={autoValue}
              onValueChange={autoOnChange}
              options={[
                { label: 'Eastern Time (EST)dddddddddddddddddddddd', value: 'est' },
                { label: 'Pacific Time (PST)', value: 'pst' },
                { label: 'Pacific Time (aaa)', value: 'aaa' },
                { label: 'Pacific Time (bbb)', value: 'bbb' },
                { label: 'Pacific Time (ccc)', value: 'ccc' },
              ]}
              error={!!autoError}
              helperText={autoError?.message}
              {...autoField}
            />

            <Select
              defaultValue={timeZoneValue}
              onValueChange={timeZoneOnChange}
              options={[
                { label: 'Eastern Standard Time (EST)ddddddddddddddd', value: 'est1' },
                { label: 'Pacific Standard Time (PST)', value: 'pst1' },
                { type: 'separator' },
                {
                  type: 'group',
                  label: 'North America',
                  items: [
                    { label: 'Eastern Standard Time (EST)', value: 'est', disabled: true },
                    { label: 'Pacific Standard Time (PST)', value: 'pst' },
                  ],
                },
              ]}
              error={!!timeZoneError}
              helperText={timeZoneError?.message}
              ref={timeZoneRef}
              {...timeZoneField}
            />
            <div className="h-26">
              <Textarea defaultValue="aaaa" size="full" />
            </div>
            <Textarea placeholder="aaa" className="w-3xs" />
            <Textarea placeholder="aaa" size="large" maxHeight={300} />
            <Textarea placeholder="aaa" error />
            <Textarea {...register('area', { required: '이메일은 필수입니다' })} error={!!errors.area} />
            <Textarea placeholder="aaa" size="small" />
            <Textarea
              placeholder="aaa"
              error
              rightButton={
                <Button variant="primary" onClick={() => console.warn('callback')}>
                  <TagIcon />
                  Query
                </Button>
              }
            />

            <Select
              value={selectValue}
              onValueChange={setSelectValue}
              placeholder="test"
              size="large"
              isContentfitTriggerWidth
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

            <Select
              selectRef={selectRef}
              defaultValue="pst"
              size="small"
              width="fit"
              isSelectIndicator
              isContentfitTriggerWidth
              options={[
                { label: 'Eastern Standard Time (EST)ddddddddddddddd', value: 'est1' },
                { label: 'Pacific Standard Time (PST)', value: 'pst' },
                { label: 'Eastern Standard Time (EST)', value: 'est3' },
                { label: 'Pacific Standard Time (PST)', value: 'pst2' },
                { label: 'Pacific Standard Time (PST)', value: 'pst6' },
                { label: 'ㅅㅅㅅ', value: 'ttt' },
                { label: 'ㅅㅅㅅ1', value: 'ttt1', disabled: true },
                { label: 'ㅅㅅㅅ2', value: 'ttt2' },
                { label: 'ㅅㅅㅅ3', value: 'ttt3' },
                { label: 'ㅅㅅㅅ4', value: 'ttt4' },
              ]}
            />
            <Button
              onClick={() => {
                if (selectRef.current) {
                  console.warn('비제어', selectRef.current);
                }
              }}>
              select 비제어
            </Button>

            <AutoComplete
              value={selectAutoValue}
              onValueChange={setSelectAutoValue}
              placeholder="오토컴플리트"
              width={200}
              // size="small"
              isSelectIndicator
              options={[
                { label: 'Eastern Time (EST)', value: 'est' },
                { label: 'Pacific Time (PST)', value: 'pst', disabled: true },
                { label: 'Pacific Time (aaa)', value: 'aaa' },
                { label: 'Pacific Time ()', value: 'bbb' },
                { label: 'Pacific Time (ccc)', value: 'ccc' },
                { label: 'Pacific Time (ddd)', value: 'ddd' },
                { label: 'Pacific Time (eee)aaaaaaaaaaa', value: 'eee' },
                { type: 'separator' },
                { label: 'zz보안담당', value: '1qqq' },
                { label: 'zz보안담당2', value: '2qqq' },
                { label: 'zz보안담당3', value: '3qqq' },
                { label: 'zz보안담당4', value: '4qqq', disabled: true },
                {
                  type: 'group',
                  label: 'North America',
                  items: [
                    { label: 'Eastern Standard Time (EST)', value: 'e22st' },
                    { type: 'separator' },
                    { label: 'Pacific Standard Time (PST)', value: 'ps22t', disabled: true },
                  ],
                },
              ]}
            />

            <AutoComplete
              isSelectIndicator
              isContentfitTriggerWidth
              options={[
                { label: 'Eastern Time (EST)dddddddddddddddddddddd', value: 'est' },
                { label: 'Pacific Time (aaa)', value: 'pst' },
                { label: 'Pacific Time (aaa)', value: 'aaa' },
                { label: 'Pacific Time (bbb)', value: 'bbb' },
                { label: 'Pacific Time (ccc)', value: 'ccc' },
              ]}
            />

            <AutoComplete
              selectRef={selectAutoRef}
              // isSelectIndicator
              defaultValue="ttt4"
              size="large"
              // isContentfitTriggerWidth
              isLeaveClose
              options={[
                // { label: 'Eastern Time (EST)dddddddddddddddddddddd', value: 'est' },
                // { label: 'Pacific Time (PST)', value: 'pst' },
                // { label: 'Pacific Time (aaa)', value: 'aaa' },
                // { label: 'Pacific Time (bbb)', value: 'bbb' },
                // { label: 'Pacific Time (ccc)', value: 'ccc' },
                { label: 'ㅅㅅㅅ4', value: 'ttt4' },
                { label: 'ㅅㅅㅅ666666666666667777777', value: 'ttt6' },
                { label: 'ㅅㅅㅅ6666666666666677777773232dzdffsdfadsfadf232', value: 'ttt7' },
              ]}
            />
            <Button
              onClick={() => {
                if (selectAutoRef.current) {
                  console.warn('비제어', selectAutoRef.current);
                }
              }}>
              AutoComplete select 비제어
            </Button>

            <MultiSelect
              width={600}
              size="small"
              onValueChange={(val) => console.warn(val)}
              isAddNewItem
              onNewValueAdd={(val) => console.warn('new', val)}
              onOverItem={(over) =>
                over &&
                openDialog({
                  title: 'warning',
                  description: '최대 선택 갯수 초과',
                  onConfirm: () => console.warn('확인'),
                })
              }
              maxItemLength={2}
              options={[
                { label: 'mmm', value: 'est' },
                { label: 'DDDD', value: 'pst' },
                { label: 'FFF', value: 'aaa' },
                { label: 'FFF2 ', value: 'bbb' },
                { type: 'separator' },
                { label: 'Pacific Time (ccc)', value: 'ccc' },
              ]}
            />

            <MultiSelect
              width={600}
              value={selectMultiValue}
              onValueChange={setSelectMultiValue}
              placeholder="tets"
              badgeClassName="bg-juiStatus-urgency"
              options={[
                { label: 'mmm', value: 'est' },
                { label: 'DDDD', value: 'pst' },
                { label: 'FFF', value: 'aaa' },
                { label: 'FFF2 ', value: 'bbb' },
                { label: 'Pacific Time (ccc)', value: 'ccc' },
              ]}
            />

            <MultiSelect
              size="large"
              selectRef={selectMultiRef}
              isContentfitTriggerWidth
              onValueChange={(val) => console.warn(val)}
              options={[
                { label: 'MMM', value: 'est' },
                { label: 'DDDD', value: 'pst' },
                { label: 'FFF', value: 'aaa' },
                { label: 'FFF2 ', value: 'bbb' },
                { label: 'ㅅㅅㅅ6666666666666677777773232dzdffsdfadsfadf232', value: 'ccc' },
              ]}
            />

            <Button
              onClick={() => {
                if (selectMultiRef.current) {
                  console.warn('비제어', selectMultiRef.current);
                }
              }}>
              Multi select 비제어
            </Button>

            <Input
              {...register('email', { required: '이메일은 필수입니다' })}
              placeholder="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Input type="number" placeholder="숫자입력" size="large" iconLeft={StarIcon} />
            <Input type="text" placeholder="aaaa" size="large" />
            <Input type="text" placeholder="aaaa" size="large" iconLeft={LockIcon} />
            <Input type="text" placeholder="aaaa" size="large" iconRight={CalendarIcon} />
            <p></p>
            <span>제어</span>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Controlled input" />
            <p></p>
            <span>비제어</span>
            <Input
              ref={inputRef}
              defaultValue="비제어"
              placeholder="Uncontrolled input"
              onBlur={() => console.warn('비제어', inputRef.current?.value)}
            />

            <Input
              type="text"
              placeholder="aaaa"
              size="large"
              iconLeft={LockIcon}
              iconRight={CalendarIcon}
              error
              helperText="aaaaa"
              disabled
            />
            <Input type="text" placeholder="aaaa" size="large" error />
          </div>

          <div className="flex justify-between items-center gap-5">
            <CornerDownRightIcon />
            <ArrowLeftIcon fill="var(--juiError)" />
            <CalendarIcon color="var(--juiPrimary)" />
            <ClockIcon variant="secondary" />
            <EyeIcon />
            <FilePlusIcon />
            <FileTextIcon />
            <LockIcon />
            <TagIcon />
            <UserIcon />
          </div>

          <Button type="submit">제출</Button>
        </div>
      </div>
    </form>
  );
}
