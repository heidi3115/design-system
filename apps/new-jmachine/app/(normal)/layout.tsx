import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@common/ui';
import { AppSidebar } from '../../components/Sidebar/AppSidebar';
import { getMenusServerFetch } from '../../services/common/getMenusFetch';
import { Header } from '../../components/Header';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const menuData = getMenusServerFetch({ menuDvn: 'JM' });

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar menuData={menuData} />
      <SidebarInset>
        <Header menuData={menuData} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
