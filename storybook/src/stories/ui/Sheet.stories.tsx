import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Sheet } from '@common/ui';
// import { EditIcon } from '@common/ui/icons';

type SheetStoryArgs = {
  title: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  trigger: ReactNode;
  children?: ReactNode;
  className?: string;
  portalContainer?: string;
  showCloseButton?: boolean;
};

const meta: Meta<SheetStoryArgs> = {
  title: 'ui/Sheet',
  component: Sheet,
  argTypes: {
    // showCloseButton: {
    //   control: { type: 'boolean' },
    //   description: '우측 상단의 X버튼 노출 여부를 설정할 수 있다.',
    // },
    title: {
      control: { type: 'text' },
      description: 'Sheet 제목',
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
  },
  args: {
    title: 'Example Title',
    showCloseButton: true,
    // titleIcon: <EditIcon />,
    children: 'Example Children',
    portalContainer: 'body',
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
  render: Template,
};

export const Side: Story = {
  render: () => {
    return <div>SIDE</div>;
  },
};
