/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: {
      token?: string;
      // 필요한 경우 user 내 다른 필드들도 추가 가능
      [key: string]: any;
    };
  }

  interface User {
    token?: string;
    // 필요시 여기에 user의 커스텀 필드 추가
    [key: string]: any;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: string;
    // 필요시 여기에 JWT의 커스텀 필드 추가
    [key: string]: any;
  }
}
