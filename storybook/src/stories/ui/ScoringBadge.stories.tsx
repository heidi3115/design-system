import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants } from '@common/ui/components/Badge';
import { BookmarkIcon, CheckIcon } from '@common/ui/icons';
import { Button, ScoringBadge } from '@common/ui';

const meta: Meta<typeof ScoringBadge> = {
  title: 'UI/Badge/ScoringBadge',
  component: ScoringBadge,
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Slot을 통해 Badge 스타일을 다른 태그에 이식하여 badge 스타일을 적용할 때 사용',
      table: { defaultValue: { summary: 'false' } },
    },
    score: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.score),
      table: { defaultValue: { summary: 'normal' } },
      description:
        '필수값. score 스타일 (veryLow, low, normal, high, veryHigh, extra, practice, scoreAlert) 중에서 선택해야 합니다.',
    },
    scoreVal: {
      control: 'number',
      table: { defaultValue: { summary: '20' } },
      description:
        '필수값. 숫자를 입력해야 합니다. 현재로서는 음수, 소수점도 허용되고는 있습니다. 해당의 defaultValue는 storybook 전용으로 설정한 값입니다.',
    },
    maxVal: {
      control: 'number',
      table: { defaultValue: { summary: '0' } },
      description:
        '옵션값. 기본적으로 0이며, 0 이상의 숫자일 경우, 해당 maxVal 보다 값이 크거나 같으면 maxVal+의 형태로 표기됩니다. 해당의 defaultValue는 storybook 전용으로 설정한 값입니다.',
    },
    children: {
      control: 'text',
      table: { defaultValue: { summary: 'ScoringBadge' } },
      description: 'ScoringBadge 내부에 들어갈 내용으로서 일반적으로 scoreVal에 따른 등급 레벨을 표기합니다.',
    },
    className: {
      control: 'text',
      table: { defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
  args: {
    children: 'ScoringBadge',
    score: 'normal',
    scoreVal: 20,
    maxVal: 0,
    asChild: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'ScoringBadge 컴포넌트의 문서입니다. ScoringBadge 의 경우 기본 Badge 에서 variant는 "scoring" 를 고정한 컴포넌트로서, ScoringBadge 는 score, scoreVal 등을 필수값으로, maxVal을 옵션값으로 받습니다.<br/>asChild로 전환을 하더라도 해당 ScoringBadge 의 스타일을 우선적으로 받도록 되어있으니 해당 부분에 유의하셔야 합니다.<br/>기본적인 스타일은 Badge를 따르되 내부에서는 커스텀한 스타일이 있습니다.',
      },
    },
  },
};

export default meta;

type ScoringStory = StoryObj<typeof ScoringBadge>;

export const Default: ScoringStory = {
  parameters: {
    docs: {
      description: {
        story: '기본 ScoringBadge 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => {
    return <ScoringBadge {...args} />;
  },
};

// variant : scoring 일 때의 Badge 렌더링 스토리
export const Basic: ScoringStory = {
  args: {
    asChild: false,
    score: 'normal',
    scoreVal: 20,
    maxVal: 0,
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    score: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.score),
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'variant 가 `scoring` 일 때의 Badge 렌더링 스토리입니다. `score` 를 받으며, score 는 목록에서 선택하실 수 있습니다.',
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
                <CheckIcon size={'small'} />
                {score}
              </ScoringBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Only Icon
          <span className={'block text-xs'}>
            children안에 Icon만 있다 하더라도 앞에 scoreVal 이 있는 ScoringBadge 스타일 자체는 유지되니 유의해주세요.
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[]).map((score) => (
            <div className={'flex flex-col gap-0.5'} key={score}>
              <span className="text-xs text-juiText-blue">{score}</span>
              <ScoringBadge {...args} score={score}>
                <BookmarkIcon size={'small'} />
              </ScoringBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AsChild: ScoringStory = {
  args: {
    asChild: true,
    score: 'normal',
    scoreVal: 20,
    maxVal: 0,
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { disable: false, defaultValue: { summary: 'true' } },
    },
    children: {
      control: 'text',
      table: { disable: false },
    },
    score: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.score),
      table: { disable: false },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'asChild 는 boolean 으로서 true 시 Slot을 이용하여 자식의 컴포넌트 혹은 태그로 치환되고 스타일은 부모의 것을 유지할 수 있게 됩니다. 현재로서는 대표적인 예시를 Button, a, div 로 잡았습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          asChild - Button
          <span className={'block text-xs'}>asChild를 적용 시 children 언제나 단일 요소여야 합니다.</span>
        </span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">score: {args.score}</span>
            <ScoringBadge {...args}>
              <Button>{args.children}</Button>
            </ScoringBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">score: {args.score}</span>
            <ScoringBadge {...args}>
              <Button>
                <BookmarkIcon size={'small'} />
                {args.children}
              </Button>
            </ScoringBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          asChild - a 태그
          <span className={'block text-xs'}>
            a 태그의 경우, normalize.css 에서 data-slot이 button이 아닌 경우 배경이 transparent 으로 고정되는 부분
            유의해주세요.
          </span>
        </span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">score: {args.score}</span>
            <ScoringBadge {...args}>
              <a href={'/'} target={'_blank'}>
                {args.children}
              </a>
            </ScoringBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">score: {args.score}</span>
            <ScoringBadge {...args}>
              <a href={'/'} target={'_blank'}>
                <BookmarkIcon size={'small'} />
                {args.children}
              </a>
            </ScoringBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">asChild - div 태그</span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">score: {args.score}</span>
            <ScoringBadge {...args}>
              <div>{args.children}</div>
            </ScoringBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">score: {args.score}</span>
            <ScoringBadge {...args}>
              <div>
                <BookmarkIcon size={'small'} />
                {args.children}
              </div>
            </ScoringBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};
