import type { BaseTreeNodeProps } from '../TreeItem';

/**
 * 트리 관련 유틸리티 함수들 중에서 트리 데이터의 변화 관련된 함수들입니다.
 */

/**
 * 트리 데이터를 평면화하여 Map 으로 변환
 * @param nodes 트리 노드 배열
 * @returns 노드 ID를 키로 하고 노드 객체를 값으로 하는 Map
 */
export const flattenTree = <T>(nodes: BaseTreeNodeProps<T>[]): Map<string, BaseTreeNodeProps<T>> => {
  const result = new Map<string, BaseTreeNodeProps<T>>();
  const stack: BaseTreeNodeProps<T>[] = [...nodes].reverse();

  while (stack.length > 0) {
    const node = stack.pop()!;

    result.set(node.id, node);

    const children = node.children;

    if (children && children.length > 0) {
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (child) stack.push(child);
      }
    }
  }

  return result;
};

/**
 * 트리 데이터를 평면화하여 검색용 배열로 변환 (경로 정보 포함)
 * @param nodes 변환할 트리 노드 배열
 * @param path 현재 노드까지의 경로 (부모 노드들의 id 배열, 기본값: 빈 배열)
 * @returns 노드와 경로 정보를 포함한 배열
 */
export const flattenTreeWithPath = <T>(
  nodes: BaseTreeNodeProps<T>[],
  path: string[] = [],
): Array<{ node: BaseTreeNodeProps<T>; path: string[] }> => {
  const result: Array<{ node: BaseTreeNodeProps<T>; path: string[] }> = [];
  const stack: Array<{ node: BaseTreeNodeProps<T>; currentPath: string[] }> = [];

  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];

    if (node) {
      stack.push({ node, currentPath: [...path, node.id] });
    }
  }

  while (stack.length > 0) {
    const { node, currentPath } = stack.pop()!;

    result.push({ node, path: currentPath });

    const children = node.children;

    if (children && children.length > 0) {
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];

        if (child) {
          stack.push({
            node: child,
            currentPath: [...currentPath, child.id],
          });
        }
      }
    }
  }

  return result;
};

/**
 * 단일 노드와 그 하위 트리를 반복적으로 필터링하는 헬퍼 함수
 *
 * @param rootNode
 * @param requiredIds
 * @returns 필터링 된 노드 또는 null
 */
export function filterNodeIterative<T>(
  rootNode: BaseTreeNodeProps<T>,
  requiredIds: Set<string>,
): BaseTreeNodeProps<T> | null {
  if (!requiredIds.has(rootNode.id)) {
    return null;
  }

  // 스택: { node: 현재 노드, parent: 현재 노드의 부모, childIdx:현재 노드의 자식 중 처리 중인 인덱스 기억용, filteredChildren: 필터링 처리된 자식들}
  type StackItem = {
    node: BaseTreeNodeProps<T>;
    childIdx: number;
    filteredChildren: BaseTreeNodeProps<T>[];
  };

  const stack: StackItem[] = [];
  const nodeMap = new Map<string, BaseTreeNodeProps<T>>();

  stack.push({
    node: rootNode,
    childIdx: 0,
    filteredChildren: [],
  });

  while (stack.length > 0) {
    const current = stack[stack.length - 1]!;

    const children = current.node.children ?? [];

    if (current.childIdx < children.length) {
      const child = children[current.childIdx];

      current.childIdx += 1;

      if (child && requiredIds.has(child.id)) {
        stack.push({
          node: child,
          childIdx: 0,
          filteredChildren: [],
        });
      }
    } else {
      stack.pop();

      const rebuilt: BaseTreeNodeProps<T> = {
        ...current.node,
        children: current.filteredChildren.length > 0 ? current.filteredChildren : undefined,
      };

      nodeMap.set(current.node.id, rebuilt);

      if (stack.length > 0) {
        const parentItem = stack[stack.length - 1]!;

        parentItem.filteredChildren.push(rebuilt);
      }
    }
  }

  return nodeMap.get(rootNode.id) ?? null;
}

/**
 * 주어진 매칭된 노드 ID 집합을 기반으로 트리를 필터링
 * 매칭된 노드와 그 조상 노드들만을 포함하는 새로운 트리 구조를 생성합니다.
 * 검색 기능에서 매칭된 노드들과 그 경로만 표시할 때 사용
 * @param nodes - 필터링할 원본 트리 노드 배열
 * @param matchedIds - 매칭된 노드 ID들의 Set
 * @returns 필터링된 트리 노드 배열
 */
export function filterTree<T>(nodes: BaseTreeNodeProps<T>[], matchedIds: Set<string>): BaseTreeNodeProps<T>[] {
  if (matchedIds.size === 0) return [];
  const result: BaseTreeNodeProps<T>[] = [];
  const requiredIds = new Set<string>();
  const flatMapWithPath = flattenTreeWithPath(nodes);

  for (const { node, path } of flatMapWithPath) {
    if (matchedIds.has(node.id)) {
      for (const pathId of path) {
        requiredIds.add(pathId);
      }
    }
  }

  for (const rootNode of nodes) {
    if (requiredIds.has(rootNode.id)) {
      const filteredNode = filterNodeIterative(rootNode, requiredIds);

      if (filteredNode) {
        result.push(filteredNode);
      }
    }
  }

  return result;
}
