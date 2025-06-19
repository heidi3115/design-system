import { tv } from 'tailwind-variants';

const folderBase = `
  relative 
  bg-juiGrey-a700
  text-juiText-secondary
  data-[state=active]:text-juiText-primary
  data-[state=active]:!bg-juiBackground-solidPaper
  data-[state=active]:font-bold
  disabled:opacity-50
  disabled:text-juiText-secondary
  light:bg-juiGrey-800
  active:bg-current
  active:scale-100
  active:rounded-none
`;

const tabsTriggerVariants = tv({
  base: '',
  slots: {
    content: 'max-w-[360px] truncate',
    underline: '',
    tabsAlign: '',
    list: '',
    firstForderTab: '',
  },
  variants: {
    variant: {
      primary: { content: '', underline: 'bg-juiPrimary' },
      secondary: { content: '', underline: 'bg-juiSecondary' },
      error: { content: '', underline: 'bg-juiError' },
      ghost: { content: '', underline: '' },
    },
    size: {
      default: { list: 'min-h-11  text-sm' },
      small: { list: 'min-h-5 text-xs' },
      medium: { list: 'min-h-12 text-base' },
      large: { list: 'min-h-14 text-lg' },
    },
    align: {
      left: { tabsAlign: '' },
      right: { tabsAlign: 'self-end' },
      center: { tabsAlign: 'self-center' },
      full: { content: 'flex flex-1  max-w-none', list: 'w-auto' },
    },
    shape: {
      underline: { list: 'py-0' },
      badge: { content: 'rounded-full', list: 'py-2', underline: 'hidden' },
      folder: {
        content: `
          ${folderBase}
          skew-x-[10rad]
          right-3
          border-l-[1px]
          border-juiBackground-default
        `,
        list: 'min-h-8 py-0',
        underline: 'hidden',
        firstForderTab: `${folderBase}`,
      },
      text: { content: 'py-0 data-[state=active]:font-bold', underline: 'hidden' },
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      shape: 'badge',
      class: {
        content: 'data-[state=active]:bg-juiPrimary data-[state=active]:text-white py-0 data-[state=active]:font-bold',
      },
    },
    {
      variant: 'secondary',
      shape: 'badge',
      class: {
        content:
          'data-[state=active]:bg-juiSecondary data-[state=active]:text-white py-0 data-[state=active]:font-bold',
      },
    },
    {
      variant: 'error',
      shape: 'badge',
      class: {
        content: 'data-[state=active]:bg-juiError data-[state=active]:text-white py-0  data-[state=active]:font-bold',
      },
    },

    {
      variant: 'primary',
      shape: 'text',
      class: {
        content: 'data-[state=active]:text-juiPrimary',
      },
    },
    {
      variant: 'secondary',
      shape: 'text',
      class: {
        content: 'data-[state=active]:text-juiSecondary',
      },
    },
    {
      variant: 'error',
      shape: 'text',
      class: {
        content: 'data-[state=active]:text-juiError',
      },
    },
    {
      variant: 'ghost',
      shape: 'text',
      class: {
        content: 'data-[state=active]:text-juiText-primary',
      },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    align: 'left',
    shape: 'underline',
    size: 'default',
  },
});

export default tabsTriggerVariants;
