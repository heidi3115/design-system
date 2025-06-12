import type { Meta, StoryObj } from '@storybook/react';
import { type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from '@common/ui';
import BaseDialog from '@common/ui/components/Dialog/BaseDialog.tsx';
import { EditIcon } from '@common/ui/icons';

type DialogStoryArgs = {
  title: string;
  titleIcon?: ReactElement;
  trigger: ReactNode;
  children?: ReactNode;
  className?: string;
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
  maxHeight?: number;
};

const meta: Meta<DialogStoryArgs> = {
  title: 'ui/Dialog/BaseDialog',
  component: BaseDialog,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Dialog 제목',
    },
    trigger: {
      control: { disable: true },
      description: 'Dialog를 활성화하는 수단.',
    },
    titleIcon: {
      control: { disable: true },
      description: '타이틀 아이콘',
    },
    children: {
      control: { type: 'text' },
      description:
        'Dialog 안에 표시할 콘텐츠. 문자열, 컴포넌트, 테이블, 아이콘 등 ReactNode로 표현 가능한 모든 요소를 넣을 수 있다.',
    },
    maxHeight: {
      control: { type: 'number' },
      description: 'Dialog의 최대 높이를 지정할 수 있다. content의 길이가 maxHeight를 초과하면 스크롤이 생긴다.',
    },
    contentSize: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description:
        'Dialog 컨텐츠 크기. small, medium, large로 구분되며, 그 외 크기는 className으로 직접 적용할 수 있다.',
    },
    footerLocate: {
      control: { type: 'radio' },
      options: ['start', 'center', 'end'],
      description: '하단 버튼 위치. start, center, end로 조정할 수 있다.',
    },
    buttons: {
      control: { type: 'object' },
      description:
        'Dialog에 표시될 버튼 목록. icon은 save, cancel, delete, check 중에서 원하는 아이콘을 string으로 입력하면 된다. ',
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
    children: 'Example Children',
    maxHeight: 10,
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
        className={args.className}
        titleIcon={args.titleIcon}
        contentSize={args.contentSize}
        footerLocate={args.footerLocate}
        buttons={args.buttons}
        maxHeight={args.maxHeight}
        portalContainer={shouldUseArea ? portalContainer : undefined}>
        {args.children}
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
        story: 'contentSize에 따라 Dialog 크기를 확인할 수 있습니다.',
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
