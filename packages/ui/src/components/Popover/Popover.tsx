'use client';

import { type ReactElement, type ReactNode } from 'react';
import { PopoverRoot } from './PopoverParts';

import { PopoverContent, PopoverTrigger } from './PopoverParts';

type PopoverProps = {
  trigger: ReactElement;
  children: ReactNode;
  className?: string;
};

function Popover({ className, trigger, children }: PopoverProps) {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={className}>{children}</PopoverContent>
    </PopoverRoot>
  );
}

export default Popover;
