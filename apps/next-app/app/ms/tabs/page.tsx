'use client';

import { Separator, Skeleton, Tabs, type TabItemType } from '@common/ui';
import ThemeToggle from '../../../components/ThemeToggle';
import { useState } from 'react';
import { PlayIcon } from '@common/ui/icons';

export default function TabsPage() {
  function ScenarioList(props: { scenarioId: number }) {
    return <div className="bg-juiBackground-paper w-full min-h-lvh p-4">Scenario {props.scenarioId}</div>;
  }

  type ComplexScenarioProps = {
    name: string;
  };

  function ComplexScenario(props: ComplexScenarioProps) {
    return <div className="bg-juiBackground-paper w-full min-h-lvh p-4">Complex {props.name}</div>;
  }

  const [acitveTab, setActiveTab] = useState('');

  const tabsArray: TabItemType<typeof ScenarioList | typeof ComplexScenario> = [
    {
      value: 'scenario',
      label: 'Scenario',
      component: ScenarioList,
      props: { scenarioId: 1 },
    },
    {
      value: 'complex',
      label: 'Complex',
      component: ComplexScenario,
      props: { name: 'Test' },
    },
    {
      value: 'exception',
      label: 'Exception',
    },
    {
      value: 'target',
      label: 'Targetㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
    },
    {
      value: 'tab4',
      label: '탭 4',
      content: <div className="bg-juiBackground-paper w-full p-4">탭 4 컨텐츠</div>,
    },
    {
      value: 'tab5',
      disabled: true,
      label: (
        <div className="flex gap-1">
          <PlayIcon />탭 5
        </div>
      ),
      content: <ScenarioList scenarioId={3} />,
    },
  ];

  return (
    <div className="p-5">
      <div className="absolute top-2 right-1 flex flex-row-reverse z-10">
        <ThemeToggle />
      </div>

      <div className="min-h-full">
        <Tabs
          defaultValue="target"
          // align="center"
          // size="small"
          // variant="secondary"
          // shape="text"
          // shape="folder"
          tabs={tabsArray}
          // maxWidth={100}
          // align="full"
          onValueChange={(val) => setActiveTab(val)}
        />
        {acitveTab === 'exception' && <div className="bg-juiBackground-paper w-full min-h-lvh p-4">Exception</div>}
        {acitveTab === 'target' && (
          <div className="bg-juiBackground-paper w-full p-4">
            Target
            <Separator orientation="horizontal" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-16 h-3" />
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-full h-72" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
