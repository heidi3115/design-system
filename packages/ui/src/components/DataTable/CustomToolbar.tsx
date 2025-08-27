import { type ReactNode, useState } from 'react';
import { Button, Input, Label, Popover, Switch } from '@common/ui';
import { PlusCircleIcon, SearchIcon, ToggleLeftIcon, ToggleRightIcon } from '@common/ui/icons';
import { type Table } from '@tanstack/react-table';

type ColumnStatus = {
  field: string;
  hide: boolean;
  headerName: string;
};

type CustomToolbar<T> = {
  columnFilterTrigger?: ReactNode;
  table: Table<T>;
  manualFiltering?: boolean;
  onColumnStatusChange?: (status: ColumnStatus[]) => void;
};

const CustomToolbar = <T,>({ columnFilterTrigger, table, manualFiltering, onColumnStatusChange }: CustomToolbar<T>) => {
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
    <div className="flex border">
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
  );
};

export default CustomToolbar;
