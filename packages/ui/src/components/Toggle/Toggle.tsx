import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';
import toggleVariants from './toggleVariants';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface ToggleProps extends React.ComponentProps<typeof TogglePrimitive.Root>, VariantProps<typeof toggleVariants> {
  onIcon?: ReactNode;
  offIcon?: ReactNode;
  onText?: ReactNode;
  offText?: ReactNode;
}

function Toggle({ size, onIcon, offIcon, onText, offText, children, ...props }: ToggleProps) {
  const [pressed, setPressed] = useState(!!props.defaultPressed);
  const isOn = props.pressed !== undefined ? props.pressed : pressed;

  return (
    <TogglePrimitive.Root
      className={cn(
        toggleVariants({
          size,
          state: isOn ? 'on' : 'off',
        }),
      )}
      pressed={isOn}
      onPressedChange={setPressed}
      {...props}>
      {isOn ? onIcon : offIcon}
      {children}
      {isOn && onText && <span>{onText}</span>}
      {!isOn && offText && <span>{offText}</span>}
    </TogglePrimitive.Root>
  );
}

export { toggleVariants };
export default Toggle;
