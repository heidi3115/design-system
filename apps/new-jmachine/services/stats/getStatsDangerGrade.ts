import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type StatsDangerGradeType = {
  dngrGrd: string;
  dngrGrdNm: string;
  evtCnt: number;
};

type GetStatsDangerGradeResponse = StatsDangerGradeType[];

export type GetStatsDangerGradeRequest = {
  fromDttDt: string;
  toDttDt: string;
};

export const getStatsDangerGradeServerFetch = async (
  params: GetStatsDangerGradeRequest,
  options?: ServerFetchOptions,
) => {
  const response = await fetchServerApi<GetStatsDangerGradeResponse, GetStatsDangerGradeRequest>(
    '/get/stats/danger-grade',
    params,
    { ...options },
  );

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getStatsDangerGradeClientFetch = async (params: GetStatsDangerGradeRequest) => {
  const response = await fetchClientApi<GetStatsDangerGradeResponse, GetStatsDangerGradeRequest>(
    '/get/stats/danger-grade',
    params,
  );

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
