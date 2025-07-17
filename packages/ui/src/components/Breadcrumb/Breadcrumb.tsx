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
} from '@common/ui';
import { ChevronRightIcon, MoreHorizontalFilledIcon } from '@common/ui/icons';
import { type OptionItem } from '../DropdownMenu/DropdownMenu';
import type {
  BreadcrumbCondensedType,
  DropdownItemType,
  DropdownPropsType,
  EllipsisBreadcrumbItemType,
  EllipsisPositionType,
  LinkBreadcrumbItemType,
  TargetType,
} from './hooks/types';
import useBreadcrumbEllipsis from './hooks/useBreadcrumbEllipsis';
import { toSafeTarget } from './hooks/helpers';

export type BreadcrumbItemBaseType = {
  /**
   * value: BreadcrumbItem 별 key 입니다.
   */
  value: string;
  /**
   * label: BreadcrumbItem 으로서 보여질 내용입니다.
   */
  label: string;
  /**
   * href: BreadcrumbItem 으로서 경로입니다.
   */
  href: string;
  /**
   * icon: BreadcrumbItem 의 label과 같이 쓸 icon 으로써 ReactElement 으로 가능합니다.
   */
  icon?: ReactNode;
  /**
   * iconPosition: BreadcrumbItem 의 label과 같이 쓸 icon 의 위치입니다.
   * left | right 중 가능하며, 기본값을 left 입니다.
   */
  iconPosition?: string;
  /**
   * target: href의 옵션 부분 처리를 위함. '_blank' | '_self' | '_parent' | '_top' 중에서 가능하며,
   * 기본값은 '_blank' 으로 하고 있습니다.
   */
  target?: string;
  /**
   * className: BreadcrumbItem 에 적용할 tailwindCSS 의 클래스 부분입니다.
   */
  className?: string;
  /**
   * disabled: Breadcrumb의 전체 비활성화 여부입니다.
   */
  disabled?: boolean;
  /**
   * isPage : 경로의 표기만을 위함 및 Breadcrumb의 item의 itemType 분기를 위함. 혹은 별도로 이동하지 않도록 하기 위한 부분으로
   * isPage: true -> BreadcrumbPage 가 되거나, false 로 BreadcrumbLink 처리 가능.
   */
  isPage?: boolean;
  /**
   * children : Ellipsis로 압축하는 것 뿐만 아니라, 경로 하나하나 별도로 자식이 있고 해당의 경로로 이동을 해야하는 경우(ex. JS 대시보드 경로)
   */
  children?: BreadcrumbItemBaseType[];
};

export type BreadcrumbProps = ComponentProps<'nav'> &
  VariantProps<typeof breadcrumbVariants> & {
    /**
     * items: BreadcrumbItem 목록입니다.
     */
    items: BreadcrumbItemBaseType[];
    /**
     * disabled: 비활성화 여부
     */
    disabled?: boolean;
    /**
     * enableDropdown: Ellipsis 처리가 된 이후에 Ellipsis로 숨겨진 경로를 보도록 하거나 children이 있는 Link의 자식 경로들을 DropdownMenu 비활성화 할 것인지 여부.
     */
    enableDropdown?: boolean;
    /**
     * maxItems: 최대 표시 아이템 수로서 화면상에 보여줄 아이템의 숫자입니다.
     */
    maxItems?: number;
    /**
     * ellipsisPosition: ellipsis(말줄임표, ...) 의 위치 입니다. 다만 maxItems 가 1 이하일 경우 무시됩니다.
     * maxItems 이 3개일 경우 => … / Category / Current (start)
     * maxItems 이 3개일 경우 => Home /  …  / Current (center)
     * maxItems 이 3개일 경우 => Home /  Category  / … (end)
     * maxItems 이 2개일 경우 =>  …  / Current (start)
     * maxItems 이 2개일 경우 =>  …  / Current (center)
     */
    // 첫 번째 + 마지막 N개
    ellipsisPosition?: EllipsisPositionType;
    /**
     * ellipsisIcon :
     */
    ellipsisIcon?: ReactElement;
    /**
     * separatorIcon :
     */
    separatorIcon?: ReactElement;
  } & DropdownPropsType;

