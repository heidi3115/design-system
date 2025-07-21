import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Sheet } from '@common/ui';

type SheetStoryArgs = {
  title: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  trigger: ReactNode;
  children?: ReactNode;
  portalContainer?: string;
  showTopCloseButton?: boolean;
  headerClassName?: string;
  showHeader?: boolean;
  bodyClassName?: string;
  description?: string;
};

// 공통상수
const sideOptions = ['left', 'right', 'top', 'bottom'] as const;

const meta: Meta<SheetStoryArgs> = {
  title: 'UI/Layout/Container/Sheet',
  component: Sheet,
  args: {
    showTopCloseButton: true,
    showHeader: true,
    side: 'left',
    title: 'Example Title',
    children: 'Example Children',
    portalContainer: 'body',
    headerClassName: 'text-lg bg-juiPrimary',
    bodyClassName: 'text-sm text-red-50',
  },
  argTypes: {
    showTopCloseButton: {
      control: { type: 'boolean' },
      description: '우측 상단의 X 버튼 노출 여부를 설정합니다.',
    },
    showHeader: {
      control: { type: 'boolean' },
      description: ['Header 영역의 노출 여부를 설정합니다.', 'Header을 숨기거나 활성화 할 수 있습니다.'].join('<br/>'),
    },
    side: {
      control: { type: 'radio' },
      options: sideOptions,
      description: [
        'Sheet가 활성화되는 방향을 지정합니다.',
        `${sideOptions.join(', ')} 중에서 선택할 수 있습니다.`,
      ].join('<br/>'),
    },
    title: {
      control: { type: 'text' },
      description: 'Sheet의 제목을 설정합니다.',
    },
    description: {
      control: { type: 'text' },
      description: 'Sheet의 부제목을 설정합니다.',
    },
    trigger: {
      control: { disable: true },
      description: 'Sheet를 활성화하는 trigger 요소입니다.',
    },
    children: {
      control: { type: 'text' },
      description: [
        'Sheet 내부에 표시할 콘텐츠를 지정합니다.',
        '문자열, 컴포넌트, 테이블, 아이콘 등 ReactNode로 표현 가능한 모든 요소를 넣을 수 있습니다.',
      ].join('<br/>'),
    },
    portalContainer: {
      control: { type: 'radio' },
      options: ['body', 'area'],
      description: 'Sheet가 렌더링될 포탈 위치를 선택합니다. (body=전역, area=특정 영역)',
    },
    headerClassName: {
      control: { type: 'text' },
      description: 'Sheet의 header 영역에 적용할 외부 className 을 지정합니다.',
    },
    bodyClassName: {
      control: { type: 'text' },
      description: 'Sheet의 body(content) 영역에 적용할 외부 className을 지정합니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '기본 Sheet 컴포넌트 문서입니다.',
          'Sheet는 다양한 방향과 포탈 위치, 헤더/바디 커스텀 스타일을 지원합니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<SheetStoryArgs>;

const Template = (args: SheetStoryArgs) => {
  const shouldUseArea = args.portalContainer === 'area';
  const sheetAreaRef = useRef<HTMLDivElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (sheetAreaRef.current) {
      setPortalContainer(sheetAreaRef.current);
    }
  }, []);

  return (
    <div ref={sheetAreaRef}>
      <Sheet
        showHeader={args.showHeader}
        headerClassName={args.headerClassName}
        bodyClassName={args.bodyClassName}
        description={args.description}
        showTopCloseButton={args.showTopCloseButton}
        side={args.side}
        trigger={<Button>Sheet 열기</Button>}
        title={args.title}
        portalContainer={shouldUseArea ? portalContainer : undefined}>
        {args.children}
      </Sheet>
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: ['기본 Sheet 컴포넌트 예시입니다.'].join('<br/>'),
      },
    },
  },
  render: Template,
};

export const Side: Story = {
  argTypes: {
    portalContainer: {
      control: { disable: true },
    },
    side: {
      control: { disable: true },
    },
    description: {
      control: { disable: true },
    },
    title: {
      control: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          `Sheet의 방향을 ${sideOptions.join(', ')} 중 선택할 수 있습니다. 따로 설정하지 않았을 때 기본값은 left 입니다.`,
        ].join('<br/>'),
      },
    },
  },
  render: (args) => {
    return (
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <span>왼쪽</span>
          <Sheet
            showHeader={args.showHeader}
            headerClassName={args.headerClassName}
            bodyClassName={args.bodyClassName}
            showTopCloseButton={args.showTopCloseButton}
            title="왼쪽"
            trigger={<Button>Left</Button>}
            side="left">
            {args.children}
          </Sheet>
        </div>
        <div className="flex flex-col gap-2">
          <span>오른쪽</span>
          <Sheet
            showHeader={args.showHeader}
            showTopCloseButton={args.showTopCloseButton}
            headerClassName={args.headerClassName}
            bodyClassName={args.bodyClassName}
            title="오른쪽"
            trigger={<Button>Right</Button>}
            side="right">
            {args.children}
          </Sheet>
        </div>
        <div className="flex flex-col gap-2">
          <span>위</span>
          <Sheet
            showHeader={args.showHeader}
            headerClassName={args.headerClassName}
            bodyClassName={args.bodyClassName}
            showTopCloseButton={args.showTopCloseButton}
            title="위"
            trigger={<Button>Top</Button>}
            side="top">
            {args.children}
          </Sheet>
        </div>
        <div className="flex flex-col gap-2">
          <span>아래</span>
          <Sheet
            showHeader={args.showHeader}
            headerClassName={args.headerClassName}
            bodyClassName={args.bodyClassName}
            showTopCloseButton={args.showTopCloseButton}
            title="아래"
            trigger={<Button>Bottom</Button>}
            side="bottom">
            {args.children}
          </Sheet>
        </div>
      </div>
    );
  },
};
