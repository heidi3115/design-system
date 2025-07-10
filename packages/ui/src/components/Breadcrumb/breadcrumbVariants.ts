import { tv } from 'tailwind-variants';

export const breadcrumbVariants = tv({
  base: '',
  slots: {
    wrapper: '',
    list: '',
    link: '',
    page: '',
    separator: '',
    ellipsis: '',
    common: '',
  },
  variants: {
    variant: {
      default: '',
      ghost: '',
      card: '',
    },
    // text size, icon size, etc.
    size: {
      small: '',
      medium: '',
      large: '',
      custom: '',
    },
    disabled: {
      true: 'pointer-events-none cursor-not-allowed opacity-60',
    },
  },
});
