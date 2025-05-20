import { tv } from 'tailwind-variants';

const inputVariants = tv({
  base: [
    'w-full px-4',
    'text-xs shadow-xs border-none bg-juiBackground-input',
    'placeholder:text-juiText-secondary ',
    'outline outline-transparent focus:outline',
    'transition-all duration-700 ease-in-out',
  ],
  variants: {
    error: {
      true: 'outline-juiError', // 에러일 때 빨간색 고정
      false: 'focus:outline-juiText-primary', // 에러 아닐 때만 기본 파란색 포커스
    },
    size: {
      default: 'h-8',
      small: 'h-7',
      large: 'h-9',
    },
    hasIconLeft: {
      true: 'pl-10',
      false: 'px-4',
    },
    hasIconRight: {
      true: 'pr-10',
      false: 'px-4',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  compoundVariants: [
    // 아이콘 없음
    {
      hasIconLeft: false,
      hasIconRight: false,
      error: false,
      className: 'px-4',
    },
    {
      hasIconLeft: false,
      hasIconRight: false,
      error: true,
      className: 'pl-4 pr-10',
    },

    // 왼쪽 아이콘만
    {
      hasIconLeft: true,
      hasIconRight: false,
      error: false,
      className: 'pl-10 pr-4',
    },
    {
      hasIconLeft: true,
      hasIconRight: false,
      error: true,
      className: 'pl-10 pr-10',
    },

    // 오른쪽 아이콘만
    {
      hasIconLeft: false,
      hasIconRight: true,
      error: false,
      className: 'pl-4 pr-9',
    },
    {
      hasIconLeft: false,
      hasIconRight: true,
      error: true,
      className: 'pl-4 pr-14', // 오른쪽 아이콘 + 에러 아이콘
    },

    // 양쪽 아이콘
    {
      hasIconLeft: true,
      hasIconRight: true,
      error: false,
      className: 'pl-10 pr-9',
    },
    {
      hasIconLeft: true,
      hasIconRight: true,
      error: true,
      className: 'pl-10 pr-14',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    hasIconLeft: false,
    hasIconRight: false,
    error: false,
  },
});

export default inputVariants;
