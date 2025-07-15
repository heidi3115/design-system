import { getServerSession } from 'next-auth';
import { LoginForm } from './componet/LoginForm';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../lib/auth/authOptions';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/detect/scenario'); // 원하는 메인 경로로 변경하세요
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-juiPrimary/10 relative hidden lg:block">
        <video autoPlay muted loop className="video absolute top-0 left-0 w-screen h-screen object-fill">
          <source src="/videos/bg-login.mp4" type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      </div>
    </div>
  );
}
