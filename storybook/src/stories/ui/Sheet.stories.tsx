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

const meta: Meta<SheetStoryArgs> = {
  title: 'ui/Sheet',
  component: Sheet,
  argTypes: {
    showTopCloseButton: {
      control: { type: 'boolean' },
      description: '우측 상단의 X버튼 노출 여부를 설정할 수 있다.',
    },
    showHeader: {
      control: { type: 'boolean' },
      description: 'Header을 숨기거나 활성화한다.',
    },
    title: {
      control: { type: 'text' },
      description: 'Sheet 제목',
    },
    description: {
      control: { type: 'text' },
      description: 'Sheet 부제목',
    },
    side: {
      control: { type: 'radio' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Sheet 활성 방향 조절',
    },
    trigger: {
      control: { disable: true },
      description: 'Sheet를 활성화하는 수단.',
    },
    children: {
      control: { type: 'text' },
      description:
        'Sheet 안에 표시할 콘텐츠. 문자열, 컴포넌트, 테이블, 아이콘 등 ReactNode로 표현 가능한 모든 요소를 넣을 수 있다.',
    },
    portalContainer: {
      control: { type: 'radio' },
      options: ['body', 'area'],
      description: '포탈 위치 선택 (body=전역, area=특정 영역)',
    },
    headerClassName: {
      control: { type: 'text' },
      description: 'Sheet의 header 외부 className',
    },
    bodyClassName: {
      control: { type: 'text' },
      description: 'Sheet의 body(content) 외부 className',
    },
  },
  args: {
    title: 'Example Title',
    showTopCloseButton: true,
    children: 'Example Children',
    portalContainer: 'body',
    headerClassName: 'text-lg bg-juiPrimary',
    bodyClassName: 'text-sm text-red-50',
    showHeader: true,
    side: 'left',
  },
  parameters: {
    docs: {
      description: {
        component: '기본 Sheet 컴포넌트 문서',
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
        story: '기본 Sheet 컴포넌트 예시',
      },
    },
  },
  render: Template,
};

export const Side: Story = {
  argTypes: {
    showTopCloseButton: {
      control: 'boolean',
    },
    portalContainer: {
      control: {
        disable: true,
      },
    },
    children: {
      control: { type: 'text' },
    },
    headerClassName: {
      control: { type: 'text' },
    },
    bodyClassName: {
      control: { type: 'text' },
    },
    showHeader: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sheet의 방향을 left, right, top, bottom 네 가지 중 선택할 수 있다. 따로 설정하지 않았을 때 기본 값은 left이다.',
      },
    },
    controls: {
      exclude: ['portalContainer', 'side', 'description', 'title'],
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
