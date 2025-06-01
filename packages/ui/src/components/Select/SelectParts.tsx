'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@common/ui/icons';

import { cn } from '../../lib/utils';

function SelectRoot({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'small' | 'default' | 'large';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // 레이아웃 및 플렉스 관련
        'flex w-full items-center justify-between gap-2 whitespace-nowrap',

        // 박스 모델 (패딩, 보더, 라운드, 쉐도우)
        'px-3 py-2 light:border light:border-juiBorder-primary shadow-xs',
        'data-[state=open]:border data-[state=open]:border-juiBorder-primary light:data-[state=open]:border-juiText-secondary',

        // 색상 및 배경색
        'bg-juiBackground-input',
        'aria-invalid:border-juiError aria-invalid:ring-juiError/20 dark:aria-invalid:ring-juiError/40',

        // 포커스 및 outline
        'outline-none focus-visible:ring-0',

        // 상태 기반 스타일
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[placeholder]:text-juiText-secondary',

        // 사이즈 관련 (data attribute)
        'data-[size=default]:h-8 data-[size=small]:h-7 data-[size=large]:h-9 min-w-24',

        // 슬롯(select-value) 관련 자식 요소 스타일
        '*:data-[slot=select-value]:truncate',

        // SVG 관련 스타일
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:opacity-100',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-juiText-primary",

        // 트랜지션
        'transition-[color,box-shadow]',

        // 열렸을때 아이콘 회전
        'data-[state=open]:[&_svg]:rotate-180',

        // 외부 전달 클래스
        className,
      )}
      {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50 transition-transform duration-200" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          // 배경색, 글자색
          'bg-juiBackground-default',

          // 애니메이션 관련 (state)
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',

          // 애니메이션 관련 (side)
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',

          // 위치 관련
          'relative z-50',

          // 크기 관련(외부에서 wrapptr 만들면 검토)
          'max-h-96 min-w-32',

          // 트랜스폼 원점
          'origin-top-left',

          // 스크롤 관련
          'overflow-x-hidden overflow-y-auto',

          // 박스 스타일
          'shadow-md',

          // 포지션이 popper일 때 위치 보정
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',

          // 외부 전달 클래스
          className,
        )}
        position={position}
        {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-juiText-secondary px-2 py-1.5', className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // 상태 및 상호작용 관련
        'focus:bg-current/5 focus:text-juiText-primary',
        'data-[state=checked]:bg-juiPrimary/15',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',

        // 레이아웃 및 정렬
        'relative flex w-full items-center gap-2 pr-8 pl-2 py-1.5',

        // 타이포그래피 및 사용자 선택
        'text-sm select-none',

        // 커서 및 반응성
        'cursor-pointer outline-hidden',

        // 박스 스타일
        // 'rounded-sm',

        // SVG 관련
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-muted-foreground",

        // 마지막 span 관련 스타일
        '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',

        // 외부 전달 클래스
        className,
      )}
      {...props}>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-juiBorder-primary pointer-events-none mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
