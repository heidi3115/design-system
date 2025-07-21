import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  Button,
  Collapsible,
  type CollapsibleProps,
  collapsibleVariants,
  CountBadge,
  Separator,
  StateBadge,
} from '@common/ui';
import { ChevronLeftRightIcon, ChevronUpDownIcon, ExpansionContentIcon, InfoIcon, PlusIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils.ts';

const titleCommonClass = 'text-juiText-primary font-bold';
const subTitleCommonClass = 'text-juiText-primary font-semibold';
const normalTxtClass = 'text-juiText-primary font-normal';
const blueTxtClass = 'text-juiText-blue font-normal';
const commonBoxClass = 'items-center justify-center text-juiText-primary';
const flexColBoxGap4 = 'relative flex flex-col size-full gap-4 text-juiText-primary';
const flexRowBoxGap4 = 'relative flex flex-row size-full gap-4 text-juiText-primary';

const imgUrlArr = [
  'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1642455501250-d2351ecac13a?&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1644108443916-41a285b5a50a?&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1683865776031-d253015b2b8e?&auto=format&fit=crop',
];

const triggerMap = {
  btnMore: (
    <Button size="small" variant={'gradient'}>
      더보기 버튼
    </Button>
  ),
  btnTxtMore: (
    <Button variant={'transparentGrey'}>
      더보기 <PlusIcon size={'small'} />
    </Button>
  ),
  btnUpDownIcon: (
    <Button asChild variant={'transparent'} size={'small'} className={'rounded-md shadow-md aspect-square p-0'}>
      <ChevronUpDownIcon size={'small'} />
    </Button>
  ),
  btnLeftRightIcon: (
    <Button asChild variant={'transparent'} size={'small'} className={'aspect-square p-0'}>
      <ChevronLeftRightIcon size={'small'} />
    </Button>
  ),
  linkIcon: (
    <a href={'./'}>
      a 태그 <InfoIcon />
    </a>
  ),
  ExpansionContentIcon: (
    <ExpansionContentIcon
      size={'large'}
      className={'hover:fill-juiText-purple active:fill-juiText-purple focus:fill-juiText-purple'}
    />
  ),
  countBadge: <CountBadge color={'scoreAlert'} scoreVal={20} maxVal={10} isBtn />,
  previewMore: (
    <StateBadge status={'complete'} isBtn>
      프리뷰 더보기
    </StateBadge>
  ),
};

const previewNChildMap = {
  defaultTest: {
    preview: <p>더보기 ... 프리뷰 내용.</p>,
    children: (
      <div className={cn()}>
        더보기 내용의 예시
        <br />
        Collapsible 컴포넌트의 문서입니다. Collapsible 란, 단일 콘텐츠 블록의 펼침/접힘 상태를 토글하는 UI 요소 입니다.
        <br />
        주로 &#34;더보기&#34;, 상세 설명, 옵션 숨기기/보이기 등 단일 영역의 노출/숨김에 사용됩니다.
        <br />
        하나의 영역만 열고 닫는 단일 상태만 관리하며, 단순한 토글이나 간단한 정보 숨기기/보이기에 적합합니다.
        <br />
        트리거(trigger) 요소를 자유롭게 커스터마이즈할 수 있으며, 프리뷰(preview) 영역을 통해 콘텐츠의 요약이나
        미리보기를 제공할 수 있습니다.
        <br />
      </div>
    ),
  },
  alarm: {
    preview: <p className={'w-100'}>알람 더보기</p>,
    children: (
      <ul className={'w-100 [&_li]:my-2 [&_li]:p-2 [&_li]:bg-sky-300 text-juiGrey-a700'}>
        <li>시나리오 알람 1</li>
        <li>이벤트 알람 1</li>
        <li>시나리오 알람 2</li>
        <li>시나리오 알람 3</li>
        <li>이벤트 알람 2</li>
        <li>시나리오 알람 4</li>
      </ul>
    ),
  },
  faq: {
    preview: <h1 className={cn(titleCommonClass, 'text-lg')}>FAQ (자주 묻는 질문)</h1>,
    children: (
      <ol className={cn('p-4')}>
        <li>Q. 회원가입은 어떻게 하나요?</li>
        <li>A. 홈페이지 우측 상단의 &#39;회원가입&#39; 버튼을 클릭한 후, 안내에 따라 정보를 입력하시면 됩니다.</li>
        <li>Q. 회원가입은 어떻게 하나요?</li>
        <li>
          A. 홈페이지 우측 상단의 &#39;회원가입&#39; 버튼을 클릭한 후, 안내에 따라 정보를 입력하시면 됩니다.
          <br />
          홈페이지 우측 상단의 &#39;회원가입&#39; 버튼을 클릭한 후, 안내에 따라 정보를 입력하시면 됩니다.
        </li>
        <li>Q. 회원가입은 어떻게 하나요?</li>
        <li>A.홈페이지 우측 상단의 &#39;회원가입&#39; 버튼을 클릭한 후, 안내에 따라 정보를 입력하시면 됩니다.</li>
      </ol>
    ),
  },
  deliver: {
    preview: (
      <h3 className={cn(subTitleCommonClass, 'flex flex-row gap-2 text-juiStatus-alert font-semibold')}>
        <InfoIcon size={'small'} />
        배송 기간 안내
      </h3>
    ),
    children: (
      <dl className="list-disc pl-4">
        <dt className={cn(blueTxtClass, 'text-base')}>평균 배송 기간</dt>
        <dd className={cn(normalTxtClass, 'text-sm')}>23일</dd>
        <dt className={cn(blueTxtClass, 'text-base')}>도서산간 지역</dt>
        <dd className={cn(normalTxtClass, 'text-sm')}>12일 추가 소요</dd>
        <dt className={cn(blueTxtClass, 'text-base')}>주문 폭주 시</dt>
        <dd className={cn(normalTxtClass, 'text-sm')}>배송이 지연될 수 있습니다.</dd>
      </dl>
    ),
  },
  profile: {
    preview: (
      <div className={cn('flex flex-row gap-2 items-center')}>
        <Avatar
          src={'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'}
          fallback={'web Image'}
          size={'basic'}
          shape={'square'}
        />
        <p>Avatar User Name</p>
      </div>
    ),
    children: (
      <div className={cn(commonBoxClass, 'gap-3')}>
        <p className="font-bold">이메일</p>
        <p>honggildong@example.com</p>
        <p className={cn(blueTxtClass)}>가입일</p>
        <p className={cn(normalTxtClass)}>2023-03-15</p>
      </div>
    ),
  },
  gallery: {
    preview: <p>Gallery</p>,
    children: (
      <div className={'grid grid-cols-3 gap-4 items-center justify-center'}>
        {imgUrlArr.map((src) => (
          <Avatar src={src} size={'fit'} shape={'square'} className={'w-40 h-40'} key={src} />
        ))}
      </div>
    ),
  },
};

type sizeType = keyof typeof collapsibleVariants.variants.size;
const sizeOptions = Object.keys(collapsibleVariants.variants.size) as sizeType[];

const meta: Meta<typeof Collapsible> = {
  title: 'UI/Disclosure/Collapsible',
  component: Collapsible,
  args: {
    disabled: false,
    showPreview: true,
    defaultOpen: false,
    open: undefined,
    size: 'basic',
    trigger: triggerMap['btnUpDownIcon'],
    preview: previewNChildMap['defaultTest'].preview,
    children: previewNChildMap['defaultTest'].children,
    onOpenChange: undefined,
    openStatusRef: undefined,
    className: '',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    showPreview: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    open: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: `${false}` } },
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: { type: { summary: `${sizeOptions.join('| ')}` }, defaultValue: { summary: `${sizeOptions[0]}` } },
    },
    onOpenChange: {
      control: false,
      action: 'onOpenChange',
      table: {
        type: { summary: '(value: boolean) => void' },
        defaultValue: { summary: `${undefined}` },
      },
      description: [
        'onOpenChange: Collapsible 의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다. open prop과 함께 사용하여 상태를 외부에서 제어할 때 활용합니다.',
        'storybook 에서는 제어할 수 없습니다.',
      ].join('<br/>'),
    },
    trigger: {
      control: false,
      trigger: {
        type: { summary: 'ReactReactElement' },
      },
      description: [
        'Collapsible 의 열고/닫을(toggle) trigger 요소(ReactElement)로, ReactElement 로 표현 가능한 모든 요소를 넣을 수 있습니다.',
        'storybook 에서는 제어할 수 없습니다.',
      ].join('<br/>'),
    },
    preview: {
      control: false,
      trigger: {
        type: { summary: 'ReactReactElement' },
      },
      description: [
        'Collapsible 가 닫혀 있을 때, trigger 옆에 표시되는 미리보기(요약) 영역의 콘텐츠입니다.',
        'ReactNode 타입으로, 텍스트, 아이콘, 요약 정보 등 원하는 내용을 자유롭게 넣을 수 있습니다.',
        'showPreview가 false면 보여지지 않습니다.',
        'storybook 에서는 제어할 수 없습니다.',
      ].join('<br/>'),
    },
    children: {
      control: false,
      trigger: {
        type: { summary: 'ReactReactElement' },
      },
      description: [
        '숨겨진 콘텐츠 내용으로, Collapsible 가 열렸을 때 표시되는 실제 콘텐츠입니다.',
        'ReactNode 타입으로, 원하는 내용을 자유롭게 넣을 수 있습니다.',
        'Collapsible 가 닫혀 있을 때는 렌더링되지 않거나, 접근성 목적의 aria 속성만 유지됩니다.',
        'storybook 에서는 제어할 수 없습니다.',
      ].join('<br/>'),
    },
    openStatusRef: {
      control: false,
      description: [
        'Collapsible 의 열림 상태를 외부에서 참조할 수 있도록 하는 Ref 객체입니다.',
        '참조 타입은 boolean 으로 합니다.',
        'storybook 에서는 제어할 수 없습니다.',
      ].join('<br/>'),
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Collapsible 컴포넌트의 문서입니다. Collapsible 란, 단일 콘텐츠 블록의 펼침/접힘 상태를 토글하는 UI 요소 입니다.',
          '주로 "더보기", 상세 설명, 옵션 숨기기/보이기 등 단일 영역의 노출/숨김에 사용됩니다.',
          '하나의 영역만 열고 닫는 단일 상태만 관리하며, 단순한 토글이나 간단한 정보 숨기기/보이기에 적합합니다.',
          '트리거(trigger) 요소를 자유롭게 커스터마이즈할 수 있으며, 프리뷰(preview) 영역을 통해 콘텐츠의 요약이나 미리보기를 제공할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<CollapsibleProps>;

export const Default: Story = {
  args: {
    trigger: (
      <Button asChild variant={'transparent'} size={'small'} className={'rounded-md shadow-md aspect-square p-0'}>
        <ChevronUpDownIcon size={'small'} />
      </Button>
    ),
    preview: previewNChildMap['defaultTest'].preview,
    children: previewNChildMap['defaultTest'].children,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Collapsible 컴포넌트를 렌더링한 예시입니다.',
      },
    },
  },
  render: (args) => (
    <div className={cn(flexColBoxGap4, commonBoxClass)}>
      <Collapsible {...args} />
    </div>
  ),
};

