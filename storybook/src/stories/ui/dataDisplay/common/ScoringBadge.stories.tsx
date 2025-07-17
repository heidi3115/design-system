import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants, ScoringBadge } from '@common/ui/components/Badge';
import { AlertCircleIcon, DownloadIcon } from '@common/ui/icons';

const scoreArr = Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[];

const meta: Meta<typeof ScoringBadge> = {
  title: 'UI/DataDisplay/Common/Badge/ScoringBadge',
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
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'isBtn 활성화 시 버튼처럼 hover, active, focus 이벤트 상태 시 변화가 추가되며,',
        'cursor 및 pointer events 관련 CSS가 추가됩니다.',
      ].join('<br/>'),
    },
    score: {
      control: 'select',
      options: scoreArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'normal' } },
      description: [
        'ScoringBadge의 점수 스타일을 지정하는 필수 props 입니다.',
        'veryLow, low, normal, high, veryHigh, extra, practice, scoreAlert 중에서 선택해야 합니다.',
      ].join('<br/>'),
    },
    scoreVal: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: '20' } },
      description: [
        'Badge 내부에 표시할 점수값을 지정하는 필수 props 입니다.',
        '숫자를 입력해야 하며, 현재로는 음수, 소수점도 허용됩니다. 현재의 defaultValue는 storybook 전용으로 설정한 값입니다.',
      ].join('<br/>'),
    },
    maxVal: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0' } },
      description: [
        '최대값을 지정하는 옵션 props 입니다.',
        '기본적으로 0이며, 0 이상의 숫자일 경우 scoreVal이 maxVal보다 크거나 같으면 maxVal+의 형태로 표기됩니다.',
        '현재의 defaultValue는 storybook 전용으로 설정한 값입니다.',
      ].join('<br/>'),
    },
    icon: {
      control: false,
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'null' } },
      description: 'Badge 내부에 표시할 아이콘을 지정하는 옵션 props 입니다.',
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      table: { type: { summary: "'left' | 'right'" }, defaultValue: { summary: 'left' } },
      description: "아이콘의 위치를 지정하는 props 입니다. 'left'(기본값) 또는 'right' 중에서 선택할 수 있습니다.",
    },
    children: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'ScoringBadge' } },
      description: [
        'ScoringBadge 내부에 들어갈 내용을 지정하는 필수 props 입니다.',
        '일반적으로 scoreVal에 따른 등급 레벨을 표기하며, 문자열만 가능합니다.',
      ].join('<br/>'),
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
          'ScoringBadge 컴포넌트의 문서입니다. ScoringBadge는 기본 Badge에서 variant를 "scoring"으로 고정한 컴포넌트입니다.',
          'score, scoreVal, children을 필수값으로, maxVal, icon, iconPosition을 옵션값으로 받습니다.',
          '기본적인 스타일은 Badge를 따르되, ScoringBadge 별도 스타일이 고정되어 있어서 children은 문자열만 받습니다.',
          'props 들의 예시와 isBtn 대한 내역은 아래 storybook 에서 확인해주세요.',
          'asChild는 기본 Badge 컴포넌트에서만 가능하다는 것을 유의해주세요.',
        ].join('<br/>'),
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
      options: scoreArr,
      table: { disable: true },
    },
    icon: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'ScoringBadge에서 사용되는 모든 score 종류와 다양한 예시들을 확인할 수 있습니다.',
          'ScoringBadge 의 경우 `score`의 기본값은 `info` 로 처리되고 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Default</span>
        <div className="flex flex-wrap gap-4 p-5">
          {scoreArr.map((score) => (
            <div className={'flex flex-col gap-0.5 text-center'} key={score}>
              <span className="text-xs text-juiText-blue">{score}</span>
              <ScoringBadge {...args} score={score as keyof typeof badgeVariants.variants.score} icon={null} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {scoreArr.map((score) => (
            <div className={'flex flex-col gap-0.5 text-center'} key={score}>
              <span className="text-xs text-juiText-blue">{`score : ${score} | iconPosition: ${args.iconPosition}`}</span>
              <ScoringBadge {...args} score={score as keyof typeof badgeVariants.variants.score} />
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
      options: scoreArr,
      table: { disable: false },
    },
    icon: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'isBtn은 boolean 값으로 true 시 button 처럼 hover, active, focus 이벤트에 대한 이펙트가 추가됩니다.',
          '기본값은 false 입니다.',
        ].join('<br/>'),
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
