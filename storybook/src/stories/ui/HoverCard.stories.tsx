import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@common/ui/lib/utils.ts';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CountBadge,
  HoverCard,
  hoverCardVariants,
} from '@common/ui';
import { AlertCircleIcon, AlertTriangleFilledIcon, InfoIcon } from '@common/ui/icons';
import type { ComponentProps } from 'react';

const titleCommonClass = 'text-juiText-primary font-bold';
const subTitleCommonClass = 'text-juiText-primary font-semibold';
const normalTxtClass = 'text-juiText-primary font-normal';
const blueTxtClass = 'text-juiText-blue font-normal';
const commonBoxClass = 'items-center justify-center text-juiText-primary';
const flexColBoxGap4 = 'relative flex flex-col gap-4 text-juiText-primary';
const flexRowBoxGap4 = 'relative flex flex-row gap-4 text-juiText-primary';

const DEFAULT_SIDE_OFFSET = 6;
const DEFAULT_ALIGN_OFFSET = 0;
const DEFAULT_OPEN_DELAY_MS = 700;
const DEFAULT_CLOSE_DELAY_MS = 300;

const triggerMap = {
  btnTrigger: <Button variant={'gradient'}>trigger Btn</Button>,
  btnAlertTriangle: (
    <Button variant={'transparent'}>
      <AlertTriangleFilledIcon size={'small'} />
    </Button>
  ),
  AlertCircleIcon: <AlertCircleIcon size={'small'} />,
  btnIcon: (
    <Button variant={'secondary'}>
      Info <InfoIcon />
    </Button>
  ),
  countBadge: <CountBadge color={'scoreAlert'} scoreVal={20} maxVal={10} isBtn />,
  linkTrigger: (
    <a href={'./'} className={'hover:underline active:underline focus:underline'}>
      @nextJs
    </a>
  ),
};

