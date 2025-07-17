'use client';

import React, { isValidElement, useEffect, useImperativeHandle, useState } from 'react';
import { type VariantProps } from 'tailwind-variants';
import { cn } from '@common/ui/lib/utils';
import { tooltipVariants } from './tooltipVariants';
import {
  TooltipArrow,
  type TooltipArrowProps,
  TooltipContent,
  type TooltipContentProps,
  TooltipPortal,
  type TooltipPortalProps,
  TooltipProvider,
  type TooltipProviderProps,
  TooltipRoot,
  type TooltipRootProps,
  TooltipTrigger,
  type TooltipTriggerProps,
} from './TooltipParts';
import useExtractClassName from '../../hooks/useExtractClassName';

export const DEFAULT_SIDE_OFFSET = 6;
export const DEFAULT_ALIGN_OFFSET = 0;
export const DEFAULT_DELAY_DURATION = 700;
export const DEFAULT_FADEOUT_DURATION = 700;

export type TextAlignType = 'left' | 'center' | 'right';

type TooltipBaseProps = {
  // Wrapper
  /**
   * delayDuration: 모든 Tooltip의 기본 지연 시간(ms, 기본 700)으로, Tooltip이 보여지기 전 대기 시간(밀리초 단위)입니다.
   * 사용자가 trigger 에 마우스를 올렸을 때 Tooltip이 등장하기까지의 지연 시간을 설정할 수 있습니다.
   * 기본값은 0 입니다.
   */
  delayDuration?: number;
  /**
   * open: Tooltip의 열림 상태를 제어하는 prop 으로 외부에서 상태를 직접 관리할 때 사용합니다(Controlled).
   */
  open?: boolean;
  /**
   * defaultOpen: Tooltip의 초기 열림 상태입니다. 내부적으로 상태를 관리할 때 사용합니다(Uncontrolled).
   * 기본값은 false 입니다.
   */
  defaultOpen?: boolean;
  /**
   * onOpenChange: Tooltip의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.
   * open prop과 함께 사용하여 상태를 외부에서 제어할 때 활용합니다.
   */
  onOpenChange?: (open: boolean) => void;
  // Container
  /**
   * fadeOut: Tooltip이 닫힐 때 fade-out 애니메이션을 적용할 지 여부 입니다.
   * Tooltip이 닫힐 때 해당 시간만큼 자연스럽게 사라지는 애니메이션이 적용됩니다.
   * 기본값은 false 이며, true 시 700(ms/밀리초 단위) 이 적용이 됩니다.
   */
  fadeOut?: boolean;
  /**
   * isArrow: Tooltip의 화살표(arrow) 표시 여부입니다. true로 설정 시 Tooltip에 화살표가 나타나며, 기본값은 true 입니다.
   */
  isArrow?: boolean;
  /**
   * variant: Tooltip의 색상입니다.
   * 'default', 'primary', 'secondary', 'error', 'transparent', 'custom' 중 하나를 선택할 수 있습니다.
   * 기본값은 'default' 이며, 'custom' 은 크기 별도 지정이 필요할 경우입니다.
   */
  variant?: VariantProps<typeof tooltipVariants>['variant'];
  /**
   * size: Tooltip의 content의 크기를 지정합니다.
   * 'small', 'medium', 'large', 'custom' 등의 형태가 있습니다.
   * 기본값은 'medium' 이고, 'custom' 은 크기 별도 지정이 필요할 경우입니다.
   * 별도 지정 시 bg-* 로 시작하는 TailwindCSS 에서 적용되는 내역이 필요하며, className에 꼭 추가해야 합니다.
   */
  size?: VariantProps<typeof tooltipVariants>['size'];
  /**
   * side: Tooltip이 표시될 방향을 지정합니다.
   * 'top', 'bottom', 'left', 'right' 중 하나를 선택할 수 있습니다.
   * 기본값은 'top' 입니다.
   */
  side?: TooltipContentProps['side'];
  /**
   * sideOffset: Tooltip이 trigger 로부터 얼마나 떨어져서 표시될지(픽셀 단위) 지정합니다.
   * 기본값은 현재 8 입니다.
   */
  sideOffset?: TooltipContentProps['sideOffset'];
  /**
   * align: Tooltip의 정렬 기준을 지정합니다.
   * 'start', 'center', 'end' 중 하나를 선택할 수 있습니다.
   * 기본값은 'center' 입니다.
   */
  align?: TooltipContentProps['align'];
  /**
   * alignOffset: Tooltip의 정렬 상태 기준에서 추가로 얼마나 이동할지(픽셀 단위) 지정합니다. 기본값은 0 입니다.
   */
  alignOffset?: TooltipContentProps['alignOffset'];
  /**
   * textAlign: Tooltip 내부 텍스트의 정렬 방식을 지정합니다.
   * 'left', 'center', 'right' 중 하나를 선택할 수 있습니다.
   * 기본값은 'left' 입니다.
   */
  textAlign?: TextAlignType;
  /**
   * contents: Tooltip에 표시할 내용입니다. 기본적으로 간단한 문자열을 받는 것을 기준으로 하고 있습니다.
   */
  contents: React.ReactNode;
  /**
   * className: Tooltip의 추가적인 CSS 클래스(Tailwind CSS 클래스 가능)를 지정할 수 있습니다.
   */
  className?: string;
  // ETC
  /**
   * openStatusRef: Tooltip의 열림 상태를 외부에서 참조할 수 있도록 하는 Ref 객체입니다.
   * 참조 타입은 boolean 으로 합니다.
   */
  openStatusRef?: React.Ref<boolean>;
  /**
   * disabled: Tooltip을 비활성화할지 여부입니다. true로 설정하면 Tooltip이 표시되지 않습니다. 기본값은 false 입니다.
   */
  disabled?: boolean;
};

