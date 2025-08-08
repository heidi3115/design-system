import React from 'react';
import { Button } from '@common/ui';
import { Table } from '@tanstack/react-table';

type PaginationProps<TData> = {
  table: Table<TData>;
  totalCount?: number;
  pageSize?: number;
  serverPage?: number;
  onPageChange?: (page: number) => void;
  isShowFirstPageButton?: boolean;
  isShowLastPageButton?: boolean;
};

function Pagination<TData>({
  table,
  totalCount,
  pageSize = 5,
  serverPage,
  onPageChange,
  isShowFirstPageButton,
  isShowLastPageButton,
}: PaginationProps<TData>) {
  const pageCount = totalCount ? Math.ceil(totalCount / pageSize) : table.getPageCount();
  const currentPage = serverPage ?? table.getState().pagination.pageIndex;
  const pages = Array.from({ length: pageCount }, (_, i) => i);
  const isServer = serverPage !== undefined;

  const handlePageChange = (page: number) => {
    if (isServer) onPageChange?.(page);
    table.setPageIndex(page);
  };

  return (
    <div className="flex gap-2">
      {isShowFirstPageButton && (
        <Button
          className="border-none hover:bg-juiGrey-200 rounded-2xl w-[32px] h-[32px]"
          onClick={() => handlePageChange(0)}
          disabled={currentPage <= 0}
          variant="transparent">
          {'<<'}
        </Button>
      )}
      <Button
        className="border-none hover:bg-juiGrey-200 rounded-2xl w-[32px] h-[32px]"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        variant="transparent">
        {'<'}
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'transparent'}
          className="border-none hover:bg-juiGrey-200 rounded-2xl w-[32px] h-[32px]"
          onClick={() => handlePageChange(page)}>
          {page + 1}
        </Button>
      ))}
      <Button
        className="border-none hover:bg-juiGrey-200 rounded-2xl w-[32px] h-[32px]"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= pageCount - 1}
        variant="transparent">
        {'>'}
      </Button>
      {isShowLastPageButton && (
        <Button
          className="border-none hover:bg-juiGrey-200 rounded-2xl w-[32px] h-[32px]"
          onClick={() => handlePageChange(pageCount - 1)}
          disabled={currentPage >= pageCount - 1}
          variant="transparent">
          {'>>'}
        </Button>
      )}
    </div>
  );
}

export default Pagination;
