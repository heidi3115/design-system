import { toSafeTypeValue } from '@common/ui/components/Breadcrumb/helpers';
import { type EllipsisPositionType, VALID_ELLIPSIS_POSITIONS } from '@common/ui/components/Breadcrumb/Breadcrumb';

/**
 *
 * 배열을 지정된 최대 길이(maxItems)로 축약(condensed)하여, 중간에 'ellipsis' 를 삽입하는 형태로 반환합니다.
 *
 * @template T 배열 요소 타입
 * @param items            원본 배열
 * @param maxItems         결과(condensedItems)에 포함될 최대 요소 갯수 ('ellipsis' 포함)
 * @param ellipsisPosition 'start' | 'center' | 'end' (ellipsis(...)의 위치)
 * @returns { condensedItems, ellipsisItems }
 *
 * @example
 * const { condensedItems, ellipsisItems } = createCondensedArray({
 *       items: [{ key: '1' }, { key: '2', children: [] }, { key: '3' }, { key: '4' }, { key: '5' }],
 *       maxItems: 4,
 *       ellipsisPosition: 'end',
 *     });
 * // condensedItems: [ { key: '1', }, { key: '2', children: [], }, 'ellipsis', { key: '5', }];
 * // ellipsisItems: [ { key: '3', }, { key: '4', }];
 *
 * @remarks
 * ## 분기별 동작 및 주의사항
 * - items가 undefined/null 이거나 빈 배열이면 condensedItems는 빈 배열([])로 반환됩니다.
 * - items의 길이가 maxItems 이하이면 축약하지 않고 원본 배열을 그대로 반환하며, ellipsis는 포함되지 않습니다.
 * - maxItems가 3 이상일 때만 positionMap에 따라 head/tail 개수를 조정합니다.
 * - maxItems가 2 이하이면 head/tail을 각각 1로 고정하며, 결과가 maxItem이 3인 것처럼 반환이 됩니다.
 *   그러므호, UI상 의미가 약해질 수 있으니 최소값(3 이상) 사용을 권장합니다.
 * - ellipsis는 항상 head와 tail 사이에 삽입됩니다.
 * - ellipsisItems는 condensedItems 에서 ellipsis로 대체된 실제 아이템 목록입니다. 필요하지 않으면 사용하지 않아도 됩니다.
 * - ellipsisPosition 값은 타입으로 제한되지만, positionMap에 없는 값이 들어오지 않도록 주의하세요.
 */
type CondensedArrayResult<T> = { condensedItems: Array<T | 'ellipsis'>; ellipsisItems?: Array<T> };

const DEFAULT_ELLIPSIS_POSITION = 'center' as const;

export function createCondensedArray<T>({
  items,
  maxItems,
  ellipsisPosition = 'center',
}: {
  items: T[];
  maxItems?: number | null;
  ellipsisPosition: EllipsisPositionType;
}): CondensedArrayResult<T> {
  const itemsLength = items?.length;
  if (!items || itemsLength === 0) return { condensedItems: [] };
  const maxNum = maxItems ? Number(maxItems) : 0;
  if (maxItems === null || maxNum === 0 || itemsLength <= maxNum) return { condensedItems: items };

  // if (maxItems <= 2) {
  //   const first = maxItems === 2 ? items[0] : undefined;
  //   const last = 'ellipsis' as const;
  //   const ellipsisItems = items.slice(1, itemsLength);
  //   const condensedItems = [first, last].filter((item): item is T | 'ellipsis' => !!item);
  //
  //   return { condensedItems, ellipsisItems };
  // }

  const positionMap: Record<EllipsisPositionType, [number, number]> = {
    start: [1, maxNum - 2],
    center: [Math.ceil((maxNum - 1) / 2), Math.floor((maxNum - 1) / 2)],
    end: [maxNum - 2, 1],
  };

  const position = toSafeTypeValue(ellipsisPosition, VALID_ELLIPSIS_POSITIONS)
    ? ellipsisPosition
    : DEFAULT_ELLIPSIS_POSITION;
  const [head, tail] = maxNum >= 3 ? positionMap[position] : [1, 1];
  const slicedHead = items.slice(0, head ?? 0);
  const slicedTail = items.slice(itemsLength - (tail ?? 0));
  const ellipsisItems = items.slice(head, itemsLength - (tail ?? 0));
  const condensedItems = [...slicedHead, 'ellipsis' as const, ...slicedTail].filter(
    (item): item is T | 'ellipsis' => !!item,
  );

  return { condensedItems, ellipsisItems };
}
