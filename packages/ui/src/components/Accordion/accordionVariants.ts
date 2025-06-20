import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  base: 'bg-transparent outline-none font-normal text-left whitespace-pre-line',
  slots: {
    root: 'flex rounded-md shadow-md',
    item: ['flex flex-col border-transparent'],
    trigger: [
      'flex flex-row gap-1 items-center justify-between w-full',
      'rounded-md font-bold transition-all',
      'disabled:pointer-events-none disabled:opacity-60',
      'focus-visible:rounded-md focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      '[&[data-state=open]>svg[data-slot=trigger-icon]]:rotate-180',
    ],
    triggerIcon: ['shrink-0 transition-transform duration-200 ease-in-out pointer-events-none'],
    content: [
      'overflow-hidden flex',
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    ],
  },
  variants: {
    size: {
      small: { root: 'px-1 py-2 text-xs', trigger: 'px-1 py-2 text-xs', content: 'px-1 py-2 text-xs' },
      basic: { root: 'px-1.5 py-2.5 text-sm', trigger: 'px-1.5 py-2.5 text-sm', content: 'px-1.5 py-2.5 text-sm' },
      medium: { root: 'px-2 py-3 text-base', trigger: 'px-2 py-3 text-base', content: 'px-2 py-3 text-base' },
      large: { root: 'px-2.5 py-3.5 text-lg', trigger: 'px-2.5 py-3.5 text-lg', content: 'px-2.5 py-3.5 text-lg' },
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
