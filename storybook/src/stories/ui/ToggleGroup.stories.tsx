import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, ToggleGroup } from '@common/ui';
import { useRef, useState, type ComponentProps } from 'react';
import { MinusIcon, PlusIcon } from '@common/ui/icons';
import MultipleToggleGroup from '@common/ui/components/ToggleGroup/MultipleToggleGroup.tsx';
import SingleToggleGroup from '@common/ui/components/ToggleGroup/SingleToggleGroup.tsx';

const meta: Meta<typeof ToggleGroup> = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    type: {
      control: 'radio',
      description: 'Toggle Group의 type을 설정할 수 있다. single, multiple로 구분된다.',
    },
    options: {
      control: 'object',
      description:
        'Toggle Group의 각 항목은 label과 value로 구성되고, 필요에 따라 icon을 추가할 수 있다. icon은 JSX가 아닌 React 컴포넌트 그 자체 (ElementType)로 추가한다.',
    },
    defaultValue: {
      control: 'text',
      description: '초기 선택값(uncontrolled).',
    },
    disabled: {
      control: 'boolean',
      description: 'Toggle Group 활성화 여부',
    },
    value: {
      control: 'text',
      description: '선택된 값(controlled).',
    },
    onValueChange: {
      description: '값이 변경될 때 호출되는 콜백함수',
      table: { disable: true },
    },
    size: {
      description: 'Toggle의 전체 크기를 선택할 수 있다.',
    },
    className: {
      control: {
        type: 'text',
        disable: true,
      },
      description: '전체 className 설정',
    },
    itemClassName: {
      control: {
        type: 'text',
        disable: true,
      },
      description: 'Toggle Group의 하위 아이템 className 설정',
    },
    valueRef: {
      table: { disable: true },
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    options: [
      { label: 'OR', value: 'or' },
      { label: 'AND', value: 'and' },
    ],
    size: 'small',
    type: 'single',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Toggle Group 예시',
      },
    },
  },
};
export const Type: Story = {
  parameters: {
    docs: {
      description: {
        story: 'single, multiple 중 타입을 선택할 수 있다.',
      },
    },
  },
  args: {
    options: [
      { label: 'OR', value: 'or' },
      { label: 'AND', value: 'and' },
    ],
    size: 'small',
    type: 'single',
  },
  argTypes: {
    type: { table: { disable: true }, control: false },
    size: { table: { disable: true }, control: false },
    className: { table: { disable: true }, control: false },
    itemClassName: { table: { disable: true }, control: false },
  },
  render: () => (
    <div className="flex gap-3">
      <div className="p-2 flex flex-col gap-2">
        <span>Multiple</span>
        <MultipleToggleGroup
          options={[
            { label: 'OR', value: 'or', icon: PlusIcon },
            { label: 'AND', value: 'and', icon: MinusIcon },
          ]}
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <span>Single</span>
        <SingleToggleGroup
          options={[
            { label: 'OR', value: 'or', icon: PlusIcon },
            { label: 'AND', value: 'and', icon: MinusIcon },
          ]}
        />
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    options: [
      { label: 'OR', value: 'or', icon: PlusIcon },
      { label: 'AND', value: 'and', icon: MinusIcon },
    ],
    size: 'small',
    type: 'single',
  },
  argTypes: {
    options: {
      control: false,
    },
  },
};

export const Size: Story = {
  args: {
    options: [
      { label: 'OR', value: 'or' },
      { label: 'AND', value: 'and' },
    ],
    size: 'small',
    type: 'single',
  },
  parameters: {
    docs: {
      description: {
        story: '사이즈 별 예시를 확인하고 선택할 수 있다.',
      },
    },
  },
};

export const CustomClass: Story = {
  args: {
    options: [
      { label: 'OR', value: 'or' },
      { label: 'AND', value: 'and' },
    ],
    defaultValue: 'or',
    size: 'small',
    type: 'single',
    className: 'flex gap-2',
    itemClassName: 'data-[state=checked]:border-juiPrimary bg-juiPrimary rounded-none',
  },
  argTypes: {
    itemClassName: {
      control: {
        type: 'text',
        disable: false,
      },
    },
    className: {
      control: {
        type: 'text',
        disable: false,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '외부 className 스타일 적용 예시',
      },
    },
  },
};

const ControlComp = ({ onValueChange, ...args }: ComponentProps<typeof ToggleGroup>) => {
  const [value, setValue] = useState('option-1');
  const toggleGroupRef = useRef(null);

  const logControlledChange = action('제어형 onChange 발생');
  const logUncontrolledConfirm = action('비제어형 확인');

  const controlledHandleChange = (val: string) => {
    setValue(val);
    logControlledChange(val);
    onValueChange?.(val);
  };

  const unControlledHandleConfirm = () => {
    if (toggleGroupRef.current) {
      logUncontrolledConfirm(toggleGroupRef.current);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">제어형 Toggle Group</span>
        <ToggleGroup value={value} onValueChange={controlledHandleChange} {...args} />
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">비제어형 Toggle Group (변경 후 외부 클릭)</span>
        <ToggleGroup valueRef={toggleGroupRef} {...args} />
        <Button onClick={unControlledHandleConfirm}>비제어 확인 Click</Button>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  args: {
    options: [
      { label: 'OR', value: 'or' },
      { label: 'AND', value: 'and' },
    ],
    size: 'small',
    type: 'single',
  },
  argTypes: {
    defaultValue: { control: false, table: { disable: true } },
    value: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: '제어형은 값을 직접 관리하고, 비제어형은 외부에서 값을 받아 처리한다.',
      },
      disable: true,
    },
  },
  render: (args) => <ControlComp {...args} />,
};
