'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../lib/utils';
import { sliderVariants } from '@common/ui/components/Slider/sliderVariants';

export type SliderRootProps = React.ComponentProps<typeof SliderPrimitive.Root>;

function SliderRoot({ className, ...props }: SliderRootProps) {
  return <SliderPrimitive.Root data-slot="slider" className={cn(className)} {...props} />;
}

export type SliderTrackProps = React.ComponentProps<typeof SliderPrimitive.Track>;

function SliderTrack({ className, ...props }: SliderTrackProps) {
  return <SliderPrimitive.Track data-slot="slider-track" className={cn(className)} {...props} />;
}

export type SliderRangeProps = React.ComponentProps<typeof SliderPrimitive.Range>;

function SliderRange({ className, ...props }: SliderRangeProps) {
  return <SliderPrimitive.Range data-slot="slider-range" className={cn(className)} {...props} />;
}

export type SliderThumbProps = React.ComponentProps<typeof SliderPrimitive.Thumb>;

function SliderThumb({ className, ...props }: SliderThumbProps) {
  return <SliderPrimitive.Thumb data-slot="slider-thumb" className={cn(className)} {...props} />;
}

function SliderDefault({
  min = 0,
  max = 100,
  orientation = 'horizontal',
  disabled = false,
  defaultValue,
  value,
  className,
  ...props
}: SliderRootProps) {
  const { base, root, track, range, thumb } = sliderVariants({
    variant: 'primary',
    size: 'default',
    orientation,
    disabled,
  });
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
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(baseClass, rootClass, className)}
      {...props}>
      <SliderTrack className={cn(baseClass, trackClass)}>
        <SliderRange className={cn(baseClass, rangeClass)} />
      </SliderTrack>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderThumb key={index} className={cn(baseClass, thumbClass)} />
      ))}
    </SliderRoot>
  );
}

export { SliderDefault, SliderRoot, SliderTrack, SliderRange, SliderThumb };
