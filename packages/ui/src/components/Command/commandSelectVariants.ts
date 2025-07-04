import { tv } from 'tailwind-variants';

const commandSelectVariants = tv({
  slots: {
    height: '',
    minHeight: '',
    badgeHeight: '',
    badgeColor: '',
    width: '',
    error: '',
    popoverWrapperBase: 'relative flex flex-col flex-1',
    popoverBase:
      'bg-juiBackground-default animate-in fade-in-0 zoom-in-95 z-10 outline-none w-full h-fit p-0 rounded-none',
    triggerBase: [
      'flex w-full items-center justify-between gap-2 truncate',
      'px-3 py-2 pr-8 light:border light:border-juiBorder-primary shadow-xs',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'bg-juiBackground-input',
      'aria-invalid:border-juiError aria-invalid:ring-juiError/20 dark:aria-invalid:ring-juiError/40',
      'placeholder:text-juiText-secondary',
      'data-[state=open]:border data-[state=open]:border-juiText-primary light:data-[state=open]:border-juiText-secondary',
      'outline-none focus-visible:ring-0',
      'transition-[color,box-shadow]',
    ],
    multiTriggerWrapperBase: [
      'flex flex-wrap justify-start gap-1 py-1.5 pl-2 h-auto',
      'bg-juiBackground-input',
      'light:border light:border-juiBorder-primary shadow-xs',
      'data-[state=open]:border data-[state=open]:border-juiText-primary light:data-[state=open]:border-juiText-secondary',
    ],
    multiTriggerBase: [
      'flex-1 min-w-[60px] px-1 py-0 pr-8 border-none focus:outline-none bg-transparent',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'placeholder:text-juiText-secondary',
      'outline-none focus-visible:ring-0',
      'transition-[color,box-shadow]',
    ],
    itemBase: [
      'cursor-pointer flex w-full items-center gap-2 rounded-none py-1.5',
      '[&>.itemLabel]:block [&>.itemLabel]:truncate',
    ],
    groupLabelBase: 'px-2 py-1.5 text-xs text-juiText-secondary',
    checkIconBase: 'absolute right-2 flex size-3.5 items-center justify-center',
    inputIconBase: `flex absolute right-3 -translate-y-1/2 [&_svg]:size-4`,
    chevronIconBase: 'pointer-events-none cursor-pointer [&_svg]:transition-transform [&_svg]:duration-200',
    allClearIconBase: 'hidden group-hover:flex right-7 cursor-pointer opacity-50 hover:opacity-100',
  },
  variants: {
    width: {
      full: { width: 'w-full' },
    },
    size: {
      small: { height: 'h-7', minHeight: 'min-h-7', badgeHeight: 'h-4 text-[10px] [&_svg]:size-3' },
      default: { height: 'h-8', minHeight: 'min-h-8', badgeHeight: 'h-5' },
      large: { height: 'h-9', minHeight: 'min-h-9', badgeHeight: 'h-6' },
    },
    error: {
      true: { error: 'border border-juiError light:border-juiError' },
      false: { error: 'focus:border-juiText-primary light:focus:border-juiText-secondary' }, // 에러 아닐 때만 기본 파란색 포커스
    },
    badgeColor: {
      default: { badgeColor: '' },
      primary: { badgeColor: 'text-juiText-blue light:text-juiPrimary border-juiPrimary bg-juiPrimary/30' },
      secondary: { badgeColor: 'text-juiText-purple border-juiSecondary bg-juiSecondary/30' },
      error: { badgeColor: 'text-juiError border-juiError bg-juiError/30' },
    },
  },
  defaultVariants: {
    width: 'full',
    size: 'default',
    error: false,
    badgeColor: 'default',
  },
});

export default commandSelectVariants;
