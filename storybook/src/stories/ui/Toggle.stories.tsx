import { toggleVariants, Toggle } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  argTypes: {
    onIcon: {
      options: ['EyeIcon', 'EyeOffIcon', 'StarIcon', 'noIcon'],
      control: { type: 'radio' },
    },
    offIcon: {
      options: ['EyeIcon', 'EyeOffIcon', 'StarIcon', 'noIcon'],
      control: { type: 'radio' },
    },
    children: { control: 'text', description: '텍스트' },
    size: {
      control: 'radio',
      description: '사이즈 선택',
      options: Object.keys(toggleVariants.variants.size),
    },
  },
  args: {
    onIcon: 'EyeIcon',
    offIcon: 'EyeOffIcon',
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;
type ToggleArgs = ComponentProps<typeof Toggle>;

const Template = (args: ToggleArgs) => <Toggle {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    variant: 'default',
    children: '',
    size: 'small',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col flex-wrap gap-2">
      {(Object.keys(toggleVariants.variants.variant) as (keyof typeof toggleVariants.variants.variant)[]).map(
        (variant) => (
          <div key={variant} className="flex flex-col w-20 gap-2">
            {variant}
            <Toggle {...args} variant={variant}>
              {variant}
            </Toggle>
          </div>
        ),
      )}
    </div>
  ),
};

export const WithText: Story = {
  args: {
    children: '텍스트 추가',
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Toggle size={args.size} onIcon={args.onIcon} offIcon={args.offIcon}>
        {args.children}
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(toggleVariants.variants.size) as (keyof typeof toggleVariants.variants.size)[]).map((size) => (
        <div className="flex flex-col gap-2">
          <div>{size}</div>
          <Toggle key={size} {...args} size={size}>
            {size}
          </Toggle>
        </div>
      ))}
    </div>
  ),
};
