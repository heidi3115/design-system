import { useMemo } from 'react';
import { BreadcrumbItemType, DEFAULT_MAX_ITEM, EllipsisPositionType } from '../Breadcrumb';

type UseBreadcrumbEllipsisResult = {
  visibleItems: BreadcrumbItemType[];
  ellipsisItem?: BreadcrumbItemType; // type: 'ellipsis'
};

/**
 * @param items 전체 BreadcrumbItem 배열
 * @param maxItems 최대 표시 개수 (예: 4)
 * @param ellipsisPosition 'start' | 'center' | 'end'
 */
export function useBreadcrumbEllipsis(
  items: BreadcrumbItemType[],
  maxItems: number = DEFAULT_MAX_ITEM,
  ellipsisPosition: EllipsisPositionType = 'center',
): UseBreadcrumbEllipsisResult {
  return useMemo(() => {
    if (!items) return { visibleItems: [] };

    const itemLength = items.length;

    if (itemLength <= maxItems) {
      return { visibleItems: items };
    }

    // ellipsis 아이템 생성
    const ellipsisItem = (hidden: BreadcrumbItemType[], pos: string) =>
      ({
        type: 'ellipsis',
        value: `ellipsis-${pos}`,
        label: 'More',
        isTrigger: true,
        hiddenItems: hidden,
      }) as BreadcrumbItemType;

    // const slicedItems = <T>(prevItems: T[], start: number, end?: number): T[] =>
    //   prevItems.slice(Math.max(0, start), end);

    const ellipsisHandlers = {
      start: () => {
        // const hidden = slicedItems(items, 1, itemLength - (maxItems - 1));
        const hidden = items.slice(1, itemLength - (maxItems - 1));

        // return [items[0], ellipsisItem(hidden, 'start'), ...slicedItems(items, itemLength, maxItems - 1)];
        return [items[0], ellipsisItem(hidden, 'start'), ...items.slice(itemLength, maxItems - 1)];
      },
      center: () => {
        const headCount = Math.ceil((maxItems - 1) / 2);
        const tailCount = Math.floor((maxItems - 1) / 2);
        // const hidden = slicedItems(items, headCount, itemLength - tailCount);
        const hidden = items.slice(headCount, itemLength - tailCount);

        return [
          // ...slicedItems(items, 0, headCount),
          ...items.slice(0, headCount),
          ellipsisItem(hidden, 'center'),
          // ...slicedItems(items, itemLength, tailCount),
          ...items.slice(itemLength, tailCount),
        ];
      },
      end: () => {
        // const hidden = slicedItems(items, maxItems - 1, itemLength - 1);
        const hidden = items.slice(maxItems - 1, itemLength - 1);

        // return [...slicedItems(items, 0, maxItems - 1), ellipsisItem(hidden, 'end'), items[itemLength - 1]];
        return [...items.slice(0, maxItems - 1), ellipsisItem(hidden, 'end'), items[itemLength - 1]];
      },
    };

    // ellipsisItem은 visibleItems 중 type: 'ellipsis' 인 것
    const visibleItems: BreadcrumbItemType[] = (
      itemLength <= maxItems ? items : (ellipsisHandlers[ellipsisPosition]?.() ?? items)
    ).filter((data): data is BreadcrumbItemType => !!data);
    const foundEllipsis = visibleItems.find((i: BreadcrumbItemType) => i.type === 'ellipsis');

    return { visibleItems, ellipsisItem: foundEllipsis };
  }, [items, maxItems, ellipsisPosition]);
}
