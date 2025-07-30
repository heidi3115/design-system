'use client';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@common/ui';
import { type ComponentProps, type Ref, useImperativeHandle, useState } from 'react';
import { type VariantProps } from 'tailwind-variants';

import splitOtpInputVariants from './splitOtpInputVariants';
import { cn } from '../../lib/utils';

const PATTERN_MAP = {
  digit: '^\\d+$', // 숫자
  character: '^[a-zA-Z]+$', // 문자
  both: '^[a-zA-Z0-9]+$', // 숫자 + 문자
  all: '^.*$', // 모두 허용
} as const;

type SplitOtpInputProps = Omit<
  ComponentProps<typeof InputOTP>,
  'children' | 'maxLength' | 'pattern' | 'render' | 'size'
> &
  VariantProps<typeof splitOtpInputVariants> & {
    maxLength?: number;
    inputType?: 'digit' | 'character' | 'both' | 'all';
    otpRef?: Ref<string>;
  };

function SplitOtpInput({
  value,
  defaultValue,
  onChange,
  otpRef,
  maxLength = 6,
  inputType = 'digit',
  variant,
  size,
  className,
  ...props
}: SplitOtpInputProps) {
  const safeLength = Math.max(1, maxLength); // 0 이면 1로 보정한다

  const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  useImperativeHandle(otpRef, () => currentValue);

  return (
    <InputOTP
      maxLength={safeLength}
      value={currentValue}
      onChange={(newValue) => {
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
      }}
      {...(inputType && { pattern: PATTERN_MAP[inputType] })}
      {...props}>
      {[...Array(safeLength)].map((_, index) => (
        <InputOTPGroup key={index}>
          <InputOTPSlot index={index} className={cn(splitOtpInputVariants({ variant, size, className }))} />
        </InputOTPGroup>
      ))}
    </InputOTP>
  );
}

export default SplitOtpInput;
