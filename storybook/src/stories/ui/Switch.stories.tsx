import { Button, Switch } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { switchVariants } from '@common/ui/components/Switch/Switch.tsx';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    controls: {
      exclude: ['defaultChecked'],
    },
  },
  argTypes: {
    checkedRef: {
      table: { disable: true },
    },
    disabled: {
      description: '비활성 여부',
    },
    variant: {
      control: 'radio',
      options: Object.keys(switchVariants.variants.variant),
      description: '스위치 색상 변경',
    },
  },
  args: {
    disabled: false,
    variant: 'primary',
    defaultChecked: true,
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
        story: 'Switch 기본 컴포넌트',
      },
    },
  },
  render: Template,
};

export const Variant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'variant 값에 따른 스타일 변경 예시',
      },
    },
    controls: {
      exclude: ['variant'],
    },
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-5 w-60 justify-between font-bold text-sm">
        <div className="flex flex-col gap-2">
          <span>Primary</span>
          <Switch {...args} variant="primary" />
        </div>
        <div className="flex flex-col gap-2">
          <span>Secondary</span>
          <Switch {...args} variant="secondary" />
        </div>
        <div className="flex flex-col gap-2">
          <span>Error</span>
          <Switch {...args} variant="error" />
        </div>
      </div>
    );
  },
};

type ControlledComponentProps = {
  onCheckedChange?: (checked: boolean) => void;
};

const ControlledComponent = ({ onCheckedChange, ...args }: ControlledComponentProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkedRef = useRef(null);

  const logControlledChange = action('제어형 onChange 발생');
  const logUncontrolledConfirm = action('비제어형 확인');

  const controlledhandleChange = (check: boolean) => {
    setIsChecked(check);
    logControlledChange(check);
    onCheckedChange?.(check);
  };

  const unControlledhandleChange = () => {
    logUncontrolledConfirm(checkedRef.current);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">제어형</span>
        <div className="w-3xs">
          <Switch {...args} checked={isChecked} onCheckedChange={controlledhandleChange}>
            제어
          </Switch>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">비제어형</span>
        <div className="w-3xs flex gap-2">
          <Switch {...args} checkedRef={checkedRef}>
            비제어
          </Switch>
          <Button onClick={unControlledhandleChange}>비제어 확인</Button>
        </div>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  argTypes: {},
  args: {},
  parameters: {
    docs: {
      description: {
        story: '제어형(Controlled) 사용 예시',
      },
      disable: true,
    },
  },
  render: (args) => <ControlledComponent {...args} />,
};
