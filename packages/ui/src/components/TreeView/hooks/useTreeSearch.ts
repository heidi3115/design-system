'use client';

import type { BaseTreeNodeProps } from '@common/ui';
import { flattenTreeWithPath } from '@common/ui/components/TreeView';
import { useDebounce } from '@common/utils';
import { useCallback, useMemo, useState } from 'react';

/**
 * 검색 옵션 설정
 */
export type SearchOptionsProps = {
  /** 대소문자 구분 여부 (기본값: false) */
  caseSensitive?: boolean;
  /** 검색 일치 모드 (기본값: 'partial') */
  matchMode?: 'partial' | 'exact' | 'startsWith';
  /**
   * 디바운스 지연 시간 (ms)
   * - 0: 디바운싱 없음 (내부 검색 권장)
   * - >0: 디바운싱 적용 (외부 검색 권장, 기본값: 300ms)
   */
  debounceMs?: number;
  /**
   * 검색 모드 (내부/외부 검색 구분용)
   * - 'internal': 클라이언트 검색, 디바운싱 기본 비활성화
   * - 'external': 서버 검색, 디바운싱 기본 활성화
   */
  searchMode?: 'internal' | 'external';
};

/**
 * 검색 결과 항목
 */
export type SearchResultProps<T = unknown> = {
  /** 검색된 노드 */
  node: BaseTreeNodeProps<T>;
  /** 노드까지의 경로 (부모 노드들의 이름 배열) */
  path: string[];
  /** 검색어와 일치하는 필드명 배열 */
  matchedFields: string[];
};

/**
 * useTreeSearch 훅의 입력 props
 */
export type UseTreeSearchProps<T = unknown> = {
  /** 검색할 트리 데이터 배열 */
  treeData: BaseTreeNodeProps<T>[];
  /** 검색 옵션 설정 */
  searchOptions?: SearchOptionsProps;
};

/**
 * useTreeSearch 훅의 반환값
 */
export type UseTreeSearchReturnProps<T = unknown> = {
  /** 현재 검색어 */
  searchQuery: string;
  /** 검색 결과 배열 */
  searchResults: SearchResultProps<T>[];
  /** 검색 결과에 따라 필터링된 트리 데이터 */
  filteredTreeData: BaseTreeNodeProps<T>[];
  /** 검색 결과 노드 ID 들의 Set */
  searchResultIds: Set<string>;
  /** 검색 중인지 여부 (검색어가 비어있지 않은 경우 true) */
  isSearching: boolean;
  /** 검색 결과 개수 */
  searchResultCount: number;
  /** 검색어 설정 함수 */
  setSearchQuery: (query: string) => void;
  /** 검색어 초기화 함수 */
  clearSearch: () => void;
};

// 검색 알고리즘 (부분 일치, 대소문자 무시)
export function searchNodes<T>(
  flatNodes: Array<{ node: BaseTreeNodeProps<T>; path: string[] }>,
  query: string,
  options: SearchOptionsProps = {},
): SearchResultProps<T>[] {
  if (!query.trim()) return [];

  const { caseSensitive = false, matchMode = 'partial' } = options;

  const searchTerm = caseSensitive ? query : query.toLowerCase();

  return flatNodes
    .filter(({ node }) => {
      const nodeLabel = caseSensitive ? node.name : node.name.toLowerCase();

      switch (matchMode) {
        case 'exact':
          return nodeLabel === searchTerm;
        case 'startsWith':
          return nodeLabel.startsWith(searchTerm);
        case 'partial':
        default:
          return nodeLabel.includes(searchTerm);
      }
    })
    .map(({ node, path }) => ({
      node,
      path,
      matchedFields: ['name'], // 현재는 name만 검색
    }));
}

// 검색 결과에 따라 트리 필터링
export function filterTreeBySearch<T>(
  nodes: BaseTreeNodeProps<T>[],
  searchResultIds: Set<string>,
): BaseTreeNodeProps<T>[] {
  if (searchResultIds.size === 0) return nodes;

  const filteredNodes: BaseTreeNodeProps<T>[] = [];

  for (const node of nodes) {
    const hasMatchingChildren = Array.isArray(node?.children) && node.children.length > 0;
    const filteredChildren = hasMatchingChildren ? filterTreeBySearch(node.children!, searchResultIds) : [];

    const isNodeMatch = searchResultIds.has(node.id);
    const hasMatchingDescendants = filteredChildren.length > 0;

    if (isNodeMatch || hasMatchingDescendants) {
      filteredNodes.push({
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : node?.children,
      });
    }
  }

  return filteredNodes;
}

export const DEFAULT_DEBOUNCE_TIME_MS = 300 as const;

export function useTreeSearch<T = unknown>({
  treeData,
  searchOptions = {},
}: UseTreeSearchProps<T>): UseTreeSearchReturnProps<T> {
  const [searchQuery, setSearchQuery] = useState('');

  // debouncing
  const { shouldDebounce, debounceTime } = useMemo(() => {
    const { searchMode = 'internal', debounceMs } = searchOptions;

    // 명시적으로 debounceMs가 설정된 경우 해당 값 사용(모든 searchMode)
    if (debounceMs !== undefined) {
      return {
        shouldDebounce: debounceMs > 0,
        debounceTime: debounceMs,
      };
    }

    return {
      shouldDebounce: searchMode === 'external',
      debounceTime: searchMode === 'external' ? (debounceMs ? debounceMs : DEFAULT_DEBOUNCE_TIME_MS) : 0,
    };
  }, [searchOptions]);

  // 트리 평면화 (검색용 - 경로 정보 포함)
  const flatNodes = useMemo(() => {
    if (!treeData || treeData.length === 0) return [];

    return flattenTreeWithPath(treeData);
  }, [treeData]);

  // 검색 결과 계산
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || flatNodes.length === 0) return [];

    return searchNodes(flatNodes, searchQuery, searchOptions);
  }, [flatNodes, searchQuery, searchOptions]);

  // 검색 결과 ID 집합
  const searchResultIds = useMemo(() => new Set(searchResults.map((result) => result.node.id)), [searchResults]);

  // 필터링된 트리 데이터
  const filteredTreeData = useMemo(() => {
    if (!searchQuery.trim() || !treeData || treeData.length === 0) {
      return treeData || [];
    }

    return filterTreeBySearch(treeData, searchResultIds);
  }, [treeData, searchResultIds, searchQuery]);

  const debouncedSetSearchQuery = useDebounce(
    (query: string) => {
      setSearchQuery(query);
    },
    shouldDebounce ? debounceTime : 0,
  );

  const handleSetSearchQuery = useCallback(
    (query: string) => {
      if (shouldDebounce) {
        // 외부 검색: 디바운싱 적용
        debouncedSetSearchQuery(query);
      } else {
        // 내부 검색: 즉시 실행
        setSearchQuery(query);
      }
    },
    [shouldDebounce, debouncedSetSearchQuery],
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    searchResults,
    filteredTreeData,
    searchResultIds,
    isSearching: searchQuery.trim().length > 0,
    searchResultCount: searchResults.length,
    setSearchQuery: handleSetSearchQuery,
    clearSearch,
  };
}
