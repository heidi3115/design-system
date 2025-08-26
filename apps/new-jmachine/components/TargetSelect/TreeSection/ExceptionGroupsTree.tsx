'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TreeView } from '@common/ui';
import {
  ExceptionGroupsType,
  getExceptionManageGroupsClientFetch,
} from '../../../services/scenario/getExceptionManageGroups';
import { minorCategoryValueMap } from '../../../lib/mapper/minorCategoryTypeMap';

type ExceptionGroupsTreeProps = {
  targetType?: string;
  onSelectedGroupData?: (data: ExceptionGroupsType) => void;
};

export default function ExceptionGroupsTree({
  targetType = minorCategoryValueMap.employeeTargetType,
  onSelectedGroupData,
}: ExceptionGroupsTreeProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['scenario', 'exceptionManagement', 'groups', targetType],
    queryFn: () => getExceptionManageGroupsClientFetch({ dttTrgTyp: targetType }),
  });

  const treeData = [
    {
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children: data.children?.map(({ children: _, ...rest }) => rest),
    },
  ];

  return (
    <div className="overflow-auto h-full">
      <TreeView
        variant="primary"
        size="small"
        showIcons
        showLineLevel={0}
        treeData={treeData}
        defaultExpandedIds={[data.id]}
        onSelectedNodes={(selectedIds) => {
          const targetId = selectedIds?.at(0);

          const targetData = data.children?.find((tree) => tree.id === targetId);

          if (targetData) {
            onSelectedGroupData?.(targetData);
          }
        }}
      />
    </div>
  );
}
