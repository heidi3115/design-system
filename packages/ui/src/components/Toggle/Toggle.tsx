'use client';

import { useImperativeHandle, useState, type ComponentType, type Ref, type ComponentProps } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';

import { type IconProps } from '@common/ui/icons';
import { type VariantProps } from 'tailwind-variants';
import toggleVariants from './toggleVariants';
import { cn } from '../../lib/utils';

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    onIcon?: ComponentType<IconProps>;
    offIcon?: ComponentType<IconProps>;
    onText?: string;
    offText?: string;
    pressedRef?: Ref<boolean>;
  };

function Toggle({
  size,
  onIcon,
  offIcon,
  onText,
  offText,
  children,
  pressedRef,
  onPressedChange,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(props.defaultPressed ?? false);

  const isControlled = props.pressed !== undefined;
  const currentPressed = isControlled ? !!props.pressed : internalPressed;

  // 비제어 상태값
  useImperativeHandle(pressedRef, () => currentPressed);

  const IconComponent = currentPressed ? onIcon : offIcon;

  const contentText = currentPressed ? (onText ?? children) : (offText ?? children);

  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({
          size,
          state: currentPressed ? 'on' : 'off',
        }),
      )}
      onPressedChange={(press) => {
        if (!isControlled) setInternalPressed(press);
        onPressedChange?.(press);
      }}
      {...props}>
      {IconComponent && <IconComponent size="small" />}
      {contentText}
    </TogglePrimitive.Root>
  );
}

export default Toggle;
