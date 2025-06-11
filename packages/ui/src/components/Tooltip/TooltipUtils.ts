import { tv } from 'tailwind-variants';

export const DEFAULT_SIDE_OFFSET = 8;
export const DEFAULT_ALIGN_OFFSET = 0;
export const DEFAULT_DELAY_DURATION = 0;
export const SKIP_DELAY_DURATION = 300;

export type TextAlignType = 'left' | 'center' | 'right';

export const tooltipVariants = tv({
  base: [
    'size-fit z-10',
    'bg-transparent, fill-transparent rounded-md',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
  ],
  slots: {
    content: [
      'p-2',
      'text-white font-medium break-all', // text-balance
      // 'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      // 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',

      // 'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin)'
    ],
    arrow: ['z-15 '], // translate-y-[calc(-50%_-_2px)] // 'fill-inherit bg-inherit'
  },
  variants: {
    variant: {
      default: { base: '', content: 'bg-juiGrey-a700', arrow: 'fill-juiGrey-a700' },
      primary: { base: '', content: 'bg-juiPrimary', arrow: 'fill-juiPrimary' },
      secondary: { base: '', content: 'bg-juiSecondary', arrow: 'fill-juiSecondary' },
      error: { base: '', content: 'bg-juiError', arrow: 'fill-juiError' },
      transparent: { base: '', content: 'bg-juiGrey-200 text-juiText-primary', arrow: 'fill-juiGrey-200' },
      custom: { base: '', content: 'text-juiText-primary', arrow: '' },
    },
    size: {
      small: { base: '', content: 'w-31 p-1.5 text-[10px]', arrow: 'w-2.5 h-1.5' },
      medium: { base: '', content: 'w-64 p-2 text-xs', arrow: 'w-4.5 h-2' },
      large: { base: '', content: 'w-130 p-3 text-sm', arrow: 'w-5.5 h-3' },
      custom: { base: '', content: 'p-2', arrow: 'w-1/1000 min-w-2.5 min-h-1.5' },
    },
    side: {
      top: '',
      bottom: '',
      left: '',
      right: '',
    },
    align: {
      start: '',
      center: '',
      end: '',
    },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    fadeOut: {
      true: ['transition-opacity duration-300'],
    },
    disabled: {
      true: { content: 'opacity-60', arrow: 'opacity-60' },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
});

export default tooltipVariants;
