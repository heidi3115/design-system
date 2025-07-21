'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { TableHeader, Table, TableRow, TableHead, TableCell, TableBody, Input } from '@common/ui';
import { type ReactNode, useState } from 'react';
import { useDebounce } from '@common/utils';

type DataTableProps<T, V> = {
  data: T[];
  columns: ColumnDef<T, V>[];
  manualFiltering?: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  emptyState?: ReactNode;
};

export function DataTable<T, V = unknown>({
  data,
  columns,
  manualFiltering = false, // true로 설정 시, 검색어 필터링 권한을 서버측으로 넘기고 해당 컴포넌트에서는 검색 필터링에 관여하지 않음.
  globalFilter: externalGlobalFilter,
  onGlobalFilterChange,
  emptyState,
}: DataTableProps<T, V>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');
  const globalFilter = externalGlobalFilter ?? internalGlobalFilter;
  const setGlobalFilter = onGlobalFilterChange ?? setInternalGlobalFilter;

  const table = useReactTable({
    data,
    columns,
    manualFiltering,
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });
  const handleChange = useDebounce((event) => {
    table.setGlobalFilter(event.target.value);
  }, 500);

  return (
    <div className="w-full">
      <Input placeholder="검색" onChange={handleChange} />
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
    </div>
  );
}
