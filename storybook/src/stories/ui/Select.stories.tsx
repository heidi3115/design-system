import type { Meta, StoryObj } from '@storybook/react';
import { Button, Select } from '@common/ui';
import { useRef, useState, type ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      table: { defaultValue: { summary: 'default' } },
      description: 'Select의 크기 (small | default | large)',
    },
    width: {
      control: 'select',
      options: ['full', 'fit'],
      table: { defaultValue: { summary: 'full' } },
      description: 'Select의 너비 설정 (full: 부모 너비에 맞춤, fit: 내용에 맞춤)',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: 'Select 비활성화',
    },
    isSelectIndicator: {
      control: 'boolean',
      description: '선택 시 우측 체크 아이콘 표시 여부',
    },
    isContentfitTriggerWidth: {
      control: 'boolean',
      description: '선택된 항목의 길이에 따라 trigger 버튼의 너비를 조절',
    },
    error: {
      description: 'form 에러 여부',
    },
    helperText: {
      description: 'Select 아래 문구',
    },
    selectRef: {
      table: { disable: true },
    },
    ref: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

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

const groupedOptions: ComponentProps<typeof Select>['options'] = [
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
];

export const WithGroupsAndSeparators: Story = {
  args: {
    options: groupedOptions,
    placeholder: 'Select from group',
  },
  render: (args) => (
    <div className="flex flex-col gap-4 h-60">
      <Select {...args} />
    </div>
  ),
};

export const FixedWidth: Story = {
  args: {
    options: baseOptions,
  },
  argTypes: {
    width: {
      table: { disable: true },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-60">
      <p className="font-bold text-sm">고정 너비 200px</p>
      <Select {...args} width={200} placeholder="200px" />

      <p className="font-bold text-sm">고정 너비 400px</p>
      <Select {...args} width={400} placeholder="400px" />

      <p className="font-bold text-sm">고정 너비 600px</p>
      <Select {...args} width={600} placeholder="600px" />
    </div>
  ),
};

export const ResponsiveWidths: Story = {
  argTypes: {
    width: {
      table: { disable: true },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-sm">반응형 너비: fit </p>
      <Select {...args} width="fit" placeholder="Fit" />

      <p className="font-bold text-sm">반응형 너비: full </p>
      <Select {...args} width="full" placeholder="Full" />
    </div>
  ),
  args: {
    options: baseOptions,
  },
};

export const Sizes: Story = {
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-60">
      <p className="font-bold text-sm">Size: small(height: 28px)</p>
      <Select {...args} size="small" placeholder="Small" />

      <p className="font-bold text-sm">Size: default(height: 32px)</p>
      <Select {...args} size="default" placeholder="Default" />

      <p className="font-bold text-sm">Size: large(height: 36px)</p>
      <Select {...args} size="large" placeholder="Large" />
    </div>
  ),
  args: {
    options: baseOptions,
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
  render: (args) => {
    return (
      <div className="flex gap-4 h-36">
        <Select {...args} width={350} isSelectIndicator defaultValue="a" />
        <p className="w-fit">클릭 시 오른쪽 체크 표시</p>
      </div>
    );
  },
};

const longBaseOptions = Array.from({ length: 100 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `opt-${i + 1}`,
}));

export const ScrollItems: Story = {
  args: {
    options: longBaseOptions,
  },
  render: (args) => {
    return (
      <div className="flex gap-4 h-[500px]">
        <Select {...args} />
      </div>
    );
  },
};

const longLabelOptions = [
  { label: 'Option A-------Option A------Option A------Option A------Option A------Option A------', value: 'a' },
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
      <Select {...args} width={300} isContentfitTriggerWidth placeholder="선택상자 trigger에 고정" />
      <p className="font-bold text-sm">선택상자 옵션들의 최대길이에 맞춤(Default)</p>
      <Select {...args} width={300} placeholder="선택상자 옵션의 길이에 맞춤" />
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
      <Select {...args} />
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

const ControllComp = ({ onValueChange, ...args }: ComponentProps<typeof Select>) => {
  const [value, setValue] = useState('');
  const ref = useRef<string | null>('2');

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
        <span className="text-sm font-bold">제어형 Select</span>
        <div className="w-3xs mt-2">
          <Select {...args} value={value} onValueChange={handleControlledChange} options={controlledOptions} />
        </div>
      </div>

      <hr />

      <div>
        <span className="text-sm font-bold">비제어형 Select</span>
        <div className="w-3xs mt-2 flex gap-2 items-center">
          <Select {...args} selectRef={ref} options={controlledOptions} />
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
        story:
          '제어형과 비제어형 Select 컴포넌트를 함께 보여주는 예제입니다.\n\n' +
          '각 방식의 차이와 동작 방식을 쉽게 비교할 수 있습니다.',
      },
    },
  },
};
