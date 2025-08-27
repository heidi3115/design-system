'use client';

import { useRef, useState } from 'react';

import { Dialog, DialogHandleRefType, Input } from '@common/ui';
import { SearchIcon, UserFilledIcon, XIcon } from '@common/ui/icons';
import { useUpdateEffect } from '@common/utils';
import TargetSelectWrapper from './TargetSelectWrapper';
import { type EmployeeType } from '../../services/common/getSearchUsers';
import { type DeptsType } from '../../services/common/getSearchDept';
import { type ExceptionGroupsType } from '../../services/scenario/getExceptionManageGroups';
import { type AssetType } from '../../services/asset/getAssets';
import { type TargetCategoryType } from './TargetSelectContent';

export type TargetEntityType = EmployeeType | DeptsType | ExceptionGroupsType | AssetType | null;

type TargetSelectDialogProps = {
  detectTargetType: string;
  targetCategory?: TargetCategoryType | TargetCategoryType[];
  onTargetData?: (target: TargetEntityType) => void;
};

export default function TargetSelectDialog({
  detectTargetType,
  targetCategory = 'user',
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
        {...(Array.isArray(targetCategory) ? { targetTabList: targetCategory } : { targetType: targetCategory })}
        onSelectedData={(data) => {
          setTarget(data);
          onTargetData?.(data);
          dialogHandleRef.current?.close();
        }}
      />
    </Dialog>
  );
}
