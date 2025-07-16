import { use } from 'react';
import { StatsDailyEventScoreType } from '../../../../services/stats/getStatsDailyEventScore';

type TopMainProps = {
  data: Promise<StatsDailyEventScoreType[]>;
};

export function TopMain({ data }: TopMainProps) {
  const resolveData = use(data);

  return <pre className="whitespace-pre-wrap break-all">{JSON.stringify(resolveData, null, 2)}</pre>;
}
