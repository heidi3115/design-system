'use client';

import { type ComponentProps, type ReactNode, useRef, useState } from 'react';
import { format } from 'date-fns';

import { ClockIcon } from '@common/ui/icons';
import { useTimeChangeHandler } from '../hooks/useTimeChangeHandler';
import { Calendar } from '../Calendar';
import { Separator } from '../../../components';
import TimeInput from './TimeInput';
import TimeSlider from './TimeSlider';
import { cn } from '@common/ui/lib/utils';
import { useUpdateEffect } from '@common/utils';

function CalendarTime({
  selected,
  onSelect,
  timeType = 'minute',
  closeButton,
  onDialogCancel,
  isShowTimeSlide = false,
  ...calendarProps
}: Omit<ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect' | 'footer'> & {
  selected?: Date | undefined;
  onSelect?: (calDate: Date | undefined) => void;
  timeType?: 'hour' | 'minute' | 'second';
  closeButton?: ReactNode;
  isShowTimeSlide?: boolean;
}) {
  const [dateTime, setDateTime] = useState<Date | undefined>(selected);

  const initialHourRef = useRef(String(selected?.getHours() ?? '0'));
  const initialMinRef = useRef(String(selected?.getMinutes() ?? '0'));
  const initialSecRef = useRef(String(selected?.getSeconds() ?? '0'));

  const hourRef = useRef<HTMLInputElement>(null);
  const minRef = useRef<HTMLInputElement>(null);
  const secRef = useRef<HTMLInputElement>(null);

  const { handleTimeChange, handleTimeChanges } = useTimeChangeHandler({
    dateTime,
    setDateTime,
    onSelect,
  });

  useUpdateEffect(() => {
    initialHourRef.current = String(selected?.getHours() ?? '0');
    initialMinRef.current = String(selected?.getMinutes() ?? '0');
    initialSecRef.current = String(selected?.getSeconds() ?? '0');
  }, [selected]);

  const makeDateWithTime = (date: Date) => {
    const newDate = new Date(date);

    newDate.setHours(hourRef.current ? Number(hourRef.current.value) : 0);

    if (timeType !== 'hour') {
      newDate.setMinutes(minRef.current ? Number(minRef.current.value) : 0);
    } else {
      newDate.setMinutes(0);
    }

    if (timeType === 'second') {
      newDate.setSeconds(secRef.current ? Number(secRef.current.value) : 0);
    } else {
      newDate.setSeconds(0);
    }

    return newDate;
  };

  return (
    <Calendar
      mode="single"
      selected={dateTime}
      defaultMonth={dateTime}
      onSelect={(calDate) => {
        if (!calDate) return;

        const newDate = makeDateWithTime(calDate);

        setDateTime(newDate);
        onSelect?.(newDate);
      }}
      onDialogCancel={() => {
        if (!selected) return;

        const resetDate = new Date(selected);

        resetDate.setHours(parseInt(initialHourRef.current));
        resetDate.setMinutes(parseInt(initialMinRef.current));
        resetDate.setSeconds(parseInt(initialSecRef.current));

        setDateTime(resetDate);
        onSelect?.(resetDate);

        onDialogCancel?.();
      }}
      footer={
        <>
          <Separator />
          <div
            className={cn(
              'flex justify-between mt-2.5',
              timeType === 'second' ? 'flex-col items-start gap-2' : 'items-center',
            )}>
            <div className="flex items-center gap-2">
              <ClockIcon size="small" />
              <div className="flex items-center gap-1">
                {/* Hour Input */}
                <TimeInput
                  refObj={hourRef}
                  defaultValue={String(dateTime?.getHours() ?? '0').padStart(2, '0')}
                  timeType="hour"
                  handleTimeChange={handleTimeChange}
                />

                {(timeType === 'minute' || timeType === 'second') && (
                  <>
                    <span>:</span>
                    {/* Minute Input */}
                    <TimeInput
                      refObj={minRef}
                      defaultValue={String(dateTime?.getMinutes() ?? '0').padStart(2, '0')}
                      timeType="minute"
                      handleTimeChange={handleTimeChange}
                    />
                  </>
                )}

                {timeType === 'second' && (
                  <>
                    <span>:</span>
                    {/* Second Input */}
                    <TimeInput
                      refObj={secRef}
                      defaultValue={String(dateTime?.getSeconds() ?? '0').padStart(2, '0')}
                      timeType="second"
                      handleTimeChange={handleTimeChange}
                    />
                  </>
                )}
              </div>
            </div>
            <span className="ml-auto mr-0">
              {dateTime
                ? format(
                    dateTime,
                    timeType === 'hour'
                      ? 'yyyy-MM-dd HH:00'
                      : timeType === 'minute'
                        ? 'yyyy-MM-dd HH:mm'
                        : 'yyyy-MM-dd HH:mm:ss',
                  )
                : ''}
            </span>
          </div>
          <div className="flex gap-4">
            {isShowTimeSlide && (
              <TimeSlider
                dateTime={dateTime}
                timeType={timeType}
                hourRef={hourRef}
                minRef={minRef}
                secRef={secRef}
                handleTimeChanges={handleTimeChanges}
              />
            )}
            {closeButton && <div className="flex m-auto mr-0">{closeButton}</div>}
          </div>
        </>
      }
      {...calendarProps}
    />
  );
}

export default CalendarTime;
