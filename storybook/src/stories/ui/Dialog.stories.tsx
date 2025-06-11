import type { Meta, StoryObj } from '@storybook/react';
import { type ReactElement, useEffect, useRef, useState } from 'react';
import { Button } from '@common/ui';
import BaseDialog from '@common/ui/components/Dialog/BaseDialog.tsx';
import { EditIcon } from '@common/ui/icons';

type DialogStoryArgs = {
  title: string;
  titleIcon?: ReactElement;
  description: string;
  contentSize?: 'small' | 'medium' | 'large';
  footerLocate?: 'start' | 'center' | 'end';
  buttons: {
    langKey: string;
    icon?: 'save' | 'cancel' | 'delete' | 'check';
    color?: 'primary' | 'secondary' | 'error';
    handleClick?: () => void;
    close?: boolean;
  }[];
  portalContainer?: string;
};

const meta: Meta<DialogStoryArgs> = {
  title: 'ui/Dialog/BaseDialog',
  component: BaseDialog,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '다이얼로그 제목',
    },
    titleIcon: {
      control: { disable: true },
      description: '타이틀 아이콘',
    },
    description: {
      control: { type: 'text' },
      description: '다이얼로그 설명',
    },
    contentSize: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: '다이얼로그 컨텐츠 크기',
    },
    footerLocate: {
      control: { type: 'radio' },
      options: ['start', 'center', 'end'],
      description: '버튼 위치',
    },
    buttons: {
      control: { type: 'object' },
      description:
        '다이얼로그에 표시될 버튼 목록. icon은 save, cancel, delete, check 중에서 원하는 아이콘을 string으로 입력하면 된다. ',
    },
    portalContainer: {
      control: { type: 'radio' },
      options: ['body', 'area'],
      description: '포탈 위치 선택 (body=전역, area=특정 영역)',
    },
  },
  args: {
    title: 'Example Title',
    titleIcon: <EditIcon />,
    description: '내용 예시',
    contentSize: 'medium',
    footerLocate: 'center',
    buttons: [
      {
        langKey: '저장',
        icon: 'check',
        color: 'primary',
        handleClick: () => console.log('저장'),
      },
      {
        langKey: '삭제',
        icon: 'delete',
        color: 'error',
        close: true,
        handleClick: () => console.log('삭제'),
      },
      {
        langKey: '닫기',
        icon: 'cancel',
        color: 'secondary',
        close: true,
      },
    ],
    portalContainer: 'body',
  },
  parameters: {
    docs: {
      description: {
        component: '기본 Dialog 컴포넌트 문서입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogStoryArgs>;

const Template = (args: DialogStoryArgs) => {
  const shouldUseArea = args.portalContainer === 'area';
  const dialogAreaRef = useRef<HTMLDivElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (dialogAreaRef.current) {
      setPortalContainer(dialogAreaRef.current);
    }
  }, []);

  return (
    <div ref={dialogAreaRef}>
      <BaseDialog
        trigger={<Button>Dialog 열기</Button>}
        title={args.title}
        titleIcon={args.titleIcon}
        contentSize={args.contentSize}
        footerLocate={args.footerLocate}
        buttons={args.buttons}
        portalContainer={shouldUseArea ? portalContainer : undefined}>
        {args.description}
      </BaseDialog>
    </div>
  );
};

export const Default: Story = {
  render: Template,
};

export const ContentSize: Story = {
  ...Default,
  parameters: {
    docs: {
      description: {
        story: 'Dialog의 contentSize에 따라 다이얼로그 크기를 확인할 수 있습니다.',
      },
    },
  },
  argTypes: {
    contentSize: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
  },
};
