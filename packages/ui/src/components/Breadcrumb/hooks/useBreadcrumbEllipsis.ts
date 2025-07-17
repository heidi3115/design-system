import { type ReactElement, useMemo } from 'react';
import { type BreadcrumbItemBaseType, DEFAULT_ELLIPSIS_POSITION, DEFAULT_MAX_ITEM } from '../Breadcrumb';
import type { BreadcrumbCondensedType, DropdownPropsType, EllipsisPositionType } from './types';
import { createCondensedItems } from './createCondensedItems';
import { getVisibleItemsWithEllipsis } from './getVisibleItemsWithEllipsis';

type UseBreadcrumbEllipsisResult = {
  visibleItems: BreadcrumbCondensedType[];
};

/**
 * Breadcrumb 데이터 가공 Hook
 */
function useBreadcrumbEllipsis(
  items: BreadcrumbItemBaseType[],
  maxItems: number = DEFAULT_MAX_ITEM,
  enableDropdown: boolean,
  ellipsisIcon: ReactElement,
  ellipsisPosition: EllipsisPositionType = DEFAULT_ELLIPSIS_POSITION,
  dropdownProps?: DropdownPropsType,
): UseBreadcrumbEllipsisResult {
  const visibleItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    // Step 1: 모든 items을 BreadcrumbCondensedType 으로 정규화
    const condensedItems: BreadcrumbCondensedType[] = createCondensedItems({
      items,
      enableDropdown,
      dropdownProps,
    });

    // Step 2: maxItems, ellipsisPosition에 따라 visibleItems 계산
    return getVisibleItemsWithEllipsis({
      items: condensedItems,
      maxItems,
      ellipsisPosition,
      ellipsisIcon,
      enableDropdown,
      dropdownProps,
    });
  }, [items, maxItems, ellipsisIcon, ellipsisPosition, enableDropdown, dropdownProps]);

  return { visibleItems };
}

export default useBreadcrumbEllipsis;
