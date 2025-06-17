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
      className={cn('text-juiText-secondary font-semibold inline-flex min-h-12 w-fit', className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        [
          'data-[state=active]:text-juiText-primary',

          // 액티브 시 스타일
          'active:bg-juiGrey-300 active:scale-80 active:opacity-50 duration-800  ease-in-out rounded-full',

          // 비활성화 상태
          'disabled:pointer-events-none',
          'disabled:opacity-50',

          // 레이아웃 및 크기
          'inline-flex',
          'flex-1',
          'items-center',
          'justify-center',
          'gap-1.5',

          // 박스 스타일
          'px-4 py-2 text-sm',
          'whitespace-nowrap',
          'transition-[color,box-shadow]',

          // SVG 자식 요소 스타일
          '[&_svg]:pointer-events-none',
          '[&_svg]:shrink-0',
          "[&_svg:not([class*='size-'])]:size-4",
        ],
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
