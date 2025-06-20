// Toaster.stories.tsx

import { Button, Toaster } from '@common/ui';
import { CheckSquareIcon } from '@common/ui/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { toast, type ToasterProps } from 'sonner';

const meta: Meta<ToasterProps> = {
  title: 'UI/Toaster',
  component: Toaster,
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster duration={Infinity} />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4">
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

      <Button
        onClick={() =>
          toast.info('정보 메시지입니다.', {
            description: '정보 설명입니다.',
          })
        }>
        정보 토스트 띄우기
      </Button>

      <Button
        onClick={() =>
          toast.warning('경고 메시지입니다.', {
            description: '경고 설명입니다.',
          })
        }>
        경고 토스트 띄우기
      </Button>
    </div>
  ),
};

const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;

export const PositionExample: Story = {
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4">
      {positions.map((position) => (
        <Button key={position} onClick={() => toast(`토스트 위치: ${position}`, { position })}>
          {position} 토스트 띄우기
        </Button>
      ))}
    </div>
  ),
};

export const CloseButtonToast: Story = {
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4">
      <Button onClick={() => toast('닫기 버튼이 없는 토스트입니다.')}>토스트 띄우기</Button>

      <Button
        onClick={() =>
          toast('닫기 버튼이 있는 긴 토스트', {
            description: '이 토스트는 수동으로 닫아야 합니다.',
            duration: Infinity,
            closeButton: true,
          })
        }>
        닫기 버튼 & 자동 닫힘 비활성화 토스트 띄우기
      </Button>
    </div>
  ),
};

export const actionButtonToast: Story = {
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4">
      <Button
        onClick={() =>
          toast('Action 버튼이 있는 토스트입니다.', {
            icon: <CheckSquareIcon size="small" />,
            description: 'Action 버튼이 있는 토스트 설명 입니다.',
            action: {
              label: 'OK',
              onClick: () => alert('ok'),
            },
          })
        }>
        토스트 띄우기
      </Button>
    </div>
  ),
};

export const DurationOptionsToast: Story = {
  render: () => {
    const showToast = (duration: number | 'infinity') => {
      toast(`${duration === 'infinity' ? '무한 지속' : `${duration / 1000}초 지속`} 토스트`, {
        description:
          duration === 'infinity'
            ? '이 토스트는 수동으로만 닫을 수 있습니다.'
            : `${duration / 1000}초 후 자동으로 닫힙니다.`,
        duration: duration === 'infinity' ? Infinity : duration,
      });
    };

    return (
      <div className="p-4 flex flex-col items-start gap-4">
        <Button onClick={() => showToast(2000)}>2초 토스트 띄우기</Button>
        <Button onClick={() => showToast(5000)}>5초 토스트 띄우기</Button>
        <Button onClick={() => showToast(10000)}>10초 토스트 띄우기</Button>
        <Button onClick={() => showToast('infinity')}>무한 지속 토스트 띄우기</Button>
      </div>
    );
  },
};
