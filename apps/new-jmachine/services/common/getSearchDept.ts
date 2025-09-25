import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type DeptsType = {
  deptCd: string;
  deptNm: string;
  lvl: number;
  ord: number;
  deptFullPath: string;
  deptNmFullPath: string;
  childrenYn: string;
  pdeptCd: string;
};

export const getSearchDeptServerFetch = async (options?: ServerFetchOptions) => {
  const response = await fetchServerApi<DeptsType[]>(`/get/search/depts`, undefined, {
    ...options,
  });

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getSearchDeptClientFetch = async () => {
  const response = await fetchClientApi<DeptsType[]>(`/get/search/depts`);
  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
