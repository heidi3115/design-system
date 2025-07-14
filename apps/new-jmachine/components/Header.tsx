'use client';

import { Button } from '@common/ui';
import ThemeToggle from './ThemeToggle';
import { signOut } from 'next-auth/react';

type HeaderProps = {
  currentPath?: string;
};

export function Header({ currentPath = '' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-1 flex h-12 shrink-0 items-center gap-2 bg-juiBackground-input light:border-b light:border-b-juiBorder-primary p-2">
      <div className="absolute inset-0 w-fit min-w-60 bg-juiBackground-default content-center p-2 mt-2 px-8 [clip-path:polygon(0_0,_calc(100%_-_25px)_0,_100%_100%,_0%_100%)]">
        <h1 className="font-bold text-base">{currentPath}</h1>
      </div>

      <div className="flex gap-1 ml-auto">
        <Button variant="error" onClick={() => signOut({ callbackUrl: '/login' })}>
          로그아웃
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
