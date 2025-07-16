import { Suspense } from 'react';
import { getStatsDailyEventScoreServerFetch } from '../../../services/stats/getStatsDailyEventScore';
import { TopMain } from './component/TopMain';
import { Skeleton } from '@common/ui';

export default function MainPage() {
  const dailyEventScore = getStatsDailyEventScoreServerFetch({
    fromDttDt: '2025-07-10 00:00:00',
    toDttDt: '2025-07-16 23:59:59',
  });

  return (
    <div className="h-full flex flex-col">
      <div className="h-60 bg-juiPrimary overflow-auto">
        <Suspense fallback={<Skeleton />}>
          <TopMain data={dailyEventScore} />
        </Suspense>
      </div>
      <div className="flex flex-1">
        <div className="w-1/2 bg-juiSecondary">left</div>
        <div className="w-1/2 bg-juiError">right</div>
      </div>
    </div>
  );
}
