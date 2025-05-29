import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RadioGroup, Button } from '@common/ui';
import { useRef, useState, type ComponentProps } from 'react';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  argTypes: {
    options: {
      control: 'object',
      description: '라디오 버튼 항목 배열입니다. 각 항목은 label과 value로 구성됩니다.',
    },
    direction: {
      control: {
        type: 'inline-radio',
        options: ['vertical', 'horizontal'],
      },
      description: '라디오 버튼의 배치 방향입니다.',
    },
    defaultValue: {
      control: 'text',
      description: '초기 선택값입니다 (uncontrolled).',
    },
    value: {
      control: 'text',
      description: '선택된 값입니다 (controlled).',
    },
    onValueChange: {
      description: '값이 변경될 때 호출되는 콜백입니다.',
      table: { disable: true },
    },
    className: {
      control: {
        type: 'text',
        disable: true,
      },
      description: 'radio group 전체의 클래스네임을 설정할 수 있습니다.',
    },
    itemClassName: {
      control: {
        type: 'text',
        disable: true,
      },
      description: 'indecator의 클래스네임을 설정할 수 있습니다.',
    },
    labelClassName: {
      control: {
        type: 'text',
        disable: true,
      },
      description: 'label의 클래스네임을 설정할 수 있습니다.',
    },
    valueRef: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    options: [
      { label: '옵션 A', value: 'A' },
      { label: '옵션 B', value: 'B' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '기본 RadioGroup 예시입니다.',
      },
    },
  },
};

export const Horizontal: Story = {
  args: {
    options: [
      { label: '왼쪽', value: 'left' },
      { label: '오른쪽', value: 'right' },
    ],
    direction: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: '가로 방향으로 배치된 라디오 그룹입니다.',
      },
    },
  },
};

export const CustomClass: Story = {
  args: {
    options: [
      { label: '긴 텍스트 1', value: 'long1' },
      { label: '긴 텍스트 2', value: 'long2' },
    ],
    defaultValue: 'long1',
    className: 'gap-10',
    itemClassName: 'data-[state=checked]:border-juiSecondary bg-juiText-purple',
    labelClassName: 'peer-data-[state=checked]:text-juiError',
  },
  argTypes: {
    itemClassName: {
      control: {
        type: 'text',
        disable: false,
      },
    },
    labelClassName: {
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
        story: 'className을 통해 외부 스타일을 적용한 예시입니다.',
      },
    },
  },
};

const ControlComp = ({ onValueChange, ...args }: ComponentProps<typeof RadioGroup>) => {
  const [value, setValue] = useState('option-1');
  const radioRef = useRef(null);

  const logControlledChange = action('제어형 onChange 발생');
  const logUncontrolledConfirm = action('비제어형 확인');

  const controlledHandleChange = (val: string) => {
    setValue(val);
    logControlledChange(val);
    onValueChange?.(val);
  };

  const unControlledHandleConfirm = () => {
    if (radioRef.current) {
      logUncontrolledConfirm(radioRef.current);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">제어형 라디오 그룹</span>
        <RadioGroup value={value} onValueChange={controlledHandleChange} {...args} />
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">비제어형 라디오 그룹 (변경 후 외부 클릭)</span>
        <RadioGroup valueRef={radioRef} {...args} />
        <Button onClick={unControlledHandleConfirm}>비제어 확인 Click</Button>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  args: {
    options: [
      { label: '긴 텍스트 1', value: 'long1' },
      { label: '긴 텍스트 2', value: 'long2' },
    ],
  },
  argTypes: {
    direction: { control: false, table: { disable: true } },
    defaultValue: { control: false, table: { disable: true } },
    value: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: '제어형과 비제어형 라디오 그룹 예시입니다. 제어형은 상태를 통해 값을 직접 관리합니다.',
      },
      disable: true,
    },
  },
  render: (args) => <ControlComp {...args} />,
};
