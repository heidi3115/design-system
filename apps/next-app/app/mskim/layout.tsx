'use client';

import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger, Toaster } from '@common/ui';
// import ThemeToggle from '../../components/ThemeToggle';
import { MainSidebar } from './MainSidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-1 flex h-12 shrink-0 items-center gap-2 bg-juiBackground-input light:border-b light:border-b-juiBorder-primary p-2">
          <SidebarTrigger variant="primary" className="aspect-square p-0 rounded-full" />
          <h1 className="font-bold">header</h1>
          {/*<div className="ml-auto">*/}
          {/*  <ThemeToggle />*/}
          {/*</div>*/}
        </header>
        <main>
          <div className="w-full h-auto">{children}</div>
        </main>
      </SidebarInset>
      <Toaster position="top-center" closeButton duration={Infinity} />
    </SidebarProvider>
  );
};

export default Layout;
