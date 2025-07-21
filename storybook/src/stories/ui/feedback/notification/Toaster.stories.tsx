// Toaster.stories.tsx

import { Button, Toaster } from '@common/ui';
import { CheckSquareIcon } from '@common/ui/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const meta: Meta<typeof Toaster> = {
  title: 'UI/Feedback/Notification/Toaster',
  component: Toaster,
  decorators: [
    (Story, context) => {
      const [theme, setTheme] = useState<'light' | 'dark'>('light');

      useEffect(() => {
        const rootClass = document.documentElement.className;

        setTheme(rootClass.includes('dark') ? 'dark' : 'light');
      }, []);

      // 스토리별 visibleToasts 설정 읽기, 없으면 1
      const visibleToasts = context.parameters.visibleToasts;

      return (
        <div>
          <Story />
          <Toaster theme={theme} {...(visibleToasts && { visibleToasts: visibleToasts })} />
        </div>
      );
    },
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: [
          'Toaster 컴포넌트는 Sonner 라이브러리를 기반으로 합니다.',
          '자세한 사용법은 https://sonner.emilkowal.ski/ 를 참고하여 사용합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 토스트 메시지를 보여주는 예제입니다.',
      },
    },
  },
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4">
      <Button onClick={() => toast('기본 토스트 메시지입니다.')}>기본 토스트 띄우기</Button>

      <Button
        onClick={() =>
          toast.success('성공 메시지입니다.', {
            description: '이것은 성공 메시지 설명입니다.',
          })
        }>
        성공 토스트 띄우기
      </Button>

      <Button
        onClick={() =>
          toast.error('에러 메시지입니다.', {
            description: '이것은 에러 메시지 설명입니다.',
          })
        }>
        에러 토스트 띄우기
      </Button>

      <Button
        onClick={() =>
          toast.info('정보 메시지입니다.', {
            description: '이것은 정보 메시지 설명입니다.',
          })
        }>
        정보 토스트 띄우기
      </Button>

      <Button
        onClick={() =>
          toast.warning('경고 메시지입니다.', {
            description: '이것은 경고 메시지 설명입니다.',
          })
        }>
        경고 토스트 띄우기
      </Button>
    </div>
  ),
};

export const RichColorDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'richColors 옵션을 적용한 토스트 메시지입니다.',
      },
    },
  },
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4">
      <Button onClick={() => toast('기본 토스트 메시지입니다.', { richColors: true })}>기본 토스트 띄우기</Button>
      <Button
        onClick={() =>
          toast.success('성공 메시지입니다.', {
            description: '이것은 성공 메시지 설명입니다.',
            richColors: true,
          })
        }>
        성공 토스트 띄우기
      </Button>
      <Button
        onClick={() =>
          toast.error('에러 메시지입니다.', {
            description: '이것은 에러 메시지 설명입니다.',
            richColors: true,
          })
        }>
        에러 토스트 띄우기
      </Button>
      <Button
        onClick={() =>
          toast.info('정보 메시지입니다.', {
            description: '이것은 정보 메시지 설명입니다.',
            richColors: true,
          })
        }>
        정보 토스트 띄우기
      </Button>
      <Button
        onClick={() =>
          toast.warning('경고 메시지입니다.', {
            description: '이것은 경고 메시지 설명입니다.',
            richColors: true,
          })
        }>
        경고 토스트 띄우기
      </Button>
    </div>
  ),
};

const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;

export const PositionExample: Story = {
  parameters: {
    docs: {
      description: {
        story: '다양한 위치에 토스트를 표시하는 예제입니다.',
      },
    },
  },
  render: () => (
    <div className="p-4 grid grid-cols-3 gap-16 items-start">
      {positions.map((position, i) => {
        let justifyClass = 'justify-self-start'; // 기본 왼쪽 정렬
        if (i % 3 === 1)
          justifyClass = 'justify-self-center'; // 2번째 컬럼
        else if (i % 3 === 2) justifyClass = 'justify-self-end'; // 3번째 컬럼

        return (
          <Button
            key={position}
            className={justifyClass}
            onClick={() => toast(`토스트 위치: ${position}`, { position, duration: 500 })}>
            {position} 토스트 띄우기
          </Button>
        );
      })}
    </div>
  ),
};

export const CloseButtonToast: Story = {
  parameters: {
    docs: {
      description: {
        story: '닫기 버튼이 있는 토스트 메시지입니다.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: '액션 버튼이 있는 토스트 메시지입니다.',
      },
    },
  },
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
            duration: Infinity,
          })
        }>
        토스트 띄우기
      </Button>
      <Button
        onClick={() =>
          toast.info('Action 버튼이 커스텀 버튼인 토스트 입니다', {
            description: 'Action 버튼이 커스텀인 토스트 설명 입니다.',
            action: (
              <Button variant="gradient" className="ml-auto">
                test
              </Button>
            ),
            richColors: true,
          })
        }>
        커스텀 액션버튼(className에 ml-auto 오른쪽 정렬 됩니다.)
      </Button>
    </div>
  ),
};

export const DurationOptionsToast: Story = {
  parameters: {
    docs: {
      description: {
        story: '토스트의 지속 시간을 설정하는 예제입니다.',
      },
    },
  },
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

export const VisibleToasts1: Story = {
  parameters: {
    visibleToasts: 1,
    docs: {
      description: {
        story:
          '전역 토스트 컴포넌트에 visibleToasts props 로 설정 토스트가 보여지는 갯수를 1개로 제한할 수 있습니다. (기본: 3개)',
      },
    },
  },

  render: () => (
    <div className="p-4 flex flex-col items-start gap-4 h-48">
      <Button onClick={() => toast('토스트 1개 제한')}>토스트 띄우기 (1개 제한)</Button>
    </div>
  ),
};

export const VisibleToasts5: Story = {
  parameters: {
    visibleToasts: 5,
    docs: {
      description: {
        story: '전역 토스트 컴포넌트에 visibleToasts props로 설정 토스트가 보여지는 갯수를 5개로 제한 (기본: 3개)',
      },
    },
  },
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4 h-48">
      <Button onClick={() => toast('토스트 5개 제한')}>토스트 띄우기 (5개 제한)</Button>
    </div>
  ),
};

export const VisibleToasts10: Story = {
  parameters: {
    visibleToasts: 10,
    docs: {
      description: {
        story:
          '전역 토스트 컴포넌트에 visibleToasts props로 설정 토스트가 보여지는 갯수를 10개로 제한할 수 있습니다. (기본: 3개)',
      },
    },
  },
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4 h-48">
      <Button onClick={() => toast('토스트 10개 제한')}>토스트 띄우기 (10개 제한)</Button>
    </div>
  ),
};

export const Dismiss: Story = {
  parameters: {
    docs: {
      description: {
        story: 'toast.dismiss() 함수를 사용하여 모든 토스트를 일괄적으로 닫는 기능을 보여주는 예제입니다.',
      },
    },
  },
  render: () => (
    <div className="p-4 flex flex-col items-start gap-4">
      <Button onClick={() => toast('닫기 버튼이 없는 토스트입니다.')}>토스트 띄우기</Button>
      <Button onClick={() => toast.dismiss()}>토스트 전체 닫기</Button>
    </div>
  ),
};
