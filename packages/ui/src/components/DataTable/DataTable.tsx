'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';

import { TableHeader, Table, TableRow, TableHead, TableCell, TableBody, Input, Checkbox } from '@common/ui';
import { type ReactNode, useEffect, useState } from 'react';
import { SearchIcon } from '@common/ui/icons';
import { useQuickSearch } from '@common/ui/hooks/useQuickSearch';
import Pagination from '@common/ui/components/DataTable/Pagination';
import CustomToolbar from '@common/ui/components/DataTable/CustomToolbar';

type ColumnType = {
  headerName: string;
  hide: boolean;
  field: string;
};

export type DataTableProps<T, V> = {
  rows: T[];
  columns: ColumnDef<T, V>[];
  manualFiltering?: boolean;
  manualPagination?: boolean;
  enableRowSelection?: boolean;
  onSelectRows?: (selectedIds: string[]) => void;
  getRowId?: (row: T) => string;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  emptyState?: ReactNode;
  isUseQuickSearch?: boolean;
  searchValue?: string;
  columnFilterTrigger?: ReactNode;
  onColumnStatusChange?: (status: ColumnType[]) => void;
  isUsePagination?: boolean;
  totalCount?: number;
  pageSize?: number;
  onPageChange?: (pagination: number) => void;
  pageIndex?: number;
  currentPage?: number;
  isShowFirstPageButton?: boolean;
  isShowLastPageButton?: boolean;
};

function DataTable<T, V = unknown>({
  onColumnStatusChange,
  rows,
  getRowId,
  columns,
  enableRowSelection = true,
  onSelectRows,
  manualFiltering = false, // true로 설정 시, 검색어 필터링 권한을 서버측으로 넘기고 해당 컴포넌트에서는 검색 필터링에 관여하지 않음.
  manualPagination = false, // 서버사이드 페이징이면 true로 설정
  totalCount,
  pageSize,
  globalFilter: externalGlobalFilter,
  onGlobalFilterChange,
  emptyState,
  isUseQuickSearch = false,
  searchValue,
  columnFilterTrigger,
  isUsePagination = true,
  onPageChange,
  pageIndex,
  currentPage,
  isShowFirstPageButton = true,
  isShowLastPageButton = true,
}: DataTableProps<T, V>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { globalFilter, setGlobalFilter, handleChange } = useQuickSearch(externalGlobalFilter, onGlobalFilterChange);

  const addCheckboxColumn: ColumnDef<T, unknown> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const table = useReactTable({
    data: rows,
    columns: enableRowSelection ? [addCheckboxColumn, ...columns] : columns,
    manualFiltering,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(), // 클라이언트 페이징 용
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: pageSize ?? 5,
        pageIndex: pageIndex ?? 0,
      },
    },
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  useEffect(() => {
    const selectedIds = table.getSelectedRowModel().rows.map((row) => (getRowId ? getRowId(row.original) : row.id));

    onSelectRows?.(selectedIds);
  }, [rowSelection, table, onSelectRows, getRowId]);

  useEffect(() => {
    if (isUseQuickSearch) return;

    setGlobalFilter(searchValue ?? '');
  }, [isUseQuickSearch, searchValue, setGlobalFilter]);

  return (
    <div className="w-full flex flex-col min-h-50 gap-1">
      <div className="w-full flex gap-2">
        {isUseQuickSearch && (
          <Input iconLeft={SearchIcon} placeholder="검색어를 입력하세요" underline="primary" onChange={handleChange} />
        )}
        <CustomToolbar
          columnFilterTrigger={columnFilterTrigger}
          table={table}
          manualFiltering={manualFiltering}
          onColumnStatusChange={onColumnStatusChange}
        />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyState ?? '데이터가 없습니다.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isUsePagination && rows.length > 0 && (
        <div className="flex gap-2 m-auto w-full overflow-auto">
          <Pagination
            totalCount={totalCount}
            clientPageCount={table.getPageCount()}
            clientCurrentPage={table.getState().pagination.pageIndex}
            serverPage={currentPage}
            onPageChange={onPageChange}
            onClientPageChange={(page) => table.setPageIndex(page)}
            pageSize={pageSize}
            isShowFirstPageButton={isShowFirstPageButton}
            isShowLastPageButton={isShowLastPageButton}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;
