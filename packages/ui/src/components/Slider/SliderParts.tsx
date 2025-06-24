'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../lib/utils';
import { sliderVariants } from '@common/ui/components/Slider/sliderVariants';

export type SliderRootProps = React.ComponentProps<typeof SliderPrimitive.Root>;

function SliderRoot({ className, ...props }: SliderRootProps) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      // defaultValue={defaultValue}
      // value={value}
      // min={min}
      // max={max}
      className={cn(
        // 'relative flex w-full touch-none items-center select-none ',
        // 'data-[disabled]:opacity-50 ',
        // 'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        // 'data-[orientation=vertical]:min-h-44 ',
        className,
      )}
      {...props}
    />
  );
}

export type SliderTrackProps = React.ComponentProps<typeof SliderPrimitive.Track>;

function SliderTrack({ className, ...props }: SliderTrackProps) {
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn(
        // 'relative grow overflow-hidden ',
        // 'rounded-full ',
        // 'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
        // 'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5',
        className,
      )}
      {...props}
    />
  );
}

export type SliderRangeProps = React.ComponentProps<typeof SliderPrimitive.Range>;

function SliderRange({ className, ...props }: SliderRangeProps) {
  return (
    <SliderPrimitive.Range
      data-slot="slider-range"
      className={cn(
        // 'absolute ',
        // 'data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
        className,
      )}
      {...props}
    />
  );
}

export type SliderThumbProps = React.ComponentProps<typeof SliderPrimitive.Thumb>;

function SliderThumb({ className, ...props }: SliderThumbProps) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        // 'ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm ',
        // 'transition-[color,box-shadow] ',
        // 'hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden ',
        // 'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function SliderDefault({ className, defaultValue, value, min = 0, max = 100, orientation, ...props }: SliderRootProps) {
  const { base, root, track, range, thumb } = sliderVariants({ variant: 'default', size: 'default', orientation });
  const baseClass = base();
  const rootClass = root();
  const trackClass = track();
  const rangeClass = range();
  const thumbClass = thumb();

  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  return (
    <SliderRoot
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(baseClass, rootClass, className)}
      {...props}>
      <SliderTrack data-slot="slider-track" className={cn(baseClass, trackClass)}>
        <SliderRange data-slot="slider-range" className={cn(baseClass, rangeClass)} />
      </SliderTrack>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderThumb data-slot="slider-thumb" key={index} className={cn(baseClass, thumbClass)} />
      ))}
    </SliderRoot>
  );
}

export { SliderDefault, SliderRoot, SliderTrack, SliderRange, SliderThumb };
