'use client';

import { useMemo } from 'react';
import type { BaseTreeNodeProps } from '../TreeItem';
import { filterTree, isMatched } from '../utils';

export const DEFAULT_INTERNAL_DEBOUNCE = 500;
export const DEFAULT_EXTERNAL_DEBOUNCE = 1000;

/**
 * 검색 옵션 설정
 */
export type MatchModeType = 'partial' | 'exact' | 'startsWith';
export type SearchOptionsProps = {
  searchFields?: string[]; // 검색 대상 필드명
  caseSensitive?: boolean; // 대소문자 구분 여부
  matchMode?: MatchModeType; // 검색 일치 모드
};

export type UseTreeSearchParams<T> = {
  treeData: BaseTreeNodeProps<T>[];
  flatTreeMap: Map<string, BaseTreeNodeProps<T>>;
  enabled?: boolean; // true : 내부 검색(자체 필터링), false : 외부 검색 (필터링 서버에 위임)
  searchValue: string;
  searchOptions?: SearchOptionsProps;
};

export type UseTreeSearchResultType<T> = {
  // 데이터 변환
  filteredTreeData: BaseTreeNodeProps<T>[];
  matchedIds: string[];
  isSearchActive: boolean;
};

/**
 * 트리 데이터 검색 및 필터링 훅
 * - 순수하게 데이터 변환만 담당
 * - 입력 상태 관리는 useDebouncedInput에서 처리
 */
export default function useTreeQuickSearch<T>({
  treeData,
  flatTreeMap,
  enabled = true,
  searchValue: externalSearchValue = '',
  searchOptions,
}: UseTreeSearchParams<T>): UseTreeSearchResultType<T> {
  return useMemo(() => {
    if (!enabled || !externalSearchValue.trim() || !treeData?.length) {
      return {
        filteredTreeData: treeData ?? [],
        matchedIds: [],
        isSearchActive: !!externalSearchValue.trim(),
      };
    }

    const { searchFields = ['name'], caseSensitive = false, matchMode = 'partial' } = searchOptions ?? {};
    const matchedIdList = new Set<string>();

    flatTreeMap.forEach((node) => {
      if (searchFields.some((field) => isMatched(node[field], externalSearchValue, caseSensitive, matchMode))) {
        matchedIdList.add(node.id);
      }
    });

    return {
      filteredTreeData: filterTree(treeData ?? [], matchedIdList),
      matchedIds: Array.from(matchedIdList),
      isSearchActive: !!externalSearchValue.trim(),
    };
  }, [enabled, externalSearchValue, searchOptions, treeData, flatTreeMap]);
}
