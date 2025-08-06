'use client';

import { Collapsible } from '@common/ui';
import { CloseFolderFilledIcon, OpenFolderFilledIcon, PlayArrowIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils';
import React from 'react';
import { DEFAULT_INDENT_SIZE, type TreeViewStateType } from './TreeView';
import { TreeViewItem, TreeViewItemContent, TreeViewItemTrigger } from './TreeViewParts';
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

export type TreeItemProps<T> = {
  /** 트리 노드 데이터 */
  node: BaseTreeNodeProps<T>;
  /** 현재 노드의 트리 레벨 (들여쓰기용) */
  level?: number;
  // === 개별 노드 상태 (TreeView 에서 계산되어 전달예정) ===
  selected?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  /** 아이콘 */
  defaultIcon?: React.ReactNode;
  expandedIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /* 스타일 */
  /** 노드의 아이콘 표시 여부 (default: true) */
  showIcons?: boolean;
  size?: keyof typeof treeViewVariants.variants.size;
  variant?: keyof typeof treeViewVariants.variants.variant;
  /** 들여쓰는 기준의 숫자. */
  indentSize?: number;
  /** children 의 선 보여줄 단계의 번호 undefined 시, 선이 보이지 않습니다.*/
  showLineLevel?: number;
  /* 이벤트 핸들러 */
  /** 노드 선택 시 콜백  */
  onSelect?: (nodeId: string) => void;
  /** 노드 확장/축소 시 콜백 */
  onToggle?: (nodeId: string, expanded: boolean) => void;
  /** 클래스명 */
  className?: string;
  /** TreeView 상태 (읽기용) */
  treeViewState?: TreeViewStateType;
};

export default function TreeItem<T = unknown>({
  node,
  level = 0,
  defaultIcon = null,
  expandedIcon = null,
  endIcon = null,
  selected = false,
  expanded = false,
  disabled = false,
  showIcons = true,
  size = 'basic',
  variant = 'default',
  indentSize = DEFAULT_INDENT_SIZE,
  showLineLevel,
  onSelect,
  onToggle,
  className,
  treeViewState,
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
        <span data-slot="item-trigger-icon" data-active={selected} className={cn(variantClass, icons(), disabledClass)}>
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

  return (
    <TreeViewItem
      id={node.id}
      level={level}
      selected={selected}
      expanded={expanded}
      disabled={disabled}
      onClick={(e: React.MouseEvent) => handleItemToggle(e, node.id)}
      className={cn(variantClass, itemsClass, level === 0 && 'ml-0 pl-0', className)}
      style={
        level > 0
          ? {
              marginLeft: `${indentSize}px`,
            }
          : {}
      }>
      {hasChildren ? (
        <Collapsible
          open={expanded}
          onOpenChange={(open) => onToggle?.(node.id, open)}
          disabled={disabled}
          trigger={renderTrigger(node)}
          showPreview={false}
          className={'w-full gap-y-0 p-0'}
          contentClassName={'w-full px-0 py-0 shadow-none'}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <TreeViewItemContent
            className={cn(variantClass, itemContent(), level === lineLevelNum && lineDotClass)}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            {node.children!.map((childNode: BaseTreeNodeProps) => {
              const isNodeSelected = treeViewState?.selectedIds.has(childNode.id);
              const isNodeExpanded = treeViewState?.expandedIds.has(childNode.id);
              const isNodeDisabled = disabled || treeViewState?.disabledIds?.has(childNode.id) || false;

              return (
                <TreeItem
                  {...childNode}
                  key={childNode.id}
                  node={childNode}
                  level={level + 1}
                  defaultIcon={defaultIcon}
                  expandedIcon={expandedIcon}
                  endIcon={endIcon}
                  size={size}
                  variant={variant}
                  selected={isNodeSelected}
                  expanded={isNodeExpanded}
                  disabled={isNodeDisabled}
                  showIcons={showIcons}
                  indentSize={indentSize}
                  showLineLevel={showLineLevel}
                  onSelect={onSelect}
                  onToggle={onToggle}
                  className={cn(className)}
                  treeViewState={treeViewState}
                />
              );
            })}
          </TreeViewItemContent>
        </Collapsible>
      ) : (
        renderTrigger(node)
      )}
    </TreeViewItem>
  );
}
