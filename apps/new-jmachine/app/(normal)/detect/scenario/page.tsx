import { TabItemType, Tabs } from '@common/ui';
import { ScenarioList } from './component/ScenarioList';
import { getScenariosServerFetch } from '../../../../services/scenario/getScenarios';
import { Suspense } from 'react';
import PageLoading from '../../../../components/PageLoading';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';

export default function ScenarioPage() {
  const scenariosData = getScenariosServerFetch({
    dngrGrdList: ['012001', '012002', '012003', '012004', '012005'],
    scnrClsList: [],
    dttTypList: [],
    respModeList: ['013001', '013002'],
    explnCdList: ['044001', '044002', '044003'],
    oprSttList: ['014001'],
    scnrTyp: '112001',
  });

  const complexScenariosData = getScenariosServerFetch({
    dngrGrdList: ['012001', '012002', '012003', '012004', '012005'],
    scnrClsList: [],
    dttTypList: [],
    respModeList: ['013001', '013002'],
    explnCdList: ['044001', '044002', '044003'],
    oprSttList: ['014001'],
    scnrTyp: '112002',
  });

  const tabs = [
    {
      value: 'scenario',
      label: '시나리오 관리',
      content: <ScenarioList scenarioType="Normal" scenariosData={scenariosData} />,
      contentBoxType: 'inBox',
      boxClassName: 'p-8',
    },
    {
      value: 'complex',
      label: '복합 시나리오',
      content: <ScenarioList className="p-4" scenarioType="Complex" scenariosData={complexScenariosData} />,
      contentBoxType: 'box',
    },
    {
      value: 'complex2',
      label: '복합 시나리오2',
      content: <ScenarioList className="p-4" scenarioType="Complex" scenariosData={complexScenariosData} />,
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
