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
import { AlertCircleIcon, CheckCircleIcon } from '@common/ui/icons';

type BaseProps = {
  title?: 'warning' | 'success';
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  footerType?: string;
  portalContainer?: HTMLElement | null;
  contentSize?: 'small' | 'medium' | 'large';
};

type ChildrenType = { children: React.ReactElement };
type TriggerType = { trigger: React.ReactElement };

type ConfirmDialogProps = OnlyOne<ChildrenType, TriggerType> & BaseProps;

export default function ConfirmDialog({
  trigger,
  children,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  footerType,
  portalContainer,
  contentSize,
}: ConfirmDialogProps) {
  const iconMap = {
    warning: <AlertCircleIcon />,
    success: <CheckCircleIcon />,
  };
  const triggerNode = children ?? trigger;

  if (!isValidElement(triggerNode)) {
    console.warn('ConfirmDialog: 유효한 trigger 또는 children 이 필요합니다.');

    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerNode}</AlertDialogTrigger>

      <AlertDialogContent portalContainer={portalContainer} contentSize={contentSize}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-accent-foreground"> {title ? iconMap[title] : null}</AlertDialogTitle>
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
