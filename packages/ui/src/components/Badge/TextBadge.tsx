import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@common/ui/components/Badge';
import { Badge } from '@common/ui/components';
import { XIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils';

export type TextBadgeContentProps = {
  /**
   * textOnly: TextBadge 내부의 삭제 버튼을 제거하고 텍스트 태그만으로 작동할지의 여부
   */
  textOnly?: boolean;
  /**
   * children: ReactNode.
   */
  children: React.ReactNode;
  /**
   * onClick: TextBadge 내부의 textOnly가 false 일 때 삭제 버튼의 클릭 이벤트 처리.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type TextBadgePropsType = Omit<React.ComponentProps<'span'>, 'children'> &
  Omit<VariantProps<typeof badgeVariants>, 'variant' | 'status' | 'score' | 'grade'> &
  TextBadgeContentProps;

function TextBadgeContent({ children, onClick, textOnly }: TextBadgeContentProps) {
  return (
    <span
      className={cn(
        `${textOnly ? 'inline-block align-middle' : 'max-w-full inline-flex gap-1.5 items-center justify-center'}`,
        textOnly && 'truncate',
        '[&>svg]:basis-[1.4em]] [&>svg]:min-w-4',
      )}
      aria-hidden={textOnly ? 'true' : undefined}>
      {textOnly ? children : <span className={cn('max-w-full truncate')}>{children}</span>}
      {!textOnly && (
        <button
          type={'button'}
          className={cn(
            'inline-flex gap-x-1 [&_svg]:cursor-pointer',
            'hover:[&_svg]:opacity-60 active:[&_svg]:opacity-60 focus:[&_svg]:opacity-60',
          )}
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
  const { isBtn = false, textOnly = false, children, onClick, ...restProps } = props;

  return (
    <Badge {...restProps} asChild={false} isBtn={isBtn} variant={'text'}>
      <TextBadgeContent onClick={onClick} textOnly={textOnly}>
        {children}
      </TextBadgeContent>
    </Badge>
  );
}

export default TextBadge;
