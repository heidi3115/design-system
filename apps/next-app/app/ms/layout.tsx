import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger, Toaster } from '@common/ui';
import { AppSidebar } from './components/AppSidebar';

export default function MsLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <SidebarTrigger />
          <h1>header</h1>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarInset>
      <Toaster position="top-center" closeButton duration={Infinity} />
    </SidebarProvider>
  );
}
