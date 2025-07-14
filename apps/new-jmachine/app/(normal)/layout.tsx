import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@common/ui';
import { AppSidebar } from '../../components/Sidebar/AppSidebar';
import { MainContent } from '../../components/MainContent';
import { getMenusServerFetch, MenuItemType } from '../../services/common/getMenusFetch';
import { Header } from '../../components/Header';
import { headers } from 'next/headers';

export default async function SidebarLayout({ children }: { children: ReactNode }) {
  const menuData = await getMenusServerFetch({ menuDvn: 'JM' });

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  const findCurrentMenuByPath = (menus: MenuItemType[], path: string): MenuItemType | null =>
    menus.reduce<MenuItemType | null>((acc, menu) => {
      if (acc) return acc;
      if (menu.href === path) return menu;
      if (menu.children) return findCurrentMenuByPath(menu.children, path);

      return null;
    }, null);

  const currentPath = findCurrentMenuByPath(menuData, pathname)?.title;

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar menuData={menuData} />
      <SidebarInset>
        <Header currentPath={currentPath} />
        <MainContent contentType="flex">{children}</MainContent>
      </SidebarInset>
    </SidebarProvider>
  );
}
