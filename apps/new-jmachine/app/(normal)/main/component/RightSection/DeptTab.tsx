'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@common/ui';

import { getStatsDetailScoreDeptClientFetch } from '../../../../../services/stats/getStatsDetailScoreDept';
import { getDateRangeByPeriod } from '../../lib/getDateRangeByPeriod';

export default function DeptTab() {
  const searchParams = useSearchParams();
  const currentPeriod = searchParams.get('period') || '7';

  const [key, setKey] = useState(currentPeriod);

  const periodDays = Number(currentPeriod) || 7;
  const { fromDttDt, toDttDt } = getDateRangeByPeriod(periodDays);

  const { data: deptScoreData } = useSuspenseQuery({
    queryKey: ['deptScore', key],
    queryFn: () => getStatsDetailScoreDeptClientFetch({ fromDttDt, toDttDt, ord: 'desc', sort: 'tot_score' }),
  });

  return (
    <div className="bg-current/50 flex flex-col gap-2 p-2">
      부서별 Client + tanstack query
      <Button onClick={() => setKey((k) => k + 1)}>refetch test</Button>
      <pre className="whitespace-pre-wrap break-all">{JSON.stringify(deptScoreData, null, 2)}</pre>
    </div>
  );
}
