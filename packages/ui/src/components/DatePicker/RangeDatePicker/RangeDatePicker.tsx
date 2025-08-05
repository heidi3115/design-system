'use client';

import {
  useRef,
  useState,
  useCallback,
  type ComponentProps,
  type RefObject,
  type ReactNode,
  type CSSProperties,
} from 'react';

import { Label, Button } from '../../../components';
import { useCheckDateRangeValidity } from '../hooks/useCheckDateRangeValidity';
import { DefaultConfirmAlert } from './DefaultConfirmAlert';
import DatePicker from '../DatePicker';
import { cn } from '@common/ui/lib/utils';

const OPPOSITE_SIGN_DEFAULT_CLASSNAME =
  'relative [&[data-slot=button]::after]:absolute [&[data-slot=button]::after]:top-full [&[data-slot=button]::after]:left-1/2 [&[data-slot=button]::after]:-translate-x-1/2 [&[data-slot=button]::after]:-translate-y-full [&[data-slot=button]::after]:text-[8px] [&[data-slot=button]::after]:text-juiText-blue [&[data-slot=button]::after]:pb-0.5 [&[data-slot=button]]:rounded-md' as const;

type RangeDateType = {
  start?: Date;
  end?: Date;
};

type TimeType = ComponentProps<typeof DatePicker>['timeType'];

type RangeDatePickerProps = {
  defaultRange?: RangeDateType;
  range?: RangeDateType;
  onRangeChange?: (rnage: RangeDateType) => void;
  minRangeDays?: number;
  maxRangeDays?: number;
  oppositeSign?: {
    start: { show: boolean; label?: string; className?: string };
    end: { show: boolean; label?: string; className?: string };
  };
  direction?: 'vertical' | 'horizontal';
  startPlaceholder?: string;
  endPlaceholder?: string;
  delimiter?: ReactNode;
  label?: {
    start?: ReactNode;
    end?: ReactNode;
    labelDirection?: 'side' | 'top';
  };
  customConfirmAlert?: ({
    condDate,
    type,
    timeType,
  }: {
    condDate?: Date;
    type: 'start' | 'end';
    timeType?: TimeType;
  }) => ReactNode;
  isConfrimAlert?: boolean;
  timeType?: TimeType;
  className?: string;
} & Omit<
  ComponentProps<typeof DatePicker>,
  | 'date'
  | 'defaultDate'
  | 'onDateChange'
  | 'dateRef'
  | 'placeholder'
  | 'onConditionRequestCallback'
  | 'conditionContent'
  | 'timeType'
>;

