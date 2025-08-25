import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

type GetAssetsRequest = {
  asstDvnCd: string;
};

export type AssetType = {
  asstIdx: number;
  cpyCd: string;
  asstIp: string;
  asstNm: string;
  regTyp: string;
  asstDvn: string;
  asstDvnNm: string;
  serverNm: string;
  os: string;
  system: string;
  region: string;
  area: string;
  expln: string;
  mngr: string;
  rmk: string;
  modDt: string; // ISO 문자열 형식의 날짜
  modUser: string;
  modUserNm: string;
};

export const getAssetsServerFetch = async (params?: GetAssetsRequest, options?: ServerFetchOptions) => {
  const response = await fetchServerApi<AssetType[]>(`/get/assets`, params, {
    ...options,
  });

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getAssetsClientFetch = async (params?: GetAssetsRequest) => {
  const response = await fetchClientApi<AssetType[]>(`/get/assets`, params);
  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
