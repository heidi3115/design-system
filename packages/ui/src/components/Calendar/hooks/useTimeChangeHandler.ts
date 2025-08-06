import { useCallback } from 'react';

type TimeUnit = 'hour' | 'minute' | 'second';

type UseTimeChangeHandlerProps = {
  dateTime?: Date;
  setDateTime: (date: Date) => void;
  onSelect?: (date: Date) => void;
};

const setterMap: Record<TimeUnit, (date: Date, value: number) => void> = {
  hour: (date, value) => date.setHours(value),
  minute: (date, value) => date.setMinutes(value),
  second: (date, value) => date.setSeconds(value),
};

export function useTimeChangeHandler({ dateTime, setDateTime, onSelect }: UseTimeChangeHandlerProps) {
  return useCallback(
    (unit: TimeUnit) => (value: string) => {
      if (!dateTime) return;

      const newDate = new Date(dateTime);
      const parsed = parseInt(value);

      setterMap[unit](newDate, parsed);

      setDateTime(newDate);
      onSelect?.(newDate);
    },
    [dateTime, setDateTime, onSelect],
  );
}
