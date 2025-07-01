import { tv } from 'tailwind-variants';

export const sliderVariants = tv({
  base: '',
  slots: {
    root: [
      'relative flex items-center touch-none select-none',
      'data-[orientation=horizontal]:w-full data-[orientation=horizontal]:h-auto',
      'data-[orientation=vertical]:w-auto data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col',
    ],
    track: [
      'overflow-hidden relative grow',
      'bg-[color-mix(in_srgb,_var(--slider-color),_transparent_60%)]',
      'rounded-full inset-shadow-xs',
      'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    ],
    range: [
      'absolute rounded-md',
      'bg-[color-mix(in_srgb,_var(--slider-color),_transparent_0%)]',
      'data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
    ],
    thumb: [
      'bg-[color-mix(in_srgb,_var(--slider-color),_transparent_0%)]',
      'ring-ring/50 block shrink-0 rounded-full border outline-hidden shadow-sm ',
      'transition-[color,box-shadow]',
      'hover:ring-2 focus-within:ring-2', // active:ring-2 focus:ring-2
      // 'disabled:pointer-events-none disabled:opacity-50',
    ],
  },
  variants: {
    variant: {
      primary: '[--slider-color:var(--juiPrimary)]',
      secondary: '[--slider-color:var(--juiSecondary)]',
      error: '[--slider-color:var(--juiError)]',
      grey: '[--slider-color:var(--juiGrey-a700)]',
      // 커스텀을 위한 슬롯으로 variant 가 custom 일 때는 className에 필수로
      custom: '', // [--slider-color:색상지정] 해야 함.
      // [--slider-color:#ac8fd1] -> 직접 지정 가능
      // [--slider-color:theme(colors.red.500)] -> tailwindCSS 에서 인식하는 색상 가능
      // [--slider-color:var(--juiScore-veryLow)] -> custom.css 에 등록된 색상 가능
      // [--slider-color:oklch(0.7_0.1_304/42.86%)] -> oklch 뿐만 아니라 rgba 등 hsl도 작동은 하나 띄어쓰기 없어야 하고 필요할 경우 tailwind 에서 인식하도록 _ 처리
    },
    size: {
      default: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: 'size-4',
      },
      small: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: 'size-2.5',
      },
      medium: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: 'size-5',
      },
      large: {
        base: '',
        root: '',
        track: '',
        range: '',
        thumb: 'size-7',
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
        track: 'h-1.5',
        // range: 'h-1.5',
        // thumb: '',
      },
    },
    {
      size: 'default',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: 'w-1.5',
        // range: 'w-1.5',
        thumb: '',
      },
    },
    {
      size: 'small',
      orientation: 'horizontal',
      class: {
        base: '',
        root: '',
        track: 'h-1',
        // range: 'h-1',
        // thumb: '',
      },
    },
    {
      size: 'small',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: 'w-1',
        // range: 'w-1',
        thumb: '',
      },
    },
    {
      size: 'medium',
      orientation: 'horizontal',
      class: {
        base: '',
        root: '',
        track: 'h-2',
        // range: '',
        thumb: '',
      },
    },
    {
      size: 'medium',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: 'w-2',
        // range: '',
        thumb: '',
      },
    },
    {
      size: 'large',
      orientation: 'horizontal',
      class: {
        base: '',
        root: '',
        track: 'h-3',
        // range: '',
        thumb: '',
      },
    },
    {
      size: 'large',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: 'w-3',
        // range: '',
        thumb: '',
      },
    },
  ],
});
