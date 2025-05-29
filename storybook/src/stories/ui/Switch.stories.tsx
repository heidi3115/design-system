import { Button, Switch } from '@common/ui/components';
import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  argTypes: {
    children: { control: 'text', description: '텍스트' },
    checkedRef: {
      table: { disable: true },
    },
  },
  args: {
    disabled: false,
    children: 'Switch on/off',
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;
type SwitchArgs = ComponentProps<typeof Switch>;

const Template = (args: SwitchArgs) => {
  return (
    <div className="flex gap-2">
      <Switch id="testId" {...args} />
      <label htmlFor="testId">{args.children}</label>
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

export const Controlled: Story = {
  args: {},
  argTypes: {
    children: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '',
      },
      disable: true,
    },
  },
  render: ({ ...args }) => {
    const [isPress, setIsPress] = useState(false);
    const checkedRef = useRef(null);

    const logControlledChange = action('제어형 onChange 발생');
    const logUncontrolledConfirm = action('비제어형 확인');

    const controlledhandleChange = (press: boolean) => {
      setIsPress(press);
      logControlledChange(press);
      // checkedRef?.(press);
    };

    const unControlledhandleChange = () => {
      logUncontrolledConfirm(checkedRef.current);
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">제어형 Switch</span>
          <div className="w-3xs">
            <Switch {...args} checked={isPress} onCheckedChange={controlledhandleChange}>
              제어
            </Switch>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">비제어형 Switch(변경 후 외부 클릭)</span>
          <div className="w-3xs flex gap-2">
            {/*<Switch {...args} checkedRef={checkedRef}>*/}
            {/*  비제어*/}
            {/*</Switch>*/}
            <Button onClick={unControlledhandleChange}>비제어 확인 Click</Button>
          </div>
        </div>
      </div>
    );
  },
};
