'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../../lib/utils';

function TabsRoot({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('text-juiText-secondary font-medium inline-flex min-h-12 w-fit', className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, disabled, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        [
          'data-[state=active]:text-juiText-primary',
          'data-[state=active]:font-bold',

          // 액티브 시 스타일
          !disabled && 'active:bg-juiGrey-300 active:scale-80 duration-500 ease-in-out active:rounded-full',

          // 비활성화 상태
          'disabled:cursor-not-allowed',
          'disabled:text-juiText-disabled',

          'focus-visible:border-0 focus-visible:ring-[0px] focus-visible:outline-0',
          'focus-visible:bg-juiGrey-300 duration-500 ease-in-out ',

          // 레이아웃 및 크기
          'inline-block',
          'items-center',
          'justify-center',
          'gap-1.5',

          // 박스 스타일
          'px-4 py-2',
          'whitespace-nowrap',
          'transition-[color,box-shadow]',

          // SVG 자식 요소 스타일
          '[&_svg]:pointer-events-none',
          '[&_svg]:shrink-0',
          "[&_svg:not([class*='size-'])]:size-4",
        ],
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
