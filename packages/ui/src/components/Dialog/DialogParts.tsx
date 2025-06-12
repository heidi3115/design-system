'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { dialogVariants } from '@common/ui/components/Dialog/dialogVariants';
import { type ComponentProps } from 'react';

const { overlay, header, title, description, closeButton } = dialogVariants();

function DialogRoot({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogClose({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close {...props} />;
}

export function DialogOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cn(overlay(), className)} {...props} />;
}

function DialogPortal({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

function DialogTrigger({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />;
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = 'medium',
  portalContainer,
  maxHeight,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  size?: 'small' | 'medium' | 'large';
  portalContainer?: HTMLElement | null;
  maxHeight?: string | number;
}) {
  const positioning = portalContainer ? 'absolute' : 'fixed';

  const { content } = dialogVariants({
    contentSize: size,
    positioning,
    className,
  });

  const maxHeightClass = typeof maxHeight === 'string' || typeof maxHeight === 'number' ? `max-h-[${maxHeight}]` : '';

  return (
    <DialogPortal container={portalContainer} data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(content(), maxHeightClass, className)}
        {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" className={closeButton()}>
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn(header(), className)} {...props} />;
}

function DialogFooter({
  className,
  footerLocate = 'center',
  ...props
}: ComponentProps<'div'> & { footerLocate?: 'start' | 'center' | 'end' }) {
  const variant = dialogVariants({ footerLocate });

  return <div data-slot="dialog-footer" className={cn(variant.footer(), className)} {...props} />;
}

function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn(title(), className)} {...props} />;
}

function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description data-slot="dialog-description" className={cn(description(), className)} {...props} />
  );
}

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
