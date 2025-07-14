import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@common/ui';
import { AppSidebar } from '../../components/Sidebar/AppSidebar';
import { MainContent } from '../../components/MainContent';
import { getMenusServerFetch } from '../../services/common/getMenusFetch';
import { Header } from '../../components/Header';

export default async function SidebarLayout({ children }: { children: ReactNode }) {
  const menuData = await getMenusServerFetch({ menuDvn: 'JM' });

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar menuData={menuData} />
      <SidebarInset>
        <Header menuData={menuData} />
        <MainContent contentType="flex">{children}</MainContent>
      </SidebarInset>
    </SidebarProvider>
  );
}
