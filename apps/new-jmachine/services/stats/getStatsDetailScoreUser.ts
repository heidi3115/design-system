import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type StatsDetailScoreUserType = {
  dttTrg: string;
  dttTrgNm: string;
  epyeNo: string;
  deptNm: string;
  deptCd: string;
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
  pDeptCd: string;
  pDeptNm: string;
};

type GetStatsDetailScoreUserResponse = StatsDetailScoreUserType[];

export type GetStatsDetailScoreUserRequest = {
  fromDttDt: string;
  toDttDt: string;
  sort?: string;
  ord?: string;
  limit?: number;
};

export const getStatsDetailScoreUserServerFetch = async (
  params: GetStatsDetailScoreUserRequest,
  options?: ServerFetchOptions,
) => {
  const response = await fetchServerApi<GetStatsDetailScoreUserResponse, GetStatsDetailScoreUserRequest>(
    '/get/stats/detail-score/user',
    params,
    { ...options },
  );

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getStatsDetailScoreUserClientFetch = async (params: GetStatsDetailScoreUserRequest) => {
  const response = await fetchClientApi<GetStatsDetailScoreUserResponse, GetStatsDetailScoreUserRequest>(
    '/get/stats/detail-score/user',
    params,
  );

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
