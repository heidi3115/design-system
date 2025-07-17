import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type StatsDailyEventScoreType = {
  dttDt: string;
  evtCnt: number;
  totScore: number;
};

type GetStatsDailyEventScoreRespone = StatsDailyEventScoreType[];

export type GetStatsDailyEventScoreRequest = {
  fromDttDt: string;
  toDttDt: string;
};

export const getStatsDailyEventScoreServerFetch = async (
  params: GetStatsDailyEventScoreRequest,
  options?: ServerFetchOptions,
) => {
  const response = await fetchServerApi<GetStatsDailyEventScoreRespone, GetStatsDailyEventScoreRequest>(
    '/get/stats/daily/event/score',
    params,
    { ...options },
  );

  if (response.code === '000000') return response.data;

  // 렌더 중 throw 되면 error.tsx 진입
  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getStatsDailyEventScoreClientFetch = async (params: GetStatsDailyEventScoreRequest) => {
  const response = await fetchClientApi<GetStatsDailyEventScoreRespone, GetStatsDailyEventScoreRequest>(
    '/get/stats/daily/event/score',
    params,
  );
  if (response.code === '000000') return response.data;

  // 렌더 중 throw 되면 error.tsx 진입
  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
