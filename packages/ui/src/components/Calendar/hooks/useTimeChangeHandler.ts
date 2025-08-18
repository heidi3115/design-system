import { useCallback } from 'react';

type TimeUnit = 'hour' | 'minute' | 'second';

type UseTimeChangeHandlerProps = {
  dateTime?: Date;
  setDateTime: (date: Date) => void;
  onSelect?: (date: Date) => void;
};

type TimeChangeMap = Partial<Record<TimeUnit, number | string>>;

const setterMap: Record<TimeUnit, (date: Date, value: number) => void> = {
  hour: (date, value) => date.setHours(value),
  minute: (date, value) => date.setMinutes(value),
  second: (date, value) => date.setSeconds(value),
};

export function useTimeChangeHandler({ dateTime, setDateTime, onSelect }: UseTimeChangeHandlerProps) {
  const handleSingle = useCallback(
    (unit: TimeUnit) => (value: string | number) => {
      if (!dateTime) return;

      const newDate = new Date(dateTime);
      const parsed = typeof value === 'string' ? parseInt(value, 10) : value;

      setterMap[unit](newDate, parsed);
      setDateTime(newDate);
      onSelect?.(newDate);
    },
    [dateTime, setDateTime, onSelect],
  );

  const handleMultiple = useCallback(
    (changes: TimeChangeMap) => {
      if (!dateTime) return;

      const newDate = new Date(dateTime);

      (Object.entries(changes) as [TimeUnit, number | string][]).forEach(([unit, value]) => {
        const parsed = typeof value === 'string' ? parseInt(value, 10) : value;

        setterMap[unit](newDate, parsed);
      });

      setDateTime(newDate);
      onSelect?.(newDate);
    },
    [dateTime, setDateTime, onSelect],
  );

  return {
    handleTimeChange: handleSingle,
    handleTimeChanges: handleMultiple,
  };
}
