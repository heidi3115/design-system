import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET = process.env.AUTH_SECRET!;

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: 'User ID', type: 'text' },
        password: { label: 'Password', type: 'password' },
        cpyCd: { label: 'Company Code', type: 'text' },
      },
      async authorize(credentials) {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();
        const token = res.headers.get('x-auth-token');

        if (res.ok && token) {
          return { ...user, token };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      // user 정보는 그대로 넣고
      session.user = token.data;

      // accessToken은 클라이언트에서 바로 쓰지 말라고 숨김 필드로 넣기
      Object.defineProperty(session, 'accessToken', {
        value: token.accessToken,
        enumerable: false, // JSON.stringify 시 노출 안 됨
        writable: false,
      });

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 1일
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 1일
  },
  secret: SECRET,
};
