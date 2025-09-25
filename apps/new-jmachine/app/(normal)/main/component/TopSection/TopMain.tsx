import { use } from 'react';

import { StatsDailyEventScoreType } from '../../../../../services/stats/getStatsDailyEventScore';

type TopMainProps = {
  dailyScoreData: Promise<StatsDailyEventScoreType[]>;
};

export function TopMain({ dailyScoreData }: TopMainProps) {
  const resolveData = use(dailyScoreData);

  return <p>{JSON.stringify(resolveData, null, 2)}</p>;
}
