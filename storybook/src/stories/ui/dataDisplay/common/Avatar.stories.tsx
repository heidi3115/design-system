import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarContents,
  type AvatarLoadingStatus,
  type AvatarProps,
  avatarWrapperVariants,
} from '@common/ui/components/Avatar';
import { Skeleton } from '@common/ui/components/Skeleton';
import { Button } from '@common/ui/components/Button';

// 공통 상수
const sizeOptions = ['small', 'basic', 'medium', 'large', 'fit'] as const;
const shapeOptions = ['round', 'square'] as const;

const sizeArr = Object.keys(
  avatarWrapperVariants.variants.size,
) as (keyof typeof avatarWrapperVariants.variants.size)[];

const shapeArr = Object.keys(
  avatarWrapperVariants.variants.shape,
) as (keyof typeof avatarWrapperVariants.variants.shape)[];

const srcArr = [
  '/images/avatar-jira.png',
  '/images/avatar-kakaotalk.png',
  '/images/avatar-slack.png',
  'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=256&h=256&dpr=2&q=100',
  'wrongURL',
];

const tagArr = [
  <a
    href={'/images/avatar-kakaotalk.png'}
    target={'_blank'}
    rel="noreferrer"
    key={'a'}
    className={'bg-amber-200/20 hover:text-lime-400'}>
    a tag test
  </a>,
  <Button key={'btn'}>Button test</Button>,
  <div key={'div'} className={'bg-lime-300/30'}>
    div tag test
  </div>,
];

const meta: Meta<typeof Avatar> = {
  title: 'UI/DataDisplay/Common/Avatar',
  component: Avatar,
  args: {
    asChild: false,
    size: 'basic',
    shape: 'round',
    src: '/images/avatar-jira.png',
    alt: 'AvatarAlt',
    fallback: 'AvatarFallback',
    delayMs: 700,
    onLoadingStatusChange: undefined,
    disabled: false,
    children: null,
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: [
        'Slot을 통해 Avatar 스타일을 다른 태그에 이식하여 Avatar 스타일을 적용할 때 사용합니다.',
        '다만 제한이 있을 수 있으니 유의해 주세요.',
      ].join('<br/>'),
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(' | ') },
        defaultValue: { summary: 'basic' },
      },
      description: [
        '아바타의 크기를 지정하는 props 입니다.',
        'small, basic, medium, large, fit 중에서 선택할 수 있습니다.',
      ].join('<br/>'),
    },
    shape: {
      control: 'select',
      options: shapeOptions,
      table: {
        type: { summary: shapeOptions.join(' | ') },
        defaultValue: { summary: 'round' },
      },
      description: [
        '아바타의 모양을 지정하는 props 입니다.',
        'round(원형), square(사각형) 중에서 선택할 수 있습니다.',
      ].join('<br/>'),
    },
    src: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/images/avatar-jira.png' },
      },
      description: [
        '아바타로 사용할 이미지의 경로(URL, 상대경로, base64 등)입니다.',
        'storybook 에서는 임의로 기본값을 "/images/avatar-jira.png"로 처리했습니다.',
      ].join('<br/>'),
    },
    alt: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'AvatarAlt' },
      },
      description: '아바타로 사용할 이미지의 대체 텍스트입니다.',
    },
    fallback: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'AvatarFallback' },
      },
      description: [
        '이미지가 없거나 로딩 실패 시 보여줄 대체 UI(텍스트, 아이콘 등)입니다.',
        'fallback 미지정 시 기본 아이콘(UserFilledIcon)이 표시되고, fallback 지정 시 해당 텍스트가 표기됩니다.',
      ].join('<br/>'),
    },
    delayMs: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '700' },
      },
      description: [
        'fallback이 나타나기까지 기다리는 시간(ms)입니다.',
        'fallback(대체 UI)이 너무 빨리 깜빡이며 나타나는 현상(플래시)을 방지하기 위해 UX 개선 목적으로 사용합니다.',
      ].join('<br/>'),
    },
    onLoadingStatusChange: {
      control: false,
      table: {
        type: { summary: '(status: AvatarLoadingStatus) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '이미지 로딩 상태 변화 시 호출되는 콜백 함수입니다.',
        'AvatarLoadingStatus는 [idle | loading | loaded | error] 상태를 갖습니다.',
      ].join('<br/>'),
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '아바타의 비활성화 상태를 설정합니다.',
    },
    children: {
      table: { disable: true },
      description: '아바타 내부에 렌더링될 자식 요소입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Avatar 컴포넌트의 문서입니다. Avatar 컴포넌트는 사용자 프로필 이미지나 아이콘을 표시하는 데 사용됩니다.',
          '이미지 로딩 실패 시 이미지를 제공하지 않으면 자동으로 설정한 문구(Fallback)이나 기본 아이콘이 표시되는 fallback UI를 제공하며, 다양한 크기와 모양을 지원합니다.',
          '로딩 상태 표시와 지연 시간 설정을 통해 사용자 경험을 향상시킬 수 있습니다.',
          '일반적으로 사용자 목록, 댓글, 프로필 등에서 사용됩니다.',
          'asChild prop을 통해 다른 컴포넌트에 Avatar 스타일을 적용할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '기본 Avatar 컴포넌트의 예시입니다.',
          '정상적인 이미지, 잘못된 이미지, fallback 텍스트 등 다양한 상태를 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-6 items-center justify-center'}>
      <Avatar {...args} />
      <Avatar {...args} src={'wrongSrcExample'} fallback={''} />
      <Avatar {...args} src={'fallback'} />
    </div>
  ),
};

