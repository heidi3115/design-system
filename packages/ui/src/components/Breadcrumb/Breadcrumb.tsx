'use client';

import { type ComponentProps, Fragment, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { cn } from '@common/ui/lib/utils';
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  breadcrumbVariants,
  BreadcrumbWrapper,
  DropdownMenu,
  DropdownMenuContent,
} from '@common/ui';
import { ChevronRightIcon, MoreHorizontalFilledIcon } from '@common/ui/icons';
import { createCondensedArray } from '@common/ui/components/Breadcrumb/hooks/useCondensedArray';
import { isSafeArray, toSafeTypeValue } from '@common/ui/components/Breadcrumb/helpers';
import { type OptionItem } from '@common/ui/components/DropdownMenu/DropdownMenu';

export type EllipsisPositionType = (typeof VALID_ELLIPSIS_POSITIONS)[number];
export const VALID_ELLIPSIS_POSITIONS = ['start', 'center', 'end'] as const;
export const DEFAULT_ELLIPSIS_POSITION: EllipsisPositionType = 'center';
export const VALID_TARGETS = ['_blank', '_self', '_parent', '_top'] as const;
export const DEFAULT_MAX_ITEM = 3;

export type BreadcrumbItemBaseType = {
  value: string;
  label: string;
  href: string;
  icon?: ReactNode;
  iconPosition?: string;
  target?: string;
  className?: string;
  disabled?: boolean;
  isPage?: boolean;
  children?: BreadcrumbItemBaseType[];
};

export type DropdownPropsType = {
  dropdownProps?: {
    className?: string;
    size?: number;
    align?: ComponentProps<typeof DropdownMenuContent>['align'];
    alignOffset?: ComponentProps<typeof DropdownMenuContent>['alignOffset'];
    side?: ComponentProps<typeof DropdownMenuContent>['side'];
    sideOffset?: ComponentProps<typeof DropdownMenuContent>['sideOffset'];
  };
};

export type BreadcrumbProps = ComponentProps<'nav'> & {
  items: BreadcrumbItemBaseType[];
  disabled?: boolean;
  enableDropdown?: boolean;
  maxItems?: number | null;
  ellipsisPosition?: EllipsisPositionType;
  ellipsisIcon?: ReactElement;
  separatorIcon?: ReactElement;
} & VariantProps<typeof breadcrumbVariants> &
  DropdownPropsType;

function Breadcrumb({
  items = [],
  variant = 'primary',
  size = 'small',
  disabled = false,
  enableDropdown = true,
  maxItems = DEFAULT_MAX_ITEM,
  ellipsisPosition = DEFAULT_ELLIPSIS_POSITION,
  ellipsisIcon = <MoreHorizontalFilledIcon />,
  separatorIcon = <ChevronRightIcon />,
  dropdownProps,
  className,
  ...props
}: BreadcrumbProps) {
  const { base, wrapper, list, listItem, ellipsis, separator } = breadcrumbVariants({
    variant,
    size,
    disabled: disabled,
  });

  const { condensedItems, ellipsisItems } = createCondensedArray({ items, maxItems, ellipsisPosition });

  return (
    <BreadcrumbWrapper {...props} className={cn(wrapper(), base())}>
      <BreadcrumbList className={cn(list(), className, base())}>
        {condensedItems.map((item, idx) => {
          if (!item) return;
          const isLast = idx === condensedItems?.length - 1;
          const isEllipsis = item === 'ellipsis';
          const itemDisabled = !isEllipsis && item.disabled;
          const disabledClass = breadcrumbVariants({ disabled: Boolean(disabled || itemDisabled) }).base();
          const linkProps = !isEllipsis && {
            'aria-current': isLast ? ('page' as const) : undefined,
            'aria-disabled': itemDisabled,
            tabIndex: itemDisabled ? -1 : 0,
            href: item.href,
            target: toSafeTypeValue(item?.target, VALID_TARGETS),
          };
          const children = isEllipsis
            ? isSafeArray(ellipsisItems)
              ? ellipsisItems
              : []
            : isSafeArray(item?.children)
              ? item?.children
              : [];
          const options: OptionItem[] = (children ?? []).map((child) => ({
            type: 'item',
            value: child.value,
            label: child.label,
            disabled: child.disabled ?? false,
          }));
          const triggerClass = breadcrumbVariants({
            isTrigger: enableDropdown && options.length > 0,
          }).trigger();

          const renderIconPosition = (itemBase: BreadcrumbItemBaseType) =>
            itemBase?.iconPosition === 'right' ? (
              <>
                <span>{itemBase?.label}</span>
                {itemBase?.icon}
              </>
            ) : (
              <>
                {itemBase?.icon}
                <span>{itemBase?.label}</span>
              </>
            );

          return (
            <Fragment key={`${idx}`}>
              <BreadcrumbItem
                className={cn('flex flex-row items-center justify-center', base(), className, disabledClass)}>
                {item === 'ellipsis' ? (
                  enableDropdown ? (
                    <DropdownMenu
                      {...dropdownProps}
                      options={options}
                      trigger={
                        <BreadcrumbEllipsis
                          icon={ellipsisIcon}
                          className={cn(base(), ellipsis(), triggerClass, disabledClass)}
                        />
                      }
                    />
                  ) : (
                    <BreadcrumbEllipsis icon={ellipsisIcon} className={cn(base(), ellipsis(), disabledClass)} />
                  )
                ) : item.isPage ? (
                  <BreadcrumbPage
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(base(), listItem(), item?.className, disabledClass)}>
                    {renderIconPosition(item)}
                  </BreadcrumbPage>
                ) : enableDropdown && options.length > 0 ? (
                  <DropdownMenu
                    {...dropdownProps}
                    options={options}
                    trigger={
                      <BreadcrumbLink
                        {...linkProps}
                        className={cn(base(), listItem(), triggerClass, item?.className, disabledClass)}
                        onClick={(e: MouseEvent) => e.stopPropagation()}>
                        {renderIconPosition(item)}
                      </BreadcrumbLink>
                    }
                  />
                ) : (
                  <BreadcrumbLink {...linkProps} className={cn(base(), listItem(), item?.className, disabledClass)}>
                    {renderIconPosition(item)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
}

export default Breadcrumb;
