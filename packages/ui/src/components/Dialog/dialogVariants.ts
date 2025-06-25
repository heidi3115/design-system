import { tv } from 'tailwind-variants';

export const dialogVariants = tv({
  slots: {
    overlay: [
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'fixed inset-0 z-50 bg-black/50',
    ],
    content: [
      'bg-juiBackground-default w-full',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'fixed top-[50%] left-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] shadow-lg duration-200',
    ],
    close:
      'ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-juiText-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-1 focus:ring-offset-1 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
    header: 'p-4 bg-juiPrimary text-juiText-primary flex flex-col gap-2 text-center sm:text-left h-[55px]',
    footer: 'p-4 flex flex-col-reverse gap-2 sm:flex-row',
    title: 'text-sm leading-none font-semibold',
    description: 'p-4 text-juiText-secondary text-sm',
    closeButton:
      'ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-juiText-secondary absolute top-5 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-1 focus:ring-offset-1 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  },
  variants: {
    contentSize: {
      small: {
        content: 'w-100',
      },
      medium: {
        content: 'w-200',
      },
      large: {
        content: 'w-300',
      },
    },
    positioning: {
      fixed: { content: 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
      absolute: { content: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
    },
    footerLocate: {
      start: {
        footer: 'sm:justify-start',
      },
      center: {
        footer: 'sm:justify-center',
      },
      end: {
        footer: 'sm:justify-end',
      },
    },
  },
  defaultVariants: {
    contentSize: 'medium',
    footerLocate: 'center',
  },
});
