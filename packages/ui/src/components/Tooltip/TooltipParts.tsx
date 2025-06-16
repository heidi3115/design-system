'use client';

import React, { isValidElement, useEffect, useImperativeHandle, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { VariantProps } from 'tailwind-variants';
import { cn } from '../../lib/utils';
import { DEFAULT_DELAY_DURATION, type TextAlignType, tooltipVariants } from '@common/ui/components/Tooltip';

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
  openStatusRef?: React.Ref<boolean>;
  children?: React.ReactNode;
};

function TooltipWrapper({
  providerProps = { delayDuration: DEFAULT_DELAY_DURATION },
  rootProps = { defaultOpen: false },
  openStatusRef = undefined,
  children,
}: TooltipWrapperProps) {
  const { open, defaultOpen, onOpenChange, ...restRootProps } = rootProps || {};
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const currentOpen = isControlled ? open : internalOpen;

  // 비제어 선택값
  useImperativeHandle(openStatusRef, (): boolean => currentOpen);

  const handleTooltipOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);

    // openStatusRef 동기화
    if (openStatusRef && typeof openStatusRef !== 'function') {
      openStatusRef.current = nextOpen;
    }

    onOpenChange?.(nextOpen);
  };

  return (
    <TooltipProvider {...providerProps}>
      <TooltipRoot {...restRootProps} open={currentOpen} onOpenChange={handleTooltipOpenChange}>
        {children}
      </TooltipRoot>
    </TooltipProvider>
  );
}

type ContainerType = Element | DocumentFragment | null;

export type TooltipContainerProps = {
  triggerProps?: TooltipTriggerProps;
  portalProps?: TooltipPortalProps & {
    fadeOut?: VariantProps<typeof tooltipVariants>['fadeOut'] | undefined;
  };
  contentProps: TooltipContentProps & {
    size?: VariantProps<typeof tooltipVariants>['size'];
    variant?: VariantProps<typeof tooltipVariants>['variant'];
    textAlign?: TextAlignType;
  };
  arrowProps?: TooltipArrowProps;
  children: React.ReactElement;
  contents?: React.ReactNode | string;
  asChild?: boolean;
  isShowArrow?: boolean;
  disabled?: boolean;
  className?: string;
};

function TooltipContainer({
  triggerProps = { asChild: true },
  portalProps = { fadeOut: undefined },
  contentProps = {
    variant: 'default',
    size: 'medium',
    side: 'top',
    align: 'center',
    textAlign: 'left',
  },
  arrowProps,
  children,
  contents,
  className,
  isShowArrow = true,
  disabled = false,
}: TooltipContainerProps) {
  const { fadeOut } = portalProps;
  const { variant, size, side, align, textAlign, ...restContentProps } = contentProps;
  const { content, arrow, base } = tooltipVariants({
    variant,
    size,
    textAlign,
    disabled,
    fadeOut: fadeOut !== undefined,
  });
  const contentClass = cn(base(), content());
  const arrowClass = cn(arrow());

  // hydration mismatch 에러 이슈 -> SSR-safe: 초기값은 null, 클라이언트에서만 container 할당
  const [currentContainer, setCurrentContainer] = useState<ContainerType>(null);

  useEffect(() => {
    let newContainer: ContainerType;

    if (portalProps && portalProps.container instanceof Element) {
      newContainer = portalProps.container;
    } else {
      newContainer = document.body;
    }

    setCurrentContainer(newContainer);
  }, [portalProps, portalProps.container]);

  if (!isValidElement(children) || !currentContainer) {
    if (!isValidElement(children)) console.warn('TooltipContainer: 유효한 trigger 가 필요합니다.');

    return null;
  }

  return (
    <>
      <TooltipTrigger {...(triggerProps || {})}>{children}</TooltipTrigger>
      <TooltipPortal {...portalProps} container={currentContainer}>
        {!disabled && (
          <TooltipContent {...restContentProps} side={side} align={align} className={cn(contentClass, className)}>
            {contents}
            {isShowArrow && <TooltipArrow {...arrowProps} className={cn(arrowClass)} />}
          </TooltipContent>
        )}
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
