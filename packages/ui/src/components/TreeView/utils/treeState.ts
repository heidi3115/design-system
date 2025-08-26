import type { BaseTreeNodeProps } from '../TreeItem';

/**
 * * 트리 관련 유틸리티 함수들 중에서 트리 및 노드의 상태 검증 및 관리 관련 함수들입니다.
 */

/**
 * 트리 노드가 리프(leaf) 노드인지 확인합니다.
 * @param node 트리 노드
 * @returns 자식이 없으면 true, 있으면 false
 */
export const isLeafNode = <T>(node: BaseTreeNodeProps<T> | undefined) => {
  return !!node && (!Array.isArray(node.children) || node.children.length === 0);
};

/**
 * 트리 노드가 안전하게 사용 가능한지 확인합니다.
 * @param treeNode 트리 노드
 * @returns id와 name이 모두 존재하면 true
 */
export const isSafeNode = <T>(treeNode: BaseTreeNodeProps<T> | undefined): treeNode is BaseTreeNodeProps<T> =>
  !!treeNode && Boolean(treeNode.id) && Boolean(treeNode.name);

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
