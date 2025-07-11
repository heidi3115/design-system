import { fetchClientApi } from '../../lib/fetch/clientApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type MenuItemType = {
  href: string;
  icon: string;
  title: string;
  menuNm: string;
  code: string;
  menuCd: string;
  type: string;
  children: MenuItemType[];
};

type GetMenusRequest = {
  menuDvn: string;
};

type GetMenusResponse = MenuItemType[];

export const getMenusServerFetch = async (params: GetMenusRequest) => {
  const response = await fetchServerApi<GetMenusResponse, GetMenusRequest>(`/get/menus`, params);
  if (response.code === '000000') return response.data;

  // 렌더 중 throw 되면 error.tsx 진입
  throw new Error(`Menu fetch failed: ${response.message}`);
};

export const getMenusClientFetch = async (params: GetMenusRequest) => {
  const response = await fetchClientApi<GetMenusResponse, GetMenusRequest>(`/get/menus`, params);
  if (response.code === '000000') return response.data;

  throw new Error(`Menu fetch failed: ${response.message}`);
};
