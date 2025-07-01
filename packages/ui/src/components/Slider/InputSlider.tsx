'use client';

import { Fragment, useCallback, useState } from 'react';
import { cn } from '../../lib/utils';
import { Input } from '@common/ui';
import Slider, { DEFAULT_STEP, MAX_INT_VALUE, MIN_INT_VALUE, type SliderProps } from './Slider';

export type InputSliderProps = SliderProps & {
  inputPosition?: 'left' | 'right';
  unitWord?: string;
  inputClass?: string;
  sliderClass?: string;
};

function InputSlider({
  inputPosition = 'left',
  min = MIN_INT_VALUE,
  max = MAX_INT_VALUE,
  step = DEFAULT_STEP,
  unitWord = '',
  orientation = 'horizontal',
  defaultValue,
  value,
  onValueChange,
  inputClass,
  sliderClass,
  className,
  disabled,
  ...props
}: InputSliderProps) {
  const isControlled = value !== undefined;
  const [internalValues, setInternalValues] = useState<number[]>(defaultValue ?? [min]);
  const currentValues = isControlled ? value : internalValues;

  const handleValueUpdate = useCallback(
    (newValues: number[]) => {
      const arrangedValues: number[] = newValues.map((val: number) => Math.max(min, Math.min(max, val)));

      if (!isControlled) {
        setInternalValues(arrangedValues);
      }

      onValueChange?.(arrangedValues);
    },
    [isControlled, min, max, onValueChange],
  );

  const handleInputChange = useCallback(
    (index: number, newInputValue: string) => {
      const clampingValue = Number.isNaN(parseFloat(newInputValue))
        ? min
        : Math.max(min, Math.min(max, parseFloat(newInputValue)));

      const newValues = [...currentValues];

      newValues[index] = clampingValue;

      handleValueUpdate(newValues);
    },
    [currentValues, handleValueUpdate, min, max],
  );

  const inputArray = currentValues.map((val, idx) => (
    <Fragment key={`sliderInput-${idx}-${val}`}>
      <Input
        name={`sliderInput-${idx}`}
        type="number"
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        value={String(val)}
        onChange={(e) => handleInputChange(idx, e.target.value)}
        className={inputClass}
      />
      <span className={cn()}>{unitWord}</span>
    </Fragment>
  ));

  return (
    <div
      className={cn(
        `flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} gap-2.5 items-center justify-center size-full`,
        className,
      )}>
      {inputPosition === 'left' && inputArray}
      <Slider
        {...props}
        disabled={disabled}
        orientation={orientation}
        min={min}
        max={max}
        step={step}
        value={currentValues}
        onValueChange={handleValueUpdate}
        className={sliderClass}
      />
      {inputPosition === 'right' && inputArray}
    </div>
  );
}

export default InputSlider;
