'use client';

import { type RefObject } from 'react';

import { Input } from '../../../components';

type TimeUnit = 'hour' | 'minute' | 'second';
type TimeInputProps = {
  refObj: RefObject<HTMLInputElement | null>;
  defaultValue: string;
  timeType: TimeUnit;
  handleTimeChange: (unit: TimeUnit) => (value: string) => void;
};

function TimeInput({ refObj, defaultValue, timeType, handleTimeChange }: TimeInputProps) {
  const isNotFocused = <T extends HTMLElement>(ref: RefObject<T | null>): ref is RefObject<T & { value: string }> => {
    return typeof window !== 'undefined' && ref.current !== null && ref.current !== document.activeElement;
  };

  return (
    <Input
      type="number"
      min={0}
      max={timeType === 'hour' ? 23 : 59}
      ref={refObj}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        if (e.key === '.' || e.key === 'e') {
          e.preventDefault();
        }
      }}
      onChange={(e) => {
        const value = e.target.value.trim();

        if (isNotFocused(refObj)) {
          handleTimeChange(timeType)(value);
        }
      }}
      onBlur={(e) => {
        const value = e.target.value.trim();

        handleTimeChange(timeType)(value);

        requestAnimationFrame(() => {
          if (isNotFocused(refObj) && refObj.current) {
            refObj.current.value = value.replace(/^0+/, '').padStart(2, '0');
          }
        });
      }}
      underline="default"
      className="border-b-1 w-14 !h-6 !min-h-6"
    />
  );
}

export default TimeInput;
