import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { Badge, badgeVariants } from '@common/ui';
import type { badgeStatusType } from '@common/ui/components/Badge/badgeVariants';
import { getStringFromChildren } from '@common/ui/components/Badge/badgeUtils';

export type StateBadgePropsType = React.ComponentProps<'span'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'score' | 'grade'> & {
    asChild?: boolean;
    status: badgeStatusType;
  };

function StateBadge(props: StateBadgePropsType) {
  const { status = 'default', className, children, title, ...restProps } = props;
  const computedTitle = title ?? getStringFromChildren(children);

  return (
    <Badge
      {...restProps}
      data-slot="badge"
      variant={'state'}
      status={status}
      score={undefined}
      grade={undefined}
      className={cn(className)}
      title={computedTitle}>
      {children}
    </Badge>
  );
}

export default StateBadge;
