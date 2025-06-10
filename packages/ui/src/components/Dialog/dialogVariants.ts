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
      'ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
    header: 'p-4 bg-juiPrimary flex flex-col gap-2 text-center sm:text-left h-[55px]',
    footer: 'p-4 flex flex-col-reverse gap-2 sm:flex-row',
    title: 'text-sm leading-none font-semibold',
    description: 'p-4 text-muted-foreground text-sm',
    closeButton:
      'ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  },
  variants: {
    contentSize: {
      small: {
        content: 'h-50',
      },
      medium: {
        content: 'w-96',
      },
      large: {
        content: 'w-200',
      },
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