export const Size: Story = {
  argTypes: {
    size: { table: { disable: true } },
    asChild: { table: { disable: true } },
    src: { table: { disable: true } },
    delayMs: { table: { disable: true } },
    onLoadingStatusChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Avatar의 다양한 크기별 예시입니다.',
          '각 크기에 대해 정상 이미지, 웹 이미지, 실패 상태 등을 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <span className="text-sm font-bold">Default</span>
      <div className={'flex flex-row gap-6'}>
        {sizeArr.map((size) => (
          <div className={'flex flex-col gap-2 items-center'} key={size}>
            <span className={'text-xs text-juiText-blue'}>{size}</span>
            <Avatar {...args} size={size} />
          </div>
        ))}
        {sizeArr.map((size) => (
          <div className={'flex flex-col gap-2 items-center'} key={size}>
            <span className={'text-xs text-juiText-blue'}>{size} with web Img</span>
            <Avatar
              {...args}
              size={size}
              src={
                'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=100'
              }
            />
          </div>
        ))}
      </div>
      <hr className={'w-full'} />
      <span className="text-sm font-bold">Wrong img src with no fallback </span>
      <div className={'flex flex-row gap-6'}>
        {sizeArr.map((size) => (
          <div className={'flex flex-col gap-2 items-center'} key={size}>
            <span className={'text-xs text-juiText-blue'}>{size}</span>
            <Avatar {...args} size={size} src={''} fallback={''} />
          </div>
        ))}
      </div>
      <hr className={'w-full'} />
      <span className="text-sm font-bold">Wrong img src with fallback</span>
      <div className={'flex flex-row gap-6'}>
        {sizeArr.map((size) => (
          <div className={'flex flex-col gap-2 items-center'} key={size}>
            <span className={'text-xs text-juiText-blue'}>{size}</span>
            <Avatar {...args} size={size} src={''} />
          </div>
        ))}
      </div>
      <hr className={'w-full'} />
    </div>
  ),
};

