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

type DataTableProps<T, V> = {
  data: T[];
  columns: ColumnDef<T, V>[];
  manualFiltering?: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  emptyState?: ReactNode;
  isUseQuickSearch?: boolean;
  searchValue?: string;
};

export function DataTable<T, V = unknown>({
  data,
  columns,
  manualFiltering = false, // true로 설정 시, 검색어 필터링 권한을 서버측으로 넘기고 해당 컴포넌트에서는 검색 필터링에 관여하지 않음.
  globalFilter: externalGlobalFilter,
  onGlobalFilterChange,
  emptyState,
  isUseQuickSearch = false,
  searchValue,
}: DataTableProps<T, V>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { globalFilter, setGlobalFilter, handleChange } = useQuickSearch(externalGlobalFilter, onGlobalFilterChange);

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

  useEffect(() => {
    if (isUseQuickSearch) return;

    setGlobalFilter(searchValue ?? '');
  }, [isUseQuickSearch, searchValue, setGlobalFilter]);

  const [search, setSearch] = useState('');

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex gap-2">
        {isUseQuickSearch && (
          <Input iconLeft={SearchIcon} placeholder="검색어를 입력하세요" underline="primary" onChange={handleChange} />
        )}
        {table.getAllColumns().map((column) => (
          <label key={column.id}>
            <input
              checked={column.getIsVisible()}
              disabled={!column.getCanHide()}
              onChange={column.getToggleVisibilityHandler()}
              type="checkbox"
            />
            {column.id}
          </label>
        ))}
        {/*<DropdownMenu trigger={<Button>Columns</Button>} size={300}>*/}
        {/*  {table*/}
        {/*    .getAllColumns()*/}
        {/*    .filter((column) => column.getCanHide())*/}
        {/*    .map((column) => {*/}
        {/*      return (*/}
        {/*        <DropdownMenuCheckboxItem*/}
        {/*          key={column.id}*/}
        {/*          className="capitalize"*/}
        {/*          checked={column.getIsVisible()}*/}
        {/*          onCheckedChange={(value) => column.toggleVisibility(!!value)}>*/}
        {/*          <Switch*/}
        {/*            checked={column.getIsVisible()}*/}
        {/*            onCheckedChange={(value) => column.toggleVisibility(!!value)}*/}
        {/*          />*/}
        {/*          {column.id}*/}
        {/*        </DropdownMenuCheckboxItem>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*</DropdownMenu>*/}
        <Popover
          className="rounded-none bg-juiBackground-solidPaper flex flex-col gap-2 p-0 w-[238px]"
          trigger={
            <Button variant="transparent">
              <PlusCircleIcon /> 필드 목록
            </Button>
          }>
          <Input
            iconLeft={SearchIcon}
            placeholder="카테고리 명을 검색하세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-col gap-2 p-2">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .filter((column) => column.id.toLowerCase().includes(search.toLowerCase()))
              .map((column) => (
                <div key={column.id} className="capitalize flex items-center gap-2">
                  <Switch
                    id={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  />

                  <Label htmlFor={column.id}>{column.id}</Label>
                </div>
              ))}
          </div>
          <div className="flex">
            <Button className="w-1/2 h-10">
              <ToggleLeftIcon />
              전체 숨기기
            </Button>
            <Button className="w-1/2 h-10" variant="primary">
              <ToggleRightIcon />
              전체 보기
            </Button>
          </div>
        </Popover>
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
