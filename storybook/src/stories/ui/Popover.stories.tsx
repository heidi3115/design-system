'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useRef, type ComponentProps } from 'react';
import { Button, Popover } from '@common/ui';

const sideOptions: ComponentProps<typeof Popover>['side'][] = ['top', 'left', 'bottom', 'right'] as const;
const alignOptions: ComponentProps<typeof Popover>['align'][] = ['start', 'center', 'end'] as const;

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'basic', 'medium', 'large'],
    },
    isCloseIcon: {
      control: 'boolean',
    },
    isArrow: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button>Open Popover</Button>,
    children: <div>This is Popover content</div>,
    side: 'bottom',
    align: 'center',
    variant: 'default',
    size: 'basic',
  },
};

function PopoverPositionControl({ ...args }: ComponentProps<typeof Popover>) {
  return (
    <div className="w-full p-4 flex flex-col gap-4 rounded">
      <div className="w-full p-4 flex flex-col gap-4 rounded">
        <h3 className="text-xl font-bold">side와 align의 다양한 위치의 예시</h3>
        <div className="relative w-full flex flex-col gap-4 p-4 border  rounded">
          <h4>
            <span className="text-blue-500 text-left block mb-1 font-medium">
              side와 align의 모든 조합으로 각 버튼 클릭 시 위치를 확인할 수 있습니다. <br />
            </span>
          </h4>
          <div className="flex flex-col gap-4 p-4 rounded relative min-h-[560px]">
            {sideOptions.map((side) => (
              <div
                key={side}
                className={`flex flex-col gap-4 p-4 rounded absolute -translate-x-1/2 -translate-y-1/2 ${
                  side === 'top'
                    ? 'left-[50%] top-[20%]'
                    : side === 'left'
                      ? 'left-[22%] top-[50%]'
                      : side === 'bottom'
                        ? 'left-[50%] top-[78%]'
                        : 'left-[78%] top-[50%]'
                }`}>
                <div
                  className={`grid ${
                    side === 'top' || side === 'bottom' ? 'grid-cols-3 gap-20' : 'grid-rows-3 gap-20'
                  }`}>
                  {alignOptions.map((align) => (
                    <div key={align}>
                      <Popover
                        {...args}
                        side={side}
                        align={align}
                        trigger={
                          <Button size="small" variant="gradient">
                            {side}-{align}
                          </Button>
                        }>
                        <div className="p-2 text-sm">
                          <div>
                            side: {side}
                            <br />
                            align: {align}
                          </div>
                        </div>
                      </Popover>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const PopoverPositon: Story = {
  render: (args) => <PopoverPositionControl {...args} />,
};

export const WithDifferentSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {['small', 'basic', 'medium', 'large'].map((size) => (
        <Popover
          key={size}
          {...args}
          trigger={<Button>{`Size: ${size}`}</Button>}
          size={size as 'small' | 'basic' | 'medium' | 'large'}>
          <div>{`This is a ${size} popover.`}</div>
        </Popover>
      ))}
    </div>
  ),
  args: {
    side: 'bottom',
    align: 'center',
    variant: 'secondary',
  },
};

const AnchorRefExample = ({ ...args }) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-[200px] border border-dashed border-gray-400 p-8">
      <div ref={anchorRef} className="absolute top-8 right-8">
        Anchor Popover
      </div>

      <Popover {...args} anchorRef={anchorRef} trigger={<Button>Anchor</Button>}>
        AnchorRef로 오픈
      </Popover>
    </div>
  );
};

export const WithAnchorRef: Story = {
  render: (args) => <AnchorRefExample {...args} />,
  args: {
    variant: 'secondary',
  },
};
