import { tv } from 'tailwind-variants';

const autoCompleteVariants = tv({
  slots: {
    height: '',
    width: '',
    error: '',
    popoverBase:
      'bg-juiBackground-default animate-in fade-in-0 zoom-in-95 z-10 outline-none w-full h-fit p-0 rounded-none',
    triggerBase: [
      'flex w-full items-center justify-between gap-2 truncate',
      'px-3 py-2 pr-8 light:border light:border-juiBorder-primary shadow-xs',
      'cursor-pointer',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'bg-juiBackground-input',
      'aria-invalid:border-juiError aria-invalid:ring-juiError/20 dark:aria-invalid:ring-juiError/40',
      'placeholder:text-juiText-secondary',
      'data-[state=open]:border data-[state=open]:border-juiBorder-primary light:data-[state=open]:border-juiText-secondary',
      'outline-none focus-visible:ring-0',
      'transition-[color,box-shadow]',
    ],
    itemBase: [
      'cursor-pointer flex w-full items-center gap-2 rounded-none py-1.5',
      '[&>.itemLabel]:block [&>.itemLabel]:truncate',
    ],
    groupLabelBase: 'px-2 py-1.5 text-xs text-juiText-secondary',
    checkIconBase: 'absolute right-2 flex size-3.5 items-center justify-center',
    chevronIconBase: `absolute right-3 -translate-y-1/2 pointer-events-none cursor-pointer [&_svg]:size-4 [&_svg]:transition-transform [&_svg]:duration-200'`,
  },
  variants: {
    width: {
      full: { width: 'w-full' },
    },
    size: {
      small: { height: 'h-7' },
      default: { height: 'h-8' },
      large: { height: 'h-9' },
    },
    error: {
      true: { error: 'border border-juiError light:border-juiError' },
      false: { error: 'focus:border-juiText-primary light:focus:border-juiText-secondary' }, // 에러 아닐 때만 기본 파란색 포커스
    },
  },
  defaultVariants: {
    width: 'full',
    size: 'default',
    error: false,
  },
});

export default autoCompleteVariants;
