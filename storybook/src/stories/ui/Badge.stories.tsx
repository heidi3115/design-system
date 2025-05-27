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
import { AlertCircleIcon, BookmarkIcon, CheckIcon, FilePlusIcon, GlobeIcon, PlusSquareIcon } from '@common/ui/icons';

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
          'Badge 컴포넌트의 문서입니다. Badge의 경우 스타일 및 경우의 수의 다양화로 variant의 선택에 따라 필수값 등이 달라지므로 유의 바랍니다. 상세 내역은 하단 혹은 각 스토리를 참조해주세요.',
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

type StateStory = StoryObj<typeof StateBadge>;
// variant : state 일 때의 Badge 렌더링 스토리
export const State: StateStory = {
  args: {
    asChild: false,
    status: 'default',
  },
  argTypes: {
    asChild: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    status: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.status),
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'variant 가 `state` 일 때의 Badge 렌더링 스토리입니다. `status` 를 받으며, status 는 목록에서 선택하실 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.status) as (keyof typeof badgeVariants.variants.status)[]).map(
            (status) => (
              <div className={'flex flex-col gap-0.5'} key={status}>
                <span className="text-xs text-juiText-blue">{status}</span>
                <StateBadge {...args} status={status}>
                  {status}
                </StateBadge>
              </div>
            ),
          )}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.status) as (keyof typeof badgeVariants.variants.status)[]).map(
            (status) => (
              <div className={'flex flex-col gap-0.5'} key={status}>
                <span className="text-xs text-juiText-blue">{status}</span>
                <StateBadge {...args} status={status}>
                  <CheckIcon size={'small'} />
                  {status}
                </StateBadge>
              </div>
            ),
          )}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Only Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.status) as (keyof typeof badgeVariants.variants.status)[]).map(
            (status) => (
              <div className={'flex flex-col gap-0.5'} key={status}>
                <span className="text-xs text-juiText-blue">{status}</span>
                <StateBadge {...args} status={status}>
                  <BookmarkIcon size={'small'} />
                </StateBadge>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  ),
};

