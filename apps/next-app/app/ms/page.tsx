'use client';

import { useRef, useState } from 'react';

import { Button, Input, Textarea } from '@common/ui';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  CornerDownRightIcon,
  EyeIcon,
  FilePlusIcon,
  FileTextIcon,
  LockIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from '@common/ui/icons';

import { useForm } from 'react-hook-form';
import ThemeToggle from '../../components/ThemeToggle';
import { useUpdateEffect } from '@common/utils';

export default function Page() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useUpdateEffect(() => {
    console.log('제어', value);
  }, [value]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    mode: 'onBlur',
  });

  const onValid = (data: Record<string, string>) => {
    console.log('폼 제출됨', data);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit(onValid)}>
      <ThemeToggle />
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold underline">Hello World</h1>
          <div className="w-2xs flex flex-col gap-2">
            <div className="h-26">
              <Textarea defaultValue="aaaa" />
            </div>
            <Textarea placeholder="aaa" className="w-3xs" />
            <Textarea placeholder="aaa" size="large" maxHeight={300} />
            <Textarea placeholder="aaa" error />
            <Textarea placeholder="aaa" size="small" />
            <Textarea
              placeholder="aaa"
              error
              rightButton={
                <Button variant="primary" onClick={() => console.log('callback')}>
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
