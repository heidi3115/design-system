import { tv } from 'tailwind-variants';

const treeViewVariants = tv({
  base: '',
  slots: {
    common: '',
    root: 'relative overflow-hidden w-full min-h-max rounded-md shadow-md select-none',
    items: [
      'relative flex flex-col w-full',
      '[&_div:has([data-slot=collapsible])]:relative [&_div:has([data-slot=collapsible])]:gap-y-0',
    ],
    itemTrigger: [
      'relative flex flex-row items-center justify-start w-full min-w-0 text-left truncate', //
      'hover:bg-[color-mix(in_srgb,var(--tree-view-color),transparent_60%)]',
      'hover:[&_span[data-slot=item-trigger-icon]]:bg-[var(--tree-view-color)]',
    ],
    itemContent: 'relative flex flex-col w-full min-w-0 select-none truncate',
    icons: 'flex size-max flex-shrink-0 transition-transform duration-200 rounded-full', // rotate-90
  },
  variants: {
    variant: {
      // --tree-view-color 로 색 지정.
      default: { common: '[--tree-view-color:var(--juiGrey-a400)]' },
      primary: { common: '[--tree-view-color:var(--juiPrimary)]' },
      secondary: { common: '[--tree-view-color:var(--juiSecondary)]' },
      error: { common: '[--tree-view-color:var(--juiError)]' },
      transparent: { common: '[--tree-view-color:var(--color-transparent)]' },
    },
    size: {
      small: {
        root: 'p-1',
        items: 'text-xs',
        itemTrigger: 'gap-1 [&:not(:has([data-slot=item-trigger-icon]))]:pl-4',
        itemContent: 'border-l-1 ml-3 pl-3',
        icons: '[&_svg]:size-3 m-1 p-1',
      },
      basic: {
        root: 'p-2',
        items: 'text-sm',
        itemTrigger: 'gap-1.5 [&:not(:has([data-slot=item-trigger-icon]))]:pl-5.5',
        itemContent: 'border-l-1 ml-4 pl-4',
        icons: '[&_svg]:size-4 m-1 p-1 ',
      },
      medium: {
        root: 'p-3',
        items: 'text-base',
        itemTrigger: 'gap-2 [&:not(:has([data-slot=item-trigger-icon]))]:pl-7',
        itemContent: 'border-l-1 ml-5 pl-5',
        icons: '[&_svg]:size-5 m-1 p-1.5',
      },
      large: {
        root: 'p-4',
        items: 'text-lg',
        itemTrigger: 'gap-2.5 p-2 [&:not(:has([data-slot=item-trigger-icon]))]:pl-8.5',
        itemContent: 'border-l-2 ml-7 pl-7',
        icons: '[&_svg]:size-6 m-1 p-1.5',
      },
    },
    showLines: {
      true: {
        itemContent: 'border-juiText-primary/70',
      },
      false: {
        itemContent: 'border-transparent',
      },
    },
    itemSelected: {
      true: {
        items: [],
        itemTrigger: [
          // data-active=true인 경우에만 적용
          '[&[data-active=true]]:bg-[color-mix(in_srgb,var(--tree-view-color),transparent_60%)]',
          '[&[data-active=true]_span[data-slot=item-trigger-icon]]:bg-[var(--tree-view-color)]',
        ],
        icons: '',
      },
    },
    disabled: {
      true: {
        base: 'pointer-events-none cursor-not-allowed opacity-60 hover:cursor-not-allowed',
        items: 'pointer-events-none cursor-not-allowed *:opacity-60 hover:cursor-not-allowed ',
      },
    },
  },
});

export { treeViewVariants };
