'use client';

import { Suspense, useState } from 'react';

import TargetTree from './TargetTree';
import TargetGrid from './TargetGrid';
import { TreeFallback } from './Fallback/TreeFallback';
import { GridFallback } from './Fallback/GridFallback';
import { EmployeeType } from '../../services/common/getSearchUsers';

type TargetSelectContentProps = {
  onSelectedData?: (data: EmployeeType) => void;
};

export default function TargetSelectContent({ onSelectedData }: TargetSelectContentProps) {
  const [targetNodeId, setTargetNodeId] = useState('-1');

  return (
    <div className="flex gap-2 h-164 w-full">
      <div className="w-60 p-2 bg-juiBackground-paper shrink-0">
        <Suspense fallback={<TreeFallback />}>
          <TargetTree onSelectedNodeId={(id) => setTargetNodeId(id)} />
        </Suspense>
      </div>
      <div className="flex-1 overflow-x-auto">
        <Suspense fallback={<GridFallback />}>
          <TargetGrid targetId={targetNodeId} onSelectedData={(data) => onSelectedData?.(data)} />
        </Suspense>
      </div>
    </div>
  );
}
