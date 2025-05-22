'use client';

import { type ComponentProps, useId } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { tv, type VariantProps } from 'tailwind-variants';

import { CheckIcon } from '@common/ui/icons';
import { cn } from '../../lib/utils';

const checkboxVariants = tv({
  base: [
    // 🎨 기본 스타일링
    'peer border-2 border-juiGrey-a400 shadow-xs transition-shadow outline-none',

    // 📐 사이즈 및 레이아웃
    'size-4 shrink-0 rounded-xs',

    // ✅ 상태 관련 (data-, aria-)
    'data-[state=checked]:bg-juiPrimary data-[state=checked]:text-juiBackground-default data-[state=checked]:border-juiPrimary aria-invalid:ring-juiError/20 aria-invalid:border-juiError/70',

    // 🚫 비활성화 상태
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-juiText-disabled disabled:border-juiText-disabled',
  ],
});

function Checkbox({
  id,
  className,
  labelClassName,
  label,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants> & { label?: string; labelClassName?: string }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const checkboxElement = (
    <CheckboxPrimitive.Root
      id={inputId}
      data-slot="checkbox"
      className={cn(checkboxVariants({ className }))}
      {...props}>
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="w-auto h-auto">
        <CheckIcon size="small" className="stroke-current stroke-[0.8] -ml-[2px] -mt-[3px]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label) return checkboxElement;

  return (
    <div className="flex items-center space-x-2">
      {checkboxElement}
      <label
        htmlFor={inputId}
        className={cn(
          'text-xs/snug text-juiGrey-a400 cursor-pointer',
          // 기본 상태
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          // 체크 시 색상 변경
          'peer-data-[state=checked]:text-juiText-primary',
          labelClassName,
        )}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
