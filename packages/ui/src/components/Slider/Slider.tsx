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
import { sliderVariants, Tooltip, type TooltipProps } from '@common/ui';
import useExtractClassName from '../../hooks/useExtractClassName';
import { convertValueToPercentage, getDecimalPlaces, useRect } from '@common/utils';
import { SliderRange, SliderRoot, type SliderRootProps, SliderThumb, SliderTrack } from './SliderParts';

export type SliderMark = {
  value: number;
  label?: string;
  labelClass?: string;
};

export type SliderProps = SliderRootProps &
  VariantProps<typeof sliderVariants> & {
    showValueLabel?: 'always' | 'auto' | 'none';
    onCustomTooltip?: (val: number) => string;
    marks?: boolean | SliderMark[];
    unitLabel?: string;
    sliderRef?: Ref<number[]>;
    wrapperClassName?: string;
    tooltipProps?: Omit<TooltipProps, 'open' | 'contents' | 'children' | 'trigger'>;
  };

const MIN_INT_VALUE = 0 as const;
const MAX_INT_VALUE = 100 as const;
const DEFAULT_STEP = 1 as const;
const LABEL_GAP = 4 as const;

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
  onCustomTooltip,
  className,
  wrapperClassName,
  tooltipProps,
  ...props
}: SliderProps) {
  const { base, root, track, range, thumb } = sliderVariants({ variant, size, orientation, disabled });
  const baseClass = base();
  const rootClass = root();
  const trackClass = track();
  const rangeClass = range();
  const thumbClass = thumb();

  const thumbVariantsRadius = useExtractClassName(thumbClass, 'size-');

  const isHorizontal = orientation === 'horizontal';
  const isControlled = value !== undefined;
  const DefaultValueArray = Array.isArray(defaultValue) ? defaultValue : [min];
  const ValueArray = Array.isArray(value) ? value : [min];
  const [internalValues, setInternalValues] = useState(DefaultValueArray);
  const currentValues = isControlled ? ValueArray : internalValues;

  const thumbRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const trackRef = useRef<HTMLSpanElement>(null);

  const [isThumbMount, setIsThumbMount] = useState(false);
  const [thumbSize, setThumbSize] = useState(0);

  const { width: trackWidth, height: trackHeight } = useRect(trackRef);
  const [trackSize, setTrackSize] = useState(0);

  const previousValuesRef = useRef(currentValues);
  const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null);
  const [hoveredThumbIndex, setHoveredThumbIndex] = useState<number | null>(null);
  const [activeMarkIndex, setActiveMarkIndex] = useState<number[]>(currentValues);

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
    }
  }, [isThumbMount]);

  useEffect(() => {
    if (isHorizontal) {
      setTrackSize(trackHeight);
    } else {
      setTrackSize(trackWidth);
    }
  }, [isHorizontal, trackWidth, trackHeight]);

  return (
    <div
      data-slot="slider-wrapper"
      className={cn('relative pointer-events-none z-0', isHorizontal ? 'w-full' : 'h-full', wrapperClassName)}
      data-orientation={orientation}
      style={{
        ...(marks
          ? isHorizontal
            ? { marginTop: `${thumbSize / 2 - trackSize / 2 + LABEL_GAP}px` }
            : { marginLeft: `${thumbSize / 2 - trackSize / 2 + LABEL_GAP}px` }
          : isHorizontal
            ? { height: `${thumbSize / 2 + trackSize}px`, marginTop: `${thumbSize / 2}px` }
            : { width: `${thumbSize / 2 + trackSize}px`, marginLeft: `${thumbSize / 2}px` }),
      }}>
      <div className={cn('absolute pointer-events-none', isHorizontal ? 'w-full top-0' : 'h-full left-0')}>
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
          <SliderTrack ref={trackRef} className={cn(baseClass, trackClass)}>
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
                contents={
                  onCustomTooltip ? onCustomTooltip(val) : `${val.toFixed(decimalPlaces)} ${unitLabel ? unitLabel : ''}`
                }
                {...tooltipProps}>
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
      </div>
      {marks && (
        <div
          className={cn('relative flex m-auto pointer-events-none', isHorizontal ? 'flex-col' : 'flex-row')}
          style={{
            ...(isHorizontal
              ? { width: `calc(100% - ${thumbSize || Number(thumbVariantsRadius ?? 4) * 8}px)` }
              : { height: `calc(100% - ${thumbSize || Number(thumbVariantsRadius ?? 4) * 8}px)` }),
          }}>
          {!!thumbSize && !!trackSize ? (
            <>
              {/* 마커 */}
              <div
                className="relative w-full -z-1"
                data-slot="slider-mark-area"
                style={{
                  ...(isHorizontal ? { height: `${trackSize}px` } : { width: `${trackSize}px` }),
                }}>
                {!!processedMarks?.length &&
                  processedMarks.map(({ value: markValue }, idx) => {
                    const percentage = convertValueToPercentage({ value: markValue, min, max });
                    const markerStyle = isHorizontal
                      ? {
                          left: `${inverted ? 100 - percentage : percentage}%`,
                          top: '50%',
                        }
                      : {
                          top: `${inverted ? percentage : 100 - percentage}%`,
                          left: '50%',
                        };

                    return (
                      idx !== 0 &&
                      idx !== processedMarks.length && (
                        <span
                          key={markValue}
                          data-value={markValue}
                          data-slot="slider-mark"
                          className={cn('absolute block size-max')}
                          style={markerStyle}>
                          <span
                            data-slot="mark-point"
                            className={cn(
                              'relative block size-1',
                              '-translate-x-1/2 -translate-y-1/2',
                              'rounded-full bg-juiText-primary/50',
                            )}
                          />
                        </span>
                      )
                    );
                  })}
              </div>

              {/* 라벨 */}
              <div className="relative flex">
                {isHorizontal ? (
                  <span
                    className="w-fit relative -translate-x-1/2 invisible"
                    style={{ marginTop: `${thumbSize / 2 - trackSize / 2 + LABEL_GAP}px` }}>
                    {processedMarks.filter((mark) => mark.label).slice(-1)[0]?.label}
                  </span>
                ) : (
                  <span
                    className="h-fit relative -translate-y-1/2 invisible"
                    style={{ marginLeft: `${thumbSize / 2 - trackSize / 2 + LABEL_GAP}px` }}>
                    {processedMarks.filter((mark) => mark.label).slice(-1)[0]?.label}
                  </span>
                )}
                {!!processedMarks?.length &&
                  processedMarks
                    .filter((mark) => mark.label)
                    .map(({ value: markValue, label, labelClass }, idx) => {
                      const isActiveMark = activeMarkIndex?.includes(markValue);

                      const offset = `${thumbSize / 2 - trackSize / 2 + LABEL_GAP}px`;
                      const percentage = convertValueToPercentage({ value: markValue, min, max });

                      const position = isHorizontal
                        ? `${inverted ? 100 - percentage : percentage}%`
                        : `${inverted ? percentage : 100 - percentage}%`;

                      const labelStyle = isHorizontal
                        ? { marginTop: offset, left: position }
                        : { marginLeft: offset, top: position };

                      return (
                        <span
                          key={idx}
                          data-slot="mark-label"
                          className={cn(
                            'absolute block',
                            isHorizontal ? '-translate-x-1/2' : '-translate-y-1/2',
                            'w-max text-xs whitespace-nowrap',
                            isActiveMark && 'font-bold',
                            labelClass,
                          )}
                          style={labelStyle}>
                          {label}
                        </span>
                      );
                    })}
              </div>
            </>
          ) : (
            <div
              className={cn(
                isHorizontal
                  ? `w-full h-${Number(thumbVariantsRadius ?? 4) * 2}`
                  : `h-full w-h-${Number(thumbVariantsRadius ?? 4) * 2}`,
              )}></div>
          )}
        </div>
      )}
    </div>
  );
}

export default Slider;
