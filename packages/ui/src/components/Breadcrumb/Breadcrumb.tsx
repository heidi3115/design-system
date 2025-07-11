'use client';

import { type ComponentProps, Fragment, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { cn } from '@common/ui/lib/utils';
import { BreadcrumbList, breadcrumbVariants, BreadcrumbWrapper, DropdownMenuContent } from '@common/ui';
import { ChevronRightIcon } from '@common/ui/icons';
import useBreadcrumbEllipsis from './hooks/UseBreadcrumbEllipsisResult';
import RenderBreadcrumbItem from './RenderBreadcrumbItem';
import { type OptionItem } from '../DropdownMenu/DropdownMenu';

type BreadcrumbItemBase = {
  value: string;
  label: string;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  isPage?: boolean;
};

export type DropDownItemType = Omit<OptionItem, 'type'> & { type: 'item' };

export type DropdownBreadcrumbItemType = {
  dropdownOptions: DropDownItemType[];
  onItemSelect?: (item: DropDownItemType) => void;
  dropDownProps?: {
    className?: string;
    itemClassName?: string;
    size?: number;
  } & Pick<ComponentProps<typeof DropdownMenuContent>, 'align' | 'side' | 'sideOffset' | 'alignOffset'>;
};

type EllipsisBreadcrumbItemBase = BreadcrumbItemBase & {
  itemType: 'ellipsis';
  icon?: ReactNode;
  hiddenItems?: DropdownBreadcrumbItemType[];
  onClick?: (
    hiddenItems: DropdownBreadcrumbItemType[],
    event: MouseEvent<HTMLSpanElement | undefined> | undefined,
  ) => void;
};

export type EllipsisBreadcrumbItemType =
  | ({ isTrigger: true } & DropdownBreadcrumbItemType & EllipsisBreadcrumbItemBase)
  | ({ isTrigger: false } & EllipsisBreadcrumbItemBase);

export type LinkBreadcrumbItemType =
  | ({ itemType: 'link'; isTrigger: true } & DropdownBreadcrumbItemType & BreadcrumbItemBase)
  | ({
      itemType: 'link';
      isTrigger: false;
    } & BreadcrumbItemBase);

export type PageBreadcrumbItemType = { itemType: 'page' } & BreadcrumbItemBase;

export type BreadcrumbItemType =
  | BreadcrumbItemBase
  | EllipsisBreadcrumbItemType
  | LinkBreadcrumbItemType
  | PageBreadcrumbItemType;

/**
 * EllipsisPositionType 의 예시
 * start: 1 + 마지막 3개 => Home / … / Products / Category / Current
 * center: 앞 2개 + 뒤 2개 => Home / Products / … / Category / Current
 * end: 앞 3개 + 마지막 1개 => Home / Products / Category / … / Current
 */
export type EllipsisPositionType = 'start' | 'center' | 'end';

export type BreadcrumbProps = ComponentProps<'nav'> &
  VariantProps<typeof breadcrumbVariants> & {
    /**
     * items: BreadcrumbIt록em 목록
     */
    items: BreadcrumbItemType[];
    /**
     * disabled: 비활성화 여부
     */
    disabled?: boolean;
    // /**
    //  * responsive: 반응형 여부
    //  */
    // responsive?: boolean;
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
  };

export const DEFAULT_MAX_ITEM = 3;

function Breadcrumb({
  items,
  variant = 'default',
  size = 'medium',
  disabled = false,
  // responsive = false,
  maxItems = DEFAULT_MAX_ITEM,
  ellipsisPosition = 'center',
  // ellipsisIcon = <MoreHorizontalIcon />,
  separatorIcon = <ChevronRightIcon />,
}: BreadcrumbProps) {
  const { wrapper, list } = breadcrumbVariants({
    // link, page, separator, ellipsis
    variant,
    size,
  });
  const { base } = breadcrumbVariants({ disabled });
  const disabledClass = base() || '';

  // const { visibleItems, ellipsisItem } = useBreadcrumbEllipsis(items, maxItems, ellipsisPosition);
  const { visibleItems } = useBreadcrumbEllipsis(items, maxItems, ellipsisPosition); // ellipsisIcon

  return (
    <BreadcrumbWrapper className={cn(wrapper())}>
      <BreadcrumbList className={cn(list())}>
        {visibleItems.map((item: BreadcrumbItemType, idx: number) => (
          <Fragment key={`${idx}-${item.label}`}>
            <RenderBreadcrumbItem
              item={item}
              isLast={idx === visibleItems?.length - 1}
              variant={variant}
              size={size}
              disabledClass={disabledClass}
              separatorIcon={separatorIcon}
            />
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
}

export default Breadcrumb;
