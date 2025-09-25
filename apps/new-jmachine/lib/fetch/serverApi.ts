'use server';

import { cookies } from 'next/headers';
import { createFetchApi } from './commonApi';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const BASE_URL = process.env.NEXTAUTH_URL ?? '';

export const fetchServerApi = createFetchApi({
  baseUrl: BASE_URL,
  getCookieHeader: async () => (await cookies()).toString(),
  // 서버는 캐시 no-store 옵션을 common에서 자동 처리
});
