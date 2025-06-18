import { tv } from 'tailwind-variants';

const tabsTriggerVariants = tv({
  base: '',
  slots: {
    content: '',
    underline: '',
    tabsAlign: '',
  },
  variants: {
    variant: {
      primary: { content: '', underline: 'bg-juiPrimary' },
      secondary: { content: '', underline: 'bg-juiSecondary' },
      error: { content: '', underline: 'bg-juiError' },
      ghost: { content: '', underline: '' },
    },
    align: {
      left: { tabsAlign: '' },
      right: { tabsAlign: 'self-end' },
      center: { tabsAlign: 'self-center' },
    },
    shape: {
      underline: {},
      badge: { content: 'rounded-full', underline: 'hidden' },
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      shape: 'badge',
      class: {
        content:
          'data-[state=active]:bg-juiPrimary data-[state=active]:text-white py-0 h-8 data-[state=active]:font-bold',
      },
    },
    {
      variant: 'secondary',
      hape: 'badge',
      class: { content: 'data-[state=active]:bg-juiSecondary data-[state=active]:text-white py-0 h-8 font-bold' },
    },
    {
      variant: 'error',
      hape: 'badge',
      class: { content: 'data-[state=active]:bg-juiError data-[state=active]:text-white py-0 h-8 font-bold' },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    align: 'left',
    shape: 'underline',
  },
});

export default tabsTriggerVariants;
