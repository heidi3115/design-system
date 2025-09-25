import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@common/ui/lib/utils.ts';
import {
  Button,
  Separator,
  Switch,
  type TextAlignType,
  Tooltip,
  type TooltipContentProps,
  type TooltipProps,
  tooltipVariants,
} from '@common/ui';
import {
  DEFAULT_ALIGN_OFFSET,
  DEFAULT_DELAY_DURATION,
  DEFAULT_FADEOUT_DURATION,
  DEFAULT_SIDE_OFFSET,
} from '@common/ui/components/Tooltip';
import { AlertCircleIcon, AlertTriangleFilledIcon, InfoIcon } from '@common/ui/icons';

const variantOptions = Object.keys(
  tooltipVariants.variants.variant,
) as (keyof typeof tooltipVariants.variants.variant)[];
const sizeOptions = Object.keys(tooltipVariants.variants.size) as (keyof typeof tooltipVariants.variants.size)[];
const sideOptions: TooltipContentProps['side'][] = ['top', 'left', 'bottom', 'right'] as const;
const alignOptions: TooltipContentProps['align'][] = ['start', 'center', 'end'] as const;
const textAlignOptions: TextAlignType[] = ['left', 'right', 'center'] as const;
const delayDurationArr = [200, 300, 500, 700, 1000];

