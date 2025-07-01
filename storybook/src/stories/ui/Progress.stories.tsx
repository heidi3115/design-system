import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@common/ui';

type ProgressArgsType = {
  value?: number;
  totalDuration?: number;
};

const meta: Meta<ProgressArgsType> = {
  title: 'ui/Progress',
  component: Progress,
  argTypes: {
    value: {
      control: 'number',
      description: '초기값 및 변화할 값',
    },
    totalDuration: {
      control: 'number',
      description: '몇 초에 걸쳐 증가할 지',
    },
  },
  args: {
    value: 0,
    totalDuration: 100,
  },
  parameters: {
    docs: {
      description: {
        component: 'Progress 컴포넌트 문서',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProgressArgsType>;

const Template = (args: ProgressArgsType) => {
  return (
    <div className="flex flex-col gap-5">
      <Progress {...args} />
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Progress 기본 컴포넌트',
      },
    },
  },
  render: Template,
};
