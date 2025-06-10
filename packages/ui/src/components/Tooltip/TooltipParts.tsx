'use client';

import React, { isValidElement, useImperativeHandle, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { VariantProps } from 'tailwind-variants';
import { cn } from '../../lib/utils';
import { BasicTooltipVariants, DEFAULT_DELAY_DURATION } from '@common/ui/components/Tooltip';

export type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>;

function TooltipProvider({ delayDuration = 0, ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

export type TooltipRootProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

function TooltipRoot({ ...props }: TooltipRootProps) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

export type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>;

function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export type TooltipArrowProps = React.ComponentProps<typeof TooltipPrimitive.Arrow>;

function TooltipArrow({ className, ...props }: TooltipArrowProps) {
  return <TooltipPrimitive.Arrow data-slot="tooltip-arrow" {...props} className={className} />;
}

export type TooltipPortalProps = React.ComponentProps<typeof TooltipPrimitive.Portal>;

function TooltipPortal({ ...props }: TooltipPortalProps) {
  return <TooltipPrimitive.Portal data-slot="tooltip-portal" {...props} />;
}

export type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

function TooltipContent({ className, sideOffset = 0, ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(className)}
      {...props}
    />
  );
}

export type TooltipWrapperProps = {
  providerProps?: Omit<TooltipProviderProps, 'children'>;
  rootProps?: TooltipRootProps;
  tooltipOpenStatusRef?: React.Ref<boolean>;
  children?: React.ReactNode;
};

function TooltipWrapper({
  providerProps = { delayDuration: DEFAULT_DELAY_DURATION },
  rootProps = { defaultOpen: false },
  tooltipOpenStatusRef = undefined,
  children,
}: TooltipWrapperProps) {
  const { open, defaultOpen, onOpenChange, ...restRootProps } = rootProps || {};
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const currentOpen = isControlled ? open : internalOpen;

  // 비제어 선택값
  useImperativeHandle(tooltipOpenStatusRef, (): boolean => currentOpen);

  const handleTooltipOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <TooltipProvider {...providerProps}>
      <TooltipRoot {...restRootProps} onOpenChange={handleTooltipOpenChange}>
        {children}
      </TooltipRoot>
    </TooltipProvider>
  );
}

export type TooltipContainerProps = {
  triggerProps?: Omit<TooltipTriggerProps, 'asChild'>;
  portalProps?: TooltipPortalProps;
  contentProps: TooltipContentProps & { size?: VariantProps<typeof BasicTooltipVariants>['size'] };
  arrowProps?: TooltipArrowProps;
  trigger: React.ReactElement;
  children?: React.ReactNode | string;
  isShowArrow?: boolean;
  asChild?: boolean;
  className?: string;
};

function TooltipContainer({
  asChild = true,
  portalProps = { forceMount: undefined },
  contentProps = { size: 'medium', side: 'top', align: 'center' },
  arrowProps,
  trigger,
  children,
  className,
  isShowArrow = true,
  ...props
}: TooltipContainerProps) {
  const { content, arrow, base } = BasicTooltipVariants();
  const contentClass = cn(
    base({
      size: contentProps.size,
      side: contentProps.side,
      align: contentProps.align,
      fadeOut: portalProps.forceMount,
    }),
    content(),
    className,
  );
  const arrowClass = cn(arrow());

  console.log('isShowArrow :', isShowArrow, 'arrowClass :', arrowClass);

  if (!isValidElement(trigger)) {
    console.warn('TooltipContainer: 유효한 trigger 가 필요합니다.');

    return null;
  }

  return (
    <>
      <TooltipTrigger {...(props?.triggerProps || {})} asChild={asChild}>
        {trigger}
      </TooltipTrigger>
      <TooltipPortal {...portalProps}>
        <TooltipContent {...contentProps} className={contentClass}>
          {children}
          {isShowArrow && <TooltipArrow {...arrowProps} className={arrowClass} />}
        </TooltipContent>
      </TooltipPortal>
    </>
  );
}

export {
  TooltipWrapper,
  TooltipContainer,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
};
