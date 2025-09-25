import { isValidElement, type ReactNode } from 'react';

import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './AlertDialogParts';
import { AlertCircleIcon, CheckCircleIcon } from '@common/ui/icons';

type BaseProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: 'warning' | 'success';
  description?: ReactNode;
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

function ConfirmAlertDialog({
  open,
  onOpenChange,
  trigger,
  children,
  title = 'warning',
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  footerType,
  portalContainer,
  contentSize = 'small',
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
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{triggerNode}</AlertDialogTrigger>

      <AlertDialogContent portalContainer={portalContainer} contentSize={contentSize}>
        {title && (
          <AlertDialogHeader>
            <AlertDialogTitle> {title ? iconMap[title] : null}</AlertDialogTitle>
          </AlertDialogHeader>
        )}
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter className="flex gap-1">
          <AlertDialogAction onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
          {footerType !== 'confirm' && <AlertDialogCancel onClick={onCancel}>{cancelLabel}</AlertDialogCancel>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}

export default ConfirmAlertDialog;
