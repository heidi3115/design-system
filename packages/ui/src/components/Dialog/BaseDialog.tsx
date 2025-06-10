import { isValidElement, type ReactElement, type ReactNode } from 'react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './DialogParts';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '../Button';
import { SaveIcon, XIcon, TrashIcon, CheckIcon } from '@common/ui/icons';

type buttonType = {
  langKey: string;
  handleClick?: () => void;
  color?: 'primary' | 'secondary' | 'default' | 'error';
  form?: string;
  icon?: 'save' | 'cancel' | 'delete' | 'check';
  disabled?: boolean;
  close?: boolean;
};

type dialogProps = {
  trigger: ReactNode;
  title: string;
  titleIcon?: ReactElement;
  buttons?: buttonType[];
  children?: ReactNode;
  footerLocate?: 'start' | 'center' | 'end';
  contentSize?: 'small' | 'medium' | 'large';
};

const iconMap = {
  save: <SaveIcon />,
  cancel: <XIcon />,
  delete: <TrashIcon />,
  check: <CheckIcon />,
};

const BaseDialog = ({ trigger, title, titleIcon, buttons, children, footerLocate = 'center' }: dialogProps) => {
  const triggerNode = trigger;

  if (!isValidElement(triggerNode)) {
    console.warn('ConfirmDialog: 유효한 trigger 또는 children 이 필요합니다.');

    return null;
  }

  return (
    <DialogRoot>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            {titleIcon}
            {title}
          </DialogTitle>
        </DialogHeader>
        {children && <DialogDescription>{children}</DialogDescription>}
        {buttons && (
          <DialogFooter footerLocate={footerLocate}>
            {buttons.map((btn) => {
              const buttonContent = (
                <Button
                  key={btn.langKey}
                  variant={btn.color}
                  type={btn.form ? 'submit' : 'button'}
                  onClick={btn.handleClick}
                  disabled={btn.disabled}>
                  {btn.icon && iconMap[btn.icon]} {btn.langKey}
                </Button>
              );

              return btn.close ? (
                <DialogClose asChild key={btn.langKey}>
                  {buttonContent}
                </DialogClose>
              ) : (
                <span key={btn.langKey}>{buttonContent}</span>
              );
            })}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
};

export default BaseDialog;
