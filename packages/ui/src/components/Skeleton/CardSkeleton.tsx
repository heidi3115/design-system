import { type ComponentProps } from 'react';
import { Skeleton } from '@common/ui';
import { cn } from '../../lib/utils';

export type CardSkeletonProps = {
  cardSize?: 'basic' | 'small' | 'medium' | 'large';
  textSize?: 'basic' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary' | 'error';
} & ComponentProps<'div'>;

const CardSkeleton = ({
  cardSize = 'large',
  textSize = 'basic',
  variant = 'default',
  className,
  ...props
}: CardSkeletonProps) => {
  return (
    <div className={cn('flex flex-col space-y-3', className)} {...props}>
      <Skeleton variant={variant} size={cardSize} />
      <div className="space-y-2">
        <Skeleton variant={variant} size={textSize} />
        <Skeleton variant={variant} size={textSize} />
      </div>
    </div>
  );
};

export default CardSkeleton;
