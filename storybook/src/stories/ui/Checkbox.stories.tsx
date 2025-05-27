import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@common/ui';
import { EyeIcon, EyeOffIcon, PrinterIcon } from '@common/ui/icons';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: 'text',
      description: '체크박스 오른쪽에 표시될 라벨입니다.',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부입니다.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: '기본 체크 여부입니다.',
      table: {
        disable: true,
      },
    },

    className: {
      control: 'text',
      description: 'Checkbox에 추가할 Tailwind 클래스',
    },
    labelClassName: {
      control: 'text',
      description: '라벨에 추가할 Tailwind 클래스',
    },
    boxClassName: {
      control: 'text',
      description: 'isBox 가 true 일때, wrpper를 변형할 Tailwind 클래스',
    },
    isBox: {
      control: 'boolean',
      description: '박스형 스타일 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    customIcon: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    label: '체크박스 라벨',
    disabled: false,
    defaultChecked: false,
    isBox: false,
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: '기본 체크박스',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Checkbox 컴포넌트를 렌더링한 예시입니다.',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    label: '체크된 상태',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성 상태',
    disabled: true,
  },
  argTypes: {
    disabled: {
      table: {
        disable: true,
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
    isBox: {
      table: {
        disable: true,
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
    label: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'label에 컴포넌트를 넣어서 label을 만들 수 있습니다.',
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
        story: 'className 과 labelClassName 으로 스타일 커스텀을 보여줍니다.',
      },
    },
  },
};

export const CustomIcon: Story = {
  args: {
    label: '커스텀 아이콘 체크박스',
    customIcon: {
      CheckedIcon: EyeIcon,
      UnCheckedIcon: EyeOffIcon,
    },
  },
  argTypes: {
    label: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'CustomIcon에 아이콘을 두가지 넣으면 특정 아이콘으로 체크박스를 대체합니다.',
      },
    },
  },
};

export const showcaseOverview: Story = {
  args: {
    label: '',
  },
  argTypes: {
    label: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
    isBox: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'label이 있는 상태와 없는 상태의 Checkbox를 구분해서 보여줍니다.',
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
        <span className="text-sm font-bold">Custom Icon Widh Box</span>
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
