'use client';

import { type Ref, useCallback, useImperativeHandle, useState } from 'react';
import { cn } from '../../lib/utils';
import type { VariantProps } from 'tailwind-variants';
import { SliderRange, SliderRoot, type SliderRootProps, SliderThumb, SliderTrack } from './SliderParts';
import { sliderVariants } from './sliderVariants';

export type SliderProps = SliderRootProps &
  VariantProps<typeof sliderVariants> & {
    sliderRef?: Ref<number[]>;
  };

const MIN_INT_VALUE = 0;
const MAX_INT_VALUE = 100;
const DEFAULT_STEP = 1;

export default function Slider({
  variant = 'primary',
  size = 'default',
  orientation = 'horizontal',
  disabled = false,
  min = MIN_INT_VALUE,
  max = MAX_INT_VALUE,
  step = DEFAULT_STEP,
  sliderRef = undefined,
  defaultValue,
  value,
  onValueChange,
  onValueCommit,
  className,
  ...props
}: SliderProps) {
  const { base, root, track, range, thumb } = sliderVariants({ variant, size, orientation, disabled });
  const baseClass = base();
  const rootClass = root();
  const trackClass = track();
  const rangeClass = range();
  const thumbClass = thumb();

  const isControlled = value !== undefined;
  const DefaultValueArray = Array.isArray(defaultValue) ? defaultValue : [min || max];
  const ValueArray = Array.isArray(value) ? value : [min || max];
  const [internalValues, setInternalValues] = useState<number[]>(DefaultValueArray ?? [min || max]);
  const currentValues = isControlled ? ValueArray : internalValues;

  const handleValueChange = useCallback(
    (newValues: number[]) => {
      if (!isControlled) {
        setInternalValues(newValues);
      }

      onValueChange?.(newValues);
    },
    [isControlled, onValueChange],
  );

  const handleValueCommit = useCallback(
    (commitedValues: number[]) => {
      if (onValueCommit) {
        onValueCommit(commitedValues);
      }
    },
    [onValueCommit],
  );

  // 비제어 선택값
  useImperativeHandle(sliderRef, () => currentValues);

  return (
    <SliderRoot
      disabled={disabled}
      orientation={orientation}
      min={min}
      max={max}
      step={step}
      defaultValue={internalValues}
      value={currentValues}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      className={cn(baseClass, rootClass, className)}
      {...props}>
      <SliderTrack className={cn(baseClass, trackClass)}>
        <SliderRange className={cn(baseClass, rangeClass)} />
      </SliderTrack>
      {Array.from({ length: currentValues.length }, (_, index) => (
        <SliderThumb key={index} className={cn(baseClass, thumbClass)} />
      ))}
    </SliderRoot>
  );
}
