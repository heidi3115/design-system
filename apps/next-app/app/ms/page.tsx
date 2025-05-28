'use client';

import { useEffect, useRef, useState } from 'react';

import { Button, Checkbox, Input, SplitOtpInput, Textarea, Toggle } from '@common/ui';
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
import { TvIcon } from 'lucide-react';

export default function Page() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useUpdateEffect(() => {
    console.log('제어', value);
  }, [value]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; tv: boolean; area: string }>({
    mode: 'onBlur',
  });

  const onValid = (data: { email: string; tv: boolean; area: string }) => {
    console.log('폼 제출됨', data);
  };

  const {
    field: { ref: tvRef, value: tvValue, onChange: tvOnChange },
  } = useController({
    name: 'tv',
    defaultValue: false,
    control,
  });

  const [isPress, setIsPress] = useState(false);
  const pressedRef = useRef(null);

  useEffect(() => {
    console.log(isPress, '제어 toggle');
  }, [isPress]);

  return (
    <form className="p-4" onSubmit={handleSubmit(onValid)}>
      <ThemeToggle />
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold underline">Hello World</h1>

          <Toggle
            defaultPressed
            pressedRef={pressedRef}
            onIcon={CalendarIcon}
            onText="on"
            offText="off"
            onPressedChange={(on) => console.log('toggle', on)}>
            비제어
          </Toggle>

          <Button
            onMouseEnter={() => {
              console.log(pressedRef.current, '비제어 toggle');
            }}>
            비제어 토글 확인
          </Button>

          <Toggle pressed={isPress} onPressedChange={(on) => setIsPress(on)}>
            제어
          </Toggle>

          <SplitOtpInput maxLength={5} inputType="all" />
          <SplitOtpInput />
          <SplitOtpInput size="large" />
          <SplitOtpInput size="small" />
          <SplitOtpInput size="small" variant="error" />
          <p></p>
          <span>비제어</span>
          <SplitOtpInput
            size="small"
            variant="normal"
            ref={inputRef}
            onBlur={() => console.log('비제어', inputRef.current?.value)}
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
                <Button variant="primary" onClick={() => console.log('callback')}>
                  <TagIcon />
                  Query
                </Button>
              }
            />
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
              onBlur={() => console.log('비제어', inputRef.current?.value)}
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
