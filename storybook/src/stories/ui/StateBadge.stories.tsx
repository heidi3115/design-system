import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants, StateBadge } from '@common/ui/components/Badge';
import { BookmarkIcon, CheckIcon } from '@common/ui/icons';
import { Button } from '@common/ui';

const meta: Meta<typeof StateBadge> = {
  title: 'UI/Badge/StateBadge',
  component: StateBadge,
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: 'Slot을 통해 Badge 스타일을 다른 태그에 이식하여 badge 스타일을 적용할 때 사용',
    },
    status: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.status),
      table: { defaultValue: { summary: 'default' } },
      description:
        ' 필수값. status 스타일 (default, primary, secondary, progress, complete, failed, info, boundary, alert, critical, urgency) 중에서 선택해야 합니다.',
    },
    children: {
      control: 'text',
      table: { defaultValue: { summary: 'StateBadge' } },
      description: 'Badge 내부에 들어갈 내용',
    },
    className: {
      control: 'text',
      table: { defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
  args: {
    children: 'StateBadge',
    status: 'default',
    asChild: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'StateBadge 컴포넌트의 문서입니다. StateBadge 의 경우 기본 Badge 에서 variant는 "state" 를 고정한 컴포넌트로서, StateBadge 는 status를 필수값으로 받습니다.<br/>asChild로 전환을 하더라도 해당 StateBadge의 스타일을 우선적으로 받도록 되어있으니 해당 부분에 유의하셔야 합니다.<br/>기본적인 스타일은 Badge 를 따르고 있습니다.',
      },
    },
  },
};

export default meta;

type StateStory = StoryObj<typeof StateBadge>;

export const Default: StateStory = {
  parameters: {
    docs: {
      description: {
        story: '기본 StateBadge 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => {
    return <StateBadge {...args} />;
  },
};

// variant : state 일 때의 Badge 렌더링 스토리
export const Basic: StateStory = {
  args: {
    asChild: false,
    status: 'default',
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

export const AsChild: StateStory = {
  args: {
    asChild: true,
    status: 'default',
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
    status: {
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
            <span className="text-xs text-juiText-blue text-center">status: {args.status}</span>
            <StateBadge {...args}>
              <Button>{args.children}</Button>
            </StateBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">status: {args.status}</span>
            <StateBadge {...args}>
              <Button>
                <BookmarkIcon size={'small'} />
                {args.children}
              </Button>
            </StateBadge>
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
            <span className="text-xs text-juiText-blue text-center">status: {args.status}</span>
            <StateBadge {...args}>
              <a href={'/'} target={'_blank'}>
                {args.children}
              </a>
            </StateBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">status: {args.status}</span>
            <StateBadge {...args}>
              <a href={'/'} target={'_blank'}>
                <BookmarkIcon size={'small'} />
                {args.children}
              </a>
            </StateBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">asChild - div 태그</span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">status: {args.status}</span>
            <StateBadge {...args}>
              <div>{args.children}</div>
            </StateBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">status: {args.status}</span>
            <StateBadge {...args}>
              <div>
                <BookmarkIcon size={'small'} />
                {args.children}
              </div>
            </StateBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};
