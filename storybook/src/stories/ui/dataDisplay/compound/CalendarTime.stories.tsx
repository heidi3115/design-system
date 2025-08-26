'use client';

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, CalendarTime } from '@common/ui';

// 1. Mintue 모드 상태 관리 컴포넌트
function MinCalendarStory(props: React.ComponentProps<typeof CalendarTime>) {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2025, 6, 10, 12, 11));

  return <CalendarTime {...props} defaultMonth={selected} selected={selected} onSelect={setSelected} />;
}

// 2. Second 모드 상태 관리 컴포넌트
function SecondCalendarStory(props: React.ComponentProps<typeof CalendarTime>) {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2025, 6, 10, 12, 11));

  return (
    <CalendarTime {...props} timeType="second" defaultMonth={selected} selected={selected} onSelect={setSelected} />
  );
}

// 3. Hour 모드 상태 관리 컴포넌트
function HourCalendarStory(props: React.ComponentProps<typeof CalendarTime>) {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2025, 6, 10, 12, 11));

  return <CalendarTime {...props} timeType="hour" defaultMonth={selected} selected={selected} onSelect={setSelected} />;
}

// 4. Min/Max disabled 범위 상태 관리 컴포넌트
function DisabledBoundsCalendarStory(props: React.ComponentProps<typeof CalendarTime>) {
  const [selected, setSelected] = React.useState<Date | undefined>(undefined);
  const minDate = new Date(2025, 6, 10, 0, 0);
  const maxDate = new Date(2025, 6, 20, 0, 0);

  return (
    <CalendarTime
      {...props}
      defaultMonth={selected}
      selected={selected}
      onSelect={setSelected}
      disabled={{ before: minDate, after: maxDate }}
    />
  );
}

// 5.From/To disabled 범위 상태 관리 컴포넌트
function DisabledFromToCalendarStory(props: React.ComponentProps<typeof CalendarTime>) {
  const [selected, setSelected] = React.useState<Date | undefined>(undefined);
  const minDate = new Date(2025, 6, 10, 0, 0);
  const maxDate = new Date(2025, 6, 20, 0, 0);

  return (
    <CalendarTime
      {...props}
      defaultMonth={selected}
      selected={selected}
      onSelect={setSelected}
      disabled={{ from: minDate, to: maxDate }}
    />
  );
}

// 6. 다이얼로그 열림 상태 관리 컴포넌트
function DialogCalendarStory(props: React.ComponentProps<typeof CalendarTime>) {
  const [selected, setSelected] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Calendar</Button>
      <CalendarTime
        {...props}
        selected={selected}
        onSelect={setSelected}
        dialogOpen={open}
        onDialogConfirm={() => {
          props.onDialogConfirm?.();
          setOpen(false);
        }}
        onDialogCancel={() => {
          props.onDialogCancel?.();
          setOpen(false);
        }}
        dialogContent={<div>선택한 날짜: {selected?.toLocaleDateString()}</div>}
      />
    </div>
  );
}

function CloseButtonStory(props: React.ComponentProps<typeof CalendarTime>) {
  const [selected, setSelected] = React.useState<Date | undefined>(undefined);

  return (
    <div>
      <CalendarTime
        {...props}
        selected={selected}
        onSelect={setSelected}
        closeButton={<Button className="ml-auto mt-1 mr-0">OK</Button>}
      />
    </div>
  );
}

