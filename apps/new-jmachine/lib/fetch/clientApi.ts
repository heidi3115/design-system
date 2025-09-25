'use client';

import { createFetchApi } from './commonApi';

export const fetchClientApi = createFetchApi({
  baseUrl: '', // 클라이언트는 기본 상대경로 /api 사용
});
