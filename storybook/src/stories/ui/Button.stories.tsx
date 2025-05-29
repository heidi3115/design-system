import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, buttonVariants } from '@common/ui/components';
import { AlertCircleIcon, FilePlusIcon, SaveIcon, StarIcon } from '@common/ui/icons';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'default',
    size: 'basic',
    disabled: false,
    asChild: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.variant),
      table: { defaultValue: { summary: 'default' } },
      description:
        'select를 통해 버튼의 색상 스타일 타입(primary, secondary, error, default, gradient, transparent, transparentGrey 등)을 지정합니다.',
    },
    size: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.size),
      table: { defaultValue: { summary: 'basic' } },
      description: 'select를 통해 버튼의 크기(basic, small, medium, large 등)를 지정합니다.',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: '버튼 비활성화 여부',
    },
    asChild: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: 'button 태그 대신 다른 태그(a, label 등)에 버튼 스타일을 적용할 때 사용',
    },
    children: {
      control: 'text',
      table: { defaultValue: { summary: 'Button' } },
      description: '버튼 내부에 들어갈 내용',
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
        component: 'Button 컴포넌트의 문서입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 Button 컴포넌트의 예시입니다.',
      },
    },
  },
};

// variant 별 버튼 렌더링 스토리
export const Variants: Story = {
  args: {
    asChild: false,
    variant: 'default',
  },
  argTypes: {
    asChild: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: false,
      table: { disable: true },
    },
    variant: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button 컴포넌트 중 색상 스타일의 종류별로 렌더링한 variants 입니다. <br/>글씨만 있는 것, 아이콘과 글씨가 있는 것, 아이콘만 있는 것의 종류를 확인하실 수 있습니다.<br/>props 명은 variant 입니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(buttonVariants.variants.variant) as (keyof typeof buttonVariants.variants.variant)[]).map(
            (variant) => (
              <div className={'flex flex-col gap-0.5'} key={variant}>
                <span className="text-xs text-juiText-blue">{variant}</span>
                <Button {...args} variant={variant} className={args.className}>
                  {variant}
                </Button>
              </div>
            ),
          )}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(buttonVariants.variants.variant) as (keyof typeof buttonVariants.variants.variant)[]).map(
            (variant) => (
              <div className={'flex flex-col gap-0.5'} key={variant}>
                <span className="text-xs text-juiText-blue">{variant}</span>
                <Button {...args} variant={variant} className={args.className}>
                  <AlertCircleIcon size={args.size} />
                  {variant}
                </Button>
              </div>
            ),
          )}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Only Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(buttonVariants.variants.variant) as (keyof typeof buttonVariants.variants.variant)[]).map(
            (variant) => (
              <div className={'flex flex-col gap-0.5'} key={variant}>
                <span className="text-xs text-juiText-blue">{variant}</span>
                <Button {...args} variant={variant} className={args.className}>
                  <AlertCircleIcon size={args.size} />
                </Button>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  ),
};

