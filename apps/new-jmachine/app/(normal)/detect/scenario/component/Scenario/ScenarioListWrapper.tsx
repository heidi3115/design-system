'use client';

import { ComponentProps, Suspense, useState } from 'react';
import { Separator } from '@common/ui';

import { ScenarioListSearch } from './ScenarioListSearch/ScenarioListSearch';
import { GetScenariosRequest, ScenariosType } from '../../../../../../services/scenario/getScenarios';
import { ScenarioListGrid } from './ScenarioListGrid';
import PageLoading from '../../../../../../components/PageLoading';

type ScenarioListWrapperProps = {
  scenarioType: string;
  scenariosData: ScenariosType[];
} & Omit<ComponentProps<typeof ScenarioListSearch>, 'onSubmit'>;

export function ScenarioListWrapper({
  scenarioType,
  scenariosData,
  classesListData,
  scenarioSearchOptions,
  currentSecnarioParams,
}: ScenarioListWrapperProps) {
  const [params, setParams] = useState<GetScenariosRequest | null>(null);

  return (
    <>
      <ScenarioListSearch
        scenarioType={scenarioType}
        currentSecnarioParams={currentSecnarioParams}
        scenarioSearchOptions={scenarioSearchOptions}
        classesListData={classesListData}
        onSubmit={(param) => setParams(param)}
      />
      <Separator />
      <Suspense fallback={<PageLoading />}>
        <ScenarioListGrid scenarioType={scenarioType} scenariosData={scenariosData} params={params} />
      </Suspense>
    </>
  );
}