export const Preview: Story = {
  args: {
    trigger: triggerMap['previewMore'],
    preview: previewNChildMap['gallery'].preview,
    children: previewNChildMap['gallery'].children,
  },
  argTypes: {
    showPreview: { control: false, table: { disable: true } },
    trigger: { control: false, table: { disable: true } },
    preview: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    openStatusRef: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsible 의 프리뷰(preview)의 다양한 예시입니다.',
      },
    },
  },
  render: (args) => (
    <div className={cn(flexColBoxGap4)}>
      <h1 className={cn(titleCommonClass, 'text-sm')}>프리뷰 없는 예시들</h1>
      <div className={cn(flexRowBoxGap4)}>
        <Collapsible {...args} showPreview={false} />
        <Collapsible trigger={triggerMap['countBadge']} showPreview={false}>
          {previewNChildMap['alarm'].children}
        </Collapsible>
      </div>
      <hr />
      <h1 className={cn(titleCommonClass, 'text-sm')}>프리뷰 있는 예시</h1>
      <div className={cn(flexRowBoxGap4)}>
        <Collapsible {...args} trigger={triggerMap['btnUpDownIcon']} preview={previewNChildMap['profile'].preview}>
          {previewNChildMap['profile'].children}
        </Collapsible>
        <Collapsible
          {...args}
          trigger={triggerMap['ExpansionContentIcon']}
          preview={previewNChildMap['deliver'].preview}>
          {previewNChildMap['deliver'].children}
        </Collapsible>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    trigger: triggerMap['btnLeftRightIcon'],
    preview: previewNChildMap['deliver'].preview,
    children: previewNChildMap['deliver'].children,
    showPreview: true,
  },
  argTypes: {
    size: { control: false, table: { disable: true } },
    trigger: { control: false, table: { disable: true } },
    preview: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
    defaultOpen: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    openStatusRef: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Collapsible 컴포넌트의 size prop에 따라 내부의 padding이 다르게 적용되는 예시입니다.',
          'size 옵션은 small, basic, medium, large, custom 이 있으며, 각 사이즈에 따라 내부 여백(padding)이 달라집니다.',
          'custom 의 경우 원하는 내용으로 처리 가능하되, className 으로 조절할 수 있습니다..',
        ].join('\n'),
      },
    },
  },
  render: (args: CollapsibleProps) => (
    <div className={cn(flexColBoxGap4, 'gap-10')}>
      <h3 className={cn(titleCommonClass, 'text-base')}>Size Variants</h3>
      <div className={cn('flex flex-wrap')}>
        {(['small', 'basic', 'medium', 'large', 'custom'] as sizeType[]).map((size) => (
          <div className={cn(flexColBoxGap4, 'basis-1/2 items-start pb-10')} key={size}>
            <h2 className={cn(blueTxtClass, 'mb-2 text-sm')}>
              {size} size: {collapsibleVariants.variants.size[size].contentVariant}
            </h2>
            <Collapsible {...args} size={size} />
          </div>
        ))}
      </div>
    </div>
  ),
};
const returnOpenStatus = (stat: boolean | undefined | null) => (stat ? '열림' : '닫힘');
const returnOpenTextColor = (stat: boolean | undefined | null) =>
  stat ? 'text-juiStatus-complete' : 'text-juiScore-alert';

