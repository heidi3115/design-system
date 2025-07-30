'use client';

import { format, isValid } from 'date-fns';

type DefaultConfirmAlertProps = {
  type: 'start' | 'end';
  condDate?: Date;
  errorMessage: string;
  selectedDate?: Date | 'init';
};

export function DefaultConfirmAlert({ type, condDate, errorMessage, selectedDate }: DefaultConfirmAlertProps) {
  return (
    <span className="text-xs text-center p-4">
      {errorMessage}
      <br />
      {condDate && (
        <>
          {format(condDate, 'yyyy-MM-dd')}을 선택하면 <br />
          {type === 'start' ? '종료시간이 삭제 됩니다.' : '시작시간이 삭제 됩니다.'}
        </>
      )}
      <br />
      {selectedDate instanceof Date && isValid(selectedDate) && <>취소시 {format(selectedDate, 'yyyy-MM-dd')} 유지</>}
    </span>
  );
}
