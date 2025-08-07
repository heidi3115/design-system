import type { BaseTreeNodeProps } from '../TreeItem';

/**
 * 트리 관련 유틸리티 함수들 중에서 트리의 순회나 탐색하는 함수들입니다.
 */

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
