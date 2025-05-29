import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { Badge, badgeVariants } from '@common/ui';
import type { badgeStatusType } from '@common/ui/components/Badge/badgeVariants';

export type StateBadgePropsType = React.ComponentProps<'span'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'score' | 'grade'> & {
    /**
     * status : badgeVariants.variants.status 의 내역만 사용가능하도록 제어
     */
    status: badgeStatusType;
  };

function StateBadge(props: StateBadgePropsType) {
  const { status = 'default', isBtn = false, className, children, ...restProps } = props;

  return (
    <Badge
      asChild={false}
      {...restProps}
      data-slot="badge"
      variant={'state'}
      status={status}
      score={undefined}
      grade={undefined}
      isBtn={isBtn}
      className={cn(className)}>
      {children}
    </Badge>
  );
}

export default StateBadge;
