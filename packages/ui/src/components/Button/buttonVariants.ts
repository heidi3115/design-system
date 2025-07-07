import { tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: [
    'relative flex flex-row items-center justify-center w-fit',
    'text-white font-bold tracking-normal no-underline whitespace-nowrap',
    'rounded-none border-2 border-transparent outline-0',
    'transition-all duration-500 ease-in-out shrink-0',
    'cursor-pointer select-none',
    'hover:text-juiText-primary hover:bg-transparent hover:border-juiText-primary active:bg-transparent active:border-juiText-primary focus-visible:bg-transparent focus-visible:border-juiText-primary focus-visible:outline-none',
    'has-[>svg]:shrink-0 has-[>svg]:gap-1.5', // 직전 자식에 svg 있을 경우 부모(button)에 적용
    '[&_svg]:pointer-events-none',
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
        'hover:text-white hover:bg-position-[100%_0] hover:border-transparent active:bg-position-[100%_0] active:border-transparent active:scale-95 focus:bg-position-[100%_0] focus:border-transparent',
      ],
      transparent: 'text-juiText-primary bg-transparent',
      transparentGrey:
        'text-juiText-primary dark:border-juiText-primary bg-transparent hover:text-juiText-secondary active:text-juiText-secondary focus:text-juiText-secondary',
    },
    size: {
      small: 'px-2 h-5.5 text-xs',
      basic: 'px-2 h-7 text-xs',
      medium: 'px-4 h-8 text-sm',
      large: 'px-5 h-9 text-base',
    },
    disabled: {
      true: ['opacity-60 cursor-not-allowed pointer-events-none', '[&_svg]:pointer-events-none [&_svg]:fill-current'],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'basic',
    disabled: false,
  },
});

export default buttonVariants;
