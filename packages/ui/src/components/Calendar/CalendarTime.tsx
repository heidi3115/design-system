'use client';

import { type ComponentProps, useRef, useState } from 'react';
import { Calendar } from './Calendar';
import { Select } from '../Select';
import { Separator } from '../Separator';
import { ClockIcon } from '@common/ui/icons';
import { format } from 'date-fns';

type TimeType = 'hour' | 'minutes' | 'seconds';

function CalendarTime({
  selected,
  onSelect,
  timeType = 'minutes',
  ...calendarProps
}: Omit<ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect' | 'footer'> & {
  selected: Date | undefined;
  onSelect?: (calDate: Date | undefined) => void;
  timeType?: TimeType;
}) {
  const [dateTime, setDateTime] = useState<Date | undefined>(selected);

  const hourRef = useRef('0');
  const minRef = useRef('0');
  const secRef = useRef('0');

  return (
    <Calendar
      mode="single"
      selected={dateTime}
      defaultMonth={dateTime}
      onSelect={(calDate) => {
        if (!calDate) return;

        const newDate = new Date(calDate);

        newDate.setHours(parseInt(hourRef.current));

        if (timeType !== 'hour') {
          newDate.setMinutes(parseInt(minRef.current));
        } else {
          newDate.setMinutes(0);
        }

        if (timeType === 'seconds') {
          newDate.setSeconds(parseInt(secRef.current));
        } else {
          newDate.setSeconds(0);
        }

        setDateTime(newDate);
        onSelect?.(newDate);
      }}
      footer={
        <>
          <Separator />
          <div className="flex items-center gap-2">
            <ClockIcon size="small" />
            <div className="flex items-center gap-1">
              {/* Hour Select */}
              <Select
                width={40}
                className="!h-6 justify-center min-w-0 p-1 light:border-0 light:border-b-1 border-b-1 data-[state=open]:border-0 data-[state=open]:border-b-1"
                optionsClassName="min-w-0"
                itemClassName="justify-center"
                isContentFitTriggerWidth
                defaultValue={String(dateTime?.getHours() ?? 0)}
                selectRef={hourRef}
                onValueChange={(hour) => {
                  if (!dateTime) return;
                  const newDate = new Date(dateTime);

                  newDate.setHours(parseInt(hour));
                  setDateTime(newDate);
                  onSelect?.(newDate);
                }}
                options={Array.from({ length: 24 }, (_, i) => ({
                  label: i.toString().padStart(2, '0'),
                  value: String(i),
                }))}
                isTriggerIcon={false}
              />

              {(timeType === 'minutes' || timeType === 'seconds') && (
                <>
                  <span>:</span>
                  {/* Minute Select */}
                  <Select
                    width={40}
                    className="!h-6 justify-center min-w-0 p-1 light:border-0 light:border-b-1 border-b-1 data-[state=open]:border-0 data-[state=open]:border-b-1"
                    optionsClassName="min-w-0"
                    itemClassName="justify-center"
                    isContentFitTriggerWidth
                    defaultValue={String(dateTime?.getMinutes() ?? 0)}
                    selectRef={minRef}
                    onValueChange={(min) => {
                      if (!dateTime) return;
                      const newDate = new Date(dateTime);

                      newDate.setMinutes(parseInt(min));
                      setDateTime(newDate);
                      onSelect?.(newDate);
                    }}
                    options={Array.from({ length: 60 }, (_, i) => ({
                      label: i.toString().padStart(2, '0'),
                      value: String(i),
                    }))}
                    isTriggerIcon={false}
                  />
                </>
              )}

              {timeType === 'seconds' && (
                <>
                  <span>:</span>
                  {/* Second Select */}
                  <Select
                    width={40}
                    className="!h-6 justify-center min-w-0 p-1 light:border-0 light:border-b-1 border-b-1 data-[state=open]:border-0 data-[state=open]:border-b-1"
                    optionsClassName="min-w-0"
                    itemClassName="justify-center"
                    isContentFitTriggerWidth
                    defaultValue={String(dateTime?.getSeconds() ?? 0)}
                    selectRef={secRef}
                    onValueChange={(sec) => {
                      if (!dateTime) return;
                      const newDate = new Date(dateTime);

                      newDate.setSeconds(parseInt(sec));
                      setDateTime(newDate);
                      onSelect?.(newDate);
                    }}
                    options={Array.from({ length: 60 }, (_, i) => ({
                      label: i.toString().padStart(2, '0'),
                      value: String(i),
                    }))}
                    isTriggerIcon={false}
                  />
                </>
              )}
            </div>
          </div>
          <div className="mt-1">{dateTime ? format(dateTime, 'yyyy-MM-dd HH:mm:ss') : '-'}</div>
        </>
      }
      {...calendarProps}
    />
  );
}

export default CalendarTime;
