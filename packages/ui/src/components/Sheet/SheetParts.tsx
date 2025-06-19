'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from '@common/ui/icons';
import { cn } from '../../lib/utils';
import { type ComponentProps } from 'react';
import { sheetVariants } from './sheetVariants';
import { type VariantProps } from 'tailwind-variants';

function SheetRoot({ ...props }: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Overlay> & VariantProps<typeof sheetVariants>) {
  const { overlay } = sheetVariants();

  return <SheetPrimitive.Overlay data-slot="sheet-overlay" className={cn(overlay(), className)} {...props} />;
}

function SheetContent({
  className,
  children,
  side,
  portalContainer,
  showTopCloseButton,
  ...props
}: ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants> & {
    portalContainer?: HTMLElement | null;
    showTopCloseButton?: boolean;
  }) {
  const { content, close } = sheetVariants({ side });

  return (
    <SheetPortal container={portalContainer}>
      <SheetOverlay />
      <SheetPrimitive.Content data-slot="sheet-content" className={cn(content(), className)} {...props}>
        {children}
        {showTopCloseButton && (
          <SheetPrimitive.Close className={close()}>
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
  const { header } = sheetVariants();

  return <div data-slot="sheet-header" className={cn(header(), className)} {...props} />;
}

function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
  const { footer } = sheetVariants();

  return <div data-slot="sheet-footer" className={cn(footer(), className)} {...props} />;
}

function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
  const { title } = sheetVariants();

  return <SheetPrimitive.Title data-slot="sheet-title" className={cn(title(), className)} {...props} />;
}

function SheetDescription({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) {
  const { description } = sheetVariants();

  return (
    <SheetPrimitive.Description data-slot="sheet-description" className={cn(description(), className)} {...props} />
  );
}

export { SheetRoot, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
