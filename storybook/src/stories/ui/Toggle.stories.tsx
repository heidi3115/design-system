import { toggleVariants, Toggle } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps, ComponentType } from 'react';
import { EyeIcon, EyeOffIcon, type IconProps } from '@common/ui/icons';

const ICON_MAP: Record<string, ComponentType<IconProps> | undefined> = {
  none: undefined,
  eyeIcon: EyeIcon,
  eyeOffIcon: EyeOffIcon,
};
type IconKey = keyof typeof ICON_MAP;
type ToggleIconProps = Omit<ComponentProps<typeof Toggle>, 'onIcon' | 'offIocn'> & {
  onIcon: IconKey;
  offIcon: IconKey;
};

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  argTypes: {
    onText: { control: 'text', description: 'ON 상태 텍스트' },
    offText: { control: 'text', description: 'OFF 상태 텍스트' },
    onIcon: {
      description: 'on 아이콘',
      control: { disable: true },
    },
    offIcon: {
      description: 'off 아이콘',
      control: { disable: true },
    },
    children: { control: 'text', description: '텍스트' },
    disabled: {
      control: 'boolean',
      description: '비활성 여부',
      options: [true, false],
    },
    size: {
      control: 'radio',
      description: '사이즈 선택',
      options: Object.keys(toggleVariants.variants.size),
    },
  },
  args: {
    onIcon: <EyeIcon />,
    offIcon: <EyeOffIcon />,
    disabled: false,
    children: '',
    onText: '',
    offText: '',
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
    children: '이벤트 목록',
    size: 'small',
  },
};
export const ControlIcons: StoryObj<ToggleIconProps> = {
  argTypes: {
    onIcon: {
      description: 'on 아이콘',
      options: ['eyeIcon', 'eyeOffIcon', 'none'],
      control: { type: 'radio', disable: false },
    },
    offIcon: {
      description: 'off 아이콘',
      options: ['eyeIcon', 'eyeOffIcon', 'none'],
      control: { type: 'radio', disable: false },
    },
    children: { control: 'text', description: '텍스트' },
    disabled: {
      control: 'boolean',
      description: '비활성 여부',
      options: [true, false],
    },
    size: {
      control: 'radio',
      description: '사이즈 선택',
      options: Object.keys(toggleVariants.variants.size),
    },
  },
  args: {
    onIcon: 'eyeIcon',
    offIcon: 'eyeOffIcon',
    disabled: false,
    size: 'small',
    children: '',
    onText: '',
    offText: '',
  },
  render: ({ onIcon, offIcon, ...args }) => {
    const OnIconComponent = ICON_MAP?.[onIcon];
    const OffIconComponent = ICON_MAP?.[offIcon];
    return (
      <Toggle
        {...args}
        onIcon={OnIconComponent ? <OnIconComponent /> : undefined}
        offIcon={OffIconComponent ? <OffIconComponent /> : undefined}
      />
    );
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
      <Toggle {...args}>{args.children}</Toggle>
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
