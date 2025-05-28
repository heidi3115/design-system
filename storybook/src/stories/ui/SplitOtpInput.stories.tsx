import type { Meta, StoryObj } from '@storybook/react';

import { SplitOtpInput } from '@common/ui';
import { splitOtpInputVariants } from '@common/ui/components/InputOTP';

const meta: Meta<typeof SplitOtpInput> = {
  title: 'UI/SplitOtpInput',
  component: SplitOtpInput,
  argTypes: {
    maxLength: {
      control: 'number',
      description: 'OTP 입력 칸의 개수입니다.',
      defaultValue: 6,
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부입니다.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    inputType: {
      control: {
        type: 'select',
        options: ['digit', 'character', 'both', 'all'],
      },
      description:
        '입력 가능한 문자 유형을 지정합니다. <br />digit: 정수, character: 글자(영문만), both: 정수 + 글자, all: 기호+한글 포함 모든 문자',
    },
    variant: {
      control: {
        type: 'select',
      },
      table: {
        defaultValue: { summary: 'primary' },
      },
      options: Object.keys(splitOtpInputVariants.variants.variant),
      description: '입력칸 포커스 테두리 색상 및 텍스트 색상 스타일입니다.',
    },
    size: {
      control: {
        type: 'select',
      },
      table: {
        defaultValue: { summary: 'basic' },
      },
      options: Object.keys(splitOtpInputVariants.variants.size),
      description: '입력칸 크기를 설정합니다.',
    },
    className: {
      control: 'text',
      description: '추가적인 Tailwind 클래스명을 지정할 수 있습니다.',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof SplitOtpInput>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '기본 SplitOtpInput 컴포넌트입니다.',
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
    disabled: {
      table: {
        disable: true,
      },
    },
  },
};

export const Variants: Story = {
  args: {
    value: '123456',
  },
  argTypes: {
    value: {
      table: {
        disable: true,
      },
    },
    inputType: {
      table: {
        disable: true,
      },
    },
    variant: {
      table: {
        disable: true,
      },
    },
    maxLength: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {(
        Object.keys(splitOtpInputVariants.variants.variant) as (keyof typeof splitOtpInputVariants.variants.variant)[]
      ).map((variant) => (
        <div key={variant} className="flex flex-col gap-0.5 text-sm">
          <span className="mb-2 font-bold">{variant}</span>
          <SplitOtpInput {...args} variant={variant} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'variant 값에 따른 스타일 변경 예시입니다.',
      },
    },
  },
};

export const Sizes: Story = {
  args: {
    value: '123456',
  },
  argTypes: {
    value: {
      table: {
        disable: true,
      },
    },
    inputType: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    maxLength: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {(Object.keys(splitOtpInputVariants.variants.size) as (keyof typeof splitOtpInputVariants.variants.size)[]).map(
        (size) => (
          <div key={size} className="flex flex-col gap-0.5 text-sm">
            <span className="mb-2 font-bold">{size}</span>
            <SplitOtpInput {...args} size={size} />
          </div>
        ),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'size 값에 따른 입력칸 크기 변화 예시입니다.',
      },
    },
  },
};

export const InputTypeExamples: Story = {
  argTypes: {
    value: {
      table: {
        disable: true,
      },
    },
    inputType: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {(['digit', 'character', 'both', 'all'] as const).map((inputType) => (
        <div key={inputType} className="flex flex-col gap-0.5 text-sm">
          <span className="mb-2 font-bold">{inputType} 입력해보세요</span>
          <SplitOtpInput {...args} inputType={inputType} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'inputType에 따라 입력 가능한 문자 유형이 달라집니다. <br />digit: 정수, character: 글자(영문만), both: 정수 + 글자, all: 기호+한글 포함 모든 문자',
      },
    },
  },
};

export const MaxLength: Story = {
  argTypes: {
    maxLength: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '입력 칸의 개수를 설정한 예시입니다.',
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
        story: '추가 Tailwind 클래스를 사용한 스타일 커스텀 예시입니다.',
      },
    },
  },
};
