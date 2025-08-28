'use client';

import { Button, DataTable, DataTableProps } from '@common/ui';
import { DeptsType } from '../../../services/common/getSearchDept';
import { DEFAULT_PAGE_SIZE } from './constant';

type TargetDeptGridProps = {
  targetData: DeptsType[];
  onSelectedData?: (data: DeptsType) => void;
};

export default function TargetDeptGrid({ targetData, onSelectedData }: TargetDeptGridProps) {
  const columns: DataTableProps<DeptsType, string>['columns'] = [
    {
      accessorKey: 'id',
      header: 'No',
      cell: (ctx) => <div>{targetData.length - ctx.row.index}</div>,
    },
    {
      accessorKey: 'deptNmFullPath',
      header: '부서명',
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
