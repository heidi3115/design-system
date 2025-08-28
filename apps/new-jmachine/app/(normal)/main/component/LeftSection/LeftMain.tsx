'use client';

import { Suspense, use } from 'react';

import { StatsDangerGradeType } from '../../../../../services/stats/getStatsDangerGrade';
import { MainFallback } from '../Fallback/MainFallback';
import RiskSection from './RiskSection';

type TopMainProps = {
  dangerGradeData: Promise<StatsDangerGradeType[]>;
};

export function LeftMain({ dangerGradeData }: TopMainProps) {
  const dangerData = use(dangerGradeData);

  return (
    <div className="flex flex-col gap-4">
      <div className="border bg-current/50 p-2">
        danger
        <pre className="whitespace-pre-wrap break-all">{JSON.stringify(dangerData, null, 2)}</pre>
      </div>
      <Suspense fallback={<MainFallback />}>
        <RiskSection />
      </Suspense>
    </div>
  );
}
