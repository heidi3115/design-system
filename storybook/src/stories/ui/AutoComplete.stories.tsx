// AutoComplete.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { AutoComplete, Button } from '@common/ui';
import { useRef, useState, type ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AutoComplete> = {
  title: 'UI/AutoComplete',
  component: AutoComplete,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      table: { defaultValue: { summary: 'default' } },
      description: 'AutoComplete 크기',
    },
    width: {
      control: 'select',
      options: ['full'],
      table: { defaultValue: { summary: 'full' } },
      description: 'AutoComplete 너비(input의 특성상 fit하게 조절할 수 없음)',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: 'AutoComplete 비활성화',
    },
    emptyText: {
      description: 'AutoComplete options 없을때, 대체 문구',
    },
    isSelectIndicator: {
      control: 'boolean',
      description: '선택 시 우측 체크 아이콘 표시 여부',
    },
    isContentfitTriggerWidth: {
      control: 'boolean',
      description: '선택된 항목 길이에 따라 trigger 버튼의 너비 조절',
    },
    isLeaveClose: {
      description: '마우스가 벗어나면 리스트가 닫힘 여부',
    },
    error: {
      description: 'form 에러 여부',
    },
    helperText: {
      description: 'AutoComplete 아래 문구',
    },
    selectRef: { table: { disable: true } },
    ref: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

const baseOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Disabled', value: 'b', disabled: true },
  { label: 'Option C', value: 'c' },
];

export const Default: Story = {
  args: {
    options: baseOptions,
    placeholder: '선택해주세요.',
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
    placeholder: 'Select from group',
  },
  render: (args) => (
    <div className="flex flex-col gap-4 h-60">
      <AutoComplete {...args} />
    </div>
  ),
};

export const FixedWidth: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-60">
      <p className="font-bold text-sm">고정 너비 200px</p>
      <AutoComplete {...args} width={200} placeholder="200px" />

      <p className="font-bold text-sm">고정 너비 400px</p>
      <AutoComplete {...args} width={400} placeholder="400px" />

      <p className="font-bold text-sm">고정 너비 600px</p>
      <AutoComplete {...args} width={600} placeholder="600px" />
    </div>
  ),
  args: {
    options: baseOptions,
  },
  argTypes: {
    width: {
      table: { disable: true },
    },
  },
};

export const ResponsiveWidths: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-sm">반응형 너비: full </p>
      <AutoComplete {...args} width="full" placeholder="Full" />
    </div>
  ),
  args: {
    options: baseOptions,
  },
  argTypes: {
    width: {
      table: { disable: true },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-60">
      <p className="font-bold text-sm">Size: small(height: 28px)</p>
      <AutoComplete {...args} size="small" placeholder="Small" />

      <p className="font-bold text-sm">Size: default(height: 32px)</p>
      <AutoComplete {...args} size="default" placeholder="Default" />

      <p className="font-bold text-sm">Size: large(height: 36px)</p>
      <AutoComplete {...args} size="large" placeholder="Large" />
    </div>
  ),
  args: {
    options: baseOptions,
  },
  argTypes: {
    width: {
      table: { disable: true },
    },
  },
};

export const WithSelectIndicator: Story = {
  args: {
    ...Default.args,
    defaultValue: 'a',
    isSelectIndicator: true,
    options: baseOptions,
  },
  argTypes: {
    isSelectIndicator: {
      table: { disable: true },
    },
  },
  render: (args) => (
    <div className="flex gap-4 h-36">
      <AutoComplete {...args} width={350} isSelectIndicator defaultValue="a" />
      <p className="w-fit">클릭 시 오른쪽 체크 표시</p>
    </div>
  ),
};

const longBaseOptions = Array.from({ length: 100 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `opt-${i + 1}`,
}));

export const ScrollItems: Story = {
  args: {
    options: longBaseOptions,
    open: true,
  },
  render: (args) => (
    <div className="flex gap-4 h-[500px]">
      <AutoComplete {...args} />
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
      <AutoComplete {...args} width={300} isContentfitTriggerWidth placeholder="Trigger 고정" />
      <p className="font-bold text-sm">선택상자 옵션들의 최대길이에 맞춤(Default)</p>
      <AutoComplete {...args} width={300} placeholder="옵션 길이 고정" />
    </div>
  ),
};

export const WithErrorAndHelperText: Story = {
  args: {
    options: baseOptions,
    placeholder: '옵션을 선택하세요',
    error: true,
    helperText: '필수 항목입니다.',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <AutoComplete {...args} />
    </div>
  ),
};

export const WithIsLeaveClose: Story = {
  args: {
    options: baseOptions,
    placeholder: '마우스를 벗어나면 닫힘 여부',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold">기본값 (isLeaveClose: false)</p>
      <p className="text-xs text-gray-500">마우스가 Popover 바깥으로 나가도 닫히지 않습니다.</p>
      <AutoComplete {...args} />

      <p className="text-sm font-bold mt-4">isLeaveClose: true</p>
      <p className="text-xs text-gray-500">마우스가 Popover 바깥으로 나가면 자동으로 닫힙니다.</p>
      <AutoComplete {...args} isLeaveClose={true} />
    </div>
  ),
};

const controlledOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
  { label: 'Option D', value: 'd' },
  { label: 'Option E', value: 'e' },
  { label: 'Option F', value: 'f' },
];

const ControllComp = ({ onValueChange, ...args }: ComponentProps<typeof AutoComplete>) => {
  const [value, setValue] = useState('');
  const ref = useRef<string | null>(null);

  const logControlledChange = action('제어형 onValueChange 발생');
  const logUncontrolledCheck = action('비제어형 선택값 확인');

  const handleControlledChange = (val: string) => {
    setValue(val);
    logControlledChange(val);
    onValueChange?.(val);
  };

  const handleUncontrolledCheck = () => {
    logUncontrolledCheck(ref.current);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-sm font-bold">제어형 AutoComplete</span>
        <div className="w-3xs mt-2">
          <AutoComplete {...args} value={value} onValueChange={handleControlledChange} options={controlledOptions} />
        </div>
      </div>

      <hr />

      <div>
        <span className="text-sm font-bold">비제어형 AutoComplete</span>
        <div className="w-3xs mt-2 flex gap-2 items-center">
          <AutoComplete {...args} selectRef={ref} options={controlledOptions} />
          <Button onClick={handleUncontrolledCheck} style={{ fontSize: 12, padding: '4px 8px' }}>
            선택값 확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ControlledAndUncontrolled: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => <ControllComp {...args} />,
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story: '제어형과 비제어형 AutoComplete를 비교하는 스토리입니다.',
      },
    },
  },
};
