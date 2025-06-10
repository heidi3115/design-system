'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { dialogVariants } from '@common/ui/components/Dialog/dialogVariants';
import { type ComponentProps } from 'react';

const { overlay, header, title, description, closeButton } = dialogVariants();

export function DialogOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cn(overlay(), className)} {...props} />;
}

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  size,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const variant = dialogVariants({ contentSize: size });

  return (
    <DialogPrimitive.Portal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content data-slot="dialog-content" className={cn(variant.content(), className)} {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" className={closeButton()}>
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn(header(), className)} {...props} />;
}

export function DialogFooter({
  className,
  locate = 'end',
  ...props
}: ComponentProps<'div'> & { locate?: 'start' | 'center' | 'end' }) {
  const variant = dialogVariants({ footerAlign: locate });

  return <div data-slot="dialog-footer" className={cn(variant.footer(), className)} {...props} />;
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn(title(), className)} {...props} />;
}

export function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description data-slot="dialog-description" className={cn(description(), className)} {...props} />
  );
}

export const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;
