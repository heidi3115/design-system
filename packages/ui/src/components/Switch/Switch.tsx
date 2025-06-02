'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';
import { type Ref, useImperativeHandle, useState } from 'react';
import type { ComponentProps } from 'react';
import { tv } from 'tailwind-variants';

export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  checkedRef?: Ref<boolean>;
  variant?: 'primary' | 'secondary' | 'error';
  defaultChecked?: boolean;
};

const switchVariants = tv({
  base: cn(
    'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
    'light:data-[state=unchecked]:bg-juiGrey-a200',
    'data-[state=unchecked]:bg-juiGrey-200',
  ),
  variants: {
    variant: {
      primary: 'data-[state=checked]:bg-juiPrimary/40',
      secondary: 'data-[state=checked]:bg-juiSecondary/40',
      error: 'data-[state=checked]:bg-juiError/40',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const thumbVariants = tv({
  base: cn(
    'block w-4 h-4 rounded-full transition-transform',
    'data-[state=checked]:translate-x-[calc(100%-3px)] data-[state=unchecked]:translate-x-[1px]',
    'light:data-[state=unchecked]:bg-juiGrey-a400',
    'data-[state=unchecked]:bg-juiGrey-200',
  ),
  variants: {
    variant: {
      primary: 'data-[state=checked]:bg-juiPrimary',
      secondary: 'data-[state=checked]:bg-juiSecondary',
      error: 'data-[state=checked]:bg-juiError',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

function Switch({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  checkedRef,
  variant = 'primary',
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  // 비제어 상태값
  useImperativeHandle(checkedRef, () => currentChecked);

  return (
    <SwitchPrimitive.Root
      checked={currentChecked}
      onCheckedChange={(next) => {
        if (!isControlled) setInternalChecked(next);
        onCheckedChange?.(next);
      }}
      data-slot="switch"
      className={cn(switchVariants({ variant }), className)}
      {...props}>
      <SwitchPrimitive.Thumb className={thumbVariants({ variant })} />
    </SwitchPrimitive.Root>
  );
}

export { switchVariants };
export default Switch;
