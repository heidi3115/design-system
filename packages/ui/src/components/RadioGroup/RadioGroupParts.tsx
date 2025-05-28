'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '../../lib/utils';

function RadioGroupRoot({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        [
          // ✅ 기본 스타일
          'border-input',
          'text-juiPrimary',
          'border-1 border-juiText-secondary',
          'aspect-square',
          'size-4',
          'shrink-0',
          'rounded-full',
          'shadow-xs',

          'data-[state=checked]:border-juiPrimary',

          // 포커스 상태
          'hover:border-ring',
          'hover:ring-juiPrimary/15',
          'hover:ring-8',

          // 🟥 aria-invalid 상태 (에러)
          'aria-invalid:ring-destructive/20',
          'aria-invalid:border-destructive',

          // ⚫ 비활성화 상태
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',

          // 🔄 기타
          'transition-[color,box-shadow]',
          'outline-none',
        ],
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center">
        <span className="bg-juiPrimary border-none rounded-full size-2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroupRoot, RadioGroupItem };
