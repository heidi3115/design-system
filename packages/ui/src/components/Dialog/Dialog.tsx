'use client';

import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from './DialogParts';
import { Separator, Button } from '@common/ui';
import { SaveIcon, XIcon, CheckIcon } from '@common/ui/icons';
import {
  useState,
  isValidElement,
  useImperativeHandle,
  type ReactElement,
  type ReactNode,
  type FormEvent,
  type MouseEvent,
  type ButtonHTMLAttributes,
  type Ref,
} from 'react';
import { type VariantProps } from 'tailwind-variants';
import { cn } from '../../lib/utils';

export type DialogHandleRefType = {
  close: () => void;
  open: () => void;
};

type CustomButtonProps = VariantProps<typeof Button> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>, close?: () => void) => void;
  };

type DefaultButtonType = 'save' | 'cancel' | 'check';
type ButtonProps = CustomButtonProps | DefaultButtonType;

type DialogProps = {
  trigger: ReactNode;
  title: string;
  titleIcon?: ReactElement;
  buttons?: ButtonProps[];
  children?: ReactNode;
  portalContainer?: HTMLElement | null;
  footerLocate?: 'start' | 'center' | 'end';
  contentSize?: 'small' | 'medium' | 'large';
  className?: string;
  maxHeight?: number;
  onSubmit?: (e: FormEvent<HTMLFormElement>, close: () => void) => void;
  showCloseButton?: boolean;
  isDraggable?: boolean;
  isKeepOffset?: boolean;
  handleRef?: Ref<DialogHandleRefType>;
};

const defaultButtonMap: Record<DefaultButtonType, { icon?: ReactNode; label: string }> = {
  save: { icon: <SaveIcon />, label: '저장' },
  cancel: { icon: <XIcon />, label: '취소' },
  check: { icon: <CheckIcon />, label: '확인' },
};

const Dialog = ({
  trigger,
  title,
  titleIcon,
  buttons,
  children,
  footerLocate = 'center',
  portalContainer,
  contentSize = 'small',
  className,
  isKeepOffset,
  maxHeight,
  onSubmit,
  showCloseButton = true,
  isDraggable = false,
  handleRef,
}: DialogProps) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(handleRef, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  if (!isValidElement(trigger)) {
    console.warn('Dialog: trigger는 유효한 React element여야 합니다.');

    return null;
  }

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent
        open={open}
        isKeepOffset={isKeepOffset}
        showCloseButton={showCloseButton}
        portalContainer={portalContainer}
        className={className}
        size={contentSize}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e, () => setOpen(false));
          }}
          className="overflow-auto"
          id="baseDialog">
          <DialogHeader isDraggable={isDraggable}>
            <DialogTitle className="flex gap-2 items-center mx-0 my-auto text-white">
              {titleIcon}
              {title}
            </DialogTitle>
            <DialogDescription className="sr-only" />
          </DialogHeader>
          <div
            className={cn(
              'p-4 text-sm overflow-auto',
              Array.isArray(buttons) && buttons.length > 0 ? 'max-h-[calc(100lvh-150px)]' : 'max-h-[calc(100lvh-90px)]',
            )}
            style={{ maxHeight }}>
            {children}
          </div>
          {Array.isArray(buttons) && buttons.length > 0 && (
            <div className="p-1.5">
              <Separator orientation="horizontal" className="h-px m-0 opacity-50" />
              <DialogFooter footerLocate={footerLocate}>
                {buttons.map((btn, i) => {
                  if (typeof btn === 'string' && btn in defaultButtonMap) {
                    const { icon, label } = defaultButtonMap[btn];

                    if (btn === 'save') {
                      return (
                        <Button key={btn} type="submit" variant="primary">
                          {icon} {label}
                        </Button>
                      );
                    }

                    return (
                      <DialogClose asChild key={btn}>
                        <Button>
                          {icon} {label}
                        </Button>
                      </DialogClose>
                    );
                  }

                  if (typeof btn !== 'string') {
                    return (
                      <Button
                        key={`custom-${i}`}
                        {...btn}
                        onClick={(e) => {
                          btn.onClick?.(e, () => setOpen(false));
                        }}
                      />
                    );
                  }

                  return null;
                })}
              </DialogFooter>
            </div>
          )}
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default Dialog;
