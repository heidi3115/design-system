import type { Meta, StoryObj } from '@storybook/react';
import { Button, MultiSelect, useConfirmDialog } from '@common/ui';
import { type ComponentProps, useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';

// 공통 상수
const sizeOptions = ['small', 'default', 'large'] as const;
const widthOptions = ['full'] as const;
const badgeColorOptions = ['default', 'primary', 'secondary', 'error'] as const;

const meta: Meta<typeof MultiSelect> = {
  title: 'UI/Form/Selection/MultiSelect',
  component: MultiSelect,
  args: {
    size: 'default',
    width: 'full',
    disabled: false,
    placeholder: '선택해주세요',
    emptyText: 'No Options',
    isSelectIndicator: false,
    isContentFitTriggerWidth: false,
    isLeaveClose: true,
    isAddNewItem: false,
    maxItemLength: undefined,
    badgeColor: 'default',
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
      description: ['MultiSelect 컴포넌트의 크기를 설정합니다.', '기본값은 default 입니다.'].join('<br/>'),
    },
    width: {
      control: 'select',
      options: widthOptions,
      table: {
        type: { summary: widthOptions.join(', ') + ' | number' },
        defaultValue: { summary: 'full' },
      },
      description: [
        'MultiSelect 컴포넌트의 너비를 설정합니다.',
        'full(100% 너비) 또는 숫자(px 단위)를 사용할 수 있습니다.',
        '기본값은 full 입니다.',
      ].join('<br/>'),
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'MultiSelect 컴포넌트의 비활성화 상태를 설정합니다.',
    },
    placeholder: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      description: 'MultiSelect 입력 필드에 표시될 placeholder 텍스트를 설정합니다.',
    },
    emptyText: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No Options' },
      },
      description: ['옵션이나 검색 결과가 없을 때 표시되는 텍스트를 설정합니다.', '기본값은 "No Options"입니다.'].join(
        '<br/>',
      ),
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
      description: '선택된 항목에 따라 trigger 너비를 자동으로 조절할지 설정합니다.',
    },
    isLeaveClose: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      description: '마우스가 드롭다운 영역을 벗어나면 자동으로 닫힐지 설정합니다.',
    },
    isAddNewItem: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '옵션 목록에 없는 새로운 항목을 추가할 수 있는 기능을 활성화합니다.',
    },
    maxItemLength: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      description: ['최대 선택 가능한 아이템의 개수를 설정합니다.', '1 이하의 숫자를 넣으면 1로 작동합니다.'].join(
        '<br/>',
      ),
    },
    badgeColor: {
      control: 'select',
      options: badgeColorOptions,
      table: {
        type: { summary: badgeColorOptions.join(', ') },
        defaultValue: { summary: 'default' },
      },
      description: '선택된 항목의 배지 색상을 설정합니다.',
    },
    error: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'MultiSelect 컴포넌트의 오류 상태 여부를 설정합니다.',
    },
    helperText: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      description: 'MultiSelect 컴포넌트 하단에 표시되는 도움말 텍스트를 설정합니다.',
    },
    options: {
      control: false,
      table: {
        type: { summary: 'OptionType[]' },
      },
      description: [
        'MultiSelect에 표시될 선택 옵션들을 설정합니다.',
        'OptionItem, OptionGroup, OptionSeparator 타입을 사용할 수 있습니다.',
      ].join('<br/>'),
    },
    onNewValueAdd: {
      table: { disable: true },
      description: 'isAddNewItem 기능을 통해 새로운 아이템이 추가될 때 호출되는 콜백 함수입니다.',
    },
    defaultValue: {
      table: { disable: true },
      description: '비제어 모드에서 초기 선택 값들을 설정합니다.',
    },
    value: {
      table: { disable: true },
      description: 'onValueChange와 함께 사용하여 외부에서 상태를 관리할 수 있습니다.',
    },
    onValueChange: {
      table: { disable: true },
      description: '선택 값이 변경될 때 호출되는 콜백 함수입니다.',
    },
    open: {
      table: { disable: true },
      description: '드롭다운의 열림 상태를 외부에서 제어할 때 사용합니다.',
    },
    selectRef: {
      table: { disable: true },
      description: '비제어 모드에서 현재 선택된 값들을 외부에서 참조할 수 있는 Ref 객체입니다.',
    },
    ref: {
      table: { disable: true },
      description: 'MultiSelect 컴포넌트의 DOM 요소에 대한 참조를 설정합니다.',
    },
    className: {
      table: { disable: true },
      description: 'MultiSelect 컴포넌트에 적용할 추가 CSS 클래스를 설정합니다.',
    },
    itemClassName: {
      table: { disable: true },
      description: 'MultiSelect 드롭다운 항목에 적용할 추가 CSS 클래스를 설정합니다.',
    },
    badgeClassName: {
      table: { disable: true },
      description: 'MultiSelect 선택된 항목의 배지에 적용할 추가 CSS 클래스를 설정합니다.',
    },
    onOverItem: {
      table: { disable: true },
      description: '최대 선택 가능한 항목 수를 초과했을 때 호출되는 콜백 함수입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'MultiSelect 컴포넌트는 사용자가 여러 옵션을 선택할 수 있는 드롭다운 입력 필드입니다.',
          '선택된 항목들이 배지 형태로 표시되며, 각 배지를 클릭하여 개별 항목을 제거할 수 있습니다.',
          '제어 및 비제어 모드를 모두 지원하며, 그룹화된 옵션과 구분선을 사용할 수 있습니다.',
          '새로운 항목 추가, 최대 선택 개수 제한 등 다양한 기능을 제공합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const baseOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Disabled Option', value: 'b', disabled: true },
  { label: 'Option C', value: 'c' },
  { label: 'Option D', value: 'd' },
  { label: 'Option E', value: 'E' },
];

