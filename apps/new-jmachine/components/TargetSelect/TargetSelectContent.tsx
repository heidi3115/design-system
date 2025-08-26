'use client';

import { Suspense, useState } from 'react';

import TargetTree from './TreeSection/TargetTree';
import TargetUserGrid from './GridSection/TargetUserGrid';
import { TreeFallback } from './Fallback/TreeFallback';
import { GridFallback } from './Fallback/GridFallback';
import TargetDeptGrid from './GridSection/TargetDeptGrid';
import { DeptsType } from '../../services/common/getSearchDept';
import ExceptionGroupsTree from './TreeSection/ExceptionGroupsTree';
import { ExceptionGroupsType } from '../../services/scenario/getExceptionManageGroups';
import TargetExceptGroupGrid from './GridSection/TargetExceptGroupGrid';
import TargetAssetGrid from './GridSection/TargetAssetGrid';
import { AssetDivisionTreeType } from '../../services/asset/getDivisionTree';
import TargetDeptAssetGrid from './GridSection/TargetDeptAssetGrid';
import { type TargetEntityType } from './TargetSelectDialog';

export type TargetCategoryType = 'user' | 'depts' | 'asset' | 'assetGroup' | 'exceptionGroup';

type TargetSelectContentProps = {
  type: TargetCategoryType;
  detectTargetType?: string;
  onSelectedData?: (data: TargetEntityType) => void;
};

export default function TargetSelectContent({ type, detectTargetType, onSelectedData }: TargetSelectContentProps) {
  const [targetNodeId, setTargetNodeId] = useState('-1');
  const [targetNodeDept, setTargetNodeDept] = useState<DeptsType[]>([]);
  const [targetNodeAsset, setTargetNodeAsset] = useState<AssetDivisionTreeType[]>([]);
  const [targetExceptGroup, setTargetExceptGroup] = useState<ExceptionGroupsType | null>(null);

  const isUser = type === 'user';
  const isDept = type === 'depts';
  const isAsset = type === 'asset';
  const isAssetGroup = type === 'assetGroup';
  const isExcepitonGroup = type === 'exceptionGroup';

  return (
    <div className="flex gap-2 h-164 w-full">
      {/* left tree */}
      <div className="w-60 p-2 bg-juiBackground-paper shrink-0">
        {(isUser || isDept || isAsset || isAssetGroup) && (
          <Suspense fallback={<TreeFallback />}>
            <TargetTree
              type={type}
              {...(isUser && { onSelectedNodeId: (id) => setTargetNodeId(id) })}
              {...(isDept && { onSelectedNode: (data) => setTargetNodeDept(data) })}
              {...(isAsset && { onSelectedNodeId: (id) => setTargetNodeId(id) })}
              {...(isAssetGroup && { onSelectedAssetNode: (data) => setTargetNodeAsset(data) })}
            />
          </Suspense>
        )}
        {isExcepitonGroup && (
          <Suspense fallback={<TreeFallback />}>
            <ExceptionGroupsTree
              detectTargetType={detectTargetType}
              onSelectedGroupData={(data) => setTargetExceptGroup(data)}
            />
          </Suspense>
        )}
      </div>
      {/* right grid */}
      <div className="flex-1 overflow-x-auto">
        {isUser && (
          <Suspense fallback={<GridFallback />}>
            <TargetUserGrid targetId={targetNodeId} onSelectedData={(data) => onSelectedData?.(data)} />
          </Suspense>
        )}
        {isAsset && (
          <Suspense fallback={<GridFallback />}>
            <TargetAssetGrid targetId={targetNodeId} onSelectedData={(data) => onSelectedData?.(data)} />
          </Suspense>
        )}
        {isDept && <TargetDeptGrid targetData={targetNodeDept} onSelectedData={(data) => onSelectedData?.(data)} />}
        {isAssetGroup && (
          <TargetDeptAssetGrid targetData={targetNodeAsset} onSelectedData={(data) => onSelectedData?.(data)} />
        )}
        {isExcepitonGroup && (
          <TargetExceptGroupGrid
            targetData={targetExceptGroup ? [targetExceptGroup] : []}
            onSelectedData={(data) => onSelectedData?.(data)}
          />
        )}
      </div>
    </div>
  );
}
