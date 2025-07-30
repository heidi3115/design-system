import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@common/ui';
import { Badge } from '@common/ui/components';
import type { badgeScoreType } from '@common/ui/components/Badge/badgeVariants';

export type ScoringBadgePropsType = Omit<React.ComponentProps<'span'>, 'children'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'status' | 'grade'> & {
    /**
     * score: badgeVariants.variants.score 의 내역만 사용가능하도록 제어
     */
    score: badgeScoreType;
    /**
     * scoreVal: 안에 보여줄 숫자 점수값.
     */
    scoreVal: number;
    /**
     * maxVal: 최대값. 최대값 설정 시 scoreVal >= maxVal 이면 최대값+으로 처리됩니다.
     */
    maxVal?: number;
    /**
     * icon: ScoringBadge 내부의 icon
     */
    icon?: React.ReactNode;
    /**
     * iconPosition: ScoringBadge 내부의 icon 의 위치로 scoreVal / maxVal 값 의 왼쪽/오른쪽 여부입니다. 기본적으로 'left' 처리됩니다.
     */
    iconPosition?: 'left' | 'right';
    /**
     * children: ScoringBadge 내부는 아이콘 및 형태, 스타일이 고정되어 있으므로 children은 필수값.
     */
    children: string | React.ReactNode;
  };

function ScoringBadgeContent({
  children,
  displayScore,
  icon,
  iconPosition,
}: {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: string | React.ReactNode;
  displayScore?: string | number;
}) {
  return (
    <span className="inline-flex gap-x-1.5 items-center justify-center">
      <span className="pr-1.5 border-r border-juiGrey-300 light:border-juiGrey-a400">{displayScore}</span>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </span>
  );
}

function ScoringBadge(props: ScoringBadgePropsType) {
  const {
    isBtn = false,
    score = 'normal',
    scoreVal = 0,
    maxVal = 0,
    icon = null,
    iconPosition = 'left',
    children = '',
    ...restProps
  } = props;

  const isValidScoreVal = !Number.isNaN(scoreVal);
  const displayScore = maxVal > 0 && isValidScoreVal && scoreVal >= maxVal ? `${maxVal}+` : scoreVal;

  return (
    <Badge {...restProps} asChild={false} isBtn={isBtn} variant={'scoring'} score={score}>
      <ScoringBadgeContent displayScore={displayScore} icon={icon} iconPosition={iconPosition}>
        {children}
      </ScoringBadgeContent>
    </Badge>
  );
}

export default ScoringBadge;
