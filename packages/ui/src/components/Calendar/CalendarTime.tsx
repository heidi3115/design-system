'use client';

import { type ComponentProps, useRef, useState } from 'react';
import { format } from 'date-fns';

import { ClockIcon } from '@common/ui/icons';
import { Calendar } from './Calendar';
import { Select, Separator } from '../../components';
import { useTimeChangeHandler } from './hooks/useTimeChangeHandler';
import { cn } from '@common/ui/lib/utils';

function CalendarTime({
  selected,
  onSelect,
  timeType = 'minute',
  ...calendarProps
}: Omit<ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect' | 'footer'> & {
  selected: Date | undefined;
  onSelect?: (calDate: Date | undefined) => void;
  timeType?: 'hour' | 'minute' | 'second';
}) {
  const [dateTime, setDateTime] = useState<Date | undefined>(selected);

  const hourRef = useRef('0');
  const minRef = useRef('0');
  const secRef = useRef('0');

  const timeSelectClassName =
    '!h-6 justify-center min-w-0 p-1 light:border-0 light:border-b-1 border-b-1 data-[state=open]:border-0 data-[state=open]:border-b-1';

  const handleTimeChange = useTimeChangeHandler({
    dateTime,
    setDateTime,
    onSelect,
  });

  const makeDateWithTime = (date: Date) => {
    const newDate = new Date(date);

    newDate.setHours(parseInt(hourRef.current));
    if (timeType !== 'hour') newDate.setMinutes(parseInt(minRef.current));
    else newDate.setMinutes(0);

    if (timeType === 'second') newDate.setSeconds(parseInt(secRef.current));
    else newDate.setSeconds(0);

    return newDate;
  };

  const generateTimeUnitOptions = (length: number) => {
    return Array.from({ length }, (_, i) => {
      return {
        label: i.toString().padStart(2, '0'),
        value: String(i),
      };
    });
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
      footer={
        <>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon size="small" />
              <div className="flex items-center gap-1">
                {/* Hour Select */}
                <Select
                  width={38}
                  className={cn(timeSelectClassName)}
                  optionsClassName="min-w-0"
                  itemClassName="justify-center"
                  isContentFitTriggerWidth
                  defaultValue={String(dateTime?.getHours() ?? 0)}
                  selectRef={hourRef}
                  onValueChange={handleTimeChange('hour')}
                  options={generateTimeUnitOptions(24)}
                  isTriggerIcon={false}
                />

                {(timeType === 'minute' || timeType === 'second') && (
                  <>
                    <span>:</span>
                    {/* Minute Select */}
                    <Select
                      width={38}
                      className={cn(timeSelectClassName)}
                      optionsClassName="min-w-0"
                      itemClassName="justify-center"
                      isContentFitTriggerWidth
                      defaultValue={String(dateTime?.getMinutes() ?? 0)}
                      selectRef={minRef}
                      onValueChange={handleTimeChange('minute')}
                      options={generateTimeUnitOptions(60)}
                      isTriggerIcon={false}
                    />
                  </>
                )}

                {timeType === 'second' && (
                  <>
                    <span>:</span>
                    {/* Second Select */}
                    <Select
                      width={38}
                      className={cn(timeSelectClassName)}
                      optionsClassName="min-w-0"
                      itemClassName="justify-center"
                      isContentFitTriggerWidth
                      defaultValue={String(dateTime?.getSeconds() ?? 0)}
                      selectRef={secRef}
                      onValueChange={handleTimeChange('second')}
                      options={generateTimeUnitOptions(60)}
                      isTriggerIcon={false}
                    />
                  </>
                )}
              </div>
            </div>
            <span>
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
        </>
      }
      {...calendarProps}
    />
  );
}

export default CalendarTime;
