import { useMemo } from 'react';
import { type BreadcrumbItemType, DEFAULT_MAX_ITEM, type EllipsisPositionType } from '../Breadcrumb';

type UseBreadcrumbEllipsisResult = {
  visibleItems: BreadcrumbItemType[];
  ellipsisItem?: BreadcrumbItemType; // type: 'ellipsis'
};

/**
 * @param items 전체 BreadcrumbItem 배열
 * @param maxItems 최대 표시 개수 (예: 4)
 * @param ellipsisPosition 'start' | 'center' | 'end'
 *
 */
// @param ellipsisIcon 커스텀 할 BreadcrumbEllipsis 의 ellipsisIcon
function useBreadcrumbEllipsis(
  items: BreadcrumbItemType[],
  maxItems: number = DEFAULT_MAX_ITEM,
  ellipsisPosition: EllipsisPositionType = 'center',
  // ellipsisIcon: ReactNode,
): UseBreadcrumbEllipsisResult {
  return useMemo(() => {
    if (!items) return { visibleItems: [] };

    const itemLength = items.length;

    if (itemLength <= maxItems) {
      return { visibleItems: items };
    }

    // ellipsis 아이템 생성
    // const ellipsisItem = (hidden: BreadcrumbItemType[], pos: string) =>
    //   ({
    //     itemType: 'ellipsis',
    //     value: `ellipsis-${pos}`,
    //     label: '더보기',
    //     icon: ellipsisIcon,
    //     isTrigger: true,
    //     hiddenItems: hidden,
    //   }) as BreadcrumbItemType;

    const ellipsisHandlers = {
      start: () => {
        // const hidden = items.slice(1, itemLength - (maxItems - 1));

        return [
          items[0],
          // ellipsisItem(hidden, 'start'),
          ...items.slice(itemLength, maxItems - 1),
        ];
      },
      center: () => {
        const headCount = Math.ceil((maxItems - 1) / 2);
        const tailCount = Math.floor((maxItems - 1) / 2);
        // const hidden = items.slice(headCount, itemLength - tailCount);

        return [
          ...items.slice(0, headCount),
          // ellipsisItem(hidden, 'center'),
          ...items.slice(itemLength, tailCount),
        ];
      },
      end: () => {
        // const hidden = items.slice(maxItems - 1, itemLength - 1);

        return [
          ...items.slice(0, maxItems - 1),
          // ellipsisItem(hidden, 'end'),
          items[itemLength - 1],
        ];
      },
    };

    // ellipsisItem은 visibleItems 중 type: 'ellipsis' 인 것
    const visibleItems: BreadcrumbItemType[] = (
      itemLength <= maxItems ? items : (ellipsisHandlers[ellipsisPosition]?.() ?? items)
    ).filter((data): data is BreadcrumbItemType => !!data);
    // const foundEllipsis = visibleItems.find((i: BreadcrumbItemType) => i?.itemType === 'ellipsis');

    // return { visibleItems, ellipsisItem: foundEllipsis };
    return { visibleItems, ellipsisItem: undefined };
  }, [items, maxItems, ellipsisPosition]); // ellipsisIcon
}

export default useBreadcrumbEllipsis;
