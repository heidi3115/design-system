'use client';

import { type RefObject, useRef, type ReactNode, type ComponentType, createElement } from 'react';
import { PopoverAnchor, PopoverRoot } from './PopoverParts';

import { PopoverContent, PopoverTrigger } from './PopoverParts';

type PopoverProps = {
  children: ReactNode;
  trigger: ReactNode | ComponentType;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  anchorRef?: RefObject<HTMLElement | null>;
};

type Measurable = {
  getBoundingClientRect(): DOMRect;
};

function Popover({ className, trigger, open, onOpenChange, anchorRef, children }: PopoverProps) {
  const virtualRef = useRef<Measurable>(null!);

  if (anchorRef?.current) {
    virtualRef.current = anchorRef.current;
  }

  return (
    <PopoverRoot open={open} onOpenChange={onOpenChange}>
      {trigger &&
        (typeof trigger === 'function' ? (
          <PopoverTrigger asChild>{createElement(trigger)}</PopoverTrigger>
        ) : (
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        ))}
      {anchorRef?.current && virtualRef.current && <PopoverAnchor virtualRef={virtualRef} />}
      <PopoverContent className={className}>{children}</PopoverContent>
    </PopoverRoot>
  );
}

export default Popover;
