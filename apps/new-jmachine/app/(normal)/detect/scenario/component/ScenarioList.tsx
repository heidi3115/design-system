import { ComponentProps, use } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ScenariosType } from '../../../../../services/scenario/getScenarios';
import ClientErrorBoundaryFallback from '../../../../../components/ClientErrorBoundaryFallback';
import { ScenarioListSearch } from './ScenarioListSearch';
import { Separator } from '@common/ui';

type ScenarioListProps = {
  scenarioType: string;
  scenariosData: Promise<ScenariosType[]>;
} & ComponentProps<typeof ScenarioListSearch> &
  ComponentProps<'div'>;

export function ScenarioList({
  scenarioType,
  scenariosData,
  classesListData,
  scenarioSearchOptions,
  ...props
}: ScenarioListProps) {
  const scenarioResolveData = use(scenariosData);

  return (
    <div {...props} className="h-full  flex flex-col gap-2">
      <ErrorBoundary FallbackComponent={ClientErrorBoundaryFallback}>
        <ScenarioListSearch
          scenarioType={scenarioType}
          scenarioSearchOptions={scenarioSearchOptions}
          classesListData={classesListData}
        />
      </ErrorBoundary>
      <Separator />
      <div className="w-full flex-1 overflow-y-auto">
        <pre className="whitespace-pre-wrap break-all">{JSON.stringify(scenarioResolveData, null, 2)}</pre>
      </div>
    </div>
  );
}
