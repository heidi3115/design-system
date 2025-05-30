'use client';

import { type ComponentProps, useId, useState, Fragment, type ComponentType, type ReactNode } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, type IconProps } from '@common/ui/icons';
import { tv } from 'tailwind-variants';

import { cn } from '../../lib/utils';

const wrapperVariants = tv({
  base: ['relative flex items-center w-fit', 'transition-all duration-700 ease-in-out'],
  variants: {
    isBox: {
      true: 'flex-row border h-9 px-2.5 py-1.5 transition-colors',
    },
    isChecked: {
      false: 'border-transparent',
    },
  },
  compoundVariants: [
    {
      isBox: true,
      isChecked: false,
      className: 'bg-juiGrey-50 light:bg-juiBackground-paper',
    },
    {
      isBox: true,
      isChecked: true,
      className: 'border-juiPrimary bg-juiPrimary/20',
    },
  ],
});

const checkboxVariants = tv({
  base: [
    'peer',
    'shadow-xs transition-shadow outline-none',
    'size-4 shrink-0 rounded-xs',
    'aria-invalid:ring-juiError/20 aria-invalid:border-juiError/70',
    'disabled:cursor-not-allowed disabled:opacity-50  disabled:border-juiText-disabled',
  ],
  variants: {
    isCustomIcon: {
      true: '', // isIcon true면 border, bg 관련 클래스 없음
      false: [
        'border-2 border-juiText-secondary',
        'data-[state=checked]:border-juiPrimary',
        'data-[state=checked]:bg-juiPrimary',
        'data-[state=checked]:text-juiBackground-default',
        'disabled:bg-juiText-disabled',
      ],
    },
  },
  defaultVariants: {
    isCustomIcon: false,
  },
});

function Checkbox({
  id,
  className,
  label,
  labelClassName,
  boxClassName,
  onCheckedChange,
  isBox = false,
  customIcon,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: ReactNode;
  labelClassName?: string;
  boxClassName?: string;
  isBox?: boolean;
  customIcon?: { CheckedIcon: ComponentType<IconProps>; UnCheckedIcon: ComponentType<IconProps> };
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const isCustomIcon = !!customIcon;

  const [internalChecked, setInternalChecked] = useState<CheckboxPrimitive.CheckedState>(props.defaultChecked ?? false);

  const isControlled = props.checked !== undefined;
  const currentChecked = isControlled ? props.checked : internalChecked;

  const Wrapper = label ? 'div' : Fragment;
  const wrapperProps = label
    ? { className: cn(wrapperVariants({ isBox, isChecked: !!currentChecked, className: boxClassName })) }
    : {};

  return (
    <Wrapper {...wrapperProps}>
      <CheckboxPrimitive.Root
        id={inputId}
        data-slot="checkbox"
        className={cn(checkboxVariants({ isCustomIcon, className }))}
        onCheckedChange={(checked) => {
          if (!isControlled) setInternalChecked(checked === true);
          onCheckedChange?.(checked);
        }}
        {...props}>
        <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="w-auto h-auto">
          {!isCustomIcon && <CheckIcon size="small" className="stroke-current stroke-[0.8] -ml-[2px] -mt-[3px]" />}
        </CheckboxPrimitive.Indicator>

        {isCustomIcon &&
          (currentChecked ? (
            <customIcon.CheckedIcon size="small" variant="primary" />
          ) : (
            <customIcon.UnCheckedIcon size="small" color="var(--juiText-secondary)" />
          ))}
      </CheckboxPrimitive.Root>

      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs/normal text-juiText-secondary ps-2 cursor-pointer truncate',
            'peer-disabled:cursor-not-allowed peer-disabled:text-juiText-disabled',
            'peer-disabled:peer-data-[state=checked]:opacity-50',
            'peer-data-[state=checked]:text-juiText-primary',
            isBox && 'flex items-center before:absolute before:inset-0 before:block before:content-[""]',
            labelClassName,
          )}>
          {label}
        </label>
      )}
    </Wrapper>
  );
}

export default Checkbox;
