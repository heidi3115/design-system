import { Button, Textarea, textareaVariaints } from '@common/ui';
import { CopyIcon, FileIcon } from '@common/ui/icons';
import type { Meta, StoryObj } from '@storybook/react';

// 공통 상수
const sizeOptions = Object.keys(textareaVariaints.variants.size) as (keyof typeof textareaVariaints.variants.size)[];

const meta: Meta<typeof Textarea> = {
  title: 'UI/Form/Input/Textarea',
  component: Textarea,
  args: {
    size: 'default',
    error: false,
    disabled: false,
    minHeight: undefined,
    maxHeight: undefined,
    rightButton: undefined,
    defaultValue: undefined,
    value: undefined,
    onChange: undefined,
    placeholder: '입력해주세요...',
    className: undefined,
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(' | ') },
        defaultValue: { summary: 'default' },
      },
      description: ['Textarea의 높이를 설정합니다.', 'small, default, large 크기를 지원합니다.'].join('<br/>'),
    },
    error: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '에러 상태를 설정합니다. true일 때 에러 스타일이 적용됩니다.',
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '비활성화 상태를 설정합니다. true일 때 입력이 불가능합니다.',
    },
    minHeight: {
      control: 'number',
      table: {
        disable: true,
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      description: '자동 높이 조절 시 최소 높이를 픽셀 단위로 설정합니다.',
    },
    maxHeight: {
      control: 'number',
      table: {
        disable: true,
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      description: '자동 높이 조절 시 최대 높이를 픽셀 단위로 설정합니다.',
    },
    rightButton: {
      table: { disable: true },
      description: 'Textarea 오른쪽에 표시할 버튼 컴포넌트입니다.',
    },
    defaultValue: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '비제어형 컴포넌트에서 사용할 초기값입니다.',
    },
    value: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '제어형 컴포넌트에서 사용할 현재 값입니다.',
    },
    onChange: {
      table: { disable: true },
      description: '값이 변경될 때 호출되는 콜백 함수입니다.',
    },
    placeholder: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '입력 필드에 표시될 플레이스홀더 텍스트입니다.',
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '추가적인 CSS 클래스를 설정합니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Textarea 컴포넌트는 여러 줄의 텍스트를 입력할 수 있는 입력 필드입니다.',
          '크기, 에러 상태, 비활성화 상태, 우측 버튼 등 다양한 기능을 지원합니다.',
          '자동 높이 조절 기능을 통해 내용에 따라 높이를 동적으로 조절할 수 있습니다.',
          '제어형과 비제어형 모두 지원하며, 접근성을 고려하여 설계되었습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: ['기본 Textarea 컴포넌트의 예시입니다.', '여러 줄의 텍스트를 입력할 수 있습니다.'].join('<br/>'),
      },
    },
  },
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
    placeholder: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Textarea 컴포넌트의 크기별 높이 변화를 확인할 수 있는 예시입니다.',
          '각 크기별로 다른 높이가 적용됩니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => {
    // size별 높이 맵 (Textarea 높이 예시)
    const sizeHeightMap: Record<string, string> = {
      small: '56px',
      default: '72px',
      large: '112px',
    };

    return (
      <div className="flex flex-col gap-6">
        {sizeOptions.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span className="text-sm font-bold">
              {size} {sizeHeightMap[size] ? ` (height: ${sizeHeightMap[size]})` : ''}
            </span>
            <Textarea {...args} size={size} placeholder={`Size: ${size}`} />
          </div>
        ))}
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    error: true,
    placeholder: '에러가 있는 상태입니다.',
  },
  argTypes: {
    error: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['Textarea의 다양한 상태를 보여주는 예시입니다.', '에러 상태를 확인할 수 있습니다.'].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Normal</span>
        <Textarea {...args} error={false} placeholder="기본 상태입니다." />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Error</span>
        <Textarea {...args} error />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화 상태입니다.',
  },
  argTypes: {
    disabled: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['Textarea의 다양한 상태를 보여주는 예시입니다.', '비활성화 상태를 확인할 수 있습니다.'].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Normal</span>
        <Textarea {...args} disabled={false} placeholder="기본 상태입니다." />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Disabled</span>
        <Textarea {...args} disabled />
      </div>
    </div>
  ),
};

export const WithRightButton: Story = {
  args: {
    rightButton: (
      <Button variant="primary">
        <FileIcon />
        Query
      </Button>
    ),
    placeholder: '버튼이 있는 상태입니다.',
  },
  argTypes: {
    rightButton: { table: { disable: false } },
  },
  parameters: {
    docs: {
      description: {
        story: ['오른쪽에 버튼이 추가된 Textarea 예시입니다.', '다양한 액션 버튼을 추가할 수 있습니다.'].join('<br/>'),
      },
    },
  },
};

export const ErrorWithRightButton: Story = {
  args: {
    rightButton: <Button variant="primary">Query</Button>,
    error: true,
    placeholder: '에러 + 버튼 조합',
  },
  argTypes: {
    rightButton: { table: { disable: false } },
  },
  parameters: {
    docs: {
      description: {
        story: ['에러 상태와 오른쪽에 버튼이 추가된 Textarea 입니다.'].join('<br/>'),
      },
    },
  },
};

export const AutoResize: Story = {
  args: {
    defaultValue: '최소 100px 최대 300px로 조절할 수 있습니다.',
    minHeight: 100,
    maxHeight: 300,
  },
  argTypes: {
    minHeight: { table: { disable: false } },
    maxHeight: { table: { disable: false } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '입력 내용에 따라 높이가 자동 조절되는 Textarea 예시입니다.',
          'minHeight와 maxHeight로 범위를 제한할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export const showcaseOverview: Story = {
  name: 'Overview',
  argTypes: {
    size: { table: { disable: true } },
    error: { table: { disable: true } },
    disabled: { table: { disable: true } },
    rightButton: { table: { disable: true } },
    minHeight: { table: { disable: true } },
    maxHeight: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Textarea 컴포넌트의 모든 기능을 한 눈에 볼 수 있는 개요입니다.',
          '기본, 에러, 비활성화, 우측 버튼, 자동 높이 조절 등 다양한 상태와 기능을 종합적으로 확인할 수 있ㄴ는 쇼케이스입니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-8 p-6">
      {/* Default */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Default</h3>
        <Textarea {...args} placeholder="입력해주세요..." />
      </div>
      {/* With Error */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">With Error</h3>
        <Textarea {...args} error placeholder="에러가 있는 상태입니다." />
      </div>
      {/* Disabled */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Disabled</h3>
        <Textarea {...args} disabled placeholder="비활성화 상태입니다." />
      </div>
      {/* With Right Button */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">With Right Button</h3>
        <Textarea
          {...args}
          rightButton={<Button variant="primary">Query</Button>}
          placeholder="버튼이 있는 상태입니다."
        />
      </div>
      {/* Error + Right Button */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Error + Right Button</h3>
        <Textarea
          {...args}
          error
          rightButton={
            <Button variant="primary">
              <CopyIcon /> Query
            </Button>
          }
          placeholder="에러 + 버튼 조합"
        />
      </div>
      {/* AutoSize */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Auto Resize</h3>
        <Textarea
          {...args}
          defaultValue="최소 100px 최대 300px로 조절할 수 있습니다."
          minHeight={100}
          maxHeight={300}
        />
      </div>
    </div>
  ),
};
