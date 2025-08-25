'use client';

import { TabItemType, Tabs } from '@common/ui';
import TargetSelectContent from './TargetSelectContent';
import { EmployeeType } from '../../services/common/getSearchUsers';
import { DeptsType } from '../../services/common/getSearchDept';
import { ExceptionGroupsType } from '../../services/scenario/getExceptionManageGroups';
import { minorCategoryValueMap } from '../../lib/mapper/minorCategoryTypeMap';
import { AssetType } from '../../services/asset/getAssets';

type TargetSelectProps = {
  targetType: string;
  onSelectedData?: (data: EmployeeType | DeptsType | ExceptionGroupsType | AssetType) => void;
};

export default function TargetSelect({ targetType, onSelectedData }: TargetSelectProps) {
  const tabs = [
    {
      value: 'user',
      label: '임직원',
      content: <TargetSelectContent type="user" onSelectedData={(data) => onSelectedData?.(data)} />,
      boxClassName: 'p-4',
      hidden: targetType !== minorCategoryValueMap.employeeTargetType,
    },
    {
      value: 'depts',
      label: '부서',
      content: <TargetSelectContent type="dept" onSelectedData={(data) => onSelectedData?.(data)} />,
      boxClassName: 'p-4',
      hidden: targetType !== minorCategoryValueMap.employeeTargetType,
    },

    {
      value: 'asset',
      label: '자산',
      content: <TargetSelectContent type="asset" onSelectedData={(data) => onSelectedData?.(data)} />,
      boxClassName: 'p-4',
      hidden: targetType !== minorCategoryValueMap.infraTargetType,
    },
    {
      value: 'assetGroup',
      label: '자산 그룹',
      content: <TargetSelectContent type="assetGroup" onSelectedData={(data) => onSelectedData?.(data)} />,
      boxClassName: 'p-4',
      hidden: targetType !== minorCategoryValueMap.infraTargetType,
    },
    {
      value: 'exception',
      label: '예외대상 그릅',
      content: (
        <TargetSelectContent
          type="exceptionGroup"
          targetType={targetType}
          onSelectedData={(data) => onSelectedData?.(data)}
        />
      ),
      boxClassName: 'p-4',
    },
  ] satisfies TabItemType;

  return (
    <Tabs
      tabs={tabs}
      defaultValue={targetType === minorCategoryValueMap.infraTargetType ? 'asset' : 'user'}
      className="pb-4 px-8"
    />
  );
}
