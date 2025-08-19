'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import {
  getScenariosClientFetch,
  GetScenariosRequest,
  ScenariosType,
} from '../../../../../services/scenario/getScenarios';

type ScenarioListGridProps = {
  scenarioType: 'normal' | 'complex';
  scenariosData: ScenariosType[];
  params: GetScenariosRequest | null;
};

export function ScenarioListGrid({ scenarioType, scenariosData, params }: ScenarioListGridProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['scenarioList', scenarioType, params],
    queryFn: () => getScenariosClientFetch(params!),
    initialData: params ? undefined : scenariosData,
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <pre className="whitespace-pre-wrap break-all">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
