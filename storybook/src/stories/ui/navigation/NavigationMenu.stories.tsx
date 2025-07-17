import type { Meta, StoryObj } from '@storybook/react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@common/ui';

const meta: Meta<typeof NavigationMenu> = {
  title: 'UI/Navigation/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    docs: {
      description: {
        component:
          '상단 내비게이션 또는 탭 UI에 적합한 컴포넌트입니다. `menus` props 또는 `children`으로 메뉴 항목을 유연하게 구성할 수 있습니다.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'NavigationMenu 리스트 방향을 설정합니다. 기본값은 horizontal 입니다.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    className: {
      control: 'text',
      description: '`NavigationMenuRoot`에 적용할 Tailwind 클래스 혹은 커스텀 className을 설정합니다.',
    },
    itemClassName: {
      control: 'text',
      description: '각 `NavigationMenuItem`에 적용할 className 입니다.',
    },
    linkClassName: {
      control: 'text',
      description: '각 `NavigationMenuLink`에 적용할 className 입니다.',
    },
    menus: {
      control: false,
      description:
        '`trigger`, `items`, `link` 등을 포함한 메뉴 구성을 정의합니다. 드롭다운 또는 직접 링크 형태를 만들 수 있습니다.',
    },
    children: {
      control: false,
      description: '`menus` 대신 직접 구성 요소(children)를 사용할 수 있습니다. 자유로운 UI 구성이 가능합니다.',
    },
  },
  render: (args) => (
    <div className="h-48">
      <NavigationMenu {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

// ✅ 기본 메뉴
export const Default: Story = {
  args: {
    menus: [
      {
        trigger: '메뉴 1',
        items: [
          { label: '서브메뉴 1-1', href: '/menu1-1' },
          { label: '서브메뉴 1-2', href: '/menu1-2' },
        ],
      },
      {
        trigger: '메뉴 2',
        items: [
          { label: '서브메뉴 2-1', href: '/menu2-1' },
          { label: '서브메뉴 2-2', href: '/menu2-2' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '가장 기본적인 `NavigationMenu` 사용 예시입니다.',
      },
    },
  },
};

// ✅ 메뉴 너비 조절
export const WidthSize: Story = {
  args: {
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`width` prop을 사용하여 각 드롭다운의 너비를 픽셀 단위로 조정할 수 있습니다. 아래는 200px, 300px, 400px 드롭다운의 비교 예시입니다.',
      },
    },
  },
  render: () => (
    <div className="flex gap-8 p-8 h-48">
      {[
        { width: '200px', label: '너비 200px' },
        { width: '300px', label: '너비 300px' },
        { width: '400px', label: '너비 400px' },
      ].map(({ width, label }) => (
        <div key={width}>
          <p className="text-sm font-bold mb-2">{label}</p>
          <NavigationMenu
            menus={[
              {
                trigger: `메뉴 (${width})`,
                width,
                items: [
                  { label: '옵션 A', href: '/a' },
                  { label: '옵션 B', href: '/b' },
                  { label: '옵션 C', href: '/c' },
                ],
              },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

// ✅ 링크 메뉴
export const WithLinkMenu: Story = {
  args: {
    orientation: 'horizontal',
    menus: [
      {
        link: '/direct',
        trigger: '바로가기 링크',
      },
      {
        trigger: '드롭다운',
        items: [
          { label: '항목 1', href: '/item1' },
          { label: '항목 2', href: '/item2' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '`link` 타입 메뉴는 드롭다운 없이 직접 링크로 이동합니다.',
      },
    },
  },
};

// ✅ 비활성화된 메뉴
export const DisabledTrigger: Story = {
  args: {
    orientation: 'horizontal',
    menus: [
      {
        trigger: '비활성 메뉴',
        disabled: true,
        items: [
          { label: '사용 안 함', href: '#', disabled: true },
          { label: '사용 가능', href: '/active' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '`disabled`를 설정하면 trigger가 비활성화되어 선택할 수 없습니다.',
      },
    },
  },
};

export const DisabledItem: Story = {
  args: {
    orientation: 'horizontal',
    menus: [
      {
        trigger: '메뉴',
        items: [
          { label: '사용 안 함', href: '#', disabled: true },
          { label: '사용 가능', href: '/active' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '`disabled`를 설정하면 항목이 비활성화되어 선택할 수 없습니다.',
      },
    },
  },
};

// ✅ children을 직접 구성
export const WithChildren: Story = {
  render: () => (
    <div className="h-48">
      <NavigationMenu>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Link Default</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[300px]">
            <ul className="grid gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <a href="#">Link One</a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" disabled>
                  Link One-1
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Link One-2</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <div>
              <a href="/docs">Docs</a>
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-4">
              <NavigationMenuLink asChild>
                <a href="#">Link 2</a>
              </NavigationMenuLink>
              <li>
                <NavigationMenuLink href="#">Link 2</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Link 2</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story:
          '`menus` props 대신, `children`을 사용하여 자유롭게 메뉴를 구성할 수 있습니다. 버튼, 링크 등 원하는 요소를 직접 배치할 수 있습니다.',
      },
    },
  },
};
