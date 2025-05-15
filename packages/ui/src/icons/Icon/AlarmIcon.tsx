import { cn } from '../../lib/utils';
import { type IconProps } from '../types';
import iconVariants from '../iconVariants';

import Alarm from '../svg/Alarm.svg';

const AlarmIcon = ({ color, variant, size, className, ...props }: IconProps) => {
  const isNumberSize = typeof size === 'number';
  const isColor = typeof color === 'string';

  return (
    <svg
      {...(isNumberSize && { width: `${size}px` })}
      {...(isNumberSize && { height: `${size}px` })}
      {...(isColor && { fill: color })}
      viewBox="0 0 22 28"
      className={cn(
        iconVariants({
          ...(isColor ? { variant: 'custom' } : variant ? { variant } : {}),
          ...(isNumberSize ? { size: 'custom' } : size ? { size } : {}),
          className,
        }),
      )}
      {...props}>
      <Alarm />
    </svg>
  );
};

export default AlarmIcon;
