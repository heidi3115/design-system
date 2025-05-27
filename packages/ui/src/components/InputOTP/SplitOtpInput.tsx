'use client';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@common/ui';
import { type ComponentProps } from 'react';
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
  };

function SplitOtpInput({ maxLength = 6, inputType = 'digit', variant, size, className, ...props }: SplitOtpInputProps) {
  const safeLength = Math.max(1, maxLength); // 0 이면 1로 보정한다

  return (
    <InputOTP maxLength={safeLength} {...(inputType && { pattern: PATTERN_MAP[inputType] })} {...props}>
      {[...Array(safeLength)].map((_, index) => (
        <InputOTPGroup key={index}>
          <InputOTPSlot index={index} className={cn(splitOtpInputVariants({ variant, size, className }))} />
        </InputOTPGroup>
      ))}
    </InputOTP>
  );
}

export default SplitOtpInput;
