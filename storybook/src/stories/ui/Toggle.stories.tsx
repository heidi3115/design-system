import { toggleVariants, Toggle, Button } from '@common/ui/components';
import type { ToggleProps } from '@common/ui/components/Toggle/Toggle';
import { EyeIcon, EyeOffIcon, type IconProps } from '@common/ui/icons';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState, type ComponentProps, type ComponentType } from 'react';

const ICON_MAP: Record<string, ComponentType<IconProps> | undefined> = {
  none: undefined,
  eyeOn: EyeIcon,
  eyeOff: EyeOffIcon,
};

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  argTypes: {
    onText: { control: 'text', description: 'ON 상태 텍스트' },
    offText: { control: 'text', description: 'OFF 상태 텍스트' },
    onIcon: {
      control: 'select',
      options: ['none', 'eyeOn', 'eyeOff'],
      table: { disable: true },
    },
    offIcon: {
      control: 'select',
      options: ['none', 'eyeOn', 'eyeOff'],
      table: { disable: true },
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
    pressedRef: {
      table: { disable: true },
    },
  },
  args: {
    disabled: false,
    size: 'small',
    children: 'Toggle',
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
      {(Object.keys(toggleVariants.variants.size) as (keyof typeof toggleVariants.variants.size)[]).map(
        (size, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div>{size}</div>
            <Toggle key={size} {...args} size={size}>
              {size}
            </Toggle>
          </div>
        ),
      )}
    </div>
  ),
};

type IconKey = keyof typeof ICON_MAP;
type IconStoryProps = Omit<ComponentProps<typeof Toggle>, 'onIcon' | 'offIcon'> & {
  onIcon: IconKey;
  offIcon: IconKey;
};

export const IconAndText: StoryObj<IconStoryProps> = {
  parameters: {
    docs: {
      description: {
        story: 'children으로 원하는 텍스트를 추가할 수 있다.',
      },
    },
  },
  args: {
    onIcon: 'eyeOn',
    offIcon: 'eyeOff',
    onText: 'ON',
    offText: 'OFF',
  },
  argTypes: {
    onIcon: {
      table: { disable: false },
    },
    offIcon: {
      table: { disable: false },
    },
  },
  render: ({ onIcon, offIcon, ...args }) => {
    const IconOnComp = ICON_MAP?.[onIcon];
    const IconOffComp = ICON_MAP?.[offIcon];

    return (
      <div className="flex flex-wrap gap-2">
        <Toggle onIcon={IconOnComp} offIcon={IconOffComp} {...args} />
      </div>
    );
  },
};

const ControllComp = ({ onPressedChange, ...args }: ToggleProps) => {
  const [isPress, setIsPress] = useState(false);
  const pressedRef = useRef(null);

  const logControlledChange = action('제어형 onChange 발생');
  const logUncontrolledConfirm = action('비제어형 확인');

  const controlledhandleChange = (press: boolean) => {
    setIsPress(press);
    logControlledChange(press);
    onPressedChange?.(press); // 스토리북 action 로그용
  };

  const unControlledhandleChange = () => {
    logUncontrolledConfirm(pressedRef.current);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">제어형 토글</span>
        <div className="w-3xs">
          <Toggle {...args} pressed={isPress} onPressedChange={controlledhandleChange}>
            제어
          </Toggle>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">비제어형 토글(변경 후 외부 클릭)</span>
        <div className="w-3xs flex gap-2">
          <Toggle {...args} pressedRef={pressedRef}>
            비제어
          </Toggle>
          <Button onClick={unControlledhandleChange}>비제어 확인 Click</Button>
        </div>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  args: {},
  argTypes: {
    offText: {
      table: { disable: true },
    },
    onText: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '제어형(Controlled) Input 사용 예시입니다. 입력값을 상태로 관리합니다.',
      },
      disable: true,
    },
  },
  render: (args) => <ControllComp {...args} />,
};
