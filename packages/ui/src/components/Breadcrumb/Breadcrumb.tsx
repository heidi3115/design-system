'use client';

import { type ComponentProps, type MouseEvent, type ReactNode } from 'react';
import { BreadcrumbList, breadcrumbVariants, BreadcrumbWrapper, DropdownMenuContent } from '@common/ui';
import type { VariantProps } from 'tailwind-variants';
import type { DropdownOption, OptionItem } from '@common/ui/components/DropdownMenu/DropdownMenu';
import { cn } from '@common/ui/lib/utils';

type BreadcrumbItemBase = {
  value: string;
  label: string;
  href?: string;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
};

export type LinkBreadcrumbItemType = BreadcrumbItemBase & {
  type: 'link';
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export type PageBreadcrumbItemType = BreadcrumbItemBase & {
  type: 'page';
  isCurrent?: boolean;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
};

type dropdownOptionItemType = Pick<OptionItem, 'type'>;

export type DropdownBreadcrumbItemType = BreadcrumbItemBase & {
  type: 'dropdown';
  dropdownOptions: DropdownOption[];
  onDropdownSelect?: (option: dropdownOptionItemType) => void | undefined;
  dropDownProps?: {
    className?: string;
    itemClassName?: string;
    size?: number;
  } & Pick<ComponentProps<typeof DropdownMenuContent>, 'align' | 'side' | 'sideOffset' | 'alignOffset'>;
};

export type EllipsisBreadcrumbItemType = BreadcrumbItemBase & {
  type: 'ellipsis';
  icon?: ReactNode;
  isTrigger?: boolean;
  hiddenItems?: DropdownBreadcrumbItemType[];
  onClick?: (
    hiddenItems: DropdownBreadcrumbItemType[],
    event: MouseEvent<HTMLSpanElement> | undefined,
  ) => void | undefined;
};

export type BreadcrumbItemType =
  | LinkBreadcrumbItemType
  | PageBreadcrumbItemType
  | DropdownBreadcrumbItemType
  | EllipsisBreadcrumbItemType;

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
     * maxItems: 최대 표시 아이템 수
     */
    maxItems?: number;
    /**
     * responsive: 반응형 여부
     */
    responsive?: boolean;
    /**
     * ellipsisPosition:
     */
    // 첫 번째 + 마지막 N개
    ellipsisPosition?: EllipsisPositionType;
    /**
     * onItemClick: 아이템 클릭 시 콜백
     */
    onItemClick?: (item: BreadcrumbItemType, index: number) => void;
    /**
     * onEllipsisClick: Ellipsis 클릭 시 콜백
     */
    onEllipsisClick?: (item: BreadcrumbItemType) => void;
  };
export const DEFAULT_MAX_ITEM = 5;

function Breadcrumb({
  // items,
  variant,
  size,
  disabled,
  // maxItems = DEFAULT_MAX_ITEM,
  // ellipsisPosition = 'center',
  // ...props
}: BreadcrumbProps) {
  // const { wrapper, list, link, page, separator, ellipsis, common } = breadcrumbVariants({ variant, size, disabled });
  const { wrapper } = breadcrumbVariants({ variant, size, disabled });

  // const { visibleItems, ellipsisItem } = useBreadcrumbEllipsis(items, maxItems, ellipsisPosition);

  return (
    <BreadcrumbWrapper className={cn(wrapper)}>
      <BreadcrumbList className={cn()}></BreadcrumbList>
    </BreadcrumbWrapper>
  );
}

export default Breadcrumb;
