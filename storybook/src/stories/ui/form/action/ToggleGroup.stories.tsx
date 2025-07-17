import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, ToggleGroup } from '@common/ui';
import { type ComponentProps, useRef, useState } from 'react';
import { MinusIcon, PlusIcon } from '@common/ui/icons';
import MultipleToggleGroup from '@common/ui/components/ToggleGroup/MultipleToggleGroup.tsx';
import SingleToggleGroup from '@common/ui/components/ToggleGroup/SingleToggleGroup.tsx';

// 공통 상수
const typeOptions = ['single', 'multiple'] as const;
const sizeOptions = ['small', 'medium', 'large'] as const;

const defaultOptions = [
  { label: 'OR', value: 'or' },
  { label: 'AND', value: 'and' },
];

const iconOptions = [
  { label: 'OR', value: 'or', icon: PlusIcon },
  { label: 'AND', value: 'and', icon: MinusIcon },
];

const meta: Meta<typeof ToggleGroup> = {
  title: 'UI/Form/Action/ToggleGroup',
  component: ToggleGroup,
  args: {
    type: 'single',
    options: defaultOptions,
    size: 'small',
    disabled: false,
    defaultValue: undefined,
    value: undefined,
    onValueChange: undefined,
    valueRef: undefined,
    className: undefined,
    itemClassName: undefined,
  },
  argTypes: {
    type: {
      control: 'select',
      options: typeOptions,
      table: {
        type: { summary: typeOptions.join(' | ') },
        defaultValue: { summary: 'single' },
      },
      description: ['ToggleGroup의 type을 설정합니다.', 'single: 하나만 선택 가능, multiple: 여러 개 선택 가능'].join(
        '<br/>',
      ),
    },
    options: {
      control: 'object',
      table: {
        type: { summary: 'Array<{label?: string; value: string; icon?: ElementType}>' },
        defaultValue: { summary: '[]' },
      },
      description: [
        'ToggleGroup의 각 항목을 정의합니다.',
        '각 항목은 label: 표시할 텍스트, value: 값, icon: 아이콘 컴포넌트 로 구성되어 있습니다.',
        '필요에 따라 icon을 추가할 수 있으며, icon은 JSX가 아닌 React 컴포넌트 타입(ElementType)으로 전달해야 합니다.',
      ].join('<br/>'),
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(' | ') },
        defaultValue: { summary: 'small' },
      },
      description: ['ToggleGroup의 전체 크기를 설정합니다.', 'small, medium, large 중에서 선택할 수 있습니다.'].join(
        '<br/>',
      ),
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'ToggleGroup의 비활성화 상태를 설정합니다.',
    },
    defaultValue: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '비제어형(uncontrolled) ToggleGroup의 초기 선택값 입니다.',
    },
    value: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '제어형(controlled) ToggleGroup의 선택된 값 입니다.',
        'onValueChange와 함께 사용하여 상태를 외부에서 제어할 수 있습니다.',
      ].join('<br/>'),
    },
    onValueChange: {
      control: false,
      table: {
        type: { summary: '(value: string) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: '값이 변경될 때 호출되는 콜백 함수입니다.',
    },
    valueRef: {
      table: { disable: true },
      description: '비제어형 ToggleGroup의 현재 값을 참조할 수 있는 Ref 입니다.',
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'ToggleGroup 전체에 적용할 CSS 클래스명입니다.',
    },
    itemClassName: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'ToggleGroup의 각 항목에 적용할 CSS 클래스명입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'ToggleGroup 컴포넌트는 여러 개의 Toggle 버튼을 그룹화하여 관리하는 컴포넌트입니다.',
          'single 타입은 하나의 항목만 선택 가능하고, multiple 타입은 여러 항목을 선택할 수 있습니다.',
          '각 항목은 텍스트와 아이콘을 조합하여 표시할 수 있습니다.',
          '제어형과 비제어형 모두 지원합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: ['기본 ToggleGroup 컴포넌트의 예시입니다.'].join('<br/>'),
      },
    },
  },
};
export const Type: Story = {
  argTypes: {
    type: { table: { disable: true } },
    size: { table: { disable: true } },
    className: { table: { disable: true } },
    itemClassName: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'ToggleGroup의 타입별 예시입니다.',
          'single 타입은 하나만 선택 가능하고, multiple 타입은 여러 개 선택 가능합니다.',
        ].join('<br/>'),
      },
    },
  },
  render: () => (
    <div className="flex gap-3">
      <div className="p-2 flex flex-col gap-2">
        <span>Single Type</span>
        <SingleToggleGroup options={iconOptions} />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <span>Multiple Type</span>
        <MultipleToggleGroup options={iconOptions} />
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    options: iconOptions,
  },
  argTypes: {
    options: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'ToggleGroup에 아이콘을 추가한 예시입니다.',
          '각 항목에 icon 속성을 추가하여 아이콘을 표시할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const Size: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['ToggleGroup의 다양한 크기별 예시입니다.', 'small, medium, large 크기를 선택할 수 있습니다.'].join(
          '<br/>',
        ),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizeOptions.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-sm font-bold">{size}</span>
          <ToggleGroup {...args} size={size} />
        </div>
      ))}
    </div>
  ),
};

export const CustomClass: Story = {
  args: {
    defaultValue: 'or',
    className: 'flex gap-2',
    itemClassName: 'data-[state=checked]:border-juiPrimary bg-juiPrimary rounded-none',
  },
  argTypes: {
    className: { control: { type: 'text', disable: false } },
    itemClassName: { control: { type: 'text', disable: false } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'ToggleGroup에 커스텀 CSS 클래스를 적용한 예시입니다.',
          'className 으로 전체 스타일을, itemClassName 으로 각 항목의 스타일을 변경할 수 있습니다.',
        ].join('<br/>'),
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
        story: [
          '제어형과 비제어형 ToggleGroup 사용 예시입니다.',
          '제어형은 value와 onValueChange를 사용하여 상태를 외부에서 직접 관리합니다.',
          '비제어형은 valueRef를 사용하여 현재 값을 참조해서 외부에서 값을 받아 처리할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => <ControlComp {...args} />,
};
