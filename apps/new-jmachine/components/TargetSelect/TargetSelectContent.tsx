'use client';

import { Suspense, useState } from 'react';

import TargetTree from './TreeSection/TargetTree';
import TargetUserGrid from './GridSection/TargetUserGrid';
import { TreeFallback } from './Fallback/TreeFallback';
import { GridFallback } from './Fallback/GridFallback';
import { EmployeeType } from '../../services/common/getSearchUsers';
import TargetDeptGrid from './GridSection/TargetDeptGrid';
import { DeptsType } from '../../services/common/getSearchDept';
import ExceptionGroupsTree from './TreeSection/ExceptionGroupsTree';
import { ExceptionGroupsType } from '../../services/scenario/getExceptionManageGroups';
import TargetExceptGroupGrid from './GridSection/TargetExceptGroupGrid';
import TargetAssetGrid from './GridSection/TargetAssetGrid';
import { AssetType } from '../../services/asset/getAssets';
import { AssetDivisionTreeType } from '../../services/asset/getDivisionTree';
import TargetDeptAssetGrid from './GridSection/TargetDeptAssetGrid';

type TargetSelectContentProps = {
  type: 'user' | 'dept' | 'exceptionGroup' | 'asset' | 'assetGroup';
  targetType?: string;
  onSelectedData?: (data: EmployeeType | DeptsType | ExceptionGroupsType | AssetType) => void;
};

export default function TargetSelectContent({ type, targetType, onSelectedData }: TargetSelectContentProps) {
  const [targetNodeId, setTargetNodeId] = useState('-1');
  const [targetNodeDept, setTargetNodeDept] = useState<DeptsType[]>([]);
  const [targetNodeAsset, setTargetNodeAsset] = useState<AssetDivisionTreeType[]>([]);
  const [targetExceptGroup, setTargetExceptGroup] = useState<ExceptionGroupsType | null>(null);

  const isUser = type === 'user';
  const isDept = type === 'dept';
  const isAsset = type === 'asset';
  const isAssetGroup = type === 'assetGroup';
  const isExcepitonGroup = type === 'exceptionGroup';

  return (
    <div className="flex gap-2 h-164 w-full">
      {/* left */}
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
          <ExceptionGroupsTree targetType={targetType} onSelectedGroupData={(data) => setTargetExceptGroup(data)} />
        )}
      </div>
      {/* right */}
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
