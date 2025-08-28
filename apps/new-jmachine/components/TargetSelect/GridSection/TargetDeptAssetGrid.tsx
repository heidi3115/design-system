'use client';

import { Button, DataTable, DataTableProps } from '@common/ui';
import { AssetDivisionTreeType } from '../../../services/asset/getDivisionTree';
import { DEFAULT_PAGE_SIZE } from './constant';

type TargetDeptAssetGridProps = {
  targetData: AssetDivisionTreeType[];
  onSelectedData?: (data: AssetDivisionTreeType) => void;
};

export default function TargetDeptAssetGrid({ targetData, onSelectedData }: TargetDeptAssetGridProps) {
  const columns: DataTableProps<AssetDivisionTreeType, string>['columns'] = [
    {
      accessorKey: 'id',
      header: 'No',
      cell: (ctx) => <div>{targetData.length - ctx.row.index}</div>,
    },
    {
      accessorKey: 'asstDvnNmFullPath',
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
