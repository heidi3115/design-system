import { ComponentProps } from 'react';
import { ScenariosType } from '../../../../services/scenario/getScenarios';

type ScenarioListProps = {
  scenarioType: string;
  scenariosData: ScenariosType[];
} & ComponentProps<'div'>;

export function ScenarioList({ scenarioType, scenariosData, ...props }: ScenarioListProps) {
  return (
    <div {...props}>
      <h1 className="text-4xl font-bold">{scenarioType} 시나리오 리스트 데이터</h1>
      <pre className="whitespace-pre-wrap break-all">{JSON.stringify(scenariosData, null, 2)}</pre>
    </div>
  );
}
