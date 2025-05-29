import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants, ScoringBadge } from '@common/ui/components/Badge';
import { AlertCircleIcon, DownloadIcon } from '@common/ui/icons';

const scoreKeys = Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[];

const meta: Meta<typeof ScoringBadge> = {
  title: 'UI/Badge/ScoringBadge',
  component: ScoringBadge,
  args: {
    isBtn: false,
    score: 'normal',
    scoreVal: 20,
    maxVal: 0,
    iconPosition: 'left',
    children: 'ScoringBadge',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description:
        'isBtn 활성화 시, 버튼처럼 hover:, active:, focus:의 이벤트 상태 시 변화가 추가되며, cursor 및 pointer events 관련 css가 추가됩니다.',
    },
    score: {
      control: 'select',
      options: scoreKeys,
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
    icon: {
      control: false,
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'null' } },
      description: 'Badge 내부에 표시할 아이콘(ReactNode) 입니다.',
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      table: { type: { summary: "'left' | 'right'" }, defaultValue: { summary: 'left' } },
      description: "아이콘 위치. 'left'(기본값) 또는 'right' 선택",
    },
    children: {
      control: 'text',
      table: { defaultValue: { summary: 'ScoringBadge' } },
      description:
        'ScoringBadge 내부에 들어갈 내용으로서 일반적으로 scoreVal에 따른 등급 레벨을 표기합니다. 문자열만 가능합니다.',
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
          'ScoringBadge 컴포넌트의 문서입니다. ScoringBadge 의 경우 기본 Badge 에서 variant는 "scoring" 를 고정한 컴포넌트로서, ScoringBadge 는 score, scoreVal, children 등을 필수값으로, maxVal, icon, iconPosition 을 옵션값으로 받습니다.<br/>기본적인 스타일은 Badge를 따르되 ScoringBadge 별도 스타일이 고정되어 있어서, children 은 문자열만 받고 있습니다.<br/>props 들의 예시와 isBtn 대한 내역은 아래 스토리에서 확인해주세요. 다만, asChild는 기본 Badge 컴포넌트에서만 가능하다는 것을 유의해주세요.',
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

export const Score: ScoringStory = {
  args: {
    isBtn: false,
    score: 'normal',
    icon: <DownloadIcon size={'small'} />,
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: true },
    },
    score: {
      control: 'select',
      options: scoreKeys,
      table: { disable: true },
    },
    icon: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'ScoringBadge 에서 쓰이는 모든 `score` 의 종류와 다양한 예시들을 확인하실 수 있습니다.<br/>ScoringBadge 의 경우 `score`의 기본값은 `info` 로 처리되고 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Default</span>
        <div className="flex flex-wrap gap-4 p-5">
          {scoreKeys.map((score) => (
            <div className={'flex flex-col gap-0.5 text-center'} key={score}>
              <span className="text-xs text-juiText-blue">{score}</span>
              <ScoringBadge {...args} score={score} icon={null} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {scoreKeys.map((score) => (
            <div className={'flex flex-col gap-0.5 text-center'} key={score}>
              <span className="text-xs text-juiText-blue">{`score : ${score} | iconPosition: ${args.iconPosition}`}</span>
              <ScoringBadge {...args} score={score} />
            </div>
          ))}
        </div>
      </div>
      <hr />
    </div>
  ),
};

export const IsBtn: ScoringStory = {
  args: {
    isBtn: true,
    score: 'normal',
    icon: <AlertCircleIcon size={'small'} />,
    iconPosition: 'right',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: false, defaultValue: { summary: 'true' } },
    },
    children: {
      control: 'text',
      table: { disable: false },
    },
    score: {
      control: 'select',
      options: scoreKeys,
      table: { disable: false },
    },
    icon: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'isBtn 는 boolean 으로서 true 시 button 처럼 hover:, active:, focus:의 이벤트 적인 내역들에 대한 이펙트가 추가됩니다. 기본적으로는 false 입니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <span className="text-sm font-bold">
        isBtn
        <span className={'block text-xs'}>
          isBtn 를 적용해도 해당의 컴포넌트 및 태그 자체는 Badge 에서 벗어나는 것은 아닙니다.
        </span>
      </span>
      <div className={'flex flex-row gap-3 text-center'}>
        <div className={'flex flex-col gap-1 items-center'}>
          <span className="text-xs text-juiText-blue">{`score: ${args.score} | isBtn: ${args.isBtn}`}</span>
          <ScoringBadge {...args} icon={null} />
        </div>
        <div className={'flex flex-col gap-1 items-center'}>
          <span className="text-xs text-juiText-blue">{`score: ${args.score} | isBtn: ${args.isBtn} | iconPosition: ${args.iconPosition}`}</span>
          <ScoringBadge {...args} />
        </div>
      </div>
    </div>
  ),
};
