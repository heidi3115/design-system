import { Textarea, Button, textareaVariaints } from '@common/ui';
import { CopyIcon, FileIcon } from '@common/ui/icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(textareaVariaints.variants.size),
      description: 'Textarea의 높이를 조절합니다.',
    },
    error: {
      control: 'boolean',
      description: '에러 상태를 설정합니다.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태를 설정합니다.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    minHeight: {
      control: 'number',
      table: {
        disable: true,
      },
    },
    maxHeight: {
      control: 'number',
      table: {
        disable: true,
      },
    },
    rightButton: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    placeholder: '입력해주세요...',
    error: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: '기본 Textarea 컴포넌트입니다. 크기, 에러, 비활성화, 우측 버튼 등 다양한 상태를 지원합니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 Textarea입니다.',
      },
    },
  },
};

export const TextareaSizes: Story = {
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
        story: 'Textarea 컴포넌트의 크기별 높이 변화를 확인할 수 있습니다.',
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
        {(Object.keys(textareaVariaints.variants.size) as (keyof typeof textareaVariaints.variants.size)[]).map(
          (size, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-sm font-bold">
                {size}
                {sizeHeightMap[size] ? ` (height: ${sizeHeightMap[size]})` : ''}
              </span>
              <div key={size} className="flex flex-col gap-2 h-52">
                <Textarea {...args} size={size} placeholder={`Size: ${size}`} />
              </div>
            </div>
          ),
        )}
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
    error: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '에러 상태를 나타내는 Textarea입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화 상태입니다.',
  },
  argTypes: {
    disabled: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '사용할 수 없는 비활성화 상태의 Textarea입니다.',
      },
    },
  },
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
    rightButton: {
      table: {
        disable: false,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '오른쪽에 버튼이 추가된 Textarea입니다.',
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
  parameters: {
    docs: {
      description: {
        story: '에러 상태와 우측 버튼이 함께 있는 Textarea입니다.',
      },
    },
  },
};

export const AutoSize: Story = {
  args: {
    defaultValue: `최소 100px 최대 300px 로 조절할 수 있습니다.`,
    minHeight: 100,
    maxHeight: 300,
  },
  parameters: {
    docs: {
      description: {
        story: '입력 내용에 따라 높이가 자동 조절되는 Textarea입니다.',
      },
    },
  },
};

export const showcaseOverview: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '기본, 에러, 비활성화, 우측 버튼, 자동 높이 조절 등 다양한 Textarea 상태를 한눈에 볼 수 있는 쇼케이스입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-8 p-6">
      {/* Default */}
      <div>
        <p className="text-sm font-bold mb-2">Default</p>
        <Textarea {...args} placeholder="입력해주세요..." />
      </div>

      {/* With Error */}
      <div>
        <p className="text-sm font-bold mb-2">With Error</p>
        <Textarea {...args} error placeholder="에러가 있는 상태입니다." />
      </div>

      {/* Disabled */}
      <div>
        <p className="text-sm font-bold mb-2">Disabled</p>
        <Textarea {...args} disabled placeholder="비활성화 상태입니다." />
      </div>

      {/* With Right Button */}
      <div>
        <p className="text-sm font-bold mb-2">With Right Button</p>
        <Textarea
          {...args}
          rightButton={<Button variant="primary">Query</Button>}
          placeholder="버튼이 있는 상태입니다."
        />
      </div>

      {/* Error + Right Button */}
      <div>
        <p className="text-sm font-bold mb-2">Error + Right Button</p>
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
      <div>
        <p className="text-sm font-bold mb-2">AutoSize</p>
        <Textarea
          {...args}
          defaultValue="최소 100px 최대 300px 로 조절할 수 있습니다."
          minHeight={100}
          maxHeight={300}
        />
      </div>
    </div>
  ),
};
