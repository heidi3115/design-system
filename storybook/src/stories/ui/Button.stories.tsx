import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, buttonVariants } from '@common/ui/components';
import { AlertCircleIcon, FilePlusIcon, SaveIcon } from '@common/ui/icons';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.variant),
    },
    size: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.size),
    },
    asChild: {
      control: 'boolean',
      table: {
        disable: true,
      },
    },
    className: {
      control: 'text',
      table: { disable: false },
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'basic',
    asChild: false,
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

// variant 별 버튼 렌더링 스토리
export const Variants: Story = {
  render: (args) => (
    <div className={'grid grid-cols-4 gap-x-4 gap-y-8 items-center justify-center'}>
      {(Object.keys(buttonVariants.variants.variant) as (keyof typeof buttonVariants.variants.variant)[]).map(
        (variant) => (
          <div className={'flex flex-col gap-2'} key={variant}>
            {`variant='${variant}'`}
            <Button {...args} variant={variant} className={'w-fit'}>
              <AlertCircleIcon size={'small'} />
              {variant}
            </Button>
          </div>
        ),
      )}
    </div>
  ),
};

// size 별 버튼 렌더링 스토리
export const Sizes: Story = {
  args: {
    asChild: false,
    variant: 'default',
    children: '사이즈 버튼',
  },
  argTypes: {
    asChild: {
      table: { disable: true },
      control: false,
    },
    children: {
      table: { disable: true },
      control: false,
    },
    size: {
      table: { disable: true },
      control: false,
    },
    disabled: {
      control: 'boolean',
      table: { disabled: false },
    },
  },
  render: ({ children, ...args }) => (
    <div className={'flex flex-col gap-y-8'}>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(buttonVariants.variants.size) as (keyof typeof buttonVariants.variants.size)[]).map((size) => (
          <Button key={size} {...args} size={size}>
            {children || size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(buttonVariants.variants.size) as (keyof typeof buttonVariants.variants.size)[]).map((size) => (
          <Button key={size} {...args} size={size}>
            <SaveIcon size={size} />
            {children || size}
          </Button>
        ))}
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
    childTag: {
      control: 'select',
      options: ['a', 'span', 'div'],
      if: { arg: 'asChild', truthy: true },
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
        <FilePlusIcon />
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
      table: { disable: false },
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
  render: ({ children, disabled = false, ...buttonProps }) => (
    <div className={'flex justify-center'}>
      <Button
        {...buttonProps}
        variant={'primary'}
        className={'w-fit'}
        disabled={disabled}
        onChange={() => {
          console.log('disabled :', disabled);
        }}>
        {children}
      </Button>
    </div>
  ),
};
