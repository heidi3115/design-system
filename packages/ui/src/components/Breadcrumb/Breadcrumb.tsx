'use client';

import { type ComponentProps, Fragment, type ReactElement, type ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { cn } from '@common/ui/lib/utils';
import { BreadcrumbList, breadcrumbVariants, BreadcrumbWrapper, DropdownMenuContent } from '@common/ui';
import { ChevronRightIcon, MoreHorizontalFilledIcon } from '@common/ui/icons';
import { type OptionItem } from '../DropdownMenu/DropdownMenu';
import RenderBreadcrumbItem from './RenderBreadcrumbItem';
import useBreadcrumbEllipsis from '@common/ui/components/Breadcrumb/hooks/UseBreadcrumbEllipsisResult';

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

export type DropdownItemType = Omit<OptionItem, 'type'> & { type: 'item' };

export type DropdownListType = {
  hiddenItems?: BreadcrumbCondensedType[];
  dropdownOptions?: DropdownItemType[];
  onItemSelect?: (item: OptionItem) => void;
} & DropdownPropsType;

export type EllipsisBreadcrumbItemType = BreadcrumbItemBaseType & {
  itemType: 'ellipsis';
  isTrigger: boolean;
} & DropdownListType;

export type LinkBreadcrumbItemType = BreadcrumbItemBaseType & {
  itemType: 'link';
  isTrigger: boolean;
} & DropdownListType;

export type PageBreadcrumbItemType = BreadcrumbItemBaseType & {
  itemType: 'page';
  isTrigger: boolean;
};

export type BreadcrumbCondensedType = PageBreadcrumbItemType | LinkBreadcrumbItemType | EllipsisBreadcrumbItemType;

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

export const DEFAULT_MAX_ITEM = 3;

function Breadcrumb({
  items = [],
  variant = 'primary',
  size = 'small',
  disabled = false,
  enableDropdown = true,
  maxItems = DEFAULT_MAX_ITEM,
  ellipsisPosition = 'center',
  ellipsisIcon = <MoreHorizontalFilledIcon />,
  separatorIcon = <ChevronRightIcon />,
  dropdownProps,
}: BreadcrumbProps) {
  const { base, wrapper, list } = breadcrumbVariants({
    variant,
    size,
    disabled,
  });

  const { visibleItems } = useBreadcrumbEllipsis(items, maxItems, enableDropdown, ellipsisIcon, ellipsisPosition, {
    dropdownProps,
  });

  return (
    <BreadcrumbWrapper className={cn(wrapper(), base())}>
      <BreadcrumbList className={cn(list(), base())}>
        {visibleItems.map((item, idx) => (
          <Fragment key={`${idx}-${item.label}`}>
            <RenderBreadcrumbItem
              item={item}
              isLast={idx === visibleItems?.length - 1}
              variant={variant}
              size={size}
              disabled={disabled}
              separatorIcon={separatorIcon}
            />
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
}

export default Breadcrumb;
