import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants, StateBadge } from '@common/ui/components/Badge';
import { BookmarkIcon, CheckIcon } from '@common/ui/icons';

const statusArr = Object.keys(badgeVariants.variants.status);

const meta: Meta<typeof StateBadge> = {
  title: 'UI/DataDisplay/Common/Badge/StateBadge',
  component: StateBadge,
  args: {
    isBtn: false,
    status: 'default',
    children: 'StateBadge',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description:
        'isBtn 활성화 시 버튼처럼 hover, active, focus 이벤트 상태 시 변화가 추가되며, cursor 및 pointer events 관련 CSS가 추가됩니다.',
    },
    status: {
      control: 'select',
      options: statusArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description:
        'StateBadge의 상태를 지정하는 필수 props 로 default, primary, secondary, progress, complete, failed, info, boundary, alert, critical, urgency 중에서 선택해야 합니다.',
    },
    children: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'StateBadge' } },
      description: 'Badge 내부에 들어갈 내용입니다.',
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
          'StateBadge 컴포넌트의 문서입니다. StateBadge는 레이블이나 태그 등 상태 표시를 위한 컴포넌트입니다.',
          'StateBadge는 기본 Badge 에서 variant를 "state"로 고정한 컴포넌트로, status를 필수값으로, isBtn을 옵션값으로 받습니다.',
          'children에 대해서는 따로 제한이 없으며, asChild는 기본 Badge 컴포넌트에서만 가능합니다.',
        ].join('<br/>'),
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

export const Status: StateStory = {
  args: {
    isBtn: false,
    status: 'default',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    status: {
      control: 'select',
      options: statusArr,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'StateBadge 에서 사용되는 모든 status 종류와 다양한 예시들을 확인할 수 있습니다.',
          'StateBadge 의 경우 children에 따로 제한이 되어있지는 않습니다만 기본은 Badge 에서 가져왔으니 해당에 유의해주세요.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5 items-center justify-center">
          {statusArr.map((status) => (
            <div className={'flex flex-col gap-0.5 items-center'} key={status}>
              <span className="text-xs text-juiText-blue">{status}</span>
              <StateBadge {...args} status={status as keyof typeof badgeVariants.variants.status}>
                {status}
              </StateBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5 items-center justify-center">
          {statusArr.map((status) => (
            <div className={'flex flex-col gap-0.5 items-center'} key={status}>
              <span className="text-xs text-juiText-blue">{status}</span>
              <StateBadge {...args} status={status as keyof typeof badgeVariants.variants.status}>
                <CheckIcon size={'small'} />
                {status}
              </StateBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Only Icon</span>
        <div className="flex flex-wrap gap-4 p-5 items-center justify-center">
          {statusArr.map((status) => (
            <div className={'flex flex-col gap-0.5 items-center'} key={status}>
              <span className="text-xs text-juiText-blue">{status}</span>
              <StateBadge {...args} status={status as keyof typeof badgeVariants.variants.status}>
                <BookmarkIcon size={'small'} />
              </StateBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const IsBtn: StateStory = {
  args: {
    isBtn: true,
    status: 'default',
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
      <div className="flex flex-row flex-wrap gap-4 p-5">
        <div className={'flex flex-col gap-1'}>
          <span className="text-xs text-juiText-blue text-center">status: {args.status}</span>
          <StateBadge {...args}>{args.children}</StateBadge>
        </div>
        <div className={'flex flex-col gap-1'}>
          <span className="text-xs text-juiText-blue text-center">status: {args.status}</span>
          <StateBadge {...args}>
            <BookmarkIcon size={'small'} />
            {args.children}
          </StateBadge>
        </div>
      </div>
    </div>
  ),
};
