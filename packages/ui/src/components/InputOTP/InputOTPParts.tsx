'use client';

import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';

import { type IconProps } from '@common/ui/icons';
import { cn } from '../../lib/utils';

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn('flex items-center gap-2 w-fit has-disabled:opacity-50', containerClassName)}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="input-otp-group" className={cn('flex items-center', className)} {...props} />;
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
  type?: 'letter' | 'number' | 'any';
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        [
          // 레이아웃 및 정렬
          'relative flex items-center justify-center',
          // 상태 기반
          'data-[active=true]:z-10',
          'data-[active=true]:border-none',
          'data-[active=true]:ring-2',
          'data-[active=true]:ring-juiPrimary',
          // 크기
          'h-14 w-14',
          // 테두리
          'border-y border-r first:border-l border-input',
          // 모서리 둥글기
          'first:rounded-l-xs',
          'last:rounded-r-xs',
          // 타이포그래피
          'text-2xl text-juiText-blue',
          // 시각 효과 및 애니메이션
          'shadow-xs',
          'transition-all',
          'outline-none',
        ],
        className,
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({
  icon,
  ...props
}: React.ComponentProps<'div'> & {
  icon?: React.ComponentType<IconProps>;
}) {
  const Icon = icon;

  return (
    <div data-slot="input-otp-separator" role="separator" className="w-fit" {...props}>
      {Icon ? <Icon /> : <div className="w-1 h-1 bg-current rounded-full" />}
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