const titleCommonClass = 'text-juiText-primary text-3xl font-semibold';
const subTitleCommonClass = 'text-juiText-primary text-lg font-semibold';
const greyTxt = 'text-sm text-gray-600';
const blueTxtClass = 'text-juiText-blue text-base font-normal';
const commonBoxClass = 'items-center justify-center text-juiText-primary';
const flexColBoxGap4 = 'flex flex-col gap-4 text-juiText-primary';
const flexRowBoxGap4 = 'flex flex-row gap-4 text-juiText-primary';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Feedback/Overlay/Tooltip',
  component: Tooltip,
  args: {
    delayDuration: DEFAULT_DELAY_DURATION,
    open: undefined,
    defaultOpen: false,
    onOpenChange: undefined,
    openStatusRef: undefined,
    fadeOut: false,
    isArrow: true,
    variant: 'default',
    size: 'default',
    side: 'top',
    sideOffset: DEFAULT_SIDE_OFFSET,
    align: 'center',
    alignOffset: DEFAULT_ALIGN_OFFSET,
    textAlign: 'left',
    contents: 'Tooltip Contents',
    children: undefined,
    className: '',
    disabled: false,
  },
  argTypes: {
    delayDuration: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: `${DEFAULT_DELAY_DURATION}` } },
      description: [
        '모든 Tooltip의 기본 지연 시간(ms, 기본 700)으로, Tooltip이 보여지기 전 대기 시간(밀리초 단위)입니다.',
        '사용자가 trigger 에 마우스를 올렸을 때 Tooltip이 등장하기까지의 지연 시간을 설정할 수 있습니다.',
        '기본값은 700입니다.',
      ].join('<br/>'),
    },
    open: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: `${undefined}` } },
      description: [
        'Tooltip의 열림 상태를 제어하는 prop 으로 외부에서 상태를 직접 관리할 때 사용합니다(Controlled).',
        'undefined일 경우 내부적으로 상태를 관리합니다.',
      ].join('<br/>'),
    },
    defaultOpen: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'Tooltip의 초기 열림 상태입니다.',
        '내부적으로 상태를 관리할 때 사용합니다(Uncontrolled).',
        '기본값은 false 입니다.',
      ].join('<br/>'),
    },
    onOpenChange: {
      control: false,
      action: 'onOpenChange',
      table: { type: { summary: 'function' } },
      description: [
        'Tooltip의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.',
        'open prop 과 함께 사용하여 상태를 외부에서 제어할 때 활용합니다.',
      ].join('<br/>'),
    },
    openStatusRef: {
      control: false,
      table: { type: { summary: 'ref' } },
      description: [
        'Tooltip의 열림 상태를 외부에서 참조할 수 있도록 하는 Ref 객체입니다.',
        '참조 타입은 boolean 으로 합니다.',
      ].join('<br/>'),
    },
    fadeOut: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: `${false}` } },
      description: [
        'Tooltip이 닫힐 때 fade-out 애니메이션을 적용할지 여부입니다.',
        'Tooltip이 닫힐 때 해당 시간만큼 자연스럽게 사라지는 애니메이션이 적용됩니다.',
        '기본값은 false 이며, true 시 700(ms/밀리초 단위)이 적용됩니다.',
      ].join('<br/>'),
    },
    isArrow: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      description: [
        'Tooltip의 화살표(arrow) 표시 여부입니다.',
        'true로 설정 시 Tooltip에 화살표가 나타나며, 기본값은 true 입니다.',
      ].join('<br/>'),
    },
    variant: {
      control: 'select',
      options: variantOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description: [
        'Tooltip의 색상을 설정합니다.',
        "'default', 'primary', 'secondary', 'error', 'transparent', 'custom' 중 하나를 선택할 수 있습니다.",
        "기본값은 'default' 이며, 'custom' 은 크기 별도 지정이 필요할 경우입니다.",
        'custom 선택 시 bg-*로 시작하는 TailwindCSS 클래스를 className에 꼭 추가해야 합니다.',
      ].join('<br/>'),
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description: [
        'Tooltip의 content 크기를 지정합니다.',
        "'small', 'medium', 'large', 'custom' 등의 형태가 있습니다.",
        "기본값은 'medium' 이고, 'custom' 은 크기 별도 지정이 필요할 경우입니다.",
        'custom 선택 시 bg-*로 시작하는 TailwindCSS 클래스를 className에 꼭 추가해야 합니다.',
      ].join('<br/>'),
    },
    side: {
      control: 'select',
      options: sideOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'top' } },
      description: [
        'Tooltip이 표시될 방향을 지정합니다.',
        "'top', 'bottom', 'left', 'right' 중 하나를 선택할 수 있습니다.",
        "기본값은 'top' 입니다.",
      ].join('<br/>'),
    },
    sideOffset: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: `${DEFAULT_SIDE_OFFSET}` } },
      description: [
        'Tooltip이 trigger 로부터 얼마나 떨어져서 표시될지(픽셀 단위) 지정합니다.',
        `기본값은 ${DEFAULT_SIDE_OFFSET}입니다.`,
      ].join('<br/>'),
    },
    align: {
      control: 'select',
      options: alignOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'center' } },
      description: [
        'Tooltip의 정렬 기준을 지정합니다.',
        "'start', 'center', 'end' 중 하나를 선택할 수 있습니다.",
        "기본값은 'center' 입니다.",
      ].join('<br/>'),
    },
    alignOffset: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: `${DEFAULT_ALIGN_OFFSET}` } },
      description: [
        'Tooltip의 정렬 상태 기준에서 추가로 얼마나 이동할지(픽셀 단위) 지정합니다.',
        `기본값은 ${DEFAULT_ALIGN_OFFSET}입니다.`,
      ].join('<br/>'),
    },
    textAlign: {
      control: 'select',
      options: textAlignOptions,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'left' } },
      description: [
        'Tooltip 내부 텍스트의 정렬 방식을 지정합니다.',
        "'left', 'center', 'right' 중 하나를 선택할 수 있습니다.",
        "기본값은 'left' 입니다.",
      ].join('<br/>'),
    },
    contents: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Tooltip Contents' } },
      description: [
        'Tooltip에 표시할 내용입니다.',
        '기본적으로 간단한 문자열을 받는 것을 기준으로 하고 있습니다.',
      ].join('<br/>'),
    },
    children: {
      control: false,
      table: { type: { summary: 'ReactNode' } },
      description: ['Tooltip의 trigger 요소입니다.', 'children 또는 trigger 중 하나를 반드시 제공해야 합니다.'].join(
        '<br/>',
      ),
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: [
        'Tooltip의 추가적인 CSS 클래스(Tailwind CSS 클래스 가능)를 지정할 수 있습니다.',
        'variant나 size를 custom 으로 설정할 때 필수로 사용됩니다.',
      ].join('<br/>'),
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'Tooltip을 비활성화할지 여부입니다.',
        'true로 설정하면 Tooltip이 표시되지 않습니다.',
        '기본값은 false 입니다.',
      ].join('<br/>'),
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Tooltip 컴포넌트의 문서입니다.',
          'Tooltip 이란, 사용자가 UI 요소(버튼, 아이콘 등)에 마우스를 올리거나 포커스할 때 추가적인 정보를 간결하게 보여주는 오버레이 UI 입니다.',
          '주로 버튼의 기능 설명, 약어 해석, 경고 메시지 등 즉각적이고 보조적인 안내가 필요한 상황에서 사용됩니다.',
          'Tooltip과 다른 비슷한 컴포넌트와의 차이점이라면 Tooltip의 경우 문자로만 이루어진 내용들에 대해서 내용을 제공합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    trigger: <AlertCircleIcon size={'basic'} />,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Tooltip 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
      <h1 className={cn(titleCommonClass, 'text-base')}>Icon에 마우스를 hover 하면 Tooltip이 바로 나타납니다.</h1>
      <div className={'flex flex-col gap-4'}>
        <Tooltip {...args} />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  args: {
    sideOffset: 30,
  },
  argTypes: {
    delayDuration: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    defaultOpen: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    openStatusRef: { control: false, table: { disable: true } },
    fadeOut: { control: false, table: { disable: true } },
    variant: { control: false, table: { disable: true } },
    sideOffset: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
    contents: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['Tooltip의 다양한 Variant별 예시를 확인할 수 있습니다.'].join('<br/>'),
      },
    },
  },
  render: (args: Omit<TooltipProps, 'trigger'>) => (
    <div className={cn(flexColBoxGap4)}>
      <span className="block text-base font-bold text-left mb-10">Default Variants</span>
      <div className={cn(flexRowBoxGap4, 'mb-10')}>
        {variantOptions.map((variant) => (
          <div className={cn(commonBoxClass, 'flex flex-col flex-1 gap-2')} key={variant}>
            <span className="text-xs text-juiText-blue">{variant}</span>
            <Tooltip
              {...args}
              defaultOpen={true}
              variant={variant}
              contents={`variant : ${variant === 'custom' ? `custom 인 경우 별도로 className에 bg-red-400 text-zinc-800를 적용했습니다.` : variant} \nsize : ${args.size}`}
              className={variant === 'custom' ? `bg-red-400 text-zinc-800` : ''}>
              <Button variant={variant === 'custom' ? 'gradient' : variant}>{variant}</Button>
            </Tooltip>
          </div>
        ))}
      </div>
      <hr />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    sideOffset: 30,
  },
  argTypes: {
    delayDuration: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    defaultOpen: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    openStatusRef: { control: false, table: { disable: true } },
    fadeOut: { control: false, table: { disable: true } },
    size: { control: false, table: { disable: true } },
    sideOffset: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
    contents: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['Tooltip의 다양한 Size별 예시를 확인할 수 있습니다.'].join('<br/>'),
      },
    },
  },
  render: (args: Omit<TooltipProps, 'trigger'>) => (
    <div className={cn(flexColBoxGap4)}>
      <span className="block text-base font-bold text-left mb-10">Default Variants</span>
      <div className={cn(flexRowBoxGap4, 'mb-10')}>
        {sizeOptions.map((size) => (
          <div className={cn(commonBoxClass, 'flex flex-col flex-1 gap-2')} key={size}>
            <span className="text-xs text-juiText-blue">{size}</span>
            <Tooltip
              {...args}
              defaultOpen={true}
              size={size}
              contents={`variant : ${args.variant} \nsize : ${size}`}
              className={args.variant === 'custom' ? `bg-red-400 text-zinc-800` : ''}>
              <Button>{size}</Button>
            </Tooltip>
          </div>
        ))}
      </div>
      <hr />
    </div>
  ),
};

