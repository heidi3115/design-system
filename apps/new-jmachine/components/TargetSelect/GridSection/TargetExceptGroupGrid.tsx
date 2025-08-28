'use client';

import { Button, DataTable, DataTableProps } from '@common/ui';
import { ExceptionGroupsType } from '../../../services/scenario/getExceptionManageGroups';
import { DEFAULT_PAGE_SIZE } from './constant';

type TargetExceptGroupGridProps = {
  targetData: ExceptionGroupsType[];
  onSelectedData?: (data: ExceptionGroupsType) => void;
};

export default function TargetExceptGroupGrid({ targetData, onSelectedData }: TargetExceptGroupGridProps) {
  const columns: DataTableProps<ExceptionGroupsType, string>['columns'] = [
    {
      accessorKey: 'id',
      header: 'No',
      cell: (ctx) => <div>{targetData.length - ctx.row.index}</div>,
    },
    {
      accessorKey: 'name',
      header: '그룹명',
    },
    {
      accessorKey: 'select',
      header: '선택',
      cell: (ctx) => {
        return (
          <Button
            variant="primary"
            size="small"
            className="h-4 text-[10px]"
            onClick={() => onSelectedData?.(ctx.row.original)}>
            선택
          </Button>
        );
      },
    },
  ];

  return (
    <div className="overflow-auto h-ful w-full">
      <DataTable rows={targetData} columns={columns} pageSize={DEFAULT_PAGE_SIZE} isUseQuickSearch />
    </div>
  );
}
