import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, RadioGroup } from '@common/ui';
import { type ComponentProps, useRef, useState } from 'react';

// 공통 상수
const directionOptions = ['vertical', 'horizontal'] as const;
const defaultOptions = [
  { label: '옵션 A', value: 'A' },
  { label: '옵션 B', value: 'B' },
  { label: '옵션 C', value: 'C' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/Form/Input/RadioGroup',
  component: RadioGroup,
  args: {
    options: defaultOptions,
    direction: 'vertical',
    defaultValue: undefined,
    value: undefined,
    onValueChange: undefined,
    className: undefined,
    itemClassName: undefined,
    labelClassName: undefined,
    valueRef: undefined,
  },
  argTypes: {
    options: {
      control: 'object',
      table: {
        type: { summary: 'Array<{ label: string; value: string }>' },
      },
      description: ['라디오 버튼 항목 배열입니다.', '각 항목은 label과 value로 구성됩니다.'].join('<br/>'),
    },
    direction: {
      control: 'inline-radio',
      options: directionOptions,
      table: {
        type: { summary: directionOptions.join(' | ') },
        defaultValue: { summary: 'vertical' },
      },
      description: ['라디오 버튼의 배치 방향을 설정합니다.', 'vertical: 세로 정렬, horizontal: 가로 정렬'].join(
        '<br/>',
      ),
    },
    defaultValue: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '비제어형 RadioGroup의 초기 선택값입니다.',
    },
    value: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '제어형 RadioGroup의 현재 선택값입니다.',
        'onValueChange와 함께 사용하여 상태를 외부에서 제어할 수 있습니다.',
      ].join('<br/>'),
    },
    onValueChange: {
      table: { disable: true },
      description: '값이 변경될 때 호출되는 콜백 함수입니다.',
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'RadioGroup 전체에 적용할 CSS 클래스를 설정합니다.',
    },
    itemClassName: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '개별 라디오 버튼 indicator에 적용할 CSS 클래스를 설정합니다.',
    },
    labelClassName: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '라디오 버튼 라벨에 적용할 CSS 클래스를 설정합니다.',
    },
    valueRef: {
      table: { disable: true },
      description: '비제어형 RadioGroup의 현재 값을 참조할 수 있는 Ref 입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'RadioGroup 컴포넌트는 여러 옵션 중 하나를 선택할 수 있는 라디오 버튼 그룹입니다.',
          '세로 또는 가로 방향으로 배치할 수 있으며, 제어형과 비제어형 모두 지원합니다.',
          '각 라디오 버튼과 라벨의 스타일링을 개별적으로 커스터마이징할 수 있습니다.',
          'Radix UI의 RadioGroup 컴포넌트를 기반으로 구현되었습니다.',
        ].join('<br/>'),
      },
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
        story: ['기본 RadioGroup 컴포넌트의 예시입니다.'].join('<br/>'),
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
        story: [
          '라디오 버튼의 배치 방향을 보여주는 예시입니다.',
          '가로 방향으로 배치된 RadioGroup을 확인할 수 있습니다.',
        ].join('<br/>'),
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
    className: { control: 'text', disable: false },
    itemClassName: { control: 'text', disable: false },
    labelClassName: { control: 'text' },
    options: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['CSS 클래스를 통해 외부 스타일을 적용한 예시입니다.'].join('<br/>'),
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
    onValueChange: { table: { disable: true } },
    valueRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '제어형과 비제어형 RadioGroup 사용 예시입니다.',
          '제어형은 value와 onValueChange를 사용하여 상태를 통해 값을 직접 외부에서 관리합니다.',
          '비제어형은 valueRef를 사용하여 현재 값을 참조할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => <ControlComp {...args} />,
};
