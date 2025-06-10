import React, { type Ref } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import {
  TooltipContainer,
  type TooltipContainerProps,
  TooltipWrapper,
  type TooltipWrapperProps,
} from '@common/ui/components';

// const DEFAULT_DELAY_DURATION = 700;
// const SKIP_DELAY_DURATION = 300;
const DEFAULT_SIDE_OFFSET = 5;
const DEFAULT_ALIGN_OFFSET = 5;

export const BasicTooltipVariants = tv({
  base: ['size-fit', 'text-juiText-primary', 'bg-juiBackground-paper rounded-md'],
  variants: {
    size: {
      small: '',
      medium: '',
      large: '',
      custom: '',
    },
    side: {
      top: '',
      bottom: '',
      left: '',
      right: '',
    },
    align: {
      start: '',
      center: '',
      end: '',
    },
  },
  slots: {
    content: [
      'animate-in fade-in-0 zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      '',
    ],
    arrow: [''],
  },
});

// type Boundary = React.ReactElement | null | Array<React.ReactElement | null>;

type TooltipBaseProps = {
  // TooltipProvider
  /**
   * disableHoverableContent: Tooltip.Content에 hover 해도 닫히지 않게 할 지 여부
   */
  disableHoverableContent?: boolean;
  /**
   * delayDuration: 모든 Tooltip의 기본 지연 시간(ms, 기본 700)
   */
  delayDuration?: number;
  /**
   * skipDelayDuration: 연속적으로 여러 Tooltip을 열 때 지연을 줄이기 위한 속성(기본 300)
   */
  skipDelayDuration?: number;
  // TooltipRoot
  /**
   * open: Tooltip 열림. 제어 방식 처리(외부)
   */
  open?: boolean;
  /**
   * defaultOpen: 비제어 방식 처리(내부)
   */
  defaultOpen?: boolean;
  /**
   * onOpenChange: 열림 상태 관리
   */
  onOpenChange?: (open: boolean) => void;
  // TooltipPortal
  /**
   * fadeOut: forceMount 으로써,
   */
  fadeOut?: true | undefined;
  /**
   * portalContainer:
   */
  // portalContainer?: HTMLElement | undefined;
  // TooltipContent
  /**
   * contentSize: Tooltip의 content의 크기를 지정합니다. small | medium | large | custom 등의 형태가 있습니다. 기본값은 medium 이고, custom은 크기 별도 지정이 필요할 경우입니다.
   */
  contentSize?: VariantProps<typeof BasicTooltipVariants>['size'];
  /**
   * side:
   */
  side?: VariantProps<typeof BasicTooltipVariants>['side'];
  /**
   * sideOffset:
   */
  sideOffset?: number;
  /**
   * align:
   */
  align?: VariantProps<typeof BasicTooltipVariants>['align'];
  /**
   * alignOffset:
   */
  alignOffset?: number;
  /**
   * className:
   */
  className?: string;
  avoidCollisions?: boolean;
  // collisionBoundary?: Boundary;
  // collisionBoundary?: React.ReactElement | null | Array<React.ReactElement | null>;
  collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>; // VariantProps<typeof BasicTooltipVariants>['side']
  sticky?: 'partial' | 'always';
  hideWhenDetached?: boolean;
  // onEscapeKeyDown?: (event: KeyboardEvent) => void;
  // onPointerDownOutside?: ( ((event: pointerdown) => void) | undefined;
  // TooltipArrow
  /**
   * showArrow:
   */
  showArrow?: boolean;
  /**
   * arrowPadding:
   */
  arrowPadding?: number;
  //
  /**
   * tooltipOpenStatusRef:
   */
  tooltipOpenStatusRef?: Ref<boolean>;
  contents: React.ReactNode | string;
};

// type ChildrenType = { children: React.ReactNode | string };
type ChildrenType = { children: React.ReactNode };
// type TriggerType = { trigger: React.ReactNode };

// export type BasicTooltipProps = OnlyOne<ChildrenType, TriggerType> & TooltipBaseProps;
export type TooltipContentProps = TooltipBaseProps & ChildrenType; // & TriggerType;
export type BasicTooltipProps = TooltipContentProps;
//   & { providerProps?: TooltipProviderProps } & {
//   rootProps?: TooltipRootProps;
// } & { triggerProps?: TooltipTriggerProps } & { portalProps: TooltipPortalProps } & {
//   contentsProps?: TooltipContentProps;
// } & { arrowProps?: TooltipArrowProps };

