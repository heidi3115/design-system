import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants, CountBadge } from '@common/ui/components/Badge';
import { BookmarkIcon } from '@common/ui/icons';
import { Button } from '@common/ui';

const colorKeys = Object.keys(badgeVariants.variants.status) as (keyof typeof badgeVariants.variants.status)[];
const scoreKeys = Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[];
const combinedKeys = [...colorKeys, ...scoreKeys] as (
  | keyof typeof badgeVariants.variants.status
  | keyof typeof badgeVariants.variants.score
)[];

const meta: Meta<typeof CountBadge> = {
  title: 'UI/Badge/CountBadge',
  component: CountBadge,
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: 'Slot을 통해 Badge 스타일을 다른 태그에 이식하여 badge 스타일을 적용할 때 사용',
    },
    color: {
      control: 'select',
      options: combinedKeys,
      table: { defaultValue: { summary: 'default' } },
      description:
        ' 필수값. color 스타일로서 기존의 color, score 의 선택지 중에서 선택하거나 tailwind CSS의 bg-* 스타일로서 커스텀이 가능합니다..',
    },
    scoreVal: {
      control: 'number',
      table: { defaultValue: { summary: '20' } },
      description: '필수값. 숫자를 입력해야 합니다. 현재로서는 음수, 소수점도 허용되고는 있습니다. ',
    },
    maxVal: {
      control: 'number',
      table: { defaultValue: { summary: '0' } },
      description:
        '옵션값. 기본적으로 0이며, 0 이상의 숫자일 경우, 해당 maxVal 보다 값이 크거나 같으면 maxVal+의 형태로 표기됩니다.',
    },
    children: {
      control: 'text',
      table: { disable: true, defaultValue: { summary: 'null' } },
      description: 'Badge 내부에 들어갈 내용',
    },
    className: {
      control: 'text',
      table: { defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
  args: {
    children: null,
    color: 'default',
    scoreVal: 20,
    maxVal: 0,
    asChild: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'CountBadge 컴포넌트의 문서입니다. CountBadge 의 경우 기본 Badge 에서 variant는 "count" 를 고정한 컴포넌트로서, CountBadge 는 color, scoreVal 등을 필수값으로 maxVal 을 옵션값으로 받습니다.<br/>CountBadge의 경우 children이 있다면 children이 우선되므로 해당에 유의해아합니다.<br/>asChild로 전환을 하더라도 해당 CountBadge의 스타일을 우선적으로 받도록 되어있으니 해당 부분에 유의하셔야 합니다.<br/>기본적인 스타일은 Badge 를 따르고 있습니다.',
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

// variant : count 일 때의 Badge 렌더링 스토리
export const Basic: CountStory = {
  args: {
    asChild: false,
    color: 'default',
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
    color: {
      control: 'select',
      options: combinedKeys,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'variant 가 `count` 일 때의 Badge 렌더링 스토리입니다. ',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">scoreVal Only</span>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedKeys.map((color) => (
            <div className={'flex flex-col gap-0.5'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} color={color} maxVal={0} />
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
              <CountBadge {...args} color={color} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          with Children
          <span className={'block text-xs'}>CountBadge의 경우 children이 있으면 children이 우선됩니다.</span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedKeys.map((color) => (
            <div className={'flex flex-col gap-0.5'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} color={color}>
                <BookmarkIcon size={'small'} />
                {args.children || 'count badge'}
              </CountBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          with Children custom
          <span className={'block text-xs'}>
            CountBadge의 경우 children 에서 scoreVal 및 maxVal을 처리해서 전달해야 합니다.
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedKeys.map((color) => (
            <div className={'flex flex-col gap-0.5'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} color={color}>
                <BookmarkIcon size={'small'} />
                {args.scoreVal}
              </CountBadge>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 p-5">
          {combinedKeys.map((color) => (
            <div className={'flex flex-col gap-0.5'} key={color}>
              <span className="text-xs text-juiText-blue">{color}</span>
              <CountBadge {...args} color={color}>
                <BookmarkIcon size={'small'} />
                {args.scoreVal >= (args?.maxVal || 0) ? `${args.maxVal}+` : args.scoreVal}
              </CountBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AsChild: CountStory = {
  args: {
    asChild: true,
    color: 'default',
    children: 'asChild',
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { disable: false, defaultValue: { summary: 'true' } },
    },
    children: {
      control: 'text',
      table: { disable: false, defaultValue: { summary: 'asChild' } },
    },
    color: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.status),
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
            <span className="text-xs text-juiText-blue text-center">color: {args.color}</span>
            <CountBadge {...args}>
              <Button>{args.children}</Button>
            </CountBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">color: {args.color}</span>
            <CountBadge {...args}>
              <Button>
                <BookmarkIcon size={'small'} />
                {args.children}
              </Button>
            </CountBadge>
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
            <span className="text-xs text-juiText-blue text-center">color: {args.color}</span>
            <CountBadge {...args}>
              <a href={'/'} target={'_blank'}>
                {args.children}
              </a>
            </CountBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">color: {args.color}</span>
            <CountBadge {...args}>
              <a href={'/'} target={'_blank'}>
                <BookmarkIcon size={'small'} />
                {args.children}
              </a>
            </CountBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">asChild - div 태그</span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">color: {args.color}</span>
            <CountBadge {...args}>
              <div>{args.children}</div>
            </CountBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">color: {args.color}</span>
            <CountBadge {...args}>
              <div>
                <BookmarkIcon size={'small'} />
                {args.children}
              </div>
            </CountBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};
