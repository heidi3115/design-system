import type { BaseTreeNodeProps } from '../TreeItem';

/**
 * 트리 관련 유틸리티 함수들 중에서 트리 데이터의 변화 관련된 함수들입니다.
 */

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
