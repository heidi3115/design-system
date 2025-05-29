import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Badge, badgeVariants } from '@common/ui';
import { cn } from '@common/ui/lib/utils';
import type { badgeScoreType, badgeStatusType } from './badgeVariants';

export type CountBadgePropsType = Omit<React.ComponentProps<'span'>, 'children'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'grade'> & {
    /**
     * scoreVal: 안에 보여줄 숫자 점수값.
     */
    scoreVal: number;
    /**
     * maxVal: 최대값. 최대값 설정 시 scoreVal >= maxVal 이면 최대값+으로 처리됩니다.
     */
    maxVal?: number;
    /**
     * color: 색상값. 커스텀인 부분을 고려해서 string 시 tailwind v4의 색상 클래스 bg-* 으로 처리 가능하며, badgeVariants의 status, score도 활용 가능합니다.
     */
    color: badgeStatusType | badgeScoreType | string;
    /**
     * icon: CountBadge 내부의 icon
     */
    icon?: React.ReactNode;
    /**
     * iconPosition: CountBadge 내부의 icon 의 위치로서 scoreVal / maxVal 값 의 왼쪽/오른쪽 여부입니다. 기본적으로 'left' 처리됩니다.
     */
    iconPosition?: 'left' | 'right';
  };

function CountBadge(props: CountBadgePropsType) {
  const {
    isBtn = false,
    color = 'default',
    scoreVal = null,
    maxVal = 0,
    icon = null,
    iconPosition = 'left',
    className,
    ...restProps
  } = props;

  const isValidScoreVal = typeof scoreVal === 'number' && !Number.isNaN(scoreVal);
  const displayScore = maxVal > 0 && isValidScoreVal && scoreVal >= maxVal ? `${maxVal}+` : scoreVal;
  // color prop이 status/score key라면 실제 클래스로 변환
  let colorClass = color || 'bg-juiGrey-a700';
  let status = undefined;
  let score = undefined;

  if (color && color in badgeVariants.variants.status) {
    status = color;
    colorClass = '';
  } else if (color && color in badgeVariants.variants.score) {
    score = color;
    colorClass = '';
  }

  return (
    <Badge
      {...restProps}
      asChild={false}
      isBtn={isBtn}
      variant={'count'}
      status={status as badgeStatusType}
      score={score as badgeScoreType}
      className={cn(colorClass, className)}>
      {iconPosition === 'left' && icon}
      {displayScore}
      {iconPosition === 'right' && icon}
    </Badge>
  );
}

export default CountBadge;
