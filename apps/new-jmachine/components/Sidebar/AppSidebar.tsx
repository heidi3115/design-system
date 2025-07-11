import {
  SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  Button,
  SidebarInput,
  SidebarMenuItem,
} from '@common/ui';
import Image from 'next/image';
import Link from 'next/link';

import { MenuItemType } from '../../services/common/getMenusFetch';
import { NavigationItemRenderer } from './NavigationItemRenderer';

export function AppSidebar({ menuData }: { menuData?: MenuItemType[] }) {
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
        <SidebarGroup className="p-0">{!!menuData?.length && <NavigationItemRenderer items={menuData} />}</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <SidebarInput />
        </div>
      </SidebarFooter>
    </SidebarRoot>
  );
}
