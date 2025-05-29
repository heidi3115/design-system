import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import badgeVariants from '@common/ui/components/Badge/badgeVariants';

export type BadgePropsType = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    /**
     * asChild : slot을 이용한
     */
    asChild?: boolean;
  };

function Badge(props: BadgePropsType) {
  const { asChild = false, isBtn = false, className, variant, status, score, ...restProps } = props;
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      {...restProps}
      data-slot="badge"
      tabIndex={0}
      className={cn(
        badgeVariants({
          variant,
          status,
          score,
          isBtn,
        }),
        className,
      )}
    />
  );
}

export default Badge;
