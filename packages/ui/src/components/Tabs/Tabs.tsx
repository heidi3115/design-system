'use client';

import { type ComponentProps, type ComponentType, type ReactNode, useEffect, useState } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { TabsRoot, TabsList, TabsTrigger, TabsContent } from './TabsParts';
import tabsTriggerVariants from './tabsTriggerVariants';
import { useTabIndicator } from './hooks/useTabIndicator';
import { cn } from '../../lib/utils';

const DEFAULT_REST_HEIGHT = 120 as const;

type TabItemBaseType = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  contentBoxType?: 'flex' | 'box' | 'inBox';
  boxClassName?: string;
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
  maxWidth?: number;
  restScreenHeight?: number;
} & ComponentProps<typeof TabsRoot> &
  VariantProps<typeof tabsTriggerVariants>;

function Tabs<T extends TabItemType>({
  defaultValue,
  tabs,
  variant,
  align,
  maxWidth,
  className,
  shape = 'underline',
  size = 'default',
  restScreenHeight = DEFAULT_REST_HEIGHT,
  onValueChange,
}: TabsProps<T>) {
  const { content, underline, tabsAlign, list, firstForderTab } = tabsTriggerVariants({
    variant,
    shape,
    size,
    align: shape === 'folder' ? undefined : align,
  });

  const firstEnabledTab = tabs?.find((tab) => !tab.disabled)?.value;
  const [activeValue, setActiveValue] = useState(defaultValue ?? firstEnabledTab);

  const { listRef, indicatorStyle, updateIndicator } = useTabIndicator<HTMLDivElement>();

  useEffect(() => {
    if (shape !== 'underline') return;

    requestAnimationFrame(() => {
      updateIndicator();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeValue, shape, tabs]);

  useEffect(() => {
    if (activeValue != null) {
      onValueChange?.(activeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabsRoot
      defaultValue={activeValue}
      onValueChange={(value) => {
        setActiveValue(value);
        onValueChange?.(value);
      }}>
      <TabsList ref={listRef} className={cn('relative', tabsAlign(), list())}>
        {tabs
          .filter(({ hidden = false }) => !hidden)
          .map(({ value, label, disabled = false }, index) =>
            index === 0 && shape === 'folder' ? (
              <TabsTrigger
                key={value}
                className={cn(firstForderTab(), className)}
                style={{ maxWidth: `${maxWidth}px` }}
                value={value}
                disabled={disabled}>
                <span className="inline-flex">
                  {label} <div className="w-3"></div>
                </span>
              </TabsTrigger>
            ) : (
              <TabsTrigger
                key={value}
                className={cn(content(), className)}
                style={{ maxWidth: `${maxWidth}px` }}
                value={value}
                disabled={disabled}>
                {shape === 'folder' && <span className="inline-flex -skew-x-[10rad]">{label}</span>}
                {shape !== 'folder' && label}
              </TabsTrigger>
            ),
          )}

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
        .map(({ value, component: Component, props, content: tabContent, contentBoxType = 'flex', boxClassName }) => {
          if (!Component && !tabContent) return null;

          const contents = Component ? <Component {...props} /> : (tabContent ?? null);

          return (
            <TabsContent
              key={value}
              value={value}
              style={{ maxHeight: `calc(100svh - ${restScreenHeight}px)` }}
              className={cn(`overflow-auto`)}>
              {contentBoxType === 'flex' && contents}
              {contentBoxType === 'box' && (
                <div
                  className={cn('bg-juiBackground-paper', boxClassName)}
                  style={{ minHeight: `calc(100svh - ${120}px)` }}>
                  {contents}
                </div>
              )}
              {contentBoxType === 'inBox' && (
                <div
                  className={cn('overflow-hidden bg-juiBackground-paper p-4', boxClassName)}
                  style={{ height: `calc(100svh - ${120}px)` }}>
                  <div className="h-full overflow-auto">{contents}</div>
                </div>
              )}
            </TabsContent>
          );
        })}
    </TabsRoot>
  );
}

export default Tabs;
