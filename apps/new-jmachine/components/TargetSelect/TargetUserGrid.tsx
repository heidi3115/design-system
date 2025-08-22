'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { Button, DataTable, DataTableProps } from '@common/ui';
import { EmployeeType, getSearchUsersClientFetch } from '../../services/common/getSearchUsers';

type TargetUserGridProps = {
  targetId: string;
  onSelectedData?: (data: EmployeeType) => void;
};

export default function TargetUserGrid({ targetId, onSelectedData }: TargetUserGridProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['seach', 'users', targetId],
    queryFn: () =>
      getSearchUsersClientFetch({
        deptCd2: targetId,
        limit: 10000,
      }),
  });

  const columns: DataTableProps<EmployeeType, string>['columns'] = [
    {
      accessorKey: 'id',
      header: 'No',
      cell: (ctx) => <div>{data.employeeList.length - ctx.row.index}</div>,
    },
    {
      accessorKey: 'epyeNm',
      header: '이름',
    },
    {
      accessorKey: 'epyeNo',
      header: '사번',
    },
    {
      accessorKey: 'epyeId',
      header: 'ID',
    },
    {
      accessorKey: 'deptNm',
      header: '부서명',
    },
    {
      accessorKey: 'rankNm',
      header: '직급',
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
      <DataTable rows={data.employeeList} columns={columns} pageSize={15} isUseQuickSearch />
    </div>
  );
}
