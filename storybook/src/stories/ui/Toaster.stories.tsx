// Toaster.stories.tsx

import { Button, Toaster } from '@common/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { toast, type ToasterProps } from 'sonner';

const meta: Meta<ToasterProps> = {
  title: 'UI/Toaster',
  component: Toaster,
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (args) => (
    <div className="p-4 flex flex-col items-start gap-4">
      {/* Toaster는 전역적으로 한번만 선언하면 됩니다. */}
      <Toaster {...args} />

      <Button onClick={() => toast('기본 토스트 메시지입니다.')}>기본 토스트 띄우기</Button>

      <Button
        onClick={() =>
          toast.success('성공 메시지입니다.', {
            description: '이것은 설명입니다.',
          })
        }>
        성공 토스트 띄우기
      </Button>

      <Button
        onClick={() =>
          toast.error('에러 메시지입니다.', {
            description: '에러 설명입니다.',
          })
        }>
        에러 토스트 띄우기
      </Button>
    </div>
  ),
};

const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;

export const PositionExample: Story = {
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4">
      {/* Toaster는 전역 선언 */}
      <Toaster />

      {positions.map((position) => (
        <Button key={position} onClick={() => toast(`토스트 위치: ${position}`, { position })}>
          {position} 토스트 띄우기
        </Button>
      ))}
    </div>
  ),
};