function UncontrolledDemo({ open, defaultOpen, ...args }: CollapsibleProps) {
  const openRef = useRef(defaultOpen ?? null);
  const [openState, setOpenState] = useState(openRef.current);

  return (
    <div className={cn(flexColBoxGap4)}>
      <h2 className={cn(titleCommonClass, 'text-xl')}>비제어(Uncontrolled) Collapsible 예시</h2>
      <div className={cn(flexColBoxGap4)}>
        <div className={cn(flexColBoxGap4, 'w-auto')}>
          <Collapsible
            {...args}
            defaultOpen={defaultOpen}
            open={undefined}
            trigger={triggerMap['btnTxtMore']}
            preview={previewNChildMap['faq'].preview}
            onOpenChange={(openStat) => {
              openRef.current = openStat;
              setOpenState(openStat);
            }}
            openStatusRef={openRef}>
            {previewNChildMap['faq'].children}
          </Collapsible>
          <div className={cn(flexColBoxGap4, 'text-sm')}>
            <b className={cn('flex flex-row gap-2')}>
              <span>defaultOpen :</span>
              <span className={`font-semibold ${returnOpenTextColor(defaultOpen)}`}>
                {returnOpenStatus(defaultOpen)}
              </span>
            </b>
            <b className={cn('flex flex-row gap-2')}>
              <span>open :</span>
              <span
                className={`font-semibold ${returnOpenTextColor(open)}`}>{`${open === undefined ? 'undefined' : returnOpenStatus(open)}`}</span>
            </b>
            <b className={cn('flex flex-row gap-2')}>
              <span>현재 열린 상태(openStatusRef) :</span>
              <strong className={`font-semibold ${returnOpenTextColor(openState)}`}>
                {returnOpenStatus(openState)}
              </strong>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlledDemo({ defaultOpen, ...args }: CollapsibleProps) {
  const controlOpenRef = useRef<boolean | null>(null);
  const [controlOpenState, setControlOpenState] = useState(false);

  return (
    <div className={cn(flexColBoxGap4, 'pl-10')}>
      <h2 className={cn(titleCommonClass, 'text-xl')}>제어(Controlled) Collapsible 예시</h2>
      <div className={cn(flexColBoxGap4)}>
        <div className={cn(flexColBoxGap4)}>
          <p>버튼으로 open 상태 제어하기</p>
          <Button
            variant={'primary'}
            onClick={() => {
              controlOpenRef.current = !controlOpenState;
              setControlOpenState((prev) => !prev);
            }}>
            Collapsible {controlOpenState ? '닫기' : '열기'}
          </Button>
        </div>
        <div className={cn(flexColBoxGap4, 'w-auto')}>
          <Collapsible
            {...args}
            trigger={triggerMap['btnTxtMore']}
            preview={previewNChildMap['faq'].preview}
            defaultOpen={defaultOpen}
            open={controlOpenState}
            onOpenChange={(open) => {
              controlOpenRef.current = open;
              setControlOpenState(open);
            }}
            openStatusRef={controlOpenRef}>
            {previewNChildMap['faq'].children}
          </Collapsible>
          <div className={cn(flexColBoxGap4, 'text-sm')}>
            <b className={cn('flex flex-row gap-2')}>
              <span>defaultOpen :</span>
              <span className={`font-semibold ${returnOpenTextColor(defaultOpen)}`}>
                {returnOpenStatus(defaultOpen)}
              </span>
            </b>
            <b className={cn('flex flex-row gap-2')}>
              <span>open :</span>
              <span
                className={`font-semibold ${returnOpenTextColor(controlOpenState)}`}>{`${controlOpenState === undefined ? 'undefined' : returnOpenStatus(controlOpenState)}`}</span>
            </b>
            <b className={cn('flex flex-row gap-2')}>
              <span>현재 열린 상태(openStatusRef) :</span>
              <strong className={`font-semibold ${returnOpenTextColor(controlOpenState)}`}>
                {returnOpenStatus(controlOpenState)}
              </strong>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

export const UncontrolledControlled: Story = {
  name: 'Uncontrolled/Controlled',
  args: {
    defaultOpen: true,
    trigger: triggerMap['btnLeftRightIcon'],
    preview: previewNChildMap['faq'].preview,
    children: previewNChildMap['faq'].children,
    showPreview: true,
  },
  argTypes: {
    trigger: { control: false, table: { disable: true } },
    preview: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
    open: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    openStatusRef: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '비제어(Uncontrolled)/제어(Controlled) 방식의 Collapsible 스토리 예시입니다.',
          '비제어(Uncontrolled)는 defaultOpen prop 으로 최초 열림/닫힘 상태만 지정하며, 이후 상태는 컴포넌트 내부에서 관리합니다.',
          '외부에서 상태를 직접 제어하지 않으며, 일반적인 "더보기" UI, FAQ 등에서 많이 사용됩니다.',
          '',
          '비제어(Uncontrolled)는 open prop과 onOpenChange 콜백을 통해 열림/닫힘 상태를 외부에서 직접 관리합니다.',
          '이 방식은 여러 Collapsible 중 하나만 열리게 하는 아코디언, 외부 버튼 등과 연동할 때 유용합니다.',
          '아래 예시는 FAQ(자주 묻는 질문) 형태입니다.',
        ].join('\n'),
      },
    },
  },
  render: (args: CollapsibleProps) => {
    const {
      size,
      showPreview,
      disabled,
      open,
      defaultOpen,
      onOpenChange,
      openStatusRef,
      preview,
      trigger,
      children,
      className,
    } = args;

    return (
      <div className={cn(flexColBoxGap4, commonBoxClass, 'w-9/10')}>
        <div className={cn(flexRowBoxGap4)}>
          <UncontrolledDemo
            size={size}
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            openStatusRef={openStatusRef}
            disabled={disabled}
            showPreview={showPreview}
            preview={preview}
            trigger={trigger}
            className={className}>
            {children}
          </UncontrolledDemo>
          <Separator orientation={'vertical'} position={'absolute'} className={'left-1/2'} />
          <ControlledDemo
            size={size}
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            openStatusRef={openStatusRef}
            disabled={disabled}
            showPreview={showPreview}
            preview={preview}
            trigger={trigger}
            className={cn(className)}>
            {children}
          </ControlledDemo>
        </div>
      </div>
    );
  },
};
