import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Button, Collapsible, CountBadge, GradeBadge } from '@common/ui';
import { ChevronLeftRightIcon, ChevronUpDownIcon, ExpansionContentIcon, InfoIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils.ts';
import React from 'react';

const titleCommonClass = 'text-juiText-primary font-bold';
const subTitleCommonClass = 'text-juiText-primary font-semibold';
const normalTxtClass = 'text-juiText-primary font-normal';
const blueTxtClass = 'text-juiText-blue font-normal';
const commonBoxClass = 'items-center justify-center text-juiText-primary';
const flexColBoxGap4 = 'relative flex flex-col size-full gap-4 text-juiText-primary';
const flexRowBoxGap4 = 'relative flex flex-row size-full gap-4 text-juiText-primary';

const triggerMap = {
  btnMore: (
    <Button size="small" variant={'gradient'}>
      더보기 버튼
    </Button>
  ),
  btnUpDownIcon: (
    <Button asChild>
      <ChevronUpDownIcon size={'medium'} />
    </Button>
  ),
  btnLeftRightIcon: (
    <Button asChild>
      <ChevronLeftRightIcon size={'medium'} />
    </Button>
  ),
  linkIcon1: (
    <a href={'./'}>
      Link 로서 Info 처리하실 수 있고 아이콘도 가능합니다. <InfoIcon />
    </a>
  ),
  iconOnly1: (
    <ExpansionContentIcon
      size={'large'}
      className={'hover:fill-juiText-purple active:fill-juiText-purple focus:fill-juiText-purple'}
    />
  ),
  countBadge: <CountBadge color={'scoreAlert'} scoreVal={20} maxVal={10} isBtn />,
  previewMore: (
    <GradeBadge grade={'alert'} isBtn>
      프리뷰 더보기
    </GradeBadge>
  ),
};

const previewNChildMap = {
  defaultTest: {
    preview: <p>더보기 ...</p>,
    children: <div className={cn('')}>더보기 내용</div>,
  },
  alarm: {
    preview: <p>알람 더보기</p>,
    children: (
      <ul className={'bg-sky-300 text-juiGrey-a700'}>
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
    preview: <h1 className={cn(titleCommonClass, 'text-2xl')}>FAQ (자주 묻는 질문)</h1>,
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
      <h3 className={cn(subTitleCommonClass, 'text-juiStatus-alert')}>
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
        <img src={'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=80&h=80'} alt={'img1'} />
        <img src={'https://images.unsplash.com/photo-1642455501250-d2351ecac13a?w=160&h=160'} alt={'img2'} />
        <img src={'https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?w=80&h=80'} alt={'img3'} />
        <img
          src={'https://images.unsplash.com/photo-1644108443916-41a285b5a50a?w=120h=90&auto=format&fit=crop'}
          alt={'img4'}
        />
        <img src={'https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?w=90&h=180'} alt={'img5'} />
        <img
          src={'https://plus.unsplash.com/premium_photo-1683865776031-d253015b2b8e?auto=format&fit=crop?w=80&h=80'}
          alt={'img6'}
        />
      </div>
    ),
  },
};

type TriggerKey = keyof typeof triggerMap;
type PreviewNChildKey = keyof typeof previewNChildMap;
const triggerOptions = Object.keys(triggerMap) as TriggerKey[];
const previewNChildOptions = Object.keys(previewNChildMap) as PreviewNChildKey[];

type CollapsibleRenderProps = {
  disabled?: boolean;
  showPreview?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: TriggerKey;
  preview?: PreviewNChildKey;
  children: React.ReactNode;
  className?: string;
  openStatusRef?: React.Ref<boolean>;
};

function CollapsibleRender({
  trigger,
  showPreview,
  preview = 'defaultTest',
  children,
  ...args
}: CollapsibleRenderProps) {
  return (
    <Collapsible
      {...args}
      showPreview={showPreview}
      trigger={triggerMap[trigger]}
      preview={showPreview ? previewNChildMap[preview].preview : null}>
      {children}
    </Collapsible>
  );
}

const meta: Meta<CollapsibleRenderProps> = {
  title: 'UI/Collapsible',
  component: Collapsible,
  args: {
    disabled: false,
    showPreview: true,
    defaultOpen: false,
    open: undefined,
    onOpenChange: undefined,
    trigger: 'btnMore',
    preview: 'defaultTest',
    children: 'defaultTest',
    className: '',
    openStatusRef: undefined,
  },
  argTypes: {
    open: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: `${false}` } },
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
        '스토리에서는 제어하실 수 없습니다.',
      ].join('<br/>'),
    },
    trigger: {
      control: 'select',
      options: triggerOptions,
      trigger: {
        type: { summary: 'ReactReactElement' },
      },
      description: [
        'Collapsible 의 열고/닫을(toggle) 트리거 요소(ReactElement)로서, ReactElement 로 표현 가능한 모든 요소를 넣을 수 있습니다.',
        '스토리에서는 임의로 선택하실 수 있도록 요소를 생성 하였습니다.',
      ].join('<br/>'),
    },
    preview: {
      control: 'select',
      options: previewNChildOptions,
      trigger: {
        type: { summary: 'ReactReactElement' },
      },
      description: [
        'Collapsible 가 닫혀 있을 때, 트리거 옆에 표시되는 미리보기(요약) 영역의 콘텐츠입니다.',
        'ReactNode 타입으로, 텍스트, 아이콘, 요약 정보 등 원하는 내용을 자유롭게 넣을 수 있습니다.',
        'showPreview가 false면 보여지지 않습니다.',
        '스토리에서는 임의로 선택하실 수 있도록 요소를 생성 하였습니다.',
      ].join('<br/>'),
    },
    children: {
      control: 'select',
      options: previewNChildOptions,
      trigger: {
        type: { summary: 'ReactReactElement' },
      },
      description: [
        '숨겨진 콘텐츠 내용으로서, Collapsible 가 열렸을 때 표시되는 실제 콘텐츠입니다.',
        'ReactNode 타입으로, 원하는 내용을 자유롭게 넣을 수 있습니다.',
        'Collapsible 가 닫혀 있을 때는 렌더링되지 않거나, 접근성 목적의 aria 속성만 유지됩니다.',
        '스토리에서는 임의로 선택하실 수 있도록 요소를 생성 하였습니다.',
      ].join('<br/>'),
    },
    openStatusRef: {
      control: false,
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

type Story = StoryObj<CollapsibleRenderProps>;

export const Default: Story = {
  args: {},
  argTypes: {},
  parameters: {
    docs: {
      description: {
        story: '기본 Collapsible 컴포넌트를 렌더링한 예시입니다.',
      },
    },
  },
  render: (args) => (
    <div className={cn(flexColBoxGap4, commonBoxClass)}>
      <CollapsibleRender {...(args as CollapsibleRenderProps)} />
    </div>
  ),
};

export const Preview: Story = {
  args: {
    trigger: 'previewMore',
    preview: 'gallery',
    children: 'gallery',
  },
  argTypes: {
    trigger: { control: false },
    preview: { control: false },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsible 의 프리뷰(preview)의 다양한 예시입니다.',
      },
    },
  },
  render: (args) => (
    <div className={cn(flexColBoxGap4, commonBoxClass)}>
      <h1>이미지 갤러리 예시(프리뷰 없음)</h1>
      <div className={cn(flexRowBoxGap4)}>
        <CollapsibleRender {...args} trigger={'previewMore'} preview={'gallery'} showPreview={false}>
          {previewNChildMap['gallery'].children}
        </CollapsibleRender>
      </div>
      <hr />
      <h1>프로피 예시(프리뷰 있음)</h1>
      <div className={cn(flexRowBoxGap4)}>
        <CollapsibleRender {...args} trigger={'btnUpDownIcon'} preview={'profile'}>
          {previewNChildMap['profile'].children}
        </CollapsibleRender>
      </div>
    </div>
  ),
};
