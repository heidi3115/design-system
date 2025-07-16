/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from 'next-auth';
import { SessionDataType } from './sessionDataType';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: SessionDataType & {
      token?: string;
    };
  }

  interface User extends SessionDataType {
    token?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends SessionDataType {
    token?: string;
  }
}
