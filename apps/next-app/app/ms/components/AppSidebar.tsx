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
  SidebarMenuAction,
  SidebarGroupAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@common/ui';
import { BellIcon, ChevronDownIcon, HomeIcon, ListIcon, LockIcon, PlusIcon, TagIcon } from '@common/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const path = usePathname();

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
    {
      title: 'as child Disabled',
      url: '/ms/disabled',
      icon: <LockIcon />,
      disabled: true,
    },
  ];

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader className="shrink-0 items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src="/images/avatar-slack.png" alt="main" width={56} height={56} />
                <Button variant="gradient">TEST</Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* 일반 그룹 */}
        <SidebarGroup>
          <SidebarGroupLabel>장명수 사이드바</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <PlusIcon /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltipContents={item.title} isActive={item.url === path}>
                    <Link data-slot="button" href={item.url} aria-disabled={item.disabled}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover>
                    <ListIcon /> <span className="sr-only">Add Project</span>
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton disabled>
                  <LockIcon />
                  normal Disalbed
                </SidebarMenuButton>
                <SidebarMenuAction>
                  <ListIcon /> <span className="sr-only">Add Project</span>
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LockIcon />
                  Action
                </SidebarMenuButton>
                <SidebarMenuAction onClick={() => alert('action')}>
                  <ListIcon /> <span className="sr-only">Add Project</span>
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <TagIcon />
                  Badge
                </SidebarMenuButton>
                <SidebarMenuBadge>9</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton variant="outline">
                  <BellIcon />
                  outline
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuSkeleton />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapsible 그룹 */}
        <CollapsibleRoot className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Help
                <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <TagIcon />
                      Badge
                    </SidebarMenuButton>
                    <SidebarMenuBadge>9</SidebarMenuBadge>
                  </SidebarMenuItem>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltipContents={item.title} isActive={item.url === path}>
                        <Link data-slot="button" href={item.url} aria-disabled={item.disabled}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuAction showOnHover>
                        <ListIcon /> <span className="sr-only">Add Project</span>
                      </SidebarMenuAction>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </CollapsibleRoot>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <SidebarInput />
        </div>
      </SidebarFooter>
    </SidebarRoot>
  );
}
