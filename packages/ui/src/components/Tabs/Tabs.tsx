'use client';

import { type ComponentProps, type ComponentType, type ReactNode, useEffect, useState } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { TabsRoot, TabsList, TabsTrigger, TabsContent } from './TabsParts';
import { useTabIndicator } from './hooks/useTabIndicator';
import { cn } from '../../lib/utils';

const tabsTriggerVariants = tv({
  base: '',
  slots: {
    content: '',
    underline: '',
    tabsAlign: '',
  },
  variants: {
    variant: {
      primary: { content: '', underline: 'bg-juiPrimary' },
      secondary: { content: '', underline: 'bg-juiSecondary' },
      error: { content: '', underline: 'bg-juiError' },
      ghost: { content: '', underline: '' },
    },
    align: {
      left: { tabsAlign: '' },
      right: { tabsAlign: 'self-end' },
      center: { tabsAlign: 'self-center' },
    },
    shape: {
      underline: {},
      badge: { content: 'rounded-full', underline: 'hidden' },
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      shape: 'badge',
      class: {
        content:
          'data-[state=active]:bg-juiPrimary data-[state=active]:text-white py-0 h-8 data-[state=active]:font-bold',
      },
    },
    {
      variant: 'secondary',
      hape: 'badge',
      class: { content: 'data-[state=active]:bg-juiSecondary data-[state=active]:text-white py-0 h-8 font-bold' },
    },
    {
      variant: 'error',
      hape: 'badge',
      class: { content: 'data-[state=active]:bg-juiError data-[state=active]:text-white py-0 h-8 font-bold' },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    align: 'left',
    shape: 'underline',
  },
});

type TabItemBaseType = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabItemWithComponent<C extends ComponentType<any>> = TabItemBaseType & {
  component?: C;
  props?: ComponentProps<C>;
};

type TabItemWithContent = TabItemBaseType & {
  content?: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TabItemType<C extends ComponentType<any> = ComponentType<any>> = OnlyOne<
  TabItemWithComponent<C>,
  TabItemWithContent
>[];

type TabsProps<T extends TabItemType> = {
  tabs: T;
} & ComponentProps<typeof TabsRoot> &
  VariantProps<typeof tabsTriggerVariants>;

function Tabs<T extends TabItemType>({
  defaultValue,
  tabs,
  variant,
  align,
  shape = 'underline',
  onValueChange,
}: TabsProps<T>) {
  const { content, underline, tabsAlign } = tabsTriggerVariants({
    variant,
    shape,
    align,
  });

  const [activeValue, setActiveValue] = useState(defaultValue ?? tabs?.[0]?.value);

  const { listRef, indicatorStyle, updateIndicator } = useTabIndicator<HTMLDivElement>();

  useEffect(() => {
    if (shape !== 'underline') return;

    updateIndicator();
  }, [activeValue, shape, tabs]);

  return (
    <TabsRoot
      defaultValue={activeValue}
      onValueChange={(value) => {
        setActiveValue(value);
        onValueChange?.(value);
      }}>
      <TabsList
        ref={listRef}
        className={cn('relative', tabsAlign(), shape === 'underline' ? 'min-h-12 my-0' : 'min-h-8 py-2')}>
        {tabs
          .filter(({ hidden = false }) => !hidden)
          .map(({ value, label, disabled = false }) => (
            <TabsTrigger key={value} className={cn(content())} value={value} disabled={disabled}>
              {label}
            </TabsTrigger>
          ))}

        {shape === 'underline' && (
          <div
            className={cn(underline(), 'absolute bottom-0.5 h-[3px] transition-all duration-300')}
            style={{
              width: `${indicatorStyle.width}px`,
              transform: `translateX(${indicatorStyle.left}px)`,
            }}
          />
        )}
      </TabsList>

      {tabs
        .filter(({ hidden = false }) => !hidden)
        .map(({ value, component: Component, props, content: tabContent }) => {
          if (!Component && !tabContent) return null;

          return (
            <TabsContent key={value} value={value}>
              {Component ? <Component {...props} /> : (tabContent ?? null)}
            </TabsContent>
          );
        })}
    </TabsRoot>
  );
}

export default Tabs;
