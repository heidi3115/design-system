'use client';

import {
  useRef,
  useState,
  useCallback,
  useMemo,
  type ComponentProps,
  type RefObject,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { format, isValid } from 'date-fns';

import { Label } from '../../components';
import { useCheckDateRangeValidity } from './hooks/useCheckDateRangeValidity';
import DatePicker from './DatePicker';
import { cn } from '@common/ui/lib/utils';

type RangeDateType = {
  start?: Date;
  end?: Date;
};

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
  className,
  ...datePickerProps
}: RangeDatePickerProps) {
  const isControlled = range !== undefined && onRangeChange !== undefined;

  const [uncontrolledStartDate, setUncontrolledStartDate] = useState<Date | undefined | 'init'>(
    defaultRange?.start ?? undefined,
  );
  const [uncontrolledEndDate, setUncontrolledEndDate] = useState<Date | undefined | 'init'>(
    defaultRange?.end ?? undefined,
  );

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

  const oppositeSignDefaultClassName = useMemo(
    () =>
      [
        'relative',
        '[&[data-slot=button]::after]:absolute',
        '[&[data-slot=button]::after]:top-full',
        '[&[data-slot=button]::after]:left-1/2',
        '[&[data-slot=button]::after]:-translate-x-1/2',
        '[&[data-slot=button]::after]:-translate-y-full',
        '[&[data-slot=button]::after]:text-[8px]',
        '[&[data-slot=button]::after]:text-juiText-blue',
        '[&[data-slot=button]::after]:pb-0.5',
        '[&[data-slot=button]]:rounded-md',
      ].join(' '),
    [],
  );

  return (
    <div
      data-slot="range-picker-wrapper"
      className={cn('flex gap-2 items-center', direction === 'vertical' && 'flex-col items-start', className)}>
      <div className={cn('relative flex gap-0.5 flex-col', label.labelDirection === 'side' && 'flex-row')}>
        {label.start &&
          (typeof label.start === 'function' ? label.start : <Label className="text-[10px] px-1">{label.start}</Label>)}
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
          placeholder={startPlaceholder}
          inputProps={{
            error: startError,
            helperText: startError && startErrorMessageRef.current,
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
                oppositeSign.end.className ?? oppositeSignDefaultClassName,
                `[&[data-slot=button]::after]:content-[var(--opposite-name)]`,
              ),
              against: 'text-juiText-secondary',
            },
          }}
          {...datePickerProps}
        />
      </div>
      {delimiter && (typeof delimiter === 'function' ? delimiter : <span>{delimiter}</span>)}
      <div className={cn('relative flex gap-0.5 flex-col', label.labelDirection === 'side' && 'flex-row')}>
        {label.end &&
          (typeof label.end === 'function' ? label.end : <Label className="text-[10px] px-1">{label.end}</Label>)}
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
          placeholder={endPlaceholder}
          inputProps={{
            error: endError,
            helperText: endError && endErrorMessageRef.current,
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
                oppositeSign.start.className ?? oppositeSignDefaultClassName,
                `[&[data-slot=button]::after]:content-[var(--opposite-name)]`,
              ),
              against: 'text-juiText-secondary',
            },
          }}
          {...datePickerProps}
        />
      </div>
    </div>
  );
}

export default RangeDatePicker;
