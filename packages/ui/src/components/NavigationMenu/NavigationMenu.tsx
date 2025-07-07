'use client';

import type { ComponentProps, ReactNode } from 'react';

import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from './NavigaionMenuParts';

import { cn } from '../../lib/utils';

type MenusType = {
  trigger: ReactNode;
  items: {
    label: ReactNode;
    href: string;
    disabled?: boolean;
  }[];
  width?: string;
  disabled?: boolean;
};

type MenuLinkType = {
  link: string;
  trigger: React.ReactNode;
};

type MenuItemType = OnlyOne<MenusType, MenuLinkType>;

type NavigationWithMenus = {
  menus: MenuItemType[];
};

type NavigationWithChildren = {
  children: React.ReactNode;
};

type NavigationMenuProps = OnlyOne<NavigationWithMenus, NavigationWithChildren> &
  ComponentProps<typeof NavigationMenuRoot> & {
    itemClassName?: string;
    linkClassName?: string;
  };

function NavigationMenu({
  menus,
  orientation,
  className,
  itemClassName,
  linkClassName,
  children,
}: NavigationMenuProps) {
  return (
    <NavigationMenuRoot orientation={orientation} className={className}>
      <NavigationMenuList>
        {menus && Array.isArray(menus)
          ? menus.map((menu, index) => (
              <NavigationMenuItem key={index} className={itemClassName}>
                {'link' in menu ? (
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), linkClassName)}>
                    <a href={menu.link}>{menu.trigger}</a>
                  </NavigationMenuLink>
                ) : (
                  <>
                    {typeof menu.trigger === 'string' ? (
                      <NavigationMenuTrigger disabled={menu.disabled}>{menu.trigger}</NavigationMenuTrigger>
                    ) : (
                      <NavigationMenuTrigger disabled={menu.disabled} asChild>
                        {menu.trigger}
                      </NavigationMenuTrigger>
                    )}

                    <NavigationMenuContent style={{ width: menu.width ?? '250px' }}>
                      <ul className="grid gap-4">
                        {menu.items.map((item, idx) => (
                          <li key={idx}>
                            <NavigationMenuLink href={item.href} disabled={item.disabled} className={linkClassName}>
                              {item.label}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))
          : children}
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}

export default NavigationMenu;
