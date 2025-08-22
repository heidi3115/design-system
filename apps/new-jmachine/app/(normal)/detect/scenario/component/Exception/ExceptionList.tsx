'use client';

import { useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Dialog, DialogHandleRefType, Input } from '@common/ui';
import { SearchIcon, UserPlusIcon, XIcon } from '@common/ui/icons';
import ClientErrorBoundaryFallback from '../../../../../../components/ClientErrorBoundaryFallback';
import TargetSelect from '../../../../../../components/TargetSelect/TargetSelect';
import { EmployeeType } from '../../../../../../services/common/getSearchUsers';

type ExceptionListProps = {
  scenarioType: string;
};

export function ExceptionList({ scenarioType }: ExceptionListProps) {
  const [target, setTarget] = useState<EmployeeType | null>(null);
  const dialogHandleRef = useRef<DialogHandleRefType>(null);

  const ClearTargetIcon = () => (
    <XIcon
      onClick={() => setTarget(null)}
      className="opacity-0 group-hover:opacity-100 cursor-pointer pointer-events-auto hover:text-current/50"
    />
  );

  return (
    <div className="h-full flex flex-col gap-2">
      <ErrorBoundary FallbackComponent={ClientErrorBoundaryFallback}>
        <div>{scenarioType}</div>
        {target && <pre className="whitespace-pre-wrap break-all">{JSON.stringify(target, null, 2)}</pre>}
        <div className="w-40 px-2">
          <Dialog
            handleRef={dialogHandleRef}
            titleIcon={<UserPlusIcon />}
            title="대상선택"
            trigger={
              <Input
                type="button"
                iconLeft={SearchIcon}
                {...(target && { iconRight: ClearTargetIcon })}
                value={target?.epyeNm}
                className="group"
              />
            }
            contentSize="large"
            className="w-320"
            buttons={['cancel']}
            isDraggable>
            <TargetSelect
              onSelectedData={(data) => {
                setTarget(data);
                dialogHandleRef.current?.close();
              }}
            />
          </Dialog>
        </div>
      </ErrorBoundary>
    </div>
  );
}
