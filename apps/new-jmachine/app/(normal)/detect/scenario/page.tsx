import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { getClassesServerFetch } from '../../../../services/scenario/getClasses';
import { GetScenariosRequest, getScenariosServerFetch } from '../../../../services/scenario/getScenarios';
import { getMultiCodesServerFetch } from '../../../../services/common/getMultiCodes';

import { TabItemType, Tabs } from '@common/ui';
import { ScenarioList } from './component/Scenario/ScenarioList';
import PageLoading from '../../../../components/PageLoading';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import { majorCategoryValueMap } from '../../../../lib/mapper/majorCategoryTypeMap';
import { minorCategoryValueMap } from '../../../../lib/mapper/minorCategoryTypeMap';
import { ExceptionList } from './component/Exception/ExceptionList';

export default async function ScenarioPage() {
  // common data
  const [classesListData, codesData] = await Promise.all([
    getClassesServerFetch(),
    getMultiCodesServerFetch({
      pcmcdList: [
        majorCategoryValueMap.detectionTargetType,
        majorCategoryValueMap.riskLevel,
        majorCategoryValueMap.detectionType,
        majorCategoryValueMap.responseMode,
        majorCategoryValueMap.requestExplanation,
        majorCategoryValueMap.targetDivision,
        majorCategoryValueMap.operationState,
      ],
    }),
  ]);

  // code data
  // const detectionTargetTypeCodeData = codesData.filter(
  //   (data) => data.pcmcd === majorCategoryValueMap.detectionTargetType,
  // );
  const riskLevelCodeData = codesData.filter((data) => data.pcmcd === majorCategoryValueMap.riskLevel);
  const detectionTypeCodeData = codesData.filter((data) => data.pcmcd === majorCategoryValueMap.detectionType);
  const responseModeCodeData = codesData.filter((data) => data.pcmcd === majorCategoryValueMap.responseMode);
  const requestExplanationCodeData = codesData.filter(
    (data) => data.pcmcd === majorCategoryValueMap.requestExplanation,
  );
  // const targetDivisionCodeData = codesData.filter((data) => data.pcmcd === majorCategoryValueMap.targetDivision);
  const operationStateCodeData = codesData
    .filter((data) => data.pcmcd === majorCategoryValueMap.operationState)
    .filter((data) => data.cmcd !== minorCategoryValueMap.operateDispose);

  const scenarioListParam: GetScenariosRequest = {
    dngrGrdList: riskLevelCodeData.map((data) => data.cmcd),
    scnrClsList: [],
    dttTypList: [],
    respModeList: responseModeCodeData.map((data) => data.cmcd),
    explnCdList: requestExplanationCodeData.map((data) => data.cmcd),
    oprSttList: operationStateCodeData
      .filter((data) => data.cmcd === minorCategoryValueMap.operateUse)
      .map((data) => data.cmcd),
    scnrTyp: minorCategoryValueMap.singleScenarioType,
  };

  const complexScenarioListParam = {
    ...scenarioListParam,
    scnrTyp: minorCategoryValueMap.complexScenarioType,
  };

  const scenariosData = getScenariosServerFetch(scenarioListParam);
  const complexScenariosData = getScenariosServerFetch(complexScenarioListParam);

  const scenarioSearchOptions = {
    riskLevel: riskLevelCodeData,
    detectionType: detectionTypeCodeData,
    responseMode: responseModeCodeData,
    requestExplanation: requestExplanationCodeData,
    operationState: operationStateCodeData,
  };

  const tabs = [
    {
      value: 'scenario',
      label: '시나리오 관리',
      content: (
        <ScenarioList
          scenarioType="normal"
          scenariosData={scenariosData}
          currentSecnarioParams={scenarioListParam}
          classesListData={classesListData}
          scenarioSearchOptions={scenarioSearchOptions}
        />
      ),
      contentBoxType: 'inBox',
      boxClassName: 'p-8',
    },
    {
      value: 'complex',
      label: '복합 시나리오',
      content: (
        <ScenarioList
          scenarioType="complex"
          scenariosData={complexScenariosData}
          currentSecnarioParams={complexScenarioListParam}
          classesListData={classesListData}
          scenarioSearchOptions={scenarioSearchOptions}
        />
      ),
      contentBoxType: 'inBox',
      boxClassName: 'p-8',
    },
    {
      value: 'exception',
      label: '예외대상 관리',
      content: <ExceptionList scenarioType="exception" />,
      contentBoxType: 'inBox',
      boxClassName: 'p-8',
    },
  ] satisfies TabItemType;

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Suspense fallback={<PageLoading />}>
        <Tabs tabs={tabs} className="px-7" />
      </Suspense>
    </ErrorBoundary>
  );
}
