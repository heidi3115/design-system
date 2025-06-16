import { tv } from 'tailwind-variants';
import { DEFAULT_FADEOUT_DURATION } from '@common/ui/components/Tooltip/Tooltip';

const TRANSITION_CLASS = [
  'transition-opacity',
  'data-[state=open]:opacity-100 data-[state=delayed-open]:opacity-100 data-[state=instant-open]:opacity-100',
  'data-[state=closed]:opacity-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
];
const FADEOUT_DURATION_CLASS = `transition-opacity data-[state=closed]:duration-${DEFAULT_FADEOUT_DURATION}`;

export const tooltipVariants = tv({
  base: ['size-fit z-10', 'bg-transparent fill-transparent rounded-md shadow-md z-15'],
  slots: {
    content: [
      'p-2',
      'text-white font-medium break-all whitespace-pre-line',
      TRANSITION_CLASS,
      FADEOUT_DURATION_CLASS,
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    ],
    arrow: ['-mt-0.5'],
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
      medium: { base: '', content: 'w-64 p-2 text-xs', arrow: 'w-3.5 h-2.5' },
      large: { base: '', content: 'w-130 p-3 text-sm', arrow: 'w-5 h-3' },
      custom: { base: '', content: 'p-2', arrow: 'w-1/1000 min-w-2.5 min-h-1.5' },
    },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    disabled: {
      true: { content: 'opacity-60', arrow: 'opacity-60' },
    },
    fadeOut: {
      true: { content: FADEOUT_DURATION_CLASS },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'small',
  },
});

export default tooltipVariants;