type ScoringStory = StoryObj<typeof ScoringBadge>;
// variant : scoring 일 때의 버튼 렌더링 스토리
export const Scoring: ScoringStory = {
  args: {
    asChild: false,
    score: 'veryLow',
    scoreVal: 15,
    maxVal: 20,
  },
  argTypes: {
    asChild: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    score: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.score),
      table: { disable: false },
      description:
        '필수값으로서 veryLow, low, normal, high, veryHigh, extra, practice, scoreAlert 에서 선택하실 수 있습니다.',
    },
    scoreVal: {
      control: 'number',
      table: { disable: false },
      description: 'scoring 에서의 score 점수값입니다. 필수값입니다.',
    },
    maxVal: {
      control: 'number',
      table: { disable: false },
      description:
        'scoring 에서의 score 점수값에 대한 최대값 입니다. maxVal 이 있을 경우, maxVal 보다 같거나 클 경우 maxVal에+ 표시로서 처리됩니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'variant 가 `scoring` 일 때의 Badge 렌더링 스토리입니다. `scoreVal`와 `score` 를 필수값으로 받으며, score 는 목록에서 선택하실 수 있으며, scoreVal은 각 스토리에서 입력 및 조절하실 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[]).map((score) => (
            <div className={'flex flex-col gap-0.5'} key={score}>
              <span className="text-xs text-juiText-blue">{score}</span>
              <ScoringBadge {...args} score={score}>
                {score}
              </ScoringBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[]).map((score) => (
            <div className={'flex flex-col gap-0.5'} key={score}>
              <span className="text-xs text-juiText-blue">{score}</span>
              <ScoringBadge {...args} score={score}>
                <AlertCircleIcon size={'small'} />
                {score}
              </ScoringBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Only Icon -
          <span className={'text-xs'}>
            기본적으로 앞에 scoreVal이 들어가며, children에는 각 scoreVal에 대한 scoring 등급에 대한 문자열만
            추천합니다.
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[]).map((score) => (
            <div className={'flex flex-col gap-0.5'} key={score}>
              <span className="text-xs text-juiText-blue">{score}</span>
              <ScoringBadge {...args} score={score}>
                <GlobeIcon size={'small'} />
              </ScoringBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

type GradingStory = StoryObj<typeof GradeBadge>;
// variant : grading 일 때의 버튼 렌더링 스토리
export const Grade: GradingStory = {
  args: {
    asChild: false,
    grade: 'info',
  },
  argTypes: {
    asChild: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    grade: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.grade),
      table: { disable: false },
      description: '필수값으로서 info, boundary, alert, critical, urgency 에서 선택하실 수 있습니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'variant 가 `scoring` 일 때의 Badge 렌더링 스토리입니다. `scoreVal`와 `score` 를 필수값으로 받으며, score 는 목록에서 선택하실 수 있으며, scoreVal은 각 스토리에서 입력 및 조절하실 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[]).map((grade) => (
            <div className={'flex flex-col gap-0.5'} key={grade}>
              <span className="text-xs text-juiText-blue">{grade}</span>
              <GradeBadge {...args} grade={grade}>
                {grade}
              </GradeBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[]).map((grade) => (
            <div className={'flex flex-col gap-0.5'} key={grade}>
              <span className="text-xs text-juiText-blue">{grade}</span>
              <GradeBadge {...args} grade={grade}>
                <PlusSquareIcon size={'small'} />
                {grade}
              </GradeBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Only Icon -{' '}
          <span className={'text-xs'}>
            기본적으로 아이콘이 앞에 들어가며, grade 별 아이콘이 mapper로 처리되므로 children에는 등급에 대한 문자열만
            추천합니다.
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[]).map((grade) => (
            <div className={'flex flex-col gap-0.5'} key={grade}>
              <span className="text-xs text-juiText-blue">{grade}</span>
              <GradeBadge {...args} grade={grade}>
                <FilePlusIcon size={'small'} />
              </GradeBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

type CountStory = StoryObj<typeof CountBadge>;
const statusKeys = Object.keys(badgeVariants.variants.status) as (keyof typeof badgeVariants.variants.status)[];
const scoreKeys = Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[];
const combinedKeys = [...statusKeys, ...scoreKeys] as (
  | keyof typeof badgeVariants.variants.status
  | keyof typeof badgeVariants.variants.score
)[];
// variant : count 일 때의 버튼 렌더링 스토리
export const Count: CountStory = {
  args: {
    asChild: false,
    scoreVal: 99,
    maxVal: 90,
    color: 'scoreAlert',
  },
  argTypes: {
    asChild: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    color: {
      control: 'select',
      options: combinedKeys,
      table: { disable: false },
      description: '필수값으로서 status, score 종류 중 에서 선택하실 수 있습니다.',
    },
    scoreVal: {
      control: 'number',
      table: { disable: false },
      description: 'count 에서의 score 점수값입니다. 필수값입니다.',
    },
    maxVal: {
      control: 'number',
      table: { disable: false },
      description:
        'count 에서의 score 점수값에 대한 최대값 입니다. maxVal 이 있을 경우, maxVal 보다 같거나 클 경우 maxVal에+ 표시로서 처리됩니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'variant 가 `count` 일 때의 Badge 렌더링 스토리입니다. `scoreVal`를 필수값으로 받으며, score 는 목록에서 선택하실 수 있으며, scoreVal은 각 스토리에서 입력 및 조절하실 수 있습니다.',
      },
    },
  },
  render: ({ maxVal, ...args }) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">scoreVal Only</span>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedKeys.map((color) => (
            <div className={'flex flex-col gap-0.5'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} children={null} maxVal={0} color={color} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With maxVal</span>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedKeys.map((color) => (
            <div className={'flex flex-col gap-0.5'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} children={null} maxVal={maxVal} color={color} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Only Icon -{' '}
          <span className={'text-xs'}>
            기본적으로 children이 우선되므로, children이 있으면 children만 렌더링됩니다. children과 scoreVal 혹은
            maxVal을 동시에 보여주고 싶으면 children에 직접 원하는 값을 조합해서 넘겨야 합니다.
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedKeys.map((color) => (
            <div className={'flex flex-col gap-0.5'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} color={color}>
                <FilePlusIcon size={'small'} />
              </CountBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
