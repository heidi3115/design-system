import { useRef, useState, type ComponentProps, type ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Input, inputVariants } from '@common/ui';
import { CalendarIcon, LockIcon, type IconProps } from '@common/ui/icons';

const ICON_MAP: Record<string, ComponentType<IconProps> | undefined> = {
  none: undefined,
  lock: LockIcon,
  calendar: CalendarIcon,
};

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'color'],
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(inputVariants.variants.size),
      description: 'Input의 높이를 조절합니다.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    error: {
      control: 'boolean',
      description: '에러 상태일 경우 테두리가 빨간색으로 표시됩니다.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태 여부입니다.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasIconLeft: {
      table: {
        disable: true,
      },
    },
    hasIconRight: {
      table: {
        disable: true,
      },
    },
    iconLeft: {
      description: '왼쪽 아이콘 표시 여부입니다. (none: 없음, 이외 아이콘 선택)',
      table: {
        disable: true,
      },
    },
    iconRight: {
      description: '오른쪽 아이콘 표시 여부입니다. (none: 없음, 이외 아이콘 선택)',
      table: {
        disable: true,
      },
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder입니다.',
    },
    className: {
      control: 'text',
      description: '추가 Tailwind 클래스입니다.(eg. w-3xl)',
    },
  },
  args: {
    error: false,
    disabled: false,
    iconLeft: undefined,
    iconRight: undefined,
    placeholder: '입력해 주세요',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Tailwind Variants 기반 Input 컴포넌트입니다.<br /> 넓이는 기본 부모의 100% 이고, 넓이를 조절하려면 className 을 이용합니다.',
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
        story: '스토리북 컨트롤을 통해 아이콘을 동적으로 변경하여 Input에 적용하는 예시입니다.',
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

const ControllComp = ({ value: initialValue, onChange, onBlur, ...args }: ComponentProps<typeof Input>) => {
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
  render: (args) => <ControllComp {...args} />,
};
