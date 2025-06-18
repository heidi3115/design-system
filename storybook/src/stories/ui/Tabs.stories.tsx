import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, Tabs } from '@common/ui';

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
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'ghost'],
    },
    shape: {
      control: 'select',
      options: ['underline', 'badge', 'folder'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabs = [
  {
    value: 'tab1',
    label: '탭 1',
    content: (
      <div className="bg-juiBackground-paper w-full min-h-[200px] flex flex-col gap-4 p-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    ),
  },
  {
    value: 'tab2',
    label: '탭 2',
    content: (
      <div className="bg-juiBackground-paper w-full min-h-[200px] flex flex-col gap-4 p-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    ),
  },
  {
    value: 'tab3',
    label: '탭 3',
    content: (
      <div className="bg-juiBackground-paper w-full min-h-[200px] flex flex-col gap-4 p-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs,
    defaultValue: 'tab1',
  },
};

export const FolderShape: Story = {
  args: {
    tabs,
    shape: 'folder',
    defaultValue: 'tab1',
  },
};

export const BadgeVariant: Story = {
  args: {
    tabs,
    shape: 'badge',
    variant: 'secondary',
    defaultValue: 'tab2',
  },
};

export const Sizes: Story = {
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
    </div>
  ),
  args: {
    tabs,
    defaultValue: 'tab1',
  },
};

export const Variants: Story = {
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
        <div className="mb-2 text-lg font-semibold">Ghost</div>
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
