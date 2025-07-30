'use client';

import {
  SidebarCollapsibleGroup,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@common/ui';
import { ExternalLinkIcon, IconProps } from '@common/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@common/ui/lib/utils';
import { MenuItemType } from '../../services/common/getMenusFetch';
import { useNavIconMapping } from './hooks/useNavIconMapping';
import { ComponentType } from 'react';

type NavigationItemRendererProps = {
  items: MenuItemType[];
  depth?: number;
  isHover?: boolean;
};

export function NavigationItemRenderer({ items, depth = 0, isHover = false }: NavigationItemRendererProps) {
  const path = usePathname();
  const navIconMap = useNavIconMapping();

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.children?.length;
          const IconComponent = navIconMap[item.icon] ?? navIconMap['default'];

          if (hasChildren) return renderGroupItem({ item, depth, isHover, IconComponent });
          if (depth === 0) return renderRootItem({ item, path, IconComponent });

          return renderSubItem({ item, depth, isHover, path, IconComponent });
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function renderGroupItem({
  item,
  depth,
  isHover,
  IconComponent,
}: {
  item: MenuItemType;
  depth: number;
  isHover?: boolean;
  IconComponent?: ComponentType<IconProps>;
}) {
  const isTopLevel = depth === 0;

  return (
    <SidebarCollapsibleGroup
      key={item.code}
      collapsibleTitle={item.title}
      collapsibleIcon={IconComponent}
      collapsibleVisible
      extendType={depth > 0 ? 'plus' : 'chev'}
      depth={depth}
      triggerClassName={cn(
        'h-12 pl-4',
        'data-[state=open]:font-bold data-[state=open]:text-juiText-primary',
        '[group:not([data-state=collapsed])]:data-[state=open]:bg-current/5',
        depth > 0 && 'h-9 pl-6 text-juiText-secondary hover:text-juiText-primary',
        isHover && 'pl-4 pr-2',
      )}
      {...(isTopLevel && {
        hoverCardContents: (
          <div className="w-52 bg-juiPrimary light:bg-juiGrey-a200 border-0 rounded-sm rounded-ss-none">
            <span className="flex h-12 px-4 items-center text-sm">{item.title}</span>
            <SidebarGroupContent className="pb-2">
              <SidebarMenuSub isFloat className="p-0 m-0">
                <NavigationItemRenderer items={item.children!} depth={depth + 1} isHover />
              </SidebarMenuSub>
            </SidebarGroupContent>
          </div>
        ),
        hoverCardProps: { sideOffset: 0, openDelay: 100, closeDelay: 0, triggerClass: 'h-12' },
      })}>
      <SidebarGroupContent
        className={cn('bg-juiGrey-50', depth > 0 && (isHover ? 'bg-juiBackground-input/20' : 'bg-juiGrey-100'))}>
        <SidebarMenuSub isFloat className="p-0 m-0">
          <NavigationItemRenderer items={item.children!} depth={depth + 1} isHover={isHover} />
        </SidebarMenuSub>
      </SidebarGroupContent>
    </SidebarCollapsibleGroup>
  );
}

function renderRootItem({
  item,
  path,
  IconComponent,
}: {
  item: MenuItemType;
  path: string;
  IconComponent?: ComponentType<IconProps>;
}) {
  return (
    <SidebarMenuItem
      key={item.code}
      className="flex items-center justify-center group-data-[state=expanded]:hover:bg-current/20 group-data-[state=collapsed]:py-2">
      <SidebarMenuButton
        asChild
        tooltipContents={item.title}
        isActive={path === item.href}
        className={cn(`
          h-12 py-2 pl-4
          active:font-bold
          data-[active=true]:bg-transparent 
          active:bg-transparent
          hover:font-bold
          data-[state=open]:hover:bg-transparent 
          group-data-[state=collapsed]:[&>svg]:size-5
          group-data-[state=collapsed]:p-1.5!
          group-data-[state=collapsed]:hover:bg-juiPrimary
          group-data-[state=collapsed]:hover:light:bg-juiPrimary/30
          group-data-[state=collapsed]:data-[active=true]:bg-juiPrimary
          group-data-[state=collapsed]:data-[active=true]:light:bg-juiPrimary/30
        `)}>
        <Link data-slot="button" href={item.href}>
          {IconComponent && <IconComponent />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuAction
        className="top-3.5!"
        showOnHover
        onClick={(e) => {
          e.stopPropagation();
          window.open(item.href, '_blank');
        }}>
        <ExternalLinkIcon />
        <span className="sr-only">External</span>
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
}

function renderSubItem({
  item,
  depth,
  isHover,
  path,
  IconComponent,
}: {
  item: MenuItemType;
  depth: number;
  isHover?: boolean;
  IconComponent?: ComponentType<IconProps>;
  path: string;
}) {
  return (
    <SidebarMenuSubItem key={item.code}>
      <SidebarMenuSubButton
        asChild
        isActive={path === item.href}
        className={cn(
          'h-9 pl-6 text-juiText-secondary hover:text-juiText-primary hover:font-bold data-[active=true]:text-juiText-primary',
          depth > 1 && 'pl-12 text-xs h-8',
          isHover && 'pl-4 pr-2',
          isHover && depth > 1 && 'pl-10',
        )}>
        <Link data-slot="button" href={item.href}>
          {depth < 2 && IconComponent && <IconComponent />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuSubButton>
      <SidebarMenuAction
        showOnHover
        onClick={(e) => {
          e.stopPropagation();
          window.open(item.href, '_blank');
        }}>
        <ExternalLinkIcon />
        <span className="sr-only">External</span>
      </SidebarMenuAction>
    </SidebarMenuSubItem>
  );
}
