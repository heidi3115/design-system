'use client';

import { isValidElement, type ReactNode, useState } from 'react';
import { SheetContent, SheetDescription, SheetHeader, SheetRoot, SheetTitle, SheetTrigger } from '@common/ui';
import { cn } from '@common/ui/lib/utils';
import { type VariantProps } from 'tailwind-variants';
import { sheetVariants } from './sheetVariants';

type SheetProps = {
  title: string;
  children?: ReactNode;
  description?: string;
  trigger: ReactNode;
  portalContainer?: HTMLElement | null;
  showTopCloseButton?: boolean;
  headerClassName?: string;
  bodyClassName?: string;
  showHeader?: boolean;
} & VariantProps<typeof sheetVariants>;

const Sheet = ({
  side,
  showHeader = true,
  title,
  children,
  description,
  trigger,
  portalContainer,
  headerClassName,
  bodyClassName,
  showTopCloseButton = true,
}: SheetProps) => {
  const [open, setOpen] = useState(false);

  if (!isValidElement(trigger)) {
    console.warn('Sheet: trigger는 유효한 React element여야 합니다.');

    return null;
  }

  return (
    <SheetRoot open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </SheetTrigger>
      <SheetContent side={side} portalContainer={portalContainer} showTopCloseButton={showTopCloseButton}>
        {showHeader && (
          <SheetHeader className={headerClassName}>
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        <div className={cn(['p-4 text-sm overflow-auto'], bodyClassName)}>{children}</div>
      </SheetContent>
    </SheetRoot>
  );
};

export default Sheet;
