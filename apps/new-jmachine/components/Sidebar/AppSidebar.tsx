import Image from 'next/image';
import Link from 'next/link';

import {
  SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  Tooltip,
} from '@common/ui';

import { MenuItemType } from '../../services/common/getMenusFetch';
import { NavigationItemRenderer } from './NavigationItemRenderer';
import { SideBarIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils';
import { use } from 'react';

export function AppSidebar({ menuData: promiseMenuData }: { menuData?: Promise<MenuItemType[]> }) {
  if (!promiseMenuData) return null;

  const menuData = use(promiseMenuData);

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader className="group/header items-center h-12 p-0 bg-juiBackground-input light:bg-juiGrey-900/30">
        <SidebarMenu className="h-12">
          <SidebarMenuItem className="flex m-auto h-full w-full">
            <SidebarMenuButton
              size="lg"
              className="group-data-[state=expanded]:hidden flex m-auto group-hover/header:hidden"
              asChild>
              <Link href="/main">
                <Image src="/images/jason-logo.png" alt="main" className="shrink-0" width={32} height={32} />
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton
              size="sm"
              className={cn(
                'cursor-e-resize',
                'hidden group-hover/header:flex',
                'hover:bg-transparent hover:text-juiText-blue',
                'group-data-[state=expanded]:hidden',
                'group-data-[state=collapsed]:[&>svg]:size-5',
                'group-data-[state=collapsed]:p-1.5!',
              )}
              tooltipContents="사이드바 열기"
              asChild>
              <SidebarTrigger className="m-auto cursor-e-resize!" asChild>
                <SideBarIcon size="medium" />
              </SidebarTrigger>
            </SidebarMenuButton>

            <SidebarMenuButton size="lg" className="group-data-[state=collapsed]:hidden gap-1" asChild>
              <Link href="/main">
                <Image src="/images/jmachine-logo-login.png" alt="main" width={120} height={32} />
                <Image
                  src="/images/overall-status.png"
                  alt="overall"
                  className=" mt-auto mx-0 mb-1.5"
                  width={75}
                  height={10}
                />
              </Link>
            </SidebarMenuButton>

            <Tooltip contents="사이드바 닫기" side="right" sideOffset={2}>
              <SidebarTrigger
                className={cn(
                  'hidden',
                  'group-data-[state=collapsed]:hidden',
                  'group-hover/header:flex',
                  'cursor-w-resize!',
                  'mx-2',
                  'my-auto',
                  'hover:text-juiText-blue',
                  'hover:bg-transparent/50',
                )}
                asChild>
                <SideBarIcon />
              </SidebarTrigger>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">{!!menuData?.length && <NavigationItemRenderer items={menuData} />}</SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
}
