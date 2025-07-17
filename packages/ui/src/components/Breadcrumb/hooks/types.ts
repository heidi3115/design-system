import type { ComponentProps } from 'react';
import { type BreadcrumbItemBaseType, DropdownMenuContent } from '@common/ui';
import type { OptionItem } from '@common/ui/components/DropdownMenu/DropdownMenu';

export const VALID_TARGETS = ['_blank', '_self', '_parent', '_top'] as const;
export type TargetType = (typeof VALID_TARGETS)[number];

export const VALID_ELLIPSIS_POSITIONS = ['start', 'center', 'end'] as const;
export type EllipsisPositionType = (typeof VALID_ELLIPSIS_POSITIONS)[number];

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