type ChildrenType = { children: React.ReactElement };
type TriggerType = { trigger: React.ReactElement };

export type TooltipProps = OnlyOne<ChildrenType, TriggerType> & TooltipBaseProps;

export type TooltipWrapperProps = {
  providerProps?: Omit<TooltipProviderProps, 'children'>;
  rootProps?: TooltipRootProps;
  openStatusRef?: React.Ref<boolean>;
  children?: React.ReactNode;
};

function TooltipWrapper({ providerProps, rootProps, openStatusRef, children }: TooltipWrapperProps) {
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
    fadeOut?: boolean;
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
  isArrow?: boolean;
  disabled?: boolean;
  className?: string;
};

function TooltipContainer({
  triggerProps = { asChild: true },
  portalProps = { fadeOut: false },
  contentProps,
  arrowProps,
  children,
  contents,
  className,
  isArrow,
  disabled,
}: TooltipContainerProps) {
  const { fadeOut } = portalProps;
  const { variant, size, side, align, textAlign, ...restContentProps } = contentProps;
  const { content, arrow, base } = tooltipVariants({
    variant,
    size,
    textAlign,
    disabled,
  });
  const contentClass = cn(base(), content());

  const bgColor = useExtractClassName(size === 'custom' ? contentClass : cn(contentClass, className), 'bg-');

  const fadeOutClass = fadeOut
    ? `transition-opacity data-[state=closed]:duration-${DEFAULT_FADEOUT_DURATION}`
    : 'transition-opacity data-[state=closed]:duration-0';

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
          <TooltipContent
            {...restContentProps}
            side={side}
            align={align}
            className={cn(contentClass, fadeOutClass, className)}>
            {contents}
            {isArrow && (
              <TooltipArrow
                {...arrowProps}
                className={cn(arrow())}
                style={{
                  fill: bgColor ? `var(--color-${bgColor}, var(--${bgColor}))` : 'var(--juiBackground-tooltip)',
                }}
              />
            )}
          </TooltipContent>
        )}
      </TooltipPortal>
    </>
  );
}

function Tooltip({
  open,
  onOpenChange,
  openStatusRef,
  variant,
  size,
  contents,
  className,
  side = 'top',
  sideOffset = DEFAULT_SIDE_OFFSET,
  align = 'center',
  alignOffset = DEFAULT_ALIGN_OFFSET,
  textAlign,
  fadeOut = false,
  isArrow = true,
  disabled = false,
  delayDuration = DEFAULT_DELAY_DURATION,
  defaultOpen = false,
  trigger,
  children,
  ...props
}: TooltipProps) {
  const triggerNode = children ?? trigger;

  if (!isValidElement(triggerNode)) {
    console.warn('ConfirmDialog: 유효한 trigger 또는 children 이 필요합니다.');

    return null;
  }

  return (
    <TooltipWrapper
      providerProps={{ delayDuration }}
      rootProps={{ open, defaultOpen, onOpenChange }}
      openStatusRef={openStatusRef}>
      <TooltipContainer
        portalProps={{ fadeOut }}
        contentProps={{
          size,
          variant,
          side,
          sideOffset,
          align,
          alignOffset,
          textAlign,
        }}
        isArrow={isArrow}
        contents={contents}
        className={className}
        disabled={disabled}
        {...props}>
        {triggerNode}
      </TooltipContainer>
    </TooltipWrapper>
  );
}

export { TooltipWrapper, TooltipContainer };
export default Tooltip;
