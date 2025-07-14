import { ScenariosType } from '../../../../services/scenario/getScenarios';

type ScenarioListProps = {
  scenarioType: string;
  scenariosData: ScenariosType[];
};

export function ScenarioList({ scenarioType, scenariosData }: ScenarioListProps) {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{scenarioType} 시나리오 리스트 데이터</h1>
      <pre className="whitespace-pre-wrap break-all p-4 rounded">{JSON.stringify(scenariosData, null, 2)}</pre>
    </div>
  );
}
