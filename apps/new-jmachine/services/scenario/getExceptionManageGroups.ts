import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

type ExceptionManageGroupsRequest = {
  dttTrgTyp: string;
};

export type ExceptionGroupsType = {
  id: string;
  name: string;
  children?: ExceptionGroupsType[];
  pid?: string;
  scnrExpGrupTrgCnt?: number;
};

export const getExceptionManageGroupsServerFetch = async (
  params?: ExceptionManageGroupsRequest,
  options?: ServerFetchOptions,
) => {
  const response = await fetchServerApi<ExceptionGroupsType>(`/get/scenario/exceptionManagement/groups`, params, {
    ...options,
  });

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getExceptionManageGroupsClientFetch = async (params?: ExceptionManageGroupsRequest) => {
  const response = await fetchClientApi<ExceptionGroupsType>(`/get/scenario/exceptionManagement/groups`, params);
  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
