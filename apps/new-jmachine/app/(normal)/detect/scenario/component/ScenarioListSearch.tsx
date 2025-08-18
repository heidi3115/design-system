'use client';

import { Button, Checkbox, MultiSelect } from '@common/ui';
import { CodesType } from '../../../../../services/common/getMultiCodes';
import { SearchIcon } from '@common/ui/icons';
import GreyPointText from '../../../../../components/typography/GreyPointText';

type ScenarioListSearchProps = {
  scenarioType: 'normal' | 'complex';
  classesListData?: string[];
  scenarioSearchOptions?: Record<string, CodesType[]>;
};

export function ScenarioListSearch({ classesListData, scenarioSearchOptions }: ScenarioListSearchProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-5">
      <div className="grid grid-cols-2 gap-y-2 gap-x-7">
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">시나리오 등급</GreyPointText>
          <div className="flex gap-1 flex-wrap items-center">
            {scenarioSearchOptions &&
              scenarioSearchOptions.riskLevel?.map((level) => (
                <Checkbox key={level.cmcd} isBox label={level.cmcdNm} boxClassName="flex-1 w-24 min-w-fit" />
              ))}
          </div>
        </div>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">운영 상태</GreyPointText>
          <div className="flex gap-1 flex-wrap items-center">
            {scenarioSearchOptions &&
              scenarioSearchOptions.operationState?.map((level) => (
                <Checkbox key={level.cmcd} isBox label={level.cmcdNm} boxClassName="flex-1 min-w-fit w-24" />
              ))}
          </div>
        </div>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">소명 유형</GreyPointText>
          <div className="flex gap-1 flex-wrap items-center">
            {scenarioSearchOptions &&
              scenarioSearchOptions.requestExplanation?.map((level) => (
                <Checkbox key={level.cmcd} isBox label={level.cmcdNm} boxClassName="flex-1 min-w-fit w-24" />
              ))}
          </div>
        </div>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">대응 구분</GreyPointText>
          <div className="flex gap-1 flex-wrap items-center">
            {scenarioSearchOptions &&
              scenarioSearchOptions.responseMode?.map((level) => (
                <Checkbox key={level.cmcd} isBox label={level.cmcdNm} boxClassName="flex-1 min-w-fit w-24" />
              ))}
          </div>
        </div>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">기본 정보</GreyPointText>
          <MultiSelect
            size="large"
            isAddNewItem
            options={
              classesListData?.map((className) => ({
                label: className,
                value: className,
              })) ?? []
            }
          />
        </div>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">탐지 형태</GreyPointText>
          <MultiSelect
            size="large"
            options={
              scenarioSearchOptions?.detectionType?.map((detect) => ({
                label: detect.cmcdNm,
                value: detect.cmcd,
              })) ?? []
            }
          />
        </div>
      </div>
      <div className="flex items-end w-42">
        <Button variant="gradient" size="large" className="w-full">
          <SearchIcon />
          검색
        </Button>
      </div>
    </div>
  );
}
