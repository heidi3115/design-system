'use client';

import ThemeToggle from './ThemeToggle';
import { signOut, useSession } from 'next-auth/react';
import { Skeleton, Tooltip } from '@common/ui';
import { cn } from '@common/ui/lib/utils';
import { usePathname } from 'next/navigation';
import { MenuItemType } from '../services/common/getMenusFetch';
import { use, useMemo } from 'react';
import { UserXIcon } from '@common/ui/icons';

type HeaderProps = {
  menuData?: Promise<MenuItemType[]>;
};

export function Header({ menuData: promiseMenuData = Promise.resolve<MenuItemType[]>([]) }: HeaderProps) {
  const { data, status } = useSession();
  const { userNm, loginDt } = data?.user ?? { userNm: '-', loginDt: '-' };

  const menuData = use(promiseMenuData);

  const pathname = usePathname();

  const currentPath =
    useMemo(() => {
      const findCurrentMenuByPath = (menus: MenuItemType[], path: string): MenuItemType | null =>
        menus.reduce<MenuItemType | null>((acc, menu) => {
          if (acc) return acc;
          if (menu.href === path) return menu;
          if (menu.children) return findCurrentMenuByPath(menu.children, path);

          return null;
        }, null);

      return findCurrentMenuByPath(menuData, pathname)?.title ?? null;
    }, [pathname, menuData]) ?? '';

  return (
    <header
      className={cn(
        'sticky top-0 z-1 flex h-12 shrink-0 items-center',
        'bg-juiBackground-input light:bg-juiBackground-paper',
      )}>
      {currentPath && (
        <div
          className={cn(
            'absolute inset-0 w-fit min-w-60',
            'bg-juiBackground-default content-center',
            'p-2 mt-2 px-8',
            '[clip-path:polygon(0_0,_calc(100%_-_25px)_0,_100%_100%,_0%_100%)]',
          )}>
          <h1 className="font-bold text-base">{currentPath}</h1>
        </div>
      )}

      <div className="flex gap-4 ml-auto h-full items-center px-8">
        {status === 'loading' ? (
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="w-24 h-2" />
            <Skeleton className="w-40 h-2" />
          </div>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <span>{userNm}님 환영합니다.</span>
            <span className="text-juiText-blue font-bold">Last Access {loginDt}</span>
          </div>
        )}

        <div className="flex gap-1">
          <Tooltip contents={'Logout'}>
            <div className="cursor-pointer p-2 rounded-full hover:bg-juiPrimary/50">
              <UserXIcon onClick={() => signOut({ callbackUrl: '/login' })} />
            </div>
          </Tooltip>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
