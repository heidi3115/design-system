import React from 'react';
import { Button } from '@common/ui';
import { Table } from '@tanstack/react-table';

interface PaginationProps<TData> {
  table: Table<TData>;
  totalCount?: number;
  pageSize?: number;
}

function Pagination<TData>({ table, totalCount, pageSize = 5 }: PaginationProps<TData>) {
  const pageCount = totalCount ? totalCount / pageSize : table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex gap-2">
      <Button
        className="border rounded-3xl p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        variant={'transparent'}>
        {'<'}
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'transparent'}
          className={'rounded-3xl p-1 w-8'}
          onClick={() => table.setPageIndex(page)}>
          {page + 1}
        </Button>
      ))}
      <Button
        variant={'transparent'}
        className="rounded-3xl border p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}>
        {'>'}
      </Button>
    </div>
  );
}

export default Pagination;
