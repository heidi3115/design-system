import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

type GetMultiCodesRequeest = {
  pcmcdList?: string[];
};

export type CodesType = {
  cmcd: string;
  cmcdNm: string;
  cmcdInfo?: string;
  etc1?: string;
  etc2?: string;
  etc3?: string;
  lvl?: number;
  ord?: number;
  useYn?: 'Y' | 'N';
  pcmcd?: string;
};

export const getMultiCodesServerFetch = async (params?: GetMultiCodesRequeest, options?: ServerFetchOptions) => {
  const response = await fetchServerApi<CodesType[]>(`/get/multi-codes`, params, {
    ...options,
  });

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getMultiCodesClientFetch = async (params?: GetMultiCodesRequeest) => {
  const response = await fetchClientApi<CodesType[]>(`/get/multi-codes`, params);
  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
