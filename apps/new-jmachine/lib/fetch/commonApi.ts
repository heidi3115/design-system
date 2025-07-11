//
// 공통 API 응답 타입
//

/**
 * API 응답 형식
 * @template TResult 응답 데이터의 타입
 */
export type ApiResponse<TResult> = {
  code: string; // 성공 여부 코드 (예: '000000')
  data: TResult; // API 응답 데이터
  message: string; // 응답 메시지
  timestamp: number; // 응답 시간 (Unix Timestamp)
};

//
// 공통 요청 옵션 타입
//

/**
 * API 요청 시 추가 옵션
 */
export type RequestOptions = {
  /** 요청할 base URL (예: https://api.example.com) */
  baseUrl?: string;

  /** 서버에서 쿠키 값을 설정할 수 있는 함수 (SSR 대응) */
  getCookieHeader?: () => Promise<string | undefined>;

  /** 요청에 포함할 추가 헤더들 */
  extraHeaders?: Record<string, string>;

  /** Next.js fetch cache 제어 옵션 (서버에서만 유효) */
  cache?: RequestCache;

  /** Next.js의 revalidate 및 tag 기반 캐시 설정 (서버에서만 유효) */
  next?: NextFetchRequestConfig;
  signal?: AbortSignal;
};

/** 허용되는 HTTP 메서드 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

//
// API 요청 함수
//

/**
 * API 서버에 HTTP 요청을 보냅니다.
 *
 * @template TResult 응답 데이터 타입
 * @template TBody 요청 바디 타입
 * @param path API 경로 (예: '/login')
 * @param params 요청에 포함될 데이터 (POST, PUT 등에서 사용)
 * @param options 요청에 사용할 추가 옵션 (baseUrl, 쿠키, 캐시 등)
 * @param method HTTP 메서드 (기본값: 'POST')
 * @returns API 응답 결과 (code, data, message 등 포함)
 * @throws 응답 코드가 '000000'이 아닌 경우 에러 발생
 */
export async function request<TResult, TBody = Record<string, unknown>>(
  path: string,
  params?: TBody,
  options?: RequestOptions,
  method: HttpMethod = 'POST',
): Promise<ApiResponse<TResult>> {
  const { baseUrl = '', getCookieHeader, extraHeaders = {}, cache = 'default', next, signal } = options || {};

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...extraHeaders,
  };

  if (getCookieHeader) {
    const cookie = await getCookieHeader();

    if (cookie) {
      headers.Cookie = cookie;
    }
  }

  const fetchOptions: RequestInit & {
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
  } = {
    method,
    headers,
    body: ['GET', 'HEAD'].includes(method) ? undefined : params ? JSON.stringify(params) : undefined,
    signal,
  };

  if (cache) fetchOptions.cache = cache;
  if (next) fetchOptions.next = next;

  const res = await fetch(`${baseUrl}/api${path}`, fetchOptions);

  if (res.status === 401) {
    // 클라이언트 환경이면 로그인 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    } else {
      // 서버 환경에서는 에러 throw
      throw new Error('Unauthorized');
    }
  }

  const response = await res.json();

  if (response.code !== '000000') {
    throw new Error(response.message || 'API error');
  }

  return response;
}

//
// Fetch API 유틸 타입
//

/**
 * 다양한 HTTP 메서드를 지원하는 API 클라이언트
 */
type FetchApi = {
  <TResult, TBody = Record<string, unknown>>(
    path: string,
    params?: TBody,
    options?: RequestOptions,
    method?: HttpMethod,
  ): Promise<ApiResponse<TResult>>;

  get<TResult>(path: string, options?: RequestOptions): Promise<ApiResponse<TResult>>;

  post<TResult, TBody = Record<string, unknown>>(
    path: string,
    params?: TBody,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResult>>;

  put<TResult, TBody = Record<string, unknown>>(
    path: string,
    params?: TBody,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResult>>;

  del<TResult, TBody = Record<string, unknown>>(
    path: string,
    params?: TBody,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResult>>;

  patch<TResult, TBody = Record<string, unknown>>(
    path: string,
    params?: TBody,
    options?: RequestOptions,
  ): Promise<ApiResponse<TResult>>;
};

//
// Fetch API 유틸 생성 함수
//

/**
 * API 요청 유틸 객체를 생성합니다.
 *
 * ```ts
 * const api = createFetchApi({ baseUrl: 'https://api.example.com' });
 * const res = await api.get<User>('/user/1');
 * ```
 *
 * @param defaultOptions 요청에 필요한 기본 옵션들 (baseUrl 등)
 * @returns FetchApi 타입의 유틸 객체
 */
export function createFetchApi(defaultOptions?: RequestOptions): FetchApi {
  const baseRequest = <TResult, TBody = Record<string, unknown>>(
    path: string,
    params?: TBody,
    options?: RequestOptions,
    method?: HttpMethod,
  ): Promise<ApiResponse<TResult>> => {
    const mergedOptions = { ...defaultOptions, ...options };

    return request<TResult, TBody>(path, params, mergedOptions, method ?? 'POST');
  };

  const fetchApi: FetchApi = Object.assign(baseRequest, {
    get: <TResult>(path: string, options?: RequestOptions) => baseRequest<TResult>(path, undefined, options, 'GET'),

    post: <TResult, TBody = Record<string, unknown>>(path: string, params?: TBody, options?: RequestOptions) =>
      baseRequest<TResult, TBody>(path, params, options, 'POST'),

    put: <TResult, TBody = Record<string, unknown>>(path: string, params?: TBody, options?: RequestOptions) =>
      baseRequest<TResult, TBody>(path, params, options, 'PUT'),

    del: <TResult, TBody = Record<string, unknown>>(path: string, params?: TBody, options?: RequestOptions) =>
      baseRequest<TResult, TBody>(path, params, options, 'DELETE'),

    patch: <TResult, TBody = Record<string, unknown>>(path: string, params?: TBody, options?: RequestOptions) =>
      baseRequest<TResult, TBody>(path, params, options, 'PATCH'),
  });

  return fetchApi;
}
