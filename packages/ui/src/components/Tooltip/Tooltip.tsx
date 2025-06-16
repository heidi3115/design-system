import React from 'react';
import {
  DEFAULT_DELAY_DURATION,
  type TextAlignType,
  type TooltipAlignType,
  TooltipContainer,
  type TooltipSideType,
  tooltipVariants,
  TooltipWrapper,
} from '@common/ui/components/Tooltip';
import { type VariantProps } from 'tailwind-variants';
import { DEFAULT_ALIGN_OFFSET, DEFAULT_SIDE_OFFSET } from '@common/ui/components/Tooltip/TooltipUtils';

export type TooltipProps = {
  // Wrapper
  /**
   * delayDuration: 모든 Tooltip의 기본 지연 시간(ms, 기본 700)으로써, Tooltip이 보여지기 전 대기 시간(밀리초 단위)입니다.
   * 사용자가 트리거에 마우스를 올렸을 때 Tooltip이 등장하기까지의 지연 시간을 설정할 수 있습니다.
   * 기본값은 0 입니다.
   */
  delayDuration?: number;
  /**
   * open: Tooltip의 열림 상태를 제어하는 prop 으로써 외부에서 상태를 직접 관리할 때 사용합니다(Controlled).
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
   * fadeOut: Tooltip이 닫힐 때 fade-out 애니메이션을 적용할지 여부 및 애니메이션의 적용 시간(밀리초 단위)입니다.
   * Tooltip이 닫힐 때 해당 시간만큼 자연스럽게 사라지는 애니메이션이 적용됩니다.
   * fadeOut에 숫자가 들어가게 되면 forceMount가 true가 되고, fade-out 되는 시간이 입력값 만큼 적용됩니다.
   * 기본값은 undefined 이며, undefined 일 때도 300 이 적용이 됩니다.
   * Tailwind CSS 에서 지원하는 duration 값만 정상 동작합니다.
   */
  fadeOut?: VariantProps<typeof tooltipVariants>['fadeOut'] | undefined;
  /**
   * isShowArrow: Tooltip의 화살표(arrow) 표시 여부입니다. true로 설정 시 Tooltip에 화살표가 나타나며, 기본값은 true 입니다.
   */
  isShowArrow?: boolean;
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
   */
  size?: VariantProps<typeof tooltipVariants>['size'];
  /**
   * side: Tooltip이 표시될 방향을 지정합니다.
   * 'top', 'bottom', 'left', 'right' 중 하나를 선택할 수 있습니다.
   * 기본값은 'top' 입니다.
   */
  side?: TooltipSideType;
  /**
   * sideOffset: Tooltip이 트리거로부터 얼마나 떨어져서 표시될지(픽셀 단위) 지정합니다.
   * 기본값은 현재 8 입니다.
   */
  sideOffset?: number;
  /**
   * align: Tooltip의 정렬 기준을 지정합니다.
   * 'start', 'center', 'end' 중 하나를 선택할 수 있습니다.
   * 기본값은 'center' 입니다.
   */
  align?: TooltipAlignType;
  /**
   * alignOffset: Tooltip의 정렬 상태 기준에서 추가로 얼마나 이동할지(픽셀 단위) 지정합니다. 기본값은 0 입니다.
   */
  alignOffset?: number;
  /**
   * textAlign: Tooltip 내부 텍스트의 정렬 방식을 지정합니다.
   * 'left', 'center', 'right' 중 하나를 선택할 수 있습니다.
   * 기본값은 'left' 입니다.
   */
  textAlign?: TextAlignType;
  /**
   * contents: Tooltip에 표시할 내용입니다. 기본적으로 간단한 문자열을 받는 것을 기준으로 하고 있습니다.
   */
  contents: React.ReactNode | string;
  /**
   * children: Tooltip의 트리거 역할을 할 React 엘리먼트입니다.
   * Tooltip을 표시할 기준이 되는 컴포넌트(예: 버튼, 아이콘 등)를 전달합니다.
   */
  children: React.ReactElement;
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

function Tooltip({
  delayDuration = DEFAULT_DELAY_DURATION,
  open,
  defaultOpen = false,
  onOpenChange,
  openStatusRef,
  fadeOut = false,
  isShowArrow = true,
  variant = 'default',
  size = 'medium',
  side = 'top',
  sideOffset = DEFAULT_SIDE_OFFSET,
  align = 'center',
  alignOffset = DEFAULT_ALIGN_OFFSET,
  textAlign = 'left',
  contents,
  children,
  className,
  disabled = false,
  ...props
}: TooltipProps) {
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
        isShowArrow={isShowArrow}
        contents={contents}
        className={className}
        disabled={disabled}
        {...props}>
        {children}
      </TooltipContainer>
    </TooltipWrapper>
  );
}

export default Tooltip;
