import { Button, Toggle } from '@common/ui/components';
import type { ToggleProps } from '@common/ui/components/Toggle/Toggle';
import { EyeIcon, EyeOffIcon, type IconProps } from '@common/ui/icons';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, type ComponentType, useRef, useState } from 'react';

// 공통 상수
const sizeOptions = ['small', 'medium', 'large'] as const;
const iconOptions = ['none', 'eyeOn', 'eyeOff'] as const;

const ICON_MAP: Record<string, ComponentType<IconProps> | undefined> = {
  none: undefined,
  eyeOn: EyeIcon,
  eyeOff: EyeOffIcon,
};

const meta: Meta<typeof Toggle> = {
  title: 'UI/Form/Action/Toggle',
  component: Toggle,
  args: {
    disabled: false,
    size: 'small',
    children: 'Toggle',
    onText: undefined,
    offText: undefined,
    onIcon: undefined,
    offIcon: undefined,
    pressed: undefined,
    defaultPressed: false,
    onPressedChange: undefined,
    pressedRef: undefined,
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(' | ') },
        defaultValue: { summary: 'small' },
      },
      description: ['Toggle 컴포넌트의 크기를 설정합니다.', 'small, medium, large 중에서 선택할 수 있습니다.'].join(
        '<br/>',
      ),
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'Toggle 컴포넌트의 비활성화 상태를 설정합니다.',
    },
    children: {
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Toggle' },
      },
      description: ['Toggle 컴포넌트에 표시할 기본 텍스트입니다.', 'onText 또는 offText가 없을 때 사용됩니다.'].join(
        '<br/>',
      ),
    },
    onText: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'Toggle이 ON 상태일 때 표시할 텍스트입니다.',
    },
    offText: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'Toggle이 OFF 상태일 때 표시할 텍스트입니다.',
    },
    onIcon: {
      control: 'select',
      options: iconOptions,
      table: {
        type: { summary: 'ComponentType<IconProps>' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'Toggle이 ON 상태일 때 표시할 아이콘 컴포넌트입니다.',
    },
    offIcon: {
      control: 'select',
      options: iconOptions,
      table: {
        type: { summary: 'ComponentType<IconProps>' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'Toggle이 OFF 상태일 때 표시할 아이콘 컴포넌트입니다.',
    },
    pressed: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '제어형 Toggle의 현재 상태입니다.',
        'onPressedChange와 함께 사용하여 상태를 외부에서 제어할 수 있습니다.',
      ].join('<br/>'),
    },
    defaultPressed: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '비제어형 Toggle의 초기 상태입니다.',
    },
    onPressedChange: {
      control: false,
      table: {
        type: { summary: '(pressed: boolean) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'Toggle 상태가 변경될 때 호출되는 콜백 함수입니다.',
    },
    pressedRef: {
      table: { disable: true },
      description: '비제어형 Toggle의 현재 상태를 참조할 수 있는 Ref 입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Toggle 컴포넌트는 ON/OFF 상태를 전환할 수 있는 버튼 형태의 UI 요소입니다.',
          '텍스트와 아이콘을 조합하여 다양한 형태로 표시할 수 있습니다.',
          '제어형과 비제어형 모두 지원하며, 상태에 따라 다른 텍스트나 아이콘을 표시할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: ['기본 Toggle 컴포넌트의 예시입니다.', 'children 으로 전달된 텍스트가 표시됩니다.'].join('<br/>'),
      },
    },
  },
  render: (args) => <Toggle {...args} />,
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Toggle 컴포넌트의 다양한 크기별 예시입니다.',
          'small, medium, large 세 가지 크기를 제공하며, 기본값은 small 입니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {sizeOptions.map((size, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div>{size}</div>
          <Toggle {...args} size={size} key={size}>
            {size}
          </Toggle>
        </div>
      ))}
    </div>
  ),
};

type IconKey = keyof typeof ICON_MAP;
type IconStoryProps = Omit<ComponentProps<typeof Toggle>, 'onIcon' | 'offIcon'> & {
  onIcon: IconKey;
  offIcon: IconKey;
};

export const IconAndText: StoryObj<IconStoryProps> = {
  args: {
    onIcon: 'eyeOn',
    offIcon: 'eyeOff',
    onText: 'ON',
    offText: 'OFF',
  },
  argTypes: {
    onIcon: { table: { disable: false } },
    offIcon: { table: { disable: false } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Toggle 컴포넌트에 아이콘과 텍스트를 함께 사용하는 예시입니다.',
          'children 으로 원하는 텍스트를 추가할 수 있습니다.',
        ].join('<br/>'),
      },
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

const ControlledComp = ({ onPressedChange, ...args }: ToggleProps) => {
  const [isPress, setIsPress] = useState(false);
  const pressedRef = useRef(null);

  const logControlledChange = action('제어형 onChange 발생');
  const logUncontrolledConfirm = action('비제어형 확인');

  const controlledHandleChange = (press: boolean) => {
    setIsPress(press);
    logControlledChange(press);
    onPressedChange?.(press); // 스토리북 action 로그용
  };

  const uncontrolledHandleChange = () => {
    logUncontrolledConfirm(pressedRef.current);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">제어형 토글</span>
        <div className="w-3xs">
          <Toggle {...args} pressed={isPress} onPressedChange={controlledHandleChange}>
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
          <Button onClick={uncontrolledHandleChange}>비제어 확인 Click</Button>
        </div>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  argTypes: {
    pressed: { table: { disable: true } },
    defaultPressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    pressedRef: { table: { disable: true } },
    onText: { table: { disable: true } },
    offText: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '제어형(Controlled) Input 사용 예시입니다. 입력값을 상태로 관리합니다.',
          '제어형은 pressed와 onPressedChange를 사용하여 상태를 외부에서 관리합니다.',
          '비제어형은 pressedRef를 사용하여 현재 상태를 참조할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => <ControlledComp {...args} />,
};
