'use client';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Button, DataTable, DataTableProps } from '@common/ui';
import { EmployeeType, getSearchUsersClientFetch } from '../../../services/common/getSearchUsers';
import { DEFAULT_PAGE_SIZE } from './constant';

type TargetUserGridProps = {
  targetId: string;
  onSelectedData?: (data: EmployeeType) => void;
};

export default function TargetUserGrid({ targetId, onSelectedData }: TargetUserGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');

  const { data } = useSuspenseQuery({
    queryKey: ['seach', 'users', targetId, currentPage, globalFilter],
    queryFn: () =>
      getSearchUsersClientFetch({
        deptCd2: targetId,
        limit: DEFAULT_PAGE_SIZE,
        offset: currentPage + 1,
        searchText2: globalFilter,
      }),
  });

  const columns: DataTableProps<EmployeeType, string>['columns'] = [
    {
      accessorKey: 'id',
      header: 'No',
      cell: (ctx) => <div>{data.totalCount - DEFAULT_PAGE_SIZE * currentPage - ctx.row.index}</div>,
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
      <DataTable
        rows={data.employeeList}
        totalCount={data.totalCount}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        columns={columns}
        pageSize={DEFAULT_PAGE_SIZE}
        isUseQuickSearch
        globalFilter={globalFilter}
        onGlobalFilterChange={(filter) => {
          setCurrentPage(0);
          setGlobalFilter(filter);
        }}
        manualFiltering
        manualPagination
      />
    </div>
  );
}
