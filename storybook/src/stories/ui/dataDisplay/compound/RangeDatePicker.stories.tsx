'use client';

import { RangeDatePicker } from '@common/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RangeDatePicker> = {
  title: 'UI/DataDisplay/Compound/DatePicker/RangeDatePicker',
  component: RangeDatePicker,
  args: {
    timeType: 'date',
    label: {
      start: '',
      end: '',
      labelDirection: 'top',
    },
    oppositeSign: {
      start: {
        show: true,
        label: 'START',
      },
      end: {
        show: true,
        label: 'END',
      },
    },
  },
  argTypes: {
    timeType: {
      control: { type: 'radio' },
      options: ['date', 'hour', 'minute', 'second'],
      description: '날짜 선택 시 시간 단위를 지정합니다. (예: date, hour, minute, second)',
    },
    minRangeDays: {
      control: { type: 'number' },
      description: '최소 선택 가능한 날짜 범위(일 단위)입니다.',
    },
    maxRangeDays: {
      control: { type: 'number' },
      description: '최대 선택 가능한 날짜 범위(일 단위)입니다.',
    },
    direction: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: '컴포넌트의 날짜 입력 필드들이 수평 또는 수직으로 배치됩니다.',
    },
    isConfrimAlert: {
      control: { type: 'boolean' },
      description: [
        '날짜 선택 시 조건 상관 없이 확인 다이얼로그 표시 여부를 설정합니다.',
        '** 조건: start, end 범위 및 maxRangeDays 보다 좁을때, minRangeDays 보다 넓을때',
      ].join('<br />'),
    },
    customConfirmAlert: {
      control: false,
      description: '날짜 선택 확인 시 표시할 커스텀 알림 컴포넌트를 렌더링하는 함수입니다.',
    },
    defaultRange: {
      control: false,
      description: '언컨트롤드 모드에서 초기 시작/종료 날짜 범위입니다.',
    },
    oppositeSign: {
      description: '시작/종료 날짜 버튼 옆에 표시할 반대 지점 라벨 및 스타일 설정입니다.',
    },
    label: {
      description: '시작/종료 필드에 표시할 라벨 및 라벨 배치 방향 설정입니다.',
    },
    delimiter: {
      control: false,
      description: '시작 입력창과 종료 입력창 사이의 컴포넌트 및 문자를 넣을 수 있는 설정입니다.',
    },
    range: {
      control: false,
      description: '{start: Date, end: Date} 타입의 range 변수 입니다.',
    },
    onRangeChange: {
      control: false,
      description: 'range 콜백 함수 입니다.',
    },
    isShowTimeSlide: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'timeType이 `Date`가 아닐때, 시간 설정 영역에서 Slider 컴포넌트로 시간을 설정할 수 있게 합니다.',
    },
    numberOfMonths: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
      description: '한 번에 렌더링할 달(month)의 개수를 지정합니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
