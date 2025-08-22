'use client';

import { Suspense, useState } from 'react';

import TargetTree from './TargetTree';
import TargetUserGrid from './TargetUserGrid';
import { TreeFallback } from './Fallback/TreeFallback';
import { GridFallback } from './Fallback/GridFallback';
import { EmployeeType } from '../../services/common/getSearchUsers';
import TargetDeptGrid from './TargetDeptGrid';
import { DeptsType } from '../../services/common/getSearchDept';

type TargetSelectContentProps = {
  type: 'user' | 'dept';
  onSelectedData?: (data: EmployeeType | DeptsType) => void;
};

export default function TargetSelectContent({ type, onSelectedData }: TargetSelectContentProps) {
  const [targetNodeId, setTargetNodeId] = useState('-1');
  const [targetNodeDept, setTargetNodeDept] = useState<DeptsType[]>([]);

  return (
    <div className="flex gap-2 h-164 w-full">
      <div className="w-60 p-2 bg-juiBackground-paper shrink-0">
        <Suspense fallback={<TreeFallback />}>
          <TargetTree
            type={type}
            {...(type === 'user' && { onSelectedNodeId: (id) => setTargetNodeId(id) })}
            {...(type === 'dept' && { onSelectedNode: (data) => setTargetNodeDept(data) })}
          />
        </Suspense>
      </div>
      <div className="flex-1 overflow-x-auto">
        {type === 'user' && (
          <Suspense fallback={<GridFallback />}>
            <TargetUserGrid targetId={targetNodeId} onSelectedData={(data) => onSelectedData?.(data)} />
          </Suspense>
        )}
        {type === 'dept' && (
          <Suspense fallback={<GridFallback />}>
            <TargetDeptGrid targetData={targetNodeDept} onSelectedData={(data) => onSelectedData?.(data)} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
