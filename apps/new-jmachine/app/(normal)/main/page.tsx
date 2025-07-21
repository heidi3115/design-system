import { Suspense, use } from 'react';

import { getStatsDailyEventScoreServerFetch } from '../../../services/stats/getStatsDailyEventScore';
import { TopMain } from './component/TopSection/TopMain';
import { LeftMain } from './component/LeftSection/LeftMain';
import { RightMain } from './component/RightSection/RightMain';
import { MainFallback } from './component/Fallback/MainFallback';
import { PeriodToggle } from './component/TopSection/PeriodToggle';
import { getStatsDangerGradeServerFetch } from '../../../services/stats/getStatsDangerGrade';
import { getStatsDetailScoreUserServerFetch } from '../../../services/stats/getStatsDetailScoreUser';
import { getDateRangeByPeriod } from './lib/getDateRangeByPeriod';

export default function MainPage({ searchParams }: { searchParams: Promise<{ period: string }> }) {
  const { period } = use(searchParams);

  const periodDays = Number(period) || 7;
  const { fromDttDt, toDttDt } = getDateRangeByPeriod(periodDays);

  const dailyEventScore = getStatsDailyEventScoreServerFetch(
    {
      fromDttDt,
      toDttDt,
    },
    { cache: 'force-cache' },
  );

  const dangerGrade = getStatsDangerGradeServerFetch(
    {
      fromDttDt,
      toDttDt,
    },
    { cache: 'force-cache' },
  );

  const detailUser = getStatsDetailScoreUserServerFetch(
    {
      fromDttDt,
      toDttDt,
      ord: 'desc',
      sort: 'tot_score',
    },
    { cache: 'force-cache' },
  );

  return (
    <div className="h-full flex flex-col">
      <div className="h-1/5 p-4 bg-juiPrimary/50 overflow-auto">
        <div className="flex gap-4">
          <PeriodToggle />
          <Suspense key={period} fallback={<MainFallback />}>
            <TopMain dailyScoreData={dailyEventScore} />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 p-4 bg-juiSecondary overflow-auto">
          <Suspense key={period} fallback={<MainFallback />}>
            <LeftMain dangerGradeData={dangerGrade} />
          </Suspense>
        </div>
        <div className="w-1/2 p-4 bg-juiError/80 overflow-auto">
          <Suspense key={period} fallback={<MainFallback />}>
            <RightMain useScoreData={detailUser} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
