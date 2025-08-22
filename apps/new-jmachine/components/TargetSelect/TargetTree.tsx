'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TreeView } from '@common/ui';
import { DeptsType, getSearchDeptClientFetch } from '../../services/common/getSearchDept';
import { useSetDeptTreeData } from './hooks/useSetDeptTreeData';

type TargetTreeProps = {
  type?: 'user' | 'dept';
  onSelectedNodeId?: (id: string) => void;
  onSelectedNode?: (data: DeptsType[]) => void;
};

export default function TargetTree({ type = 'user', onSelectedNodeId, onSelectedNode }: TargetTreeProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['seach', 'depts'],
    queryFn: () => getSearchDeptClientFetch(),
  });

  const treeData = useSetDeptTreeData(data);

  return (
    <div className="overflow-auto h-full">
      <TreeView
        variant="primary"
        size="small"
        showIcons
        treeData={treeData}
        onSelectedNodes={(selectedIds) => {
          const targetId = selectedIds?.at(0);
          const targetData = data.filter((tree) => tree.deptCd === targetId || tree.pdeptCd === targetId);

          if (type === 'user' && targetId) {
            onSelectedNodeId?.(targetId);
          }

          if (type === 'dept' && targetData) {
            onSelectedNode?.(targetData);
          }
        }}
      />
    </div>
  );
}
