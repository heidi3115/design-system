'use client';

import { useRef, useState } from 'react';

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
  StarIcon,
  TagIcon,
  UserIcon,
} from '@common/ui/icons';

import { useController, useForm } from 'react-hook-form';
import ThemeToggle from '../../components/ThemeToggle';
import { useUpdateEffect } from '@common/utils';
import { CalculatorIcon, SmileIcon, TvIcon } from 'lucide-react';
import { ConfirmAlertDialog } from '@common/ui/components/AlertDialog';

export default function Page() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useUpdateEffect(() => {
    console.warn('제어', value);
  }, [value]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; tv: boolean; area: string; fruit: string; timeZone: string }>({
    mode: 'onBlur',
  });

  const onValid = (data: { email: string; tv: boolean; area: string; fruit: string; timeZone: string }) => {
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
    field: { value: timeZoneValue, onChange: timeZoneOnChange, ...timeZoneField },
  } = useController({
    name: 'timeZone',
    defaultValue: 'est1',
    control,
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

  const [selectValue, setSelectValue] = useState('');
  const selectRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selectAutoValue, setSelectAutoValue] = useState('');
  const selectAutoRef = useRef(null);

  useUpdateEffect(() => {
    console.warn(selectValue);
  }, [selectValue]);

  useUpdateEffect(() => {
    console.warn(selectAutoValue);
  }, [selectAutoValue]);

  const portalRef = useRef<HTMLDivElement | null>(null);

  return (
    <form className="p-4" onSubmit={handleSubmit(onValid)}>
      <div className="sticky top-2 z-10">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center min-h-svh bg-juiBackground-paper" ref={wrapperRef}>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold underline">Hello World</h1>
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

          <Popover trigger={FilePlusIcon} className="bg-juiStatus-alert" size="small" isArrow>
            dadfdsfadsffsdfadfsfasdfadfasfas
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
            ref={inputRef}
            onBlur={() => console.warn('비제어', inputRef.current?.value)}
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
              {...timeZoneField}
            />

            <Select
              selectRef={selectRef}
              defaultValue="pst"
              size="small"
              width="fit"
              // width={200}
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
              width={500}
              isSelectIndicator
              options={[
                { label: 'Eastern Time (EST)', value: 'est' },
                { label: 'Pacific Time (PST)', value: 'pst' },
                { label: 'Pacific Time (aaa)', value: 'aaa' },
                { label: 'Pacific Time (bbb)', value: 'bbb' },
                { label: 'Pacific Time (ccc)', value: 'ccc' },
                { label: 'Pacific Time (ddd)', value: 'ddd' },
                { label: 'Pacific Time (eee)aaaaaaaaaaa', value: 'eee' },
                // { type: 'separator' },
                { label: 'zz보안담당', value: '1qqq' },
                // {
                //   type: 'group',
                //   label: 'North America',
                //   items: [
                //     { label: 'Eastern Standard Time (EST)', value: 'e22st' },
                //     { label: 'Pacific Standard Time (PST)', value: 'ps22t', disabled: true },
                //   ],
                // },
              ]}
            />

            <AutoComplete
              selectRef={selectAutoRef}
              options={[
                { label: 'Eastern Time (EST)dddddddddddddddddddddd', value: 'est' },
                { label: 'Pacific Time (PST)', value: 'pst' },
                { label: 'Pacific Time (aaa)', value: 'aaa' },
                { label: 'Pacific Time (bbb)', value: 'bbb' },
                { label: 'Pacific Time (ccc)', value: 'ccc' },
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
