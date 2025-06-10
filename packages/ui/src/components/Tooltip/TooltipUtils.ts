import { tv } from 'tailwind-variants';

export const DEFAULT_SIDE_OFFSET = 5;
export const DEFAULT_ALIGN_OFFSET = 5;
export const DEFAULT_DELAY_DURATION = 700;
export const SKIP_DELAY_DURATION = 300;

export const BasicTooltipVariants = tv({
  base: [
    'size-fit',
    'text-juiText-primary',
    'bg-juiBackground-paper rounded-md',
    // 'animate-in fade-in-0 zoom-in-95',
    // 'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
  ],
  slots: {
    content: [
      'text-juiText-default font-medium text-balance', // bg-juiText-secondary
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      // 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      '',
      // 'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin)'
    ],
    arrow: [''],
  },
  variants: {
    size: {
      small: 'p-2 bg-lime-300',
      medium: 'p-4 bg-orange-300',
      large: 'p-6 bg-pink-300',
      custom: 'bg-sky-300',
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
    fadeOut: {
      true: ['transition-opacity duration-300'],
    },
  },
});

export default BasicTooltipVariants;
