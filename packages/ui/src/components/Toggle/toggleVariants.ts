import { tv } from 'tailwind-variants';

const toggleVariants = tv({
  base: [
    'cursor-pointer',
    'inline-flex items-center justify-center gap-2',
    'rounded-sm',
    'text-sm font-medium',
    'whitespace-nowrap',

    // 상태별 스타일
    'hover:bg-muted hover:text-muted-foreground',
    'disabled:pointer-events-none disabled:opacity-50',

    // 포커스/접근성
    'focus-visible:border-ring',
    'focus-visible:ring-ring/50',
    'focus-visible:ring-[3px]',
    'outline-none',
    'aria-invalid:ring-destructive/20',
    'dark:aria-invalid:ring-destructive/40',
    'aria-invalid:border-destructive',

    // 아이콘
    '[&_svg]:pointer-events-none',
    "[&_svg:not([class*='size-'])]:size-4",
    '[&_svg]:shrink-0',

    // 트랜지션
    'transition-[color,box-shadow]',
  ],
  variants: {
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent shadow-xs',
    },
    size: {
      default: 'h-9 px-2 min-w-15',
      small: 'h-8 px-1.5 min-w-8',
      large: 'h-10 px-2.5 min-w-30',
    },
    state: {
      on: 'text-white-500',
      off: 'text-juiText-secondary',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      state: 'on',
      class: 'border-blue-500',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    state: 'off',
  },
});

export default toggleVariants;
