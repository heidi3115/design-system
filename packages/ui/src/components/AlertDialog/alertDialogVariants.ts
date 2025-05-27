import { tv } from 'tailwind-variants';

export const alertDialogVariants = tv({
  slots: {
    // 다이얼로그, 카드 등 여러 하위 요소로 구성된 컴포넌트는 slot 사용
    overlay: [
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'fixed inset-0 z-50 bg-black/50',
    ],
    content: [
      'bg-juiBackground-default',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'z-50 grid min-w-58.5 w-58.5',
      'gap-2.5 border border-juiPrimary pt-5 pb-5 shadow-lg duration-200 sm:max-w-lg text-center',
    ],
    header: 'flex flex-col text-center items-center',
    footer: 'flex gap-2 items-center justify-center',
    title: 'text-lg font-semibold text-center',
    description: 'text-muted-foreground text-sm text-weight-500',
  },
  variants: {
    contentSize: {
      small: {
        content: 'sm:max-w-sm p-4',
      },
      medium: {
        content: 'sm:max-w-md p-6',
      },
      large: {
        content: 'sm:max-w-lg p-8',
      },
    },
    positioning: {
      fixed: { content: 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
      absolute: { content: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
    },
  },
  defaultVariants: {
    contentSize: 'medium',
    positioning: 'fixed',
  },
});
