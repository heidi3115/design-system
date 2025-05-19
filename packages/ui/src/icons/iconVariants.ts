import { tv } from 'tailwind-variants';

const iconVariants = tv({
  base: '',
  variants: {
    variant: {
      default: 'fill-current',
      primary: 'fill-juiPrimary',
      secondary: 'fill-juiSecondary',
      error: 'fill-juiError',
      disabled: 'fill-juiText-disabled',
      custom: '',
    },
    size: {
      small: 'size-4',
      basic: 'size-5',
      medium: 'size-6',
      large: 'size-7',
      custom: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'basic',
  },
});

export default iconVariants;
