'use client';

import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { RadioGroup } from '@common/ui';
import ClientErrorBoundaryFallback from '../../../../../../components/ClientErrorBoundaryFallback';
import TargetSelectDialog, {
  type TargetEntityType,
} from '../../../../../../components/TargetSelect/TargetSelectDialog';
import { minorCategoryValueMap } from '../../../../../../lib/mapper/minorCategoryTypeMap';
import { type TargetCategoryType } from '../../../../../../components/TargetSelect/TargetSelectContent';

const TABS_MAP: Record<string, TargetCategoryType[]> = {
  [minorCategoryValueMap.employeeTargetType]: ['user', 'depts', 'exceptionGroup'],
  [minorCategoryValueMap.infraTargetType]: ['asset', 'assetGroup', 'exceptionGroup'],
} as const;

type ExceptionListProps = {
  scenarioType: string;
};

export function ExceptionList({ scenarioType }: ExceptionListProps) {
  const [detectTargetType, setDetectTargetType] = useState<string>(minorCategoryValueMap.employeeTargetType);
  const [target, setTarget] = useState<TargetEntityType>(null);

  return (
    <div className="h-full flex flex-col gap-2">
      <ErrorBoundary FallbackComponent={ClientErrorBoundaryFallback}>
        <div>{scenarioType}</div>

        {target && <pre className="whitespace-pre-wrap break-all">{JSON.stringify(target, null, 2)}</pre>}
        <div className="flex gap-4">
          <RadioGroup
            direction="horizontal"
            defaultValue={detectTargetType}
            onValueChange={(value) => {
              setDetectTargetType(value);
              setTarget(null);
            }}
            options={[
              {
                label: '임직원',
                value: minorCategoryValueMap.employeeTargetType,
              },
              {
                label: '인프라',
                value: minorCategoryValueMap.infraTargetType,
              },
            ]}
          />
          <div className="w-72">
            <TargetSelectDialog
              targetCategory={TABS_MAP[detectTargetType]}
              detectTargetType={detectTargetType}
              onTargetData={(data) => setTarget(data)}
            />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
