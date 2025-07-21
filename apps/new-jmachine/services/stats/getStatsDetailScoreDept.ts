import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type StatsDetailScoreDeptType = {
  deptCd: string;
  deptNm: string;
  deptNmFullPath: string;
  scnrCnt: number;
  evtTotCnt: number;
  evtIngCnt: number;
  evtCompCnt: number;
  totScore: number;
  riskStt: string;
  prdScore: number[];
  cScore: number;
  dScore: number;
  eScore: number;
  aScore: number;
  bScore: number;
};

type GetStatsDetailScoreDeptResponse = StatsDetailScoreDeptType[];

export type GetStatsDetailScoreDeptRequest = {
  fromDttDt: string;
  toDttDt: string;
  sort?: string;
  ord?: string;
  limit?: number;
};

export const getStatsDetailScoreDeptServerFetch = async (
  params: GetStatsDetailScoreDeptRequest,
  options?: ServerFetchOptions,
) => {
  const response = await fetchServerApi<GetStatsDetailScoreDeptResponse, GetStatsDetailScoreDeptRequest>(
    '/get/stats/detail-score/dept',
    params,
    { ...options },
  );

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getStatsDetailScoreDeptClientFetch = async (params: GetStatsDetailScoreDeptRequest) => {
  const response = await fetchClientApi<GetStatsDetailScoreDeptResponse, GetStatsDetailScoreDeptRequest>(
    '/get/stats/detail-score/dept',
    params,
  );

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
