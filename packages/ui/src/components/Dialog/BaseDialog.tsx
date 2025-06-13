import { isValidElement, type ReactElement, type ReactNode, type FormEvent } from 'react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from './DialogParts';
import { Button } from '../Button';
import { SaveIcon, XIcon, TrashIcon, CheckIcon } from '@common/ui/icons';
import { useState } from 'react';

type ButtonType = {
  langKey: string;
  handleClick?: (close: () => void) => void;
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
  buttons?: ButtonType[];
  children?: ReactNode;
  portalContainer?: HTMLElement | null;
  footerLocate?: 'start' | 'center' | 'end';
  contentSize?: 'small' | 'medium' | 'large';
  className?: string;
  maxHeight?: number;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  showCloseButton?: boolean;
};

const iconMap = {
  save: <SaveIcon />,
  cancel: <XIcon />,
  delete: <TrashIcon />,
  check: <CheckIcon />,
};

const BaseDialog = ({
  trigger,
  title,
  titleIcon,
  buttons,
  children,
  footerLocate = 'center',
  portalContainer,
  contentSize = 'small',
  className,
  maxHeight,
  onSubmit,
  showCloseButton = true,
}: dialogProps) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const triggerNode = trigger;

  if (!isValidElement(triggerNode)) {
    console.warn('ConfirmDialog: 유효한 trigger가 필요합니다.');

    return null;
  }

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={openDialog}>
        {trigger}
      </DialogTrigger>
      <DialogContent
        portalContainer={portalContainer}
        className={className}
        size={contentSize}
        showCloseButton={showCloseButton}>
        <form onSubmit={onSubmit} id="baseDialog">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">
              {titleIcon}
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 text-juiText-secondary text-sm overflow-auto" style={{ maxHeight }}>
            {children}
          </div>
          {buttons && (
            <DialogFooter footerLocate={footerLocate}>
              {buttons.map((btn) => {
                const buttonContent = (
                  <Button
                    key={btn.langKey}
                    variant={btn.color}
                    type={btn.form ? 'submit' : 'button'}
                    onClick={() => {
                      if (btn.handleClick) {
                        btn.handleClick(closeDialog);
                      } else if (btn.close) {
                        closeDialog();
                      }
                    }}
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
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default BaseDialog;
