'use client';

import { type ComponentProps, Fragment, type ReactNode, useId } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { CheckIcon } from '@common/ui/icons';
import { cn } from '../../lib/utils';

function Checkbox({
  id,
  className,
  labelClassName,
  label,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root> & { label?: ReactNode; labelClassName?: string }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const Wrapper = label ? 'div' : Fragment;
  const wrapperProps = label ? { className: 'flex items-center space-x-2' } : {};

  return (
    <Wrapper {...wrapperProps}>
      <CheckboxPrimitive.Root
        id={inputId}
        data-slot="checkbox"
        className={cn(
          [
            // 🎨 기본 스타일링
            'peer border-2 border-juiText-secondary shadow-xs transition-shadow outline-none',
            // 📐 사이즈 및 레이아웃
            'size-4 shrink-0 rounded-xs',
            // ✅ 상태 관련 (data-, aria-)
            'data-[state=checked]:bg-juiPrimary data-[state=checked]:text-juiBackground-default data-[state=checked]:border-juiPrimary',
            'aria-invalid:ring-juiError/20 aria-invalid:border-juiError/70',
            // 🚫 비활성화 상태
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-juiText-disabled disabled:border-juiText-disabled',
          ],
          className,
        )}
        {...props}>
        <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="w-auto h-auto">
          <CheckIcon size="small" className="stroke-current stroke-[0.8] -ml-[2px] -mt-[3px]" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs/snug text-juiText-secondary cursor-pointer',
            'peer-disabled:cursor-not-allowed peer-disabled:text-juiText-disabled',
            'peer-disabled:peer-data-[state=checked]:opacity-50',
            'peer-data-[state=checked]:text-juiText-primary',
            labelClassName,
          )}>
          {label}
        </label>
      )}
    </Wrapper>
  );
}

export default Checkbox;
