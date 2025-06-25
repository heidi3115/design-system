'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import type { VariantProps } from 'tailwind-variants';
import { SliderRange, SliderRoot, type SliderRootProps, SliderThumb, SliderTrack } from './SliderParts';
import { sliderVariants } from '@common/ui/components';

export type SliderProps = SliderRootProps & VariantProps<typeof sliderVariants> & {};

export default function Slider({
  variant = 'default',
  size = 'default',
  orientation = 'horizontal',
  disabled = false,
  defaultValue,
  value,
  min = 0,
  max = 100,
  className,
  ...props
}: SliderProps) {
  const { base, root, track, range, thumb } = sliderVariants({ variant, size, orientation, disabled });
  const baseClass = base();
  const rootClass = root();
  const trackClass = track();
  const rangeClass = range();
  const thumbClass = thumb();

  console.warn('\n\nSlider\norientation :', orientation, 'variant :', variant, 'size :', size);
  console.warn('baseClass :', baseClass);
  console.warn('rootClass :', rootClass);
  console.warn('trackClass :', trackClass);
  console.warn('rangeClass :', rangeClass);
  console.warn('thumbClass :', thumbClass);

  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  return (
    <SliderRoot
      data-slot="slider"
      disabled={disabled}
      orientation={orientation}
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
