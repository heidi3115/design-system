// customSliderTooltip.tsx

'use client';

import { cn } from '../../lib/utils';
import type { VariantProps } from 'tailwind-variants';
import { SliderRange, SliderRoot, type SliderRootProps, SliderThumb, SliderTrack } from './SliderParts';
import { sliderVariants, Tooltip } from '@common/ui';
import { type Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

export type SliderProps = SliderRootProps &
  VariantProps<typeof sliderVariants> & {
    showValueLabel?: 'always' | 'auto' | 'none';
    sliderRef?: Ref<number[]>;
  };

export const MIN_INT_VALUE = 0;
export const MAX_INT_VALUE = 100;
export const DEFAULT_STEP = 1;

function Slider({
  variant = 'primary',
  size = 'default',
  orientation = 'horizontal',
  disabled = false,
  min = MIN_INT_VALUE,
  max = MAX_INT_VALUE,
  step = DEFAULT_STEP,
  sliderRef = undefined,
  showValueLabel = 'auto',
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
  const DefaultValueArray = Array.isArray(defaultValue) ? defaultValue : [min];
  const ValueArray = Array.isArray(value) ? value : [min];
  const [internalValues, setInternalValues] = useState<number[]>(DefaultValueArray);
  const currentValues = isControlled ? ValueArray : internalValues;

  // --- Tooltip 로직을 위한 상태 ---
  const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null); // 드래그 중인 Thumb
  const [hoveredThumbIndex, setHoveredThumbIndex] = useState<number | null>(null); // 호버 중인 Thumb
  const previousValuesRef = useRef(currentValues);

  // const handleInactiveThumb = () => {
  //   setActiveThumbIndex(null);
  //   setHoveredThumbIndex(null);
  // };

  // --- 기존 핸들러에 Tooltip 로직 통합 ---
  const handleValueChange = useCallback(
    (newValues: number[]) => {
      const prevValues = previousValuesRef.current || [];

      console.warn('newValues :', newValues);
      console.warn('prevValues :', prevValues);

      // Set을 사용하여 사라진 값과 추가된 값을 찾습니다.
      const prevSet = new Set(prevValues);
      const newSet = new Set(newValues);

      // 새로 추가된 값을 찾습니다. (드래그된 Thumb의 새 위치)
      const addedValue = [...newSet].find((val) => !prevSet.has(val));

      // 하나의 새로운 값이 명확하게 식별된 경우
      if (addedValue !== undefined) {
        const newActiveIndex = newValues.indexOf(addedValue);

        setActiveThumbIndex(newActiveIndex);
        console.warn('newActiveIndex :', newActiveIndex);
      }
      // 명확한 추가/삭제가 없는 복잡한 경우 (예: 여러 값이 한 번에 변경)
      // 기존의 diffIndex 로직을 최후의 수단으로 사용합니다.
      else {
        const diffIndex = newValues.findIndex((val, i) => val !== prevValues[i]);

        if (diffIndex !== -1) {
          setActiveThumbIndex(diffIndex);
          console.warn('diffIndex :', diffIndex);
        }
      }

      // 제어/비제어 로직
      if (!isControlled) {
        setInternalValues(newValues);
      }

      onValueChange?.(newValues);
    },
    [isControlled, onValueChange],
  );

  const handleValueCommit = useCallback(
    (committedValues: number[]) => {
      setActiveThumbIndex(null);
      setHoveredThumbIndex(null);
      onValueCommit?.(committedValues);
    },
    [onValueCommit],
  );

  // currentValues가 변경될 때마다 ref를 업데이트하여 이전 값을 추적
  useEffect(() => {
    previousValuesRef.current = currentValues;
  }, [currentValues]);

  useImperativeHandle(sliderRef, () => currentValues);

  return (
    <SliderRoot
      disabled={disabled}
      orientation={orientation}
      min={min}
      max={max}
      step={step}
      defaultValue={internalValues} // 내부적인 비제어 처리용이자 정제된 internalValues 사용.
      value={currentValues}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      className={cn(baseClass, rootClass, className)}
      // onMouseLeave={handleInactiveThumb}
      // onPointerUp={handleInactiveThumb}
      {...props}>
      <SliderTrack className={cn(baseClass, trackClass)}>
        <SliderRange className={cn(baseClass, rangeClass)} />
      </SliderTrack>
      {currentValues.map((val, index) => {
        const isHovering = hoveredThumbIndex === index;
        const isDragging = activeThumbIndex === index;

        let isTooltipOpen = false;

        if (showValueLabel === 'none') {
          isTooltipOpen = false;
        } else if (showValueLabel === 'auto') {
          isTooltipOpen = isDragging || (activeThumbIndex === null && isHovering);
        } else if (showValueLabel === 'always') {
          isTooltipOpen = true;
        }

        console.warn(
          'index :',
          index,
          'hoveredThumbIndex :',
          hoveredThumbIndex,
          'activeThumbIndex :',
          activeThumbIndex,
        );

        console.warn('isHovering :', isHovering, 'isDragging :', isDragging, 'isTooltipOpen :', isTooltipOpen);

        return (
          <Tooltip key={index} open={isTooltipOpen} contents={val}>
            <SliderThumb
              className={cn(baseClass, thumbClass)}
              onMouseEnter={() => setHoveredThumbIndex(index)}
              onMouseLeave={() => setHoveredThumbIndex(null)}
            />
          </Tooltip>
        );
      })}
    </SliderRoot>
  );
}

export default Slider;