// size 별 버튼 렌더링 스토리
export const Sizes: Story = {
  args: {
    asChild: false,
    variant: 'default',
    children: '사이즈 버튼',
    disabled: false,
  },
  argTypes: {
    asChild: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: false,
      table: { disable: true, defaultValue: { summary: '사이즈 버튼' } },
    },
    size: {
      control: false,
      table: { disable: true },
    },
    disabled: {
      control: 'boolean',
      table: { disabled: false },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button 컴포넌트 중 크기 스타일의 종류별로 렌더링한 sizes 입니다. <br/>글씨만 있는 것, 아이콘과 글씨가 있는 것, 아이콘만 있는 것의 종류를 확인하실 수 있습니다.<br/>props 명은 size 입니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(buttonVariants.variants.size) as (keyof typeof buttonVariants.variants.size)[]).map((size) => (
            <div className={'flex flex-col gap-0.5 '} key={size}>
              <span className="text-xs text-juiText-blue">{size}</span>
              <Button key={size} {...args} size={size}>
                {size}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col justify-start gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(buttonVariants.variants.size) as (keyof typeof buttonVariants.variants.size)[]).map((size) => (
            <div className={'flex flex-col gap-0.5'} key={size}>
              <span className="text-xs text-juiText-blue">{size}</span>
              <Button key={size} {...args} size={size}>
                <SaveIcon size={size} />
                {size}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Only Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(buttonVariants.variants.size) as (keyof typeof buttonVariants.variants.size)[]).map((size) => (
            <div className={'flex flex-col gap-0.5'} key={size}>
              <span className="text-xs text-juiText-blue">{size}</span>
              <Button key={size} {...args} size={size}>
                <StarIcon size={size} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// asChild 태그 렌더링 스토리
type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
  childTag?: 'a' | 'span' | 'div';
};
type StoryAsChild = StoryObj<ButtonStoryArgs>;

export const AsChildDynamic: StoryAsChild = {
  args: {
    asChild: true,
    children: '링크 버튼',
    childTag: 'a',
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: {
        disable: false,
      },
    },
    children: { table: { defaultValue: { summary: '링크 버튼' } } },
    childTag: {
      control: 'select',
      options: ['a', 'span', 'div'],
      table: { defaultValue: { summary: 'a' } },
      if: { arg: 'asChild', truthy: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '버튼 컴포넌트의 "asChild" props를 활용하여 Button 컴포넌트를 현재 옵션으로 지정해놓은 `a`, `span`, `div` 등의 다양한 태그로 렌더링할 수 있는 예시입니다.<br/>이 방식은 버튼 역할을 하는 커스텀 태그(예: 링크, 커스텀 래퍼 등)에 버튼 스타일과 인터랙션을 그대로 적용하고 싶을 때 사용합니다.<br/>asChild={true} 를 지정하면, children에 전달된 태그(a, span, div 등)가 실제 DOM에 렌더링되고, Button 컴포넌트의 스타일/속성이 해당 태그에 이식됩니다.<br/>접근성이나 레이아웃 유연성이 필요한 복합 UI에서 유용하게 활용할 수 있습니다.',
      },
    },
  },
  render: ({ childTag, children, ...buttonProps }) => {
    const Tag = childTag ?? 'a';

    return (
      <Button {...buttonProps}>
        <Tag {...(Tag === 'a' ? { href: '#', target: '_blank' } : {})}>{children}</Tag>
      </Button>
    );
  },
};

// isFile을 위한 action
type AsChildIsFileArgs = React.ComponentProps<typeof Button> & {
  children?: React.ReactNode;
};

export const asChildIsFile: StoryObj<AsChildIsFileArgs> = {
  args: {
    asChild: true,
    disabled: false,
    children: (
      <label className={'flex items-center gap-2'}>
        <FilePlusIcon size={'small'} />
        파일 추가
        <input
          type="file"
          className={'hidden'}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              console.log('선택된 파일:', e.target.files[0]);
              alert('업로드된 파일 : ' + e.target.files[0].name);
            }
          }}
        />
      </label>
    ),
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { disable: false, defaultValue: { summary: 'true' } },
    },
    children: {
      table: { disable: true },
      control: false,
    },
    disabled: {
      control: 'boolean',
      table: { disabled: false },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '버튼 컴포넌트의 "asChild" props를 활용하여 `button` 이 아니라 `label` 태그로 커스터마이징 하는 예시 입니다.<br/>`asChild={true}` 를 사용하여 Button 스타일과 인터랙션을 실제 `label` 태그에 이식합니다.<br/>`<input type="file">` 과 `label` 을 연동하여 커스텀 스타일의 파일 업로드 버튼을 만들 때 접근성과 사용자 경험을 모두 챙기면서, <br/>Button 컴포넌트의 스타일을 그대로 활용하고 싶을 때 유용합니다.',
      },
    },
  },
  render: ({ children, ...buttonProps }) => (
    <div className={'flex'}>
      <Button {...buttonProps}>{children}</Button>
    </div>
  ),
};
