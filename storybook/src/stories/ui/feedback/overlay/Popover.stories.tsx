'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useEffect, useRef, useState } from 'react';
import { Button, Input, Popover } from '@common/ui';

const sideOptions: ComponentProps<typeof Popover>['side'][] = ['top', 'left', 'bottom', 'right'] as const;
const alignOptions: ComponentProps<typeof Popover>['align'][] = ['start', 'center', 'end'] as const;
const variantOptions = ['default', 'primary', 'secondary', 'error'] as const;
const sizeOptions = ['small', 'basic', 'medium', 'large'] as const;

const meta: Meta<typeof Popover> = {
  title: 'UI/Feedback/Overlay/Popover',
  component: Popover,
  args: {
    side: 'bottom',
    align: 'center',
    variant: 'default',
    size: 'basic',
    isCloseIcon: false,
    isArrow: false,
    trigger: <Button>Open Popover</Button>,
    children: <div>This is Popover content</div>,
  },
  argTypes: {
    side: {
      control: { type: 'select' },
      options: sideOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'bottom' } },
      description: 'Popover가 기준 요소에 붙는 위치를 설정합니다.',
    },
    align: {
      control: { type: 'select' },
      options: alignOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'center' } },
      description: 'Popover가 기준 요소에 수평 또는 수직 정렬되는 방식을 지정합니다.',
    },
    variant: {
      control: { type: 'select' },
      options: variantOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description: 'Popover의 스타일 변형을 선택합니다.',
    },
    size: {
      control: { type: 'select' },
      options: sizeOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'basic' } },
      description: 'Popover 최소 크기(높이/너비 등)를 설정합니다.',
    },
    isCloseIcon: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: 'Popover에 닫기 아이콘 표시 여부를 설정합니다.',
    },
    isArrow: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: 'Popover에 화살표(꼬리표) 표시 여부를 설정합니다.',
    },
    trigger: {
      control: { disable: true },
      table: { type: { summary: 'ReactNode' } },
      description: 'Popover를 열고 닫는 trigger 요소입니다. storybook의 control 에서 조작할 수 없습니다.',
    },
    children: {
      control: { disable: true },
      table: { type: { summary: 'ReactNode' } },
      description: 'Popover 내부에 렌더링되는 콘텐츠입니다. storybook의 control 에서의 조작이 비활성화 되어있습니다.',
    },
    portalContainer: {
      control: { disable: true },
      table: { disable: true },
      description: 'Popover를 렌더링할 포털 컨테이너 DOM 요소입니다. storybook 에서 숨겨져 있습니다.',
    },
    anchorRef: {
      control: { disable: true },
      table: { disable: true },
      description: 'Popover가 기준으로 삼는 요소의 참조입니다. storybook 에서 숨겨져 있습니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '기본 Popover 컴포넌트 문서',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover 기본 컴포넌트입니다.',
      },
    },
  },
};

export const Arrows: Story = {
  argTypes: {
    isArrow: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover 꼬리표 유무를 보여주는 예제입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-10 justify-center p-25">
      {/* isArrow: true */}
      <Popover {...args} isArrow={true} trigger={<Button variant="gradient">Arrow 있음</Button>}>
        <div className="p-2">Popover with Arrow</div>
      </Popover>

      {/* isArrow: false */}
      <Popover {...args} isArrow={false} trigger={<Button variant="gradient">Arrow 없음</Button>}>
        <div className="p-2">Popover without Arrow</div>
      </Popover>
    </div>
  ),
};

