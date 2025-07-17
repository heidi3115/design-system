'use client';

import {
  SidebarCollapsibleGroup,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRoot,
  SidebarSeparator,
} from '@common/ui';
import { HomeIcon, ListIcon, MenuIcon, PlusIcon } from '@common/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { MouseIcon, TableIcon } from 'lucide-react';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

export function MainSidebar() {
  const path = usePathname();
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
      disabled: true,
    },
  ];

  const subData = {
    navMain: [
      {
        title: '시작하기',
        url: '#',
        float: true,
        items: [
          {
            title: '웹 사이트에 React 추가하기',
            url: '#',
          },
          {
            title: '새로운 React 앱 만들기',
            url: '#',
          },
        ],
      },
      {
        title: '주요 개념',
        url: '#',
        float: true,
        items: [
          {
            title: 'Hello world',
            url: '#',
          },
          {
            title: 'JSX 소개',
            url: '#',
            isActive: false,
          },
          {
            title: '엘리먼트 렌더링',
            url: '#',
          },
          {
            title: 'Component와 Props',
            url: '#',
          },
          {
            title: 'State와 생명주기',
            url: '#',
          },
        ],
      },
      {
        title: '고급 안내서',
        url: '#',
        float: true,
        items: [
          {
            title: '접근성',
            url: '#',
          },
          {
            title: '코드 분할',
            url: '#',
          },
          {
            title: 'Context',
            url: '#',
          },
        ],
      },
      {
        title: 'HOOK',
        url: '#',
        float: false,
        items: [
          {
            title: 'Hook 소개',
            url: '#',
          },
          {
            title: 'Hook 개요',
            url: '#',
          },
          {
            title: 'State Hook 사용하기',
            url: '#',
          },
          {
            title: 'Effect Hook 사용하기',
            url: '#',
          },
          {
            title: 'Hook 규칙',
            url: '#',
          },
          {
            title: '자신만의 Hook 만들기',
            url: '#',
          },
          {
            title: 'Hook API 참고서',
            url: '#',
          },
          {
            title: 'Hook 자주 묻는 질문',
            url: '#',
          },
        ],
      },
    ],
  };

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
          <SidebarGroupLabel>브로콜리</SidebarGroupLabel>
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
                  <SidebarMenuAction>
                    <ListIcon /> <span className="sr-only">Add Project</span>
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarCollapsibleGroup collapsibleTitle="side bar" groupTitle="사이드바">
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarCollapsibleGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>React 문서</SidebarGroupLabel>
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
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">2025.07.11 만듦.</div>
      </SidebarFooter>
    </SidebarRoot>
  );
}
