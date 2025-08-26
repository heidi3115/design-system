import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type AssetDivisionTreeType = {
  id: string;
  name: string;
  children?: AssetDivisionTreeType[];
  asstDvnIdx?: number;
  passtDvnCd?: string;
  asstDvnNmFullPath?: string;
};

export const getDivisionTreeServerFetch = async (options?: ServerFetchOptions) => {
  const response = await fetchServerApi<AssetDivisionTreeType[]>(`/get/asset/division/tree`, undefined, {
    ...options,
  });

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getDivisionTreeClientFetch = async () => {
  const response = await fetchClientApi<AssetDivisionTreeType[]>(`/get/asset/division/tree`);
  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
