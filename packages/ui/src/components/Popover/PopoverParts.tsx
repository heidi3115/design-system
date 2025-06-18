'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '../../lib/utils';
import { DEFAULT_ALIGN_OFFSET, DEFAULT_SIDE_OFFSET } from './Popover';

function PopoverRoot({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  side = 'bottom',
  sideOffset = DEFAULT_SIDE_OFFSET,
  alignOffset = DEFAULT_ALIGN_OFFSET,
  container,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> &
  Pick<React.ComponentProps<typeof PopoverPrimitive.Portal>, 'container'>) {
  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        className={cn(
          [
            // 기본 배경 및 텍스트 색상
            'bg-juiBackground-popover text-juiText-primary',

            // 상태 기반 애니메이션
            // 팝오버 열릴 때 애니메이션 적용
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            // 팝오버 닫힐 때 애니메이션 적용
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',

            'origin-(--radix-popover-content-transform-origin)', // 팝오버 애니메이션 기준점

            // 팝오버 방향(side)별 진입 애니메이션
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',

            // 레이어 우선순위 (팝오버가 다른 요소 위에 보이도록)
            'z-50',

            // 팝오버 기본 스타일
            'rounded-md',
            'shadow-md',
            'p-2',
            'outline-hidden',
          ],
          className,
        )}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        forceMount
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverPotal({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Portal>) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />;
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverClose({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-anchor" {...props} />;
}

function PopoverArrow({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Arrow>) {
  return <PopoverPrimitive.Arrow data-slot="popover-anchor" {...props} />;
}

export { PopoverRoot, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverPotal, PopoverClose, PopoverArrow };
