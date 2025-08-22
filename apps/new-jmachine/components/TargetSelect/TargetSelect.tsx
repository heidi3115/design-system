'use client';

import { TabItemType, Tabs } from '@common/ui';
import TargetSelectContent from './TargetSelectContent';
import { EmployeeType } from '../../services/common/getSearchUsers';

type TargetSelectProps = {
  onSelectedData?: (data: EmployeeType) => void;
};

export default function TargetSelect({ onSelectedData }: TargetSelectProps) {
  const tabs = [
    {
      value: 'user',
      label: '임직원',
      content: <TargetSelectContent onSelectedData={(data) => onSelectedData?.(data)} />,
      boxClassName: 'p-4',
    },
    {
      value: 'depts',
      label: '부서',
      content: <TargetSelectContent onSelectedData={(data) => onSelectedData?.(data)} />,
      boxClassName: 'p-4',
    },
  ] satisfies TabItemType;

  return <Tabs tabs={tabs} className="pb-4 px-8" />;
}
