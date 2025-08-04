'use client';

import { type ComponentProps } from 'react';

import DatePicker from '../DatePicker';
import { format, isValid } from 'date-fns';

type DefaultConfirmAlertProps = {
  type: 'start' | 'end';
  condDate?: Date;
  errorMessage: string;
  selectedDate?: Date | 'init';
  timeType?: ComponentProps<typeof DatePicker>['timeType'];
};

export function DefaultConfirmAlert({
  type,
  condDate,
  errorMessage,
  selectedDate,
  timeType = 'date',
}: DefaultConfirmAlertProps) {
  const timeTypeFormatMap: Record<typeof timeType, string> = {
    date: 'yyyy-MM-dd',
    hour: 'yyyy-MM-dd HH:00',
    minute: 'yyyy-MM-dd HH:mm',
    second: 'yyyy-MM-dd HH:mm:ss',
  };

  const timeTypeFormat = timeTypeFormatMap[timeType];

  return (
    <span className="text-xs text-center p-4">
      {errorMessage}
      <br />
      {condDate && (
        <>
          {format(condDate, timeTypeFormat)}을 선택하면 <br />
          {type === 'start' ? '종료시간이 삭제 됩니다.' : '시작시간이 삭제 됩니다.'}
        </>
      )}
      <br />
      {selectedDate instanceof Date && isValid(selectedDate) && <>취소시 {format(selectedDate, timeTypeFormat)} 유지</>}
    </span>
  );
}
