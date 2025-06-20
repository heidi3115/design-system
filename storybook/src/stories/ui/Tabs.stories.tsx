import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, Tabs } from '@common/ui';
import { useState, type ComponentProps } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <div className="bg-juiBackground-default p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'ghost'],
      table: { defaultValue: { summary: 'primary' } },
      description: 'Tabs의 색상을 지정합니다. (primary | secondary | error | ghost)',
    },
    shape: {
      control: 'select',
      options: ['underline', 'badge', 'folder', 'text'],
      description: 'Tabs의 모양을 지정합니다. (underline | badge | folder | text)',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'full'],
      table: { defaultValue: { summary: 'left' } },
      description: 'Tabs의 정렬을 지정합니다. (left | center | right | full)',
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'medium', 'large'],
      description: 'Tabs의 높이 및 폰트 크기를 지정합니다. (default | small | medium | large)',
    },
    maxWidth: {
      control: 'number',
      table: { defaultValue: { summary: '360' } },
      description: '각각의 탭의 최대 넓이를 적용합니다.',
    },
  },
};

function ScenarioList(props: { scenarioId: number }) {
  return (
    <div className="bg-juiBackground-paper w-full min-h-[200px] flex flex-col gap-4 p-4">
      Scenario {props.scenarioId}
    </div>
  );
}

function ComplexScenario(props: { name: string }) {
  return (
    <div className="bg-juiBackground-paper w-full min-h-[200px] flex flex-col gap-4 p-4">Complex {props.name}</div>
  );
}

const DefaultContent = () => (
  <div className="bg-juiBackground-paper w-full min-h-[200px] flex flex-col gap-4 p-4">
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabs = [
  {
    value: 'tab1',
    label: 'TAB 1',
    content: <DefaultContent />,
  },
  {
    value: 'tab2',
    label: 'TAB 2',
    content: <DefaultContent />,
  },
  {
    value: 'tab3',
    label: 'TAB 3',
    content: <DefaultContent />,
  },
];

const componentTabs = [
  {
    value: 'scenario',
    label: 'Scenario',
    component: ScenarioList,
    props: { scenarioId: 1 },
  },
  {
    value: 'complex',
    label: 'Complex',
    component: ComplexScenario,
    props: { name: 'Test' },
  },
];

const stateTabs = [
  {
    value: 'exception',
    label: 'Exception',
  },
  {
    value: 'target',
    label: 'Target',
  },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs 기본 content로 탭컨텐츠 구성',
      },
    },
  },
  args: {
    tabs,
  },
};

export const ComponentDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs 기본 component로 탭컨텐츠 구성',
      },
    },
  },
  args: {
    tabs: componentTabs,
  },
};

const StateManagedTabsComp = (args: ComponentProps<typeof Tabs>) => {
  const [activeTab, setActiveTab] = useState(args.defaultValue || 'exception');

  return (
    <div className="flex flex-col">
      <Tabs {...args} tabs={stateTabs} defaultValue={activeTab} onValueChange={(val) => setActiveTab(val)} />
      {activeTab === 'exception' && (
        <div className="bg-juiBackground-paper w-full min-h-[200px] flex flex-col gap-4 p-4">
          {'activeTab === "exception"'}
        </div>
      )}
      {activeTab === 'target' && (
        <div className="bg-juiBackground-paper w-full min-h-[200px] flex flex-col gap-4 p-4">
          {'activeTab === "target"'}
        </div>
      )}
    </div>
  );
};

export const StateManagedTabs: Story = {
  render: (args) => <StateManagedTabsComp {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Tabs 기본 onValueChange로 활성탭 state로 조건부 렌더링으로 탭컨텐츠 구성',
      },
    },
  },
  args: {
    tabs: stateTabs,
    defaultValue: 'exception',
    shape: 'underline',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs Disabled 된 탭 (hidden 옵션을 넣으면 탭 자체가 나타나지 않음)',
      },
    },
  },
  args: {
    tabs: [
      {
        value: 'disabled',
        label: 'Disabled',
        disabled: true,
        content: <DefaultContent />,
      },
      {
        value: 'enabled',
        label: 'Enabled',
        content: <DefaultContent />,
      },
      {
        value: 'hidden',
        label: 'Hidden',
        hidden: true,
      },
    ],
  },
};

export const Badge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs Badge 모양 탭',
      },
    },
  },
  argTypes: {
    shape: {
      table: { disable: true },
    },
  },
  args: {
    tabs,
    shape: 'badge',
  },
};

export const Folder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs Folder 모양 탭 (align 과 variant 조절 불가능, 액티브 컬러는 classname으로 직접 설정)',
      },
    },
  },
  argTypes: {
    shape: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    align: {
      table: { disable: true },
    },
  },
  args: {
    tabs,
    shape: 'folder',
  },
};

export const Text: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs Text 모양 탭',
      },
    },
  },
  argTypes: {
    shape: {
      table: { disable: true },
    },
  },
  args: {
    tabs,
    shape: 'text',
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs Variants 색상변경',
      },
    },
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-10">
      <div>
        <div className="mb-2 text-lg font-semibold">Primary</div>
        <Tabs {...args} variant="primary" />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Secondary</div>
        <Tabs {...args} variant="secondary" />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Error</div>
        <Tabs {...args} variant="error" />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Ghost(variant 및 shape의 설정을 무시하고 흰색으로 강조)</div>
        <Tabs {...args} variant="ghost" />
      </div>
    </div>
  ),
  args: {
    tabs,
    defaultValue: 'tab1',
    shape: 'underline',
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs Sizes 높이 및 폰트크기 변경',
      },
    },
  },
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-10">
      <div>
        <div className="mb-2 text-lg font-semibold">Defalt</div>
        <Tabs {...args} />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Small</div>
        <Tabs {...args} size="small" />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Medium</div>
        <Tabs {...args} size="medium" />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Large</div>
        <Tabs {...args} size="large" />
      </div>
    </div>
  ),
  args: {
    tabs,
    defaultValue: 'tab1',
  },
};

export const Alignments: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs align 으로 정렬 변경(folder 형태는 정렬 무시)',
      },
    },
  },
  argTypes: {
    align: {
      table: { disable: true },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-10">
      <div>
        <div className="mb-2 text-lg font-semibold">Left</div>
        <Tabs {...args} align="left" />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Center</div>
        <Tabs {...args} align="center" />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Right</div>
        <Tabs {...args} align="right" />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold">Full</div>
        <Tabs {...args} align="full" />
      </div>
    </div>
  ),
  args: {
    tabs,
    defaultValue: 'tab1',
  },
};
