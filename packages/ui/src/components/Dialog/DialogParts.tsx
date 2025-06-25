'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { dialogVariants } from './dialogVariants';
import { type ComponentProps, useState, useEffect, useRef } from 'react';
import { DraggableDialogContext, useDraggableDialog } from './DraggableDialogContext';

import { useDraggable } from '@dnd-kit/core';

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
  open,
  isKeepOffset = false,
  showCloseButton = true,
  size = 'medium',
  portalContainer,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  size?: 'small' | 'medium' | 'large';
  portalContainer?: HTMLElement | null;
  open?: boolean;
  isKeepOffset?: boolean;
}) {
  const { setNodeRef, transform, isDragging, listeners, attributes } = useDraggable({ id: 'dialog' });
  const positioning = portalContainer ? 'absolute' : 'fixed';

  const { content } = dialogVariants({
    contentSize: size,
    positioning,
    className,
  });

  // 현재까지 드래그된 누적 위치
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const prevIsDraggingRef = useRef(false); // 이전 isDragging 상태
  const lastTransformRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 }); // 마지막 transform 값 저장

  useEffect(() => {
    if (transform) {
      lastTransformRef.current = transform;
    }

    // 드래그가 끝나면 transform 값을 offset에 누적시킴
    if (prevIsDraggingRef.current && !isDragging) {
      setOffset((prev) => ({
        x: prev.x + lastTransformRef.current.x,
        y: prev.y + lastTransformRef.current.y,
      }));
    }

    // 현재 드래그 상태를 저장
    prevIsDraggingRef.current = isDragging;
  }, [transform, isDragging]);

  useEffect(() => {
    if (!isKeepOffset && open) {
      setOffset({ x: 0, y: 0 });
    }
  }, [open]);

  // 화면에 적용할 최종 위치 = 누적 offset + 현재 드래그 중인 위치
  const finalX = offset.x + (transform?.x ?? 0);
  const finalY = offset.y + (transform?.y ?? 0);

  const style = {
    transform: `translate3d(${finalX}px, ${finalY}px, 0)`,
    transition: 'none',
  };

  return (
    <DialogPortal container={portalContainer} data-slot="dialog-portal">
      <DialogOverlay />
      <DraggableDialogContext.Provider value={{ listeners, attributes }}>
        <DialogPrimitive.Content
          ref={setNodeRef}
          data-slot="dialog-content"
          className={cn(content(), className)}
          style={style}
          {...props}>
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close data-slot="dialog-close" className={closeButton()}>
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DraggableDialogContext.Provider>
    </DialogPortal>
  );
}

function DialogHeader({
  isDraggable,
  className,
  ...props
}: ComponentProps<'div'> & {
  isDraggable?: boolean;
}) {
  const { listeners, attributes } = useDraggableDialog();

  const style = {
    cursor: isDraggable ? 'move' : 'auto',
  };
  const dragListeners = isDraggable ? listeners : {};
  const dragAttributes = isDraggable ? attributes : {};

  return (
    <div
      style={style}
      data-slot="dialog-header"
      {...dragAttributes}
      {...dragListeners}
      className={cn(header(), className)}
      {...props}
    />
  );
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
