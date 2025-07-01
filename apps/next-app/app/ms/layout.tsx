import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger, Toaster } from '@common/ui';
import { AppSidebar } from './components/AppSidebar';
import { MainContent } from './components/MainContent';

export default function MsLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-1 flex h-12 shrink-0 items-center gap-2 bg-juiBackground-input light:border-b light:border-b-juiBorder-primary p-2">
          <SidebarTrigger variant="primary" className="aspect-square p-0 rounded-full" />
          <h1 className="font-bold">header</h1>
        </header>
        <MainContent contentType="box">{children}</MainContent>
      </SidebarInset>
      <Toaster position="top-center" closeButton duration={Infinity} />
    </SidebarProvider>
  );
}
