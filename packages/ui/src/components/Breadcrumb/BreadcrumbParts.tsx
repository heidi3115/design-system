'use client';

import type { ComponentProps, ReactNode } from 'react';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@common/ui/lib/utils';
import { ChevronRightIcon, MoreHorizontalFilledIcon } from '@common/ui/icons';

function BreadcrumbWrapper({ ...props }: ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return <ol data-slot="breadcrumb-list" className={cn(className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-item" className={cn(className)} {...props} />;
}

type BreadcrumbLinkProps = ComponentProps<'a'> & {
  asChild?: boolean;
};

function BreadcrumbLink({ asChild = false, className, ...props }: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : 'a';

  return <Comp data-slot="breadcrumb-link" className={cn(className)} {...props} />;
}

function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(className)}
      {...props}
    />
  );
}

export type BreadcrumbEllipsisProps = React.ComponentProps<'span'> & { icon?: ReactNode; label?: string };

function BreadcrumbEllipsis({ className, icon, label, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" className={cn(className)} {...props}>
      {icon || <MoreHorizontalFilledIcon />}
      <span className="sr-only">{label || 'More'}</span>
    </span>
  );
}

type BreadcrumbSeparatorProps = ComponentProps<'li'> & { icon?: ReactNode };

function BreadcrumbSeparator({ icon, className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn(className)} {...props}>
      {icon ?? <ChevronRightIcon />}
    </li>
  );
}

export {
  BreadcrumbWrapper,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbEllipsis,
  BreadcrumbSeparator,
};
