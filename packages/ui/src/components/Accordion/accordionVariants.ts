import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  base: 'bg-transparent outline-none font-normal text-left whitespace-pre-line',
  slots: {
    root: 'flex rounded-md shadow-md',
    item: [
      'flex flex-col gap-3 border-transparent',
      'focus-within:rounded-md focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
    ],
    trigger: [
      'flex flex-row gap-1 items-center justify-between',
      'rounded-md font-bold transition-all',
      'disabled:pointer-events-none disabled:opacity-60',
      '[&[data-state=open]>svg[data-slot=trigger-icon]]:rotate-180',
    ],
    triggerIcon: ['shrink-0 translate-y-0.5 transition-transform duration-200 ease-in-out pointer-events-none'],
    content: [
      'overflow-hidden flex',
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    ],
  },
  variants: {
    size: {
      small: 'px-1 py-2 text-xs',
      basic: 'px-1.5 py-2.5 text-sm',
      medium: 'px-2 py-3 text-base',
      large: 'px-2.5 py-3.5 text-lg',
      custom: { root: '', item: 'border-0', trigger: '', triggerIcon: '', content: '' },
    },
    isHorizontal: {
      true: { root: 'flex-row' },
      false: { root: 'flex-col' },
    },
    isBorder: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      isHorizontal: true,
      isBorder: true,
      class: { item: 'border-r-1 border-r-juiText-primary last:border-r-transparent' },
    },
    {
      isHorizontal: false,
      isBorder: true,
      class: { item: 'border-b-1 border-b-juiText-primary last:border-b-transparent' },
    },
  ],
});

export default accordionVariants;
