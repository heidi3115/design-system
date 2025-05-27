import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import type { badgeGradeType } from '@common/ui/components/Badge/badgeVariants';
import { badgeVariants } from '@common/ui/components/Badge';
import { Badge } from '@common/ui/components';
import type { CloneBadgeChildProps } from '@common/ui/components/Badge/badgeUtils';
import { getStringFromChildren } from '@common/ui/components/Badge/badgeUtils';
import { FolderFilledIcon } from '@common/ui/icons/Icon/FolderFilledIcon';
import { SearchFilledIcon } from '@common/ui/icons/Icon/SearchFilledIcon';
import { BellFilledIcon } from '@common/ui/icons/Icon/BellFilledIcon';
import { AlertTriangleFilledIcon } from '@common/ui/icons/Icon/AlertTriangleFilledIcon';
import { AlertFilledIcon } from '@common/ui/icons/Icon/AlertFilledIcon';

export type GradeBadgePropsType = React.ComponentProps<'span'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'status' | 'score'> & {
    asChild?: boolean;
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
  children: React.ReactNode | string;
  grade: badgeGradeType;
  iconColor?: string;
}) {
  return (
    <span className="inline-flex gap-x-1.5 items-center justify-center py-1 font-normal text-juiText-primary">
      {<span className={cn(iconColor)}>{gradeIconMapper[grade]}</span>}
      {children}
    </span>
  );
}

function GradeBadge(props: GradeBadgePropsType) {
  const { asChild = false, className, grade = 'info', title, children, ...restProps } = props;
  const computedTitle = title ?? getStringFromChildren(children);
  const child = children as React.ReactElement<CloneBadgeChildProps & GradeBadgePropsType>;
  const iconColor = badgeVariants.variants.grade[grade] || 'text-juiStatus-info';

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(child, {
      'data-slot': 'badge',
      variant: undefined,
      className: cn(
        badgeVariants({
          variant: 'grading',
          grade: grade,
        }),
        className,
        child.props?.className,
      ),
      children: (
        <GradeBadgeContent grade={grade} iconColor={iconColor}>
          {child?.props?.children}
        </GradeBadgeContent>
      ),
      title: computedTitle,
      ...restProps,
    });
  }

  return (
    <Badge
      asChild={asChild}
      variant={'grading'}
      grade={grade}
      status={undefined}
      score={undefined}
      className={cn(className)}
      title={computedTitle}
      {...restProps}>
      <GradeBadgeContent grade={grade} iconColor={iconColor}>
        {children}
      </GradeBadgeContent>
    </Badge>
  );
}

export default GradeBadge;
