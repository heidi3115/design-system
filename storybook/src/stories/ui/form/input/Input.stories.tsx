import { type ComponentProps, type ComponentType, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Input, inputVariants } from '@common/ui';
import { CalendarIcon, type IconProps, LockIcon } from '@common/ui/icons';

const ICON_MAP: Record<string, ComponentType<IconProps> | undefined> = {
  none: undefined,
  lock: LockIcon,
  calendar: CalendarIcon,
};

const sizeOptions = Object.keys(inputVariants.variants.size);
const typeOptions = ['text', 'number', 'color'];
const underlineOptions = Object.keys(inputVariants.variants.underline);

const meta: Meta<typeof Input> = {
  title: 'UI/Form/Input/Input',
  component: Input,
  args: {
    error: false,
    disabled: false,
    iconLeft: undefined,
    iconRight: undefined,
    placeholder: '내용을 입력하세요',
    size: 'default',
    type: 'text',
  },
  argTypes: {
    type: {
      control: 'select',
      options: typeOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'text' } },
      description: 'Input의 타입을 설정합니다.',
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description: 'Input의 높이를 조절합니다.',
    },
    underline: {
      control: 'select',
      options: underlineOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'none' } },
      description: 'Input의 outline 대신 underline으로 포커스시 강조 됩니다.',
    },
    error: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: '에러 상태일 경우 테두리가 빨간색으로 표시됩니다.',
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: '비활성화 상태 여부입니다.',
    },
    hasIconLeft: {
      table: { disable: true },
    },
    hasIconRight: {
      table: { disable: true },
    },
    iconLeft: {
      table: { disable: true },
      description: '왼쪽 아이콘 표시 여부입니다. (none: 없음, 이외 아이콘 선택)',
    },
    iconRight: {
      table: { disable: true },
      description: '오른쪽 아이콘 표시 여부입니다. (none: 없음, 이외 아이콘 선택)',
    },
    placeholder: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '내용을 입력하세요' } },
      description: 'Input placeholder 입니다.',
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: '추가 Tailwind 클래스입니다.(eg. w-3xl)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Tailwind Variants 기반 Input 컴포넌트의 문서입니다.',
          '다양한 타입과 크기의 입력 필드를 제공합니다.',
          '넓이는 기본 부모의 100% 이고, 넓이를 조절하려면 className 을 이용합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '기본 Input',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Input 컴포넌트를 렌더링한 예시입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성 Input',
    disabled: true,
    iconLeft: CalendarIcon,
    iconRight: LockIcon,
    helperText: '비활성 helper text',
    className: 'w-3xl',
  },
  argTypes: {
    hasIconLeft: { control: false, table: { disable: true } },
    hasIconRight: { control: false, table: { disable: true } },
    defaultValue: { control: false, table: { disable: true } },
    helperText: { control: false, table: { disable: true } },
    placeholder: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    type: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: '비활성 Input 컴포넌트를 렌더링한 예시입니다.',
      },
    },
  },
};

export const Sizes: Story = {
  argTypes: {
    size: {
      control: false,
      table: { disable: true },
    },
    placeholder: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Input 컴포넌트의 크기별 사이즈 변화를 확인할 수 있습니다.',
      },
    },
  },
  render: (args) => {
    const sizeMap: Record<string, string> = {
      small: '28px',
      default: '32px',
      large: '36px',
    };

    return (
      <div className="flex flex-col gap-4">
        {(Object.keys(inputVariants.variants.size) as (keyof typeof inputVariants.variants.size)[]).map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span className="text-sm font-bold">
              {size}
              {sizeMap[size] ? ` (height: ${sizeMap[size]})` : ''}
            </span>
            <div className="w-72">
              <Input {...args} size={size} placeholder={`Size: ${size}`} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const IconPosition: Story = {
  argTypes: {
    size: {
      control: false,
      table: { disable: true },
    },
    error: {
      control: false,
      table: { disable: true },
    },
    hasIconLeft: {
      control: false,
      table: { disable: true },
    },
    hasIconRight: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Input 컴포넌트에 아이콘을 왼쪽, 오른쪽, 양쪽에 배치한 예시입니다. 아이콘 위치에 따른 UI 변화를 확인할 수 있습니다.',
      },
    },
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">아이콘 없음</span>
          <div className="w-72">
            <Input {...args} placeholder="아이콘 없음" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">왼쪽 아이콘</span>
          <div className="w-72">
            <Input {...args} placeholder="왼쪽 아이콘" iconLeft={LockIcon} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">오른쪽 아이콘</span>
          <div className="w-72">
            <Input {...args} placeholder="오른쪽 아이콘" iconRight={CalendarIcon} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">양쪽 아이콘</span>
          <div className="w-72">
            <Input {...args} placeholder="양쪽 아이콘" iconLeft={LockIcon} iconRight={CalendarIcon} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">양쪽 아이콘 with 에러</span>
          <div className="w-72">
            <Input {...args} placeholder="양쪽 아이콘" iconLeft={LockIcon} iconRight={CalendarIcon} error />
          </div>
        </div>
      </div>
    );
  },
};

