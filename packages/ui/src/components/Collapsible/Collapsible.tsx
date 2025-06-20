'use client';

import React, { useImperativeHandle, useState } from 'react';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from './CollapsibleParts';
import { tv } from 'tailwind-variants';
import { cn } from '@common/ui/lib/utils';

export const collapsibleVariants = tv({});

export type CollapsibleProps = {
  /**
   * defaultOpen: Collapsible  초기 열림 상태입니다. 내부적으로 상태를 관리할 때 사용합니다(Uncontrolled).
   * 기본값은 처음부터 닫힘 상태로 시작(false)합니다.
   */
  defaultOpen?: boolean;
  /**
   * open: Collapsible 의 열림 상태를 제어하는 prop 으로써 외부에서 상태를 직접 관리할 때 사용합니다(Controlled).
   */
  open?: boolean;
  /**
   * disabled: Collapsible 트리거(trigger)의 비활성화 여부입니다. 비활성화(false) 시 trigger 작동하지 않습니다.
   * 기본값은 false 입니다.
   */
  disabled?: boolean;
  /**
   * showPreview: preview 영역 표시 여부입니다.
   * 기본값은 true 입니다.
   */
  showPreview?: boolean;
  /**
   * preview:
   */
  preview?: React.ReactNode;
  /**
   * trigger: 열고 닫을(toggle) 트리거 요소(ReactNode)로서, 표현 가능한 모든 요소를 넣을 수 있습니다.
   */
  trigger: React.ReactNode;
  /**
   * children: 숨겨진 콘텐츠 내용으로서, ReactNode로 표현 가능한 모든 요소를 넣을 수 있습니다.
   */
  children: React.ReactNode;
  /**
   * className: 추가적인 CSS 클래스(Tailwind CSS 클래스 가능)를 지정할 수 있습니다.
   */
  className?: string;
  /**
   * onOpenChange: Collapsible 의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.
   * open prop과 함께 사용하여 상태를 외부에서 제어할 때 활용합니다.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * openStatusRef: Collapsible 의 열림 상태를 외부에서 참조할 수 있도록 하는 Ref 객체입니다.
   * 참조 타입은 boolean 으로 합니다.
   */
  openStatusRef?: React.Ref<boolean>;
};

function Collapsible({
  disabled = false,
  showPreview = true,
  defaultOpen = false,
  open,
  onOpenChange,
  trigger,
  preview,
  children,
  className,
  openStatusRef,
}: CollapsibleProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const currentOpen = isControlled ? open : internalOpen;

  // 비제어 선택값
  useImperativeHandle(openStatusRef, (): boolean => currentOpen);

  const handleCollapsibleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);

    // openStatusRef 동기화
    if (openStatusRef && typeof openStatusRef !== 'function') {
      openStatusRef.current = nextOpen;
    }
  };

  return (
    <CollapsibleRoot
      defaultOpen={internalOpen}
      open={currentOpen}
      onOpenChange={handleCollapsibleOpenChange}
      disabled={disabled}
      className={cn('flex flex-col gap-4 rounded-md shadow-md')}>
      <div className={'flex flex-row items-center justify-between gap-2 w-full'}>
        {showPreview && <div className={cn('flex items-center justify-between')}>{preview}</div>}
        <CollapsibleTrigger asChild className={cn('flex items-center justify-center')}>
          {trigger}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className={cn(className)}>{children}</CollapsibleContent>
    </CollapsibleRoot>
  );
}

export default Collapsible;
