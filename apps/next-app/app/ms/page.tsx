'use client';

import { useState } from 'react';

import { Button, Input } from '@common/ui';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  CornerDownRightIcon,
  EyeIcon,
  FilePlusIcon,
  FileTextIcon,
  LockIcon,
  TagIcon,
  UserIcon,
} from '@common/ui/icons';

import { useForm } from 'react-hook-form';
import ThemeToggle from '../../components/ThemeToggle';

export default function Page() {
  const [value, setValue] = useState('');

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
      <ThemeToggle />
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold underline">Hello World</h1>
          <div className="w-2xs flex flex-col gap-2">
            <Input
              {...register('email', { required: '이메일은 필수입니다' })}
              placeholder="email"
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
            <Input type="text" placeholder="aaaa" size="large" iconLeft={<span>응</span>} />
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
