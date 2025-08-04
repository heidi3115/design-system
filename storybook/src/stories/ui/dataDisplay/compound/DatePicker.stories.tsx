'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@common/ui';
import { EyeIcon } from '@common/ui/icons';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DataDisplay/Compound/DatePicker/DatePicker',
  component: DatePicker,
  args: {
    timeType: 'date',
  },
  argTypes: {
    timeType: {
      control: { type: 'radio' },
      options: ['date', 'hour', 'minute', 'second'],
      description: '시간 선택 단위를 지정합니다.',
    },
    date: {
      control: false,
      description: '컨트롤 모드에서 선택된 날짜입니다.',
    },
    defaultDate: {
      control: false,
      description: '언컨트롤드 모드에서 초기 날짜입니다.',
    },
    onDateChange: {
      control: false,
      description: '날짜가 선택되었을 때 호출되는 콜백입니다.',
    },
    dateRef: {
      control: false,
      description: '날짜 값을 외부에서 참조할 수 있도록 하는 ref입니다.',
    },
    classNames: {
      control: false,
      description: 'input, calendar, popover 의 각각의 className을 추가 설정 할수 있습니다.',
    },
    onConditionRequestCallback: {
      control: false,
      description: '선택 시 확인 다이얼로그를 띄울 조건을 설정하는 콜백입니다.',
    },
    conditionContent: {
      control: false,
      description: '다이얼로그 내에 표시할 커스텀 콘텐츠입니다.',
    },
    inputProps: {
      control: false,
      description: 'input 컴포넌트의 props를 확장하여 설정 가능합니다. `iconProp | placeholder`제외',
    },
    popoverProps: {
      control: false,
      description:
        'popover 컴포넌트의 props를 확장하여 설정 가능합니다. `isArrow | side | align | sideOffset | alignOffset`만 가능',
    },
    calendarProps: {
      control: false,
      description:
        'calendar 관련 설정을 위한 props를 확장하여 설정 가능합니다. `mode` | `dialogOpen` | `onDialogConfirm` | `onDialogCancel` | `dialogContent` | `disabled` 제외',
    },
    disabled: {
      description: 'Input 컴포넌트의 disabled를 설정 합니다.',
    },
    disabledCalendar: {
      control: false,
      description: 'Calendar 컴포넌트의 disabled의 범위를 설정 합니다.',
    },
  },
  parameters: {
    controls: {
      include: [
        'timeType',
        'date',
        'defaultDate',
        'onDateChange',
        'dateRef',
        'inputProps',
        'onConditionRequestCallback',
        'conditionContent',
        'classNames',
        'className',
        'popoverProps',
        'calendarProps',
        'inputProps',
        'disabled',
        'disabledCalendar',
      ],
    },
    docs: {
      description: {
        component: [
          '`DatePicker`는 날짜 또는 날짜+시간을 입력하는 데 사용되는 컴포넌트입니다.',
          '`Calendar`와 `CalendarTime` 컴포넌트를 내부적으로 활용하며, `timeType`을 통해 시간 단위를 제어할 수 있습니다.',
          '또한, 입력값 직접 수정, 조건부 확인 다이얼로그 등 다양한 UX 요소를 제공합니다.',
          '(입력값 직접 수정시에는 키보드 방향키로 year, month, day...  이동 및 값 수정 가능 합니다.)',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

/* ---- 기본 날짜 선택 ---- */
export const Default: Story = {
  name: 'Default',
  args: {
    defaultDate: new Date(2025, 6, 10),
  },
  parameters: {
    docs: {
      description: {
        story: '`defaultDate`를 통해 언컨트롤드 모드로 사용할 수 있는 기본 날짜 선택 예시입니다.',
      },
    },
  },
};

/* ---- 시간 타입 선택 ---- */
export const Minute: Story = {
  name: 'Minute',
  args: {
    timeType: 'minute',
    defaultDate: new Date(2025, 6, 10, 14, 30),
  },
  parameters: {
    docs: {
      description: {
        story:
          '`timeType`을 `Minute`로 설정하여 시간까지 선택 가능한 예시입니다. 내부적으로 `CalendarTime`이 사용됩니다.',
      },
    },
  },
};

export const Second: Story = {
  name: 'Second',
  args: {
    timeType: 'second',
    defaultDate: new Date(2025, 6, 10, 14, 30),
  },
  parameters: {
    docs: {
      description: {
        story:
          '`timeType`을 `Second`로 설정하여 시간까지 선택 가능한 예시입니다. 내부적으로 `CalendarTime`이 사용됩니다.',
      },
    },
  },
};

export const Hour: Story = {
  name: 'Hour',
  args: {
    timeType: 'hour',
    defaultDate: new Date(2025, 6, 10, 14, 30),
  },
  parameters: {
    docs: {
      description: {
        story:
          '`timeType`을 `Hour`로 설정하여 시간까지 선택 가능한 예시입니다. 내부적으로 `CalendarTime`이 사용됩니다.',
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    defaultDate: new Date(2025, 6, 10),
    disabled: true,
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '`disabled`를 사용해 Input 및 팝오버 전체를 비활성화하는 예시입니다.',
      },
    },
  },
};

function DisabledCalendarStory() {
  return (
    <DatePicker
      defaultDate={new Date(2025, 6, 10)}
      disabledCalendar={{ before: new Date(2025, 6, 5), after: new Date(2025, 6, 15) }}
    />
  );
}

export const DisabledCalendar: Story = {
  render: DisabledCalendarStory,
  name: 'Disabled Calendar',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: [
          'calendarProps.disabled`를 설정하여 캘린더에서 선택할 수 있는 날짜 범위를 제한할 수 있습니다.',
          '{ before: new Date(2025, 6, 5), after: new Date(2025, 6, 15) }',
          '(25-07-05 ~ 25-07-15 만 활성화)',
        ].join('<br/>'),
      },
    },
  },
};

export const WithIconAndNoUnderline: Story = {
  args: {
    defaultDate: new Date(2025, 6, 10),
    inputProps: {
      underline: 'none',
      iconLeft: EyeIcon,
    },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `\`inputProps\`를 통해 입력창의 스타일을 설정할 수 있습니다.

- \`underline: 'none'\`을 지정하면 밑줄이 제거된 스타일을 사용할 수 있습니다.
- \`iconLeft\`를 설정하면 입력창 왼쪽에 아이콘이 표시됩니다.`,
      },
    },
  },
};

/* ---- 날짜 확인 다이얼로그 ---- */
function WithConditionStory() {
  return (
    <DatePicker
      defaultDate={new Date(2025, 6, 10, 10, 0)}
      timeType="minute"
      onConditionRequestCallback={(selected) => selected.getDay() === 0} // 일요일만 확인
      conditionContent={(selected) => `${selected?.toLocaleDateString()}는 일요일입니다. 선택하시겠습니까?`}
    />
  );
}

export const WithCondition: Story = {
  render: WithConditionStory,
  name: 'With Condition Dialog',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: [
          '`onConditionRequestCallback`과 `conditionContent`를 사용하여 특정 조건일 경우 다이얼로그를 띄우는 예시입니다.',
          '일요일을 선택하면 다이얼로그가 열립니다.',
        ].join('<br/>'),
      },
    },
  },
};
