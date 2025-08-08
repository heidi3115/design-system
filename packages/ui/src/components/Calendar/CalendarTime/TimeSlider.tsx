'use client';

import { useCallback, useMemo, type RefObject } from 'react';
import { Slider } from '../../../components';

type TimeUnit = 'hour' | 'minute' | 'second';

type TimeSliderProps = {
  dateTime?: Date;
  timeType?: TimeUnit;
  hourRef: RefObject<HTMLInputElement | null>;
  minRef: RefObject<HTMLInputElement | null>;
  secRef?: RefObject<HTMLInputElement | null>;
  handleTimeChanges: (changes: Partial<Record<TimeUnit, string | number>>) => void;
};

function TimeSlider({ dateTime, timeType = 'minute', hourRef, minRef, secRef, handleTimeChanges }: TimeSliderProps) {
  const defaultValue = useMemo(() => {
    const h = dateTime?.getHours() ?? 0;
    const m = dateTime?.getMinutes() ?? 0;
    const s = dateTime?.getSeconds() ?? 0;

    if (timeType === 'hour') return [h];
    if (timeType === 'minute') return [h * 60 + m];

    return [h * 3600 + m * 60 + s];
  }, [dateTime, timeType]);

  const formatLabel = useCallback((value: number, type: 'hour' | 'minute' | 'second'): string => {
    if (type === 'hour') {
      return `${String(value).padStart(2, '0')}:00`;
    }

    if (type === 'minute') {
      const h = Math.floor(value / 60);
      const m = value % 60;

      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    // timeType === 'second'
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    const s = value % 60;

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, []);

  const marks = useMemo(() => {
    const labelClass = 'text-[10px]';

    if (timeType === 'hour') {
      const base = Array.from({ length: 4 }, (_, i) => {
        const value = i * 6;

        return {
          value,
          label: `${String(value).padStart(2, '0')}:00`,
          labelClass,
        };
      });

      base.push({
        value: 23,
        label: '23:00',
        labelClass,
      });

      return base;
    }

    if (timeType === 'minute') {
      const step = 360;
      const base = Array.from({ length: 4 }, (_, i) => {
        const value = i * step;

        return {
          value,
          label: formatLabel(value, 'minute'),
          labelClass,
        };
      });

      base.push({
        value: 1439,
        label: formatLabel(1439, 'minute'),
        labelClass,
      });

      return base;
    }

    // timeType === 'second'
    const step = 21600;
    const base = Array.from({ length: 4 }, (_, i) => {
      const value = i * step;

      return {
        value,
        label: formatLabel(value, 'second').slice(0, -3),
        labelClass,
      };
    });

    base.push({
      value: 86399,
      label: formatLabel(86399, 'second'),
      labelClass,
    });

    return base;
  }, [formatLabel, timeType]);

  const maxValue = timeType === 'hour' ? 23 : timeType === 'minute' ? 1439 : 86399; // 23h, 23:59, 23:59:59

  const handleSliderCommit = ([val]: number[] = []) => {
    if (typeof val !== 'number' || isNaN(val)) return;

    let h = 0,
      m = 0,
      s = 0;

    if (timeType === 'hour') {
      h = val;
    } else if (timeType === 'minute') {
      h = Math.floor(val / 60);
      m = val % 60;
    } else {
      h = Math.floor(val / 3600);
      m = Math.floor((val % 3600) / 60);
      s = val % 60;
    }

    // input ref 업데이트
    if (hourRef.current) hourRef.current.value = String(h).padStart(2, '0');
    if (minRef.current) minRef.current.value = String(m).padStart(2, '0');

    if (timeType === 'second' && secRef?.current) {
      secRef.current.value = String(s).padStart(2, '0');
    }

    // handleTimeChanges 호출
    const result: Partial<Record<TimeUnit, number>> = { hour: h };
    if (timeType !== 'hour') result.minute = m;
    if (timeType === 'second') result.second = s;

    handleTimeChanges(result);
  };

  return (
    <div className="flex-1 mt-2.5">
      <Slider
        showValueLabel="auto"
        min={0}
        max={maxValue}
        defaultValue={defaultValue}
        onValueCommit={handleSliderCommit}
        onCustomTooltip={(val) => formatLabel(val, timeType)}
        marks={marks}
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
