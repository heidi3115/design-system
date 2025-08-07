'use client';

import { useMemo, type RefObject } from 'react';

import { Slider } from '../../../components';

type TimeUnit = 'hour' | 'minute' | 'second';
type TimeSliderProps = {
  dateTime?: Date;
  hourRef: RefObject<HTMLInputElement | null>;
  minRef: RefObject<HTMLInputElement | null>;
  handleTimeChanges: (changes: Partial<Record<TimeUnit, string | number>>) => void;
};

function TimeSlider({ dateTime, hourRef, minRef, handleTimeChanges }: TimeSliderProps) {
  const defaultValue = useMemo(() => {
    const h = dateTime?.getHours() ?? 0;
    const m = dateTime?.getMinutes() ?? 0;

    return [h * 60 + m];
  }, [dateTime]);

  const formatMinutesToTimeLabel = (time: number) => {
    const h = Math.floor(time / 60);
    const m = time % 60;

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 mt-2.5">
      <Slider
        showValueLabel="auto"
        min={0}
        max={1439}
        defaultValue={defaultValue}
        onValueCommit={([val]) => {
          const h = Math.floor((val ?? 0) / 60);
          const m = (val ?? 0) % 60;
          if (hourRef.current) hourRef.current.value = String(h).padStart(2, '0');
          if (minRef.current) minRef.current.value = String(m).padStart(2, '0');

          handleTimeChanges({ hour: h, minute: m });
        }}
        onCustomTooltip={(time) => formatMinutesToTimeLabel(time)}
        marks={[
          { value: 0, label: '00:00', labelClass: 'text-[10px]' },
          { value: 360, label: '06:00', labelClass: 'text-[10px]' },
          { value: 720, label: '12:00', labelClass: 'text-[10px]' },
          { value: 1080, label: '18:00', labelClass: 'text-[10px]' },
          { value: 1439, label: '23:59', labelClass: 'text-[10px]' },
        ]}
        tooltipProps={{
          className: 'z-51',
          side: 'bottom',
          isArrow: false,
          sideOffset: 4,
        }}
      />
    </div>
  );
}

export default TimeSlider;
