'use client';

import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '../../lib/utils';

export type HoverCardRootProps = React.ComponentProps<typeof HoverCardPrimitive.Root>;

function HoverCardRoot({ ...props }: HoverCardRootProps) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

export type HoverCardTriggerProps = React.ComponentProps<typeof HoverCardPrimitive.Trigger>;

function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

export type HoverCardPortalProps = React.ComponentProps<typeof HoverCardPrimitive.Portal>;

function HoverCardPortal({ ...props }: HoverCardPortalProps) {
  return <HoverCardPrimitive.Portal data-slot="hover-card-portal" {...props} />;
}

export type HoverCardContentProps = React.ComponentProps<typeof HoverCardPrimitive.Content>;

function HoverCardContent({ className, ...props }: HoverCardContentProps) {
  return <HoverCardPrimitive.Content data-slot="hover-card-content" className={cn(className)} {...props} />;
}

export { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent };
