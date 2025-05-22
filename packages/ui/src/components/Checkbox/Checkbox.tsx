'use client';

import { type ComponentProps, Fragment, type ReactNode, useId, useState } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@common/ui/icons';
import { tv } from 'tailwind-variants';

import { cn } from '../../lib/utils';

const wrapperVariants = tv({
  base: 'flex items-center space-x-2 w-fit',
  variants: {
    isBox: {
      true: 'flex-row border h-[38px] px-2.5 py-1.5 transition-colors',
    },
    isChecked: {
      false: 'border-transparent',
    },
  },
  compoundVariants: [
    {
      isBox: true,
      isChecked: false,
      class: 'bg-juiGrey-50 light:bg-juiBackground-paper',
    },
    {
      isBox: true,
      isChecked: true,
      class: 'border-juiPrimary bg-juiPrimary/20',
    },
  ],
});

function Checkbox({
  id,
  className,
  label,
  labelClassName,
  onCheckedChange,
  isBox = false,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: ReactNode;
  labelClassName?: string;
  isBox?: boolean;
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [isChecked, setIsChecked] = useState<CheckboxPrimitive.CheckedState>(() => {
    if (props.checked !== undefined) {
      return props.checked;
    }

    if (props.defaultChecked !== undefined) {
      return props.defaultChecked;
    }

    return false;
  });

  const normalizedChecked = isChecked === true;
  const Wrapper = label ? 'div' : Fragment;
  const wrapperProps = label ? { className: wrapperVariants({ isBox, isChecked: normalizedChecked }) } : {};

  return (
    <Wrapper {...wrapperProps}>
      <CheckboxPrimitive.Root
        id={inputId}
        data-slot="checkbox"
        className={cn(
          [
            'peer border-2 border-juiText-secondary shadow-xs transition-shadow outline-none',
            'size-4 shrink-0 rounded-xs',
            'data-[state=checked]:bg-juiPrimary data-[state=checked]:text-juiBackground-default data-[state=checked]:border-juiPrimary',
            'aria-invalid:ring-juiError/20 aria-invalid:border-juiError/70',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-juiText-disabled disabled:border-juiText-disabled',
          ],
          className,
        )}
        onCheckedChange={(checked) => {
          setIsChecked(checked === true);
          onCheckedChange?.(checked);
        }}
        {...props}>
        <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="w-auto h-auto">
          <CheckIcon size="small" className="stroke-current stroke-[0.8] -ml-[2px] -mt-[3px]" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs/snug text-juiText-secondary cursor-pointer truncate',
            'peer-disabled:cursor-not-allowed peer-disabled:text-juiText-disabled',
            'peer-disabled:peer-data-[state=checked]:opacity-50',
            'peer-data-[state=checked]:text-juiText-primary',
            isBox && 'h-[38px] w-full flex items-center',
            labelClassName,
          )}>
          {label}
        </label>
      )}
    </Wrapper>
  );
}

export default Checkbox;
