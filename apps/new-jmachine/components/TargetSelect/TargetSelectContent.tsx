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

type TargetSelectContentProps = {
  type: 'user' | 'dept' | 'exceptionGroup';
  onSelectedData?: (data: EmployeeType | DeptsType | ExceptionGroupsType) => void;
};

export default function TargetSelectContent({ type, onSelectedData }: TargetSelectContentProps) {
  const [targetNodeId, setTargetNodeId] = useState('-1');
  const [targetNodeDept, setTargetNodeDept] = useState<DeptsType[]>([]);
  const [targetExceptGroup, setTargetExceptGroup] = useState<ExceptionGroupsType | null>(null);

  const isUser = type === 'user';
  const isDept = type === 'dept';
  const isExcepitonGroup = type === 'exceptionGroup';

  return (
    <div className="flex gap-2 h-164 w-full">
      <div className="w-60 p-2 bg-juiBackground-paper shrink-0">
        {(isUser || isDept) && (
          <Suspense fallback={<TreeFallback />}>
            <TargetTree
              type={type}
              {...(isUser && { onSelectedNodeId: (id) => setTargetNodeId(id) })}
              {...(isDept && { onSelectedNode: (data) => setTargetNodeDept(data) })}
            />
          </Suspense>
        )}
        {isExcepitonGroup && <ExceptionGroupsTree onSelectedGroupData={(data) => setTargetExceptGroup(data)} />}
      </div>
      <div className="flex-1 overflow-x-auto">
        {isUser && (
          <Suspense fallback={<GridFallback />}>
            <TargetUserGrid targetId={targetNodeId} onSelectedData={(data) => onSelectedData?.(data)} />
          </Suspense>
        )}
        {isDept && <TargetDeptGrid targetData={targetNodeDept} onSelectedData={(data) => onSelectedData?.(data)} />}
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
