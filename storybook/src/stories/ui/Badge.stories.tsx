// import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@common/ui/components';
import {
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
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Slot을 통해 Badge 스타일을 다른 태그에 이식하여 badge 스타일을 적용할 때 사용',
    },
    variant: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.variant),
      description:
        'select를 통해 badge의 타입(state, scoring, grading, count, text 등)을 지정합니다. 각 variant에 따라 해당의 badge의 컴포넌트가 바뀌고, 필수 부분들이 달라집니다. 상세 내역은 하단 혹은 각 스토리를 참조해주세요.',
    },
    status: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.status),
      if: { arg: 'variant', eq: 'state' },
      description:
        'status 스타일 (variant가 state 인 경우에서 사용되며, 상세 내역은 하단 혹은 State 스토리를 참조해주세요.)',
    },
    score: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.score),
      if: { arg: 'variant', eq: 'scoring' },
      description:
        'score 스타일 (variant가 scoring인 경우에서 사용되며, 필수값 및 상세 내역은 하단 혹은 Scoring 스토리를 참조해주세요.)',
    },
    grade: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.grade),
      if: { arg: 'variant', eq: 'grading' },
      description:
        'grade 스타일 (variant가 grading인 경우에서 사용되며, 필수값 및 상세 내역은 하단 혹은 Grade 스토리를 참조해주세요.)',
    },
    children: { control: 'text', description: 'Badge 내부에 들어갈 내용' },
    className: {
      control: 'text',
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
  args: {
    children: 'Badge',
    variant: 'state',
    asChild: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Badge 컴포넌트의 문서입니다. Badge의 경우 스타일 및 경우의 수의 다양화로 variant의 선택에 따라 필수값 등이 달라지므로 유의 바랍니다.<br/>공통적으로 적용되는 Badge의 스타일의 경우 inline-flex로서 size-fit을 기본으로 한다는 것을 고려해주시고, 상세 내역은 하단 혹은 각 스토리를 참조해주세요.',
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
        story: '기본 Badge 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => {
    const { asChild, variant, status = 'default', score = 'veryLow', grade = 'alert', children, ...restProps } = args;
    const TEMP_VAL = 20;
    const TEMP_MAX_VAL = 15;

    // state, scoring, grading, count, text
    if (variant === 'state') {
      return <StateBadge asChild={asChild} status={status} children={children} {...restProps} />;
    }
    if (variant === 'scoring') {
      return <ScoringBadge asChild={asChild} score={score} scoreVal={TEMP_VAL} children={children} {...restProps} />;
    }
    if (variant === 'grading') {
      return <GradeBadge asChild={asChild} grade={grade} children={children} {...restProps} />;
    }
    if (variant === 'count') {
      return (
        <CountBadge
          asChild={asChild}
          color={grade}
          scoreVal={TEMP_VAL}
          maxVal={TEMP_MAX_VAL}
          children={null}
          {...restProps}
        />
      );
    }
    if (variant === 'text') {
      return <TextBadge asChild={asChild} children={children} {...restProps} />;
    }

    return <Badge asChild={asChild} variant={variant} status={status} score={score} grade={grade} {...restProps} />;
  },
};
