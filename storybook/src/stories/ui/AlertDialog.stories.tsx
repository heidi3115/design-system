import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircleIcon, CheckCircleIcon } from '@common/ui/icons';
import { Button } from '@common/ui';
import { Alert, AlertDescription, AlertTitle } from '@common/ui/components/Alert';
import { ConfirmAlertDialog } from '@common/ui/components/AlertDialog';
import { useEffect, useRef, useState } from 'react';
import { alertVariants } from '@common/ui/components/Alert/Alert.tsx';

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

const ICON_MAP = {
  warning: <AlertCircleIcon />,
  success: <CheckCircleIcon />,
};

const meta: Meta<AlertDialogStoryArgs> = {
  title: 'ui/AlertDialog/ConfirmAlertDialog',
  component: ConfirmAlertDialog,
  argTypes: {
    title: {
      control: { type: 'radio' },
      options: ['warning', 'success', 'none'],
      description: '타이틀 아이콘 선택',
    },
    footerType: {
      control: { type: 'radio' },
      options: ['update', 'confirm'],
      description: '버튼 타입 선택',
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
  const shouldUseArea = args.portalContainer === 'area';
  const dialogAreaRef = useRef<HTMLDivElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (dialogAreaRef.current) {
      setPortalContainer(dialogAreaRef.current);
    }
  }, []);

  return (
    <div className="relative" ref={dialogAreaRef}>
      <ConfirmAlertDialog
        title={args.title}
        trigger={<Button>클릭</Button>}
        footerType={args.footerType}
        description={args.description}
        contentSize={args.contentSize}
        confirmLabel={args.confirmLabel}
        cancelLabel={args.cancelLabel}
        onConfirm={() => console.warn('확인버튼 클릭')}
        onCancel={() => console.warn('취소버튼 클릭')}
        portalContainer={shouldUseArea ? portalContainer : undefined}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
};

export const title: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Alert-dialog의 상단 아이콘 타입을 정할 수 있다. <br/> Warning과 Success, 미설정 세 가지 중에 선택한다.',
      },
      source: {
        code: null,
      },
    },
    controls: {
      exclude: ['title', 'onConfirm', 'onCancel', 'portalContainer'],
    },
  },
  argTypes: {
    footerType: {
      control: { type: 'radio' },
      options: ['confirm', 'update'],
      description: '버튼 타입 선택',
    },
    description: {
      control: { type: 'text' },
      description: '내용 입력',
    },
  },
  args: {
    footerType: 'confirm',
    description: '저장하시겠습니까?',
  },
  render: (args) => {
    return (
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <div>Warning</div>
          <Alert className={alertVariants({ contentSize: args.contentSize })}>
            <AlertTitle className="items-center">
              <AlertCircleIcon />
            </AlertTitle>
            <AlertDescription className="text-juiText-primary">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
              {args.footerType !== 'confirm' && <Button>취소</Button>}
            </div>
          </Alert>
        </div>
        <div className="flex flex-col gap-2">
          <div>Success</div>
          <Alert className={alertVariants({ contentSize: args.contentSize })}>
            <AlertTitle className="items-center">
              <CheckCircleIcon />
            </AlertTitle>
            <AlertDescription className="text-juiText-primary">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
              {args.footerType !== 'confirm' && <Button>취소</Button>}
            </div>
          </Alert>
        </div>
        <div className="flex flex-col gap-2">
          <div>미설정</div>
          <Alert className={alertVariants({ contentSize: args.contentSize })}>
            <AlertDescription className="text-juiText-primary">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
              {args.footerType !== 'confirm' && <Button>취소</Button>}
            </div>
          </Alert>
        </div>
      </div>
    );
  },
};

export const ContentSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Alert-dialog의 사이즈를 확인할 수 있다. 기본값은 small이다.<br/>',
      },
      source: {
        code: null,
      },
    },
    controls: {
      exclude: ['contentSize', 'portalContainer', 'onConfirm', 'onCancel'],
    },
  },
  argTypes: {
    title: {
      control: { type: 'radio' },
      options: [...Object.keys(ICON_MAP), '미설정'],
      description: '타이틀 아이콘 선택',
    },
    description: {
      control: { type: 'text' },
      description: '내용 입력',
    },
  },
  args: {
    footerType: 'confirm',
    description: '저장하시겠습니까?',
  },
  render: (args) => {
    return (
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <div>small</div>
          <Alert className={alertVariants({ contentSize: 'small' })}>
            <AlertTitle className="items-center">
              {args.title === 'warning' && <AlertCircleIcon />}
              {args.title === 'success' && <CheckCircleIcon />}
            </AlertTitle>
            <AlertDescription className="text-juiText-primary">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">{args.confirmLabel}</Button>
              {args.footerType !== 'confirm' && <Button>{args.cancelLabel}</Button>}
            </div>
          </Alert>
        </div>
        <div className="flex flex-col gap-2">
          <div>midium</div>
          <Alert className={alertVariants({ contentSize: 'medium' })}>
            <AlertTitle className="items-center">
              {args.title === 'warning' && <AlertCircleIcon />}
              {args.title === 'success' && <CheckCircleIcon />}
            </AlertTitle>
            <AlertDescription className="text-juiText-primary">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">{args.confirmLabel}</Button>
              {args.footerType !== 'confirm' && <Button>{args.cancelLabel}</Button>}
            </div>
          </Alert>
        </div>
        <div className="flex flex-col gap-2">
          <div>large</div>
          <Alert className={alertVariants({ contentSize: 'large' })}>
            <AlertTitle className="items-center">
              {args.title === 'warning' && <AlertCircleIcon />}
              {args.title === 'success' && <CheckCircleIcon />}
            </AlertTitle>
            <AlertDescription className="text-juiText-primary">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">{args.confirmLabel}</Button>
              {args.footerType !== 'confirm' && <Button>{args.cancelLabel}</Button>}
            </div>
          </Alert>
        </div>
      </div>
    );
  },
};

export const FooterType: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Alert-dialog의 하단 버튼 타입을 정할 수 있다. <br/> 확인 / 취소 버튼 노출은 update, 확인 버튼 단독은 confirm으로 제어한다.',
      },
      source: {
        code: null,
      },
    },
    controls: {
      exclude: ['footerType', 'portalContainer', 'onConfirm', 'onCancel'],
    },
  },
  argTypes: {
    title: {
      control: { type: 'radio' },
      options: [...Object.keys(ICON_MAP), '미설정'],
      description: '타이틀 아이콘 선택',
    },
    description: {
      control: { type: 'text' },
      description: '내용 입력',
    },
  },
  args: {
    footerType: 'confirm',
    description: '저장하시겠습니까?',
  },
  render: (args) => {
    return (
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <div>Update</div>
          <Alert className={alertVariants({ contentSize: args.contentSize })}>
            <AlertTitle className="items-center">
              {args.title === 'warning' && <AlertCircleIcon />}
              {args.title === 'success' && <CheckCircleIcon />}
            </AlertTitle>
            <AlertDescription className="text-juiText-primary">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
              <Button>취소</Button>
            </div>
          </Alert>
        </div>
        <div className="flex flex-col gap-2">
          <div>Confirm</div>
          <Alert className={alertVariants({ contentSize: args.contentSize })}>
            <AlertTitle className="items-center">
              {args.title === 'warning' && <AlertCircleIcon />}
              {args.title === 'success' && <CheckCircleIcon />}
            </AlertTitle>
            <AlertDescription className="text-juiText-primary">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
            </div>
          </Alert>
        </div>
      </div>
    );
  },
};
