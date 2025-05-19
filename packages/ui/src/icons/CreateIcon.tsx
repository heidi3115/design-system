import type { ReactNode } from 'react';

import { cn } from '../lib/utils';
import iconVariants from './iconVariants';
import { type IconProps } from './types';

type CreateIconProps = IconProps & {
  paths?: ReactNode;
  viewBox: string;
};

const CreateIcon = ({ paths, viewBox, color, fill, variant, size, className, ...props }: CreateIconProps) => {
  const isNumberSize = typeof size === 'number';
  const isColor = typeof color === 'string' || typeof fill === 'string';

  return (
    <svg
      viewBox={viewBox}
      width={isNumberSize ? `${size}px` : undefined}
      height={isNumberSize ? `${size}px` : undefined}
      fill={isColor ? (color ?? fill) : undefined}
      className={cn(
        iconVariants({
          ...(isColor ? { variant: 'custom' } : variant ? { variant } : {}),
          ...(isNumberSize ? { size: 'custom' } : size ? { size } : {}),
        }),
        className,
      )}
      {...props}>
      {paths}
    </svg>
  );
};

export default CreateIcon;