function TooltipDelayDuration({ ...args }: Omit<TooltipProps, 'trigger'>) {
  const [openStat, setOpenStat] = useState(false);

  return (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full min-w-10')}>
      <div className={cn(flexColBoxGap4, commonBoxClass, 'w-full')}>
        <h3 className={cn(titleCommonClass, 'mb-8')}>
          다양한 Duration 예시
          <span className={cn(blueTxtClass, 'block text-xs text-left')}>
            Duration 의 경우 radix-ui 에서 숫자로 설정할 수 있도록 처리가 되어있어 다양하게 설정이 가능합니다.
          </span>
        </h3>
        <div className={cn(flexRowBoxGap4, commonBoxClass)}>
          {delayDurationArr.map((delay) => (
            <div key={`delay-${delay}`} className={cn(flexColBoxGap4, commonBoxClass)}>
              <strong className={blueTxtClass}>delayDuration : {delay}</strong>
              <Tooltip {...args} contents={delay} delayDuration={delay}>
                <Button variant={'default'}>Button hover</Button>
              </Tooltip>
            </div>
          ))}
        </div>
        <Separator orientation={'horizontal'} className={'w-full h-[1px] min-w-40'} />
        <h3 className={cn(titleCommonClass, 'mb-8 w-full text-center')}>
          FadeOut 예시
          <span className={'block mt-2 text-sm font-normal text-left'}>
            fadeOut을 설정해서 사라지는 시간을 조절할 거라면 제어(Controlled)로 처리할 수 있습니다.
            <br />
            비제어 일 때에는 Radix가 내부적으로 open/close 상태와 애니메이션 타이밍을 관리하기 때문에 설정이
            불가능합니다.
          </span>
        </h3>
        <div className={cn(flexRowBoxGap4, commonBoxClass, 'items-stretch w-9/10 h-full min-h-2')}>
          <div className={cn(flexColBoxGap4, commonBoxClass, 'justify-between flex-1')}>
            <strong className={cn(titleCommonClass, 'text-center text-base')}>
              비제어(Uncontrolled) fadeOut : true
              <span className={cn(blueTxtClass, 'block text-xs')}></span>
            </strong>
            <Tooltip {...args} contents={`fadeOut 의 설정 : ${true}`} fadeOut={true}>
              <Button variant={'primary'} className={''}>
                Button hover
              </Button>
            </Tooltip>
          </div>
          <div className={cn(flexColBoxGap4, commonBoxClass, 'justify-between flex-1')}>
            <strong className={cn(titleCommonClass, 'text-center text-base')}>
              제어(Controlled) fadeOut 예시들
              <span className={cn(blueTxtClass, 'block text-xs text-left')}>
                fadeOut을 설정할 경우 제어 설정인 open을 사용해야 합니다.
              </span>
            </strong>
            <div className={cn(flexColBoxGap4, commonBoxClass, 'justify-between flex-1')}>
              <strong className={cn(blueTxtClass, 'text-center')}>
                fadeOut : {`${true}`}
                <span className={'block text-xs'}>
                  {`fadeOut 이 true 인 경우 기본값 ${DEFAULT_FADEOUT_DURATION}이 적용됩니다.`}
                </span>
              </strong>
              <Tooltip {...args} open={openStat} contents={`fadeOut: true 인 상태`} fadeOut={true}>
                <Button
                  variant={'primary'}
                  onMouseEnter={() => setOpenStat((prevState) => !prevState)}
                  onMouseLeave={() => setOpenStat((prevState) => !prevState)}
                  className={''}>
                  Button click
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        <Separator orientation={'horizontal'} size={'small'} className={'w-full min-w-40 border-dashed'} />
      </div>
    </div>
  );
}

