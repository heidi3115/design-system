'use client';

import {
  SidebarCollasibleGroup,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from '@common/ui';
import { BellIcon, ExternalLinkIcon, HomeIcon, TagIcon } from '@common/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@common/ui/lib/utils';

import { MenuItemType } from '../../services/common/getMenusFetch';

export function NavigationItemRenderer({
  items,
  depth = 0,
  isHover = false,
}: {
  items: MenuItemType[];
  depth?: number;
  isHover?: boolean;
}) {
  const path = usePathname();

  return (
    <div className={cn(depth > 1 && 'bg-juiBackground-input/20')}>
      {items.map((item) =>
        item.children?.length ? (
          <SidebarCollasibleGroup
            key={item.code}
            collasibleTitle={item.title}
            collasibleIcon={depth > 0 ? TagIcon : BellIcon}
            {...(depth === 0 && {
              hoverCardContents: (
                <div className={cn('w-52 bg-juiPrimary light:bg-juiGrey-a200 border-0 rounded-sm rounded-ss-none')}>
                  <span className="flex h-12 px-4 items-center text-sm">{item.title}</span>
                  <SidebarGroupContent className="pb-2">
                    <SidebarMenuSub isFloat className={cn('p-0 m-0')}>
                      <NavigationItemRenderer items={item.children} depth={depth + 1} isHover />
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                </div>
              ),
              hoverCardProps: { sideOffset: 0, closeDelay: 0 },
            })}
            extendType={depth > 0 ? 'plus' : 'chev'}
            depth={depth}
            triggerClassName={cn(
              'h-12',
              'data-[state=open]:font-bold data-[state=open]:text-juiText-primary',
              '[group:not([data-state=collapsed])]:data-[state=open]:bg-current/5',
              depth > 0 && 'h-9 pl-5 text-juiText-secondary hover:text-juiText-primary',
              isHover && 'pl-5 pr-2',
            )}>
            <SidebarGroupContent className={cn('bg-juiGrey-100', depth > 0 && 'bg-transparent')}>
              <SidebarMenuSub isFloat className={cn('p-0 m-0')}>
                <NavigationItemRenderer items={item.children} depth={depth + 1} isHover={isHover} />
              </SidebarMenuSub>
            </SidebarGroupContent>
          </SidebarCollasibleGroup>
        ) : (
          <SidebarMenuSubItem key={item.code}>
            <SidebarMenuSubButton
              asChild
              isActive={path === item.href}
              className={cn(
                'h-9 pl-5 text-juiText-secondary hover:text-juiText-primary hover:font-bold data-[active=true]:text-juiText-primary',
                depth > 1 && 'pl-10 text-xs h-8',
                isHover && 'pl-5 pr-2',
                isHover && depth > 1 && 'pl-8',
              )}>
              <Link data-slot="button" href={item.href}>
                {depth < 2 && <HomeIcon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuSubButton>
            <SidebarMenuAction showOnHover>
              <ExternalLinkIcon />
              <span className="sr-only">External</span>
            </SidebarMenuAction>
          </SidebarMenuSubItem>
        ),
      )}
    </div>
  );
}
