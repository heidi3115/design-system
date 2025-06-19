import { tv } from 'tailwind-variants';

export const sheetVariants = tv({
  slots: {
    overlay:
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',

    content:
      'bg-juiBackground-default data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',

    close:
      'ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-1 focus:ring-offset-1 focus:outline-hidden disabled:pointer-events-none',

    header: 'flex flex-col gap-1.5 p-4',

    footer: 'mt-auto flex flex-col gap-2 p-4',

    title: 'font-semibold',

    description: 'text-sm',
  },
  variants: {
    side: {
      right: {
        content:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 sm:max-w-sm',
      },
      left: {
        content:
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 sm:max-w-sm',
      },
      top: {
        content: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-1/4',
      },
      bottom: {
        content:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-1/4',
      },
    },
  },
  defaultVariants: {
    side: 'left',
  },
});
