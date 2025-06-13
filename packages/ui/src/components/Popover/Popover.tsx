'use client';

import { type RefObject, useRef, type ReactNode, type ComponentType, createElement, type ComponentProps } from 'react';
import { PopoverAnchor, PopoverArrow, PopoverClose, PopoverRoot } from './PopoverParts';

import { PopoverContent, PopoverTrigger } from './PopoverParts';
import { XIcon } from '@common/ui/icons';
import { cn } from '../../lib/utils';
import useExtractClassName from '../hooks/useExtractClassName';
import { tv, type VariantProps } from 'tailwind-variants';

const popoverVariants = tv({
  base: 'overflow-auto ',
  variants: {
    variant: {
      primary: 'bg-juiPrimary',
      secondary: 'bg-juiSecondary',
      error: 'bg-juiError',
      default: '',
    },
    size: {
      small: '',
      basic: 'min-w-4 min-h-4',
      medium: 'min-w-3xs min-h-28',
      large: 'min-w-3xl min-h-96',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'basic',
  },
});

type PopoverProps = {
  children: ReactNode;
  trigger: ReactNode | ComponentType;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  anchorRef?: RefObject<HTMLElement | null>;
  closeIcon?: boolean;
  arrow?: boolean;
  portalContainer?: Element | DocumentFragment | null | undefined;
} & VariantProps<typeof popoverVariants> &
  Pick<ComponentProps<typeof PopoverContent>, 'side' | 'align' | 'sideOffset' | 'alignOffset'>;

type Measurable = {
  getBoundingClientRect(): DOMRect;
};

function Popover({
  className,
  trigger,
  open,
  onOpenChange,
  anchorRef,
  closeIcon = false,
  arrow = false,
  portalContainer,
  children,
  variant,
  size,
  ...props
}: PopoverProps) {
  const virtualRef = useRef<Measurable>(null!);

  if (anchorRef?.current) {
    virtualRef.current = anchorRef.current;
  }

  const contentClassName = cn(popoverVariants({ variant, size }), className);

  const bgColor = useExtractClassName(arrow ? contentClassName : '', 'bg-');

  return (
    <PopoverRoot open={open} onOpenChange={onOpenChange}>
      {trigger &&
        (typeof trigger === 'function' ? (
          <PopoverTrigger asChild>{createElement(trigger)}</PopoverTrigger>
        ) : (
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        ))}
      {anchorRef?.current && virtualRef.current && <PopoverAnchor virtualRef={virtualRef} />}
      <PopoverContent className={contentClassName} container={portalContainer} {...props}>
        {children}

        {closeIcon && (
          <PopoverClose className="absolute top-[3px] right-[3px]" asChild>
            <XIcon size="small" className="hover:opacity-50" />
          </PopoverClose>
        )}

        {arrow && (
          <PopoverArrow
            className={cn('w-2.5 h-1.5', `${bgColor ? `fill-${bgColor}` : 'fill-juiBackground-default'}`)}
          />
        )}
      </PopoverContent>
    </PopoverRoot>
  );
}

export default Popover;
