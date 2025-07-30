'use client';

import { useRef, useState, useCallback, type RefObject } from 'react';
import { format, isValid } from 'date-fns';

import { useCheckDateRangeValidity } from './hooks/useCheckDateRangeValidity';
import DatePicker from './DatePicker';

type RangeDateType = {
  start?: Date;
  end?: Date;
};

type RangeDatePickerProps = {
  range?: RangeDateType;
  onRangeChange?: (rnage: RangeDateType) => void;
  minRangeDays?: number;
  maxRangeDays?: number;
};

function RangeDatePicker({ range, onRangeChange, minRangeDays, maxRangeDays }: RangeDatePickerProps) {
  const isControlled = range !== undefined && onRangeChange !== undefined;

  const [uncontrolledStartDate, setUncontrolledStartDate] = useState<Date | undefined | 'init'>(range?.start);
  const [uncontrolledEndDate, setUncontrolledEndDate] = useState<Date | undefined | 'init'>(range?.end);

  const startDate = isControlled ? range?.start : uncontrolledStartDate;
  const endDate = isControlled ? range?.end : uncontrolledEndDate;

  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);

  const startErrorMessageRef = useRef('');
  const endErrorMessageRef = useRef('');

  const { checkDateRangeValidity } = useCheckDateRangeValidity({
    maxRange: maxRangeDays,
    minRange: minRangeDays,
  });

  const updateRange = useCallback(
    (start?: Date | 'init', end?: Date | 'init') => {
      if (!isControlled) {
        setUncontrolledStartDate(start);
        setUncontrolledEndDate(end);
      }

      const parsedStart = start === 'init' ? undefined : start;
      const parsedEnd = end === 'init' ? undefined : end;

      onRangeChange?.({ start: parsedStart, end: parsedEnd });
    },
    [isControlled, onRangeChange],
  );

  const handleStartDateChange = useCallback(
    (date?: Date) => {
      if (date) {
        const { isError, errorMessage } = checkDateRangeValidity({ target: date, compare: endDate, type: 'start' });

        if (isError) {
          setEndError(true);
          endErrorMessageRef.current = errorMessage ?? '';
          updateRange(date, 'init');
        } else {
          setEndError(false);
          endErrorMessageRef.current = '';
          updateRange(date, endDate);
        }
      }

      setStartError(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endDate, updateRange],
  );

  const handleEndDateChange = useCallback(
    (date?: Date) => {
      if (date) {
        const { isError, errorMessage } = checkDateRangeValidity({ target: date, compare: startDate, type: 'end' });

        if (isError) {
          setStartError(true);
          startErrorMessageRef.current = errorMessage ?? '';
          updateRange('init', date);
        } else {
          setStartError(false);
          startErrorMessageRef.current = '';
          updateRange(startDate, date);
        }
      }

      setEndError(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate, updateRange],
  );

  const getDateValidation = ({
    target,
    compare,
    type,
    setErrorMessageRef,
  }: {
    target: Date;
    compare: Date | undefined | 'init';
    type: 'start' | 'end';
    setErrorMessageRef: RefObject<string>;
  }): boolean => {
    const { isError, errorMessage } = checkDateRangeValidity({
      target,
      compare,
      type,
    });

    setErrorMessageRef.current = errorMessage ?? '';

    return isError;
  };

  return (
    <div className="flex gap-2 items-center">
      <DatePicker
        date={startDate}
        onDateChange={handleStartDateChange}
        onConditionRequestCallback={(condDate) =>
          getDateValidation({
            target: condDate,
            compare: endDate,
            type: 'start',
            setErrorMessageRef: startErrorMessageRef,
          })
        }
        conditionContent={(condDate) => (
          <span className="text-xs">
            {startErrorMessageRef.current}
            <br />
            {condDate && (
              <>
                {format(condDate, 'yyyy-MM-dd')} 선택하면 <br />
                종료시간이 없어 집니다.
              </>
            )}
            <br />
            {startDate instanceof Date && isValid(startDate) && <>취소시 {format(startDate, 'yyyy-MM-dd')} 유지</>}
          </span>
        )}
        placeholder="시작 날짜 선택"
        inputProps={{
          error: startError,
          helperText: startError && startErrorMessageRef.current,
        }}
        calendarProps={{
          modifiers: {
            against: (date: Date) =>
              getDateValidation({
                target: date,
                compare: endDate,
                type: 'start',
                setErrorMessageRef: startErrorMessageRef,
              }),
          },
          modifiersClassNames: {
            against: 'text-juiText-secondary',
          },
        }}
      />
      <span>~</span>
      <DatePicker
        date={endDate}
        onDateChange={handleEndDateChange}
        onConditionRequestCallback={(condDate) =>
          getDateValidation({
            target: condDate,
            compare: startDate,
            type: 'end',
            setErrorMessageRef: endErrorMessageRef,
          })
        }
        conditionContent={(condDate) => (
          <span className="text-xs">
            {endErrorMessageRef.current}
            <br />
            {condDate && (
              <>
                {format(condDate, 'yyyy-MM-dd')} 선택하면 <br />
                시작시간이 없어집니다.
              </>
            )}
            <br />
            {endDate instanceof Date && isValid(endDate) && <>취소시 {format(endDate, 'yyyy-MM-dd')} 유지</>}
          </span>
        )}
        placeholder="종료 날짜 선택"
        inputProps={{
          error: endError,
          helperText: endError && endErrorMessageRef.current,
        }}
        calendarProps={{
          modifiers: {
            against: (date: Date) =>
              getDateValidation({
                target: date,
                compare: startDate,
                type: 'end',
                setErrorMessageRef: endErrorMessageRef,
              }),
          },
          modifiersClassNames: {
            against: 'text-juiText-secondary',
          },
        }}
      />
    </div>
  );
}

export default RangeDatePicker;
