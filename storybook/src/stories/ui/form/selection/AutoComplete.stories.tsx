// AutoComplete.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { AutoComplete, Button } from '@common/ui';
import { type ComponentProps, useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';

// 공통 상수
const sizeOptions = ['small', 'default', 'large'] as const;
const widthOptions = ['full'] as const;

const meta: Meta<typeof AutoComplete> = {
  title: 'UI/Form/Selection/AutoComplete',
  component: AutoComplete,
  args: {
    size: 'default',
    width: 'full',
    disabled: false,
    placeholder: '선택해주세요',
    emptyText: 'No Options',
    isSelectIndicator: false,
    isContentFitTriggerWidth: false,
    isLeaveClose: false,
    error: false,
    helperText: '',
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(', ') },
        defaultValue: { summary: 'default' },
      },
      description: ['AutoComplete 컴포넌트의 크기를 설정합니다.', '기본값은 default 입니다.'].join('<br/>'),
    },
    width: {
      control: 'select',
      options: widthOptions,
      table: {
        type: { summary: widthOptions.join(', ') + ' | number' },
        defaultValue: { summary: 'full' },
      },
      description: [
        'AutoComplete 컴포넌트의 너비를 설정합니다.',
        'input의 특성상 fit 하게 조절할 수 없습니다.',
        '기본값은 full 입니다.',
      ].join('<br/>'),
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: ['AutoComplete 컴포넌트의 비활성화 상태를 설정합니다.', '기본값은 false 입니다.'].join('<br/>'),
    },
    placeholder: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '선택해주세요' },
      },
      description: ['AutoComplete 입력 필드에 표시될 플레이스홀더 텍스트를 설정합니다.'].join('<br/>'),
    },
    emptyText: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No Options' },
      },
      description: ['AutoComplete options가 없을 때 표시되는 대체 문구입니다.', '기본값은 "No Options"입니다.'].join(
        '<br/>',
      ),
    },
    isSelectIndicator: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: ['선택 시 우측 체크 아이콘 표시 여부를 설정합니다.', '기본값은 false 입니다.'].join('<br/>'),
    },
    isContentFitTriggerWidth: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: ['선택된 항목 길이에 따라 trigger 버튼의 너비를 조절합니다.', '기본값은 false 입니다.'].join(
        '<br/>',
      ),
    },
    isLeaveClose: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: ['마우스가 벗어나면 리스트가 닫히는 여부를 설정합니다.', '기본값은 false 입니다.'].join('<br/>'),
    },
    error: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: ['form 에러 여부를 설정합니다.', '기본값은 false 입니다.'].join('<br/>'),
    },
    helperText: {
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '' },
      },
      description: ['AutoComplete 아래에 표시되는 도움말 문구입니다.'].join('<br/>'),
    },
    selectRef: {
      control: false,
      table: {
        type: { summary: 'Ref<string>' },
        disable: true,
      },
      description: [
        '비제어 모드에서 선택된 값을 참조할 수 있는 Ref 객체입니다.',
        'storybook 에서는 제어할 수 없습니다.',
      ].join('<br/>'),
    },
    ref: {
      control: false,
      table: {
        type: { summary: 'RefCallback<HTMLElement>' },
        disable: true,
      },
      description: ['AutoComplete DOM 요소에 대한 참조입니다.', 'storybook 에서는 제어할 수 없습니다.'].join('<br/>'),
    },
    value: {
      control: false,
      table: {
        type: { summary: 'string' },
        disable: true,
      },
      description: ['제어 모드에서 현재 선택된 값입니다.', 'storybook 에서는 제어할 수 없습니다.'].join('<br/>'),
    },
    defaultValue: {
      control: false,
      table: {
        type: { summary: 'string' },
        disable: true,
      },
      description: ['비제어 모드에서 초기 선택값입니다.', 'storybook 에서는 제어할 수 없습니다.'].join('<br/>'),
    },
    onValueChange: {
      control: false,
      action: 'onValueChange',
      table: {
        disable: true,
      },
      description: ['값이 변경될 때 호출되는 콜백 함수입니다.', 'storybook 에서는 제어할 수 없습니다.'].join('<br/>'),
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'AutoComplete 컴포넌트는 사용자가 입력하면서 실시간으로 옵션을 필터링하고 선택할 수 있는 입력 필드입니다.',
          '검색 기능과 드롭다운 메뉴를 결합하여 사용자 경험을 향상시킵니다.',
          '제어 및 비제어 모드를 모두 지원하며, 그룹화된 옵션과 구분선을 사용할 수 있습니다.',
          '다양한 크기와 옵션을 제공하여 다양한 상황에 적응할 수 있습니다.',
        ].join('<br/>'),
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트의 기본 사용 예시입니다.',
          '입력 필드에 텍스트를 입력하면 실시간으로 옵션이 필터링됩니다.',
        ].join('<br/>'),
      },
    },
  },
  args: {
    options: baseOptions,
    placeholder: '선택해주세요.',
  },
};

export const WithGroupsAndSeparators: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트에서 옵션을 그룹으로 묶고 구분선을 사용하는 예시입니다.',
          '그룹 라벨과 구분선으로 옵션을 체계적으로 분류할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트의 고정 너비 설정 예시입니다.',
          '숫자 값을 사용하여 px 단위로 고정 너비를 설정할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트의 반응형 너비 설정 예시입니다.',
          'width="full" 옵션을 사용하여 부모 컨테이너의 전체 너비를 차지합니다.',
        ].join('<br/>'),
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트의 다양한 크기 옵션을 보여주는 예시입니다.',
          'small, default, large 세 가지 크기를 제공합니다.',
        ].join('<br/>'),
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트에서 선택 표시기를 사용하는 예시입니다.',
          'isSelectIndicator가 true일 때 선택된 항목에 체크 아이콘이 표시됩니다.',
        ].join('<br/>'),
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트에서 많은 옵션을 스크롤로 표시하는 예시입니다.',
          '옵션이 많을 때 스크롤을 통해 모든 옵션을 탐색할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
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

export const WithContentFitTriggerWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트의 trigger 너비 적응 기능을 보여주는 예시입니다.',
          'isContentFitTriggerWidth 옵션을 사용하여 드롭다운 콘텐츠의 너비를 조절할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  args: {
    options: longLabelOptions,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-sm">선택상자 부모(trigger) 넓이 고정</p>
      <AutoComplete {...args} width={300} isContentFitTriggerWidth placeholder="Trigger 고정" />
      <p className="font-bold text-sm">선택상자 옵션들의 최대길이에 맞춤(Default)</p>
      <AutoComplete {...args} width={300} placeholder="옵션 길이 고정" />
    </div>
  ),
};

export const WithErrorAndHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트에서 오류 상태와 도움말 텍스트를 사용하는 예시입니다.',
          'error와 helperText 속성을 통해 사용자에게 피드백을 제공할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트의 마우스 leave 시 닫힘 기능을 보여주는 예시입니다.',
          'isLeaveClose 옵션을 통해 마우스가 영역을 벗어날 때 자동으로 닫히는 기능을 제어할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
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

const ControlledComp = ({ onValueChange, ...args }: ComponentProps<typeof AutoComplete>) => {
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
          <Button onClick={handleUncontrolledCheck} className="text-xs px-2 py-1">
            선택값 확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ControlledAndUncontrolled: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story: [
          'AutoComplete 컴포넌트의 제어형과 비제어형 사용법을 비교하는 예시입니다.',
          '제어형은 value와 onValueChange를 사용하고, 비제어형은 selectRef를 사용합니다.',
        ].join('<br/>'),
      },
    },
  },
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => <ControlledComp {...args} />,
};
