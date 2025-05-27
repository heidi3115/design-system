import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Badge, badgeVariants } from '@common/ui';
import { cn } from '@common/ui/lib/utils';
import type { badgeScoreType, badgeStatusType } from './badgeVariants';

export type CountBadgePropsType = React.ComponentProps<'span'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'grade'> & {
    /**
     * asChild 설정
     */
    asChild?: boolean;
    /**
     * scoreVal : 안에 보여줄 숫자 점수값. 옵션인 경우는 asChild 설정에 따라서 children 에서 표기하는 부분을 고려하였습니다.
     */
    scoreVal: number;
    /**
     * maxVal : 최대값. 최대값 설정 시 scoreVal >= maxVal 이면 최대값+으로 처리됩니다.
     */
    maxVal?: number;
    /**
     * color : 색상값. 커스텀인 부분을 고려해서 string 시 tailwind v4의 색상 클래스 bg-* 으로 처리 가능하며, badgeVariants의 status, score도 활용 가능합니다.
     */
    color: badgeStatusType | badgeScoreType | string;
  };

/**
 * CountBadge
 * - children이 있으면 children만 렌더링됩니다. (scoreVal/displayScore는 무시)
 * - children이 없으면 scoreVal로 계산된 displayScore가 렌더링됩니다.
 * - 만약 children과 displayScore를 동시에 보여주고 싶으면 children에 직접 원하는 값을 조합해서 넘겨야 합니다. displayScore는 무시됩니다.
 */

function CountBadge(props: CountBadgePropsType) {
  const { asChild, scoreVal = null, maxVal = 0, color = 'default', className, children, ...restProps } = props;

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
      asChild={asChild}
      variant={'count'}
      status={status as badgeStatusType}
      score={score as badgeScoreType}
      className={cn(colorClass, className)}>
      {children ?? displayScore}
    </Badge>
  );
}

export default CountBadge;
