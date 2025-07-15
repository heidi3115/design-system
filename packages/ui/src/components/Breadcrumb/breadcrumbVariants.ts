import { tv } from 'tailwind-variants';

export const breadcrumbVariants = tv({
  base: '',
  slots: {
    wrapper: 'text-juiText-primary',
    list: 'flex flex-row flex-wrap items-center break-words',
    listItem: 'flex flex-row items-center size-max',
    link: ['inline-flex flex-row items-center size-max transition-colors', 'has-[svg]:gap-1'],
    page: 'inline-flex flex-row items-center size-max has-[svg]:gap-1',
    separator: 'inline-flex items-center justify-center',
    ellipsis: ['inline-flex items-center justify-center'],
  },
  variants: {
    variant: {
      primary: '[--breadcrumb-color:var(--juiPrimary)]',
      secondary: '[--breadcrumb-color:var(--juiSecondary)]',
      error: '[--breadcrumb-color:var(--juiError)]',
      default: '[--breadcrumb-color:var(--juiGrey-a700)]',
      // 커스텀을 위한 슬롯으로 variant 가 custom 일 때는 className에 필수로
      custom: '', // [--breadcrumb-color:색상지정] 해야 함.
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
      true: { base: 'pointer-events-none cursor-not-allowed opacity-60' },
      false: '',
    },
    isTrigger: {
      true: { link: 'hover:text-[var(--breadcrumb-color)]', ellipsis: 'hover:text-[var(--breadcrumb-color)]' },
      false: '',
    },
  },
});
