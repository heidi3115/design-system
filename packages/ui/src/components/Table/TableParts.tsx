'use client';

import { cn } from '../../lib/utils';
import { type ComponentProps } from 'react';

type TableProps = {
  orientation?: 'horizontal' | 'vertical';
} & ComponentProps<'table'>;

function Table({ orientation = 'horizontal', className, ...props }: TableProps) {
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
        'px-[16px] border bg-juiBackground-tableHead text-juiText-tableHead h-10 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-xs font-bold',
        'orientation-horizontal:py-[12px] orientation-horizontal:border-transparent',
        'orientation-vertical:border-juiBorder-tableHead orientation-vertical:py-[15px]',
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
        'px-[16px] border text-xs align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] bg-juiBackground-default',
        'orientation-horizontal:py-[9px] orientation-horizontal:px-[15px] orientation-horizontal:border-transparent orientation-horizontal:border-b-juiBorder-tableBottom orientation-horizontal:bg-juiBackground-default',
        'orientation-vertical:border-juiBorder-tableBottom orientation-vertical:py-[15px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return <caption data-slot="table-caption" className={cn('mt-4 text-sm', className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
