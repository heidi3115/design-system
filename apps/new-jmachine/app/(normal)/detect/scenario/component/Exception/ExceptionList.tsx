'use client';

import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ClientErrorBoundaryFallback from '../../../../../../components/ClientErrorBoundaryFallback';
import { EmployeeType } from '../../../../../../services/common/getSearchUsers';
import { DeptsType } from '../../../../../../services/common/getSearchDept';
import { ExceptionGroupsType } from '../../../../../../services/scenario/getExceptionManageGroups';
import TargetSelectDialog from '../../../../../../components/TargetSelect/TargetSelectDialog';

type ExceptionListProps = {
  scenarioType: string;
};

export function ExceptionList({ scenarioType }: ExceptionListProps) {
  const [target, setTarget] = useState<EmployeeType | DeptsType | ExceptionGroupsType | null>(null);

  return (
    <div className="h-full flex flex-col gap-2">
      <ErrorBoundary FallbackComponent={ClientErrorBoundaryFallback}>
        <div>{scenarioType}</div>
        {target && <pre className="whitespace-pre-wrap break-all">{JSON.stringify(target, null, 2)}</pre>}
        <div className="w-40 px-2">
          <TargetSelectDialog onTargetData={(data) => setTarget(data)} />
        </div>
      </ErrorBoundary>
    </div>
  );
}