export const ErrorStates: Story = {
  argTypes: {
    size: {
      control: false,
      table: { disable: true },
    },
    error: {
      control: false,
      table: { disable: true },
    },
    hasIconLeft: {
      control: false,
      table: { disable: true },
    },
    hasIconRight: {
      control: false,
      table: { disable: true },
    },
    helperText: {
      control: false,
      table: { disable: true },
    },
    placeholder: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '에러 상태와 정상 상태의 Input을 비교하여 에러 표시가 어떻게 나타나는지 확인할 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-4">
      {[true, false].map((isError) => (
        <div key={String(isError)} className="flex flex-col gap-2">
          <div className="text-sm font-bold">error: {String(isError)}</div>
          <Input
            {...args}
            error={isError}
            placeholder={isError ? '에러 상태입니다' : '정상 상태입니다'}
            helperText="필수값을(를) 입력해주세요."
          />
        </div>
      ))}
    </div>
  ),
};

type IconKey = keyof typeof ICON_MAP;
type InputStoryProps = Omit<ComponentProps<typeof Input>, 'iconLeft' | 'iconRight'> & {
  iconLeft: IconKey;
  iconRight: IconKey;
};

export const IconControl: StoryObj<InputStoryProps> = {
  argTypes: {
    iconLeft: {
      control: 'select',
      options: ['none', 'lock', 'calendar'],
      table: { disable: false },
    },
    iconRight: {
      control: 'select',
      options: ['none', 'lock', 'calendar'],
      table: { disable: false },
    },
    size: {
      control: false,
      table: { disable: true },
    },
    error: {
      control: false,
      table: { disable: true },
    },
    hasIconLeft: {
      control: false,
      table: { disable: true },
    },
    hasIconRight: {
      control: false,
      table: { disable: true },
    },
    placeholder: {
      control: false,
      table: { disable: true },
    },
  },
  args: {
    iconLeft: 'lock',
    iconRight: 'calendar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Storybook 컨트롤을 통해 아이콘을 동적으로 변경하여 Input에 적용하는 예시입니다.',
      },
      disable: true,
    },
  },
  render: ({ iconLeft, iconRight, ...args }) => {
    const IconLeftComponent = ICON_MAP?.[iconLeft];
    const IconRightComponent = ICON_MAP?.[iconRight];

    return (
      <Input
        {...args}
        iconLeft={IconLeftComponent}
        iconRight={IconRightComponent}
        placeholder="control에서 아이콘을 선택해 주세요."
        className="w-3xl"
      />
    );
  },
};

export const UnderlineVariants: Story = {
  argTypes: {
    underline: { control: false, table: { disable: true } },
    placeholder: { control: false, table: { disable: true } },
    size: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story:
          '`underline` 속성의 값에 따라 Input 하단에 강조선이 어떻게 렌더링되는지 확인할 수 있는 예시입니다. 기본적으로 `outline` 대신 포커스 시 underline이 강조됩니다.',
      },
    },
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-6">
        {underlineOptions.map((underlineValue) => (
          <div key={underlineValue} className="flex flex-col gap-2">
            <span className="text-sm font-bold">underline: {underlineValue}</span>
            <div className="w-72">
              <Input
                {...args}
                underline={underlineValue as keyof typeof inputVariants.variants.underline}
                placeholder={`underline: ${underlineValue}`}
              />
            </div>
          </div>
        ))}
        <div key="error" className="flex flex-col gap-2">
          <span className="text-sm font-bold">underline: With Error</span>
          <div className="w-72">
            <Input {...args} underline="primary" error placeholder={`underline: With Error`} />
          </div>
        </div>
      </div>
    );
  },
};

const ControlledComp = ({ value: initialValue, onChange, onBlur, ...args }: ComponentProps<typeof Input>) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const logControlledChange = action('제어형 onChange 발생');
  const logUncontrolledBlur = action('비제어형 onBlur 발생');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    logControlledChange(value);
    onChange?.(e); // 스토리북 action 로그용
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      logUncontrolledBlur(e.target.value);
      onBlur?.(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">제어형 입력</span>
        <div className="w-3xs">
          <Input {...args} value={value} onChange={handleChange} />
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">비제어형 입력</span>
        <div className="w-3xs">
          <Input {...args} ref={inputRef} onBlur={handleBlur} />
        </div>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  args: {
    value: '제어형 기본값',
    defaultValue: '비제어 기본값',
  },
  argTypes: {
    value: { control: false },
    onChange: { action: '제어형 onChange Event' },
    onBlur: { action: '비제어형 onBlur Event' },
    size: { control: false, table: { disable: true } },
    error: { control: false, table: { disable: true } },
    hasIconLeft: { control: false, table: { disable: true } },
    hasIconRight: { control: false, table: { disable: true } },
    defaultValue: { control: false, table: { disable: true } },
    helperText: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
    placeholder: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    type: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: '제어형(Controlled) Input 사용 예시입니다. 입력값을 상태로 관리합니다.',
      },
      disable: true,
    },
  },
  render: (args) => <ControlledComp {...args} />,
};
