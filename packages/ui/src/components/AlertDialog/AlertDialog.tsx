'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '../../lib/utils';
import { Button, buttonVariants } from '../Button';
import { alertDialogVariants } from './alertDialogVariants'; // 추가

const { overlay, content, header, footer, title, description } = alertDialogVariants();

function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root {...props} />;
}

function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger {...props} />;
}

function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal {...props} />;
}

function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return <AlertDialogPrimitive.Overlay className={cn(overlay(), className)} {...props} />;
}

interface AlertDialogContentProps extends React.ComponentProps<typeof AlertDialogPrimitive.Content> {
  contentSize?: 'small' | 'medium' | 'large';
}

function AlertDialogContent({ className, contentSize = 'medium', ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content className={cn(content({ contentSize }), className)} {...props} />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn(header(), className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn(footer(), className)} {...props} />;
}

// 8. Title 컴포넌트 (Variants 적용)
function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return <AlertDialogPrimitive.Title className={cn(title(), className)} {...props} />;
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return <AlertDialogPrimitive.Description className={cn(description(), className)} {...props} />;
}

function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Button {...props} className={cn(className, buttonVariants({ variant: 'primary' }))}>
        {props.children}
      </Button>
    </AlertDialogPrimitive.Action>
  );
}

function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button {...props} className={cn(buttonVariants(), className)}>
        {props.children}
      </Button>
    </AlertDialogPrimitive.Cancel>
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
