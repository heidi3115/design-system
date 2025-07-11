'use client';

import {
  SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  // SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarMenuAction,
  SidebarGroupAction,
  SidebarHeader,
  // SidebarMenuBadge,
  // SidebarMenuSkeleton,
  // SidebarMenuSub,
  // SidebarMenuSubItem,
  // SidebarMenuSubButton,
  // SidebarSeparator,
  // SidebarCollasibleGroup,
} from '@common/ui';
import { HomeIcon, PlusIcon } from '@common/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import { MouseIcon, TableIcon } from 'lucide-react';
import { toast } from 'sonner';

export function MainSidebar() {
  // const path = usePathname();

  const items = [
    {
      title: 'Home',
      url: '/mskim',
      icon: <HomeIcon />,
    },
    {
      title: 'Toggle',
      url: '/mskim/test',
      icon: <MouseIcon />,
    },
    {
      title: 'Table',
      url: '/mskim/table',
      icon: <TableIcon />,
    },
  ];

  // const subData = {
  //   navMain: [
  //     {
  //       title: 'Getting Started',
  //       url: '#',
  //       float: false,
  //       items: [
  //         {
  //           title: 'Installation',
  //           url: '#',
  //         },
  //         {
  //           title: 'Project Structure',
  //           url: '#',
  //         },
  //       ],
  //     },
  //     {
  //       title: 'Float Sub Menu',
  //       url: '#',
  //       float: true,
  //       items: [
  //         {
  //           title: 'Routing',
  //           url: '#',
  //         },
  //         {
  //           title: 'Data Fetching',
  //           url: '#',
  //           isActive: true,
  //         },
  //         {
  //           title: 'Rendering',
  //           url: '#',
  //         },
  //         {
  //           title: 'Caching',
  //           url: '#',
  //         },
  //         {
  //           title: 'Styling',
  //           url: '#',
  //           icon: <EditIcon />,
  //         },
  //       ],
  //     },
  //     {
  //       title: 'API Reference',
  //       url: '#',
  //       float: false,
  //       items: [
  //         {
  //           title: 'Components',
  //           url: '#',
  //         },
  //         {
  //           title: 'File Conventions',
  //           url: '#',
  //         },
  //         {
  //           title: 'Edge Runtime',
  //           url: '#',
  //         },
  //       ],
  //     },
  //     {
  //       title: 'Architecture',
  //       url: '#',
  //       float: false,
  //       items: [
  //         {
  //           title: 'Accessibility',
  //           url: '#',
  //         },
  //         {
  //           title: 'Fast Refresh',
  //           url: '#',
  //         },
  //       ],
  //     },
  //   ],
  // };

  return (
    <SidebarRoot>
      <SidebarContent>
        <SidebarHeader className="shrink-0 items-center h-12 bg-juiPrimary/50">
          <SidebarMenu>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/mskim">
                <Image src="/images/broccoli.png" alt="main" width={32} height={32} />
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>사이드바</SidebarGroupLabel>
          <SidebarGroupAction
            title="Add Project"
            onClick={() =>
              toast.info('추가 버튼 클릭', {
                description: '더이상 추가할 수 없음',
              })
            }>
            <PlusIcon /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>사이드바2</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">2025.07.11 만듦.</div>
      </SidebarFooter>
    </SidebarRoot>
  );
}