function RangeDatePicker({
  defaultRange,
  range,
  onRangeChange,
  minRangeDays,
  maxRangeDays,
  oppositeSign = {
    start: { show: true, label: 'START' },
    end: { show: true, label: 'END' },
  },
  direction = 'horizontal',
  startPlaceholder = 'Start Date...',
  endPlaceholder = 'End Date...',
  delimiter = '~',
  label = {
    start: null,
    end: null,
    labelDirection: 'top',
  },
  customConfirmAlert,
  isConfrimAlert = true,
  timeType = 'date',
  className,
  ...datePickerProps
}: RangeDatePickerProps) {
  const [uncontrolledStartDate, setUncontrolledStartDate] = useState<Date | undefined | 'init'>(
    defaultRange?.start ?? undefined,
  );
  const [uncontrolledEndDate, setUncontrolledEndDate] = useState<Date | undefined | 'init'>(
    defaultRange?.end ?? undefined,
  );

  const startDate = range?.start ?? uncontrolledStartDate;
  const endDate = range?.end ?? uncontrolledEndDate;

  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);

  const startErrorMessageRef = useRef('');
  const endErrorMessageRef = useRef('');

  const [startCalOpen, setStartCalOpen] = useState(false);
  const [endCalOpen, setEndCalOpen] = useState(false);

  const { checkDateRangeValidity } = useCheckDateRangeValidity({
    maxRange: maxRangeDays,
    minRange: minRangeDays,
  });

  const updateRange = useCallback(
    (start?: Date | 'init', end?: Date | 'init') => {
      setUncontrolledStartDate(start);
      setUncontrolledEndDate(end);

      const parsedStart = start === 'init' ? undefined : start;
      const parsedEnd = end === 'init' ? undefined : end;

      onRangeChange?.({ start: parsedStart, end: parsedEnd });
    },
    [onRangeChange],
  );

  const handleDateChange = useCallback(
    ({ type, date }: { type: 'start' | 'end'; date: Date | undefined }) => {
      const target = date;
      const compare = type === 'start' ? endDate : startDate;
      const errorRef = type === 'start' ? endErrorMessageRef : startErrorMessageRef;
      const setError = type === 'start' ? setEndError : setStartError;

      if (target) {
        const { isError, errorMessage } = checkDateRangeValidity({
          target,
          compare,
          type,
        });

        if (isError) {
          setError(true);
          errorRef.current = errorMessage ?? '';
          updateRange(type === 'start' ? target : 'init', type === 'end' ? target : 'init');
        } else {
          setError(false);
          errorRef.current = '';
          updateRange(type === 'start' ? target : startDate, type === 'end' ? target : endDate);
        }

        if (isError && type === 'start') {
          setStartCalOpen(false);
        }

        if (isError && type === 'end') {
          setEndCalOpen(false);
        }
      }

      // reset opposite error
      (type === 'start' ? setStartError : setEndError)(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate, endDate, updateRange],
  );

  const getDateValidation = ({
    target,
    compare,
    type,
    setErrorMessageRef,
  }: {
    target: Date;
    compare?: Date | 'init';
    type: 'start' | 'end';
    setErrorMessageRef: RefObject<string>;
  }) => {
    const { isError, errorMessage } = checkDateRangeValidity({
      target,
      compare,
      type,
    });

    setErrorMessageRef.current = errorMessage ?? '';

    return isError;
  };

  return (
    <div
      data-slot="range-picker-wrapper"
      className={cn('flex gap-2 items-center', direction === 'vertical' && 'flex-col items-start', className)}>
      {/* Start */}
      <div className={cn('relative flex gap-0.5 flex-col', label.labelDirection === 'side' && 'flex-row')}>
        {label.start &&
          (typeof label.start === 'function' ? label.start : <Label className="text-[10px] px-1">{label.start}</Label>)}
        <DatePicker
          date={startDate}
          timeType={timeType}
          open={startCalOpen}
          onOpenChange={setStartCalOpen}
          onDateChange={(date) => handleDateChange({ type: 'start', date })}
          {...(isConfrimAlert
            ? {
                onConditionRequestCallback: (condDate) =>
                  getDateValidation({
                    target: condDate,
                    compare: endDate,
                    type: 'start',
                    setErrorMessageRef: startErrorMessageRef,
                  }),
                conditionContent: (condDate) =>
                  customConfirmAlert ? (
                    customConfirmAlert({ condDate, type: 'start', timeType: timeType })
                  ) : (
                    <DefaultConfirmAlert
                      type="start"
                      condDate={condDate}
                      errorMessage={startErrorMessageRef.current}
                      selectedDate={startDate}
                      timeType={timeType}
                    />
                  ),
              }
            : {
                onConditionRequestCallback: undefined,
                conditionContent: undefined,
              })}
          placeholder={startPlaceholder}
          inputProps={{
            error: startError,
            helperText: startError && startErrorMessageRef.current,
            tabIndex: -1,
          }}
          calendarProps={{
            style: { '--opposite-name': `"${oppositeSign.end.label ?? 'END'}"` } as CSSProperties,
            modifiers: {
              endDay: oppositeSign.end.show && endDate instanceof Date && endDate,
              against: (date: Date) =>
                getDateValidation({
                  target: date,
                  compare: endDate,
                  type: 'start',
                  setErrorMessageRef: startErrorMessageRef,
                }),
            },
            modifiersClassNames: {
              endDay: cn(
                oppositeSign.end.className ?? OPPOSITE_SIGN_DEFAULT_CLASSNAME,
                `[&[data-slot=button]::after]:content-[var(--opposite-name)]`,
              ),
              against: 'text-juiText-secondary',
            },
            ...(timeType !== 'date' && {
              closeButton: (
                <div className="flex gap-2 ml-auto mt-1 mr-0">
                  <Button
                    onClick={() => {
                      setStartCalOpen(false);
                      setEndCalOpen(true);
                    }}>
                    다음
                  </Button>
                  <Button onClick={() => setStartCalOpen(false)}>시작 닫기</Button>
                </div>
              ),
            }),
          }}
          {...datePickerProps}
        />
      </div>

      {/* Delimiter */}
      {delimiter && (
        <span className={cn(direction === 'horizontal' && label.labelDirection !== 'side' && 'mt-auto mx-0 mb-2')}>
          {delimiter}
        </span>
      )}

      {/* End */}
      <div className={cn('relative flex gap-0.5 flex-col', label.labelDirection === 'side' && 'flex-row')}>
        {label.end &&
          (typeof label.end === 'function' ? label.end : <Label className="text-[10px] px-1">{label.end}</Label>)}
        <DatePicker
          date={endDate}
          timeType={timeType}
          open={endCalOpen}
          onOpenChange={setEndCalOpen}
          onDateChange={(date) => handleDateChange({ type: 'end', date })}
          {...(isConfrimAlert
            ? {
                onConditionRequestCallback: (condDate) =>
                  getDateValidation({
                    target: condDate,
                    compare: startDate,
                    type: 'end',
                    setErrorMessageRef: endErrorMessageRef,
                  }),
                conditionContent: (condDate) =>
                  customConfirmAlert ? (
                    customConfirmAlert({ condDate, type: 'end', timeType: timeType })
                  ) : (
                    <DefaultConfirmAlert
                      type="end"
                      condDate={condDate}
                      errorMessage={endErrorMessageRef.current}
                      selectedDate={endDate}
                      timeType={timeType}
                    />
                  ),
              }
            : {
                onConditionRequestCallback: undefined,
                conditionContent: undefined,
              })}
          placeholder={endPlaceholder}
          inputProps={{
            error: endError,
            helperText: endError && endErrorMessageRef.current,
            tabIndex: 0,
          }}
          calendarProps={{
            style: { '--opposite-name': `"${oppositeSign.start.label ?? 'START'}"` } as CSSProperties,
            modifiers: {
              startDay: oppositeSign.start.show && startDate instanceof Date && startDate,
              against: (date: Date) =>
                getDateValidation({
                  target: date,
                  compare: startDate,
                  type: 'end',
                  setErrorMessageRef: endErrorMessageRef,
                }),
            },
            modifiersClassNames: {
              startDay: cn(
                oppositeSign.start.className ?? OPPOSITE_SIGN_DEFAULT_CLASSNAME,
                `[&[data-slot=button]::after]:content-[var(--opposite-name)]`,
              ),
              against: 'text-juiText-secondary',
            },
            ...(timeType !== 'date' && {
              closeButton: (
                <div className="flex gap-2 ml-auto mt-1 mr-0">
                  <Button
                    onClick={() => {
                      setEndCalOpen(false);
                      setStartCalOpen(true);
                    }}>
                    이전
                  </Button>
                  <Button onClick={() => setEndCalOpen(false)}>종료 닫기</Button>
                </div>
              ),
            }),
          }}
          {...datePickerProps}
        />
      </div>
    </div>
  );
}

export default RangeDatePicker;
