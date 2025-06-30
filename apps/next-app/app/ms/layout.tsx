import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger, Toaster } from '@common/ui';
import { AppSidebar } from './components/AppSidebar';

export default function MsLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-1 flex h-14 shrink-0 items-center gap-2 bg-juiBackground-input light:border-b light:border-b-juiBorder-primary">
          <SidebarTrigger variant="primary" className="aspect-square p-0 rounded-full" />
          <h1 className="font-bold">header</h1>
        </header>
        <div className="flex-1 flex-col px-7 pb-7 h-[calc(100svh-theme(spacing.14))] overflow-auto">
          <section className="min-w-[1000px]">{children}</section>
        </div>
      </SidebarInset>
      <Toaster position="top-center" closeButton duration={Infinity} />
    </SidebarProvider>
  );
}
