import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect, Button } from '@common/ui';
import { useRef, useState, type ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof MultiSelect> = {
  title: 'UI/MultiSelect',
  component: MultiSelect,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      table: { defaultValue: { summary: 'default' } },
      description: 'MultiSelect 크기',
    },
    width: {
      control: 'select',
      options: ['full'],
      table: { defaultValue: { summary: 'full' } },
      description: 'MultiSelect 너비',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: '비활성화 여부',
    },
    emptyText: {
      description: '옵션이 없을 때 대체 문구',
    },
    isSelectIndicator: {
      control: 'boolean',
      description: '선택 시 체크 표시 여부',
    },
    isContentfitTriggerWidth: {
      control: 'boolean',
      description: '선택된 항목에 따라 트리거 너비 자동 조절',
    },
    error: {
      description: '에러 상태 여부',
    },
    helperText: {
      description: '헬퍼 텍스트',
    },
    selectRef: { table: { disable: true } },
    ref: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const baseOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Disabled Option', value: 'b', disabled: true },
  { label: 'Option C', value: 'c' },
];

export const Default: Story = {
  args: {
    options: baseOptions,
    placeholder: '여러 항목을 선택하세요',
  },
};

export const WithGroupsAndSeparators: Story = {
  args: {
    options: [
      {
        type: 'group',
        label: 'Group 1',
        items: [{ label: 'Item 1', value: 'g1-1' }, { type: 'separator' }, { label: 'Item 2', value: 'g1-2' }],
      },
      { type: 'separator' },
      {
        type: 'group',
        label: 'Group 2',
        items: [
          { label: 'Item A', value: 'g2-a' },
          { label: 'Item B', value: 'g2-b' },
        ],
      },
    ],
    placeholder: '그룹에서 선택',
  },
  render: (args) => (
    <div className="flex flex-col gap-4 h-60">
      <MultiSelect {...args} />
    </div>
  ),
};

export const FixedWidth: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <MultiSelect {...args} width={300} placeholder="고정 너비 300px" />
    </div>
  ),
  args: {
    options: baseOptions,
  },
};

export const ResponsiveWidths: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-sm">반응형 너비: full </p>
      <MultiSelect {...args} width="full" placeholder="Full 너비" />
    </div>
  ),
  args: {
    options: baseOptions,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-60">
      <MultiSelect {...args} size="small" placeholder="Small" />
      <MultiSelect {...args} size="default" placeholder="Default" />
      <MultiSelect {...args} size="large" placeholder="Large" />
    </div>
  ),
  args: {
    options: baseOptions,
  },
};

export const ScrollItems: Story = {
  args: {
    options: Array.from({ length: 100 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `opt-${i + 1}`,
    })),
  },
  render: (args) => (
    <div className="h-[400px] overflow-auto">
      <MultiSelect {...args} />
    </div>
  ),
};

const longLabelOptions = [
  { label: 'Option A-------Option A------Option A------Option A------', value: 'a' },
  { label: 'Option B', value: 'b', disabled: true },
  { label: 'Option C', value: 'c' },
];

export const WithContentfitTriggerWidth: Story = {
  args: {
    options: longLabelOptions,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-sm">선택상자 부모(trigger) 넓이 고정</p>
      <MultiSelect {...args} width={300} isContentfitTriggerWidth placeholder="Trigger 고정" />
      <p className="font-bold text-sm">선택상자 옵션들의 최대길이에 맞춤(Default)</p>
      <MultiSelect {...args} width={300} placeholder="옵션 길이 고정" />
    </div>
  ),
};

export const WithErrorAndHelperText: Story = {
  args: {
    options: baseOptions,
    placeholder: '항목을 선택하세요',
    error: true,
    helperText: '필수 항목입니다.',
  },
};

export const WithIsLeaveClose: Story = {
  args: {
    options: baseOptions,
    placeholder: '마우스가 떠나면 닫힘 여부',
    isLeaveClose: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold">기본값 (isLeaveClose: true)</p>
      <p className="text-xs text-gray-500">마우스가 Popover 바깥으로 나가면 자동으로 닫힙니다.</p>
      <MultiSelect {...args} />

      <p className="text-sm">isLeaveClose: false (떠나도 닫히지 않음)</p>
      <p className="text-xs text-gray-500">마우스가 Popover 바깥으로 나가도 닫히지 않습니다.</p>
      <MultiSelect {...args} isLeaveClose={false} />
    </div>
  ),
};

export const WithIsAddNewItem: Story = {
  args: {
    options: baseOptions,
    placeholder: '엔터로 새로운 항목 추가',
    isAddNewItem: true,
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">새로운 값을 입력하고 Enter를 누르면 추가됩니다.</p>
        <MultiSelect
          {...args}
          onValueChange={(v) => {
            action('추가된 값')(v);
          }}
        />
      </div>
    );
  },
};

const ControlledComponent = ({ onValueChange, ...args }: ComponentProps<typeof MultiSelect>) => {
  const [value, setValue] = useState<string[]>(['a']);
  const selectRef = useRef<string[] | null>(null);

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
    action('제어형 선택값 변경')(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-bold text-sm">제어형 MultiSelect</p>
        <MultiSelect {...args} value={value} onValueChange={handleChange} />
      </div>

      <hr />

      <div>
        <p className="font-bold text-sm">비제어형 MultiSelect</p>
        <div className="flex items-center gap-4">
          <MultiSelect {...args} selectRef={selectRef} />
          <Button
            size="small"
            onClick={() => {
              action('비제어형 선택값 확인')(selectRef.current);
            }}>
            선택값 확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ControlledAndUncontrolled: Story = {
  args: {
    placeholder: '옵션을 선택하세요',
    options: baseOptions,
  },
  render: (args) => <ControlledComponent {...args} />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '제어형과 비제어형 MultiSelect 비교 예시입니다.',
      },
    },
  },
};
