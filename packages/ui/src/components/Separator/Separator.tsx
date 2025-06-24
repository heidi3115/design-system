'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@common/ui/lib/utils';
import { tv, type VariantProps } from 'tailwind-variants';

export const separatorVariants = tv({
  base: [
    'size-full shrink-0 outline-none',
    'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
    'first:ml-0 last:mr-0',
  ],
  variants: {
    variant: {
      default: 'bg-juiBorder-primary',
      primary: 'bg-juiPrimary',
      secondary: 'bg-juiText-secondary',
      disabled: 'bg-juiText-disabled',
      blue: 'bg-juiText-blue',
      purple: 'bg-juiText-purple',
    },
    size: {
      small: '',
      basic: '',
      medium: '',
      large: '',
    },
    position: {
      static: 'static',
      fixed: 'fixed',
      absolute: 'absolute',
      relative: 'relative',
      sticky: 'sticky',
    },
    horizontal: {
      true: ['min-w-full max-w-full'],
      false: ['min-h-full max-h-full'],
    },
  },
  compoundVariants: [
    { size: 'small', horizontal: true, class: 'h-0.25 my-1' }, // 1px
    { size: 'small', horizontal: false, class: 'w-0.25 mx-1' },
    { size: 'basic', horizontal: true, class: 'h-0.5 my-2' },
    { size: 'basic', horizontal: false, class: 'w-0.5 mx-2 ' },
    { size: 'medium', horizontal: true, class: 'h-1 my-3 ' },
    { size: 'medium', horizontal: false, class: 'w-1 mx-3' },
    { size: 'large', horizontal: true, class: 'h-2 my-4' },
    { size: 'large', horizontal: false, class: 'w-2 mx-4' },
    { position: 'absolute', horizontal: true, class: 'bottom-0 left-0 m-0' },
    { position: 'absolute', horizontal: false, class: 'top-0 right-0 m-0' },
    { position: 'fixed', horizontal: true, class: 'bottom-0 left-0 m-0' },
    { position: 'fixed', horizontal: false, class: 'top-0 right-0 m-0' },
  ],
});

export type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> &
  Omit<VariantProps<typeof separatorVariants>, 'horizontal'> & {
    /**
     * Separator 가 부모의 크기가 고정되어 있지 않을 경우의 수 및 부모의 position 과 별로 처리하면서 위치 부분에 대한 지정 처리를 위해 추가하였습니다.
     * 종류는 'static', 'relative', 'absolute', 'fixed', 'sticky' 등이 있으며, 해당의 값 자체는 tailwindCSS의 position을 참고하였습니다.
     */
    position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
    /**
     * - static:
     *  - 부모 컨테이너에 특별한 제약 없음.
     *  - 일반적인 flex/grid/flow 레이아웃에서 separator가 자연스럽게 흐름에 따라 들어갈 때.
     * - relative:
     *  - 부모 컨테이너에 특별한 제약 없음.
     *  - separator 자체를 기준점으로 삼아 내부에 absolute 자식이 있을 때.
     * - absolute:
     *  - 부모 컨테이너: 반드시 relative, absolute, fixed, sticky 중 하나여야 함.
     *  - separator가 부모의 height/width에 맞춰 늘어나야 하등지만, 부모의 크기가 정해져 있지 않거나(*-full 등) 동적으로 변할 때.
     * - fixed, sticky:
     *  - 부모 컨테이너: 문서 전체 또는 스크롤 컨테이너.
     *  - fixed: 화면 전체에 고정된 separator(예: 상단/하단 구분선).
     *  - sticky: 스크롤 시 특정 위치에 붙어있는 separator 이어야 할 때.
     *
     */
  };

function Separator({
  className,
  position = 'static',
  orientation = 'horizontal',
  decorative = true,
  variant = 'default',
  size = 'small',
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      aria-hidden={decorative}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({
          variant,
          size,
          horizontal: orientation === 'horizontal',
          position,
          className,
        }),
      )}
      {...props}
    />
  );
}

export default Separator;
