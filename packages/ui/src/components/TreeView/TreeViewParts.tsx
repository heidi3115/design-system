'use client';

import { type ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@common/ui/lib/utils';
import { treeViewVariants } from './treeViewVariants';

export type TreeViewRootProps = ComponentProps<'div'>;

function TreeViewRoot({ className, ...props }: TreeViewRootProps) {
  return <div role="tree" data-slot="tree-view" className={cn(className)} {...props} />;
}

export type TreeViewItemProps = ComponentProps<'div'> & {
  level?: number;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
};

function TreeViewItem({
  disabled = false,
  expanded = false,
  selected = false,
  level = 0,
  className,
  children,
  ...props
}: TreeViewItemProps) {
  const disabledClass = treeViewVariants({ disabled }).base();

  return (
    <div
      {...props}
      role="treeitem"
      data-slot="tree-view-item"
      data-expanded={expanded ? 'expanded' : 'collapsed'}
      data-selected={selected}
      aria-level={level}
      aria-selected={selected}
      aria-disabled={disabled}
      className={cn(className, disabledClass)}>
      {children}
    </div>
  );
}

export type TreeViewItemTriggerProps = ComponentProps<'button'> & {
  asChild?: boolean;
  expanded?: boolean;
};

function TreeViewItemTrigger({ asChild = false, expanded = true, className, ...props }: TreeViewItemTriggerProps) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="tree-item-trigger" aria-expanded={expanded} className={cn(className)} {...props} />;
}

export type TreeViewItemContentProps = ComponentProps<'div'>;

function TreeViewItemContent({ className, ...props }: TreeViewItemContentProps) {
  return <div data-slot="tree-item-content" className={cn(className)} {...props} />;
}

export { TreeViewRoot, TreeViewItem, TreeViewItemTrigger, TreeViewItemContent };
