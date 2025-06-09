import React from 'react';
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@common/ui';
import { CheckIcon, SaveIcon, XIcon, TrashIcon } from '@common/ui/icons';
// import { SendIcon } from 'lucide-react';

type buttonType = {
  langKey: string;
  handleClick?: () => void;
  color?: 'primary' | 'secondary' | 'default' | 'error';
  form?: string;
  icon?: string;
  disabled?: boolean;
  close?: boolean;
};

type DialogProps = {
  children?: React.ReactNode;
  footerLocate?: 'start' | 'center' | 'end';
  title: string;
  titleIcon?: React.ReactElement;
  buttons?: buttonType[];
  trigger: React.ReactNode;
};

const Dialog = ({ children, footerLocate = 'center', title, titleIcon, buttons, trigger }: DialogProps) => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>{trigger ?? <Button>Dialog Open</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <span className="flex gap-2">
              {titleIcon} {title}
            </span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
        {buttons && (
          <DialogFooter locate={footerLocate}>
            {buttons.map((btn) => {
              const buttonContent = (
                <Button
                  key={btn.langKey}
                  variant={btn.color}
                  onClick={btn.handleClick}
                  size="large"
                  type={btn.form ? 'submit' : 'button'}
                  disabled={!!btn.disabled}>
                  {btn.icon === 'save' ? (
                    <SaveIcon />
                  ) : btn.icon === 'cancel' ? (
                    <XIcon />
                  ) : btn.icon === 'delete' ? (
                    <TrashIcon />
                  ) : btn.icon === 'check' ? (
                    <CheckIcon />
                  ) : btn.icon === 'send' ? (
                    <SaveIcon />
                  ) : null}
                  {btn.langKey}
                </Button>
              );

              return btn.close ? (
                <DialogClose asChild key={btn.langKey}>
                  {buttonContent}
                </DialogClose>
              ) : (
                buttonContent
              );
            })}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
};

export default Dialog;
