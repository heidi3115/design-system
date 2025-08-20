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
 * @param matchedIds
 * @returns
 */
function filterNodeIterative<T>(rootNode: BaseTreeNodeProps<T>, matchedIds: Set<string>): BaseTreeNodeProps<T> | null {
  // 스택: { node: 원본노드, parent: 결과부모노드, processed: 처리된자식들 }
  const stack: Array<{
    node: BaseTreeNodeProps<T>;
    parent: BaseTreeNodeProps<T> | null;
    processed: BaseTreeNodeProps<T>[];
  }> = [];

  const processedNodes = new Map<BaseTreeNodeProps<T>, BaseTreeNodeProps<T> | null>();

  // 루트 노드부터 시작
  stack.push({ node: rootNode, parent: null, processed: [] });

  while (stack.length > 0) {
    const current = stack[stack.length - 1]; // peek
    if (!current) break;
    const { node, parent, processed } = current;

    // 이미 처리된 노드라면 스택에서 제거하고 결과 처리
    if (processedNodes.has(node)) {
      stack.pop();

      const processedNode = processedNodes.get(node)!;

      if (parent && processedNode) {
        processed.push(processedNode);
      }

      continue;
    }

    // 자식이 있는 경우 자식들을 스택에 추가
    if (node.children && node.children.length > 0) {
      let hasUnprocessedChildren = false;

      // 자식들을 역순으로 스택에 추가 (순서 유지를 위해)
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i];

        if (child && !processedNodes.has(child)) {
          hasUnprocessedChildren = true;
          stack.push({ node: child, parent: node, processed: [] });
        }
      }

      // 처리되지 않은 자식이 있다면 계속 처리
      if (hasUnprocessedChildren) continue;
    }

    // 현재 노드 처리
    const isMatched = matchedIds.has(node.id);
    const hasMatchedChildren = processed.length > 0;

    if (isMatched || hasMatchedChildren) {
      const filteredNode: BaseTreeNodeProps<T> = {
        ...node,
        children: hasMatchedChildren ? processed : undefined,
      };

      processedNodes.set(node, filteredNode);
    } else {
      processedNodes.set(node, null); // null 처리
    }
  }

  return processedNodes.get(rootNode) || null;
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
  const result: BaseTreeNodeProps<T>[] = [];

  // 각 루트 노드에 대해 반복적으로 처리
  for (const rootNode of nodes) {
    const filteredNode = filterNodeIterative(rootNode, matchedIds);

    if (filteredNode) {
      result.push(filteredNode);
    }
  }

  return result;
}
