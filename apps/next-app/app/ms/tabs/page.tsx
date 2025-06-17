'use client';

import { Tabs } from '@common/ui';
import ThemeToggle from '../../../components/ThemeToggle';

export default function TabsPage() {
  type ScenarioProps = {
    scenarioId: number;
  };

  function ScenarioList(props: ScenarioProps) {
    return <div className="bg-juiBackground-paper w-full min-h-lvh p-4">Scenario {props.scenarioId}</div>;
  }

  function ComplexScenario(props: { name: string }) {
    return <div className="bg-juiBackground-paper w-full min-h-lvh p-4">Complex {props.name}</div>;
  }

  function ExceptionManagement(props: { code: string }) {
    return <div className="bg-juiBackground-paper w-full min-h-lvh p-4">Exception {props.code}</div>;
  }

  const tabsArray = [
    {
      value: 'scenario',
      label: 'Scenario',
      component: ScenarioList,
      props: { scenarioId: 'aa', a: 'aaaa' },
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
      component: ExceptionManagement,
      props: { code: 'ERR' },
    },
    {
      value: 'tab4',
      label: '탭 4',
      content: <div className="bg-juiBackground-paper w-full min-h-lvh p-4">탭 4 컨텐츠</div>,
    },
  ];

  return (
    <div>
      <div className="sticky top-2 flex flex-row-reverse z-10">
        <ThemeToggle />
      </div>
      <div className="min-h-svh">
        <Tabs tabs={tabsArray} />
      </div>
    </div>
  );
}
