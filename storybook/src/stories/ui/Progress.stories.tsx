import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@common/ui';

type ProgressProps = {
  className?: string;
};

const meta: Meta = {
  title: 'ui/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: '기본 Progress 컴포넌트 문서',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: '추가 적용할 Tailwind CSS 클래스',
    },
  },
  args: {
    className: '',
  },
};

export default meta;
type Story = StoryObj;

const Template = (args: ProgressProps) => {
  return (
    <div className="flex flex-col gap-5">
      <Progress {...args} />
    </div>
  );
};

export const Default: Story = {
  render: Template,
};
