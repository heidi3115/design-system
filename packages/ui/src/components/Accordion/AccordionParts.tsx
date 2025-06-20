'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../lib/utils';

export type AccordionRootProps = React.ComponentProps<typeof AccordionPrimitive.Root>;

function AccordionRoot({ ...props }: AccordionRootProps) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

export type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item>;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn(className)} {...props} />;
}

export type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger>;

function AccordionTrigger({ className, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn(className)} {...props} />
    </AccordionPrimitive.Header>
  );
}

export type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content>;

function AccordionContent({ ...props }: AccordionContentProps) {
  return <AccordionPrimitive.Content data-slot="accordion-content" {...props} />;
}

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent };
