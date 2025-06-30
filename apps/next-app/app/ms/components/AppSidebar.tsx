'use client';

import {
  SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  Avatar,
  Button,
  useSidebar,
} from '@common/ui';
import { BellIcon, HomeIcon } from '@common/ui/icons';
import Link from 'next/link';

export function AppSidebar() {
  const items = [
    {
      title: 'MS',
      url: '/ms',
      icon: <HomeIcon />,
    },
    {
      title: 'Tabs',
      url: '/ms/tabs',
      icon: <BellIcon />,
    },
  ];

  const { open } = useSidebar();

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader className="h-14 shrink-0 items-center">
        <SidebarMenuButton asChild>
          <div>
            <Avatar src={'/images/avatar-jira.png'} />
            {open && <Button variant="gradient">TEST</Button>}
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>장명수 사이드바</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenu key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenu>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </SidebarRoot>
  );
}
