import { ComponentProps, use } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ScenariosType } from '../../../../../../services/scenario/getScenarios';
import ClientErrorBoundaryFallback from '../../../../../../components/ClientErrorBoundaryFallback';
import { ScenarioListSearch } from './ScenarioListSearch/ScenarioListSearch';
import { ScenarioListWrapper } from './ScenarioListWrapper';

type ScenarioListProps = {
  scenarioType: string;
  scenariosData: Promise<ScenariosType[]>;
} & Omit<ComponentProps<typeof ScenarioListSearch>, 'onSubmit'>;

export function ScenarioList({
  scenarioType,
  scenariosData,
  classesListData,
  scenarioSearchOptions,
  currentSecnarioParams,
}: ScenarioListProps) {
  const scenarioResolveData = use(scenariosData);

  return (
    <div className="h-full flex flex-col gap-2">
      <ErrorBoundary FallbackComponent={ClientErrorBoundaryFallback}>
        <ScenarioListWrapper
          scenarioType={scenarioType}
          currentSecnarioParams={currentSecnarioParams}
          scenarioSearchOptions={scenarioSearchOptions}
          classesListData={classesListData}
          scenariosData={scenarioResolveData}
        />
      </ErrorBoundary>
    </div>
  );
}
