'use client';

import {
  useState,
  useImperativeHandle,
  type ComponentProps,
  type ReactNode,
  type Ref,
  type ChangeEvent,
  useMemo,
  useCallback,
} from 'react';
import { format, parse } from 'date-fns';

import { Button, Calendar, CalendarTime, Input, Popover } from '../../components';
import { CalendarIcon, CalendarClockIcon } from '@common/ui/icons';
import { useConfirmDialog } from '@common/ui/hooks';
import { useDateTimeInputFormatter } from './hooks/useDateTimeInputFormatter';
import { useUpdateEffect } from '@common/utils';
import { cn } from '@common/ui/lib/utils';

type TimeType = 'date' | 'hour' | 'minute' | 'second';

type DatePickerBaseProps = {
  date?: Date | 'init';
  defaultDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
  dateRef?: Ref<Date | undefined>;
  isArrow?: ComponentProps<typeof Popover>['isArrow'];
  numberOfMonths?: ComponentProps<typeof Calendar>['numberOfMonths'];
  className?: string;
  classNames?: {
    input?: string;
    calendar?: string;
    popover?: string;
  };
  popoverProps?: Pick<ComponentProps<typeof Popover>, 'isArrow' | 'side' | 'align' | 'sideOffset' | 'alignOffset'>;
  calendarProps?: Omit<
    ComponentProps<typeof Calendar>,
    'mode' | 'dialogOpen' | 'onDialogConfirm' | 'onDialogCancel' | 'dialogContent' | 'disabled'
  >;
  disabledCalendar?: ComponentProps<typeof Calendar>['disabled'];
  disabled?: boolean;
  inputProps?: Omit<ComponentProps<typeof Input>, 'iconProp' | 'placeholder'>;
  placeholder?: ComponentProps<typeof Input>['placeholder'];
  timeType?: TimeType;
};

type WithCondition = {
  onConditionRequestCallback: (selectedDate: Date) => boolean;
  conditionContent: (selectedDate: Date | undefined) => ReactNode;
};

type WithoutCondition = {
  onConditionRequestCallback?: undefined;
  conditionContent?: undefined;
};

// 최종 타입
type DatePickerProps = DatePickerBaseProps & (WithCondition | WithoutCondition);

