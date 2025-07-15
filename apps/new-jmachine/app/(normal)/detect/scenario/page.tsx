import { Tabs } from '@common/ui';
import { ScenarioList } from '../component/ScenarioList';
import { getScenariosServerFetch } from '../../../../services/scenario/getScenarios';

export default async function ScenarioPage() {
  const scenariosData = await getScenariosServerFetch({
    dngrGrdList: ['012001', '012002', '012003', '012004', '012005'],
    scnrClsList: [],
    dttTypList: [],
    respModeList: ['013001', '013002'],
    explnCdList: ['044001', '044002', '044003'],
    oprSttList: ['014001'],
    scnrTyp: '112001',
  });

  const complexScenariosData = await getScenariosServerFetch({
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
      isFullHeight: true,
    },
    {
      value: 'complex',
      label: '복합 시나리오',
      content: <ScenarioList scenarioType="Complex" scenariosData={complexScenariosData} />,
      isFullHeight: true,
    },
  ];

  return <Tabs tabs={tabs} className="px-7" />;
}
