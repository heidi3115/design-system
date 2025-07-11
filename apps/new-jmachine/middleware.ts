// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET = process.env.AUTH_SECRET!;
const PUBLIC_PATHS = ['/login', '/api/auth'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 로그인 페이지 등은 제외
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: SECRET });

  if (!token) {
    if (pathname.startsWith('/api')) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const loginUrl = new URL('/login', req.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|fonts|api/public).*)'], // 보호할 경로 설정
};
