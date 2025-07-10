'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight } from 'lucide-react';
import { cn } from '@common/ui/lib/utils';

function BreadcrumbWrapper({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      // className={cn('flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5', className)}
      className={cn(className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      // className={cn('inline-flex items-center gap-1.5', className)}
      className={cn(className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      // className={cn('transition-colors', className)}
      className={cn(className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      // className={cn('font-normal', className)}
      className={cn(className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      // className={cn('[&>svg]:size-3.5', className)}
      className={cn(className)}
      {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

export type BreadcrumbEllipsisProps = React.ComponentProps<'span'> & { icon?: React.ReactNode };

function BreadcrumbEllipsis({ className, icon, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      // className={cn('flex size-9 items-center justify-center', className)}
      className={cn(className)}
      {...props}>
      {/*{icon ?? <MoreHorizontal />}*/}
      {icon}
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  BreadcrumbWrapper,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
