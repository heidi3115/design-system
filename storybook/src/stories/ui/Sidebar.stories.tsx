import {
  SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
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
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
} from '@common/ui';
import {
  BellIcon,
  EditIcon,
  EyeIcon,
  HomeIcon,
  ListIcon,
  LockIcon,
  MenuIcon,
  PlusIcon,
  TagIcon,
} from '@common/ui/icons';

import type { Meta, StoryObj } from '@storybook/react';

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

const AppSidebar = () => (
  <SidebarRoot className="absolute max-h-full" collapsible="icon">
    <SidebarHeader className="bg-juiText-blue/70 pointer-events-none h-12">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <EyeIcon />
            Header
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      {/* 일반 그룹 */}
      <SidebarGroup>
        <SidebarGroupLabel>사이드바 일반</SidebarGroupLabel>
        <SidebarGroupAction title="Add Project">
          <PlusIcon /> <span className="sr-only">Add Project</span>
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltipContents={item.title}>
                  <a data-slot="button" href={item.url} aria-disabled={item.disabled}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
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
                <a data-slot="button" href={item.url}>
                  {!item.float && <MenuIcon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <SidebarMenuSub isFloat={item.float}>
                  {item.items.map((sub) => (
                    <SidebarMenuSubItem key={sub.title}>
                      <SidebarMenuSubButton
                        asChild
                        size={item.float ? 'sm' : undefined}
                        isActive={'isActive' in sub && sub.isActive}>
                        <a data-slot="button" href={sub.url}>
                          {'icon' in sub && sub.icon}
                          <span>{sub.title}</span>
                        </a>
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
                <SidebarMenuButton asChild tooltipContents={item.title}>
                  <a data-slot="button" href={item.url} aria-disabled={item.disabled}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
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
          collasibleTitle={item.title}>
          {item.items?.length ? (
            <SidebarGroupContent>
              <SidebarMenuSub isFloat={item.float}>
                {item.items.map((sub) => (
                  <SidebarMenuSubItem key={sub.title}>
                    <SidebarMenuSubButton
                      asChild
                      size={item.float ? 'sm' : undefined}
                      isActive={'isActive' in sub && sub.isActive}>
                      <a data-slot="button" href={sub.url}>
                        {'icon' in sub && sub.icon}
                        <span>{sub.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarGroupContent>
          ) : null}
        </SidebarCollasibleGroup>
      ))}
    </SidebarContent>
    <SidebarFooter className="bg-juiGrey-a700 pointer-events-none">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>Footer</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </SidebarRoot>
);
const meta: Meta = {
  title: 'Compound/Sidebar',
  decorators: [
    () => {
      return (
        <div className="relative min-h-full p-0">
          <SidebarProvider defaultOpen={false} className="min-h-[1000px] max-h-[1000px]">
            <AppSidebar />
            <SidebarInset className="h-full">
              <header className="sticky top-0 z-1 flex h-12 shrink-0 items-center gap-2 bg-juiBackground-input light:border-b light:border-b-juiBorder-primary p-2">
                <SidebarTrigger variant="primary" className="aspect-square p-0 rounded-full" />
                <h1 className="font-bold">Header</h1>
              </header>
            </SidebarInset>
          </SidebarProvider>
        </div>
      );
    },
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Sidebar 컴포넌트는 컨드롤 불가능 합니다. 자세한 사용법은 https://ui.shadcn.com/docs/components/sidebar 참고 하여 사용 합니다.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {};
