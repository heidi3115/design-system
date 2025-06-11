import type { Meta, StoryObj } from '@storybook/react';
import {
  Badge,
  badgeVariants,
  CountBadge,
  GradeBadge,
  ScoringBadge,
  StateBadge,
  TextBadge,
} from '@common/ui/components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  args: {
    isBtn: false,
    asChild: false,
    children: 'Badge',
    variant: 'state',
    status: 'default',
    score: 'normal',
    grade: 'info',
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: 'Slot을 통해 Badge 스타일을 다른 태그에 이식하여 badge 스타일을 적용할 때 사용하실 수 있습니다.',
    },
    isBtn: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description:
        'isBtn 활성화 시, 버튼처럼 hover:, active:, focus:의 이벤트 상태 시 변화가 추가되며, cursor 및 pointer events 관련 css가 추가됩니다. asChild를 사용하는 게 아닌 버튼같은 이펙트만 필요하신 경우 사용하실 수 있습니다.',
    },
    variant: {
      control: 'select',
      table: { defaultValue: { summary: 'state' } },
      options: Object.keys(badgeVariants.variants.variant),
      description:
        'select를 통해 badge의 타입(state, scoring, grading, count, text 등)을 지정합니다. 각 variant에 따라 해당의 badge의 컴포넌트가 바뀌고, 필수 부분들이 달라집니다. 상세 내역은 하단 혹은 각 스토리를 참조해주세요.',
    },
    status: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.status),
      if: { arg: 'variant', eq: 'state' },
      table: { defaultValue: { summary: 'default' } },
      description:
        'status 스타일 (variant가 state 인 경우에서 사용되며, 상세 내역은 하단 혹은 State 스토리를 참조해주세요.)',
    },
    score: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.score),
      if: { arg: 'variant', eq: 'scoring' },
      table: { defaultValue: { summary: 'normal' } },
      description:
        'score 스타일 (variant가 scoring인 경우에서 사용되며, 필수값 및 상세 내역은 하단 혹은 Scoring 스토리를 참조해주세요.)',
    },
    grade: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.grade),
      if: { arg: 'variant', eq: 'grading' },
      table: { defaultValue: { summary: 'info' } },
      description:
        'grade 스타일 (variant가 grading인 경우에서 사용되며, 필수값 및 상세 내역은 하단 혹은 Grade 스토리를 참조해주세요.)',
    },
    children: {
      control: 'text',
      table: { defaultValue: { summary: 'Badge' } },
      description: 'Badge 내부에 들어갈 내용',
    },
    className: {
      control: 'text',
      table: { defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Badge 컴포넌트의 문서입니다. Badge 컴포넌트는 기본적으로 data-slot="badge" 으로 분류되나 span을 기본으로 하며 레이블이나 태그 등 <br/>Badge의 경우 스타일 및 경우의 수의 다양화로 variant의 선택에 따라 필수값 등이 달라지므로 유의 바랍니다.<br/>공통적으로 적용되는 Badge의 스타일의 경우 inline-flex 로서 size-fit을 기본으로 한다는 것을 고려해주시고, 상세 내역은 하단 혹은 각 스토리를 참조해주세요.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  argTypes: { children: { type: 'string' } },
  parameters: {
    docs: {
      description: {
        story: '기본 Badge 와 각 variant 별 컴포넌트의 기본 예시들 입니다. ',
      },
    },
  },
  render: (args) => {
    const {
      asChild,
      isBtn = false,
      status = 'default',
      score = 'veryLow',
      grade = 'alert',
      children,
      ...restProps
    } = args;
    const TEMP_VAL = 20;
    const TEMP_MAX_VAL = 15;

    return (
      <div className={'flex flex-row gap-4'}>
        <div className={'flex flex-col gap-1 items-center'}>
          <h4 className={'text-xs text-juiText-blue text-center'}>default</h4>
          <Badge asChild={asChild} isBtn={isBtn} {...restProps}>
            {children}
          </Badge>
        </div>
        {(Object.keys(badgeVariants.variants.variant) as Array<keyof typeof badgeVariants.variants.variant>).map(
          (variant) => {
            return (
              <div className={'flex flex-col gap-1'} key={variant}>
                <h4 className={'text-xs text-juiText-blue text-center'}>variant: {variant}</h4>
                {variant === 'state' ? (
                  <StateBadge isBtn={isBtn} status={status} {...restProps}>
                    {children}
                  </StateBadge>
                ) : variant === 'scoring' ? (
                  <ScoringBadge isBtn={isBtn} score={score} scoreVal={TEMP_VAL} {...restProps}>
                    {children}
                  </ScoringBadge>
                ) : variant === 'grading' ? (
                  <GradeBadge isBtn={isBtn} grade={grade} {...restProps}>
                    {children}
                  </GradeBadge>
                ) : variant === 'count' ? (
                  <CountBadge isBtn={isBtn} color={grade} scoreVal={TEMP_VAL} maxVal={TEMP_MAX_VAL} {...restProps} />
                ) : (
                  //variant === 'text'
                  <TextBadge isBtn={isBtn} {...restProps}>
                    {(children || '').toString()}
                  </TextBadge>
                )}
              </div>
            );
          },
        )}
      </div>
    );
  },
};
