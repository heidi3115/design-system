import type { MatchModeType } from '../hooks';
import type { BaseTreeNodeProps } from '../TreeItem';

/**
 * * 트리 관련 유틸리티 함수들 중에서 트리 및 노드의 상태 검증 및 관리 관련 함수들입니다.
 */

/**
 * 트리 노드가 리프(leaf) 노드인지 확인합니다.
 * @param node 트리 노드
 * @returns 자식이 없으면 true, 있으면 false, 노드가 undefined면 false
 */
export const isLeafNode = <T>(node: BaseTreeNodeProps<T> | undefined) => {
  return !!node && (!Array.isArray(node.children) || node.children.length === 0);
};

/**
 * 트리 노드가 안전하게 사용 가능한지 확인합니다.
 * @param treeNode 트리 노드
 * @returns id와 name이 모두 존재하면 true (타입 가드 역할)
 */
export const isSafeNode = <T>(treeNode: BaseTreeNodeProps<T> | undefined): treeNode is BaseTreeNodeProps<T> =>
  !!treeNode && Boolean(treeNode.id) && Boolean(treeNode.name);

/**
 * 트리 노드에서 동적 필드 안전하게 가져오기
 * @param node 트리 노드 객체
 * @param key 동적으로 접근할 필드명
 */
export function getNodeField<T>(node: BaseTreeNodeProps<T>, key: string): unknown {
  return (node as Record<string, unknown>)[key];
}

/**
 * 주어진 값이 검색 키워드와 매칭되는지 확인
 * 다양한 매칭 모드와 대소문자 구분 옵션을 지원하는 유연한 검색 함수입니다.
 * @param value - 검색 대상 값 (문자열이 아닌 경우 false 반환)
 * @param keyword - 검색할 키워드
 * @param caseSensitive - 대소문자 구분 여부
 * @param matchMode - 매칭 모드 ('exact' | 'startsWith' | 'contains')
 * @returns 매칭되면 true, 그렇지 않으면 false
 */
export function isMatched(value: unknown, keyword: string, caseSensitive: boolean, matchMode: MatchModeType): boolean {
  if (typeof value !== 'string' || !keyword) return false;
  const source = caseSensitive ? value : value.toLowerCase();
  const target = caseSensitive ? keyword : keyword.toLowerCase();

  switch (matchMode) {
    case 'exact':
      return source === target;
    case 'startsWith':
      return source.startsWith(target);
    default:
      return source.includes(target);
  }
}

/**
 * 두 Set의 차이(prevSet 에서 제거된 값, nextSet 에서 추가된 값)를 계산합니다.
 * @param prevSet 이전 Set
 * @param nextSet 다음 Set
 * @returns { removed, added }
 *   - removed: prevSet 에는 있었지만 nextSet 에는 없는 값들의 배열
 *   - added: nextSet 에는 있지만 prevSet 에는 없었던 값들의 배열
 */
export const getNodesDifferences = (
  prevSet: Set<string>,
  nextSet: Set<string>,
): {
  removed: string[];
  added: string[];
} => {
  const prev = prevSet ?? new Set<string>();
  const next = nextSet ?? new Set<string>();

  const removed = Array.from(prev).filter((x) => !next.has(x));
  const added = Array.from(next).filter((x) => !prev.has(x));

  return { removed, added };
};