const meta: Meta<typeof CalendarTime> = {
  title: 'UI/DataDisplay/Compound/Calendar/CalendarTime',
  component: CalendarTime,
  args: {
    timeType: 'minute',
  },
  argTypes: {
    timeType: {
      control: { type: 'radio' },
      options: ['hour', 'minute', 'second'],
      description: '시간 선택 단위를 설정합니다. (`hour`, `minute`, `second`)',
    },
    selected: {
      control: false,
      description: '선택된 날짜 Date 값 입니다.(CalendarTime 에서는 single 모드만 지원)',
      table: {
        type: { summary: 'Date | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onSelect: {
      control: false,
      description: '날짜가 선택될 때 호출되는 콜백 함수입니다.',
    },
    showOutsideDays: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      description: '이전 달과 다음 달의 날짜를 현재 달력에 표시할지 여부를 설정합니다.',
    },
    numberOfMonths: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
      description: '한 번에 렌더링할 달(month)의 개수를 지정합니다.',
    },
    captionLayout: {
      control: { type: 'radio' },
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      defaultValue: 'label',
      description: '달력 캡션 영역의 레이아웃을 선택합니다.',
    },
    navLayout: {
      control: { type: 'radio' },
      options: ['after', 'around'],
      defaultValue: 'around',
      description: '월의 nav의 포지션을 설정 합니다.',
    },
    dialogOpen: {
      control: false,
      description: '달력 컴포넌트 내부의 dialog를 띄울때 사용 합니다.',
    },
    buttonVariant: {
      table: { disable: true },
      description: '내부 버튼 스타일을 지정하는 prop (디자인 시스템 내부용)',
    },
    onDialogConfirm: {
      control: false,
      description: '달력 컴포넌트 내부의 dialog에서 확인 버튼 클릭 시 호출되는 콜백 함수입니다.',
    },
    onDialogCancel: {
      control: false,
      description: '달력 컴포넌트 내부의 dialog에서 취소 버튼 클릭 시 호출되는 콜백 함수입니다.',
    },
    dialogContent: {
      control: false,
      description: '달력 컴포넌트 내부의 dialog에서 콘텐츠를 표시할 때 사용합니다.',
    },
    isShowTimeSlide: {
      description: '달력 컴포넌트 시간 설정 영역에서 Slider 컴포넌트로 시간을 설정할 수 있게 합니다.',
    },
    closeButton: {
      control: false,
      description: '달력컴포넌트의 footer에 버튼을 위치 시킬수 있습니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '이 컴포넌트는 [`react-day-picker`](https://react-day-picker.js.org/) 라이브러리를 기반으로 구현되었습니다.',
          '자세한 동작 방식이나 옵션은 해당 라이브러리의 문서를 참고해 주세요.',
          '',
          '지원하는 모드: `mintue`, `hour`, `second`',
          '추가로 다이얼로그, caption layout, 비활성화 범위, 다중 월(month) 등 다양한 기능을 래핑하여 제공합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarTime>;

export const Mintue: Story = {
  render: MinCalendarStory,
  name: 'Mintue Date',
  parameters: {
    docs: {
      description: {
        story: 'Mintue까지 날짜를 선택할 수 있는 기본 모드입니다.',
      },
    },
  },
};

export const Second: Story = {
  render: SecondCalendarStory,
  name: 'Second Date',
  parameters: {
    docs: {
      description: {
        story: 'Second까지 날짜를 선택할 수 있는 기본 모드입니다.',
      },
    },
  },
};

export const Hour: Story = {
  render: HourCalendarStory,
  name: 'Hour Date',
  parameters: {
    docs: {
      description: {
        story: 'Hour까지 날짜를 선택할 수 있는 기본 모드입니다.',
      },
    },
  },
};

export const WithDisabledBounds: Story = {
  render: DisabledBoundsCalendarStory,
  name: 'Min / Max Disabled',
  parameters: {
    docs: {
      description: {
        story: '최소/최대 날짜 범위를 벗어나는 날짜를 비활성화합니다. (`before`, `after` 조합)',
      },
    },
  },
};

export const WithDisabledRange: Story = {
  render: DisabledFromToCalendarStory,
  name: 'From / To Disabled',
  parameters: {
    docs: {
      description: {
        story: '특정 범위 내의 날짜만 비활성화합니다. (`from`, `to` 조합)',
      },
    },
  },
};

export const WithDialog: Story = {
  render: DialogCalendarStory,
  name: 'With Confirmation Dialog',
  parameters: {
    docs: {
      description: {
        story: '`dialogOpen` prop을 통해 다이얼로그 형태로 캘린더를 열고 확인/취소 콜백을 설정할 수 있습니다.',
      },
    },
  },
};

export const CloseButton: Story = {
  render: CloseButtonStory,
  name: 'With Close Button',
  parameters: {
    docs: {
      description: {
        story: '`closeButton` prop을 통해 캘린더를 닫거나 동작을 제어 할 수 있습니다.',
      },
    },
  },
};

export const TimeSlider: Story = {
  name: 'Time Slider',
  args: {
    timeType: 'minute',
    selected: new Date(2025, 6, 10, 14, 30),
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

export const CaptionLayoutComparison: Story = {
  name: 'CaptionLayout',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`captionLayout` 설정 값들(`label`, `dropdown`, `dropdown-months`, `dropdown-years`)의 UI 차이를 한눈에 비교합니다.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <section className="m-auto">
        <h3 className="mb-3 text-center font-semibold text-lg">label</h3>
        <CalendarTime timeType="minute" captionLayout="label" />
      </section>

      <section className="m-auto">
        <h3 className="mb-3 text-center font-semibold text-lg">dropdown</h3>
        <CalendarTime captionLayout="dropdown" />
      </section>

      <section className="m-auto">
        <h3 className="mb-3 text-center font-semibold text-lg">dropdown-months</h3>
        <CalendarTime captionLayout="dropdown-months" />
      </section>

      <section className="m-auto">
        <h3 className="mb-3 text-center font-semibold text-lg">dropdown-years</h3>
        <CalendarTime captionLayout="dropdown-years" />
      </section>
    </div>
  ),
};

export const NumberOfMonths: Story = {
  name: 'NumberOfMonths',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '`numberOfMonths` 값을 1~3으로 바꿨을 때 UI가 어떻게 달라지는지 확인합니다.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">1</h3>
        <CalendarTime captionLayout="label" />
      </section>

      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">2</h3>
        <CalendarTime numberOfMonths={2} captionLayout="dropdown" />
      </section>

      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">3</h3>
        <CalendarTime numberOfMonths={3} captionLayout="dropdown-months" />
      </section>
    </div>
  ),
};

export const ShowOutsideDays: Story = {
  name: 'ShowOutsideDays',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '`showOutsideDays` 옵션으로 이전/다음 달의 날짜 표시 여부를 비교합니다.',
      },
    },
  },
  render: () => (
    <div className="flex gap-8">
      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">showOutsideDays: true</h3>
        <CalendarTime />
      </section>

      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">showOutsideDays: false</h3>
        <CalendarTime showOutsideDays={false} />
      </section>
    </div>
  ),
};

export const DefaultMonth: Story = {
  name: 'DefaultMonth',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`defaultMonth`가 설정되지 않았을 때와 특정 날짜(1979년 1월)가 설정됐을 때 초기 표시 월의 차이를 보여줍니다.',
      },
    },
  },
  render: () => (
    <div className="flex gap-8">
      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">DefaultMonth Default Current Month</h3>
        <CalendarTime />
      </section>

      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">DefaultMonth: 1979. 01</h3>
        <CalendarTime defaultMonth={new Date(1979, 0, 1)} />
      </section>
    </div>
  ),
};

export const NavPosition: Story = {
  name: 'Month Navigation Position',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '월 네비게에션의 위치를 보여줍니다 /after',
      },
    },
  },
  render: () => (
    <div className="flex gap-8">
      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">Around Default</h3>
        <CalendarTime navLayout="around" />
      </section>

      <section>
        <h3 className="mb-3 ml-2 font-semibold text-lg">After</h3>
        <CalendarTime navLayout="after" />
      </section>
    </div>
  ),
};

export const WithModifiersAndClassNames: Story = {
  name: 'With Modifiers and ModifiersClassNames',
  parameters: {
    docs: {
      controls: { disable: true },
      description: {
        story: '`modifiers`와 `modifiersClassNames`를 사용하여 특정 날짜에 커스텀 클래스를 적용하는 예시입니다.',
      },
    },
  },
  render: () => {
    const modifiers = {
      highlight: [new Date(2024, 6, 3), new Date(2024, 6, 4)],
    };
    const modifiersClassNames = {
      highlight: 'font-bold text-juiError text-lg',
    };

    return (
      <CalendarTime
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        defaultMonth={new Date(2024, 6, 1)}
      />
    );
  },
};
