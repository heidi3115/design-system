import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

type GetSearchUsersRequeest = {
  deptCd2: string;
  limit?: number;
  offset?: number;
  searchText2?: string;
};

export type EmployeeType = {
  epyeId: string;
  epyeNo: string;
  epyeNm: string;
  deptCd: string;
  deptNm: string;
  rankNm: string;
  pstnNm: string;
  workStt: string;
  email: string;
  phn: string;
  joinDt: string;
  leaveDt: string;
  rmk: string;
};

type GetSearchUsersResponse = {
  totalCount: number;
  employeeList: EmployeeType[];
};

export const getSearchUsersServerFetch = async (params?: GetSearchUsersRequeest, options?: ServerFetchOptions) => {
  const response = await fetchServerApi<GetSearchUsersResponse>(`/get/search/users`, params, {
    ...options,
  });

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getSearchUsersClientFetch = async (params?: GetSearchUsersRequeest) => {
  const response = await fetchClientApi<GetSearchUsersResponse>(`/get/search/users`, params);
  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
