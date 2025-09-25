import { Suspense, use } from 'react';

import { StatsDetailScoreUserType } from '../../../../../services/stats/getStatsDetailScoreUser';
import { TabItemType, Tabs } from '@common/ui';
import DeptTab from './DeptTab';
import { MainFallback } from '../Fallback/MainFallback';

type TopMainProps = {
  useScoreData: Promise<StatsDetailScoreUserType[]>;
};

export function RightMain({ useScoreData }: TopMainProps) {
  const resolveData = use(useScoreData);

  const tabs = [
    {
      value: 'user',
      label: '개인별',
      content: (
        <div className="bg-current/50">
          <pre className="whitespace-pre-wrap break-all">{JSON.stringify(resolveData, null, 2)}</pre>
        </div>
      ),
    },
    {
      value: 'dept',
      label: '부서별',
      content: (
        <Suspense fallback={<MainFallback />}>
          <DeptTab />
        </Suspense>
      ),
    },
  ] satisfies TabItemType;

  return (
    <div className="h-full">
      <Tabs shape="badge" tabs={tabs} />
    </div>
  );
}
