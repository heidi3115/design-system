import type { ReactElement } from 'react';
import type {
  BreadcrumbCondensedType,
  DropdownPropsType,
  EllipsisBreadcrumbItemType,
  EllipsisPositionType,
} from './types';
import { extractDropdownMeta } from './createCondensedItems';

function getEllipsisPosition({
  ellipsisPosition,
  maxItems,
}: {
  ellipsisPosition: EllipsisPositionType;
  maxItems: number;
}) {
  return (
    {
      start: [1, maxItems - 2],
      center: [Math.ceil((maxItems - 1) / 2), Math.floor((maxItems - 1) / 2)],
      end: [maxItems - 2, 1],
    } as const
  )[ellipsisPosition];
}

function createEllipsisItem({
  hiddenItems,
  ellipsisPosition,
  ellipsisIcon,
  enableDropdown,
  dropdownProps,
}: {
  hiddenItems: BreadcrumbCondensedType[];
  ellipsisPosition: EllipsisPositionType;
  ellipsisIcon: ReactElement;
  enableDropdown: boolean;
  dropdownProps?: DropdownPropsType;
}): EllipsisBreadcrumbItemType {
  const base = {
    value: `ellipsis-${ellipsisPosition}`,
    label: '더보기',
    href: '',
    icon: ellipsisIcon,
    itemType: 'ellipsis' as const,
    isTrigger: enableDropdown,
  };

  const dropdown = extractDropdownMeta({ children: hiddenItems, enableDropdown, dropdownProps });

  return enableDropdown ? { ...base, ...dropdown } : base;
}

function resolveVisibleItems({
  items,
  head,
  tail,
  ellipsis,
}: {
  items: BreadcrumbCondensedType[];
  head?: number;
  tail?: number;
  ellipsis?: BreadcrumbCondensedType;
}): BreadcrumbCondensedType[] {
  const slicedHead = items.slice(0, head ?? 0);
  const slicedTail = items.slice(items.length - (tail ?? 0));

  return [...slicedHead, ellipsis, ...slicedTail].filter(Boolean) as BreadcrumbCondensedType[];
}

export function getVisibleItemsWithEllipsis({
  items,
  maxItems,
  ellipsisPosition,
  ellipsisIcon,
  enableDropdown,
  dropdownProps,
}: {
  items: BreadcrumbCondensedType[];
  maxItems: number;
  ellipsisPosition: EllipsisPositionType;
  ellipsisIcon: ReactElement;
  enableDropdown: boolean;
  dropdownProps?: DropdownPropsType;
}): BreadcrumbCondensedType[] {
  const itemLength = items.length;
  if (itemLength <= maxItems) return items;

  const last = items[itemLength - 1];

  if (maxItems <= 2) {
    const first = maxItems === 2 ? items[0] : undefined;
    const dropdown = extractDropdownMeta({
      children: items.slice(Math.max(maxItems - 2, 0), itemLength - 1),
      enableDropdown,
      dropdownProps,
    });

    // 마지막 요소는 기본적으로 page 처리하나, isPage 지정이 안되어있는 경우는 link 처리하면서 경로를 link에 저장 처리.
    return [
      first,
      last?.isPage
        ? { ...last, itemType: 'page', isTrigger: false }
        : {
            ...last,
            itemType: 'link',
            isTrigger: enableDropdown,
            ...dropdown,
          },
    ].filter((item): item is BreadcrumbCondensedType => !!item);
  }

  const [head, tail] = getEllipsisPosition({ ellipsisPosition, maxItems });
  const hiddenItems = items.slice(head, itemLength - tail);
  const ellipsisItem = createEllipsisItem({
    hiddenItems,
    ellipsisPosition,
    ellipsisIcon,
    enableDropdown,
    dropdownProps,
  });

  return resolveVisibleItems({ items, head, tail, ellipsis: ellipsisItem });
}