const childrenMap = {
  cardContent: (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <p>Card Content</p>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
  profile: (
    <div className={cn(flexRowBoxGap4, commonBoxClass)}>
      <Avatar src={'https://github.com/vercel.png'} size={'large'} />
      <div className={cn(flexColBoxGap4, 'gap-1 w-50')}>
        <h4 className={cn(titleCommonClass, 'text-base')}>Vercel</h4>
        <p className={cn('text-juiText-secondary text-sm')}>The React Framework – created and maintained by @vercel.</p>
        <p className={cn(normalTxtClass, 'text-sx')}></p>
      </div>
    </div>
  ),
};

const sizeOptions = Object.keys(hoverCardVariants.variants.size) as Array<keyof typeof hoverCardVariants.variants.size>;
const variantOptions = Object.keys(hoverCardVariants.variants.variant) as Array<
  keyof typeof hoverCardVariants.variants.variant
>;

const sideOptions: ComponentProps<typeof HoverCard>['side'][] = ['top', 'left', 'bottom', 'right'] as const;
const alignOptions: ComponentProps<typeof HoverCard>['align'][] = ['start', 'center', 'end'] as const;

const meta: Meta<typeof HoverCard> = {
  title: 'UI/HoverCard',
  component: HoverCard,
  args: {
    size: 'small',
    variant: 'default',
    side: 'top',
    align: 'center',
    sideOffset: DEFAULT_SIDE_OFFSET,
    alignOffset: DEFAULT_ALIGN_OFFSET,
    openDelay: DEFAULT_OPEN_DELAY_MS,
    closeDelay: DEFAULT_CLOSE_DELAY_MS,
    defaultOpen: false,
    open: undefined,
    onOpenChange: undefined,
    trigger: triggerMap['btnIcon'],
    triggerClass: '',
    children: childrenMap['cardContent'],
    contentClass: '',
    openStatusRef: undefined,
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: `${sizeOptions.join(', ')}` },
        defaultValue: { summary: `${sizeOptions[0]}` },
      },
      description: [
        `HoverCard 의 크기 prop 입니다.`,
        'padding의 차등을 통한 크기 조절로서 처리하고 있습니다. custom 은 사용자의 커스텀을 할 수 있으므로, 따로 추가된 내역이 없으니 주의 바랍니다.',
        `현재 기본값은 ${sizeOptions[0]} 로 처리하고 있습니다.`,
      ].join('<br/>'),
    },
    variant: {
      control: 'select',
      options: variantOptions,
      table: {
        type: { summary: `${variantOptions.join(', ')}` },
        defaultValue: { summary: `${variantOptions[0]}` },
      },
      description: [`HoverCard 의 색상 prop 입니다.`, `현재 기본값은 ${variantOptions[0]} 로 처리하고 있습니다.`].join(
        '<br/>',
      ),
    },
    side: {
      control: 'select',
      options: sideOptions,
      table: {
        type: { summary: `${sideOptions.join(', ')}` },
        defaultValue: { summary: `${sideOptions[0]}` },
      },
      description: [
        `HoverCard 의 위치를 조절할 수 있는 prop 입니다.`,
        `현재 기본값은 ${sideOptions[0]} 로 처리하고 있습니다.`,
      ].join('<br/>'),
    },
    sideOffset: {
      control: 'number',
      table: {
        type: { summary: `${DEFAULT_SIDE_OFFSET}` },
        defaultValue: { summary: `${DEFAULT_SIDE_OFFSET}` },
      },
      description: [
        `HoverCard 의 위치의 간격을 조절할 수 있는 prop 입니다.`,
        `현재 기본값은 ${DEFAULT_SIDE_OFFSET} 로 처리하고 있습니다.`,
      ].join('<br/>'),
    },
    align: {
      control: 'select',
      options: alignOptions,
      table: {
        type: { summary: `${alignOptions.join(', ')}` },
        defaultValue: { summary: `${alignOptions[1]}` },
      },
      description: [
        `HoverCard 의 위치에서의 정렬을 조절할 수 있는 prop 입니다.`,
        `현재 기본값은 ${alignOptions[1]} 로 처리하고 있습니다.`,
      ].join('<br/>'),
    },
    alignOffset: {
      control: 'number',
      table: {
        type: { summary: `${DEFAULT_ALIGN_OFFSET}` },
        defaultValue: { summary: `${DEFAULT_ALIGN_OFFSET}` },
      },
      description: [
        `HoverCard 의 정렬의 간격을 조절할 수 있는 prop 입니다.`,
        `현재 기본값은 ${DEFAULT_ALIGN_OFFSET} 로 처리하고 있습니다.`,
      ].join('<br/>'),
    },
    openDelay: {
      control: 'number',
      table: {
        type: { summary: `${DEFAULT_OPEN_DELAY_MS}` },
        defaultValue: { summary: `${DEFAULT_OPEN_DELAY_MS}` },
      },
      description: [
        'openDelay 는 마우스를 올린 후 HoverCard 의 내용이 보이기까지의 지연 시간(ms) 입니다.',
        `HoverCard 의 내용이 보여지는 간격을 조절할 수 있는 prop 입니다.`,
        `현재 기본값은 ${DEFAULT_OPEN_DELAY_MS} 로 처리하고 있습니다.`,
      ].join('<br/>'),
    },
    closeDelay: {
      control: 'number',
      table: {
        type: { summary: `${DEFAULT_CLOSE_DELAY_MS}` },
        defaultValue: { summary: `${DEFAULT_CLOSE_DELAY_MS}` },
      },
      description: [
        'openDelay 는 마우스를 올린 후 HoverCard 의 내용이 보이기까지의 지연 시간(ms) 입니다.',
        `HoverCard 의 내용이 보여지는 간격을 조절할 수 있는 prop 입니다.`,
        `현재 기본값은 ${DEFAULT_OPEN_DELAY_MS} 로 처리하고 있습니다.`,
      ].join('<br/>'),
    },
    defaultOpen: {
      control: 'boolean',
      table: {
        type: { summary: `${false}` },
        defaultValue: { summary: `${false}` },
      },
      description: [
        'HoverCard 의 초기 열림 상태입니다. 내부적으로 상태를 관리할 때 사용합니다(Uncontrolled).',
        `현재 기본값은 ${false} 로 처리하고 있습니다.`,
      ].join('<br/>'),
    },
    open: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: `${undefined}` } },
      description: [
        'HoverCard 의 열림 상태를 제어하는 prop 으로써 외부에서 상태를 직접 관리할 때 사용합니다(Controlled).',
      ].join('<br/>'),
    },
    onOpenChange: {
      control: false,
      action: 'onOpenChange',
      description: [
        'HoverCard 의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.',
        'open prop과 함께 사용하여 상태를 외부에서 제어할 때 활용합니다.',
        '스토리에서는 제어하실 수 없습니다.',
      ].join('<br/>'),
    },
    trigger: {
      control: false,
      table: {
        type: { summary: `ReactNode | ComponentType` },
      },
    },
    triggerClass: {
      control: 'text',
      table: {
        type: { summary: `string` },
        defaultValue: { summary: '' },
      },
    },
    children: {
      control: false,
      table: {
        type: { summary: `ReactNode | ComponentType` },
      },
    },
    contentClass: {
      control: 'text',
      table: {
        type: { summary: `string` },
        defaultValue: { summary: '' },
      },
    },
    openStatusRef: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'HoverCard 컴포넌트의 문서입니다. HoverCard 컴포넌트란, 사용자가 특정 요소 위에 마우스를 올렸을 때 부가 정보를 표시하는 UI 요소 입니다.',
          '불필요한 UI 를 숨기고 필요할 때만 추가 정보를 제공하여 깔끔한 인터페이스를 구성할 때 유용합니다.',
          '트리거(trigger) 요소 및 내용(children) 요소를 자유롭게 커스터마이즈할 수 있습니다.',
          'trigger 요소 및 open 상태를 제어하거나 비제어 방식으로 사용할 수 있으며, 다양한 예시를 아래에서 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: ['기본 HoverCard 컴포넌트를 렌더링한 예시입니다.'].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexColBoxGap4, commonBoxClass, 'py-60')}>
      <HoverCard {...args} />
    </div>
  ),
};

