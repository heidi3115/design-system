import { use } from 'react';

import { StatsDailyEventScoreType } from '../../../../../services/stats/getStatsDailyEventScore';

type TopMainProps = {
  data: Promise<StatsDailyEventScoreType[]>;
};

export function TopMain({ data: promiseData }: TopMainProps) {
  const resolveData = use(promiseData);

  return <p>{JSON.stringify(resolveData, null, 2)}</p>;
}
