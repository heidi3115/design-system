import { tv } from 'tailwind-variants';

export const sliderVariants = tv({
  base: '',
  slots: {
    root: [
      'relative flex items-center',
      'data-[orientation=horizontal]:w-full data-[orientation=horizontal]:h-max',
      'data-[orientation=vertical]:w-max data-[orientation=vertical]:h-full',
    ],
    track: [
      'relative grow overflow-hidden',
      'bg-[color-mix(in_srgb,_var(--slider-color),_transparent_60%)]',
      'rounded-full inset-shadow-xs',
      'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    ],
    range: [
      'absolute',
      'bg-[color-mix(in_srgb,_var(--slider-color),_transparent_0%)]',
      'data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
    ],
    thumb: [
      'bg-[color-mix(in_srgb,_var(--slider-color),_transparent_0%)]',
      'block relative z-5 shrink-0 rounded-full border-none outline-hidden shadow-lg inset-shadow-2xs',
      'transition-[color,box-shadow]',
      'ring-[var(--slider-color)]/50 ring-0',
      'hover:ring-5 active:ring-10 focus-visible:ring-10',
      'disabled:pointer-events-none disabled:opacity-50',
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
      default: { thumb: 'size-4' },
      small: { thumb: 'size-2.5' },
      medium: { thumb: 'size-5' },
      large: { thumb: 'size-7' },
      custom: { thumb: '' },
    },
    orientation: {
      horizontal: { root: '' },
      vertical: {
        root: 'flex-col ',
      },
    },
    disabled: {
      true: 'opacity-50 data-[disabled]:opacity-50 pointer-events-none cursor-not-allowed',
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
