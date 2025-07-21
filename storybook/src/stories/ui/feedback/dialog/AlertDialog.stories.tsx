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
  title: 'UI/Feedback/Dialog/AlertDialog/ConfirmAlertDialog',
  component: ConfirmAlertDialog,
  args: {
    title: 'warning',
    description: '저장하시겠습니까?',
    footerType: 'confirm',
    contentSize: 'medium',
    confirmLabel: '확인',
    cancelLabel: '취소',
    portalContainer: 'body',
  },
  argTypes: {
    title: {
      control: { type: 'radio' },
      options: ['warning', 'success', 'none'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'warning' } },
      description: 'ConfirmAlertDialog 의 타이틀 아이콘을 선택합니다.',
    },
    footerType: {
      control: { type: 'radio' },
      options: ['update', 'confirm'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'confirm' } },
      description: '버튼 타입을 선택합니다.',
    },
    description: {
      control: { type: 'text' },
      table: { type: { summary: 'string' }, defaultValue: { summary: '저장하시겠습니까?' } },
      description: '대화 상자에 표시할 내용을 입력합니다.',
    },
    contentSize: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'medium' } },
      description: '컨텐츠 크기를 설정합니다.',
    },
    confirmLabel: {
      control: { type: 'text' },
      table: { type: { summary: 'string' }, defaultValue: { summary: '확인' } },
      description: '확인 버튼의 텍스트를 설정합니다.',
    },
    cancelLabel: {
      control: { type: 'text' },
      table: { type: { summary: 'string' }, defaultValue: { summary: '취소' } },
      description: '취소 버튼의 텍스트를 설정합니다.',
    },
    onConfirm: {
      table: { type: { summary: 'function' } },
      description: '확인 버튼 클릭 시 실행되는 함수입니다.',
    },
    onCancel: {
      table: { type: { summary: 'function' } },
      description: '취소 버튼 클릭 시 실행되는 함수입니다.',
    },
    portalContainer: {
      control: { type: 'radio' },
      options: ['body', 'area'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'body' } },
      description: '포탈 위치를 선택합니다 (body=전역, area=특정 영역).',
    },
  },
  parameters: {
    docs: {
      description: {
        component: ['ConfirmAlertDialog 컴포넌트의 문서입니다.', '저장이나 삭제 확인용 대화상자로 사용됩니다.'].join(
          '<br/>',
        ),
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
  parameters: {
    docs: {
      description: {
        story: 'ConfirmAlertDialog 컴포넌트의 기본 사용 예시입니다.',
      },
    },
  },
  render: Template,
};

export const title: Story = {
  argTypes: {
    title: { table: { disable: true } },
    onConfirm: { table: { disable: true } },
    onCancel: { table: { disable: true } },
    portalContainer: { table: { disable: true } },
    footerType: {
      control: { type: 'radio' },
      options: ['confirm', 'update'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Alert-dialog의 상단 아이콘 타입을 정할 수 있습니다.',
          'Warning과 Success, 미설정 세 가지 중에서 선택할 수 있습니다.',
        ].join('<br/>'),
      },
      source: {
        code: null,
      },
    },
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
  argTypes: {
    title: {
      control: { type: 'radio' },
      options: [...Object.keys(ICON_MAP), '미설정'],
    },
    description: {
      control: { type: 'text' },
      description: '내용 입력',
    },
    onConfirm: { table: { disable: true } },
    onCancel: { table: { disable: true } },
    contentSize: { table: { disable: true } },
    portalContainer: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['Alert-dialog의 사이즈를 확인할 수 있습니다.', '기본값은 medium 입니다.'].join('<br/>'),
      },
      source: {
        code: null,
      },
    },
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
          <div>medium</div>
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
  argTypes: {
    title: {
      control: { type: 'radio' },
      options: [...Object.keys(ICON_MAP), '미설정'],
      description: '타이틀 아이콘 선택',
    },
    description: {
      description: '내용 입력',
    },
    onConfirm: { table: { disable: true } },
    onCancel: { table: { disable: true } },
    contentSize: { table: { disable: true } },
    footerType: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Alert-dialog의 하단 버튼 타입을 정할 수 있습니다.',
          '확인 / 취소 버튼 노출은 update, 확인 버튼 단독은 confirm 으로 제어합니다.',
        ].join('<br/>'),
      },
      source: {
        code: null,
      },
    },
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
