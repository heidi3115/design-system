'use client';

import React from 'react';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from './CollapsibleParts';
import { tv } from 'tailwind-variants';
import { cn } from '@common/ui/lib/utils';

export const collapsibleVariants = tv({});

export type CollapsibleProps = {
  /**
   * defaultOpen:
   */
  defaultOpen?: boolean;
  /**
   * open:
   */
  open?: boolean;
  /**
   * disabled:
   */
  disabled?: boolean;
  /**
   * trigger:
   */
  trigger: React.ReactNode;
  /**
   * children:
   */
  children: React.ReactNode;
  /**
   * className:
   */
  className?: string;
  /**
   * onOpenChange:
   */
  onOpenChange?: (open: boolean) => void;
};

function Collapsible({
  defaultOpen = false,
  open,
  disabled = false,
  onOpenChange,
  trigger,
  children,
  className,
  // ...props
}: CollapsibleProps) {
  return (
    <CollapsibleRoot defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} disabled={disabled}>
      <CollapsibleTrigger asChild>{trigger}</CollapsibleTrigger>
      <CollapsibleContent className={cn(className)}>{children}</CollapsibleContent>
    </CollapsibleRoot>
  );
}

export default Collapsible;
