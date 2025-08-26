'use client';

import { useRef, useState } from 'react';

import { Dialog, DialogHandleRefType, Input } from '@common/ui';
import { SearchIcon, UserFilledIcon, XIcon } from '@common/ui/icons';
import { useUpdateEffect } from '@common/utils';
import { EmployeeType } from '../../services/common/getSearchUsers';
import { DeptsType } from '../../services/common/getSearchDept';
import { ExceptionGroupsType } from '../../services/scenario/getExceptionManageGroups';
import { minorCategoryValueMap } from '../../lib/mapper/minorCategoryTypeMap';
import { AssetType } from '../../services/asset/getAssets';
import TargetSelectWrapper from './TargetSelectWrapper';
import { TargetCategoryType } from './TargetSelectContent';

const TABS_MAP: Record<string, TargetCategoryType[]> = {
  [minorCategoryValueMap.employeeTargetType]: ['user', 'depts', 'exceptionGroup'],
  [minorCategoryValueMap.infraTargetType]: ['asset', 'assetGroup', 'exceptionGroup'],
} as const;

export type TargetEntityType = EmployeeType | DeptsType | ExceptionGroupsType | AssetType | null;

type TargetSelectDialogProps = {
  detectTargetType: string;
  onTargetData?: (target: TargetEntityType) => void;
};

export default function TargetSelectDialog({
  detectTargetType = minorCategoryValueMap.employeeTargetType,
  onTargetData,
}: TargetSelectDialogProps) {
  const [target, setTarget] = useState<TargetEntityType>(null);
  const dialogHandleRef = useRef<DialogHandleRefType>(null);

  const getTargetLabel = (labelTarget: TargetEntityType): string => {
    if (!labelTarget) return '';

    if ('epyeNm' in labelTarget) return labelTarget.epyeNm;
    if ('deptNm' in labelTarget) return labelTarget.deptNm;
    if ('asstNm' in labelTarget) return labelTarget.asstNm;
    if ('name' in labelTarget) return labelTarget.name;

    return '';
  };

  const ClearTargetIcon = () => (
    <XIcon
      onClick={() => {
        setTarget(null);
        onTargetData?.(null);
      }}
      className="opacity-0 group-hover:opacity-100 cursor-pointer pointer-events-auto hover:text-current/50"
    />
  );

  useUpdateEffect(() => {
    if (detectTargetType) {
      setTarget(null);
    }
  }, [detectTargetType]);

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
          value={getTargetLabel(target)}
          className="group"
        />
      }
      contentSize="large"
      className="w-320"
      buttons={['cancel']}
      isDraggable>
      <TargetSelectWrapper
        detectTargetType={detectTargetType}
        targetTabList={TABS_MAP[detectTargetType]}
        onSelectedData={(data) => {
          setTarget(data);
          onTargetData?.(data);
          dialogHandleRef.current?.close();
        }}
      />
    </Dialog>
  );
}
