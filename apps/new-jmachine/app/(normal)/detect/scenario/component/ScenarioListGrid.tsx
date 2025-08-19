'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { DataTable, DataTableProps, GradeBadge } from '@common/ui';
import {
  getScenariosClientFetch,
  GetScenariosRequest,
  ScenariosType,
} from '../../../../../services/scenario/getScenarios';
import { minorCategoryValueMap } from '../../../../../lib/mapper/minorCategoryTypeMap';

const RISK_LEVEL = {
  [minorCategoryValueMap.urgentRiskLevel]: 'urgency',
  [minorCategoryValueMap.seriousRiskLevel]: 'critical', // 심각
  [minorCategoryValueMap.boundaryRiskLevel]: 'alert', // 경계
  [minorCategoryValueMap.warnringRiskLevel]: 'boundary', // 주의
  [minorCategoryValueMap.infoRiskLevel]: 'info', // 정보
} as const;

type ScenarioListGridProps = {
  scenarioType: 'normal' | 'complex';
  scenariosData: ScenariosType[];
  params: GetScenariosRequest | null;
};

export function ScenarioListGrid({ scenarioType, scenariosData, params }: ScenarioListGridProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['scenarioList', scenarioType, params],
    queryFn: () => getScenariosClientFetch(params!),
    initialData: params ? undefined : scenariosData,
  });

  // 타입가드
  const isRiskLevelKey = (value: unknown): value is keyof typeof RISK_LEVEL =>
    typeof value === 'string' && value in RISK_LEVEL;

  const columns: DataTableProps<ScenariosType, string>['columns'] = [
    {
      accessorKey: 'id',
      header: 'No',
      size: 10,
      cell: (ctx) => <div>{data.length - ctx.row.index}</div>,
    },
    {
      accessorKey: 'scnrNm',
      header: '시나리오명',
      size: 2000,
    },
    {
      accessorKey: 'dngrGrd',
      header: '등급',
      cell: (ctx) => {
        const value = ctx.cell.getValue();
        const grade = isRiskLevelKey(value) ? RISK_LEVEL[value] : 'info';

        return (
          <GradeBadge grade={grade} className="h-5">
            {grade}
          </GradeBadge>
        );
      },
    },
    {
      accessorKey: 'scnrCls',
      header: '분류',
    },
    {
      accessorKey: 'alrmYn',
      header: '알림 사용',
    },
    {
      accessorKey: 'explnUseYn',
      header: '소명 요청',
    },
    {
      accessorKey: 'oprStt',
      header: '운영 상태',
    },
    {
      accessorKey: 'regUser',
      header: '등록자',
    },
    {
      accessorKey: 'regDt',
      header: '등록일',
      accessorFn: (row) => format(new Date(row.regDt), 'yyyy-MM-dd'),
    },
    {
      accessorKey: 'modUser',
      header: '최종 수정자',
    },
    {
      accessorKey: 'modDt',
      header: '최종 수정일',
      accessorFn: (row) => format(new Date(row.modDt), 'yyyy-MM-dd HH:mm:ss'),
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <DataTable rows={data} columns={columns} pageSize={20} isUseQuickSearch />
    </div>
  );
}
