'use client';

import type { Ref } from 'react';
import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../../lib/utils';
import type { VariantProps } from 'tailwind-variants';
import { BasicTooltipVariants } from '@common/ui/components/Tooltip/BasicTooltip';

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

function TooltipArrow({ ...props }: TooltipArrowProps) {
  return <TooltipPrimitive.Arrow data-slot="tooltip-arrow" {...props} />;
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
      // 'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance'
      {...props}
    />
  );
}

export type TooltipWrapperProps = {
  providerProps?: Omit<TooltipProviderProps, 'children'>;
  rootProps?: TooltipRootProps;
  children?: React.ReactNode;
  tooltipOpenStatusRef?: Ref<boolean>;
};

function TooltipWrapper({
  providerProps = { delayDuration: 0 },
  rootProps = { defaultOpen: false },
  children,
  // tooltipOpenStatusRef,
}: TooltipWrapperProps) {
  // const isControlled = open !== undefined;
  // const [internalOpen, setInternalOpen] = useState(rootProps?.defaultOpen ?? false);
  // const currentOpen = isControlled ? open : internalOpen;

  // 비제어 선택값
  // useImperativeHandle(tooltipOpenStatusRef, (): boolean => currentOpen);

  const handleTooltipOpenChange = (nextOpen: boolean) => {
    // if (!isControlled) setInternalOpen(nextOpen);
    rootProps?.onOpenChange?.(nextOpen);
  };

  return (
    <TooltipProvider {...providerProps}>
      <TooltipRoot
        {...rootProps}
        onOpenChange={handleTooltipOpenChange}
        // open={currentOpen}
      >
        {children}
      </TooltipRoot>
    </TooltipProvider>
  );
}

export type TooltipContainerProps = {
  triggerProps: TooltipTriggerProps;
  portalProps: TooltipPortalProps;
  contentProps: TooltipContentProps & { contentSize: VariantProps<typeof BasicTooltipVariants>['size'] };
  arrowProps: TooltipArrowProps;
  contents: React.ReactNode | string;
  children: React.ReactElement;
  isShowArrow?: boolean;
  className?: string;
};

function TooltipContainer({
  triggerProps,
  portalProps,
  contentProps,
  arrowProps,
  children,
  contents,
  className,
  isShowArrow = true,
}: TooltipContainerProps) {
  return (
    <>
      <TooltipTrigger {...triggerProps}>{children}</TooltipTrigger>
      <TooltipPortal {...portalProps}>
        <TooltipContent {...contentProps} className={className}>
          {contents}
          {isShowArrow && <TooltipArrow {...arrowProps} />}
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