export const Default: Story = {
  args: {
    options: baseOptions,
    placeholder: '여러 항목을 선택하세요',
  },
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 기본 사용 예시입니다.',
          '사용자가 여러 옵션을 선택할 수 있으며, 선택된 항목들이 배지 형태로 표시됩니다.',
        ].join('<br/>'),
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트에서 옵션을 그룹으로 묶고 구분선을 사용하는 예시입니다.',
          '그룹 라벨과 구분선으로 옵션을 체계적으로 분류할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4 h-60">
      <MultiSelect {...args} />
    </div>
  ),
};

export const FixedWidth: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-60">
      <p className="font-bold text-sm">고정 너비 200px</p>
      <MultiSelect {...args} width={200} placeholder="200px" />

      <p className="font-bold text-sm">고정 너비 400px</p>
      <MultiSelect {...args} width={400} placeholder="400px" />

      <p className="font-bold text-sm">고정 너비 600px</p>
      <MultiSelect {...args} width={600} placeholder="600px" />
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
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 다양한 고정 너비 설정 예시입니다.',
          '숫자 값으로 px 단위의 고정 너비를 설정할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const BadgeColor: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-2xs">
      <p className="font-bold text-sm">default</p>
      <MultiSelect {...args} placeholder="200px" />

      <p className="font-bold text-sm">primary</p>
      <MultiSelect {...args} badgeColor="primary" placeholder="200px" />

      <p className="font-bold text-sm">secondary</p>
      <MultiSelect {...args} badgeColor="secondary" placeholder="400px" />

      <p className="font-bold text-sm">error</p>
      <MultiSelect {...args} badgeColor="error" placeholder="600px" />
    </div>
  ),
  args: {
    options: baseOptions,
    defaultValue: ['a'],
  },
  argTypes: {
    badgeColor: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 배지 색상 옵션을 보여주는 예시입니다.',
          'badgeColor 속성을 통해 선택된 항목의 배지 색상을 설정할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const ResponsiveWidths: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-sm">반응형 너비: full</p>
      <MultiSelect {...args} width="full" placeholder="Full 너비" />
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
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 반응형 너비 설정 예시입니다.',
          'width="full" 옵션을 사용하여 부모 컨테이너의 전체 너비를 차지합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-60">
      <p className="font-bold text-sm">Size: small(height: 28px)</p>
      <MultiSelect {...args} size="small" placeholder="Small" />

      <p className="font-bold text-sm">Size: default(height: 32px)</p>
      <MultiSelect {...args} size="default" placeholder="Default" />

      <p className="font-bold text-sm">Size: large(height: 36px)</p>
      <MultiSelect {...args} size="large" placeholder="Large" />
    </div>
  ),
  args: {
    options: baseOptions,
    defaultValue: ['c'],
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
          'MultiSelect 컴포넌트의 다양한 크기 옵션을 보여주는 예시입니다.',
          'size 속성을 통해 small, default, large 세 가지 크기를 설정할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const ScrollItems: Story = {
  args: {
    options: Array.from({ length: 100 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `opt-${i + 1}`,
    })),
    open: true,
    isLeaveClose: false,
  },
  render: (args) => (
    <div className="h-[400px] overflow-auto">
      <MultiSelect {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트에서 많은 옵션을 스크롤로 표시하는 예시입니다.',
          '옵션이 많을 때 스크롤을 통해 모든 옵션을 탐색할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

const longLabelOptions = [
  { label: 'Option A-------Option A------Option A------Option A------', value: 'a' },
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
      <MultiSelect {...args} width={300} isContentFitTriggerWidth placeholder="Trigger 고정" />
      <p className="font-bold text-sm">선택상자 옵션들의 최대길이에 맞춤(Default)</p>
      <MultiSelect {...args} width={300} placeholder="옵션 길이 고정" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 trigger 너비 적응 기능을 보여주는 예시입니다.',
          'isContentFitTriggerWidth 옵션을 사용하여 trigger 너비를 조절할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const WithErrorAndHelperText: Story = {
  args: {
    options: baseOptions,
    placeholder: '항목을 선택하세요',
    error: true,
    helperText: '필수 항목입니다.',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <MultiSelect {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 오류 상태와 도움말 텍스트를 보여주는 예시입니다.',
          'error 속성과 helperText를 통해 오류 상태와 메시지를 표시할 수 있습니다.',
        ].join('<br/>'),
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 isLeaveClose 옵션을 보여주는 예시입니다.',
          '마우스가 드롭다운 영역을 벗어났을 때의 동작을 제어할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
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
          onNewValueAdd={(v) => {
            action('새로 추가된 값')(v);
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 새로운 항목 추가 기능을 보여주는 예시입니다.',
          'isAddNewItem 속성을 활성화하고 onNewValueAdd 콜백을 제공하여 새로운 옵션을 동적으로 추가할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

const WithMaxItemTemplate = (args: ComponentProps<typeof MultiSelect>) => {
  const { openDialog } = useConfirmDialog();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">2개 초과의 아이템을 추가 할 수 없습니다.</p>
      <MultiSelect
        {...args}
        onOverItem={() => {
          openDialog({
            title: 'warning',
            description: '2개 초과 추가할 수 없습니다.',
          });
        }}
      />
    </div>
  );
};

export const WithMaxItem: Story = {
  args: {
    options: baseOptions,
    placeholder: '2개 이상 추가 금지',
    isAddNewItem: true,
    maxItemLength: 2,
  },
  render: (args) => <WithMaxItemTemplate {...args} />,
  parameters: {
    docs: {
      description: {
        story: [
          'MultiSelect 컴포넌트의 최대 선택 개수 제한 기능을 보여주는 예시입니다.',
          'maxItemLength 속성을 통해 선택 가능한 항목의 최대 개수를 제한할 수 있습니다.',
        ].join('<br/>'),
      },
    },
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
        story: [
          'MultiSelect 컴포넌트의 제어형과 비제어형 사용법을 비교하는 예시입니다.',
          '제어형은 value와 onValueChange를 사용하고, 비제어형은 selectRef를 사용합니다.',
        ].join('<br/>'),
      },
    },
  },
};
