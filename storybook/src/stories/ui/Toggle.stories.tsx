import { toggleVariants, Toggle } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { EyeIcon, EyeOffIcon, StarIcon } from '@common/ui/icons';

const icons = {
  EyeIcon: <EyeIcon />,
  EyeOffIcon: <EyeOffIcon />,
  StarIcon: <StarIcon />,
};

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  argTypes: {
    onText: { control: 'text', description: 'ON 상태 텍스트' },
    offText: { control: 'text', description: 'OFF 상태 텍스트' },
    onIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: { type: 'select', labels: { EyeIcon: '눈', EyeOffIcon: '눈 감음', StarIcon: '별' } },
      description: 'ON 상태 아이콘',
    },
    offIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: { type: 'select', labels: { EyeIcon: '눈', EyeOffIcon: '눈 감음', StarIcon: '별' } },
      description: 'OFF 상태 아이콘',
    },
    children: { control: 'text', description: '항상 보이는 텍스트' },
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
    children: 'B',
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

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(toggleVariants.variants.size) as (keyof typeof toggleVariants.variants.size)[]).map((size) => (
        <Toggle key={size} {...args} size={size}>
          {size}
        </Toggle>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(toggleVariants.variants.size) as (keyof typeof toggleVariants.variants.size)[]).map((size) => (
        <Toggle key={size} {...args} size={size}>
          {size}
        </Toggle>
      ))}
    </div>
  ),
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom',
    // onClassName: 'bg-green-500 border-green-700 text-white shadow-md',
    // offClassName: 'bg-gray-200 text-gray-500',
  },
};
