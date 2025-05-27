import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { badgeVariants } from '@common/ui';
import { Badge } from '@common/ui/components';
import type { badgeScoreType } from '@common/ui/components/Badge/badgeVariants';
import type { CloneBadgeChildProps } from '@common/ui/components/Badge/badgeUtils';
import { getStringFromChildren } from '@common/ui/components/Badge/badgeUtils';

export type ScoringBadgePropsType = React.ComponentProps<'span'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'status' | 'grade'> & {
    asChild?: boolean;
    children?: React.ReactNode | string;
    score: badgeScoreType;
    scoreVal: number;
    maxVal?: number;
  };

function ScoringBadge(props: ScoringBadgePropsType) {
  const {
    asChild = false,
    score = 'normal',
    scoreVal = 0,
    maxVal = 0,
    children,
    className,
    title,
    ...restProps
  } = props;
  const computedTitle = title ?? getStringFromChildren([scoreVal, children]);
  const child = children as React.ReactElement<ScoringBadgePropsType & CloneBadgeChildProps>;

  const isValidScoreVal = !Number.isNaN(scoreVal);
  const displayScore = maxVal > 0 && isValidScoreVal && scoreVal >= maxVal ? `${maxVal}+` : scoreVal;

  {
    /** ScoringBadge 관련.
     *  1. asChild인 경우 score | children 형태를 유지.
     *     우선은 스타일을 유지하면서 최상위를 바꾸는 부분이 통일되어야 한다 싶어서 cloneElement로 처리.
     *  2. ScoringBadge 의 경우, scoreVal에 음수값, 소수점 허용하고 있습니다. (number)
     * */
  }

  // asChild={true} 여도 isValidElement(children) 이 아닐 경우 일반적인 부분으로 처리(에러 방지)
  return asChild && React.isValidElement(children) ? (
    React.cloneElement(child, {
      ...restProps,
      'data-slot': 'badge',
      tabIndex: 0,
      variant: undefined,
      className: cn(
        badgeVariants({
          variant: 'scoring',
          score: score,
        }),
        className,
        child.props?.className,
      ),
      children: (
        <span className="inline-flex gap-x-1.5">
          <span className="pr-1.5 border-r border-juiGrey-300 light:border-juiGrey-a400">{displayScore}</span>
          {child.props?.children}
        </span>
      ),
      title: computedTitle,
    })
  ) : (
    <Badge
      {...restProps}
      asChild={asChild}
      variant={'scoring'}
      status={undefined}
      score={score}
      className={className}
      title={computedTitle}>
      <span className="inline-flex gap-x-1.5">
        <span className="pr-1.5 border-r border-juiGrey-300 light:border-juiGrey-a400">{displayScore}</span>
        {children}
      </span>
    </Badge>
  );
}

export default ScoringBadge;
