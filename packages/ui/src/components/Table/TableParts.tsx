'use client';

import { cn } from '../../lib/utils';
import { type ComponentProps } from 'react';

type TableRootProps = {
  orientation?: 'horizontal' | 'vertical';
} & ComponentProps<'table'>;

function TableRoot({ orientation = 'horizontal', className, ...props }: TableRootProps) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-orientation={orientation} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn(className)} {...props} />;
}

function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return <tfoot data-slot="table-footer" className={cn('bg-muted/50 font-medium', className)} {...props} />;
}

function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors', className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'border bg-juiBackground-tableHead text-juiText-tableHead h-10 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-xs font-bold w-[200px]',
        'orientation-vertical:py-[12px] orientation-vertical:px-[16px] orientation-vertical:border-transparent orientation-vertical:border-b-juiBorder-tableBottom',
        'orientation-horizontal:border-juiBorder-tableBottom orientation-horizontal:py-[15px] orientation-horizontal:px-[16px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'border text-xs align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] bg-juiBackground-default',
        'orientation-vertical:py-[12px] orientation-vertical:px-[16px] orientation-vertical:border-transparent orientation-vertical:border-b-juiBorder-tableBottom orientation-vertical:bg-juiBackground-default',
        'orientation-horizontal:border-juiBorder-tableBottom orientation-horizontal:py-[15px] orientation-horizontal:px-[16px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return <caption data-slot="table-caption" className={cn('mt-4 text-sm', className)} {...props} />;
}

export { TableRoot, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
