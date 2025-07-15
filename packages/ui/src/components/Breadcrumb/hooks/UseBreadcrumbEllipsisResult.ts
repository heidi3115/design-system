import { type ReactElement, useMemo } from 'react';
import type {
  BreadcrumbCondensedType,
  BreadcrumbItemBaseType,
  DropdownItemType,
  DropdownPropsType,
  EllipsisBreadcrumbItemType,
  EllipsisPositionType,
  LinkBreadcrumbItemType,
} from '../Breadcrumb';
import { DEFAULT_MAX_ITEM } from '../Breadcrumb';

type UseBreadcrumbEllipsisResult = {
  visibleItems: BreadcrumbCondensedType[];
};

/**
 * @param items 전체 BreadcrumbItem 배열
 * @param maxItems 최대 표시 개수 (예: 4)
 * @param enableDropdown 드롭다운 메뉴 활성화 여부 (ellipsis 등)
 * @param ellipsisIcon ellipsis(…)의 아이콘. 대체용 커스텀 아이콘(ReactElement) 사용 가능
 * @param ellipsisPosition 'start' | 'center' | 'end'
 * @param dropdownProps DropdownMenu에 전달할 dropdownProps
 */

const DEFAULT_ELLIPSIS_POSITION = 'center' as const;
const DEFAULT_TARGET = '_blank' as const;
const SINGLE_ITEM_THRESHOLD = 1;
const BOOKEND_THRESHOLD = 2;

