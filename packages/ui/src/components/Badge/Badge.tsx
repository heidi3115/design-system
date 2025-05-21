import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import badgeVariants from '@common/ui/components/Badge/badgeVariants';

export type BadgePropsType = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    scoreVal?: number | null;
    maxVal?: number;
  };

function Badge(props: BadgePropsType) {
  const {
    className,
    children,
    variant,
    status,
    score,
    scoreVal = null,
    maxVal = 0,
    asChild = false,
    ...restProps
  } = props;
  const Comp = asChild ? Slot : 'span';
  const isValidScoreVal = typeof scoreVal === 'number' && !Number.isNaN(scoreVal);
  const hasSiblings = React.Children.count(children) > 0;
  const displayScore = maxVal > 0 && isValidScoreVal && scoreVal >= maxVal ? `${maxVal}+` : scoreVal;

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({
          variant,
          status,
          score,
        }),
        className,
      )}
      {...restProps}>
      {isValidScoreVal && (
        <span className={hasSiblings ? 'pr-1.5 border-r-1 border-juiGrey-100' : ''}>{displayScore}</span>
      )}
      {children}
    </Comp>
  );
}

export default Badge;
