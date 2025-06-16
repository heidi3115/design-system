'use client';

import {
  type RefObject,
  type ReactNode,
  type ComponentType,
  createElement,
  type ComponentProps,
  useLayoutEffect,
  useState,
} from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { PopoverAnchor, PopoverArrow, PopoverClose, PopoverRoot, PopoverContent, PopoverTrigger } from './PopoverParts';
import { XIcon } from '@common/ui/icons';

import { cn } from '../../lib/utils';
import useExtractClassName from '../hooks/useExtractClassName';

export const DEFAULT_SIDE_OFFSET = 6;
export const DEFAULT_ALIGN_OFFSET = 0;

const popoverVariants = tv({
  base: '',
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
  anchorRef?: RefObject<HTMLElement | null>;
  isCloseIcon?: boolean;
  isArrow?: boolean;
  portalContainer?: Element | DocumentFragment | null | undefined;
} & VariantProps<typeof popoverVariants> &
  Pick<ComponentProps<typeof PopoverContent>, 'side' | 'align' | 'sideOffset' | 'alignOffset'> &
  Pick<ComponentProps<typeof PopoverRoot>, 'open' | 'defaultOpen' | 'onOpenChange'>;

type Measurable = {
  getBoundingClientRect(): DOMRect;
};

function Popover({
  className,
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  anchorRef,
  portalContainer,
  children,
  variant,
  size,
  isCloseIcon = false,
  isArrow = false,
  ...props
}: PopoverProps) {
  const [virtualElement, setVirtualElement] = useState<Measurable | null>(null);

  useLayoutEffect(() => {
    if (anchorRef?.current) {
      setVirtualElement(anchorRef.current);
    }
  }, [anchorRef]);

  const contentClassName = cn(popoverVariants({ variant, size }), className);

  const bgColor = useExtractClassName(isArrow ? contentClassName : '', 'bg-');

  return (
    <PopoverRoot defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      {trigger &&
        (typeof trigger === 'function' ? (
          <PopoverTrigger asChild>{createElement(trigger)}</PopoverTrigger>
        ) : (
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        ))}
      {virtualElement && <PopoverAnchor virtualRef={{ current: virtualElement }} />}
      <PopoverContent className={contentClassName} container={portalContainer} {...props}>
        {children}

        {isCloseIcon && (
          <PopoverClose className="absolute top-[3px] right-[3px]" asChild>
            <XIcon size="small" className="hover:opacity-50" />
          </PopoverClose>
        )}

        {isArrow && (
          <PopoverArrow
            className={cn('w-2.5 h-1.5', `${bgColor ? `fill-${bgColor}` : 'fill-juiBackground-popover'}`)}
          />
        )}
      </PopoverContent>
    </PopoverRoot>
  );
}

export default Popover;
