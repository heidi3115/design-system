'use client';

import { useRef, useState } from 'react';

import { Dialog, DialogHandleRefType, Input } from '@common/ui';
import TargetSelect from './TargetSelect';
import { SearchIcon, UserFilledIcon, XIcon } from '@common/ui/icons';
import { EmployeeType } from '../../services/common/getSearchUsers';
import { DeptsType } from '../../services/common/getSearchDept';
import { ExceptionGroupsType } from '../../services/scenario/getExceptionManageGroups';

type TargetSelectDialogProps = {
  onTargetData?: (target: EmployeeType | DeptsType | ExceptionGroupsType | null) => void;
};

export default function TargetSelectDialog({ onTargetData }: TargetSelectDialogProps) {
  const [target, setTarget] = useState<EmployeeType | DeptsType | ExceptionGroupsType | null>(null);
  const dialogHandleRef = useRef<DialogHandleRefType>(null);

  const ClearTargetIcon = () => (
    <XIcon
      onClick={() => {
        setTarget(null);
        onTargetData?.(null);
      }}
      className="opacity-0 group-hover:opacity-100 cursor-pointer pointer-events-auto hover:text-current/50"
    />
  );

  return (
    <Dialog
      handleRef={dialogHandleRef}
      titleIcon={<UserFilledIcon />}
      title="대상선택"
      trigger={
        <Input
          type="button"
          iconLeft={SearchIcon}
          {...(target && { iconRight: ClearTargetIcon })}
          value={target ? ('epyeNm' in target ? target.epyeNm : 'deptNm' in target ? target.deptNm : target.name) : ''}
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
          onTargetData?.(data);
          dialogHandleRef.current?.close();
        }}
      />
    </Dialog>
  );
}
