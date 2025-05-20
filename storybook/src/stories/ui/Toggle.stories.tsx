import { toggleVariants, Toggle } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(toggleVariants.variants.variant),
    },
    size: {
      control: 'select',
      options: Object.keys(toggleVariants.variants.size),
    },
    children: { control: 'text' },
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
