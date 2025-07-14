import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { tv } from 'tailwind-variants';

import { ChevronDownIcon } from '@common/ui/icons';
import { cn } from '../../lib/utils';

function NavigationMenuRoot({
  className,
  children,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      orientation={orientation}
      className={cn(
        // Layout
        'group/navigation-menu',
        'relative flex flex-1 justify-center items-center',
        'max-w-max',
        className,
      )}
      {...props}>
      {children}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        // Layout
        'group flex flex-1 list-none items-center justify-center gap-1',
        'data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn('relative', className)} {...props} />
  );
}

const navigationMenuTriggerStyle = tv({
  base: [
    // Layout & Box Model
    'group inline-flex h-9 w-max items-center justify-center px-4 py-2',

    // Border & Radius
    'rounded-md',

    // Typography
    'text-sm font-medium',

    // Background & Text color
    'hover:bg-current/10! hover:text-juiText-primary!',
    'focus:bg-current/10! focus:text-juiText-primary!',
    'data-[state=open]:bg-current/5 data-[state=open]:text-current/90',

    // Disabled state
    'disabled:pointer-events-none disabled:opacity-50',

    // Focus styles
    'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1',

    // Behavior & Transition
    'outline-none transition-[color,box-shadow]',
  ],
});

function NavigationMenuTrigger({
  className,
  children,
  asChild,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      asChild={asChild}
      {...props}>
      {asChild ? (
        children
      ) : (
        <>
          {children}{' '}
          <ChevronDownIcon
            className="relative top-px ml-1 size-3 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </>
      )}
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        // ───────────── Motion (Slide/Fade) ─────────────
        'data-[orientation=horizontal]:data-[motion^=from-]:animate-in',
        'data-[orientation=horizontal]:data-[motion^=to-]:animate-out',
        'data-[orientation=horizontal]:data-[motion^=from-]:fade-in',
        'data-[orientation=horizontal]:data-[motion^=to-]:fade-out',
        'data-[orientation=horizontal]:data-[motion=from-end]:slide-in-from-right-52',
        'data-[orientation=horizontal]:data-[motion=from-start]:slide-in-from-left-52',
        'data-[orientation=horizontal]:data-[motion=to-end]:slide-out-to-right-52',
        'data-[orientation=horizontal]:data-[motion=to-start]:slide-out-to-left-52',

        // ─── vertical 전용 motion
        'data-[orientation=vertical]:data-[motion^=from-]:animate-in',
        'data-[orientation=vertical]:data-[motion^=to-]:animate-out',
        'data-[orientation=vertical]:data-[motion^=from-]:fade-in',
        'data-[orientation=vertical]:data-[motion^=to-]:fade-out',
        'data-[orientation=vertical]:data-[motion=from-start]:slide-in-from-top-30',
        'data-[orientation=vertical]:data-[motion=from-end]:slide-in-from-bottom-30',
        'data-[orientation=vertical]:data-[motion=to-start]:slide-out-to-top-30',
        'data-[orientation=vertical]:data-[motion=to-end]:slide-out-to-bottom-30',

        // ───────────── Layout ─────────────
        'absolute w-auto top-full left-0 p-2 pr-2.5 mt-1.5',
        'data-[orientation=vertical]:left-full data-[orientation=vertical]:top-0',
        'overflow-hidden',
        'rounded-md',
        'border border-juiBorder-primary',
        'shadow',
        'z-10',
        'duration-200',

        // ───────────── group-data ─────────────
        'bg-juiBackground-default',
        'text-juiText-primary',

        // ─── Animate In/Out ───
        'group/navigation-menu:data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:zoom-out-95',
        'data-[state=open]:zoom-in-95',
        'data-[state=open]:fade-in-0',
        'data-[state=closed]:fade-out-0',

        // ───────────── Focus Reset (slot targets) ─────────────
        '**:data-[slot=navigation-menu-link]:focus:ring-0',
        '**:data-[slot=navigation-menu-link]:focus:outline-none',

        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  disabled = false,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link> & { disabled?: boolean }) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        // Layout
        'flex flex-col gap-1',
        'rounded-sm p-1',

        // Typography
        'text-sm',

        // Colors
        'text-juiText-primary',

        // Transitions
        'transition-all',

        // Hover & Focus
        'hover:bg-current/10!',
        'focus:bg-juiPrimary/30!',
        'outline-none',
        'focus-visible:ring-2 focus-visible:ring-juiFocus-ring',

        // Active state
        'data-[active=true]:bg-juiPrimary/30!',
        'data-[active=true]:text-juiText-secondary',

        // SVG styling
        "[&_svg:not([class*='text-'])]:text-juiText-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",

        disabled && 'text-juiText-disabled pointer-events-none',
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        // Layout & Positioning
        'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',

        // Animations
        'data-[state=visible]:animate-in',
        'data-[state=hidden]:animate-out',
        'data-[state=hidden]:fade-out',
        'data-[state=visible]:fade-in',
        className,
      )}
      {...props}>
      <div
        className={cn(
          // Layout & Sizing
          'relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm',

          // Colors & Shadow
          'bg-juiBorder-primary',
          'shadow-md',
        )}
      />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
};
