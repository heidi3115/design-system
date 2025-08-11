import type { BaseTreeNodeProps } from '../TreeItem';

/**
 * 트리 관련 유틸리티 함수들 중에서 트리 데이터의 변화 관련된 함수들입니다.
 */

/**
 * 트리 데이터를 평면화하여 Map 으로 변환
 * @param nodes 트리 노드 배열
 * @returns 노드 ID를 키로 하는 Map
 */
export const flattenTree = <T>(nodes: BaseTreeNodeProps<T>[]): Map<string, BaseTreeNodeProps<T>> => {
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
 * 트리 데이터를 평면화하여 검색용 배열로 변환 (경로 정보 포함)
 * @param nodes 트리 노드 배열
 * @param path 현재 노드까지의 경로 (부모 노드들의 이름 배열, 기본값: 빈 배열)
 * @returns 노드와 경로 정보를 포함한 배열
 */
export const flattenTreeWithPath = <T>(
  nodes: BaseTreeNodeProps<T>[],
  path: string[] = [],
): Array<{ node: BaseTreeNodeProps<T>; path: string[] }> => {
  const result: Array<{ node: BaseTreeNodeProps<T>; path: string[] }> = [];

  for (const node of nodes) {
    const currentPath = [...path, node.name];

    result.push({ node, path: currentPath });

    if (node.children && node.children.length > 0) {
      result.push(...flattenTreeWithPath(node.children, currentPath));
    }
  }

  return result;
};
