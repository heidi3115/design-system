'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import type { ComponentProps, RefObject } from 'react';

export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  checkedRef?: RefObject<boolean>;
};

function Switch({ className, checked, defaultChecked, onCheckedChange, checkedRef, ...props }: SwitchProps) {
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
      className={cn(
        'peer data-[state=checked]:bg-juiPrimary/40 data-[state=unchecked]:bg-juiGrey-200 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        className={cn(
          'block w-4 h-4 rounded-full transition-transform',
          'data-[state=checked]:translate-x-[calc(100%-3px)] data-[state=unchecked]:translate-x-[1px]',
          'data-[state=checked]:bg-juiPrimary data-[state=unchecked]:bg-juiGrey-200',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export default Switch;
