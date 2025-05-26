import { isValidElement } from 'react';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './AlertDialog';

type BaseProps = {
  title?: React.ReactNode;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  footerType?: string;
};

type ChildrenType = { children: React.ReactElement };
type TriggerType = { trigger: React.ReactElement };

type ConfirmDialogProps = OnlyOne<ChildrenType, TriggerType> & BaseProps;

export default function ConfirmDialog({
  trigger,
  children,
  title = '',
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  footerType,
}: ConfirmDialogProps) {
  const triggerNode = children ?? trigger;

  if (!isValidElement(triggerNode)) {
    console.warn('ConfirmDialog: 유효한 trigger 또는 children 이 필요합니다.');

    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerNode}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-accent-foreground">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-1">
          <AlertDialogAction onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
          {footerType !== 'confirm' && <AlertDialogCancel onClick={onCancel}>{cancelLabel}</AlertDialogCancel>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