function BasicTooltip({
  // Provider
  providerProps = {
    delayDuration: 0,
    skipDelayDuration: 0,
    // disableHoverableContent:true,
  },
  // delayDuration = DEFAULT_DELAY_DURATION,
  // skipDelayDuration = SKIP_DELAY_DURATION,

  // Root
  rootProps = {
    open: false,
    defaultOpen: false,
    // onOpenChange,
  },
  // open = false,
  // defaultOpen = false,
  // onOpenChange,
  // Trigger
  // trigger,
  triggerProps,
  //Portal
  portalProps = { forceMount: true },
  // fadeOut = true,
  // portalContainer,
  // portalContainer = document.body,
  // Arrow
  arrowProps,
  isShowArrow = true,
  // arrowPadding = DEFAULT_SIDE_OFFSET,
  // Content
  contentProps = {
    contentSize: 'medium',
    side: 'top',
    sideOffset: DEFAULT_SIDE_OFFSET,
    align: 'center',
    alignOffset: DEFAULT_ALIGN_OFFSET,
    avoidCollisions: true,
    collisionPadding: 8,
    sticky: 'partial',
    hideWhenDetached: false,
  },
  className,
  children,
  contents,
  // contentSize = 'medium',
  // side = 'top',
  // sideOffset = DEFAULT_SIDE_OFFSET,
  // align = 'center',
  // alignOffset = DEFAULT_ALIGN_OFFSET,
  // avoidCollisions = true,
  // collisionPadding = 8,
  // sticky = 'partial',
  // hideWhenDetached = false,
  // onEscapeKeyDown,
  // onPointerDownOutside,
  // collisionBoundary = [],
  tooltipOpenStatusRef,
  // ...props
  // }: BasicTooltipProps) {
}: TooltipWrapperProps & TooltipContainerProps) {
  // const isControlled = open !== undefined;
  // const [internalOpen, setInternalOpen] = useState(rootProps?.defaultOpen ?? false);
  // const currentOpen = isControlled ? open : internalOpen;
  //
  // const { content, arrow } = BasicTooltipVariants({
  //   size: contentProps?.contentSize,
  //   side: contentProps?.side,
  //   align: contentProps?.align,
  // });

  // const handleTooltipOpenChange = (nextOpen: boolean) => {
  //   if (!isControlled) setInternalOpen(nextOpen);
  //   rootProps?.onOpenChange?.(nextOpen);
  // };

  // // 비제어 선택값
  // useImperativeHandle(tooltipOpenStatusRef, () => currentOpen);

  return (
    <TooltipWrapper providerProps={providerProps} rootProps={rootProps} tooltipOpenStatusRef={tooltipOpenStatusRef}>
      <TooltipContainer
        triggerProps={triggerProps}
        portalProps={portalProps}
        contentProps={contentProps}
        arrowProps={arrowProps}
        isShowArrow={isShowArrow}
        contents={contents}
        className={className}>
        {children}
      </TooltipContainer>
    </TooltipWrapper>
  );

  // return (
  //   <TooltipPrimitive.TooltipProvider
  //     delayDuration={delayDuration}
  //     skipDelayDuration={skipDelayDuration}
  //     disableHoverableContent={disableHoverableContent}>
  //     <TooltipPrimitive.Root
  //       data-slot="tooltip"
  //       open={currentOpen}
  //       defaultOpen={defaultOpen}
  //       delayDuration={delayDuration}
  //       onOpenChange={handleTooltipOpenChange}>
  //       <TooltipPrimitive.Trigger data-slot="tooltip-trigger" asChild={true}>
  //         {children}
  //       </TooltipPrimitive.Trigger>
  //       <TooltipPrimitive.Portal
  //         forceMount={fadeOut}
  //         // container={actualPortalContainer}
  //         // container={portalContainer}
  //       >
  //         <TooltipPrimitive.Content
  //           data-slot="tooltip-content"
  //           side={side}
  //           sideOffset={sideOffset}
  //           align={align}
  //           alignOffset={alignOffset}
  //           arrowPadding={arrowPadding}
  //           avoidCollisions={avoidCollisions}
  //           sticky={sticky}
  //           collisionPadding={collisionPadding}
  //           hideWhenDetached={hideWhenDetached}
  //           className={cn(content(), className)}
  //           {...props}>
  //           {contents}
  //           {showArrow && <TooltipPrimitive.Arrow data-slot="tooltip-arrow" className={cn(arrow())} />}
  //         </TooltipPrimitive.Content>
  //       </TooltipPrimitive.Portal>
  //     </TooltipPrimitive.Root>
  //   </TooltipPrimitive.TooltipProvider>
  // );
}

export default BasicTooltip;

BasicTooltip.displayName = 'Tooltip';
