import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';
import toggleVariants from './toggleVariants';
import { cn } from '../../lib/utils';

interface ToggleProps extends React.ComponentProps<typeof TogglePrimitive.Root>, VariantProps<typeof toggleVariants> {
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  onText?: React.ReactNode;
  offText?: React.ReactNode;
}

function Toggle({ className, variant, size, onIcon, offIcon, onText, offText, children, ...props }: ToggleProps) {
  const [pressed, setPressed] = React.useState(!!props.defaultPressed);

  // controlled 모드 지원
  const isOn = props.pressed !== undefined ? props.pressed : pressed;

  const handlePressedChange = (next: boolean) => {
    setPressed(next);
    props.onPressedChange?.(next);
  };

  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      pressed={isOn}
      onPressedChange={handlePressedChange}
      {...props}>
      {isOn ? onIcon : offIcon}
      {(onText || offText) && <span className="ml-1">{isOn ? onText : offText}</span>}
      {children}
    </TogglePrimitive.Root>
  );
}

export { toggleVariants };
export default Toggle;
