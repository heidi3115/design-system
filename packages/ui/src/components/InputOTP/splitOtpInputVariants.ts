import { tv } from 'tailwind-variants';

const splitOtpInputVariants = tv({
  base: 'border-juiGrey-a400',
  variants: {
    variant: {
      primary: 'data-[active=true]:ring-juiPrimary text-juiText-blue',
      secondary: 'data-[active=true]:ring-juiSecondary text-juiText-purple',
      normal: 'data-[active=true]:ring-juiBorder-primary text-juiText-primary',
      error: 'data-[active=true]:ring-juiError text-juiError',
    },
    size: {
      small: 'h-10 w-10 text-base',
      basic: 'h-14 w-14',
      medium: 'h-16 w-16 text-3xl',
      large: 'h-20 w-20 text-5xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'basic',
  },
});

export default splitOtpInputVariants;
