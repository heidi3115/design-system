import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@common/ui/components/Badge';
import { Badge } from '@common/ui/components';
import { XIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils';
import type { CloneBadgeChildProps } from '@common/ui/components/Badge/badgeUtils';
import { getStringFromChildren } from '@common/ui/components/Badge/badgeUtils';

export type TextBadgeContentProps = {
  children?: React.ReactNode | string;
  className?: string;
  textOnly?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type TextBadgePropsType = React.ComponentProps<'span'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'status' | 'score' | 'grade'> & {
    asChild?: boolean;
  } & TextBadgeContentProps;

function TextBadgeContent({ children, onClick, textOnly }: TextBadgeContentProps) {
  return (
    <span
      className={cn(
        `${textOnly ? 'inline-block align-middle' : 'inline-flex gap-1.5 items-center justify-center'}`,
        textOnly && 'overflow-hidden text-ellipsis whitespace-nowrap',
        '[&>svg]:basis-[1.4em]] [&>svg]:min-w-4',
      )}
      aria-hidden={textOnly ? 'true' : undefined}>
      {children}
      {!textOnly && (
        <button
          type={'button'}
          className={cn('inline-flex gap-x-1 [&_svg]:cursor-pointer')}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(e);
          }}
          title="삭제"
          aria-label="삭제"
          tabIndex={textOnly ? -1 : 0}
          disabled={textOnly}>
          <XIcon size={'small'} />
        </button>
      )}
    </span>
  );
}

function TextBadge(props: TextBadgePropsType) {
  const { asChild = false, className, children, onClick, textOnly = false, title, ...restProps } = props;
  const child = children as React.ReactElement<CloneBadgeChildProps & TextBadgeContentProps>;
  const computedTitle = title ?? getStringFromChildren(children);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(child, {
      ...restProps,
      'data-slot': 'badge',
      variant: undefined,
      className: cn(
        badgeVariants({
          variant: 'text',
        }),
        className,
        child.props?.className,
      ),
      children: (
        <TextBadgeContent onClick={onClick} textOnly={textOnly}>
          {child?.props?.children}
        </TextBadgeContent>
      ),
      title: computedTitle,
    });
  }

  return (
    <Badge
      {...restProps}
      asChild={asChild}
      variant={'text'}
      status={undefined}
      score={undefined}
      className={className}
      title={computedTitle}>
      <TextBadgeContent onClick={onClick} textOnly={textOnly}>
        {children}
      </TextBadgeContent>
    </Badge>
  );
}

export default TextBadge;
