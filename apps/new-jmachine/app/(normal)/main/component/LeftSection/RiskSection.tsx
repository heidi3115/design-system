'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@common/ui';

import { getStatsRiskStatusClientFetch } from '../../../../../services/stats/getStatsRiskStatus';
import { getDateRangeByPeriod } from '../../lib/getDateRangeByPeriod';

export default function RiskSection() {
  const searchParams = useSearchParams();
  const currentPeriod = searchParams.get('period') || '7';

  const [key, setKey] = useState(currentPeriod);

  const periodDays = Number(currentPeriod) || 7;
  const { fromDttDt, toDttDt } = getDateRangeByPeriod(periodDays);

  const { data: riskData } = useSuspenseQuery({
    queryKey: ['riskStatus', key],
    queryFn: () => getStatsRiskStatusClientFetch({ fromDttDt, toDttDt }),
  });

  return (
    <div className="border bg-current/50 flex flex-col gap-2 p-2">
      위험도 Cleint + tanstack query
      <Button onClick={() => setKey((k) => k + 1)}>refetch test</Button>
      <pre className="whitespace-pre-wrap break-all">{JSON.stringify(riskData, null, 2)}</pre>
    </div>
  );
}
