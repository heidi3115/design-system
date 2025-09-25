import { tv } from 'tailwind-variants';

const TRANSITION_CLASS = [
  'transition-opacity',
  'data-[state=open]:opacity-100 data-[state=delayed-open]:opacity-100 data-[state=instant-open]:opacity-100',
  'data-[state=closed]:opacity-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
];

export const tooltipVariants = tv({
  base: ['size-fit z-10', 'bg-transparent fill-transparent rounded-md shadow-md z-15'],
  slots: {
    content: [
      'p-2',
      'text-white font-medium break-all whitespace-pre-line',
      TRANSITION_CLASS,
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    ],
    arrow: '',
  },
  variants: {
    variant: {
      default: { content: 'bg-juiBackground-tooltip' },
      primary: { content: 'bg-juiPrimary' },
      secondary: { content: 'bg-juiSecondary' },
      error: { content: 'bg-juiError' },
      transparent: { content: 'bg-juiGrey-200 text-juiText-primary' },
      custom: { content: '' },
    },
    size: {
      small: { content: 'w-31 p-1.5 text-[10px]', arrow: 'w-2.5 h-1.5' },
      medium: { content: 'w-64 p-2 text-xs', arrow: 'w-3.5 h-2.5' },
      large: { content: 'w-130 p-3 text-sm', arrow: 'w-5 h-3' },
      custom: { content: 'p-2', arrow: 'w-1/1000 min-w-2.5 min-h-1.5' },
      default: { content: 'w-fit', arrow: 'w-2.5 h-1.5' },
    },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    disabled: {
      true: { content: 'opacity-60', arrow: 'opacity-60' },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    textAlign: 'left',
  },
});

export default tooltipVariants;
