import { Button, buttonVariants } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import { AddIcon } from '@common/ui/icons';

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
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'jui',
    size: 'default',
    asChild: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

// variant 별 버튼 렌더링 스토리
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(buttonVariants.variants.variant) as (keyof typeof buttonVariants.variants.variant)[]).map(
        (variant) => (
          <Button key={variant} {...args} variant={variant}>
            <AddIcon />
            {variant}
          </Button>
        ),
      )}
    </div>
  ),
};

// size 별 버튼 렌더링 스토리
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(buttonVariants.variants.size) as (keyof typeof buttonVariants.variants.size)[]).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
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
