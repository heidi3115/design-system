'use client';

import React, { useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { cn } from '@common/ui/lib/utils';
import { flattenTree, isLeafNode, isSafeNode } from './utils';
import TreeItem, { type BaseTreeNodeProps } from './TreeItem';
import { TreeViewRoot } from './TreeViewParts';
import { treeViewVariants } from './treeViewVariants';

export type TreeViewStateType = {
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  disabledIds: Set<string>;
  totalNodes: number;
  lastSelectedId: string;
  selectedCount: number;
  expandedCount: number;
  disabledCount: number;
  // 미래 확장용 (현재는 주석 처리)
  // searchedIds: Set<string>;
  // checkedIds: Set<string>;
  // loadingIds: Set<string>;
  // draggingIds: Set<string>;
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
  /** */
  treeViewRef?: React.Ref<TreeViewStateType>;
};

export const DEFAULT_INDENT_SIZE = 0 as const;

export default function TreeView<T>({
  treeData,
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
}: TreeViewProps<T>) {
  const { base, common, root } = treeViewVariants({ size, variant, disabled });

  const hasValidTreeData = Array.isArray(treeData) && treeData.length > 0;
  const effectiveShowLineLevel = showIcons ? showLineLevel : undefined;

  const isControlsSelected = selectedIds !== undefined;
  const isControlsExpanded = expandedIds !== undefined;
  const isControlsDisabled = disabledIds !== undefined;

  const [lastSelected, setLastSelected] = useState<string>('');

  const flatTreeNodeMap = useMemo(() => {
    return treeData ? flattenTree(treeData) : new Map<string, BaseTreeNodeProps<T>>();
  }, [treeData]);

  // 내부 상태 관리 (Uncontrolled 모드용) & 초기값
  const [internalState, setInternalState] = useState<TreeViewStateType>({
    selectedIds: new Set(defaultSelectedIds ?? []),
    expandedIds: new Set(defaultExpandedIds ?? []),
    disabledIds: new Set(defaultDisabledIds ?? []),
    totalNodes: flatTreeNodeMap.size,
    lastSelectedId: lastSelected,
    selectedCount: new Set(defaultSelectedIds ?? []).size,
    expandedCount: new Set(defaultExpandedIds ?? []).size,
    disabledCount: new Set(defaultDisabledIds ?? []).size,
  });

  // 현재 상태 계산 (Controlled vs Uncontrolled 우선순위 적용)
  const currentState = useMemo<TreeViewStateType>(() => {
    const currentSelectedIds = isControlsSelected ? new Set(selectedIds) : internalState.selectedIds;
    const currentExpandedIds = isControlsExpanded ? new Set(expandedIds) : internalState.expandedIds;
    const currentDisabledIds = isControlsDisabled ? new Set(disabledIds) : internalState.disabledIds;

    return {
      selectedIds: currentSelectedIds,
      expandedIds: currentExpandedIds,
      disabledIds: currentDisabledIds,
      totalNodes: flatTreeNodeMap.size,
      lastSelectedId: lastSelected,
      selectedCount: currentSelectedIds.size,
      expandedCount: currentExpandedIds.size,
      disabledCount: currentDisabledIds.size,
    };
  }, [
    isControlsSelected,
    isControlsExpanded,
    isControlsDisabled,
    selectedIds,
    expandedIds,
    disabledIds,
    internalState.selectedIds,
    internalState.expandedIds,
    internalState.disabledIds,
    flatTreeNodeMap.size,
    lastSelected,
  ]);

  const handleTreeSelect = useCallback(
    (nodeId: string) => {
      if (disabled || currentState.disabledIds?.has(nodeId)) return;
      let nextSelected = new Set(currentState.selectedIds);

      if (multiSelect && leafOnlySelect) {
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

      const nextSelectedArr = Array.from(nextSelected)
        .map((id) => flatTreeNodeMap.get(id))
        .filter(isSafeNode);

      // Uncontrolled 모드에서만 내부 상태 업데이트
      if (!isControlsSelected) {
        setInternalState((prev) => ({
          ...prev,
          selectedIds: nextSelected,
          selectedCount: nextSelected.size,
        }));
      }

      onSelectedNodes?.(Array.from(nextSelected), nextSelectedArr);
      setLastSelected(nodeId);
    },
    [
      disabled,
      currentState.disabledIds,
      currentState.selectedIds,
      multiSelect,
      leafOnlySelect,
      isControlsSelected,
      onSelectedNodes,
      flatTreeNodeMap,
    ],
  );

  const handleTreeToggle = useCallback(
    (nodeId: string, expanded: boolean) => {
      if (disabled) return;
      const nextExpanded = new Set(currentState.expandedIds);

      if (expanded) {
        nextExpanded.add(nodeId);
      } else {
        nextExpanded.delete(nodeId);
      }

      const nextExpandedArr = [...nextExpanded].map((id) => flatTreeNodeMap.get(id)).filter(isSafeNode);

      // Uncontrolled 모드에서만 내부 상태 업데이트
      if (!isControlsExpanded) {
        setInternalState((prev) => ({
          ...prev,
          expandedIds: nextExpanded,
          expandedCount: nextExpanded.size,
        }));
      }

      onToggledNodes?.(Array.from(nextExpanded), nextExpandedArr);
    },
    [disabled, currentState, isControlsExpanded, onToggledNodes, flatTreeNodeMap],
  );

  useEffect(() => {
    onTreeViewState?.(currentState);
  }, [currentState, onTreeViewState]);

  useImperativeHandle(treeViewRef, () => currentState, [currentState]);

  if (!hasValidTreeData) return null;

  return (
    <TreeViewRoot
      className={cn(common(), root(), className, base())}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
      }}>
      {treeData.map((treeNode: BaseTreeNodeProps<T>) => {
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
            onSelect={handleTreeSelect}
            onToggle={handleTreeToggle}
            className={nodeClassName}
            treeViewState={currentState}
          />
        );
      })}
    </TreeViewRoot>
  );
}
