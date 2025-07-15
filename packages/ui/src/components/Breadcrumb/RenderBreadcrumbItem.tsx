'use client';

import type { MouseEvent, ReactElement } from 'react';
import { cn } from '@common/ui/lib/utils';
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  breadcrumbVariants,
  DropdownMenu,
} from '@common/ui';
import type { BreadcrumbCondensedType, DropdownItemType } from './Breadcrumb';
import type { OptionItem } from '@common/ui/components/DropdownMenu/DropdownMenu';

type RenderProps = {
  item: BreadcrumbCondensedType;
  isLast: boolean;
  disabled: boolean;
  variant: keyof typeof breadcrumbVariants.variants.variant;
  size: keyof typeof breadcrumbVariants.variants.size;
  separatorIcon?: ReactElement;
};

const handleItemSelect = (hiddenItems: BreadcrumbCondensedType[], option: OptionItem) => {
  const matchedItem = (hiddenItems || []).find((h) => h.value === option.value && h.label === option.label);

  if (matchedItem?.href) {
    if (matchedItem?.target) {
      window.open(matchedItem.href, matchedItem.target);
    }

    window.location.href = matchedItem.href;
  }
};

function renderIconPosition(item: BreadcrumbCondensedType) {
  return item?.iconPosition === 'right' ? (
    <>
      <span>{item?.label}</span>
      {item?.icon}
    </>
  ) : (
    <>
      {item?.icon}
      <span>{item?.label}</span>
    </>
  );
}

function renderPage({ item, variant, size, isLast, disabled, separatorIcon }: RenderProps) {
  if (!item.isPage) return;
  const { base, listItem, page, separator } = breadcrumbVariants({
    variant,
    size,
    disabled: disabled || item?.disabled,
    isTrigger: false,
  });
  const disabledClass = base();

  return (
    <>
      <BreadcrumbItem className={cn(listItem(), item.className, disabledClass)}>
        <BreadcrumbPage aria-current={isLast ? 'page' : undefined} className={cn(page(), disabledClass)}>
          {renderIconPosition(item)}
        </BreadcrumbPage>
      </BreadcrumbItem>
      {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
    </>
  );
}

function renderLink({ item, variant, size, isLast, disabled, separatorIcon }: RenderProps) {
  if (item.isPage || item.itemType !== 'link') return;
  const disabledVal = disabled || item?.disabled;
  const { base, listItem, link, separator } = breadcrumbVariants({
    variant,
    size,
    disabled: disabledVal,
    isTrigger: item.isTrigger,
  });
  const disabledClass = base();
  const linkProps = {
    'aria-current': isLast ? ('page' as const) : undefined,
    'aria-disabled': disabledVal,
    tabIndex: disabledVal ? -1 : 0,
    href: item.href,
    target: item?.target || '_self',
    className: cn(link(), disabledClass),
  };

  return (
    <>
      <BreadcrumbItem className={cn(listItem(), item.className, disabledClass)}>
        {item.isTrigger ? (
          <DropdownMenu
            {...item?.dropdownProps}
            options={
              item?.dropdownOptions
                ? item.dropdownOptions.map(
                    (h: DropdownItemType): OptionItem => ({
                      type: 'item',
                      value: h.value,
                      label: h.label,
                      disabled: h.disabled,
                    }),
                  )
                : []
            }
            trigger={
              <BreadcrumbLink
                {...linkProps}
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                }}>
                {renderIconPosition(item)}
              </BreadcrumbLink>
            }
            onItemSelect={(option: OptionItem) => handleItemSelect(item.hiddenItems ?? [], option)}
            className={disabledClass}
          />
        ) : (
          <BreadcrumbLink {...linkProps}>{renderIconPosition(item)}</BreadcrumbLink>
        )}
      </BreadcrumbItem>
      {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
    </>
  );
}

function renderEllipsis({ item, variant, size, isLast, disabled, separatorIcon }: RenderProps) {
  if (item.itemType !== 'ellipsis') return;

  const { base, listItem, ellipsis, separator } = breadcrumbVariants({
    variant,
    size,
    disabled: disabled || item?.disabled,
    isTrigger: item.isTrigger,
  });
  const disabledClass = base();

  return item.isTrigger ? (
    <>
      <BreadcrumbItem className={cn(listItem(), item.className, disabledClass)}>
        <DropdownMenu
          {...item?.dropdownProps}
          options={
            item?.dropdownOptions
              ? item.dropdownOptions.map(
                  (h): OptionItem => ({
                    type: 'item',
                    value: h.value,
                    label: h.label,
                    disabled: h.disabled,
                  }),
                )
              : []
          }
          trigger={
            <BreadcrumbEllipsis
              data-slot={'breadcrumb-ellipsis'}
              data-role={'dropdown-menu-trigger'}
              icon={item?.icon || null}
              className={cn(ellipsis(), item.className, disabledClass)}
            />
          }
          onItemSelect={(option: OptionItem) => handleItemSelect(item?.hiddenItems ?? [], option)}
          className={cn(item?.dropdownProps?.className, disabledClass)}
        />
      </BreadcrumbItem>
      {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
    </>
  ) : (
    <>
      <BreadcrumbItem className={cn(listItem(), item.className, disabledClass)}>
        <BreadcrumbEllipsis icon={item.icon} className={cn(ellipsis(), disabledClass)} />{' '}
      </BreadcrumbItem>
      {!isLast && <BreadcrumbSeparator icon={separatorIcon} className={cn(separator())} />}
    </>
  );
}

function RenderBreadcrumbItem({ item, variant, size, isLast, disabled, separatorIcon }: RenderProps) {
  if (!item) return null;

  if (isLast && item.isPage) {
    return renderPage({
      item: { ...item, itemType: 'page' },
      variant,
      size,
      isLast,
      disabled,
      separatorIcon,
    });
  } else if (item.itemType === 'link') {
    return renderLink({ item, variant, size, isLast, disabled, separatorIcon });
  } else if (item.itemType === 'ellipsis') {
    return renderEllipsis({ item, variant, size, isLast, disabled, separatorIcon });
  } else {
    return renderPage({ item, variant, size, isLast, disabled, separatorIcon });
  }
}

export default RenderBreadcrumbItem;
