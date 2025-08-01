import type { BaseTreeNodeProps } from './TreeItem';

/**
 * 트리 관련 유틸리티 함수들
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
 * 트리 데이터를 평면화하여 Map 으로 변환
 * @param nodes 트리 노드 배열
 * @returns 노드 ID를 키로 하는 Map
 */
export const flattenTree = (nodes: BaseTreeNodeProps[]): Map<string, BaseTreeNodeProps> => {
  const result = new Map<string, BaseTreeNodeProps>();

  const traverse = (nodeList: BaseTreeNodeProps[]) => {
    for (const node of nodeList) {
      result.set(node.id, node);

      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  };

  traverse(nodes);

  return result;
};

/**
 * 모든 노드 ID를 반환
 * @param nodes 트리 노드 배열
 * @returns 모든 노드 ID 배열
 */
export const getAllNodeIds = <T>(nodes: BaseTreeNodeProps<T>[]): string[] => {
  const ids: string[] = [];

  const traverse = (nodeList: BaseTreeNodeProps<T>[]) => {
    for (const node of nodeList) {
      ids.push(node.id);

      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  };

  traverse(nodes);

  return ids;
};

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