function DatePicker({
  date: initDate,
  defaultDate,
  onDateChange,
  dateRef,
  isArrow,
  numberOfMonths,
  className,
  classNames,
  popoverProps,
  calendarProps,
  disabledCalendar,
  onConditionRequestCallback,
  conditionContent = (selectedDate) => `${selectedDate?.toDateString()} 선택하시겠습니까?`,
  inputProps,
  timeType = 'date',
  placeholder,
  disabled = false,
}: DatePickerProps) {
  const timeTypeFormatMap: Record<TimeType, string> = {
    date: 'yyyy-MM-dd',
    hour: 'yyyy-MM-dd HH',
    minute: 'yyyy-MM-dd HH:mm',
    second: 'yyyy-MM-dd HH:mm:ss',
  };

  const timeTypeFormat = timeTypeFormatMap[timeType ?? 'date'];

  const CalendarComp = timeType === 'date' ? Calendar : CalendarTime;

  const { openDialog } = useConfirmDialog();

  // 각 요소들의 className
  const { input: inputClassName, calendar: calendarClassName, popover: popoverClassName } = classNames ?? {};

  // 내부 상태 (언컨트롤드 모드용)
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultDate);
  const isControlled = initDate !== undefined;

  const date = isControlled ? initDate : internalDate;
  const isInitDate = date === 'init';

  useImperativeHandle(dateRef, () => (isInitDate ? undefined : date));

  const [inputValue, setInputValue] = useState(() => (date ? format(date, timeTypeFormat) : ''));
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const [confirmationRequest, setConfirmationRequest] = useState<Date | undefined>(undefined);

  const { handleInputChange, handleKeyDown, handleClick } = useDateTimeInputFormatter({
    initDate: isInitDate ? undefined : date,
    setInputValue,
    setIsError,
    withTimeType: timeType,
  });

  // value (또는 internalDate) 변경 시 inputValue 동기화
  useUpdateEffect(() => {
    if (isInitDate) {
      setInputValue('');

      return;
    }

    if (date) {
      setInputValue(format(date, timeTypeFormat));
      setIsError(false);
    } else {
      setInputValue('');
    }
  }, [date]);

  const dateUpdate = useCallback(
    (confirmDate: Date) => {
      setIsError(false);

      if (!isControlled) setInternalDate(confirmDate);
      onDateChange?.(confirmDate);
    },
    [isControlled, onDateChange],
  );

  // input blur 시 유효한 날짜면 onChange 또는 내부 상태 업데이트
  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parse(inputValue, timeTypeFormat, new Date());

    setInputValue(e.target.value);

    if (isNaN(parsed.getTime())) {
      setIsError(true);

      return;
    }

    if (onConditionRequestCallback?.(parsed) && confirmationRequest === undefined) {
      if (date) {
        openDialog({
          description: <span className="text-xs">{conditionContent?.(parsed)}</span>,
          onCancel: () => setInputValue(format(date, timeTypeFormat)),
          onConfirm: () => dateUpdate(parsed),
        });
      }

      return;
    }

    dateUpdate(parsed);
  };

  // 캘린더에서 날짜 선택 시 onChange 또는 내부 상태 업데이트
  const handleSelectDate = (selectDate: Date | undefined) => {
    if (selectDate) {
      // 날짜 선택 조건이 있을 경우
      if (onConditionRequestCallback?.(selectDate) && confirmationRequest === undefined) {
        setConfirmationRequest(selectDate);

        return;
      }

      const formatted = format(selectDate, 'yyyy-MM-dd HH:mm:ss');

      setInputValue(formatted);

      if (timeType === 'date') {
        setOpen(false);
      }

      dateUpdate(selectDate);
    }
  };

  // inputProps에 특정 아이콘이 들어오는지 확인
  const { iconRight, iconLeft, ...restInputProps } = inputProps ?? {};

  const hasCustomIcon = iconRight || iconLeft;
  const defaultIconRight = useMemo(() => {
    return hasCustomIcon ? undefined : timeType === 'date' ? CalendarIcon : CalendarClockIcon;
  }, [hasCustomIcon, timeType]);

  return (
    <div data-slot="date-picker-warpper" className={cn('w-fit', className)}>
      <Popover
        open={open}
        onOpenChange={setOpen}
        align="start"
        trigger={
          <div data-slot="date-trigger-wrapper">
            <Input
              underline="default"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onClick={handleClick}
              onFocus={() => setOpen(false)}
              onKeyDown={(e) => handleKeyDown(e)(inputValue)}
              className={cn('[&::-webkit-calendar-picker-indicator]:hidden', inputClassName)}
              iconRight={defaultIconRight}
              iconLeft={iconLeft}
              iconProps={{
                onClick: (e) => {
                  if (disabled) e.preventDefault();

                  if (!disabled) {
                    setOpen((prev) => !prev);
                  }
                },
                className: cn(
                  'cursor-pointer',
                  disabled && 'cursor-not-allowed',
                  open && 'bg-current/20 p-1 size-6 rounded-lg',
                  open && !iconLeft && 'translate-x-1 ',
                  open && iconLeft && '-translate-x-1',
                ),
              }}
              placeholder={placeholder ?? timeTypeFormat}
              {...restInputProps}
              disabled={disabled}
              error={isError || restInputProps.error}
              helperText={restInputProps.helperText || (isError && '올바른 날짜를 입력해 주세요')}
            />
          </div>
        }
        isArrow={isArrow}
        className={popoverClassName}
        {...popoverProps}>
        <CalendarComp
          mode="single"
          {...(timeType !== 'date' && { timeType: timeType })}
          selected={isInitDate ? undefined : date}
          onSelect={handleSelectDate}
          defaultMonth={isInitDate ? undefined : date}
          className={cn(calendarClassName)}
          captionLayout="dropdown"
          numberOfMonths={numberOfMonths}
          disabled={disabledCalendar}
          {...(onConditionRequestCallback && confirmationRequest !== undefined
            ? {
                dialogOpen: true,
                dialogContent: conditionContent?.(confirmationRequest),
                onDialogConfirm: () => {
                  handleSelectDate(confirmationRequest);
                  setConfirmationRequest(undefined);
                },
                onDialogCancel: () => {
                  setConfirmationRequest(undefined);
                },
              }
            : {})}
          closeButton={
            <Button className="ml-auto mt-1 mr-0" onClick={() => setOpen(false)}>
              닫기
            </Button>
          }
          {...calendarProps}
        />
      </Popover>
    </div>
  );
}

export default DatePicker;