// render
function RenderIconPosition(item: BreadcrumbCondensedType) {
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

function RenderLink(item: BreadcrumbCondensedType, classString: string, isLast: boolean) {
  return (
    <BreadcrumbLink
      aria-current={isLast ? ('page' as const) : undefined}
      aria-disabled={item?.disabled}
      tabIndex={item?.disabled ? -1 : 0}
      href={item.href}
      target={toSafeTarget(item?.target)}
      className={classString}
      onClick={
        item.isTrigger
          ? (e: MouseEvent) => {
              e.stopPropagation();
            }
          : undefined
      }>
      {RenderIconPosition(item)}
    </BreadcrumbLink>
  );
}

function RenderEllipsis(item: BreadcrumbCondensedType, classString: string) {
  return (
    <BreadcrumbEllipsis
      data-slot={'breadcrumb-ellipsis'}
      data-role={'dropdown-menu-trigger'}
      icon={item?.icon || null}
      className={classString}
    />
  );
}

function RenderDropdownMenu(
  item: LinkBreadcrumbItemType | EllipsisBreadcrumbItemType,
  trigger: ReactNode,
  disabledClass: string,
) {
  const handleItemSelect = (hiddenItems: BreadcrumbCondensedType[], option: OptionItem) => {
    const matchedItem = (hiddenItems || []).find((h) => h.value === option.value && h.label === option.label);

    if (matchedItem?.href) {
      if (matchedItem?.target) {
        window.open(matchedItem.href, matchedItem.target);
      }

      window.location.href = matchedItem.href;
    }
  };

  return (
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
      trigger={trigger}
      onItemSelect={(option: OptionItem) => handleItemSelect(item.hiddenItems ?? [], option)}
      className={disabledClass}
    />
  );
}

export const DEFAULT_TARGET: TargetType = '_self';
export const DEFAULT_ELLIPSIS_POSITION: EllipsisPositionType = 'center';
export const DEFAULT_MAX_ITEM = 3;

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
  const { wrapper, list, listItem, page, separator } = breadcrumbVariants({
    variant,
    size,
    disabled: disabled,
  });
  const commonDisabledClass = breadcrumbVariants({
    disabled: disabled,
  }).base();

  const { visibleItems } = useBreadcrumbEllipsis(items, maxItems, enableDropdown, ellipsisIcon, ellipsisPosition, {
    dropdownProps,
  });

  return (
    <BreadcrumbWrapper {...props} className={cn(wrapper(), commonDisabledClass)}>
      <BreadcrumbList className={cn(list(), className, commonDisabledClass)}>
        {visibleItems.map((item, idx) => {
          if (!item) return;

          const isLast = idx === visibleItems?.length - 1;
          const itemDisabled = Boolean(disabled || item?.disabled);
          const { base, link, ellipsis } = breadcrumbVariants({
            variant,
            size,
            isTrigger: item.isTrigger,
            disabled: itemDisabled,
          });

          return (
            <Fragment key={`${idx}-${item.label}`}>
              <BreadcrumbItem className={cn(listItem(), item.className, base())}>
                {item.itemType === 'page' && (
                  <BreadcrumbPage aria-current={isLast ? 'page' : undefined} className={cn(page(), base())}>
                    {RenderIconPosition(item)}
                  </BreadcrumbPage>
                )}
                {item.itemType === 'link' &&
                  (item.isTrigger
                    ? RenderDropdownMenu(item, RenderLink(item, cn(link(), base()), isLast), base())
                    : RenderLink(item, cn(link(), base()), isLast))}
                {item.itemType === 'ellipsis' &&
                  (item.isTrigger
                    ? RenderDropdownMenu(item, RenderEllipsis(item, cn(ellipsis(), base())), base())
                    : RenderEllipsis(item, cn(ellipsis(), base())))}
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
