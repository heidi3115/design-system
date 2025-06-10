import React from 'react';
import { type VariantProps } from 'tailwind-variants';
import {
  TooltipContainer,
  type TooltipContainerProps,
  TooltipWrapper,
  type TooltipWrapperProps,
} from '@common/ui/components';
import BasicTooltipVariants from '@common/ui/components/Tooltip/TooltipUtils';

type TooltipBaseProps = {
  // Wrapper
  /**
   * delayDuration: 모든 Tooltip의 기본 지연 시간(ms, 기본 700)
   */
  delayDuration?: number;
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
  // Container
  /**
   * fadeOut: Tooltip의 Portal 과 Contents의 API 명으로는 forceMount 로써,
   * Tooltip이 닫힐 때 바로 DOM 에서 사라지면 애니메이션 유지가 되지 않으므로 forceMount의 기본값을 true 로 하여 fade-out 애니메이션이 적용되도록 하고,
   * forceMount 보다 fadeOut 이 직관적이라 이름을 바꾸었습니다.
   */
  fadeOut?: true | undefined;
  /**
   * isShowArrow: 툴팁의 화살표 표시 여부. 기본값 true
   */
  isShowArrow?: boolean;
  /**
   * size: Tooltip의 content의 크기를 지정합니다. small | medium | large | custom 등의 형태가 있습니다. 기본값은 medium 이고, custom은 크기 별도 지정이 필요할 경우입니다.
   */
  size?: VariantProps<typeof BasicTooltipVariants>['size'];
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
   * trigger:
   */
  trigger: React.ReactElement;
  /**
   * children:
   */
  children: React.ReactNode | string;
  /**
   * className:
   */
  className?: string;
  // ETC
  /**
   * :
   */
  tooltipOpenStatusRef?: React.Ref<boolean>;
};

export type BasicTooltipProps = TooltipBaseProps & {
  wrapperProps?: Omit<TooltipWrapperProps, 'children'>;
  containerProps?: TooltipContainerProps;
};

function BasicTooltip({
  delayDuration,
  open,
  defaultOpen,
  onOpenChange,
  tooltipOpenStatusRef,
  fadeOut = undefined,
  isShowArrow = true,
  size = 'medium',
  // sideOffset
  side = 'top',
  // alignOffset
  align = 'center',
  trigger,
  children,
  className,
  ...props
}: BasicTooltipProps) {
  // const { content, arrow, base } = BasicTooltipVariants();

  return (
    <TooltipWrapper
      providerProps={{ delayDuration, ...(props?.wrapperProps?.providerProps || {}) }}
      rootProps={{ open, defaultOpen, onOpenChange, ...(props?.wrapperProps?.rootProps || {}) }}
      tooltipOpenStatusRef={tooltipOpenStatusRef}>
      <TooltipContainer
        portalProps={{ forceMount: fadeOut, ...(props?.containerProps?.portalProps || {}) }}
        contentProps={{ size, side, align, ...(props?.containerProps?.contentProps || {}) }}
        arrowProps={{ ...(props?.containerProps?.arrowProps || {}) }}
        isShowArrow={isShowArrow}
        trigger={trigger}
        className={className}
        // contentClass={cn(base({ size, side, align, fadeOut }), content(), className)}
        // arrowClass={cn(arrow())}
      >
        {children}
      </TooltipContainer>
    </TooltipWrapper>
  );
}

export default BasicTooltip;

BasicTooltip.displayName = 'Tooltip';
