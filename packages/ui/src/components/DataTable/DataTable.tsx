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

import {
  TableHeader,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Input,
  Popover,
  Button,
  Switch,
  Label,
} from '@common/ui';
import { type ReactNode, useEffect, useState } from 'react';
import { PlusCircleIcon, SearchIcon, ToggleLeftIcon, ToggleRightIcon } from '@common/ui/icons';
import { useQuickSearch } from '@common/ui/hooks/useQuickSearch';

type ColumnType = {
  headerName: string;
  hide: boolean;
  field: string;
};

type DataTableProps<T, V> = {
  rows: T[];
  columns: ColumnDef<T, V>[];
  manualFiltering?: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  emptyState?: ReactNode;
  isUseQuickSearch?: boolean;
  searchValue?: string;
  columnFilterTrigger?: ReactNode;
  onColumnStatusChange?: (status: ColumnType[]) => void;
};

export function DataTable<T, V = unknown>({
  onColumnStatusChange,
  rows,
  columns,
  manualFiltering = false, // true로 설정 시, 검색어 필터링 권한을 서버측으로 넘기고 해당 컴포넌트에서는 검색 필터링에 관여하지 않음.
  globalFilter: externalGlobalFilter,
  onGlobalFilterChange,
  emptyState,
  isUseQuickSearch = false,
  searchValue,
  columnFilterTrigger,
}: DataTableProps<T, V>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { globalFilter, setGlobalFilter, handleChange } = useQuickSearch(externalGlobalFilter, onGlobalFilterChange);

  const table = useReactTable({
    data: rows,
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

  useEffect(() => {
    if (isUseQuickSearch) return;

    setGlobalFilter(searchValue ?? '');
  }, [isUseQuickSearch, searchValue, setGlobalFilter]);

  const [search, setSearch] = useState('');
  const filteredColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide())
    .filter(
      (column) =>
        typeof column.columnDef.header === 'string' &&
        column.columnDef.header.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="w-full flex flex-col min-h-50 gap-1">
      <div className="w-full flex gap-2">
        {isUseQuickSearch && (
          <Input iconLeft={SearchIcon} placeholder="검색어를 입력하세요" underline="primary" onChange={handleChange} />
        )}
        <Popover
          className="rounded-none bg-juiBackground-solidPaper flex flex-col gap-2 p-0 w-[238px]"
          trigger={
            columnFilterTrigger ?? (
              <Button variant="transparent">
                <PlusCircleIcon /> 필드 목록
              </Button>
            )
          }>
          <Input
            iconLeft={SearchIcon}
            placeholder="카테고리 명을 검색하세요"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-col gap-2 p-2 h-[248px] overflow-auto">
            {filteredColumns.length > 0 ? (
              filteredColumns.map((column) => (
                <div key={column.id} className="capitalize flex items-center gap-2">
                  <Switch
                    id={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  />
                  <Label htmlFor={column.id}>
                    {typeof column.columnDef.header === 'string' && column.columnDef.header}
                  </Label>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground px-2 py-4 text-center">데이터가 없습니다.</div>
            )}
          </div>
          <div className="flex">
            <Button
              onClick={() => {
                table.getAllColumns().forEach((column) => {
                  if (column.getCanHide()) {
                    column.toggleVisibility(false);
                  }
                });
              }}
              className="w-1/2 h-10">
              <ToggleLeftIcon />
              전체 숨기기
            </Button>
            <Button
              onClick={() => {
                table.getAllColumns().forEach((column) => {
                  if (column.getCanHide()) {
                    column.toggleVisibility(true);
                  }
                });
              }}
              className="w-1/2 h-10"
              variant="primary">
              <ToggleRightIcon />
              전체 보기
            </Button>
          </div>
        </Popover>
        {manualFiltering && (
          <Button
            onClick={() => {
              const status = table.getAllColumns().map((col) => ({
                field: col.id,
                hide: !col.getIsVisible(),
                headerName: typeof col.columnDef.header === 'string' ? col.columnDef.header : '',
              }));

              if (onColumnStatusChange) {
                onColumnStatusChange(status);
              }
            }}>
            필드 저장
          </Button>
        )}
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
    </div>
  );
}
