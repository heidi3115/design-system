import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants, CountBadge } from '@common/ui/components/Badge';
import { AlertCircleIcon, BookmarkIcon } from '@common/ui/icons';

const DEFAULT_VAL = 20;
const MAX_VAL = 0;
const statusArr = Object.keys(badgeVariants.variants.status) as (keyof typeof badgeVariants.variants.status)[];
const scoreArr = Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[];
const combinedArr = [...statusArr, ...scoreArr] as (
  | keyof typeof badgeVariants.variants.status
  | keyof typeof badgeVariants.variants.score
)[];

const meta: Meta<typeof CountBadge> = {
  title: 'UI/DataDisplay/Common/Badge/CountBadge',
  component: CountBadge,
  args: {
    isBtn: false,
    color: 'default',
    scoreVal: DEFAULT_VAL,
    maxVal: MAX_VAL,
    icon: null,
    iconPosition: 'left',
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
    color: {
      control: 'select',
      options: combinedArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description: [
        'CountBadge의 색상 스타일을 지정하는 필수 props 입니다.',
        '기존의 status, score 선택지 중에서 선택하거나 tailwind CSS의 bg-* 스타일로 커스텀이 가능합니다.',
      ].join('<br/>'),
    },
    scoreVal: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: `${DEFAULT_VAL}` } },
      description: [
        'Badge 내부에 표시할 점수값을 지정하는 필수 props 입니다.',
        '숫자를 입력해야 하며, 현재로는 음수, 소수점도 허용됩니다.',
      ].join('<br/>'),
    },
    maxVal: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: `${MAX_VAL}` } },
      description: [
        '최대값을 지정하는 옵션 props 입니다.',
        '기본적으로 0이며, 0 이상의 숫자일 경우 scoreVal이 maxVal 보다 크거나 같으면 maxVal+의 형태로 표기됩니다.',
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
          'CountBadge 컴포넌트의 문서입니다. CountBadge는 알람의 수나 count된 값에 대한 부분 표시를 위한 Badge 입니다.',
          'CountBadge는 기본 Badge 에서 variant를 "count"로 고정한 컴포넌트로, color, scoreVal을 필수값으로 받습니다.',
          'maxVal, icon, iconPosition을 옵션값으로 받으며, children을 받지 않음에 유의해야 합니다.',
          'asChild는 기본 Badge 컴포넌트에서만 가능합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type CountStory = StoryObj<typeof CountBadge>;

export const Default: CountStory = {
  parameters: {
    docs: {
      description: {
        story: '기본 CountBadge 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => {
    return <CountBadge {...args} />;
  },
};

export const Color: CountStory = {
  args: {
    isBtn: false,
    color: 'default',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: true },
    },
    color: {
      control: 'select',
      options: combinedArr,
      table: { disable: true },
    },
    icon: {
      table: { disable: true },
    },
    iconPosition: {
      table: { disable: false },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'CountBadge 에서 쓰이는 모든 `color`의 종류와 다양한 예시들을 확인할 수 있습니다.',
          'CountBadge 의 경우 기본적으로 StateBadge 의 status 옵션, StateBadge 의 status 옵션, ScoringBadge의 score 옵션들의 색상을 배경색으로 처리 가능하며 그 이외에도 tailwindCSS 및 커스텀 된 색상이 있다면 `bg-*` 형태로 입력 가능합니다. 기본적으로는 "bg-juiGrey-a700"로 처리되고 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">scoreVal Only</span>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedArr.map((color) => (
            <div className={'flex flex-col gap-0.5 text-center'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} color={color} maxVal={MAX_VAL} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With maxVal</span>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedArr.map((color) => (
            <div className={'flex flex-col gap-0.5 text-center'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} color={color} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          IconPosition with maxVal
          <span className={'block text-xs'}>CountBadge의 경우 IconPosition 의 기본값은 &#39;left&#39; 입니다니다.</span>
        </span>
        <div className="grid grid-cols-4 gap-4 p-5 items-center justify-center">
          {combinedArr.map((color) => (
            <div className={'flex flex-col gap-0.5 items-center'} key={color}>
              <span className="text-xs text-juiText-blue">{`color: ${color} | iconPosition: ${args.iconPosition}`}</span>
              <CountBadge {...args} color={color} icon={<BookmarkIcon size={'small'} />} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const IsBtn: CountStory = {
  args: {
    isBtn: true,
    color: 'default',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: false, defaultValue: { summary: 'true' } },
    },
    color: {
      control: 'select',
      options: combinedArr,
      table: { disable: false },
    },
    icon: {
      table: { disable: true },
    },
    iconPosition: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'isBtn 는 boolean 으로 true 시 button 처럼 hover:, active:, focus:의 이벤트 적인 내역들에 대한 이펙트가 추가됩니다. 기본적으로는 false 입니다.',
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
          <span className="text-xs text-juiText-blue">{`color: ${args.color}`}</span>
          <CountBadge {...args} />
        </div>
        <div className={'flex flex-col gap-1 items-center'}>
          <span className="text-xs text-juiText-blue">{`color: ${args.color} | iconPosition: left`}</span>
          <CountBadge {...args} icon={<AlertCircleIcon size={'small'} />} />
        </div>
        <div className={'flex flex-col gap-1 items-center'}>
          <span className="text-xs text-juiText-blue">{`color: ${args.color} | iconPosition: right`}</span>
          <CountBadge {...args} icon={<AlertCircleIcon size={'small'} />} iconPosition={'right'} />
        </div>
      </div>
    </div>
  ),
};
