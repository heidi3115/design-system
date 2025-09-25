import type { Meta, StoryObj } from '@storybook/react';

import { SplitOtpInput } from '@common/ui';
import { splitOtpInputVariants } from '@common/ui/components/InputOTP';

// 공통 상수
const variantOptions = Object.keys(
  splitOtpInputVariants.variants.variant,
) as (keyof typeof splitOtpInputVariants.variants.variant)[];
const sizeOptions = Object.keys(
  splitOtpInputVariants.variants.size,
) as (keyof typeof splitOtpInputVariants.variants.size)[];
const inputTypeOptions = ['digit', 'character', 'both', 'all'] as const;

const meta: Meta<typeof SplitOtpInput> = {
  title: 'UI/Form/Input/SplitOtpInput',
  component: SplitOtpInput,
  args: {
    variant: 'primary',
    size: 'basic',
    inputType: 'digit',
    maxLength: 6,
    value: undefined,
    defaultValue: undefined,
    disabled: false,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
      table: {
        type: { summary: variantOptions.join(' | ') },
        defaultValue: { summary: 'primary' },
      },
      description: [
        '입력 칸의 포커스 테두리 색상 및 텍스트 색상 스타일을 설정합니다.',
        '각 변형에 따라 다른 색상 테마가 적용됩니다.',
      ].join('<br/>'),
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(' | ') },
        defaultValue: { summary: 'basic' },
      },
      description: '입력 칸의 크기를 설정합니다.',
    },
    inputType: {
      control: 'select',
      options: inputTypeOptions,
      table: {
        type: { summary: inputTypeOptions.join(' | ') },
        defaultValue: { summary: 'digit' },
      },
      description: [
        '입력 가능한 문자 유형을 지정합니다.',
        'digit: 정수만 입력 가능',
        'character: 영문자만 입력 가능',
        'both: 정수와 영문자 입력 가능',
        'all: 모든 문자(기호, 한글 포함) 입력 가능',
      ].join('<br/>'),
    },
    maxLength: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
      },
      description: 'OTP 입력 칸의 개수를 설정합니다.',
    },
    value: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '제어형 컴포넌트에서 사용할 현재 값입니다.',
    },
    defaultValue: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '비제어형 컴포넌트에서 사용할 초기값입니다.',
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'SplitOtpInput 컴포넌트의 비활성화 상태를 설정합니다.',
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '추가적인 Tailwind CSS 클래스를 지정할 수 있습니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'SplitOtpInput 컴포넌트는 OTP(One-Time Password) 입력을 위한 분할된 입력 필드를 제공합니다.',
          '각 문자가 개별 입력 칸에 표시되며, 다양한 입력 유형과 스타일을 지원합니다.',
          '입력 칸 수, 크기, 색상 변형 등을 커스터마이징할 수 있습니다.',
          '키보드 네비게이션과 붙여넣기 기능을 완전히 지원합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SplitOtpInput>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '기본 SplitOtpInput 컴포넌트의 예시입니다.',
          '6자리 숫자 OTP를 입력할 수 있습니다.',
          '각 칸에 한 글자씩 입력되며, 자동으로 다음 칸으로 이동합니다.',
          '백스페이스 키로 이전 칸으로 이동할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '486486',
  },
  argTypes: {
    disabled: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'SplitOtpInput의 비활성화 상태를 보여주는 예시입니다.',
          '비활성화 상태에서도 값은 표시되지만 입력은 불가능합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const Variants: Story = {
  args: {
    value: '123456',
  },
  argTypes: {
    value: { table: { disable: true } },
    variant: { table: { disable: true } },
    inputType: { table: { disable: true } },
    maxLength: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'variant 값에 따른 스타일 변경 예시입니다.',
          '각 변형마다 다른 색상 테마가 적용됩니다.',
          '포커스 시 테두리 색상과 텍스트 색상이 변경됩니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {variantOptions.map((variant) => (
        <div key={variant} className="flex flex-col gap-0.5 text-sm">
          <span className="text-sm font-bold capitalize">{variant}</span>
          <SplitOtpInput {...args} variant={variant} />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    value: '123456',
  },
  argTypes: {
    size: { table: { disable: true } },
    value: { table: { disable: true } },
    inputType: { table: { disable: true } },
    maxLength: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'size 값에 따른 입력 칸 크기 변화 예시입니다.',
          '다양한 크기의 입력 칸을 제공합니다.',
          '화면 크기와 사용 환경에 맞게 적절한 크기를 선택하세요.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {sizeOptions.map((size) => (
        <div key={size} className="flex flex-col gap-0.5 text-sm">
          <span className="mb-2 font-bold">{size}</span>
          <SplitOtpInput {...args} size={size} />
        </div>
      ))}
    </div>
  ),
};

export const InputTypes: Story = {
  argTypes: {
    value: { table: { disable: true } },
    inputType: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'inputType에 따라 입력 가능한 문자 유형이 달라집니다.',
          '각 유형별로 직접 입력해보세요.',
          'digit: 0-9 숫자만, character: A-Z, a-z 영문자만, both: 숫자+영문자, all: 모든 문자',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {inputTypeOptions.map((inputType) => (
        <div key={inputType} className="flex flex-col gap-0.5 text-sm">
          <span className="mb-2 font-bold">{inputType} 입력해보세요</span>
          <SplitOtpInput {...args} inputType={inputType} />
        </div>
      ))}
    </div>
  ),
};

export const MaxLength: Story = {
  argTypes: {
    maxLength: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '입력 칸의 개수를 다양하게 설정한 예시입니다.',
          '4자리부터 8자리까지 다양한 길이를 지원합니다.',
          '일반적으로 SMS OTP는 6자리, 이메일 OTP는 4자리를 많이 사용합니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {([4, 5, 6, 7, 8] as const).map((maxLength) => (
        <div key={maxLength} className="flex flex-col gap-0.5 text-sm">
          <span className="mb-2 font-bold">maxLength: {maxLength}</span>
          <SplitOtpInput {...args} maxLength={maxLength} />
        </div>
      ))}
    </div>
  ),
};

export const CustomClass: Story = {
  args: {
    defaultValue: 'custom',
    inputType: 'all',
    className: 'data-[active=true]:ring-juiStatus-urgency text-juiStatus-boundary border-juiStatus-boundary',
  },
  parameters: {
    docs: {
      description: {
        story: [
          '추가 Tailwind CSS 클래스를 사용한 스타일 커스터마이징 예시입니다.',
          'className prop을 통해 다양한 스타일을 적용할 수 있습니다.',
          '포커스 상태, 텍스트 색상, 테두리 색상 등을 자유롭게 변경할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};
