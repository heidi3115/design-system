import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@common/ui';
import { Badge } from '@common/ui/components';
import type { badgeScoreType } from '@common/ui/components/Badge/badgeVariants';

export type ScoringBadgePropsType = Omit<React.ComponentProps<'span'>, 'children'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'status' | 'grade'> & {
    asChild?: boolean;
    children?: React.ReactNode | string;
    score: badgeScoreType;
    scoreVal: number;
    maxVal?: number;
  };

function ScoringBadgeContent({
  children,
  displayScore,
}: {
  children: React.ReactNode | string;
  displayScore?: string | number;
}) {
  return (
    <span className="inline-flex gap-x-1.5">
      <span className="pr-1.5 border-r border-juiGrey-300 light:border-juiGrey-a400">{displayScore}</span>
      {children}
    </span>
  );
}

function ScoringBadge(props: ScoringBadgePropsType) {
  const { asChild = false, score = 'normal', scoreVal = 0, maxVal = 0, children, className, ...restProps } = props;

  const isValidScoreVal = !Number.isNaN(scoreVal);
  const displayScore = maxVal > 0 && isValidScoreVal && scoreVal >= maxVal ? `${maxVal}+` : scoreVal;

  return (
    <Badge
      {...restProps}
      asChild={asChild}
      variant={'scoring'}
      status={undefined}
      score={score}
      grade={undefined}
      className={className}>
      <ScoringBadgeContent displayScore={displayScore}>{children}</ScoringBadgeContent>
    </Badge>
  );
}

export default ScoringBadge;
