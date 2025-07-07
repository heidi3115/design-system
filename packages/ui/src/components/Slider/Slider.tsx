'use client';

import {
  type CSSProperties,
  type PointerEvent,
  type Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
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
  const { base, root, track, range, thumb } = sliderVariants({ variant, size, orientation, disabled });
  const baseClass = base();
  const rootClass = root();
  const trackClass = track();
  const rangeClass = range();
  const thumbClass = thumb();

  const isHorizontal = orientation === 'horizontal';
  const isControlled = value !== undefined;
  const DefaultValueArray = Array.isArray(defaultValue) ? defaultValue : [min];
  const ValueArray = Array.isArray(value) ? value : [min];
  const [internalValues, setInternalValues] = useState(DefaultValueArray);
  const currentValues = isControlled ? ValueArray : internalValues;

  const sliderWrapperRefs = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const markRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const previousValuesRef = useRef(currentValues);
  const [isThumbMount, setIsThumbMount] = useState(false);
  const [thumbSize, setThumbSize] = useState(0);
  const [labelGap, setLabelGap] = useState({ labelTop: 0, labelLeft: 0 });
  const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null);
  const [hoveredThumbIndex, setHoveredThumbIndex] = useState<number | null>(null);
  const [activeMarkIndex, setActiveMarkIndex] = useState<number[]>(currentValues);
  const [wrapperStyle, setWrapperStyle] = useState<CSSProperties>();

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

      setActiveMarkIndex(newValues);
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

  useImperativeHandle(sliderRef, () => currentValues);

  useEffect(() => {
    previousValuesRef.current = currentValues;
  }, [currentValues]);

  useEffect(() => {
    if (thumbRefs.current[0] && isThumbMount) {
      setThumbSize(thumbRefs.current[0].offsetWidth);
      setLabelGap({ labelTop: thumbRefs.current[0].offsetHeight, labelLeft: thumbRefs.current[0].offsetWidth * 1.5 });
    }
  }, [isThumbMount]);

  useLayoutEffect(() => {
    if (!sliderWrapperRefs.current) return;

    const safeGetRect = (el?: Element | null): DOMRect | undefined => el?.getBoundingClientRect();
    const rects = [
      ...thumbRefs.current.map(safeGetRect),
      ...markRefs.current.map(safeGetRect),
      ...labelRefs.current.map(safeGetRect),
    ].filter((r): r is DOMRect => !!r);

    if (rects.length <= 0) return;

    const left = Math.min(...rects.map((r) => r?.left || 0));
    const top = Math.min(...rects.map((r) => r?.top || 0));
    const right = Math.max(...rects.map((r) => r?.right || 0));
    const bottom = Math.max(...rects.map((r) => r?.bottom || 0));
    const width = right - left;
    const height = bottom - top;

    setWrapperStyle(
      isHorizontal
        ? {
            width: '100%',
            height: `${height + labelGap.labelTop * 2}px`,
          }
        : { width: `${width + labelGap.labelLeft * 2}px`, height: '100%' },
    );
  }, [isThumbMount, isHorizontal, labelGap, currentValues]);

  return (
    <div
      data-slot="slider-wrapper"
      data-orientation={orientation}
      ref={sliderWrapperRefs}
      className={cn(rootClass)}
      style={wrapperStyle}>
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
        onMouseLeave={handleTargetBlur}
        onPointerUp={handleTargetBlur}
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
                ref={(el: HTMLSpanElement | null) => {
                  thumbRefs.current[index] = el;

                  if (!isThumbMount) {
                    setIsThumbMount(true);
                  }
                }}
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
              side={isHorizontal ? 'top' : 'left'}
              open={!disabled && isTooltipOpen}
              contents={`${val.toFixed(decimalPlaces)} ${unitLabel ? unitLabel : ''}`}>
              <SliderThumb
                data-slot="slider-thumb"
                ref={(el: HTMLSpanElement | null) => {
                  thumbRefs.current[index] = el;

                  if (!isThumbMount) {
                    setIsThumbMount(true);
                  }
                }}
                className={cn(baseClass, thumbClass)}
                onMouseEnter={() => setHoveredThumbIndex(index)}
                onMouseLeave={() => setHoveredThumbIndex(null)}
                onPointerUp={handleTargetBlur}
              />
            </Tooltip>
          );
        })}
      </SliderRoot>
      {marks && (
        <span
          data-slot="slider-mark-area"
          className={cn('absolute block -z-2 size-full')}
          style={
            isHorizontal
              ? {
                  width: `calc(100% - ${thumbSize}px)`,
                  height: '100%',
                  top: 0,
                  left: `${thumbSize / 2}px`,
                }
              : { width: '100%', height: `calc(100% - ${thumbSize}px)`, top: `${thumbSize / 2}px`, left: 0 }
          }>
          {!!processedMarks?.length &&
            processedMarks.map(({ value: markValue, label, labelClass }, idx) => {
              const isActiveMark = activeMarkIndex?.includes(markValue);

              return (
                idx !== 0 &&
                idx !== processedMarks.length && (
                  <span
                    key={markValue}
                    data-value={markValue}
                    data-slot="slider-mark"
                    className={cn('absolute block -z-1 size-max')}
                    ref={(el: HTMLSpanElement | null) => {
                      markRefs.current[idx] = el;
                    }}
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
                            top: '50%',
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
                            left: '50%',
                          }
                    }>
                    <span
                      data-slot="mark-point"
                      className={cn(
                        'relative block size-1',
                        '-translate-x-1/2 -translate-y-1/2',
                        'rounded-full bg-juiText-primary/50',
                      )}
                    />
                    {label && (
                      <span
                        data-slot="mark-label"
                        ref={(el: HTMLSpanElement | null) => {
                          labelRefs.current[idx] = el;
                        }}
                        className={cn(
                          'relative block',
                          isHorizontal ? '-translate-x-1/2 -translate-y-1/2' : '-translate-x-1/2 -translate-y-3/4',
                          'w-max text-xs whitespace-nowrap',
                          isActiveMark && 'font-bold',
                          labelClass,
                        )}
                        style={
                          isHorizontal
                            ? {
                                top: labelGap.labelTop,
                              }
                            : {
                                left: labelGap.labelLeft,
                              }
                        }>
                        {label}
                      </span>
                    )}
                  </span>
                )
              );
            })}
        </span>
      )}
    </div>
  );
}

export default Slider;
