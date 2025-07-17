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

const variantArr = Object.keys(badgeVariants.variants.variant) as Array<keyof typeof badgeVariants.variants.variant>;
const statusArr = Object.keys(badgeVariants.variants.status);
const scoreArr = Object.keys(badgeVariants.variants.score);
const gradeArr = Object.keys(badgeVariants.variants.grade);

const meta: Meta<typeof Badge> = {
  title: 'UI/DataDisplay/Common/Badge',
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
    isBtn: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description:
        'isBtn 활성화 시 버튼처럼 hover, active, focus 이벤트 상태 시 변화가 추가되며, cursor 및 pointer events 관련 CSS가 추가됩니다. `asChild`를 사용하는 것이 아니라 버튼 같은 이펙트만 필요하신 경우에 사용할 수 있습니다.',
    },
    asChild: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: 'Slot을 통해 Badge 스타일을 다른 태그에 이식하여 Badge 스타일을 적용할 때 사용할 수 있습니다.',
    },
    children: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Badge' } },
      description: 'Badge 내부에 들어갈 내용입니다.',
    },
    variant: {
      control: 'select',
      options: variantArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'state' } },
      description:
        'Badge의 타입을 지정하는 props 로 state, scoring, grading, count, text 중에서 선택할 수 있습니다. 각 variant에 따라 해당 컴포넌트가 변경되고 필수 속성들이 달라지므로 상세 내역은 각 Story를 참조해주세요.',
    },
    status: {
      control: 'select',
      options: statusArr,
      if: { arg: 'variant', eq: 'state' },
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description:
        'Badge의 상태를 지정하는 props 로 variant가 state인 경우에 사용됩니다. 상세 내역은 State Story를 참조해주세요.',
    },
    score: {
      control: 'select',
      options: scoreArr,
      if: { arg: 'variant', eq: 'scoring' },
      table: { type: { summary: 'string' }, defaultValue: { summary: 'normal' } },
      description:
        'Badge의 점수 스타일을 지정하는 props 로 variant가 scoring인 경우에 사용됩니다. 상세 내역은 Scoring Story를 참조해주세요.',
    },
    grade: {
      control: 'select',
      options: gradeArr,
      if: { arg: 'variant', eq: 'grading' },
      table: { type: { summary: 'string' }, defaultValue: { summary: 'info' } },
      description:
        'Badge의 등급 스타일을 지정하는 props 로 variant가 grading인 경우에 사용됩니다. 상세 내역은 Grade Story를 참조해주세요.',
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스명입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Badge 컴포넌트의 문서입니다. Badge는 레이블이나 태그 등으로 사용되는 UI 요소로, 다양한 variant를 통해 용도에 맞게 사용할 수 있습니다.',
          'Badge의 경우 variant 선택에 따라 필수값 등이 달라지므로 유의하시기 바랍니다.',
          '공통적으로 적용되는 Badge의 스타일은 inline-flex 로 size-fit을 기본으로 합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 Badge 컴포넌트와 각 variant별 컴포넌트의 기본 예시입니다.',
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
        {variantArr.map((variant) => {
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
                // variant === 'text'
                <TextBadge isBtn={isBtn} {...restProps}>
                  {(children || '').toString()}
                </TextBadge>
              )}
            </div>
          );
        })}
      </div>
    );
  },
};
