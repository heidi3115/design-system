import type { Meta, StoryObj } from '@storybook/react';
import type { DropdownOption } from '@common/ui/components/DropdownMenu/DropdownMenu';
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@common/ui';
import { useState } from 'react';

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI/Form/Selection/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component: [
          '사용자에게 선택 옵션 목록을 제공하는 다용도 드롭다운 메뉴 컴포넌트입니다.',
          '`options` prop을 통해 동적으로 메뉴를 생성하거나, 자식 요소를 직접 구성하여 커스텀 메뉴를 만들 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'trigger 기준 드롭다운의 가로 정렬을 설정합니다.',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'trigger 기준 드롭다운이 나타날 방향을 설정합니다.',
    },
    size: {
      control: 'number',
      description: '드롭다운 컨텐츠의 넓이를 px 단위로 설정합니다.',
    },
    itemHeight: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: '드롭다운 아이템의 높이를 설정합니다.',
    },
    trigger: {
      control: false,
      description: 'DropdownMenu를 열고 닫는 trigger 요소이며, 컨트롤러에서 조작할 수 없습니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// 기본 옵션
const baseOptions: DropdownOption[] = [
  { label: 'Profile', value: 'profile' },
  { label: 'Billing', value: 'billing' },
  { type: 'separator' },
  {
    type: 'sub',
    label: 'Team',
    items: [
      { label: 'Invite by email', value: 'invite-email' },
      { label: 'Invite by link', value: 'invite-link' },
    ],
  },
  { type: 'separator' },
  { label: 'Logout', value: 'logout' },
];

// ✅ 기본 스토리
export const Default: Story = {
  args: {
    options: baseOptions,
  },
  parameters: {
    docs: {
      description: {
        story:
          '가장 기본적인 `DropdownMenu`의 사용 예시입니다. `options` prop에 메뉴 구조를 배열로 전달하여 간단하게 생성할 수 있습니다.',
      },
    },
  },
};

// ✅ 넓이 조절
export const WidthSize: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
  argTypes: {
    size: {
      table: { size: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '`size` prop을 사용하여 드롭다운 메뉴의 너비를 고정값으로 설정할 수 있습니다. 이 예시에서는 200px, 300px, 400px 너비의 차이를 보여줍니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold mb-2">고정 너비: 200px</p>
        <DropdownMenu {...args} size={200} />
      </div>

      <div>
        <p className="text-sm font-bold mb-2">고정 너비: 300px</p>
        <DropdownMenu {...args} size={300} />
      </div>

      <div>
        <p className="text-sm font-bold mb-2">고정 너비: 400px</p>
        <DropdownMenu {...args} size={400} />
      </div>
    </div>
  ),
};

export const ItemHeight: Story = {
  args: {
    options: baseOptions,
  },
  argTypes: {
    size: {
      table: { itemHeight: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '`itemHeight` prop을 `small`, `default`, `large`로 설정하여 메뉴 아이템의 높이를 조절할 수 있습니다. 각 옵션에 따른 높이 차이를 시각적으로 비교합니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold mb-2">아이템 높이 small 28px</p>
        <DropdownMenu {...args} itemHeight="small" />
      </div>

      <div>
        <p className="text-sm font-bold mb-2">아이템 높이 default 32px</p>
        <DropdownMenu {...args} itemHeight="default" />
      </div>

      <div>
        <p className="text-sm font-bold mb-2">아이템 높이 large 36px</p>
        <DropdownMenu {...args} itemHeight="large" />
      </div>
    </div>
  ),
};

// ✅ 정렬과 방향 조절
// ✅ 정렬과 방향 조절 (모든 조합 비교)
export const PlacementOptions: Story = {
  // render 함수에서 모든 조합을 직접 렌더링하므로,
  // 특정 args 값을 기본으로 설정할 필요가 없습니다.
  // options만 기본값으로 가져갑니다.
  args: {
    options: baseOptions,
  },
  // 이 storybook 에서는 render 함수가 side 와 align 을 직접 제어하므로,
  // Storybook Controls 패널에서 이 두 가지 prop을 비활성화하여 혼동을 방지합니다.
  argTypes: {
    align: {
      table: {
        disable: true,
      },
    },
    side: {
      table: {
        disable: true,
      },
    },
  },
  // 스토리 설명을 수정하여 이 스토리의 목적을 명확히 합니다.
  parameters: {
    docs: {
      description: {
        story:
          '`side`와 `align` prop의 모든 조합을 그리드 형태로 렌더링하여 각 옵션이 드롭다운 위치에 미치는 영향을 한눈에 비교하고 테스트할 수 있습니다.',
      },
    },
  },
  // render 함수를 사용하여 커스텀 레이아웃을 구성합니다.
  render: (args) => {
    // 제어할 prop 들의 옵션을 배열로 정의합니다.
    const sides: ('top' | 'right' | 'bottom' | 'left')[] = ['top', 'right', 'bottom', 'left'];
    const aligns: ('start' | 'center' | 'end')[] = ['start', 'center', 'end'];

    return (
      // CSS Grid를 사용하여 4x3 레이아웃을 만듭니다.
      // 각 드롭다운이 열렸을 때 서로 겹치지 않도록 충분한 간격(gap)을 줍니다.
      <div className="grid grid-cols-3 gap-y-20 gap-x-8 place-items-center py-10">
        {/* sides와 aligns 배열을 순회하며 모든 조합에 대한 DropdownMenu를 렌더링합니다. */}
        {sides.map((side) =>
          aligns.map((align) => (
            <div key={`${side}-${align}`} className="flex flex-col items-center gap-2">
              {/* 현재 조합을 텍스트로 표시합니다. */}
              <p className="text-sm font-bold  px-2 py-1 rounded">{`side: "${side}", align: "${align}"`}</p>
              {/* DropdownMenu 컴포넌트에 현재 순회의 side와 align 값을 전달합니다. */}
              <DropdownMenu {...args} side={side} align={align} />
            </div>
          )),
        )}
      </div>
    );
  },
};

// ✅ 체크박스 아이템
type OptionItem = {
  type?: 'item' | 'check';
  label: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
};
const initialCheckOptions: OptionItem[] = [
  { type: 'check', label: '이메일로 알림', value: 'email', checked: true },
  { type: 'check', label: 'SMS로 알림', value: 'sms' },
];

// Storybook Story 정의
const WithCheckboxItems = () => {
  const [options, setOptions] = useState<OptionItem[]>(initialCheckOptions);

  const handleOptionChange = (selected: OptionItem) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => (option.value === selected.value ? { ...selected } : option)),
    );
  };

  return (
    <div>
      {/* 스토리북 'docs' 탭에 표시될 설명을 여기에 추가합니다. */}
      <p>
        **설명:** 이 드롭다운은 여러 알림 방식을 선택할 수 있는 체크박스 아이템을 포함합니다. 각 아이템의 선택 상태는
        React의 **`useState` 훅**을 통해 관리되며, 사용자의 선택에 따라 실시간으로 UI가 업데이트됩니다. 아래에서 현재
        선택된 항목들을 확인할 수 있습니다.
      </p>
      <DropdownMenu options={options} onItemSelect={handleOptionChange} />
      <h3>현재 선택된 항목:</h3>
      {options.filter((option) => option.checked).length > 0 ? (
        <ul>
          {options
            .filter((option) => option.checked)
            .map((option) => (
              <li key={option.value}>{option.label}</li>
            ))}
        </ul>
      ) : (
        <p>선택된 항목이 없습니다.</p>
      )}
    </div>
  );
};

export const WithCheckbox: Story = {
  render: () => <WithCheckboxItems />,
};

// ✅ 자식으로 직접 구성
export const WithChildren: Story = {
  render: () => (
    <DropdownMenu trigger={<Button>Custom Content</Button>} size={300}>
      <DropdownMenuItem>Custom</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Sub A</DropdownMenuItem>
          <DropdownMenuItem>Sub B</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenu>
  ),
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story:
          '`options` prop 대신, `DropdownMenu`의 자식(children)으로 `DropdownMenuItem`, `DropdownMenuSub` 등의 컴포넌트를 직접 조합하여 메뉴를 구성하는 방법입니다. 이를 통해 더 높은 자유도로 복잡한 메뉴 구조를 만들 수 있습니다.',
      },
    },
  },
};
