import type { Meta, StoryObj } from '@storybook/react';
import { Input, inputVariants } from '@common/ui/components';
import { CalendarIcon, LockIcon } from '@common/ui/icons';
import { useArgs } from '@storybook/preview-api';
import type { ComponentProps } from 'react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'color'],
    },
    size: {
      control: 'select',
      options: Object.keys(inputVariants.variants.size),
      description: 'Input의 높이를 조절합니다.',
    },
    error: {
      control: 'boolean',
      description: '에러 상태일 경우 테두리가 빨간색으로 표시됩니다.',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태 여부입니다.',
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
      control: 'boolean',
      description: '왼쪽 아이콘 표시 여부입니다.',
      table: {
        disable: true,
      },
    },
    iconRight: {
      control: 'boolean',
      description: '오른쪽 아이콘 표시 여부입니다.',
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
      description: '추가 Tailwind 클래스입니다.',
    },
  },
  args: {
    size: 'default',
    type: 'text',
    error: false,
    disabled: false,
    iconLeft: undefined,
    iconRight: undefined,
    placeholder: '입력해 주세요',
  },
  parameters: {
    docs: {
      description: {
        component: 'Tailwind Variants 기반 Input 컴포넌트입니다.',
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
};

export const IconControl: Story = {
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
    iconLeft: {
      table: {
        disable: false,
      },
    },
    iconRight: {
      table: {
        disable: false,
      },
    },
    placeholder: {
      control: false,
      table: { disable: true },
    },
  },
  render: (args) => {
    const iconLeft = args.iconLeft ? <LockIcon size={16} /> : undefined;
    const iconRight = args.iconRight ? <CalendarIcon size={16} /> : undefined;

    return <Input {...args} iconLeft={iconLeft} iconRight={iconRight} placeholder="입력하세요" />;
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(Object.keys(inputVariants.variants.size) as (keyof typeof inputVariants.variants.size)[]).map((size) => (
        <div key={size}>
          <div className="mb-1 text-sm text-juiText-blue">{size}</div>
          <Input {...args} size={size} placeholder={`Size: ${size}`} />
        </div>
      ))}
    </div>
  ),
};

export const ErrorStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {[false, true].map((isError) => (
        <div key={String(isError)}>
          <div className="mb-1 text-sm text-juiText-blue">error: {String(isError)}</div>
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

export const IconPaddingCases: Story = {
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
  render: (args) => {
    return (
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">아이콘 없음</span>
          <div className="w-3xs">
            <Input {...args} placeholder="아이콘 없음" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">왼쪽 아이콘</span>
          <div className="w-3xs">
            <Input {...args} placeholder="왼쪽 아이콘" iconLeft={<LockIcon size={16} />} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">오른쪽 아이콘</span>
          <div className="w-3xs">
            <Input {...args} placeholder="오른쪽 아이콘" iconRight={<CalendarIcon size={16} />} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">양쪽 아이콘</span>
          <div className="w-3xs">
            <Input
              {...args}
              placeholder="양쪽 아이콘"
              iconLeft={<LockIcon size={16} />}
              iconRight={<CalendarIcon size={16} />}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const Uncontrol: Story = {
  args: {
    defaultValue: '기본값입니다',
  },
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
  },
  render: (args) => {
    return (
      <div className="w-3xs">
        <Input
          {...args}
          onChange={(e) => {
            args.onChange?.(e);
          }}
        />
      </div>
    );
  },
};

const ControlledInput = (args: ComponentProps<typeof Input>) => {
  const [{ value }, updateArgs] = useArgs();

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => {
        updateArgs({ value: e.target.value });
        args.onChange?.(e);
      }}
    />
  );
};

export const Playground: Story = {
  args: {
    value: '초기값입니다',
  },
  render: (args) => <ControlledInput {...args} />,
};
