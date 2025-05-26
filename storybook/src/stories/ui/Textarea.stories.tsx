import { Textarea, Button } from '@common/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    placeholder: '입력해주세요...',
    size: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'], // `textareaVariants`에서 정의한 사이즈에 맞게 조정
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    minHeight: {
      control: 'number',
    },
    maxHeight: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
};

export const WithError: Story = {
  args: {
    error: true,
    placeholder: '에러가 있는 상태입니다.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화 상태입니다.',
  },
};

export const WithRightButton: Story = {
  args: {
    rightButton: <Button variant="primary">제출</Button>,
    placeholder: '버튼이 있는 상태입니다.',
  },
};

export const ErrorWithRightButton: Story = {
  args: {
    rightButton: <Button variant="primary">제출</Button>,
    error: true,
    placeholder: '에러 + 버튼 조합',
  },
};

export const AutoSize: Story = {
  args: {
    defaultValue: `자동 크기 조절이 되는 텍스트 영역입니다.\n줄을 늘려보세요.`,
    minHeight: 60,
    maxHeight: 200,
  },
};