function useBreadcrumbEllipsis(
  items: BreadcrumbItemBaseType[],
  maxItems: number = DEFAULT_MAX_ITEM,
  enableDropdown: boolean,
  ellipsisIcon: ReactElement,
  ellipsisPosition: EllipsisPositionType = DEFAULT_ELLIPSIS_POSITION,
  dropdownProps?: DropdownPropsType | undefined,
): UseBreadcrumbEllipsisResult {
  // helpers
  function toSafeTarget(target: string | undefined): '_blank' | '_self' | '_parent' | '_top' {
    switch (target) {
      case '_blank':
      case '_self':
      case '_parent':
      case '_top':
        return target;
      default:
        return DEFAULT_TARGET;
    }
  }

  function toSafeIconPosition(position: string | undefined): 'left' | 'right' {
    return position === 'right' ? 'right' : 'left';
  }

  function isBreadcrumbCondensedType(item: BreadcrumbCondensedType | undefined): item is BreadcrumbCondensedType {
    return item !== undefined && item !== null;
  }

  function createDropdownOptions(hiddenItems?: BreadcrumbItemBaseType[]): DropdownItemType[] {
    return hiddenItems
      ? hiddenItems.map((item) => ({
          type: 'item',
          value: item.value,
          label: item.label,
          disabled: item.disabled ?? false,
        }))
      : [];
  }

  return useMemo(() => {
    if (!items || items.length === 0) return { visibleItems: [] };

    // 기본적으로 page 처리 및 마지막 경로가 isPage 처리 아닌 경우 link 로 기본 처리.
    const isExplicitlyLink = (item: BreadcrumbItemBaseType, isLast: boolean): boolean =>
      isLast && item?.isPage !== true;
    const hasChildren = (children?: BreadcrumbItemBaseType[]): boolean =>
      Array.isArray(children) && children.length > 0;

    const breadcrumbArr: BreadcrumbCondensedType[] = items.map(
      (item: BreadcrumbItemBaseType, idx: number): BreadcrumbCondensedType => {
        const isLast = idx === items.length - 1;
        const itemType = isExplicitlyLink(item, isLast) ? 'link' : item?.isPage ? 'page' : 'link';
        const childrenArray = hasChildren(item.children)
          ? item.children!.map(
              (child: BreadcrumbItemBaseType): BreadcrumbItemBaseType => ({
                ...child,
                iconPosition: toSafeIconPosition(child.iconPosition),
                target: toSafeTarget(child.target),
              }),
            )
          : undefined;

        return itemType === 'page'
          ? {
              ...item,
              itemType: 'page',
              isTrigger: false,
              iconPosition: toSafeIconPosition(item.iconPosition),
              target: toSafeTarget(item?.target),
            }
          : {
              ...item,
              itemType: 'link',
              isTrigger: !enableDropdown ? false : hasChildren(item.children),
              iconPosition: toSafeIconPosition(item.iconPosition),
              target: toSafeTarget(item?.target),
              dropdownOptions: hasChildren(item.children) ? createDropdownOptions(childrenArray) : undefined,
              hiddenItems:
                hasChildren(item.children) && childrenArray
                  ? childrenArray.map(
                      (child: BreadcrumbItemBaseType): BreadcrumbCondensedType => ({
                        ...child,
                        itemType: child.isPage ? 'page' : 'link',
                        isTrigger: !enableDropdown ? false : !child.isPage && hasChildren(child.children),
                      }),
                    )
                  : undefined,
              dropdownProps: !item?.isPage && hasChildren(item.children) ? dropdownProps?.dropdownProps : undefined,
            };
      },
    );
    const itemLength = breadcrumbArr.length;

    // Breadcrumb item 중 dropdown 관련 처리
    function createLinkItem(
      hiddenItems: BreadcrumbCondensedType[],
      link: BreadcrumbCondensedType,
    ): LinkBreadcrumbItemType {
      return {
        ...link,
        itemType: 'link',
        isTrigger: !enableDropdown ? false : hiddenItems.length > 0 || link.isTrigger,
        hiddenItems,
        dropdownOptions: createDropdownOptions(hiddenItems),
        ...dropdownProps,
      };
    }

    function createEllipsisItem(
      hidden: BreadcrumbCondensedType[],
      pos: EllipsisPositionType,
      icon?: ReactElement,
    ): EllipsisBreadcrumbItemType {
      const baseProps = {
        value: `ellipsis-${pos}`,
        label: '더보기',
        href: '',
        icon: icon,
      };

      return enableDropdown
        ? {
            ...baseProps,
            itemType: 'ellipsis',
            isTrigger: enableDropdown,
            hiddenItems: hidden,
            dropdownOptions: createDropdownOptions(hidden),
            ...dropdownProps,
          }
        : {
            ...baseProps,
            itemType: 'ellipsis',
            isTrigger: false,
          };
    }

    const firstItem = breadcrumbArr[0];
    const secondItem = breadcrumbArr[1];

    function generalEllipsisStrategy() {
      const ellipsisHandlers = {
        start: () => {
          const tailCount = maxItems - 2;
          const hiddenStart = 1;
          const hiddenEnd = itemLength - tailCount;
          const hidden = hiddenEnd > hiddenStart ? breadcrumbArr.slice(hiddenStart, hiddenEnd) : [];

          return [
            firstItem,
            createEllipsisItem(hidden, 'start', ellipsisIcon),
            ...breadcrumbArr.slice(hiddenEnd, itemLength),
          ];
        },
        center: () => {
          const headCount = Math.ceil((maxItems - 1) / 2);
          const tailCount = Math.floor((maxItems - 1) / 2);
          const hiddenEnd = itemLength - tailCount;
          const hidden = hiddenEnd > headCount ? breadcrumbArr.slice(headCount, hiddenEnd) : [];

          return [
            ...breadcrumbArr.slice(0, headCount),
            createEllipsisItem(hidden, 'center', ellipsisIcon),
            ...breadcrumbArr.slice(hiddenEnd, itemLength),
          ];
        },
        end: () => {
          const count = maxItems - 2;
          const hiddenEnd = itemLength - 1;
          const hidden = hiddenEnd > count ? breadcrumbArr.slice(count, hiddenEnd) : [];

          return [
            ...breadcrumbArr.slice(0, count),
            createEllipsisItem(hidden, 'end', ellipsisIcon),
            breadcrumbArr[itemLength - 1],
          ];
        },
      };

      return ellipsisHandlers[ellipsisPosition]?.() ?? breadcrumbArr;
    }

    const selectDisplayStrategy = (maxNum: number, length: number) => {
      if (length <= maxNum) {
        return breadcrumbArr;
      }

      // maxItems에 따른 전략 선택
      if (maxItems <= SINGLE_ITEM_THRESHOLD) {
        // 1개일 때 : 마지막 요소를 trigger 삼아 목록 보기
        return firstItem ? [createLinkItem(breadcrumbArr, firstItem)] : [breadcrumbArr[0]];
      } else if (maxItems <= BOOKEND_THRESHOLD) {
        // 2개일 때 : 첫번째 요소 + 마지막 요소(trigger)
        return firstItem && secondItem
          ? [firstItem, createLinkItem(breadcrumbArr.slice(1, itemLength), secondItem)]
          : [firstItem, secondItem];
      } else {
        // 3개 이상 : ellipsis 처리.
        return generalEllipsisStrategy();
      }
    };

    const resultItems = selectDisplayStrategy(maxItems, itemLength).filter(isBreadcrumbCondensedType);

    return { visibleItems: resultItems };
  }, [items, maxItems, ellipsisIcon, ellipsisPosition, enableDropdown, dropdownProps]);
}

export default useBreadcrumbEllipsis;
