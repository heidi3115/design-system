'use client';

import { tv, type VariantProps } from 'tailwind-variants';

import { TabsRoot, TabsList, TabsTrigger, TabsContent } from './TabsParts';
import { cn } from '../../lib/utils';
import { type ComponentProps, type ComponentType, type ReactNode, useEffect, useRef, useState } from 'react';

export const tabsTriggerVariants = tv({
  base: '',
  slots: {
    content: '',
    underline: '',
  },
  variants: {
    variant: {
      primary: { content: '', underline: 'bg-juiPrimary' },
      secondary: { content: '', underline: 'bg-juiSecondary' },
      error: { content: '', underline: 'bg-juiError' },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsOf<T extends ComponentType<any>> = ComponentProps<T>;

// component + props 한 세트로 T에 따라 연동되게
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabItemWithComponent<C extends ComponentType<any>> = {
  component: C;
  props: PropsOf<C> & { [K in keyof PropsOf<C>]?: PropsOf<C>[K] };
  value: string;
  label: ReactNode;
};

// content-only 타입
type TabItemWithContent = {
  content: ReactNode;
  value: string;
  label: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabItem<C extends ComponentType<any> = ComponentType<any>> = OnlyOne<TabItemWithContent, TabItemWithComponent<C>>;

type TabsProps<T extends TabItem[]> = {
  tabs: T;
  defaultValue?: string;
} & ComponentProps<typeof TabsRoot> &
  VariantProps<typeof tabsTriggerVariants>;

function Tabs<T extends TabItem[]>({ defaultValue, tabs, variant }: TabsProps<T>) {
  const { content, underline } = tabsTriggerVariants({
    variant,
  });

  const [activeValue, setActiveValue] = useState(defaultValue ?? tabs?.[0]?.value);
  const listRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const updateIndicator = () => {
    if (!listRef.current) return;

    const buttons = Array.from(listRef.current.querySelectorAll('[role=tab]')) as HTMLElement[];
    const activeButton = buttons.find((btn) => btn.getAttribute('data-state') === 'active');

    if (activeButton) {
      setIndicatorStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
      });
    }
  };

  useEffect(() => {
    updateIndicator();
  }, [activeValue, tabs]);

  return (
    <TabsRoot defaultValue={activeValue} onValueChange={(val) => setActiveValue(val)}>
      <TabsList ref={listRef} className="relative flex">
        {tabs.map(({ value, label }) => (
          <TabsTrigger key={value} className={cn(content())} value={value}>
            {label}
          </TabsTrigger>
        ))}
        <div
          className={cn(underline(), 'absolute bottom-0.5 h-[3px] transition-all duration-300')}
          style={{
            width: `${indicatorStyle.width}px`,
            transform: `translateX(${indicatorStyle.left}px)`,
          }}
        />
      </TabsList>
      {tabs.map(({ value, component: Component, props, content: tabContent }) => (
        <TabsContent key={value} value={value}>
          {Component ? <Component {...props} /> : (tabContent ?? null)}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}

export default Tabs;
