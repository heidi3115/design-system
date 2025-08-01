import { tv } from 'tailwind-variants';

const treeViewVariants = tv({
  base: '',
  slots: {
    common: '',
    root: 'relative min-w-max min-h-max rounded-md shadow-md select-none',
    items: [
      'relative flex flex-col w-auto',
      '[&_div:has([data-slot=collapsible])]:relative [&_div:has([data-slot=collapsible])]:gap-y-0',
    ],
    itemTrigger: [
      'relative flex flex-row items-center justify-start w-full text-left',
      'hover:bg-[color-mix(in_srgb,var(--tree-view-color),transparent_60%)]',
    ],
    itemContent: 'relative flex flex-col w-max select-none',
    icons: 'flex size-max flex-shrink-0 transition-transform duration-200', // rotate-90
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
        items: 'gap-1 text-xs',
        itemTrigger: 'gap-1 p-0.5 [&:not(:has([data-slot=item-trigger-icon]))]:pl-1',
        itemContent: 'ml-0.5 pl-1 border-l-1',
        icons: 'p-0.5 [&_svg]:size-2',
      },
      basic: {
        root: 'p-1.5',
        items: 'gap-1.5 text-sm',
        itemTrigger: 'gap-1.5 p-1 [&:not(:has([data-slot=item-trigger-icon]))]:pl-1.5',
        itemContent: 'ml-1 pl-1.5 border-l-1',
        icons: 'p-1 [&_svg]:size-3',
      },
      medium: {
        root: 'p-2',
        items: 'gap-2 text-base',
        itemTrigger: 'gap-2 p-1.5 [&:not(:has([data-slot=item-trigger-icon]))]:pl-2',
        itemContent: 'ml-1.5 pl-2 border-l-1',
        icons: 'p-1.5 [&_svg]:size-4',
      },
      large: {
        root: 'p-4',
        items: 'gap-4 text-base',
        itemTrigger: 'gap-2.5 p-2 [&:not(:has([data-slot=item-trigger-icon]))]:pl-2.5',
        itemContent: 'ml-2 pl-2.5 border-l-2',
        icons: 'p-2 [&_svg]:size-5',
      },
      custom: {
        items: '',
        itemTrigger: '',
        itemContent: '',
        icons: '',
      },
    },
    showLines: {
      true: {
        itemContent: 'border-juiText-primary',
      },
      false: {
        itemContent: 'border-transparent',
      },
    },
    itemSelected: {
      true: {
        itemTrigger: [
          // data-active=true인 경우에만 배경색 적용
          '[&[data-active=true]]:bg-[color-mix(in_srgb,var(--tree-view-color),transparent_60%)]',
          // data-active=true인 경우에만 자식 span에 배경색 적용
          '[&[data-active=true]_span[data-slot=item-trigger-icon]]:bg-[var(--tree-view-color)]',
        ],
        icons: 'rounded-full', // active:[&_span[data-slot=item-trigger-icon]]:bg-[var(--tree-view-color)] [&[data-active=true]]:bg-[var(--tree-view-color)
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
