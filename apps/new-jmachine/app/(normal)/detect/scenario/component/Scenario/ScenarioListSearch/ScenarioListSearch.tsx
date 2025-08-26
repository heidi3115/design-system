'use client';

import { SubmitHandler, useController, useForm } from 'react-hook-form';

import { Button, Checkbox, MultiSelect, useConfirmDialog } from '@common/ui';
import { SearchIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils';
import { CodesType } from '../../../../../../../services/common/getMultiCodes';
import GreyPointText from '../../../../../../../components/typography/GreyPointText';
import { GetScenariosRequest } from '../../../../../../../services/scenario/getScenarios';
import { useToggleArray } from './hooks/useToggleArray';

type ScenarioListSearchProps = {
  scenarioType: 'normal' | 'complex';
  currentSecnarioParams: GetScenariosRequest;
  onSubmit: (param: GetScenariosRequest) => void;
  classesListData?: string[];
  scenarioSearchOptions?: Record<string, CodesType[]>;
};

export function ScenarioListSearch({
  scenarioType,
  classesListData,
  scenarioSearchOptions,
  currentSecnarioParams,
  onSubmit: onSetParmas,
}: ScenarioListSearchProps) {
  const { toggle } = useToggleArray();
  const { openDialog } = useConfirmDialog();

  const { handleSubmit, control } = useForm<GetScenariosRequest>({
    defaultValues: currentSecnarioParams,
  });

  const { field: riskLevelField } = useController({
    name: 'dngrGrdList',
    control,
  });

  const { field: oprSttListField } = useController({
    name: 'oprSttList',
    control,
  });

  const { field: explnCdListField } = useController({
    name: 'explnCdList',
    control,
  });

  const { field: respModeListField } = useController({
    name: 'respModeList',
    control,
  });

  const { field: scnrClsListField } = useController({
    name: 'scnrClsList',
    control,
  });

  const { field: dttTypListField } = useController({
    name: 'dttTypList',
    control,
  });

  const onSubmit: SubmitHandler<GetScenariosRequest> = (data) => onSetParmas(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
      <div
        className={cn(
          'grid gap-y-2 gap-x-7 w-full',
          scenarioType === 'complex' ? 'grid-cols-[auto_auto_auto]' : 'grid-cols-2',
        )}>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">시나리오 등급</GreyPointText>
          <div className="flex gap-1 w-full flex-nowrap items-center pl-0.5">
            {scenarioSearchOptions &&
              scenarioSearchOptions.riskLevel?.map((level) => (
                <Checkbox
                  key={level.cmcd}
                  isBox
                  label={level.cmcdNm}
                  checked={riskLevelField.value.includes(level.cmcd)}
                  onCheckedChange={(checked) => {
                    const newArray = toggle({
                      array: riskLevelField.value,
                      value: level.cmcd,
                      checked: checked === 'indeterminate' ? true : checked,
                    });

                    if (newArray.length === 0) {
                      openDialog({
                        description: `시나리오 등급을 하나 이상 선택해주세요.`,
                        footerType: 'confirm',
                      });

                      return;
                    }

                    riskLevelField.onChange(newArray);
                  }}
                  boxClassName="flex-1 min-w-fit max-w-24 basis-24"
                />
              ))}
          </div>
        </div>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">운영 상태</GreyPointText>
          <div className="flex gap-1 w-full flex-nowrap items-center pl-0.5">
            {scenarioSearchOptions &&
              scenarioSearchOptions.operationState?.map((level) => (
                <Checkbox
                  key={level.cmcd}
                  isBox
                  label={level.cmcdNm}
                  checked={oprSttListField.value.includes(level.cmcd)}
                  onCheckedChange={(checked) => {
                    const newArray = toggle({
                      array: oprSttListField.value,
                      value: level.cmcd,
                      checked: checked === 'indeterminate' ? true : checked,
                    });

                    if (newArray.length === 0) {
                      openDialog({
                        description: `운영 상태를 하나 이상 선택해주세요.`,
                        footerType: 'confirm',
                      });

                      return;
                    }

                    oprSttListField.onChange(newArray);
                  }}
                  boxClassName="flex-1 min-w-fit max-w-24 basis-24"
                />
              ))}
          </div>
        </div>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">소명 유형</GreyPointText>
          <div className="flex gap-1 w-full flex-nowrap items-center pl-0.5">
            {scenarioSearchOptions &&
              scenarioSearchOptions.requestExplanation?.map((level) => (
                <Checkbox
                  key={level.cmcd}
                  isBox
                  label={level.cmcdNm}
                  checked={explnCdListField.value.includes(level.cmcd)}
                  onCheckedChange={(checked) => {
                    const newArray = toggle({
                      array: explnCdListField.value,
                      value: level.cmcd,
                      checked: checked === 'indeterminate' ? true : checked,
                    });

                    if (newArray.length === 0) {
                      openDialog({
                        description: `소명유형 하나 이상 선택해주세요.`,
                        footerType: 'confirm',
                      });

                      return;
                    }

                    explnCdListField.onChange(newArray);
                  }}
                  boxClassName="flex-1 min-w-fit max-w-24 basis-24"
                />
              ))}
          </div>
        </div>
        <div className="flex gap-2">
          <GreyPointText className="text-xs w-24 shrink-0">대응 구분</GreyPointText>
          <div className="flex gap-1 w-full flex-wrap items-center pl-0.5">
            {scenarioSearchOptions &&
              scenarioSearchOptions.responseMode?.map((level) => (
                <Checkbox
                  key={level.cmcd}
                  isBox
                  label={level.cmcdNm}
                  checked={respModeListField.value.includes(level.cmcd)}
                  onCheckedChange={(checked) => {
                    const newArray = toggle({
                      array: respModeListField.value,
                      value: level.cmcd,
                      checked: checked === 'indeterminate' ? true : checked,
                    });

                    if (newArray.length === 0) {
                      openDialog({
                        description: `대응 구분을 하나 이상 선택해주세요.`,
                        footerType: 'confirm',
                      });

                      return;
                    }

                    respModeListField.onChange(newArray);
                  }}
                  boxClassName="flex-1 min-w-fit max-w-24 basis-24"
                />
              ))}
          </div>
        </div>
        <div className={cn('flex gap-2 items-center', scenarioType === 'complex' && 'col-span-2')}>
          <GreyPointText className="text-xs w-24 shrink-0">기본 정보</GreyPointText>
          <MultiSelect
            size="large"
            value={scnrClsListField.value}
            onValueChange={(value) => scnrClsListField.onChange(value)}
            options={
              classesListData?.map((className) => ({
                label: className,
                value: className,
              })) ?? []
            }
          />
        </div>
        {scenarioType === 'normal' && (
          <div className="flex gap-2 items-center">
            <GreyPointText className="text-xs w-24 shrink-0">탐지 형태</GreyPointText>
            <MultiSelect
              size="large"
              value={dttTypListField.value}
              onValueChange={(value) => dttTypListField.onChange(value)}
              options={
                scenarioSearchOptions?.detectionType?.map((detect) => ({
                  label: detect.cmcdNm,
                  value: detect.cmcd,
                })) ?? []
              }
            />
          </div>
        )}
      </div>
      <div className="flex items-end flex-1 basis-42 min-w-32 max-w-42">
        <Button type="submit" variant="gradient" size="large" className="w-full">
          <SearchIcon />
          검색
        </Button>
      </div>
    </form>
  );
}