export const Shape: Story = {
  argTypes: {
    shape: { table: { disable: true } },
    asChild: { table: { disable: true } },
    delayMs: { table: { disable: true } },
    onLoadingStatusChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Avatar의 다양한 모양별 예시입니다.',
          '별도로 배경색을 추가하여 round와 square 모양을 명확히 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <span className="text-sm font-bold">
        Default
        <span
          className={
            'block text-[12px]'
          }>{`"bg-juiText-primary/40" 를 추가하여 배경색으로 어떠한 형태인지 확인할 수 있습니다.`}</span>
      </span>
      <div className={'flex flex-row gap-6'}>
        {shapeArr.map((shape) => (
          <div className={'flex flex-col gap-2 items-center'} key={shape}>
            <span className={'text-xs text-juiText-blue'}>{shape}</span>
            <Avatar {...args} shape={shape} className={'bg-juiText-primary/40'} />
          </div>
        ))}
        {shapeArr.map((shape) => (
          <div className={'flex flex-col gap-2 items-center'} key={shape}>
            <span className={'text-xs text-juiText-blue'}>{shape}</span>
            <Avatar
              {...args}
              shape={shape}
              src={
                'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=100'
              }
              className={'bg-juiText-primary/40'}
            />
          </div>
        ))}
      </div>
      <hr className={'w-full'} />
      <span className="text-sm font-bold">Wrong img src with no fallback </span>
      <div className={'flex flex-row gap-6'}>
        {shapeArr.map((shape) => (
          <div className={'flex flex-col gap-2 items-center'} key={shape}>
            <span className={'text-xs text-juiText-blue'}>{shape}</span>
            {/*className={'bg-juiText-primary/40'}*/}
            <Avatar {...args} shape={shape} src={''} fallback={''} />
          </div>
        ))}
      </div>
      <hr className={'w-full'} />
      <span className="text-sm font-bold">Wrong img src with fallback </span>
      <div className={'flex flex-row gap-6'}>
        {shapeArr.map((shape) => (
          <div className={'flex flex-col gap-2 items-center'} key={shape}>
            <span className={'text-xs text-juiText-blue'}>{shape}</span>
            {/*className={'bg-juiText-primary/40'}*/}
            <Avatar {...args} shape={shape} src={''} />
          </div>
        ))}
      </div>
      <hr className={'w-full'} />
    </div>
  ),
};

export const Src: Story = {
  argTypes: {
    src: {
      control: 'select',
      options: srcArr,
      table: { disable: true },
    },
    asChild: { table: { disable: true } },
    delayMs: { table: { disable: true } },
    onLoadingStatusChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Avatar의 다양한 이미지 소스별 예시입니다.',
          '로컬 이미지, 웹 이미지, 잘못된 URL 등 다양한 상황에서의 Avatar 동작을 확인할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <strong
        className={
          'text-base'
        }>{`Current args -> Size: ${args.size} | Shape: ${args.shape} | Disabled : ${args.disabled}`}</strong>
      <span className="text-sm font-bold">Default</span>
      <div className={'flex flex-row gap-6'}>
        {srcArr.map((src) => (
          <div className={'flex flex-col flex-1 gap-2 items-center justify-between'} key={src}>
            <span className={'text-xs text-juiText-blue'}>src: {src}</span>
            <Avatar {...args} src={src} />
          </div>
        ))}
      </div>
      <hr className={'w-full'} />
      <span className="text-sm font-bold">Wrong img src with no fallback </span>
      <div className={'flex flex-row gap-6'}>
        {srcArr.map((src) => (
          <div className={'flex flex-col flex-1 gap-2 items-center justify-between'} key={src}>
            <span className={'text-xs text-juiText-blue'}>src: {src}</span>
            <Avatar {...args} src={src} fallback={''} />
          </div>
        ))}
      </div>
      <hr className={'w-full'} />
    </div>
  ),
};

const STATUS_SEQUENCE: AvatarLoadingStatus[] = ['idle', 'loading', 'loaded', 'error'];

