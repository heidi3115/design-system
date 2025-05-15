import type { ComponentType, SVGProps } from 'react';

import { cn } from '../lib/utils';
import iconVariants from './iconVariants';
import { type IconProps } from './types';

type CreateIconProps = IconProps & {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  viewBox: string;
};

const CreateIcon = ({ Icon, viewBox, color, variant, size, className, ...props }: CreateIconProps) => {
  const isNumberSize = typeof size === 'number';
  const isColor = typeof color === 'string';

  return (
    <svg
      viewBox={viewBox}
      width={isNumberSize ? `${size}px` : undefined}
      height={isNumberSize ? `${size}px` : undefined}
      fill={isColor ? color : undefined}
      className={cn(
        iconVariants({
          ...(isColor ? { variant: 'custom' } : variant ? { variant } : {}),
          ...(isNumberSize ? { size: 'custom' } : size ? { size } : {}),
        }),
        className,
      )}
      {...props}>
      <Icon />
    </svg>
  );
};

export default CreateIcon;
