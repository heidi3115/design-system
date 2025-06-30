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
  Button,
  SidebarInput,
  SidebarMenuItem,
} from '@common/ui';
import { BellIcon, HomeIcon } from '@common/ui/icons';
import Image from 'next/image';
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

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader className="shrink-0 items-center">
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <Image src="/images/avatar-slack.png" alt="main" width={56} height={56} />
            <Button variant="gradient">TEST</Button>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>장명수 사이드바</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltipContents={item.title}>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <SidebarInput />
        </div>
      </SidebarFooter>
    </SidebarRoot>
  );
}