export const Variants: Story = {
  args: {
    side: 'top',
    trigger: triggerMap['btnTrigger'],
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'HoverCard 의 색상(variant)별 예시입니다.',
          'variant prop을 통해 HoverCard의 배경색과 스타일을 변경할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexColBoxGap4)}>
      {variantOptions.map((variant) => (
        <div className={cn(flexRowBoxGap4, 'items-center', 'py-4')} key={variant}>
          <span className={cn(subTitleCommonClass, 'text-sm')}>
            Variant : <b className={cn(subTitleCommonClass)}>{variant}</b>
            <span className={cn('block text-xs')}>({hoverCardVariants.variants.variant[variant]})</span>
          </span>
          <HoverCard {...args} variant={variant}>
            {childrenMap['profile']}
          </HoverCard>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {},
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'HoverCard 의 사이즈별 예시입니다.',
          'size prop을 통해 HoverCard 의 콘텐츠 영역 크기(padding)를 조절할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap items-center justify-between">
      {sizeOptions.map((size) => (
        <div className={cn(flexColBoxGap4, 'py-40')} key={size}>
          <span className={cn(subTitleCommonClass, 'text-sm')}>
            Size: <b className={cn(blueTxtClass)}>{size}</b>
            <span className={cn('block text-xs')}>({hoverCardVariants.variants.size[size]})</span>
          </span>
          <HoverCard {...args} trigger={triggerMap['linkTrigger']} size={size}>
            {childrenMap['profile']}
          </HoverCard>
        </div>
      ))}
    </div>
  ),
};

export const Delays: Story = {
  name: 'OpenDelay/CloseDelay',
  args: {},
  argTypes: {},
  parameters: {
    docs: {
      description: {
        story: [
          'HoverCard 의 openDelay 와 closeDelay 별 예시입니다.',
          'openDelay와 closeDelay prop을 통해 HoverCard 가 열리고 닫히는 시간을 제어할 수 있습니다.',
          'openDelay는 마우스를 올린 후 콘텐츠가 나타나기까지의 지연 시간(ms), closeDelay는 마우스를 뗀 후 사라지기까지의 지연 시간(ms)입니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexColBoxGap4)}>
      <h1 className={cn(titleCommonClass, 'text-base')}>control 되지 않는 예시</h1>
      <div className="flex flex-wrap items-center gap-10 [&>div]:flex-1 [&>div]:py-20">
        <div className={cn(flexColBoxGap4, commonBoxClass)}>
          <span className={cn(subTitleCommonClass, 'text-sm')}>
            즉시 열리고 닫힘
            <br />
            openDelay: 0 ms
            <br />
            closeDelay: 0 ms
          </span>
          <HoverCard {...args} trigger={triggerMap['btnAlertTriangle']} openDelay={0} closeDelay={0}>
            {childrenMap['profile']}
          </HoverCard>
        </div>
        <div className={cn(flexColBoxGap4, commonBoxClass)}>
          <span className={cn(subTitleCommonClass, 'text-sm')}>
            5초뒤 열리고 10초 뒤 닫힘
            <br />
            openDelay: 500 ms
            <br />
            closeDelay: 1000 ms
          </span>
          <HoverCard {...args} trigger={triggerMap['btnAlertTriangle']} openDelay={500} closeDelay={1000}>
            {childrenMap['profile']}
          </HoverCard>
        </div>
        <div className={cn(flexColBoxGap4, commonBoxClass)}>
          <span className={cn(subTitleCommonClass, 'text-sm')}>
            7초뒤 열리고 3초 뒤 닫힘
            <br />
            openDelay: 700 ms
            <br />
            closeDelay: 300 ms
          </span>
          <HoverCard {...args} trigger={triggerMap['btnAlertTriangle']} openDelay={700} closeDelay={300}>
            {childrenMap['profile']}
          </HoverCard>
        </div>
        <div className={cn(flexColBoxGap4, commonBoxClass)}>
          <span className={cn(subTitleCommonClass, 'text-sm')}>
            10초뒤 열리고 20초 뒤 닫힘
            <br />
            openDelay: 1000 ms
            <br />
            closeDelay: 2000 ms
          </span>
          <HoverCard {...args} trigger={triggerMap['btnAlertTriangle']} openDelay={1000} closeDelay={2000}>
            {childrenMap['profile']}
          </HoverCard>
        </div>
      </div>
      <hr />
      <h1 className={cn(titleCommonClass, 'text-base')}>control 되는 예시</h1>
      <p>
        openDelay : {args.openDelay} | closeDelay : {args.closeDelay}
      </p>
      <div className={'flex items-center justify-center py-10'}>
        <HoverCard {...args} trigger={triggerMap['btnAlertTriangle']}>
          {childrenMap['profile']}
        </HoverCard>
      </div>
    </div>
  ),
};

export const Position: Story = {
  args: {},
  argTypes: {
    side: { table: { disable: true } },
    align: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'HoverCard 의 다양한 위치를 확인하실 수 있는 예시입니다.',
          '마우스 hover 시 각 위치를 확인하실 수 있으며, props에 따라서 sideOffset 과 alignOffset 을 조절하여 거리나 위치감을 확인해보실 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
      <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
        <h3 className={cn(titleCommonClass)}>side와 align의 다양한 위치의 예시</h3>
        <div className={cn(flexColBoxGap4, commonBoxClass, 'relative w-full')}>
          <h4>
            <span className={cn(subTitleCommonClass, blueTxtClass, 'text-left block mb-1')}>
              side와 align의 모든 조합으로서 각 버튼 hover 시 위치가 확인이 됩니다. <br />
            </span>
          </h4>
          <div className={cn(commonBoxClass)}></div>
          <div className={cn(flexColBoxGap4, commonBoxClass, 'relative w-9/10 min-h-140')}>
            <div className={'relative z-10 items-center text-center'}></div>
            {sideOptions.map((side) => (
              <div
                key={`${side}`}
                className={cn(
                  flexColBoxGap4,
                  commonBoxClass,
                  'absolute -translate-x-1/2 -translate-y-1/2',
                  side === 'top'
                    ? 'left-5/10 top-2/10'
                    : side === 'left'
                      ? 'left-2/9 top-5/10'
                      : side === 'bottom'
                        ? 'left-5/10 top-7/9'
                        : 'left-7/9 top-5/10',
                )}>
                <div
                  className={cn(
                    'grid',
                    side === 'top' || side === 'bottom' ? 'grid-cols-3 gap-20' : 'grid-rows-3 gap-20',
                  )}>
                  {alignOptions.map((align) => (
                    <div key={align} className={cn()}>
                      <HoverCard
                        {...args}
                        side={side}
                        align={align}
                        trigger={
                          <Button variant={'gradient'}>
                            {side}-{align}
                          </Button>
                        }>
                        <div className={cn()}>
                          <p>Position:</p>
                          <p>
                            side : {side} | align : {align}
                          </p>
                          <p>
                            sideOffset : {args.sideOffset} | alignOffset : {args.alignOffset}
                          </p>
                        </div>
                      </HoverCard>
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
