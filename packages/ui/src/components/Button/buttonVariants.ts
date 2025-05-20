import { tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: [
    'relative flex flex-row items-center justify-center w-fit',
    'text-white font-bold tracking-normal no-underline whitespace-nowrap',
    'rounded-none border-2 border-transparent outline-0',
    'transition-all duration-500 ease-in-out shrink-0',
    'cursor-pointer select-none',
    'hover:bg-transparent hover:border-white active:bg-transparent active:border-white focus:bg-transparent focus:border-white focus:outline-none',
    'has-[>svg]:shrink-0 has-[>svg]:gap-1.5', // 직전 자식에 svg 있을 경우 부모(button)에 적용
    '[&_svg]:pointer-events-none',
    'dark:hover:border-white dark:active:border-white dark:focus:border-white',
  ],
  variants: {
    variant: {
      primary: 'bg-juiPrimary',
      secondary: 'bg-juiSecondary',
      error: 'bg-juiError',
      default: 'bg-juiGrey-a700',
      gradient: [
        // token화 되지 않은 값에 대해 custom
        'bg-transparent bg-[image:linear-gradient(to_right,#4b63eb,#5d2ce9,#7782ff,#5d2ce9,#4b63eb)] bg-position-[0_0] bg-size-[300%_100%]',
        'border-transparent',
        'shadow-md',
        'hover:bg-position-[100%_0] hover:border-transparent active:scale-95',
        'dark:hover:border-transparent',
      ],
      transparent: 'bg-transparent',
      transparentGrey: 'bg-transparent hover:text-juiGrey-a700',
    },
    size: {
      small: 'px-2 h-5.5 text-xs',
      basic: 'px-2 h-7 text-xs',
      medium: 'px-4 h-8 text-sm',
      large: 'px-5 h-9 text-base',
    },
    disabled: {
      true: [
        'opacity-60 cursor-not-allowed pointer-events-auto',
        'hover:text-current hover:bg-current hover:border-transparent hover:bg-position-[0_0] active:bg-current active:border-current focus:bg-current focus:border-current focus:outline-none',
        '[&_svg]:pointer-events-none [&_svg]:fill-current',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'basic',
    disabled: false,
  },
});

export default buttonVariants;
