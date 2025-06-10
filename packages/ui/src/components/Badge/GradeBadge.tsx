import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { badgeVariants } from '@common/ui/components/Badge';
import { Badge } from '@common/ui/components';
import type { badgeGradeType } from '@common/ui/components/Badge/badgeVariants';
import {
  AlertFilledIcon,
  AlertTriangleFilledIcon,
  BellFilledIcon,
  FolderFilledIcon,
  SearchFilledIcon,
} from '@common/ui/icons';

export type GradeBadgePropsType = Omit<React.ComponentProps<'span'>, 'children'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'status' | 'score'> & {
    /**
     * grade: badgeVariants.variants.grade 의 내역만 사용가능하도록 제어
     */
    grade: badgeGradeType;
    /**
     * children: GradeBadge 내부는 아이콘 및 형태, 스타일이 고정되어있으므로 children은 필수값.
     */
    children: string | React.ReactNode;
  };

export const gradeIconMapper: Record<badgeGradeType, React.ReactNode> = {
  info: <FolderFilledIcon size={'small'} />,
  boundary: <SearchFilledIcon size={'small'} />,
  alert: <BellFilledIcon size={'small'} />,
  critical: <AlertTriangleFilledIcon size={'small'} />,
  urgency: <AlertFilledIcon size={'small'} />,
};

function GradeBadgeContent({
  children,
  grade,
  iconColor,
}: {
  children: string | React.ReactNode;
  iconColor?: string;
  grade: badgeGradeType;
}) {
  return (
    <span className="inline-flex gap-x-1.5 items-center justify-center py-1 font-normal">
      {<span className={cn(iconColor)}>{gradeIconMapper[grade]}</span>}
      {children}
    </span>
  );
}

function GradeBadge(props: GradeBadgePropsType) {
  const { isBtn = false, grade = 'info', children = '', ...restProps } = props;

  const iconColor = badgeVariants.variants.grade[grade] || 'text-juiStatus-info';

  return (
    <Badge {...restProps} asChild={false} isBtn={isBtn} variant={'grading'} grade={grade}>
      <GradeBadgeContent grade={grade} iconColor={iconColor}>
        {children}
      </GradeBadgeContent>
    </Badge>
  );
}

export default GradeBadge;
