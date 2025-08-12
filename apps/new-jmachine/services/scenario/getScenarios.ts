import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export type ScenariosType = {
  scnrIdx: string;
  scnrDttIdx: string;
  scnrCd: string;
  scnrNm: string;
  scnrCls: string;
  dttTrgTyp: string;
  dngrGrd: string;
  dttTyp: string;
  respMode: string;
  oprStt: string;
  msrCycl: string;
  explnUseYn: string;
  modUser: string;
  modUserNm: string;
  modDt: string;
  regUser: string;
  regUserNm: string;
  regDt: string;
  alrmYn: string;
};

type ScenariosResponse = ScenariosType[];

export type GetScenariosRequest = {
  dngrGrdList: string[];
  dttTypList: string[];
  respModeList: string[];
  oprSttList: string[];
  scnrClsList: string[];
  explnCdList: string[];
  scnrTyp?: string;
};

export const getScenariosServerFetch = async (params: GetScenariosRequest, options?: ServerFetchOptions) => {
  const response = await fetchServerApi<ScenariosResponse, GetScenariosRequest>(`/get/scenarios`, params, {
    ...options,
  });
  // 2초 지연 추가
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getScenariosClientFetch = async (params: GetScenariosRequest) => {
  const response = await fetchClientApi<ScenariosResponse, GetScenariosRequest>(`/get/scenarios`, params);
  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