export const CloseIcon: Story = {
  argTypes: {
    isCloseIcon: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover 닫기 버튼 유무를 보여주는 예제입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-10 justify-center p-25">
      <Popover {...args} isCloseIcon={true} trigger={<Button variant="gradient">Close Icon 있음</Button>}>
        <div className="p-2">With Close Icon</div>
      </Popover>

      <Popover {...args} isCloseIcon={false} trigger={<Button variant="gradient">Close Icon 없음</Button>}>
        <div className="p-2">Without Close Icon</div>
      </Popover>
    </div>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover 사이즈 옵션을 보여주는 예제입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap justify-between">
      {['small', 'basic', 'medium', 'large'].map((size) => (
        <Popover
          key={size}
          {...args}
          trigger={<Button variant="primary">{`Size: ${size}`}</Button>}
          size={size as 'small' | 'basic' | 'medium' | 'large'}>
          <div>{`This is a ${size} popover.`}</div>
        </Popover>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover 색상 변형을 보여주는 예제입니다.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap justify-between">
      {['default', 'primary', 'secondary', 'error'].map((variant) => (
        <Popover
          key={variant}
          {...args}
          trigger={<Button variant="primary">{`Color: ${variant}`}</Button>}
          variant={variant as 'default' | 'primary' | 'secondary' | 'error'}>
          <div>{`This is a ${variant} popover.`}</div>
        </Popover>
      ))}
    </div>
  ),
};

export const PopoverPositon: Story = {
  argTypes: {
    side: {
      table: { disable: true },
    },
    align: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover의 12가지 방향을 보여주는 예제입니다.',
      },
    },
  },
  render: (args) => (
    <div className="w-full p-4 flex flex-col gap-4 rounded">
      <div className="w-full p-4 flex flex-col gap-4 rounded">
        <h3 className="text-xl font-bold">side와 align의 다양한 위치의 예시</h3>
        <div className="relative w-full flex flex-col gap-4 p-4 border min-w-3xl rounded">
          <h4>
            <span className="text-blue-500 text-left block mb-1 font-medium">
              side와 align의 모든 조합으로 각 버튼 클릭 시 위치를 확인할 수 있습니다. <br />
            </span>
          </h4>
          <div className="flex flex-col gap-4 p-4 rounded relative min-h-[560px]">
            {sideOptions.map((side) => (
              <div
                key={side}
                className={`flex flex-col gap-4 p-4 absolute -translate-x-1/2 -translate-y-1/2 ${
                  side === 'top'
                    ? 'left-[48%] top-[20%]'
                    : side === 'left'
                      ? 'left-[18%] top-[50%]'
                      : side === 'bottom'
                        ? 'left-[48%] top-[78%]'
                        : 'right-[2%] top-[50%]'
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
                          <Button className="w-24 text-xs" variant="gradient">
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
  ),
};

const AnchorRefComp = ({ ...args }) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-[200px] border border-dashed border-gray-400 p-8">
      <div ref={anchorRef} className="absolute top-8 right-8">
        Anchor Popover
      </div>

      <Popover {...args} anchorRef={anchorRef} trigger={<Button>Anchor</Button>}>
        AnchorRef로 Open
      </Popover>
    </div>
  );
};

export const AnchorRef: Story = {
  render: (args) => <AnchorRefComp {...args} />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Popover의 trigger로 다른 컴포넌트에 콘텐츠를 보여주는 예제입니다.',
      },
    },
  },
  args: {
    variant: 'secondary',
  },
};

function PortalComp() {
  const portalRef = useRef<HTMLDivElement | null>(null);

  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (portalRef.current) {
      setPortalContainer(portalRef.current);
    }
  }, []);

  return (
    <div ref={portalRef} className="flex justify-between">
      <Popover trigger={<Button>Portal Popover</Button>} portalContainer={portalContainer}>
        <div className="relative p-4 text-sm">This Popover is rendered inside the portal container.</div>
      </Popover>
      <Popover trigger={<Button>Normal Popover</Button>}>
        <div className="p-4 text-sm">This Popover is rendered body container.</div>
      </Popover>
    </div>
  );
}

export const WithPortalContainer: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover를 document.body 대신 커스텀 포털에 렌더링하는 예제입니다.',
      },
    },
  },
  render: () => <PortalComp />,
};

function OffsetComp(args: ComponentProps<typeof Popover>) {
  const [sideOffset, setSideOffset] = useState(6);
  const [alignOffset, setAlignOffset] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-20">
      {/* Offset Controls */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <span>Side Offset</span>
          <Input type="number" value={sideOffset} onChange={(e) => setSideOffset(Number(e.target.value))} />
        </div>
        <div className="flex flex-col gap-1">
          <span>Align Offset</span>
          <Input type="number" value={alignOffset} onChange={(e) => setAlignOffset(Number(e.target.value))} />
        </div>
      </div>

      {/* Popover Example */}
      <Popover open sideOffset={sideOffset} alignOffset={alignOffset} className="p-6" {...args}>
        <div>Offset 조정 가능한 Popover 입니다.</div>
      </Popover>
    </div>
  );
}

export const OffsetController: Story = {
  argTypes: {
    sideOffset: {
      table: { disable: true },
    },
    alignOffset: {
      table: { disable: true },
    },
  },
  args: {
    side: 'right',
    align: 'start',
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover의 sideOffset과 alignOffset을 조절하는 예제입니다.',
      },
    },
  },
  render: (args) => <OffsetComp {...args} trigger={<Button>Popover</Button>} />,
};
