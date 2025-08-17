import { ComponentProps, use } from 'react';
import { ScenariosType } from '../../../../../services/scenario/getScenarios';
import ClientErrorTest from './ClientErrorTest';
import { ErrorBoundary } from 'react-error-boundary';
import ClientErrorBoundaryFallback from '../../../../../components/ClientErrorBoundaryFallback';

type ScenarioListProps = {
  scenarioType: string;
  scenariosData: Promise<ScenariosType[]>;
} & ComponentProps<'div'>;

export function ScenarioList({ scenarioType, scenariosData, ...props }: ScenarioListProps) {
  const scenarioResolveData = use(scenariosData);

  return (
    <div {...props}>
      <div className="p-4 border rounded">
        <ErrorBoundary FallbackComponent={ClientErrorBoundaryFallback}>
          <ClientErrorTest />
        </ErrorBoundary>
      </div>
      <h1 className="text-4xl font-bold">{scenarioType} 시나리오 리스트 데이터</h1>
      <pre className="whitespace-pre-wrap break-all">{JSON.stringify(scenarioResolveData, null, 2)}</pre>
    </div>
  );
}
