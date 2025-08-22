'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TreeView } from '@common/ui';
import { getSearchDeptClientFetch } from '../../services/common/getSearchDept';
import { useSetDeptTreeData } from './hooks/useSetDeptTreeData';

type TargetTreeProps = {
  onSelectedNodeId?: (id: string) => void;
};

export default function TargetTree({ onSelectedNodeId }: TargetTreeProps) {
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

          if (targetId) {
            onSelectedNodeId?.(targetId);
          }
        }}
      />
    </div>
  );
}
