import { Button, Switch } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';

// 공통 상수
const variantOptions = ['primary', 'secondary', 'error'] as const;

const meta: Meta<typeof Switch> = {
  title: 'UI/Form/Input/Switch',
  component: Switch,
  args: {
    disabled: false,
    variant: 'primary',
    defaultChecked: false,
    checked: undefined,
    onCheckedChange: undefined,
    checkedRef: undefined,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'Switch 컴포넌트의 비활성화 상태를 설정합니다.',
    },
    variant: {
      control: 'select',
      options: variantOptions,
      table: {
        type: { summary: variantOptions.join(' | ') },
        defaultValue: { summary: 'primary' },
      },
      description: [
        'Switch 컴포넌트의 색상 변형을 설정합니다.',
        `${variantOptions.join(' | ')} 중에서 선택할 수 있습니다.`,
      ].join('<br/>'),
    },
    defaultChecked: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '비제어형 Switch의 초기 체크 상태입니다.',
    },
    checked: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '제어형 Switch의 현재 체크 상태입니다.',
        'onCheckedChange와 함께 사용하여 상태를 외부에서 제어할 수 있습니다.',
      ].join('<br/>'),
    },
    onCheckedChange: {
      table: { disable: true },
      description: 'Switch 상태가 변경될 때 호출되는 콜백 함수입니다.',
    },
    checkedRef: {
      table: { disable: true },
      description: '비제어형 Switch의 현재 상태를 참조할 수 있는 Ref 입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Switch 컴포넌트는 ON/OFF 상태를 전환할 수 있는 토글 스위치 UI 요소입니다.',
          '다양한 색상 변형(primary, secondary, error)을 지원합니다.',
          '제어형과 비제어형 모두 지원하며, 비활성화 상태로 설정할 수 있습니다.',
          'Radix UI의 Switch 컴포넌트를 기반으로 구현되었습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

type SwitchArgs = ComponentProps<typeof Switch>;

const Template = (args: SwitchArgs) => {
  return (
    <div className="flex gap-2">
      <Switch id="testId" {...args} />
      {/*<label htmlFor="testId">{args.children}</label>*/}
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: ['기본 Switch 컴포넌트의 예시입니다.', '클릭하여 ON/OFF 상태를 전환할 수 있습니다.'].join('<br/>'),
      },
    },
  },
  render: Template,
};

export const Variants: Story = {
  args: {
    defaultChecked: true,
  },
  argTypes: {
    variant: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Switch의 다양한 색상 변형을 보여주는 예시입니다.',
          `${variantOptions.join(' | ')} 중에서 선택할 수 있습니다.`,
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variantOptions.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-sm font-bold capitalize">{variant}</span>
          <Switch {...args} variant={variant} />
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  argTypes: {
    disabled: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Switch의 다양한 상태를 보여주는 예시입니다.',
          '활성화/비활성화, 체크됨/체크안됨 상태를 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm">OFF</span>
          <Switch defaultChecked={false} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">ON</span>
          <Switch defaultChecked={true} />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm">비활성화 (OFF)</span>
          <Switch defaultChecked={false} disabled />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">비활성화 (ON)</span>
          <Switch defaultChecked={true} disabled />
        </div>
      </div>
    </div>
  ),
};

type ControlledComponentProps = ComponentProps<typeof Switch> & {
  onCheckedChange?: (checked: boolean) => void;
};

const ControlledComponent = ({ onCheckedChange, ...args }: ControlledComponentProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkedRef = useRef<boolean>(false);

  const logControlledChange = action('제어형 onChange 발생');
  const logUncontrolledConfirm = action('비제어형 확인');

  const controlledHandleChange = (check: boolean) => {
    setIsChecked(check);
    logControlledChange(check);
    onCheckedChange?.(check);
  };

  const uncontrolledHandleChange = () => {
    logUncontrolledConfirm(checkedRef.current);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">제어형 Switch</span>
        <div className="flex items-center gap-2">
          <Switch {...args} checked={isChecked} onCheckedChange={controlledHandleChange} />
          <span className="text-sm">현재 상태: {isChecked ? 'ON' : 'OFF'}</span>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">비제어형 Switch (변경 후 외부 클릭)</span>
        <div className="flex items-center gap-2">
          <Switch {...args} checkedRef={checkedRef} />
          <Button onClick={uncontrolledHandleChange}>비제어 확인 Click</Button>
        </div>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  argTypes: {
    checked: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
    checkedRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '제어형과 비제어형 Switch 사용 예시입니다.',
          '제어형은 checked와 onCheckedChange를 사용하여 상태를 외부에서 관리합니다.',
          '비제어형은 checkedRef를 사용하여 현재 상태를 참조할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => <ControlledComponent {...args} />,
};

export const Overview: Story = {
  argTypes: {
    disabled: { table: { disable: true } },
    variant: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    checked: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
    checkedRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Switch 컴포넌트의 모든 변형과 상태를 한 눈에 볼 수 있는 개요입니다.',
          '각 변형별로 비활성화/활성화 상태를 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Basic States</h3>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm">OFF</span>
            <Switch defaultChecked={false} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">ON</span>
            <Switch defaultChecked={true} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Color Variants</h3>
        <div className="grid grid-cols-3 gap-4">
          {variantOptions.map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <span className="text-sm font-bold capitalize">{variant}</span>
              <div className="flex gap-2">
                <Switch variant={variant} defaultChecked={false} />
                <Switch variant={variant} defaultChecked={true} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Disabled States</h3>
        <div className="grid grid-cols-3 gap-4">
          {variantOptions.map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <span className="text-sm font-bold capitalize">{variant} (Disabled)</span>
              <div className="flex gap-2">
                <Switch variant={variant} defaultChecked={false} disabled />
                <Switch variant={variant} defaultChecked={true} disabled />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
