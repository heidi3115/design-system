import { toggleVariants, Toggle } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  argTypes: {
    onIcon: {
      description: 'on 아이콘',
      options: ['EyeIcon', 'EyeOffIcon', 'StarIcon', 'noIcon'],
      control: { type: 'radio' },
    },
    offIcon: {
      description: 'off 아이콘',
      options: ['EyeIcon', 'EyeOffIcon', 'StarIcon', 'noIcon'],
      control: { type: 'radio' },
    },
    children: { control: 'text', description: '텍스트' },
    size: {
      control: 'radio',
      description: '사이즈 선택',
      options: Object.keys(toggleVariants.variants.size),
    },
    disabled: {
      control: 'boolean',
      description: '비활성 여부',
      options: [true, false],
    },
  },
  args: {
    onIcon: 'EyeIcon',
    offIcon: 'EyeOffIcon',
    disabled: false,
    children: '',
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;
type ToggleArgs = ComponentProps<typeof Toggle>;

const Template = (args: ToggleArgs) => <Toggle {...args} />;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle 기본 컴포넌트',
      },
    },
  },
  render: Template,
  args: {
    children: '',
    size: 'small',
  },
};

export const WithText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'children으로 원하는 텍스트를 추가할 수 있다.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'small, medium, large 세가지로 나누어져있고, 기본 값은 small이다.',
      },
    },
    controls: {
      exclude: ['size'],
    },
  },
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
