import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';
import toggleVariants from './toggleVariants';
import { cn } from '../../lib/utils';
import { EyeIcon, EyeOffIcon, StarIcon } from '@common/ui/icons';
import { useState } from 'react';

const icons = {
  EyeIcon: <EyeIcon />,
  EyeOffIcon: <EyeOffIcon />,
  StarIcon: <StarIcon />,
  noIcon: null,
} as const;

type IconKey = keyof typeof icons;

interface ToggleProps extends React.ComponentProps<typeof TogglePrimitive.Root>, VariantProps<typeof toggleVariants> {
  onIcon?: IconKey | React.ReactNode;
  offIcon?: IconKey | React.ReactNode;
}

function Toggle({ variant, size, onIcon = 'noIcon', offIcon = 'noIcon', children, ...props }: ToggleProps) {
  const [pressed, setPressed] = useState(!!props.defaultPressed);
  const isOn = props.pressed !== undefined ? props.pressed : pressed;

  // 문자열 키 → 아이콘 변환
  const resolveIcon = (icon: IconKey | React.ReactNode) => {
    if (typeof icon === 'string') {
      return icons[icon as IconKey] ?? null;
    }

    return icon;
  };

  return (
    <TogglePrimitive.Root
      className={cn(
        toggleVariants({
          variant,
          size,
          state: isOn ? 'on' : 'off',
        }),
      )}
      pressed={isOn}
      onPressedChange={setPressed}
      {...props}>
      {isOn ? resolveIcon(onIcon) : resolveIcon(offIcon)}
      {children}
    </TogglePrimitive.Root>
  );
}

export { toggleVariants };
export default Toggle;
