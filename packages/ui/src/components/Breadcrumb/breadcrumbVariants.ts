import { tv } from 'tailwind-variants';

export const breadcrumbVariants = tv({
  base: '',
  slots: {
    wrapper: 'text-juiText-primary',
    list: 'flex flex-row flex-wrap items-center break-words',
    listItem: 'flex flex-row items-center size-max',
    link: 'inline-flex flex-row items-center size-max transition-colors',
    page: 'inline-flex flex-row items-center size-max',
    separator: 'inline-flex items-center justify-center',
    ellipsis: 'inline-flex items-center justify-center',
  },
  variants: {
    variant: {
      default: '',
      ghost: '',
      card: '',
      custom: '',
    },
    // text size, icon size, etc.
    size: {
      small: {
        base: '',
        wrapper: '',
        list: 'gap-1.5',
        listItem: 'gap-1.5 text-xs',
        link: '',
        page: '[&:has(svg)]:gap-1.5',
        separator: '[&>svg]:size-6',
        ellipsis: 'size-5',
      },
      medium: {
        base: '',
        wrapper: '',
        list: 'gap-2.5 ',
        listItem: 'gap-2.5 text-sm',
        link: '',
        page: '',
        separator: '[&>svg]:size-8',
        ellipsis: 'size-7',
      },
      large: {
        base: '',
        wrapper: '',
        list: 'gap-3.5',
        listItem: 'gap-3.5 text-base',
        link: '',
        page: '',
        separator: '[&>svg]:size-9',
        ellipsis: 'size-9',
      },
      custom: {
        base: '',
        wrapper: '',
        list: '',
        listItem: '',
        link: '',
        page: '',
        separator: '',
        ellipsis: '',
      },
    },
    disabled: {
      true: 'pointer-events-none cursor-not-allowed opacity-60',
      false: '',
    },
    isTrigger: {
      true: 'hover:text-lime-500',
      false: '',
    },
  },
});
