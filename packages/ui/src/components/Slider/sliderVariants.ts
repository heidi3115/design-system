import { tv } from 'tailwind-variants';

export const sliderVariants = tv({
  base: '',
  slots: {
    root: [
      'relative flex items-center w-full touch-none select-none',
      'data-[orientation=vertical]:w-auto data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col',
    ],
    track: [
      'overflow-hidden relative grow',
      'rounded-full',
      'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    ],
    range: ['absolute', 'data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'],
    thumb: [
      'ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm ',
      'transition-[color,box-shadow]',
      'hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden ',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
  },
  variants: {
    variant: {
      default: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
      custom: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    size: {
      default: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
      small: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
      medium: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
      large: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
      custom: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    orientation: {
      horizontal: { root: '', track: 'w-full', range: 'h-full' },
      vertical: {
        root: 'flex-col w-auto h-full',
        track: 'h-full',
        range: 'w-full',
      },
    },
    disabled: {
      true: 'opacity-50 data-[disabled]:opacity-50 pointer-events-none cursor-not-allowed',
      false: '',
    },
  },
  compoundVariants: [
    {
      size: 'default',
      orientation: 'horizontal',
      class: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    {
      size: 'default',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    {
      size: 'small',
      orientation: 'horizontal',
      class: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    {
      size: 'small',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    {
      size: 'medium',
      orientation: 'horizontal',
      class: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    {
      size: 'medium',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    {
      size: 'large',
      orientation: 'horizontal',
      class: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
    {
      size: 'large',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: '',
      },
    },
  ],
});
