import type { Meta, StoryObj } from '@storybook/react';
// import { EditIcon } from '@common/ui/icons';
// import { useEffect, useRef, useState } from 'react';
import Dialog from '@common/ui/components/Dialog/Dialog.tsx';

type AlertDialogStoryArgs = {
  title?: 'warning' | 'success';
  description: string;
  footerType: 'update' | 'confirm';
  contentSize?: 'small' | 'medium' | 'large';
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  portalContainer?: string;
};

const meta: Meta<AlertDialogStoryArgs> = {
  title: 'ui/Dialog',
  component: Dialog,
  argTypes: {
    title: {
      control: { type: 'radio' },
      options: ['warning', 'success', 'none'],
      description: '타이틀 아이콘 선택',
    },
    description: {
      control: { type: 'text' },
      description: '내용 입력',
    },
    contentSize: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: '컨텐츠 크기',
    },
    confirmLabel: {
      control: { type: 'text' },
      description: '확인 버튼',
    },
    cancelLabel: {
      control: { type: 'text' },
      description: '확인 버튼',
    },
    onConfirm: {
      description: '확인 후 처리',
    },
    onCancel: {
      description: '취소',
    },
    portalContainer: {
      control: { type: 'radio' },
      options: ['body', 'area'],
      description: '포탈 위치 선택 (body=전역, area=특정 영역)',
    },
  },
  args: {
    title: 'warning',
    description: '저장하시겠습니까?',
    footerType: 'confirm',
    contentSize: 'medium',
    confirmLabel: '확인',
    cancelLabel: '취소',
    portalContainer: 'body',
  },
  parameters: {
    docs: {
      description: {
        component: '저장이나 삭제 확인용 CorfimAlertDialog 컴포넌트 문서',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertDialogStoryArgs>;

const Template = (args: AlertDialogStoryArgs) => {
  console.log(args);
  // const shouldUseArea = args.portalContainer === 'area';
  // const dialogAreaRef = useRef<HTMLDivElement | null>(null);
  // const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  //
  // useEffect(() => {
  //   if (dialogAreaRef.current) {
  //     setPortalContainer(dialogAreaRef.current);
  //   }
  // }, []);

  return (
    <div>example</div>
    // <div className="relative" ref={dialogAreaRef}>
    //   <Dialog title="제목!" trigger={undefined} titleIcon={<EditIcon />}/>
    // </div>
  );
};

export const Default: Story = {
  render: Template,
};
