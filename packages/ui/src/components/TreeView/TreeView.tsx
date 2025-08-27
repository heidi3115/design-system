'use client';

import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { Input } from '@common/ui';
import { cn } from '@common/ui/lib/utils';

import { DEFAULT_INTERNAL_DEBOUNCE, type SearchOptionsProps, useDebouncedTreeInput, useTreeQuickSearch } from './hooks';
import TreeItem, { type BaseTreeNodeProps } from './TreeItem';
import { TreeViewRoot } from './TreeViewParts';
import { treeViewVariants } from './treeViewVariants';
import { flattenTree, getAutoExpandedIds, isLeafNode, isSafeNode } from './utils';

export type TreeViewStateType = {
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  disabledIds: Set<string>;
  searchedIds: Set<string>;
  totalNodes: number;
  lastSelectedId: string;
  selectedCount: number;
  expandedCount: number;
  disabledCount: number;
  searchedCount: number;
  // 미래 확장용 (현재는 주석 처리)
  // checkedIds: Set<string>;
  // loadingIds: Set<string>;
  // draggingIds: Set<string>;
};

export type SearchModeType = 'internal' | 'external';
// TreeViewSearchProps 으로 검색 관련 type 추가
export type TreeViewSearchProps<T> = {
  // 검색 모드 제어
  quickSearchEnabled?: boolean; // true : 내부 검색, false : 외부검색
  // 디바운스 커스텀
  debounceMs?: number;
  // 검색 값 관리
  // 외부에서 전달하는 placeholder 값
  searchPlaceholder?: string;
  // 외부에서 전달하는 검색값
  searchValue?: string;
  // 검색값 변경 콜백
  onInputSearchChange?: (searchValue: string) => void;
  // 검색 조건
  searchOptions?: SearchOptionsProps<T>;
  // 하이라이팅 여부
  isHightLighting?: boolean;
  // 하이라이팅의 추가 클래스
  highlightClassName?: string;
};

export type TreeViewProps<T = unknown> = {
  /** 트리 데이터 배열 */
  treeData?: BaseTreeNodeProps<T>[];
  /** treeView 의 사이즈  */
  size?: keyof typeof treeViewVariants.variants.size;
  /** treeView 의 테마 색상 지정.   */
  variant?: keyof typeof treeViewVariants.variants.variant;
  /** 전체 컴포넌트 비활성화 여부 */
  disabled?: boolean;
  /** 다중 선택 여부를 결정 (default: false) */
  multiSelect?: boolean;
  /** Leaf Node 만 선택할 것인지 여부 (default: false) */
  leafOnlySelect?: boolean;

  /** 초기 렌더링 시 모든 노드 확장 여부 (default: false) */
  defaultExpandAll?: boolean;
  /** 외부에서 모든 노드를 확장/축소 제어 (true: 모두 확장, false: 모두 축소) */
  expandAll?: boolean;

  /** 기본 선택된 노드 ID들 (Uncontrolled 모드용) */
  defaultSelectedIds?: string[];
  /** 현재 선택된 노드 ID들 (Controlled 모드용) */
  selectedIds?: string[];
  /** 기본 확장된 노드 ID들 (Uncontrolled 모드용) */
  defaultExpandedIds?: string[];
  /** 현재 확장된 노드 ID들 (Controlled 모드용) */
  expandedIds?: string[];
  /** 기본 비활성화 된 노드 ID들 (Uncontrolled 모드용) */
  defaultDisabledIds?: string[];
  /** 현재 활성화 된 노드 ID들 (Controlled 모드용) */
  disabledIds?: string[];

  /** 노드 선택 시 호출되는 콜백 (selectedIds 배열 형태로 반환) */
  onSelectedNodes?: (selectedIds?: string[], selectedNodes?: BaseTreeNodeProps<T>[]) => void;
  /** 노드 확장/축소 시 호출되는 콜백으로 확장된 노드들을 expandedIds 배열 형태로 반환 */
  onToggledNodes?: (expandedIds?: string[], expandedNodes?: BaseTreeNodeProps<T>[]) => void;
  /** 노드 비활성화 시 호출되는 콜백으로 확장된 노드들을 expandedIds 배열 형태로 반환 */
  onDisabledNodes?: (disabledIds?: string[], disabledNodes?: BaseTreeNodeProps<T>[]) => void;
  /** TreeView 의 상태 변화에 따라 호출되는 콜백으로 TreeViewStateType 형태로 반환 */
  onTreeViewState?: (TreeViewState: TreeViewStateType) => void;

  /** 들여쓰는 사이즈의 기준(default : 4) */
  indentSize?: number;
  /** 노드간 연결선 표시 여부 및 연결선을 보여줄 레벨 */
  showLineLevel?: number;
  /** showLineLevel 부터 자식까지 선을 보여줄 지 여부. True 일 경우, showLineLevel의 숫자부터(ex. showLineLevel이 1이면 depth가 1인 경우부터 선에 계속 보임) (default:false) */
  isAllLine?: boolean;
  /** 노드의 아이콘 표시 여부 */
  showIcons?: boolean;
  /** 아이콘 타입별 커스텀 아이콘 매핑 */
  defaultIcon?: React.ReactNode;
  expandedIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /** TreeItem 노드별로 추가할 커스텀 클래스명 함수 */
  nodeClassName?: string;
  /** TreeView 컴포넌트 최상위 루트 div에 추가할 클래스명 */
  className?: string;
  /** ref prop */
  treeViewRef?: React.Ref<TreeViewStateType>;
} & TreeViewSearchProps<T>; // TreeViewSearchProps : 검색 관련 추가

