'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '../../lib/utils';

function RadioGroupRoot({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-2.5', className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        [
          // 기본 스타일
          'border-input border-2 border-juiText-secondary rounded-full',
          'outline-none',
          'aspect-square',
          'size-4 shrink-0 shadow-xs',

          // 포커스 상태
          'active:border-ring',
          'active:ring-juiPrimary/20',
          'active:ring-8',

          // 활성 상태
          'data-[state=checked]:border-juiPrimary',

          // 비활성화 상태
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          'disabled:ring-0',

          // 기타
          'transition-[color,box-shadow,ring]',
          'transition-all duration-300 ease-in-out font-',
        ],
        className,
        // 배경색 지움
        'bg-transparent',
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center">
        <span
          className={cn(
            'bg-juiPrimary border-none rounded-full size-2 transition-all duration-300 ease-in-out',
            className,
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroupRoot, RadioGroupItem };
