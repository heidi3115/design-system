'use client';

import React, { type ComponentProps, type ComponentType, createElement, useImperativeHandle, useState } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@common/ui/lib/utils';
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from './HoverCardParts';

const DEFAULT_SIDE_OFFSET = 6;
const DEFAULT_ALIGN_OFFSET = 0;
const DEFAULT_OPEN_DELAY_MS = 700;
const DEFAULT_CLOSE_DELAY_MS = 300;

export const hoverCardVariants = tv({
  base: '',
  slots: {
    cardContents: [
      'flex items-center justify-center z-50',
      'rounded-md shadow-md outline-hidden text-juiText-primary',
      'origin-(--radix-hover-card-content-transform-origin)',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      '',
    ],
  },
  variants: {
    variant: {
      default: 'bg-juiBackground-popover',
      primary: 'bg-juiPrimary',
      secondary: 'bg-juiSecondary',
      error: 'bg-juiError',
      transparent: 'bg-juiBackground-paper',
    },
    size: {
      small: 'p-2',
      basic: 'p-3',
      medium: 'p-4',
      large: 'p-5',
      custom: '',
    },
  },
});

export type HoverCardBaseProps = {
  /**
   * openStatusRef: HoverCard 의 열림 상태를 외부에서 참조할 수 있도록 하는 Ref 객체입니다.
   * 참조 타입은 boolean 으로 합니다.
   */
  openStatusRef?: React.Ref<boolean>;
  /**
   * trigger: HoverCard를 열기 위해 사용되는 트리거 요소입니다.
   * ReactNode 또는 ComponentType 을 받을 수 있습니다.
   */
  trigger: React.ReactNode | ComponentType;
  /**
   * triggerClass: HoverCard 의 trigger 에 적용할 tailwindCSS 의 클래스 부분입니다.
   */
  triggerClass?: string;
  /**
   * contentClass: HoverCard 의 content 에 적용할 tailwindCSS 의 클래스 부분입니다.
   */
  contentClass?: string;
  /**
   * children: 숨겨진 content 내용으로서, HoverCard 가 열렸을 때 표시되는 실제 콘텐츠입니다.
   * HoverCard 가 닫혀 있을 때는 렌더링되지 않습니다.
   * ReactNode 로 표현 가능한 모든 요소를 넣을 수 있습니다.
   */
  children: React.ReactNode;
};

export type HoverCardProps = Pick<
  ComponentProps<typeof HoverCardRoot>,
  'defaultOpen' | 'open' | 'onOpenChange' | 'openDelay' | 'closeDelay'
> &
  VariantProps<typeof hoverCardVariants> &
  Pick<ComponentProps<typeof HoverCardContent>, 'side' | 'sideOffset' | 'align' | 'alignOffset'> &
  HoverCardBaseProps;

function HoverCard({
  variant = 'default',
  size = 'small',
  side = 'bottom',
  align = 'center',
  sideOffset = DEFAULT_SIDE_OFFSET,
  alignOffset = DEFAULT_ALIGN_OFFSET,
  openDelay = DEFAULT_OPEN_DELAY_MS,
  closeDelay = DEFAULT_CLOSE_DELAY_MS,
  defaultOpen,
  open,
  onOpenChange,
  trigger,
  triggerClass,
  children,
  contentClass,
  openStatusRef,
}: HoverCardProps) {
  const { base, cardContents } = hoverCardVariants({ variant, size });

  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const currentOpen = isControlled ? open : internalOpen;

  // 비제어 선택값
  useImperativeHandle(openStatusRef, (): boolean => currentOpen);

  const handleHoverCardOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);

    onOpenChange?.(nextOpen);
  };

  return (
    <HoverCardRoot
      openDelay={openDelay}
      closeDelay={closeDelay}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={handleHoverCardOpenChange}>
      <HoverCardTrigger asChild className={cn(triggerClass)}>
        {typeof trigger === 'function' ? createElement(trigger) : trigger}
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent
          side={side}
          alignOffset={alignOffset}
          align={align}
          sideOffset={sideOffset}
          className={cn(base(), cardContents(), contentClass)}>
          {children}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  );
}

export default HoverCard;