export const DEFAULT_INDENT_SIZE = 0 as const;

export default function TreeView<T>({
  // default props
  treeData = [],
  variant = 'default',
  size = 'basic',
  disabled = false,
  multiSelect = false,
  leafOnlySelect = false,
  showIcons = true,
  defaultIcon = null,
  expandedIcon = null,
  endIcon = null,
  indentSize = DEFAULT_INDENT_SIZE,
  showLineLevel = undefined,
  isAllLine = false,
  defaultExpandAll = false,
  expandAll,
  defaultSelectedIds,
  selectedIds,
  defaultExpandedIds,
  expandedIds,
  defaultDisabledIds,
  disabledIds,
  onSelectedNodes,
  onToggledNodes,
  // onDisabledNodes,
  onTreeViewState,
  nodeClassName,
  className,
  treeViewRef,
  // search props
  quickSearchEnabled = false,
  debounceMs = DEFAULT_INTERNAL_DEBOUNCE,
  searchPlaceholder = '검색어를 입력해주세요...',
  searchValue = '',
  searchOptions = { searchFields: ['name'], caseSensitive: false, matchMode: 'partial' },
  isHightLighting,
  highlightClassName = '',
  onInputSearchChange,
}: TreeViewProps<T>) {
  const safeTreeData = treeData.filter(isSafeNode);
  const { base, common, root } = treeViewVariants({ size, variant, disabled });
  const effectiveShowLineLevel = showIcons ? showLineLevel : undefined;
  const searchMode: SearchModeType = onInputSearchChange ? 'external' : 'internal';
  const isInternalSearch = searchMode === 'internal';
  const isExternalSearched = !isInternalSearch && searchValue.trim().length > 0;
  const noResultTxt = '검색 결과가 존재하지 않습니다.';

  // Controlled/Uncontrolled 모드 판단
  const isControlledSelected = selectedIds !== undefined;
  const isControlledExpanded = expandedIds !== undefined;
  const isControlledDisabled = disabledIds !== undefined;
  const isControlledExpandAll = expandAll !== undefined;

  const prevSearchStateRef = useRef<{ searchedIds: string; expandedIds: string } | null>(null);
  const [lastSelected, setLastSelected] = useState<string>('');

  // 평면화된 트리 맵 생성
  const flatTreeNodeMap = useMemo(() => {
    return safeTreeData ? flattenTree(safeTreeData) : new Map<string, BaseTreeNodeProps<T>>();
  }, [safeTreeData]);

  // 전체 노드 ID들을 미리 계산
  const allNodeIds = useMemo(() => {
    return Array.from(flatTreeNodeMap.keys());
  }, [flatTreeNodeMap]);

  // useDebouncedTreeInput: 입력 처리 + 디바운스만 담당
  const { displayValue, debouncedValue, handleInputChange } = useDebouncedTreeInput({
    searchMode,
    externalValue: searchValue,
    debounceMs,
    onSearchValueChange: onInputSearchChange,
  });

  // useTreeQuickSearch: 트리 검색 처리 (내부 검색일 때만 활성화)
  const { filteredTreeData, matchedIds, isSearchActive } = useTreeQuickSearch({
    treeData: safeTreeData || [],
    flatTreeMap: flatTreeNodeMap,
    searchValue: debouncedValue,
    searchOptions,
    enabled: quickSearchEnabled && isInternalSearch,
  });

  // 검색 여부에 따른 실제 계산된 노드 수
  const totalNodesNumber = useMemo(() => {
    if (!quickSearchEnabled && !isSearchActive) return safeTreeData.length;
    if (isInternalSearch) return filteredTreeData.length > 0 ? flattenTree(filteredTreeData).size : 0;

    return safeTreeData.length;
  }, [isInternalSearch, isSearchActive, quickSearchEnabled, safeTreeData, filteredTreeData]);

  // 표시할 데이터 결정
  const displayData = useMemo(() => {
    if (!quickSearchEnabled || !isSearchActive) return safeTreeData;

    return isInternalSearch ? filteredTreeData : safeTreeData;
  }, [quickSearchEnabled, isSearchActive, isInternalSearch, filteredTreeData, safeTreeData]);

  // defaultExpandAll을 고려한 초기 확장 상태 계산(expandAll > expandedIds > defaultExpandAll > defaultExpandedIds 순으로 전체 여부와 제어(controlled)를 우선으로 처리)
  const initialExpandedIds = useMemo(() => {
    if (isControlledExpandAll) return new Set(allNodeIds);
    if (isControlledExpanded) return new Set(expandedIds);
    if (defaultExpandAll) return new Set(allNodeIds ?? []);
    if (defaultExpandedIds) return new Set(defaultExpandedIds ?? []);

    return new Set<string>();
  }, [isControlledExpandAll, isControlledExpanded, defaultExpandAll, defaultExpandedIds, expandedIds, allNodeIds]);

  // 내부 상태 (Uncontrolled 모드용 초기값 설정)
  const [internalState, setInternalState] = useState<TreeViewStateType>({
    selectedIds: new Set(defaultSelectedIds ?? []),
    expandedIds: initialExpandedIds,
    disabledIds: new Set(defaultDisabledIds ?? []),
    searchedIds: new Set(),
    totalNodes: safeTreeData.length,
    lastSelectedId: lastSelected,
    selectedCount: (defaultSelectedIds ?? []).length,
    expandedCount: initialExpandedIds.size,
    disabledCount: (defaultDisabledIds ?? []).length,
    searchedCount: 0,
  });

  // 상태값 결정 (controlled 우선)
  const currentSelectedIds = useMemo(
    () => (isControlledSelected ? new Set(selectedIds!) : internalState.selectedIds),
    [isControlledSelected, internalState.selectedIds, selectedIds],
  );
  const currentExpandedIds = useMemo(
    () =>
      isControlledExpandAll
        ? new Set(expandAll ? allNodeIds : [])
        : isControlledExpanded
          ? new Set(expandedIds ?? [])
          : internalState.expandedIds,
    [isControlledExpanded, isControlledExpandAll, expandAll, expandedIds, internalState.expandedIds, allNodeIds],
  );
  const currentDisabledIds = useMemo(
    () => (isControlledDisabled ? new Set(disabledIds!) : internalState.disabledIds),
    [isControlledDisabled, disabledIds, internalState.disabledIds],
  );
  // 검색된 ID들 (내부 검색일 때만)
  const currentSearchedIds = useMemo(
    () => (quickSearchEnabled && isSearchActive && isInternalSearch ? new Set(matchedIds) : new Set<string>()),
    [quickSearchEnabled, isSearchActive, isInternalSearch, matchedIds],
  );

  // 최종 확장 아이디는 기존 + 검색에 의한 자동 확장 노드 ID들의 합집합
  const finalExpandedIds = useMemo(() => {
    const searchExpandedIds =
      currentSearchedIds.size > 0 ? new Set(getAutoExpandedIds(safeTreeData, currentSearchedIds)) : new Set<string>();

    return new Set([...currentExpandedIds, ...searchExpandedIds]);
  }, [currentExpandedIds, currentSearchedIds, safeTreeData]);

  // 단일 상태 객체 구성
  const currentState: TreeViewStateType = {
    selectedIds: currentSelectedIds,
    expandedIds: finalExpandedIds,
    disabledIds: currentDisabledIds,
    searchedIds: currentSearchedIds,
    totalNodes: totalNodesNumber,
    lastSelectedId: lastSelected,
    selectedCount: currentSelectedIds.size,
    expandedCount: finalExpandedIds.size,
    disabledCount: currentDisabledIds.size,
    searchedCount: currentSearchedIds.size,
  };

  const handleNodeSelect = (nodeId: string) => {
    if (disabled || currentState.disabledIds.has(nodeId)) return;

    let nextSelected = new Set(currentState.selectedIds);

    if (leafOnlySelect) {
      const node = flatTreeNodeMap.get(nodeId);
      if (!node || !isLeafNode(node)) return;
    }

    if (multiSelect) {
      if (nextSelected.has(nodeId)) {
        nextSelected.delete(nodeId);
      } else {
        nextSelected.add(nodeId);
      }
    } else {
      nextSelected = new Set([nodeId]);
    }

    if (!isControlledSelected) {
      setInternalState((prev) => ({
        ...prev,
        selectedIds: nextSelected,
        selectedCount: nextSelected.size,
      }));
    }

    const nextSelectedArr = Array.from(nextSelected)
      .map((id) => flatTreeNodeMap.get(id))
      .filter(isSafeNode);

    onSelectedNodes?.(Array.from(nextSelected), nextSelectedArr);
    setLastSelected(nodeId);

    notifyStateChange({
      selectedIds: nextSelected,
      selectedCount: nextSelected.size,
      lastSelectedId: nodeId,
    });
  };

  const handleNodeToggle = (nodeId: string, expanded: boolean) => {
    if (disabled || currentState.disabledIds.has(nodeId)) return;

    const nextExpanded = new Set(currentState.expandedIds);

    if (expanded) {
      nextExpanded.add(nodeId);
    } else {
      nextExpanded.delete(nodeId);
    }

    if (!isControlledExpandAll && !isControlledExpanded) {
      setInternalState((prev) => ({
        ...prev,
        expandedIds: nextExpanded,
        expandedCount: nextExpanded.size,
      }));
    }

    const nextExpandedArr = [...nextExpanded].map((id) => flatTreeNodeMap.get(id)).filter(isSafeNode);

    onToggledNodes?.(Array.from(nextExpanded), nextExpandedArr);

    notifyStateChange({
      expandedIds: nextExpanded,
      expandedCount: nextExpanded.size,
    });
  };

  /**
   * 상태 콜백 호출 헬퍼 함수
   * 이벤트 발생 시점에만 호출되도록 명시적 분리
   */
  const notifyStateChange = (partialState: Partial<TreeViewStateType>) => {
    if (!onTreeViewState) return;

    const fullState: TreeViewStateType = {
      selectedIds: currentSelectedIds,
      expandedIds: finalExpandedIds,
      disabledIds: currentDisabledIds,
      searchedIds: currentSearchedIds,
      totalNodes: totalNodesNumber,
      lastSelectedId: lastSelected,
      selectedCount: currentSelectedIds.size,
      expandedCount: finalExpandedIds.size,
      disabledCount: currentDisabledIds.size,
      searchedCount: currentSearchedIds.size,
      ...partialState, // 변경된 부분만 오버라이드
    };

    onTreeViewState?.(fullState);
  };

  useImperativeHandle(
    treeViewRef,
    () => ({
      selectedIds: currentSelectedIds,
      expandedIds: finalExpandedIds,
      disabledIds: currentDisabledIds,
      searchedIds: currentSearchedIds,
      totalNodes: totalNodesNumber,
      lastSelectedId: lastSelected,
      selectedCount: currentSelectedIds.size,
      expandedCount: finalExpandedIds.size,
      disabledCount: currentDisabledIds.size,
      searchedCount: currentSearchedIds.size,
    }),
    [currentDisabledIds, currentSearchedIds, currentSelectedIds, finalExpandedIds, lastSelected, totalNodesNumber],
  );

  useEffect(() => {
    // 검색 결과에 대한 onTreeViewState 호출 처리 추가.
    if (quickSearchEnabled && isInternalSearch && typeof onTreeViewState === 'function' && isSearchActive) {
      const searchedIdsStr = Array.from(currentSearchedIds).join(',');
      const expandedIdsStr = Array.from(finalExpandedIds).join(',');

      const prev = prevSearchStateRef.current;

      if (!prev || prev.searchedIds !== searchedIdsStr || prev.expandedIds !== expandedIdsStr) {
        prevSearchStateRef.current = { searchedIds: searchedIdsStr, expandedIds: expandedIdsStr };
        onTreeViewState?.(currentState);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearchedIds]);

  if (!Array.isArray(safeTreeData)) return null;

  return (
    <TreeViewRoot
      className={cn(common(), root(), className, base())}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
      }}>
      {/* quickSearch */}
      {quickSearchEnabled && (
        <div data-slot={'quick-search-wrapper'} className={'relative mb-2 w-full'}>
          <Input
            type={'text'}
            data-slot={'input-quick-search'}
            disabled={disabled}
            placeholder={searchPlaceholder}
            defaultValue={displayValue}
            onChange={handleInputChange}
            error={Boolean(
              isSearchActive &&
                (isInternalSearch
                  ? isSearchActive && currentState.searchedCount === 0
                  : isExternalSearched && safeTreeData.length === 0),
            )}
            helperText={
              isInternalSearch
                ? isSearchActive && currentState.searchedCount === 0 && noResultTxt
                : isExternalSearched && safeTreeData.length === 0
                  ? isExternalSearched && safeTreeData.length === 0 && noResultTxt
                  : undefined
            }
          />
        </div>
      )}

      {/* 트리 렌더링 로직 */}
      <div
        data-slot="treeview-list-wrapper"
        className={cn(quickSearchEnabled ? 'overflow-auto max-h-[calc(100%-theme(space.10))]' : 'h-full')}>
        {displayData?.map((treeNode: BaseTreeNodeProps<T>) => {
          const isNodeSelected = currentState?.selectedIds.has(treeNode.id);
          const isNodeExpanded = currentState?.expandedIds.has(treeNode.id);
          const isNodeDisabled = disabled || currentState?.disabledIds?.has(treeNode.id) || false;

          return (
            <TreeItem
              key={treeNode.id}
              node={treeNode}
              level={0}
              defaultIcon={defaultIcon}
              expandedIcon={expandedIcon}
              endIcon={endIcon}
              selected={isNodeSelected}
              expanded={isNodeExpanded}
              disabled={isNodeDisabled}
              size={size}
              variant={variant}
              indentSize={indentSize}
              showLineLevel={effectiveShowLineLevel}
              isAllLine={isAllLine}
              showIcons={showIcons}
              isHightLighting={
                isHightLighting ? (isInternalSearch ? isSearchActive : searchValue.trim().length > 0) : undefined
              }
              searchQuery={isSearchActive ? (isInternalSearch ? debouncedValue : searchValue) : undefined}
              highlightClassName={highlightClassName}
              onSelect={handleNodeSelect}
              onToggle={handleNodeToggle}
              className={nodeClassName}
              treeViewState={currentState}
            />
          );
        })}
      </div>
    </TreeViewRoot>
  );
}
