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
      'fixed top-[50%] left-[50%] z-50 grid min-w-[234px]',
      'w-[234px] translate-x-[-50%] translate-y-[-50%]',
      'gap-[10px] border border-juiPrimary pt-[20px] pb-[20px] shadow-lg duration-200 sm:max-w-lg',
    ],
    header: 'flex flex-col gap-2 text-center items-center',
    footer: 'flex gap-2 items-center justify-center',
    title: 'text-lg font-semibold text-center',
    description: 'text-muted-foreground text-sm text-weight-500',
  },
  variants: {
    contentSize: {
      sm: {
        content: 'sm:max-w-sm p-4',
      },
      md: {
        content: 'sm:max-w-md p-6',
      },
      lg: {
        content: 'sm:max-w-lg p-8',
      },
    },
  },
  defaultVariants: {
    contentSize: 'md',
    actionVariant: 'primary',
    title: 'warning',
  },
});
