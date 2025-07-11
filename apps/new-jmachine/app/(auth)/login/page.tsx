import { getServerSession } from 'next-auth';
import { LoginForm } from './componet/LoginForm';
import Image from 'next/image';
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
        <Image
          src="/images/jason-logo.png"
          width={100}
          height={100}
          alt="Image"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
