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
      'rounded-full inset-shadow-xs pointer-events-none',
      'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    ],
    range: [
      'absolute rounded-md',
      'bg-[color-mix(in_srgb,_var(--slider-color),_transparent_0%)]',
      'data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
    ],
    thumb: [
      'bg-[color-mix(in_srgb,_var(--slider-color),_transparent_0%)]',
      'block z-20 shrink-0 rounded-full border outline-hidden shadow-sm ',
      'transition-[color,box-shadow]',
      'ring-ring/50 hover:ring-2 focus-visible:ring-2',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    mark: [
      'absolute -translate-x-1/2 -translate-y-1/2',
      'touch-none select-none',
      'data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
    ],
    customVal: '', // 동적 Thumb 사이즈 처리 위함.
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
      default: { thumb: 'size-4', customVal: 'size-4' },
      small: { thumb: 'size-2.5', customVal: 'size-2.5' },
      medium: { thumb: 'size-5', customVal: 'size-5' },
      large: { thumb: 'size-7', customVal: 'size-7' },
      custom: { thumb: '' },
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
        track: 'h-1.5',
      },
    },
    {
      size: 'default',
      orientation: 'vertical',
      class: {
        track: 'w-1.5',
      },
    },
    {
      size: 'small',
      orientation: 'horizontal',
      class: {
        track: 'h-1',
      },
    },
    {
      size: 'small',
      orientation: 'vertical',
      class: {
        track: 'w-1',
      },
    },
    {
      size: 'medium',
      orientation: 'horizontal',
      class: {
        track: 'h-2',
      },
    },
    {
      size: 'medium',
      orientation: 'vertical',
      class: {
        track: 'w-2',
      },
    },
    {
      size: 'large',
      orientation: 'horizontal',
      class: {
        track: 'h-3',
      },
    },
    {
      size: 'large',
      orientation: 'vertical',
      class: {
        base: '',
        root: '',
        track: 'w-3',
        range: '',
      },
    },
  ],
});
