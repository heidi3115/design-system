'use client';

import { flattenTree, isLeafNode, isSafeNode } from '@common/ui/components/TreeView/utils';
import { cn } from '@common/ui/lib/utils';
import React, { useCallback, useImperativeHandle, useMemo, useState } from 'react';
import TreeItem from './TreeItem';
import { TreeViewRoot } from './TreeViewParts';
import { treeViewVariants } from './treeViewVariants';
import type { TreeNodeProps } from './types';

export type TreeViewState = {
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  disabledIds?: Set<string>;
  // 미래 확장용 (현재는 주석 처리)
  // checkedIds?: Set<string>;
  // searchedIds?: Set<string>;
  // loadingIds?: Set<string>;
  // draggingIds?: Set<string>;
};

export type TreeViewStateInfo = {
  isControlled: { selected: boolean; expanded: boolean };
  totalNodes: number;
  selectedCount: number;
  expandedCount: number;
  disabledCount: number;
  lastSelectedId: string;
};

export type TreeViewRef<T = unknown> = {
  /** 현재 상태 조회하여 해당 nodeId 들을 배열로 반환 */
  getLastSelectedId: () => string;
  getSelectedIds: () => string[];
  getExpandedIds: () => string[];
  getDisabledIds: () => string[];
  /** 노드 ID로 노드 객체 조회 (유틸리티) */
  getNodeById: (id: string) => TreeNodeProps<T> | undefined;
  /** 현재 TreeViewState 정보 */
  getState: () => TreeViewStateInfo;
};

export type TreeViewProps<T = unknown> = {
  /** 트리 데이터 배열 */
  treeData?: TreeNodeProps<T>[];
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

  /** 노드 선택 시 호출되는 콜백 (selectedIds 배열 형태로 반환) */
  onSelectedNodes?: (selectedIds?: string[], selectedNodes?: TreeNodeProps<T>[]) => void;
  /** 노드 확장/축소 시 호출되는 콜백으로 확장된 노드들을 expandedIds 배열 형태로 반환 */
  onToggledNodes?: (expandedIds?: string[], expandedNodes?: TreeNodeProps<T>[]) => void;

  /** 노드간 연결선 표시 여부 및 연결선을 보여줄 레벨 */
  showLineLevel?: number;
  /** 노드간 구분선 표시 여부 */
  // showSeparators?: boolean; // TODO : 넣을 지 말지 고민
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
  treeViewRef?: React.Ref<TreeViewRef<T>>;
};

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
  showLineLevel,
  defaultSelectedIds,
  selectedIds,
  defaultExpandedIds,
  expandedIds,
  onSelectedNodes,
  onToggledNodes,
  nodeClassName,
  className,
  treeViewRef,
}: TreeViewProps<T>) {
  const { base, common, root } = treeViewVariants({ size, variant, disabled });

  const hasValidTreeData = Array.isArray(treeData) && treeData.length > 0;
  const effectiveShowLineLevel = showIcons ? showLineLevel : undefined;

  const isControlsSelected = selectedIds !== undefined;
  const isControlsExpanded = expandedIds !== undefined;

  const [lastSelected, setLastSelected] = useState<string>('');
  // 내부 상태 시: Uncontrolled
  const [internalState, setInternalState] = useState<TreeViewState>({
    selectedIds: new Set<string>(defaultSelectedIds ?? []),
    expandedIds: new Set<string>(defaultExpandedIds ?? []),
    disabledIds: new Set<string>([]),
  });

  const flatTreeNodeMap = useMemo(() => {
    return treeData ? flattenTree(treeData) : new Map<string, TreeNodeProps<T>>();
  }, [treeData]);

  const getDisabledIds = useMemo(() => {
    const allKeys = new Set([...flatTreeNodeMap.keys()]);
    const disabledKeys = new Set([...flatTreeNodeMap.entries()].filter(([, node]) => node.disabled).map(([id]) => id));

    return disabled ? allKeys : disabledKeys;
  }, [flatTreeNodeMap, disabled]);

  // 외부 상태 및 현재 상태: Controlled
  const currentState = useMemo<TreeViewState>(
    () => ({
      selectedIds: isControlsSelected ? new Set(selectedIds) : internalState.selectedIds,
      expandedIds: isControlsExpanded ? new Set(expandedIds) : internalState.expandedIds,
      disabledIds: getDisabledIds,
    }),
    [
      isControlsSelected,
      selectedIds,
      internalState.selectedIds,
      internalState.expandedIds,
      isControlsExpanded,
      expandedIds,
      getDisabledIds,
    ],
  );

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

      if (!isControlsSelected) {
        setInternalState((prev) => ({
          ...prev,
          selectedIds: nextSelected,
        }));
      }

      const nextSelectedArr = Array.from(nextSelected)
        .map((id) => flatTreeNodeMap.get(id))
        .filter(isSafeNode);

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

      if (!isControlsExpanded) {
        setInternalState((prev) => ({
          ...prev,
          expandedIds: nextExpanded,
        }));
      }

      const nextExpandedArr = [...nextExpanded].map((id) => flatTreeNodeMap.get(id)).filter(isSafeNode);

      onToggledNodes?.(Array.from(nextExpanded), nextExpandedArr);
    },
    [disabled, currentState.expandedIds, isControlsExpanded, onToggledNodes, flatTreeNodeMap],
  );

  useImperativeHandle(
    treeViewRef,
    () => ({
      getLastSelectedId: () => lastSelected,
      getSelectedIds: () => [...currentState.selectedIds],
      getExpandedIds: () => [...currentState.expandedIds],
      getDisabledIds: () => Array.from(currentState.disabledIds || []),
      getNodeById: (id: string) => flatTreeNodeMap.get(id),
      getState: () => ({
        isControlled: {
          selected: isControlsSelected,
          expanded: isControlsExpanded,
        },
        totalNodes: flatTreeNodeMap.size,
        selectedCount: currentState.selectedIds?.size || 0,
        expandedCount: currentState.expandedIds?.size || 0,
        disabledCount: currentState.disabledIds?.size || 0,
        lastSelectedId: lastSelected,
      }),
    }),
    [lastSelected, currentState, flatTreeNodeMap, isControlsSelected, isControlsExpanded],
  );

  if (!hasValidTreeData) return null;

  return (
    <TreeViewRoot
      className={cn(common(), root(), className, base())}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
      }}>
      {treeData.map((treeNode: TreeNodeProps<T>) => {
        const isNodeDisabled = disabled || currentState.disabledIds?.has(treeNode.id) || false;

        return (
          <TreeItem
            key={treeNode.id}
            node={treeNode}
            size={size}
            variant={variant}
            level={0}
            showLineLevel={effectiveShowLineLevel}
            showIcons={showIcons}
            defaultIcon={defaultIcon}
            expandedIcon={expandedIcon}
            endIcon={endIcon}
            selected={currentState.selectedIds.has(treeNode.id)}
            expanded={currentState.expandedIds.has(treeNode.id)}
            disabled={isNodeDisabled}
            onSelect={handleTreeSelect}
            onToggle={handleTreeToggle}
            className={nodeClassName}
            treeState={currentState}
          />
        );
      })}
    </TreeViewRoot>
  );
}
