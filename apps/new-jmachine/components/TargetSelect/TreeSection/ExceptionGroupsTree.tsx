'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TreeView } from '@common/ui';
import {
  ExceptionGroupsType,
  getExceptionManageGroupsClientFetch,
} from '../../../services/scenario/getExceptionManageGroups';
import { minorCategoryValueMap } from '../../../lib/mapper/minorCategoryTypeMap';

type ExceptionGroupsTreeProps = {
  detectTargetType?: string;
  onSelectedGroupData?: (data: ExceptionGroupsType) => void;
};

export default function ExceptionGroupsTree({
  detectTargetType = minorCategoryValueMap.employeeTargetType,
  onSelectedGroupData,
}: ExceptionGroupsTreeProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['scenario', 'exceptionManagement', 'groups', detectTargetType],
    queryFn: () => getExceptionManageGroupsClientFetch({ dttTrgTyp: detectTargetType }),
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
        isAllLine
        treeData={treeData}
        defaultExpandAll
        quickSearchEnabled
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
