'use client';

import {
  useState,
  useImperativeHandle,
  type ComponentProps,
  type ReactNode,
  type Ref,
  useMemo,
  useCallback,
} from 'react';
import { format, parse } from 'date-fns';

import { Calendar, Input, Popover } from '../../components';
import { CalendarIcon } from '@common/ui/icons';
import { useConfirmDialog } from '@common/ui/hooks';
import { useDateInputFormatter } from './hooks/useDateInputFormatter';
import { useUpdateEffect } from '@common/utils';
import { cn } from '@common/ui/lib/utils';

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
  disabled?: ComponentProps<typeof Calendar>['disabled'];
  inputProps?: Omit<ComponentProps<typeof Input>, 'iconProp' | 'placeholder'>;
  placeholder?: ComponentProps<typeof Input>['placeholder'];
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
  disabled,
  onConditionRequestCallback,
  conditionContent = (selectedDate) => `${selectedDate?.toDateString()} 선택하시겠습니까?`,
  inputProps,
  placeholder = 'YYYY-MM-DD',
}: DatePickerProps) {
  const { openDialog } = useConfirmDialog();

  // 각 요소들의 className
  const { input: inputClassName, calendar: calendarClassName, popover: popoverClassName } = classNames ?? {};

  // 내부 상태 (언컨트롤드 모드용)
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultDate);
  const isControlled = initDate !== undefined;

  const date = isControlled ? initDate : internalDate;
  const isInitDate = date === 'init';

  useImperativeHandle(dateRef, () => (isInitDate ? undefined : date));

  const [inputValue, setInputValue] = useState(() => (date ? format(date, 'yyyy-MM-dd') : ''));
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const [confirmationRequest, setConfirmationRequest] = useState<Date | undefined>(undefined);

  const { handleInputChange } = useDateInputFormatter({
    initDate: isInitDate ? undefined : date,
    setInputValue,
    setIsError,
  });

  // value (또는 internalDate) 변경 시 inputValue 동기화
  useUpdateEffect(() => {
    if (isInitDate) {
      setInputValue('');

      return;
    }

    if (date) {
      setInputValue(format(date, 'yyyy-MM-dd'));
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
  const handleInputBlur = () => {
    const parsed = parse(inputValue, 'yyyy-MM-dd', new Date());

    if (isNaN(parsed.getTime())) {
      setIsError(true);

      return;
    }

    if (onConditionRequestCallback?.(parsed) && confirmationRequest === undefined) {
      if (date) {
        openDialog({
          description: <span className="text-xs">{conditionContent?.(parsed)}</span>,
          onCancel: () => setInputValue(format(date, 'yyyy-MM-dd')),
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

      const formatted = format(selectDate, 'yyyy-MM-dd');

      setInputValue(formatted);
      setOpen(false);

      dateUpdate(selectDate);
    }
  };

  // inputProps에 특정 아이콘이 들어오는지 확인
  const { iconRight, iconLeft, ...restInputProps } = inputProps ?? {};

  const hasCustomIcon = iconRight || iconLeft;
  const defaultIconRight = useMemo(() => {
    return hasCustomIcon ? undefined : CalendarIcon;
  }, [hasCustomIcon]);

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
              onClick={(e) => e.preventDefault()}
              onFocus={() => setOpen(false)}
              className={cn('[&::-webkit-calendar-picker-indicator]:hidden', inputClassName)}
              iconRight={defaultIconRight}
              iconLeft={iconLeft}
              iconProps={{
                onClick: () => setOpen((prev) => !prev),
                className: cn('cursor-pointer', open && ' text-juiPrimary'),
              }}
              placeholder={placeholder}
              {...restInputProps}
              error={isError || restInputProps.error}
              helperText={restInputProps.helperText || (isError && '올바른 날짜를 입력해 주세요')}
            />
          </div>
        }
        isArrow={isArrow}
        className={popoverClassName}
        {...popoverProps}>
        <Calendar
          mode="single"
          selected={isInitDate ? undefined : date}
          onSelect={handleSelectDate}
          defaultMonth={isInitDate ? undefined : date}
          className={cn(calendarClassName)}
          captionLayout="dropdown"
          numberOfMonths={numberOfMonths}
          disabled={disabled}
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
          {...calendarProps}
        />
      </Popover>
    </div>
  );
}

export default DatePicker;
