'use client';

import { TabItemType, Tabs } from '@common/ui';
import TargetSelectContent from './TargetSelectContent';
import { EmployeeType } from '../../services/common/getSearchUsers';
import { DeptsType } from '../../services/common/getSearchDept';

type TargetSelectProps = {
  onSelectedData?: (data: EmployeeType | DeptsType) => void;
};

export default function TargetSelect({ onSelectedData }: TargetSelectProps) {
  const tabs = [
    {
      value: 'user',
      label: '임직원',
      content: <TargetSelectContent type="user" onSelectedData={(data) => onSelectedData?.(data)} />,
      boxClassName: 'p-4',
    },
    {
      value: 'depts',
      label: '부서',
      content: <TargetSelectContent type="dept" onSelectedData={(data) => onSelectedData?.(data)} />,
      boxClassName: 'p-4',
    },
  ] satisfies TabItemType;

  return <Tabs tabs={tabs} className="pb-4 px-8" />;
}
