import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const TARGET_API_URL = process.env.NEXT_PUBLIC_API_URL!;
// eslint-disable-next-line turbo/no-undeclared-env-vars
const JWT_SECRET = process.env.AUTH_SECRET!;

/**
 * 모든 HTTP 메서드 요청을 처리하는 핸들러 함수입니다.
 * @param req NextRequest 객체
 * @returns NextResponse 객체
 */
async function handler(req: NextRequest) {
  // 1. 요청 URL에서 '/api' 부분을 제거하여 실제 경로를 추출합니다.
  // 예: /api/users/1 -> /users/1
  const path = req.nextUrl.pathname.replace(/^\/api/, '');

  // 2. 대상 서버로 보낼 전체 URL을 생성합니다. 쿼리 파라미터도 그대로 유지합니다.
  const destinationUrl = `${TARGET_API_URL}${path}${req.nextUrl.search}`;

  const token = await getToken({ req, secret: JWT_SECRET });
  const accessToken = token?.accessToken as string;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 3. 원본 요청의 헤더를 복사하여 새로운 Headers 객체를 생성합니다.
  const headers = new Headers(req.headers);

  headers.set('x-auth-token', accessToken); // ✅ 서버가 인식하는 인증 헤더
  headers.delete('host'); // 보안상 삭제

  try {
    // 4. fetch API를 사용하여 대상 서버로 요청을 보냅니다.
    // 원본 요청의 메서드, 헤더, 본문을 그대로 전달합니다.
    // `duplex: 'half'` 옵션은 요청 및 응답 스트림을 효율적으로 처리하기 위해 필요합니다.
    const response = await fetch(destinationUrl, {
      method: req.method,
      headers,
      body: req.body,
      duplex: 'half',
      // 중요: 대상 서버가 자체 서명된 SSL 인증서를 사용하는 경우,
      // Node.js는 기본적으로 보안상의 이유로 요청을 거부합니다.
      // 개발 환경에서는 'NODE_TLS_REJECT_UNAUTHORIZED=0' 환경 변수를 설정하여 이 검사를 비활성화할 수 있습니다.
      // 예: `NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev`
      // 단, 이 방법은 보안에 취약하므로 실제 운영 환경에서는 절대 사용해서는 안 됩니다.
    });

    // 5. 대상 서버로부터 받은 응답을 클라이언트에게 그대로 반환합니다.
    // 응답 상태, 상태 텍스트, 헤더, 본문을 모두 포함합니다.
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    // 프록시 요청 중 오류 발생 시 에러를 로깅하고 500 에러를 반환합니다.
    // eslint-disable-next-line no-console
    console.error(`[API Proxy Error]`, error);

    return NextResponse.json(
      { error: 'Proxy request failed.' },
      { status: 502 }, // Bad Gateway
    );
  }
}

// 모든 주요 HTTP 메서드에 대해 동일한 핸들러를 export 합니다.
// 이렇게 하면 /api/로 들어오는 모든 요청을 동일한 로직으로 처리할 수 있습니다.
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const HEAD = handler;
export const OPTIONS = handler;
