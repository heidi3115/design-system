'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '../../lib/utils';
import { Button } from '@common/ui/components';
import { AlertCircleIcon, CheckCircleIcon } from '@common/ui/icons';
import { alertDialogVariants } from './alertDialogVariants';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';

const { overlay, content, header, footer, title, description } = alertDialogVariants();

interface UnifiedAlertDialogProps extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
  titleIcon?: 'warning' | 'success';
  footerType?: string;
  description?: React.ReactNode;
}

export function AlertDialog({
  titleIcon = 'warning',
  footerType = 'update',
  description: dialogDescription = '',
  ...props
}: UnifiedAlertDialogProps) {
  const iconMap = {
    warning: <AlertCircleIcon />,
    success: <CheckCircleIcon />,
  };

  return (
    <AlertDialogPrimitive.Root {...props}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className={overlay()} />
        <AlertDialogPrimitive.Content className={content()}>
          <div className={header()}>
            <AlertDialogTitle className={cn('flex items-center', title())}>
              {titleIcon && iconMap[titleIcon]}
            </AlertDialogTitle>
            <div className={description()}>{dialogDescription}</div>
          </div>
          <div className={footer()}>
            <AlertDialogPrimitive.Action asChild>
              <Button variant="primary">확인</Button>
            </AlertDialogPrimitive.Action>
            {footerType !== 'confirm' && (
              <AlertDialogPrimitive.Cancel asChild>
                <Button>취소</Button>
              </AlertDialogPrimitive.Cancel>
            )}
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
