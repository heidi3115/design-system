import { tv } from 'tailwind-variants';

const textareaVariaints = tv({
  base: [
    'w-full',
    'max-h-full',
    'px-4 py-2.5',
    'bg-juiBackground-input',

    'text-xs shadow-xs border-none',
    'placeholder:text-juiText-secondary',

    'outline outline-transparent light:outline-juiBorder-primary focus:outline',
    'transition-[color,box-shadow]',
  ],
  variants: {
    error: {
      true: 'outline-juiError light:outline-juiError', // 에러일 때 빨간색 고정
      false: 'focus:outline-juiText-primary light:focus:outline-juiText-secondary', // 에러 아닐 때만 기본 파란색 포커스
    },
    size: {
      default: 'min-h-16',
      small: 'min-h-12',
      large: 'min-h-20',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed resize-none',
      false: 'field-sizing-content',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    error: false,
  },
});

export default textareaVariaints;
