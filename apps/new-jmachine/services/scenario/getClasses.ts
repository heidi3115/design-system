import { fetchClientApi } from '../../lib/fetch/clientApi';
import { ServerFetchOptions } from '../../lib/fetch/commonApi';
import { fetchServerApi } from '../../lib/fetch/serverApi';

export const getClassesServerFetch = async (options?: ServerFetchOptions) => {
  const response = await fetchServerApi<string[]>(`/get/scenario/classes`, undefined, {
    ...options,
  });

  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};

export const getClassesClientFetch = async () => {
  const response = await fetchClientApi<string[]>(`/get/scenario/classes`);
  if (response.code === '000000') return response.data;

  throw new Error(`${__filename} fetch failed: ${response.message}`);
};
