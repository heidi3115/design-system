import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@common/ui';
import { EyeIcon, EyeOffIcon, PrinterIcon } from '@common/ui/icons';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Form/Input/Checkbox',
  component: Checkbox,
  args: {
    label: 'Checkbox label',
    disabled: false,
    defaultChecked: false,
    isBox: false,
    className: undefined,
    labelClassName: undefined,
    boxClassName: undefined,
    customIcon: undefined,
  },
  argTypes: {
    label: {
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Checkbox label' },
      },
      description: ['Checkbox 오른쪽에 표시될 label 입니다.', '문자열 또는 React 컴포넌트를 사용할 수 있습니다.'].join(
        '<br/>',
      ),
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'Checkbox의 비활성화 상태를 설정합니다.',
    },
    defaultChecked: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '비제어형 Checkbox의 초기 체크 상태입니다.',
    },
    checked: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '제어형 Checkbox의 현재 체크 상태입니다.',
        'onCheckedChange와 함께 사용하여 상태를 외부에서 제어할 수 있습니다.',
      ].join('<br/>'),
    },
    isBox: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: ['박스형 스타일 여부를 설정합니다.', 'true일 때 Checkbox가 박스 형태로 표시됩니다.'].join('<br/>'),
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'Checkbox 요소에 적용할 CSS 클래스명입니다.',
    },
    labelClassName: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'label 요소에 적용할 CSS 클래스명입니다.',
    },
    boxClassName: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        'isBox가 true일 때 wrapper 요소에 적용할 CSS 클래스명입니다.',
        '박스 형태 스타일을 커스터마이징할 때 사용합니다.',
      ].join('<br/>'),
    },
    customIcon: {
      table: { disable: true },
      description: [
        '커스텀 아이콘을 사용할 때 설정합니다.',
        'CheckedIcon과 UnCheckedIcon을 포함한 객체를 전달합니다.',
      ].join('<br/>'),
    },
    onCheckedChange: {
      table: { disable: true },
      description: '체크 상태가 변경될 때 호출되는 콜백 함수입니다.',
    },
    id: {
      table: { disable: true },
      description: 'Checkbox의 HTML id 속성입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Checkbox 컴포넌트는 사용자가 선택/해제할 수 있는 Checkbox UI 요소입니다.',
          '기본 Checkbox, 박스형 Checkbox, 커스텀 아이콘 Checkbox 등 다양한 형태를 지원합니다.',
          '제어형과 비제어형 모두 지원하며, label과 함께 사용할 수 있습니다.',
          'Radix UI의 Checkbox 컴포넌트를 기반으로 구현되었습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '기본 Checkbox 컴포넌트의 예시입니다.',
          'label과 함께 표시되며, 클릭하여 체크 상태를 변경할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const Checked: Story = {
  args: {
    label: '체크된 상태',
    defaultChecked: true,
  },
  argTypes: {
    label: { table: { disable: true } },
    disabled: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['Checkbox의 체크된 상태를 보여주는 예시입니다.'].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Checkbox {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: '비활성 상태',
    disabled: true,
  },
  argTypes: {
    disabled: { table: { disable: true } },
    label: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['Checkbox의 비활성 상태를 보여주는 예시입니다.'].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Checkbox {...args} />
      </div>
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
  argTypes: {
    label: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'label 없이 사용하는 Checkbox 예시입니다.',
          '테이블이나 목록에서 선택 기능으로 사용할 때 유용합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const Box: Story = {
  args: {
    label: '박스 스타일',
    isBox: true,
    defaultChecked: true,
  },
  argTypes: {
    isBox: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['박스형 스타일의 Checkbox 예시입니다.', 'Checkbox와 label이 박스 형태로 묶여서 표시됩니다.'].join(
          '<br/>',
        ),
      },
    },
  },
};

export const ElementLabel: Story = {
  args: {
    label: (
      <div className="flex flex-row gap-1">
        <PrinterIcon size={15} /> 프린트
      </div>
    ),
  },
  argTypes: {
    label: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'label에 React 컴포넌트를 사용하는 예시입니다.',
          '아이콘과 텍스트를 조합하여 더 풍부한 label을 만들 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const CustomStyle: Story = {
  args: {
    label: '스타일 커스텀',
    className: 'border-red-500',
    labelClassName: 'text-red-500 font-bold',
  },
  parameters: {
    docs: {
      description: {
        story: [
          '커스텀 스타일을 적용한 Checkbox 예시입니다.',
          'className과 labelClassName을 사용하여 스타일을 커스터마이징할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const CustomIcon: Story = {
  args: {
    label: '커스텀 아이콘 Checkbox',
    customIcon: {
      CheckedIcon: EyeIcon,
      UnCheckedIcon: EyeOffIcon,
    },
  },
  argTypes: {
    label: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '커스텀 아이콘을 사용하는 Checkbox 예시입니다.',
          'CustomIcon에 2가지 아이콘을 설정하여 기본 체크 마크 대신 특정 아이콘을 사용하여 Checkbox를 대체합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const showcaseOverview: Story = {
  args: {
    label: '',
  },
  argTypes: {
    label: { table: { disable: true } },
    disabled: { table: { disable: true } },
    isBox: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Checkbox의 다양한 예시들 입니다.',
          'Checkbox의 label이 있는 상태와 없는 상태의 Checkbox를 구분해서 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => {
    return (
      <div className="flex flex-col p-5">
        {/* With Label */}
        <span className="text-sm font-bold">With Label</span>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-wrap gap-8 items-center">
            {/* 체크 상태 라벨 */}
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true</span>
              <Checkbox {...args} label="동의합니다" checked={true} />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false</span>
              <Checkbox {...args} label="동의합니다" checked={false} />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true & disabled</span>
              <Checkbox {...args} label="동의합니다" checked={true} disabled />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false & disabled</span>
              <Checkbox {...args} label="동의합니다" checked={false} disabled />
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* Without Label */}
        <span className="text-sm font-bold">Without Label</span>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true</span>
              <Checkbox {...args} checked={true} />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false</span>
              <Checkbox {...args} checked={false} />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true & disabled</span>
              <Checkbox {...args} checked={true} disabled />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false & Disabled</span>
              <Checkbox {...args} checked={false} disabled />
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* Box Label */}
        <span className="text-sm font-bold">Box</span>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true</span>
              <Checkbox {...args} label="동의합니다" checked={true} isBox />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false</span>
              <Checkbox {...args} label="동의합니다" checked={false} isBox />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true & disabled</span>
              <Checkbox {...args} label="동의합니다" checked={true} disabled isBox />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false & Disabled</span>
              <Checkbox {...args} label="동의합니다" checked={false} disabled isBox />
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* Custom Icon */}
        <span className="text-sm font-bold">Custom Icon</span>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true</span>
              <Checkbox
                {...args}
                label="동의합니다"
                checked={true}
                customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }}
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false</span>
              <Checkbox
                {...args}
                label="동의합니다"
                checked={false}
                customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }}
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true & disabled</span>
              <Checkbox
                {...args}
                label="동의합니다"
                checked={true}
                disabled
                customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }}
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false & disabled</span>
              <Checkbox
                {...args}
                label="동의합니다"
                checked={false}
                disabled
                customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }}
              />
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* Custom Icon With Box*/}
        <span className="text-sm font-bold">Custom Icon Width Box</span>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true</span>
              <Checkbox
                {...args}
                label="동의합니다"
                checked={true}
                isBox
                customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }}
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false</span>
              <Checkbox
                {...args}
                label="동의합니다"
                checked={false}
                isBox
                customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }}
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: true & disabled</span>
              <Checkbox
                {...args}
                label="동의합니다"
                checked={true}
                isBox
                disabled
                customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }}
              />
            </div>
            <div className="flex flex-col gap-2.5 items-start">
              <span className="text-xs text-juiText-blue">checked: false & disabled</span>
              <Checkbox
                {...args}
                label="동의합니다"
                checked={false}
                isBox
                disabled
                customIcon={{ CheckedIcon: EyeIcon, UnCheckedIcon: EyeOffIcon }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
