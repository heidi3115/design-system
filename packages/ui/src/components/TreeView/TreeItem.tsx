'use client';

import React, { useImperativeHandle } from 'react';
import { Collapsible } from '@common/ui';
import { cn } from '@common/ui/lib/utils';
import { CloseFolderFilledIcon, OpenFolderFilledIcon, PlayArrowIcon } from '@common/ui/icons';
import { TreeViewItem, TreeViewItemContent, TreeViewItemTrigger } from './TreeViewParts';
import { type TreeViewState } from './TreeView';
import { treeViewVariants } from './treeViewVariants';

/**
 * 기본 트리 노드 인터페이스
 * 모든 API 에서 공통으로 사용되는 필수 필드들을 정의
 */
export type BaseTreeNodeProps<T = unknown> = {
  /** 트리 노드의 고유 식별자 */
  id: string;
  /** 트리 노드의 표시명 */
  name: string;
  /** 자식 노드들 (재귀적 구조) */
  children?: BaseTreeNodeProps<T>[];
  /** 확장을 위한 인덱스 시그니처 */
  [key: string]: unknown;
};

export type TreeItemRef<T = unknown> = {
  /** 현재 노드 정보 반환 */
  getNode: () => BaseTreeNodeProps<T>;
  /** 현재 노드의 선택 상태 */
  isSelected: () => boolean;
  /** 현재 노드의 확장 상태 */
  isExpanded: () => boolean;
  /** 현재 노드의 비활성화 상태 */
  isDisabled: () => boolean;
  /** 노드를 선택 */
  select: () => void;
  /** 노드를 토글 */
  toggle: () => void;
};

export type TreeItemProps<T> = {
  /** 트리 노드 데이터 */
  node: BaseTreeNodeProps<T>;
  /** 현재 노드의 트리 레벨 (들여쓰기용) */
  level?: number;
  // === 개별 노드 상태 (TreeView 에서 계산되어 전달예정) ===
  disabled?: boolean;
  selected?: boolean;
  expanded?: boolean;
  /** 아이콘 */
  defaultIcon?: React.ReactNode;
  expandedIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /* 스타일 */
  size?: keyof typeof treeViewVariants.variants.size;
  variant?: keyof typeof treeViewVariants.variants.variant;
  /** children 의 선 보여줄 단계의 번호 undefined 시, 선이 보이지 않습니다.*/
  showLineLevel?: number;
  /** 노드의 아이콘 표시 여부 (default: true) */
  showIcons?: boolean;
  /* 이벤트 핸들러 */
  /** 노드 선택 시 콜백  */
  onSelect?: (nodeId: string) => void;
  /** 노드 확장/축소 시 콜백 */
  onToggle?: (nodeId: string, expanded: boolean) => void;
  /** 클래스명 */
  className?: string;
  /** TreeView 상태 (읽기용) */
  treeState?: TreeViewState;
  /** */
  treeItemRef?: React.Ref<TreeItemRef<T>>;
};

export default function TreeItem<T = unknown>({
  node,
  level = 0,
  defaultIcon = null,
  expandedIcon = null,
  endIcon = null,
  size = 'basic',
  variant = 'default',
  disabled = false,
  selected = false,
  expanded = false,
  showIcons = true,
  showLineLevel,
  onSelect,
  onToggle,
  className,
  treeState,
  treeItemRef,
}: TreeItemProps<T>) {
  const hasChildren = Array.isArray(node?.children) && node.children.length > 0;
  const hasLineLevel = showLineLevel === undefined ? undefined : showLineLevel;
  const lineLevelNum = hasLineLevel ? showLineLevel || 0 : 0;
  const { base, common, items, itemTrigger, itemContent, icons } = treeViewVariants({
    size,
    variant,
    showLines: hasLineLevel ? level >= lineLevelNum : true,
    itemSelected: selected,
    disabled,
  });

  const disabledClass = disabled ? base() : '';
  const variantClass = common();
  const itemsClass = items();
  // TODO : 보여주는 선의 레벨인 경우의 구분을 위한 점 디자인 클래스인데 이게 필요할까? 개인적으로는 구분이 되서 좋긴 함.
  const lineDotClass =
    "after:content-['·'] after:text-[40px]/0 after:size-1 after:absolute after:left-0 after:bottom-0 after:-translate-x-1.5";

  const handleItemToggle = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (!hasChildren || disabled) return;
    onToggle?.(nodeId, !expanded);
  };

  const handleItemSelect = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (!disabled && onSelect) onSelect(nodeId);
  };

  const renderTrigger = (nodeItem: BaseTreeNodeProps<T>) => (
    <TreeViewItemTrigger
      data-slot="tree-item-trigger"
      data-active={selected}
      expanded={expanded}
      onClick={(e) => handleItemSelect(e, nodeItem.id)}
      className={cn(variantClass, itemTrigger(), disabledClass)}>
      {showIcons && (
        <span data-slot="item-trigger-icon" className={cn(variantClass, icons(), disabledClass)}>
          {hasChildren
            ? expanded
              ? expandedIcon || <OpenFolderFilledIcon />
              : defaultIcon || <CloseFolderFilledIcon />
            : endIcon || <PlayArrowIcon />}
        </span>
      )}
      <span data-slot="tree-item-label" className={cn('truncate', disabledClass)}>
        {nodeItem.name}
      </span>
    </TreeViewItemTrigger>
  );

  useImperativeHandle(
    treeItemRef,
    () => ({
      getNode: () => node,
      isSelected: () => selected,
      isExpanded: () => expanded,
      isDisabled: () => disabled,
      select: () => {
        if (!disabled && onSelect) {
          onSelect(node.id);
        }
      },
      toggle: () => {
        if (!disabled && hasChildren && onToggle) {
          onToggle(node.id, !expanded);
        }
      },
    }),
    [node, selected, expanded, hasChildren, disabled, onSelect, onToggle],
  );

  return (
    <TreeViewItem
      id={node.id}
      level={level}
      selected={selected}
      expanded={expanded}
      disabled={disabled}
      onClick={(e: React.MouseEvent) => handleItemToggle(e, node.id)}
      className={cn(variantClass, itemsClass, level === 0 && 'ml-0 pl-0', className)}>
      {hasChildren ? (
        <Collapsible
          open={expanded}
          onOpenChange={(open) => onToggle?.(node.id, open)}
          disabled={disabled}
          trigger={renderTrigger(node)}
          showPreview={false}
          className={cn('w-full px-0 py-0 gap-y-0 shadow-none')}
          style={{ rowGap: 0 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <TreeViewItemContent
            className={cn(variantClass, itemContent(), level === lineLevelNum && lineDotClass)}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            {node.children!.map((childNode: BaseTreeNodeProps) => (
              <TreeItem
                {...childNode}
                key={childNode.id}
                node={childNode}
                level={level + 1}
                size={size}
                variant={variant}
                showLineLevel={showLineLevel}
                showIcons={showIcons}
                defaultIcon={defaultIcon}
                expandedIcon={expandedIcon}
                endIcon={endIcon}
                selected={treeState?.selectedIds?.has(childNode.id)}
                expanded={treeState?.expandedIds?.has(childNode.id)}
                disabled={disabled || Boolean(treeState?.disabledIds?.has(childNode.id) || childNode?.disabled)}
                onSelect={onSelect}
                onToggle={onToggle}
                className={cn(className)}
                treeState={treeState}
              />
            ))}
          </TreeViewItemContent>
        </Collapsible>
      ) : (
        renderTrigger(node)
      )}
    </TreeViewItem>
  );
}
