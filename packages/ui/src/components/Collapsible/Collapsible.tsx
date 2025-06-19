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
  /**
   * showPreview:
   */
  showPreview?: boolean;
  /**
   * preview:
   */
  preview?: React.ReactNode;
};

function Collapsible({
  disabled = false,
  showPreview = true,
  defaultOpen = false,
  open,
  onOpenChange,
  trigger,
  preview,
  children,
  className,
}: CollapsibleProps) {
  return (
    <CollapsibleRoot
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
      className={cn('flex flex-col gap-4 rounded-md shadow-md')}>
      <div className={'flex flex-row items-center justify-between gap-2 w-full'}>
        {showPreview && <div className={cn('flex items-center justify-between')}>{preview}</div>}
        <CollapsibleTrigger asChild className={cn('flex items-center justify-center')}>
          {trigger}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className={cn(className)}>{children}</CollapsibleContent>
    </CollapsibleRoot>
  );
}

export default Collapsible;
