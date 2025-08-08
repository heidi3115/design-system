'use client';

import React, { useImperativeHandle, useState } from 'react';
import { CollapsibleContent, CollapsibleRoot, type CollapsibleRootProps, CollapsibleTrigger } from './CollapsibleParts';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@common/ui/lib/utils';

export const collapsibleVariants = tv({
  base: '',
  variants: {
    size: {
      small: { contentVariant: 'px-1 py-2' },
      basic: { contentVariant: 'px-1.5 py-2.5' },
      medium: { contentVariant: 'px-2 py-3' },
      large: { contentVariant: 'px-2.5 py-3.5' },
      custom: { contentVariant: '' },
    },
  },
  slots: {
    rootVariant: 'flex flex-col gap-4',
    previewVariant: 'flex flex-row items-center justify-between gap-2 w-full',
    triggerVariant: 'flex items-center justify-between',
    contentVariant: 'rounded-md shadow-md',
  },
});

export type CollapsibleProps = CollapsibleRootProps & {
  /**
   * showPreview: preview 영역(요약, 미리보기 등)을 표시할지 여부를 지정합니다.
   * true로 설정 시: preview prop에 전달된 내용을 trigger 옆에 함께 보여줍니다.
   * 기본값은 true 입니다.
   */
  showPreview?: boolean;
  /**
   * size: Collapsible 의 root, preview, content 에 padding 의 차등입니다.
   */
  size?: VariantProps<typeof collapsibleVariants>['size'];
  /**
   * preview: Collapsible 가 닫혀 있을 때, trigger 옆에 표시되는 미리보기(요약) 영역의 콘텐츠입니다.
   * ReactNode 타입으로, 텍스트, 아이콘, 요약 정보 등 원하는 내용을 자유롭게 넣을 수 있습니다.
   * showPreview가 false면 보여지지 않습니다.
   */
  preview?: React.ReactNode;
  /**
   * trigger: Collapsible 의 열고/닫을(toggle) trigger 요소(ReactElement)로, ReactElement 로 표현 가능한 모든 요소를 넣을 수 있습니다.
   */
  trigger?: React.ReactElement;
  /**
   * openStatusRef: Collapsible 의 열림 상태를 외부에서 참조할 수 있도록 하는 Ref 객체입니다.
   * 참조 타입은 boolean 으로 합니다.
   */
  openStatusRef?: React.Ref<boolean>;
  /**
   * className: 추가적인 CSS 클래스(Tailwind CSS 클래스 가능)를 지정할 수 있습니다.
   */
  className?: string;
  /**
   * contentClassName: Collapsible 의 content 에 추가적인 CSS 클래스(Tailwind CSS 클래스 가능)를 지정할 수 있습니다.
   */
  contentClassName?: string;
};

function Collapsible({
  disabled = false,
  showPreview = true,
  defaultOpen = false,
  size = 'small',
  open,
  onOpenChange,
  trigger,
  preview,
  children,
  className,
  contentClassName,
  openStatusRef,
  ...props
}: CollapsibleProps) {
  const { base, rootVariant, triggerVariant, previewVariant, contentVariant } = collapsibleVariants({ size });

  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const currentOpen = isControlled ? open : internalOpen;

  // 비제어 선택값
  useImperativeHandle(openStatusRef, (): boolean => currentOpen);

  const handleCollapsibleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <CollapsibleRoot
      {...props}
      defaultOpen={internalOpen}
      open={currentOpen}
      onOpenChange={handleCollapsibleOpenChange}
      disabled={disabled}
      className={cn(base(), rootVariant(), className)}>
      <div data-slot="collapsible-trigger-wrapper" className={cn(base(), previewVariant())}>
        {showPreview && <div data-slot="collapsible-preview">{preview}</div>}
        {trigger && (
          <CollapsibleTrigger asChild className={cn(triggerVariant())}>
            {trigger}
          </CollapsibleTrigger>
        )}
      </div>
      <CollapsibleContent className={cn(base(), contentVariant(), contentClassName)}>{children}</CollapsibleContent>
    </CollapsibleRoot>
  );
}

export default Collapsible;
