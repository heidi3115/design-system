import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger, Toaster } from '@common/ui';
import { AppSidebar } from '../../components/Sidebar/AppSidebar';
import { MainContent } from '../../components/MainContent';
import ThemeToggle from '../../components/ThemeToggle';
// import { signOut } from 'next-auth/react';
import { getMenusServerFetch } from '../../services/common/getMenusFetch';

export default async function SidebarLayout({ children }: { children: ReactNode }) {
  const menuData = await getMenusServerFetch({ menuDvn: 'JM' });

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar menuData={menuData} />
      <SidebarInset>
        <header className="sticky top-0 z-1 flex h-12 shrink-0 items-center gap-2 bg-juiBackground-input light:border-b light:border-b-juiBorder-primary p-2">
          <SidebarTrigger variant="primary" className="aspect-square p-0 rounded-full" />
          <h1 className="font-bold">header</h1>

          <div className="flex gap-1 ml-auto">
            {/* <Button variant="error" onClick={() => signOut({ callbackUrl: '/login' })}>
              로그아웃
            </Button> */}
            <ThemeToggle />
          </div>
        </header>
        <MainContent contentType="flex">{children}</MainContent>
      </SidebarInset>
      <Toaster position="top-center" closeButton duration={Infinity} />
    </SidebarProvider>
  );
}
