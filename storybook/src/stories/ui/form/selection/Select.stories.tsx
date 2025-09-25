import type { Meta, StoryObj } from '@storybook/react';
import { Button, Select } from '@common/ui';
import { type ComponentProps, useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';

// 공통 상수
const sizeOptions = ['small', 'default', 'large'] as const;
const widthOptions = ['full', 'fit'] as const;

const meta: Meta<typeof Select> = {
  title: 'UI/Form/Selection/Select',
  component: Select,
  args: {
    size: 'default',
    width: 'full',
    disabled: false,
    placeholder: '선택해주세요',
    isSelectIndicator: false,
    isContentFitTriggerWidth: false,
    error: false,
    helperText: '',
    options: [],
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(', ') },
        defaultValue: { summary: 'default' },
      },
      description: ['Select 컴포넌트의 크기를 설정합니다.', '기본값은 default 입니다.'].join('<br/>'),
    },
    width: {
      control: 'select',
      options: widthOptions,
      table: {
        type: { summary: widthOptions.join(', ') + ' | number' },
        defaultValue: { summary: 'full' },
      },
      description: [
        'Select 컴포넌트의 너비를 설정합니다.',
        'full(부모 너비에 맞춤), fit(내용에 맞춤) 또는 숫자(px 단위)를 사용할 수 있습니다.',
        '기본값은 full 입니다.',
      ].join('<br/>'),
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'Select 컴포넌트의 비활성화 상태를 설정합니다.',
    },
    placeholder: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      description: 'Select 의 trigger 에 표시될 placeholder 텍스트를 설정합니다.',
    },
    isSelectIndicator: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '선택된 항목에 체크 아이콘을 표시할지 설정합니다.',
    },
    isContentFitTriggerWidth: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '선택된 항목의 길이에 따라 trigger 버튼의 너비를 조절할지 설정합니다.',
    },
    error: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'Select 컴포넌트의 오류 상태를 설정합니다.',
    },
    helperText: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      description: 'Select 컴포넌트 하단에 표시되는 도움말 텍스트를 설정합니다.',
    },
    options: {
      control: false,
      table: {
        type: { summary: 'SelectOptions' },
      },
      description: [
        'Select에 표시될 선택 옵션들을 설정합니다.',
        'OptionItem, OptionGroup, OptionSeparator 타입을 사용할 수 있습니다.',
      ].join('<br/>'),
    },
    defaultValue: {
      table: { disable: true },
      description: '비제어 모드에서 초기 선택 값을 설정합니다.',
    },
    value: {
      table: { disable: true },
      description: 'onValueChange와 함께 사용하여 외부에서 상태를 관리할 수 있습니다.',
    },
    onValueChange: {
      table: { disable: true },
      description: '선택 값이 변경될 때 호출되는 콜백 함수입니다.',
    },
    selectRef: {
      table: { disable: true },
      description: '비제어 모드에서 현재 선택된 값을 외부에서 참조할 수 있는 Ref 객체입니다.',
    },
    ref: {
      table: { disable: true },
      description: 'Select 컴포넌트의 DOM 요소에 대한 참조를 설정합니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Select 컴포넌트는 사용자가 드롭다운 목록에서 하나의 옵션을 선택할 수 있는 입력 필드입니다.',
          '그룹화된 옵션과 구분선을 사용할 수 있으며, 제어 및 비제어 모드를 모두 지원합니다.',
          '다양한 크기와 너비 옵션을 제공하며, 오류 상태와 도움말 텍스트를 표시할 수 있습니다.',
        ].join('<br/>'),
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: [
          'Select 컴포넌트의 기본 사용 예시입니다.',
          '사용자가 드롭다운에서 하나의 옵션을 선택할 수 있습니다.',
        ].join('<br/>'),
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: [
          'Select 컴포넌트에서 옵션을 그룹으로 묶고 구분선을 사용하는 예시입니다.',
          '그룹 라벨과 구분선으로 옵션을 체계적으로 분류할 수 있습니다.',
        ].join('<br/>'),
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: [
          'Select 컴포넌트의 다양한 고정 너비 설정 예시입니다.',
          '숫자 값으로 px 단위의 고정 너비를 설정할 수 있습니다.',
        ].join('<br/>'),
      },
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
  args: {
    options: baseOptions,
  },
  argTypes: {
    width: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Select 컴포넌트의 반응형 너비 설정 예시입니다.',
          'fit은 내용에 맞춤, full은 부모 컨테이너의 전체 너비를 차지합니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-sm">반응형 너비: fit</p>
      <Select {...args} width="fit" placeholder="Fit" />

      <p className="font-bold text-sm">반응형 너비: full</p>
      <Select {...args} width="full" placeholder="Full" />
    </div>
  ),
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

export const WithContentFitTriggerWidth: Story = {
  args: {
    options: longLabelOptions,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-sm">선택상자 부모(trigger) 넓이 고정</p>
      <Select {...args} width={300} isContentFitTriggerWidth placeholder="선택상자 trigger에 고정" />
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

const ControlledComp = ({ onValueChange, ...args }: ComponentProps<typeof Select>) => {
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
          <Button onClick={handleUncontrolledCheck} className="text-xs px-2 py-1">
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
  render: (args) => <ControlledComp {...args} />,
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story: [
          '제어형과 비제어형 Select 컴포넌트를 함께 보여주는 예제입니다.',
          '각 방식의 차이와 동작 방식을 쉽게 비교할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};
