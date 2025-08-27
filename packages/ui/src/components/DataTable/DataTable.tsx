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
  Checkbox,
} from '@common/ui';
import { type ReactNode, useEffect, useState } from 'react';
import { PlusCircleIcon, SearchIcon, ToggleLeftIcon, ToggleRightIcon } from '@common/ui/icons';
import { useQuickSearch } from '@common/ui/hooks/useQuickSearch';
import Pagination from '@common/ui/components/DataTable/Pagination';

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
  enableRowSelection = false,
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

  const [search, setSearch] = useState('');
  const filteredColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide())
    .filter(
      (column) =>
        typeof column.columnDef.header === 'string' &&
        column.columnDef.header.toLowerCase().includes(search.toLowerCase()),
    );

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
              // 체크박스 컬럼 제외
              const status = table
                .getAllColumns()
                .filter((col) => col.id !== 'select')
                .map((col) => ({
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
