'use client';

import { ReactNode } from 'react';
import { NavigationMenu, SidebarInset, SidebarProvider, SidebarTrigger, Toaster } from '@common/ui';
import { AppSidebar } from './components/AppSidebar';
import { useSelectedLayoutSegment } from 'next/navigation';
import { MainContent } from './components/MainContent';
import ThemeToggle from '../../components/ThemeToggle';

export default function MsLayout({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment();

  const isRootPage = segment === null;

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-1 flex h-12 shrink-0 items-center gap-2 bg-juiBackground-input light:border-b light:border-b-juiBorder-primary p-2">
          <SidebarTrigger variant="primary" className="aspect-square p-0 rounded-full" />
          <h1 className="font-bold">header</h1>
          <NavigationMenu
            menus={[
              {
                trigger: 'opt1',
                items: [
                  { label: 'A', href: '#', disabled: true },
                  { label: 'B', href: '#' },
                  { label: 'B', href: '#' },
                  { label: 'B', href: '#' },
                ],
              },
              {
                trigger: 'opt1',
                items: [
                  { label: 'A', href: '#', disabled: true },
                  { label: 'B', href: '#' },
                  { label: 'B', href: '#' },
                  { label: 'B', href: '#' },
                ],
              },
              {
                trigger: 'Docs',
                link: '/ms/tabs',
              },
              {
                trigger: 'opt3',
                disabled: true,
                items: [
                  { label: 'A', href: '#' },
                  { label: 'B', href: '#' },
                ],
              },
            ]}
          />
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        {isRootPage ? <MainContent contentType="flex">{children}</MainContent> : children}
      </SidebarInset>
      <Toaster position="top-center" closeButton duration={Infinity} />
    </SidebarProvider>
  );
}