export const Durations: Story = {
  argTypes: {
    delayDuration: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    defaultOpen: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    openStatusRef: { control: false, table: { disable: true } },
    fadeOut: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
    contents: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Durations Storybook 는 Tooltip이 보여질 때와 사라질 때의 다양한 예시를 보여주는 Storybook 입니다.',
          'DelayDuration은 Tooltip이 보여지기 전 대기 시간(밀리초/ms 단위)을 다양한 예시로 보여드리는 Storybook 입니다.',
          'delayDuration prop은 사용자가 trigger 에 마우스를 올렸을 때 Tooltip이 등장하기까지의 지연 시간을 설정할 수 있습니다.',
          'fadeOut은 Tooltip이 사라지기까지의 fade-out 애니메이션이 적용되는 props 입니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args: TooltipProps) => <TooltipDelayDuration {...args} />,
};

function TooltipOpenControl({ ...args }: Omit<TooltipProps, 'trigger'>) {
  const openRef1 = useRef(false);
  const openRef2 = useRef(false);
  const [, setIsRefOpen1] = useState<boolean>(false);
  const [isRefOpen2, setIsRefOpen2] = useState<boolean>(true);
  const [btnToggle1, setBtnToggle1] = useState<boolean>(false);
  const [btnToggle2, setBtnToggle2] = useState<boolean>(false);
  const [switchToggle1, setSwitchToggle1] = useState<boolean>(false);
  const [isSwitchChecked1, setIsSwitchChecked1] = useState(false);
  const openStats = (val: boolean) => (val ? '열림' : '닫힘');

  return (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
      <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
        <h3 className={cn(titleCommonClass)}>다양한 OpenControl 예시</h3>
        <div className={cn(flexColBoxGap4, 'w-full')}>
          <h4>
            <span className={cn(subTitleCommonClass, blueTxtClass, 'text-left block mb-1')}>
              비제어(Uncontrolled)의 예시 (기본)
            </span>
            <span className={'font-sm'}>
              Uncontrolled의 경우 Tooltip의 내부 상태를 외부에서 알 수 없으므로,
              <br />
              openStatusRef(React.useRef)를 사용하여 Tooltip의 열림 상태를 읽어와 표시하도록 했습니다.
            </span>
          </h4>
          <div className={cn(flexRowBoxGap4, commonBoxClass, 'items-stretch h-full min-h-2')}>
            <div className={cn(flexColBoxGap4, commonBoxClass, 'basis-content justify-between')}>
              <h5 className={cn(blueTxtClass, 'text-sm mb-4')}>기본 Uncontrolled Tooltip (defaultOpen 없이)</h5>
              <Tooltip
                {...args}
                openStatusRef={openRef1}
                open={openRef1.current}
                onOpenChange={(open) => setIsRefOpen1(open)}
                contents={`기본 Uncontrolled Tooltip`}>
                <InfoIcon size={'large'} />
              </Tooltip>
              <span className={cn(greyTxt, 'mt-2 text-xs font-bold')}>
                {'InfoIcon 의 열림 상태 : '}
                <strong className={'text-juiText-primary'}>{openStats(openRef1.current)}</strong>
              </span>
            </div>
            <Separator orientation={'vertical'} className={'w-0.5 h-full min-h-40'} />
            <div className={cn(flexColBoxGap4, commonBoxClass, 'basis-content justify-between')}>
              <h5 className={cn(blueTxtClass, 'text-sm mb-4')}>기본적으로 열린 상태(defaultOpen=true)</h5>
              <Tooltip
                key={'isRefOpen2'}
                {...args}
                defaultOpen={true}
                openStatusRef={openRef2}
                onOpenChange={(open) => setIsRefOpen2(open)}
                contents={`기본 Uncontrolled Tooltip`}>
                <AlertTriangleFilledIcon size={'large'} />
              </Tooltip>
              <span className={cn(greyTxt, 'mt-2 text-xs font-bold')}>
                {'AlertTriangleFilledIcon 의 열림 상태 : '}
                <strong className={'text-juiText-primary'}>{openStats(isRefOpen2)}</strong>
              </span>
            </div>
            <Separator orientation={'vertical'} className={'w-0.5 h-full min-h-40'} />
          </div>
          <hr className={'my-4'} />
          <h4>
            <span className={cn(subTitleCommonClass, blueTxtClass, 'text-left block mb-1')}>
              제어(Controlled)의 예시
            </span>
            <span className={'font-sm'}>제어는 사용자가 open의 상태를 제어할 수 있도록 하는 내역입니다.</span>
          </h4>
          <div className={cn(flexRowBoxGap4, commonBoxClass, 'items-stretch h-full min-h-2')}>
            <div className={cn(flexColBoxGap4, commonBoxClass, 'basis-content justify-between')}>
              <h5 className={cn(blueTxtClass, 'text-sm')}>버튼 클릭(toggle)으로 열고 닫기</h5>
              <Tooltip
                {...args}
                contents={'버튼으로 제어하는 Tooltip 으로, \n버튼을 다시 누르시면 닫힙니다.'}
                open={btnToggle1}>
                <Button variant={'gradient'} onClick={() => setBtnToggle1((prevState) => !prevState)}>
                  Click me!
                </Button>
              </Tooltip>
              <span className={cn(greyTxt, 'mt-2 text-xs font-bold')}>
                열림 상태 : <strong className={'text-juiText-primary'}>{openStats(btnToggle1)}</strong>
              </span>
            </div>
            <Separator orientation={'vertical'} className={'w-0.5 h-full min-h-40'} />
            <div className={cn(flexColBoxGap4, commonBoxClass, 'basis-content justify-between')}>
              <h5 className={cn(blueTxtClass, 'text-sm')}>외부 상태(토글 스위치)로 Tooltip 제어</h5>
              <Tooltip
                {...args}
                contents={'Switch 버튼을 다시 누르시면 닫힙니다. \n줄바꿈 test\ntesting'}
                open={switchToggle1}>
                <Switch
                  checked={isSwitchChecked1}
                  onCheckedChange={(e) => {
                    setIsSwitchChecked1(e);
                    setSwitchToggle1((prevState) => !prevState);
                  }}>
                  제어
                </Switch>
              </Tooltip>
              <span className={cn(greyTxt, 'mt-2 text-xs font-bold')}>
                열림 상태 : <strong className={'text-juiText-primary'}>{openStats(switchToggle1)}</strong>
              </span>
            </div>
            <Separator orientation={'vertical'} className={'w-0.5 h-full min-h-40'} />
            <div className={cn(flexColBoxGap4, commonBoxClass, 'basis-content justify-between')}>
              <h5 className={cn(blueTxtClass, 'text-sm')}>여러 Tooltip을 하나의 상태로 동기화</h5>
              <div className={cn(flexRowBoxGap4, commonBoxClass)}>
                <div className={cn(flexColBoxGap4, 'items-center justify-center')}>
                  <Tooltip
                    {...args}
                    contents={'버튼 1의 툴립 내용\n 버튼에서 마우스가 벗어나면 닫힙니다. \n줄바꿈 test\ntesting'}
                    open={btnToggle2}>
                    <Button
                      variant={'gradient'}
                      onMouseEnter={() => setBtnToggle2((prevState) => !prevState)}
                      onMouseLeave={() => setBtnToggle2((prevState) => !prevState)}>
                      Hover me!
                    </Button>
                  </Tooltip>
                  <span className={cn(greyTxt, 'mt-2 text-xs font-bold')}>
                    버튼 1 의 열림 상태 : <strong className={'text-juiText-primary'}>{openStats(btnToggle2)}</strong>
                  </span>
                </div>
                <div className={cn(flexColBoxGap4)}>
                  <Tooltip
                    {...args}
                    contents={'버튼 2의 툴립 내용\n 버튼에서 마우스가 벗어나면 닫힙니다. \n줄바꿈 test\ntesting'}
                    open={btnToggle2}>
                    <Button
                      variant={'gradient'}
                      onMouseEnter={() => setBtnToggle2((prevState) => !prevState)}
                      onMouseLeave={() => setBtnToggle2((prevState) => !prevState)}>
                      Hover me!
                    </Button>
                  </Tooltip>
                  <span className={cn(greyTxt, 'mt-2 text-xs font-bold')}>
                    버튼 2 의 열림 상태 : <strong className={'text-juiText-primary'}>{openStats(btnToggle2)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className={'my-4'} />
        </div>
      </div>
    </div>
  );
}

export const OpenControl: Story = {
  argTypes: {
    delayDuration: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    defaultOpen: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    openStatusRef: { control: false, table: { disable: true } },
    fadeOut: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
    contents: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'OpenControl은 Tooltip의 open, defaultOpen, onOpenChange, openStatusRef를 모두 활용하는 Storybook예 시입니다.',
          '제어(Controlled)와 비제어(Uncontrolled)의 예시를 확인할 수 있으며 open의 상태를 확인할 수 있도록 임의로 만든 예시입니다.',
          '비제어일 경우 Tooltip은 한 화면에 하나만 보여지도록 기본적으로 처리가 되어있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args: TooltipProps) => <TooltipOpenControl {...args} />,
};

function TooltipPositionControl({ ...args }: Omit<TooltipProps, 'trigger'>) {
  return (
    <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
      <div className={cn(commonBoxClass, flexColBoxGap4, 'w-full')}>
        <h3 className={cn(titleCommonClass)}>side와 align의 다양한 위치의 예시</h3>
        <div className={cn(flexColBoxGap4, commonBoxClass, 'relative w-full')}>
          <h4>
            <span className={cn(subTitleCommonClass, blueTxtClass, 'text-left block mb-1')}>
              side와 align의 모든 조합으로 각 버튼 hover 시 위치가 확인이 됩니다. <br />
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
                      <Tooltip
                        {...args}
                        side={side}
                        align={align}
                        contents={`position: ${side}-${align}\nsize:${args.size} | variant:${args.variant}`}>
                        <Button size={'small'} variant={'gradient'} className={'min-w-[140px]'}>
                          {side}-{align}
                        </Button>
                      </Tooltip>
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

export const TooltipPosition: Story = {
  argTypes: {
    delayDuration: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    defaultOpen: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    openStatusRef: { control: false, table: { disable: true } },
    fadeOut: { control: false, table: { disable: true } },
    side: { control: false, table: { disable: true } },
    align: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
    contents: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'TooltipPosition은 Tooltip의 위치 정보를 확인할 수 있는 Storybook 입니다.',
          '마우스 hover 시 각 위치를 확인할 수 있으며, props에 따라서 sideOffset과 alignOffset을 조절하여 거리나 위치감을 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args: TooltipProps) => <TooltipPositionControl {...args} />,
};
