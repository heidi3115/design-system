import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Badge, badgeVariants } from '@common/ui';
import type { badgeStatusType } from '@common/ui/components/Badge/badgeVariants';

export type StateBadgePropsType = React.ComponentProps<'span'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'score' | 'grade'> & {
    /**
     * status: badgeVariants.variants.status 의 내역만 사용가능하도록 제어
     */
    status: badgeStatusType;
  };

function StateBadge(props: StateBadgePropsType) {
  const { isBtn = false, status = 'default', children, ...restProps } = props;

  return (
    <Badge {...restProps} asChild={false} isBtn={isBtn} variant={'state'} status={status}>
      {children}
    </Badge>
  );
}

export default StateBadge;
