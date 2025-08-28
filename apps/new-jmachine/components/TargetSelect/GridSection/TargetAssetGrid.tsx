'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { Button, DataTable, DataTableProps } from '@common/ui';
import { AssetType, getAssetsClientFetch } from '../../../services/asset/getAssets';
import { DEFAULT_PAGE_SIZE } from './constant';

type TargetAssetGridProps = {
  targetId: string;
  onSelectedData?: (data: AssetType) => void;
};

export default function TargetAssetGrid({ targetId, onSelectedData }: TargetAssetGridProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['assets', targetId],
    queryFn: () =>
      getAssetsClientFetch({
        asstDvnCd: targetId,
      }),
  });

  const columns: DataTableProps<AssetType, string>['columns'] = [
    {
      accessorKey: 'id',
      header: 'No',
      cell: (ctx) => <div>{data.length - ctx.row.index}</div>,
    },
    {
      accessorKey: 'asstDvnNm',
      header: '자산구분',
    },
    {
      accessorKey: 'asstNm',
      header: '자산명',
    },
    {
      accessorKey: 'serverNm',
      header: '서버명',
    },
    {
      accessorKey: 'asstIp',
      header: '대표IP',
    },
    {
      accessorKey: 'os',
      header: '운영체제',
    },
    {
      accessorKey: 'system',
      header: '시스템',
    },
    {
      accessorKey: 'mngr',
      header: '담당자',
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
      <DataTable rows={data} columns={columns} pageSize={DEFAULT_PAGE_SIZE} isUseQuickSearch />
    </div>
  );
}
