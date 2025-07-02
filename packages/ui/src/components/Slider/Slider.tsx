'use client';

import {
  type PointerEvent,
  type Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { VariantProps } from 'tailwind-variants';
import { cn } from '../../lib/utils';
import { sliderVariants, Tooltip } from '@common/ui';
import { convertValueToPercentage, getDecimalPlaces } from '@common/utils';
import { SliderRange, SliderRoot, type SliderRootProps, SliderThumb, SliderTrack } from './SliderParts';

export type SliderMark = {
  value: number;
  label?: string;
  labelClass?: string;
};

export type SliderProps = SliderRootProps &
  VariantProps<typeof sliderVariants> & {
    showValueLabel?: 'always' | 'auto' | 'none';
    marks?: boolean | SliderMark[];
    unitLabel?: string;
    sliderRef?: Ref<number[]>;
  };

const MIN_INT_VALUE = 0 as const;
const MAX_INT_VALUE = 100 as const;
const DEFAULT_STEP = 1 as const;

function getSizeValue(size: string) {
  if (!size) return 0;
  const REM_PX = 4; // .25rem
  const str = size?.match(/size-([\d.]+)/)?.[1] || String(REM_PX);

  return Number(str) * REM_PX;
}

function Slider({
  variant = 'primary',
  size = 'default',
  orientation = 'horizontal',
  showValueLabel = 'auto',
  unitLabel = '',
  marks = false,
  disabled = false,
  inverted = false,
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
  const { base, root, track, range, thumb, mark, customVal } = sliderVariants({ variant, size, orientation, disabled });
  const baseClass = base();
  const rootClass = root();
  const trackClass = track();
  const rangeClass = range();
  const thumbClass = thumb();
  const marksClass = mark();
  const thumbSize = getSizeValue(customVal());
  const isHorizontal = orientation === 'horizontal';

  const isControlled = value !== undefined;
  const DefaultValueArray = Array.isArray(defaultValue) ? defaultValue : [min];
  const ValueArray = Array.isArray(value) ? value : [min];
  const [internalValues, setInternalValues] = useState(DefaultValueArray);
  const currentValues = isControlled ? ValueArray : internalValues;

  const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null);
  const [hoveredThumbIndex, setHoveredThumbIndex] = useState<number | null>(null);
  const previousValuesRef = useRef(currentValues);

  const decimalPlaces = useMemo(() => getDecimalPlaces(step), [step]);

  const processedMarks: SliderMark[] = useMemo(
    () =>
      marks === true
        ? Array.from({ length: Math.round((max - min) / step) }, (_, idx) => ({
            value: Number((idx * step + min).toFixed(decimalPlaces)),
            label: '',
            labelClass: '',
          }))
        : Array.isArray(marks)
          ? marks
          : [],
    [decimalPlaces, marks, max, min, step],
  );

  const handleTargetBlur = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }
  }, []);

  const handleValueChange = useCallback(
    (newValues: number[]) => {
      const prevValues = previousValuesRef.current || [];

      const prevSet = new Set(prevValues);
      const newSet = new Set(newValues);

      const addedValue = [...newSet].find((val) => !prevSet.has(val));

      if (addedValue !== undefined) {
        const newActiveIndex = newValues.indexOf(addedValue);

        setActiveThumbIndex(newActiveIndex);
      } else {
        const diffIndex = newValues.findIndex((val, i) => val !== prevValues[i]);

        if (diffIndex !== -1) {
          setActiveThumbIndex(diffIndex);
        }
      }

      if (!isControlled) {
        setInternalValues(newValues);
      }

      onValueChange?.(newValues);
    },
    [isControlled, onValueChange],
  );

  const handleValueCommit = useCallback(
    (committedValues: number[]) => {
      setHoveredThumbIndex(null);
      setActiveThumbIndex(null);
      onValueCommit?.(committedValues);
    },
    [onValueCommit],
  );

  useEffect(() => {
    previousValuesRef.current = currentValues;
  }, [currentValues]);

  useImperativeHandle(sliderRef, () => currentValues);

  return (
    <SliderRoot
      disabled={disabled}
      inverted={inverted}
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
      {currentValues.map((val, index) => {
        const isHovering = hoveredThumbIndex === index;
        const isDragging = activeThumbIndex === index;

        let isTooltipOpen = false;

        if (showValueLabel === 'none') {
          return (
            <SliderThumb
              key={index}
              className={cn(baseClass, thumbClass)}
              onMouseEnter={() => setHoveredThumbIndex(index)}
              onMouseLeave={() => setHoveredThumbIndex(null)}
              onPointerUp={handleTargetBlur}
            />
          );
        }

        if (showValueLabel === 'auto') {
          isTooltipOpen = isDragging || (activeThumbIndex === null && isHovering);
        } else if (showValueLabel === 'always') {
          isTooltipOpen = true;
        }

        return (
          <Tooltip
            key={index}
            side={isHorizontal ? 'top' : 'right'}
            open={isTooltipOpen}
            contents={`${val.toFixed(decimalPlaces)} ${unitLabel ? unitLabel : ''}`}>
            <SliderThumb
              data-slot="slider-thumb"
              className={cn(baseClass, thumbClass)}
              onMouseEnter={() => setHoveredThumbIndex(index)}
              onMouseLeave={() => setHoveredThumbIndex(null)}
              onPointerUp={handleTargetBlur}
            />
          </Tooltip>
        );
      })}
      {marks && (
        <div
          data-slot={'slider-mark-area'}
          className={cn('absolute -z-1', isHorizontal ? 'top-1/2 w-full' : 'left-1/2 h-full')}
          style={
            isHorizontal
              ? {
                  width: `calc(100% - ${thumbSize}px)`,
                  left: `${thumbSize / 2}px`,
                }
              : { height: `calc(100% - ${thumbSize}px)`, top: `${thumbSize / 2}px` }
          }>
          {!!processedMarks?.length &&
            processedMarks.map(
              ({ value: markValue, label, labelClass }, idx) =>
                idx !== 0 &&
                idx !== processedMarks.length && (
                  <div
                    key={markValue}
                    data-slot={'slider-mark'}
                    className={cn(
                      marksClass,
                      'size-1',
                      'rounded-full',
                      'bg-juiText-primary/50',
                      isHorizontal ? 'top-1/2' : 'left-1/2',
                    )}
                    style={
                      isHorizontal
                        ? {
                            left: `${
                              inverted
                                ? 100 -
                                  convertValueToPercentage({
                                    value: markValue,
                                    min,
                                    max,
                                  })
                                : convertValueToPercentage({
                                    value: markValue,
                                    min,
                                    max,
                                  })
                            }%`,
                          }
                        : {
                            top: `${
                              inverted
                                ? convertValueToPercentage({
                                    value: markValue,
                                    min,
                                    max,
                                  })
                                : 100 -
                                  convertValueToPercentage({
                                    value: markValue,
                                    min,
                                    max,
                                  })
                            }%`,
                          }
                    }>
                    {label && (
                      <span
                        className={cn(
                          'absolute',
                          isHorizontal ? 'top-full -translate-x-1/2' : '-translate-y-1/2',
                          'text-sm',
                          labelClass,
                        )}
                        style={
                          isHorizontal
                            ? {
                                marginTop: thumbSize,
                              }
                            : {
                                marginLeft: thumbSize,
                              }
                        }>
                        {label}
                      </span>
                    )}
                  </div>
                ),
            )}
        </div>
      )}
    </SliderRoot>
  );
}

export default Slider;
