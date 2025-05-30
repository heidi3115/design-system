'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import type { ComponentProps, RefObject } from 'react';
import { tv } from 'tailwind-variants';

export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  checkedRef?: RefObject<boolean>;
  color?: 'primary' | 'secondary'; // 👈 color variant 추가
};

const switchVariants = tv({
  base: cn(
    'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=unchecked]:bg-juiGrey-200',
  ),
  variants: {
    color: {
      primary: 'data-[state=checked]:bg-juiPrimary/40',
      secondary: 'data-[state=checked]:bg-juiSecondary/40',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

const thumbVariants = tv({
  base: cn(
    'block w-4 h-4 rounded-full transition-transform',
    'data-[state=checked]:translate-x-[calc(100%-3px)] data-[state=unchecked]:translate-x-[1px]',
    'data-[state=unchecked]:bg-juiGrey-200',
  ),
  variants: {
    color: {
      primary: 'data-[state=checked]:bg-juiPrimary',
      secondary: 'data-[state=checked]:bg-juiSecondary',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

function Switch({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  checkedRef,
  color = 'primary',
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  if (checkedRef && 'current' in checkedRef) {
    checkedRef.current = currentChecked;
  }

  return (
    <SwitchPrimitive.Root
      checked={currentChecked}
      onCheckedChange={(next) => {
        if (!isControlled) setInternalChecked(next);
        onCheckedChange?.(next);
      }}
      data-slot="switch"
      className={cn(switchVariants({ color }), className)}
      {...props}>
      <SwitchPrimitive.Thumb className={thumbVariants({ color })} />
    </SwitchPrimitive.Root>
  );
}

export default Switch;
