'use client';

import { Button, Input, Label } from '@common/ui';
import { cn } from '@common/ui/lib/utils';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      userId,
      password,
      cpyCd: 'jason',
      redirect: false,
    });

    if (res?.ok) {
      window.location.href = '/main';
    } else {
      toast.error('로그인 실패', {
        richColors: true,
      });
    }
  };

  return (
    <form onSubmit={handleLogin} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">ID</Label>
          <Input
            id="id"
            placeholder="m@example.com"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