두 날짜 사이의 범위를 선택할 수 있는 컴포넌트입니다. 
- 연/월 선택을 지원하며, 
- 시작일과 종료일을 각각 선택하거나 동시에 선택할 수 있습니다.
- 날짜 유효성 검사, 라벨, 커스텀 알림 등의 기능도 포함합니다.
        `.trim(),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RangeDatePicker>;

const today = new Date();
const plus5days = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
const plus7days = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const plus2days = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
const plus3days = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);

export const Default: Story = {
  name: 'Default Range Selection',
  args: {
    defaultRange: {
      start: today,
      end: plus5days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '기본 시작일과 종료일이 설정된 날짜 선택 예시입니다.',
      },
    },
  },
};

export const Time: Story = {
  name: 'Time Range Selection',
  args: {
    timeType: 'minute',
    defaultRange: {
      start: today,
      end: plus5days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '시간 설정을 포함한 시작일과 종료일이 설정된 날짜 선택 예시입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    defaultRange: {
      start: today,
      end: plus5days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'RangeDatePicker가 비활성화된 상태의 예시입니다.',
      },
    },
  },
};

export const NumberMonth: Story = {
  name: 'NumberMonth',
  args: {
    defaultRange: {
      start: today,
      end: plus5days,
    },
    numberOfMonths: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'numberOfMonths을 활용하여 2개의 캘린더를 보여주는 예시입니다.',
      },
    },
  },
};

export const TimeSlider: Story = {
  name: 'Time Slider',
  args: {
    timeType: 'minute',
    defaultRange: {
      start: today,
      end: plus5days,
    },
    numberOfMonths: 2,
    isShowTimeSlide: true,
  },
  parameters: {
    docs: {
      description: {
        story: '`isShowTimeSlide` prop을 통해 시간 설정에 Time Slider를 추가 할 수 있습니다.',
      },
    },
  },
};

export const WithRangeLimit: Story = {
  name: 'Range Limit',
  args: {
    minRangeDays: 3,
    maxRangeDays: 10,
    defaultRange: {
      start: today,
      end: plus7days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '선택 가능한 날짜 범위를 최소 3일, 최대 10일로 제한한 예시입니다.',
      },
    },
  },
};

export const WithCustomAlert: Story = {
  name: 'Custom Confirm Alert',
  args: {
    defaultRange: {
      start: today,
      end: plus2days,
    },
    customConfirmAlert: ({ condDate, type }) => (
      <div className="text-xs bg-juiPrimary/20 border border-juiStatus-boundary p-2 rounded-md">
        {type.toUpperCase()} 날짜를 {condDate?.toLocaleDateString()}로 설정하시겠습니까?
      </div>
    ),
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '날짜 선택 시 기본 알림 대신 커스텀 확인 다이얼로그를 사용하는 예시입니다.(시작일을 오늘보다 2일 이후로 선택해 보세요)',
      },
    },
  },
};

export const HorizontalDirectionWithLabels: Story = {
  name: 'Horizontal Direction with Top Labels',
  args: {
    direction: 'horizontal',
    label: {
      start: 'Start Date',
      end: 'End Date',
      labelDirection: 'top',
    },
    defaultRange: {
      start: today,
      end: plus3days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '날짜 입력 필드들이 수평으로 배치되며, 라벨이 필드 위에 위치한 예시입니다.',
      },
    },
  },
};

export const HorizontalDirectionWithSideLabels: Story = {
  name: 'Horizontal Direction with Side Labels',
  args: {
    direction: 'horizontal',
    label: {
      start: 'Start Date',
      end: 'End Date',
      labelDirection: 'side',
    },
    defaultRange: {
      start: today,
      end: plus3days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '날짜 입력 필드들이 수평으로 배치되며, 라벨이 필드 옆에 위치한 예시입니다.',
      },
    },
  },
};

export const VerticalDirectionWithLabels: Story = {
  name: 'Vertical Direction with Top Labels',
  args: {
    direction: 'vertical',
    label: {
      start: 'Start Date',
      end: 'End Date',
      labelDirection: 'top',
    },
    defaultRange: {
      start: today,
      end: plus3days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '날짜 입력 필드들이 세로로 배치되며, 라벨이 필드 위에 위치한 예시입니다.',
      },
    },
  },
};

export const VerticalDirectionWithSideLabels: Story = {
  name: 'Vertical Direction with Side Labels',
  args: {
    direction: 'vertical',
    label: {
      start: 'Start Date',
      end: 'End Date',
      labelDirection: 'side',
    },
    defaultRange: {
      start: today,
      end: plus3days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '날짜 입력 필드들이 세로로 배치되며, 라벨이 필드 옆에 위치한 예시입니다.',
      },
    },
  },
};

export const CustomDelimiter: Story = {
  name: 'Custom Delimiter',
  args: {
    delimiter: <span>{`<------>`}</span>,
    defaultRange: {
      start: today,
      end: plus3days,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '기본 구분자 대신 사용자 정의 구분자 <------> 를 사용하는 예시입니다.',
      },
    },
  },
};

export const WithOppositeSign: Story = {
  name: 'Custom Opposite Sign Style',
  args: {
    oppositeSign: {
      start: { show: true, label: '시작', className: 'text-juiError' },
      end: { show: true, label: '종료', className: 'text-juiText-secondary' },
    },
    defaultRange: {
      start: today,
      end: plus7days,
    },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '시작/종료 날짜 버튼 옆에 표시되는 반대 지점 라벨을 사용자 정의 스타일로 지정한 예시입니다.',
      },
    },
  },
};
