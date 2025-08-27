import type { BaseTreeNodeProps } from '../TreeItem';
import { flattenTreeWithPath } from './treeData';

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
  const stack: BaseTreeNodeProps<T>[] = [...nodes].reverse();

  while (stack.length > 0) {
    const node = stack.pop()!;

    ids.push(node.id);

    // 자식이 있으면 스택에 추가 (역순으로 추가하여 원래 순서 유지)
    const children = node.children;

    if (children && children.length > 0) {
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];

        if (child) {
          stack.push(child);
        }
      }
    }
  }

  return ids;
};

/**
 * 매칭된 노드들을 표시하기 위해 자동으로 확장되어야 할 노드 ID들을 계산
 * 검색 결과나 특정 노드들이 보이도록 하기 위해 그들의 모든 조상 노드들을 확장 상태로 만들어야 할 때 사용됩니다.
 *
 * @param treeData - 전체 트리 데이터
 * @param matchedIds - 표시되어야 할 노드 ID들의 Set
 * @returns 자동으로 확장되어야 할 모든 노드 ID 배열 (중복 제거됨)
 */
export function getAutoExpandedIds<T>(treeData: BaseTreeNodeProps<T>[], matchedIds: Set<string>): string[] {
  const allPathArr = flattenTreeWithPath(treeData);
  const autoExpandSet = new Set<string>();

  for (const { node, path } of allPathArr) {
    if (matchedIds.has(node.id)) {
      path.forEach((id) => autoExpandSet.add(id));
    }
  }

  return Array.from(autoExpandSet);
}
