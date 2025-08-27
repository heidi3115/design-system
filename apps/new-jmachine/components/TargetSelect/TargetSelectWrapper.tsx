'use client';

import { TabItemType, Tabs } from '@common/ui';
import TargetSelectContent, { TargetCategoryType } from './TargetSelectContent';
import { type TargetEntityType } from './TargetSelectDialog';

type TargetSelectBaseProps = {
  detectTargetType: string;
  onSelectedData?: (data: TargetEntityType) => void;
};

type TargetSelectProps = OnlyOne<{ targetTabList: TargetCategoryType[] }, { targetType: TargetCategoryType }> &
  TargetSelectBaseProps;

export default function TargetSelectWrapper({
  targetType,
  targetTabList,
  detectTargetType,
  onSelectedData,
}: TargetSelectProps) {
  if (targetType) {
    return <TargetSelectContent type={targetType} onSelectedData={(data) => onSelectedData?.(data)} />;
  }

  const allTabs = [
    {
      value: 'user',
      label: '임직원',
      content: <TargetSelectContent type="user" onSelectedData={(data) => onSelectedData?.(data)} />,
    },
    {
      value: 'depts',
      label: '부서',
      content: <TargetSelectContent type="depts" onSelectedData={(data) => onSelectedData?.(data)} />,
    },
    {
      value: 'asset',
      label: '자산',
      content: <TargetSelectContent type="asset" onSelectedData={(data) => onSelectedData?.(data)} />,
    },
    {
      value: 'assetGroup',
      label: '자산 그룹',
      content: <TargetSelectContent type="assetGroup" onSelectedData={(data) => onSelectedData?.(data)} />,
    },
    {
      value: 'exceptionGroup',
      label: '예외대상 그릅',
      content: (
        <TargetSelectContent
          type="exceptionGroup"
          detectTargetType={detectTargetType}
          onSelectedData={(data) => onSelectedData?.(data)}
        />
      ),
    },
  ] satisfies TabItemType;

  const tabs = allTabs.filter((tab): tab is (typeof allTabs)[number] & { value: TargetCategoryType } =>
    targetTabList.includes(tab.value as TargetCategoryType),
  );

  return <Tabs tabs={tabs} className="pb-4 px-8" restScreenHeight={266} />;
}
