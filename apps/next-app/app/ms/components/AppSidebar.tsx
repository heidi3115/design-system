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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarCollasibleGroup,
} from '@common/ui';
import {
  BellIcon,
  EditIcon,
  FileIcon,
  HomeIcon,
  ListIcon,
  LockIcon,
  MenuIcon,
  PlusIcon,
  TagIcon,
} from '@common/ui/icons';
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
      title: 'Box',
      url: '/ms/box',
      icon: <FileIcon />,
    },
    {
      title: 'InBox',
      url: '/ms/inBox',
      icon: <FileIcon />,
    },
    {
      title: 'as child Disabled',
      url: '/ms/disabled',
      icon: <LockIcon />,
      disabled: true,
    },
  ];

  const subData = {
    navMain: [
      {
        title: 'Getting Started',
        url: '#',
        float: false,
        items: [
          {
            title: 'Installation',
            url: '#',
          },
          {
            title: 'Project Structure',
            url: '#',
          },
        ],
      },
      {
        title: 'Float Sub Menu',
        url: '#',
        float: true,
        items: [
          {
            title: 'Routing',
            url: '#',
          },
          {
            title: 'Data Fetching',
            url: '#',
            isActive: true,
          },
          {
            title: 'Rendering',
            url: '#',
          },
          {
            title: 'Caching',
            url: '#',
          },
          {
            title: 'Styling',
            url: '#',
            icon: <EditIcon />,
          },
          {
            title: 'Optimizing',
            url: '#',
          },
          {
            title: 'Configuring',
            url: '#',
          },
          {
            title: 'Testing',
            url: '#',
          },
          {
            title: 'Authentication',
            url: '#',
          },
          {
            title: 'Deploying',
            url: '#',
          },
          {
            title: 'Upgrading',
            url: '#',
          },
          {
            title: 'Examples',
            url: '#',
          },
        ],
      },
      {
        title: 'API Reference',
        url: '#',
        float: false,
        items: [
          {
            title: 'Components',
            url: '#',
          },
          {
            title: 'File Conventions',
            url: '#',
          },
          {
            title: 'Functions',
            url: '#',
          },
          {
            title: 'next.config.js Options',
            url: '#',
          },
          {
            title: 'CLI',
            url: '#',
          },
          {
            title: 'Edge Runtime',
            url: '#',
          },
        ],
      },
      {
        title: 'Architecture',
        url: '#',
        float: false,
        items: [
          {
            title: 'Accessibility',
            url: '#',
          },
          {
            title: 'Fast Refresh',
            url: '#',
          },
          {
            title: 'Next.js Compiler',
            url: '#',
          },
          {
            title: 'Supported Browsers',
            url: '#',
          },
          {
            title: 'Turbopack',
            url: '#',
          },
        ],
      },
      {
        title: 'Community',
        url: '#',
        items: [
          {
            title: 'Contribution Guide',
            url: '#',
          },
        ],
      },
    ],
  };

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader className="shrink-0 items-center h-12 bg-juiPrimary/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src="/images/avatar-slack.png" alt="main" width={32} height={32} />
                <Button variant="gradient">TEST</Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* 일반 그룹 */}
        <SidebarGroup>
          <SidebarGroupLabel>장명수 사이드바 일반</SidebarGroupLabel>
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

        <SidebarSeparator />
        {/* 서브 그룹 */}
        <SidebarGroup>
          <SidebarGroupLabel>서브 그룹 사이드바</SidebarGroupLabel>
          <SidebarMenu>
            {subData.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link data-slot="button" href={item.url}>
                    {!item.float && <MenuIcon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub isFloat={item.float}>
                    {item.items.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton
                          asChild
                          size={item.float ? 'sm' : undefined}
                          isActive={'isActive' in sub && sub.isActive}>
                          <Link data-slot="button" href={sub.url}>
                            {'icon' in sub && sub.icon}
                            <span>{sub.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />
        {/* Collapsible 그룹 */}
        <SidebarCollasibleGroup collasibleTitle="Collapsible" groupTitle="Collasible 사이드바">
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
        </SidebarCollasibleGroup>

        <SidebarSeparator />
        {/* collasible 서브 그룹 */}
        <SidebarGroup className="pb-0">
          <SidebarGroupLabel>Collasible 서브 그룹 사이드바</SidebarGroupLabel>
        </SidebarGroup>
        {subData.navMain.map((item, index) => (
          <SidebarCollasibleGroup
            extendType="plus"
            key={item.title}
            defaultOpen={index === 1}
            collasibleTitle={
              index === 1 ? (
                <div className="flex gap-2">
                  <MenuIcon />
                  {item.title}
                </div>
              ) : (
                item.title
              )
            }>
            {item.items?.length ? (
              <SidebarGroupContent>
                <SidebarMenuSub isFloat={item.float}>
                  {item.items.map((sub) => (
                    <SidebarMenuSubItem key={sub.title}>
                      <SidebarMenuSubButton
                        asChild
                        size={item.float ? 'sm' : undefined}
                        isActive={'isActive' in sub && sub.isActive}>
                        <Link data-slot="button" href={sub.url}>
                          {'icon' in sub && sub.icon}
                          <span>{sub.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarGroupContent>
            ) : null}
          </SidebarCollasibleGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <SidebarInput />
        </div>
      </SidebarFooter>
    </SidebarRoot>
  );
}