function MockAvatar({
  initialStatus = 'idle',
  onLoadingStatusChange,
  delayMs = 700,
  src,
  ...args
}: {
  initialStatus?: AvatarLoadingStatus;
} & AvatarProps) {
  const [status, setStatus] = useState<AvatarLoadingStatus>(initialStatus);
  const [logs, setLogs] = useState<AvatarLoadingStatus[]>([initialStatus]);

  // 상태 변경시 콜백 및 로그 기록
  useEffect(() => {
    onLoadingStatusChange?.(status);
    setLogs((prev) => [...prev, status]);
  }, [onLoadingStatusChange, status]);

  // src 변화 시 기존 로그 초기화
  useEffect(() => {
    if (src) setLogs([initialStatus]);
  }, [initialStatus, src]);

  // 자동 진행 (idle→loading→loaded→error) 예시 + src 변화 시 기존 로그 초기화
  useEffect(() => {
    if (status === 'idle') {
      const t = setTimeout(() => setStatus('loading'), delayMs);

      return () => clearTimeout(t);
    }

    if (status === 'loading') {
      const t = setTimeout(() => setStatus(src === 'wrongURL' ? 'error' : 'loaded'), delayMs);

      return () => clearTimeout(t);
    }

    if (status === 'loaded') {
      const t = setTimeout(() => setStatus('loaded'), delayMs);

      return () => clearTimeout(t);
    }

    if (status === 'error') {
      const t = setTimeout(() => setStatus('error'), delayMs);

      return () => clearTimeout(t);
    }

    // src에 따라서 loaded 나 error 에서 멈춤
  }, [src, status, delayMs]);

  // 수동 상태 변경
  const handleManualChange = (next: AvatarLoadingStatus) => {
    setStatus(next);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <span className="text-sm font-bold">
        {`Default`}
        <span className="block mb-2 text-xs font-bold">
          {`상태들의 종류별을 임의로(Mock) 만들어 아래에 상태별의 내역을 확인할 수 있도록 하였습니다.`}
          <br />
          {'alt 와 fallback 은 아래 예시를 제외하고 Avatar Mock 에서는 둘 다 미지정입니다.'}
        </span>
      </span>
      <div className={'flex flex-col items-center'}>
        <div className={'flex flex-row gap-4 w-8/10'}>
          <div className={'flex flex-col flex-1 gap-2 items-center'}>
            <span className={'text-xs text-juiText-blue'}>status: idle</span>
            <Avatar {...args} src={'wrong'} fallback={' '} />
          </div>
          <div className={'flex flex-col gap-2 flex-1 items-center'}>
            <span className={`text-xs text-juiText-blue`}>status: loading</span>
            <Skeleton
              className={`${args.size === 'small' ? 'size-5' : args.size === 'basic' ? 'size-7.5' : args.size === 'medium' ? 'size-10' : 'size-15'}`}
            />
          </div>
          <div className={'flex flex-col gap-2 flex-1 items-center'}>
            <span className={'text-xs text-juiText-blue'}>status: loaded</span>
            <Avatar {...args} src={srcArr[2]} delayMs={50} />
          </div>
          <div className={'flex flex-col gap-2 flex-1 items-center'}>
            <span className={'text-xs text-juiText-blue'}>status: error(fallback 미지정 시)</span>
            <Avatar {...args} src={'wrong'} delayMs={50} fallback={''} />
          </div>
          <div className={'flex flex-col gap-2 flex-1 items-center'}>
            <span className={'text-xs text-juiText-blue'}>status: error(fallback 지정시)</span>
            <Avatar {...args} src={'wrong'} delayMs={50} />
          </div>
        </div>
      </div>
      <hr className={'w-full h-0.5'} />
      <div className={'flex flex-col gap-4'}>
        <span className="text-sm font-bold">
          {`Mock Text`}
          <span className="block mb-2 text-xs font-bold">
            {`상태들의 종류별을 임의로(Mock) 만들어 아래에 src의 경우와 status 버튼에 따라 진행이 이어지는 부분들을 만든 Mock 입니다.`}
          </span>
        </span>
        <div className={'flex items-center justify-center'}>
          <div className={'flex flex-col justify-center w-150 h-fit p-4 border rounded-lg'}>
            <span className="text-base font-bold">
              {`Avatar Mock`}
              <span className="block mb-2 text-xs font-bold">
                {`delayMs: `}
                <span className={'text-juiText-blue'}>{delayMs}</span>
                {` | status : `}
                <span
                  className={
                    status === 'idle'
                      ? 'text-juiBackground-input'
                      : status === 'loading'
                        ? 'text-orange-400'
                        : status === 'loaded'
                          ? 'text-green-800'
                          : 'text-red-800'
                  }>
                  {status}
                </span>
                <br />
                {` src : ${src}`}
                <br />
                {`size: ${args.size} | shape: ${args.shape}`}
              </span>
            </span>
            <div className={'flex flex-col gap-6 items-center justify-center w-full'}>
              <div className="flex items-center justify-center w-20 h-20 rounded-sm bg-juiText-primary/20 text-2xl font-bold">
                {status === 'idle' && ''}
                {status === 'loading' && (
                  <Skeleton
                    className={`${args.size === 'small' ? 'size-5' : args.size === 'basic' ? 'size-7.5' : args.size === 'medium' ? 'size-10' : 'size-15'}`}
                  />
                )}
                {status === 'loaded' && <Avatar {...args} src={src} delayMs={delayMs} alt={''} fallback={''} />}
                {status === 'error' && <Avatar {...args} src={src} delayMs={delayMs} alt={''} fallback={''} />}
              </div>
              <div className="flex gap-2">
                {STATUS_SEQUENCE.map((stat) => (
                  <button
                    key={stat}
                    className={`px-2 py-1 rounded text-xs border ${
                      status === status ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                    onClick={() => handleManualChange(stat)}
                    type="button">
                    {stat}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap w-full">
                <div className="text-xs font-semibold mb-1 text-juiText-primary">Status 변화 로그:</div>
                <div className="flex flex-wrap gap-1 p-2 w-full bg-gray-200">
                  {logs.map((s, i) => {
                    const textColor =
                      s === 'idle'
                        ? 'text-juiBackground-input'
                        : s === 'loading'
                          ? 'text-orange-400'
                          : s === 'loaded'
                            ? 'text-green-800'
                            : 'text-red-800';

                    return (
                      <span key={i} className={`gap-2 text-bold ${textColor}`}>
                        {s}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Status: Story = {
  argTypes: {
    src: {
      control: 'select',
      options: srcArr,
      table: { disable: true },
    },
    delayMs: { table: { disable: false } },
    asChild: { table: { disable: true } },
    alt: { table: { disable: true } },
    fallback: { table: { disable: true } },
    disabled: { table: { disable: true } },
    onLoadingStatusChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'delayMs 값에 따른 Avatar의 로딩 상태 변화에 대한 Mock 예시입니다.',
          'delayMs와 onLoadingStatusChange를 활용하여 Avatar의 이미지 로딩 상태 변화를 확인할 수 있습니다.',
          'delayMs를 조정해보고, 각 src 별로 상태 변화 로그를 확인해보실 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => <MockAvatar {...args} />,
};

export const AsChild: Story = {
  args: {
    src: srcArr[1],
  },
  argTypes: {
    src: { table: { disable: true } },
    asChild: { table: { disable: true } },
    delayMs: { table: { disable: true } },
    onLoadingStatusChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Avatar의 스타일을 다양한 태그와 컴포넌트에 이식하는 `asChild` prop의 활용 예시입니다.',
          '`asChild: false`일 때는 Avatar가 자체적으로 이미지/로딩/폴백 UI를 렌더링합니다.',
          '`asChild: true`일 때는 Avatar 스타일만 하위 엘리먼트에 이식하며, children이 있으면 해당 children이 Avatar의 루트로 렌더링됩니다.',
          'children이 없으면 Avatar의 기본 이미지/로딩/폴백 UI(AvatarContents)가 자동으로 children 으로 사용됩니다.',
          '아래 예시에서는 a 태그, button 태그, div 태그 등 다양한 엘리먼트에 Avatar 스타일을 Slot 패턴으로 이식하는 방법을 보여줍니다.',
          '',
          '**실제 사용 예시:**',
          '- `<Avatar {...args} asChild><button>내용</button></Avatar>` ← 이렇게 할 경우 그냥 버튼에 Avatar의 스타일만 입혀집니다.',
          '- `<Avatar {...args} asChild><button><AvatarContents {...args} /></button></Avatar>` ← 이렇게 자식(children)에 AvatarContents를 추가해야 Avatar의 기능적인 부분들이 작동되어 이식됩니다.',
        ].join('<br/>'),
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-5 w-full'}>
      <strong className={'text-base'}>{`Default`}</strong>
      <div className={'flex flex-col gap-4'}>
        {tagArr.map((tag) => (
          <div className={'flex flex-col gap-8'} key={tag.key}>
            <span className="text-sm font-bold">
              {`${tag.key} 태그 - src : ${args.src}`}
              <br />
              {`current Args -> size: ${args.size} | shape: ${args.shape} | `}
            </span>
            <div className={'flex flex-row gap-5'}>
              <div className={'flex flex-col flex-1 gap-2 items-center justify-between'}>
                <span className={'text-xs text-juiText-blue'}>asChild: false</span>
                <Avatar {...args}>
                  {React.cloneElement(tag, { size: args.size === 'fit' ? 'basic' : args.size })}
                </Avatar>
              </div>
              <div className={'flex flex-col flex-1 gap-2 items-center justify-between'}>
                <span className={'text-xs text-juiText-blue'}>{`asChild: true - \`${tag.key}\` 태그만 사용 시`}</span>
                <Avatar {...args} asChild>
                  {React.cloneElement(tag, { size: args.size === 'fit' ? 'basic' : args.size })}
                </Avatar>
              </div>
              <div className={'flex flex-col flex-1 gap-2 items-center justify-between'}>
                <span className={'text-xs text-juiText-blue'}>
                  {`asChild: true - \`${tag.key}\` 태그의 자식에 \`AvatarContents\`를 넣을 시`}
                </span>
                <Avatar {...args} asChild>
                  {React.cloneElement(
                    tag,
                    { size: args.size === 'fit' ? 'basic' : args.size },
                    <AvatarContents {...args} key={args.size} />,
                  )}
                </Avatar>
              </div>
            </div>
            <hr className={'w-full'} />
          </div>
        ))}
      </div>
      <strong className={'text-base'}>
        {`asChild: true 임에도 src 에 문제가 있어서 status가 error로 fallback 처리 될 때,`}
        <br />
        {`각 태그의 자식에 \`AvatarContents\`를 넣을 시,`}
      </strong>
      <div className={'flex flex-col gap-4'}>
        <span className={'text-sm font-bold text-juiText-primary'}>{`fallback 지정 시`}</span>
        <div className={'flex flex-row gap-4'}>
          {tagArr.map((tag, idx) => (
            <div className={'flex flex-col flex-1 gap-2 items-center justify-between'} key={idx + '-' + tag.key}>
              <span className={'text-xs text-juiText-blue'}>
                {`asChild: true - \`${tag.key}\` | src : ${srcArr[4]}`}
              </span>
              <Avatar {...args} src={srcArr[4]} asChild>
                {React.cloneElement(
                  tag,
                  { size: args.size === 'fit' ? 'basic' : args.size },
                  <AvatarContents {...args} src={srcArr[4]} />,
                )}
              </Avatar>
            </div>
          ))}
        </div>
      </div>
      <div className={'flex flex-col gap-4'}>
        <span className={'text-sm font-bold text-juiText-primary'}>{`fallback 미지정 시`}</span>
        <div className={'flex flex-row gap-4'}>
          {tagArr.map((tag, idx) => (
            <div
              className={'flex flex-col flex-1 gap-2 items-center justify-between'}
              key={idx + '-' + tag.key + 'error'}>
              <span className={'text-xs text-juiText-blue'}>
                {`asChild: true - \`${tag.key}\` | src : ${srcArr[4]}`}
              </span>
              <Avatar {...args} src={srcArr[4]} asChild>
                {React.cloneElement(
                  tag,
                  { size: args.size === 'fit' ? 'basic' : args.size },
                  <AvatarContents {...args} src={srcArr[4]} fallback={''} />,
                )}
              </Avatar>
            </div>
          ))}
        </div>
      </div>
      <hr className={'w-full'} />
    </div>
  ),
};
