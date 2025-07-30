import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type StatsRiskStatusType = {
  riskStt: string;
  riskSttNm: string;
  evtCnt: number;
};

type GetStatsRiskStatusResponse = StatsRiskStatusType[];

export type GetStatsRiskStatusRequest = {
  fromDttDt: string;
  toDttDt: string;
};

export const getStatsRiskStatusServerFetch = async (
  params: GetStatsRiskStatusRequest,
  options?: ServerFetchOptions,
) => {
  const response = await fetchServerApi<GetStatsRiskStatusResponse, GetStatsRiskStatusRequest>(
    '/get/stats/risk-status',
    params,
    { ...options },
  );

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getStatsRiskStatusClientFetch = async (params: GetStatsRiskStatusRequest) => {
  const response = await fetchClientApi<GetStatsRiskStatusResponse, GetStatsRiskStatusRequest>(
    '/get/stats/risk-status',
    params,
  );

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
