import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@common/ui';

const meta: Meta<typeof Progress> = {
  title: 'UI/DataDisplay/Common/Progress',
  component: Progress,
  args: {
    className: '',
    bgClassName: '',
    value: undefined,
  },
  argTypes: {
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스명입니다.',
    },
    value: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: 'undefined' } },
      description: [
        'Progress bar의 진행률을 지정하는 props 입니다. (단위: %)',
        'bar 의 길이를 조절할 수 있습니다.',
      ].join('<br/>'),
    },
    bgClassName: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: 'Progress bar 배경의 스타일을 지정하는 props 입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Progress 컴포넌트의 문서입니다. Progress는 작업의 진행 상태를 시각적으로 표시하는 UI 요소입니다.',
          '사용자에게 현재 진행률을 알려주는 용도로 사용됩니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 Progress 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => {
    return (
      <div className="flex flex-col gap-5">
        <Progress {...args} />
      </div>
    );
  },
};
