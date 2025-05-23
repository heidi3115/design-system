import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@common/ui/components';
import { AlertCircleIcon, CheckCircleIcon } from '@common/ui/icons';
import { Button } from '@common/ui';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@common/ui/components/Alert';

type AlertDialogStoryArgs = {
  titleIcon?: 'warning' | 'success' | 'none';
  description: string;
  footerType: 'update' | 'confirm';
  contentSize?: 'small' | 'medium' | 'large';
};

const ICON_MAP = {
  warning: <AlertCircleIcon />,
  success: <CheckCircleIcon />,
};

const meta: Meta<AlertDialogStoryArgs> = {
  title: 'ui/AlertDialog',
  component: AlertDialog,
  argTypes: {
    titleIcon: {
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
  },
  args: {
    titleIcon: 'warning',
    description: '저장하시겠습니까?',
    footerType: 'confirm',
    contentSize: 'medium',
  },
  parameters: {
    docs: {
      description: {
        component: '조립식 AlertDialog 컴포넌트 문서',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertDialogStoryArgs>;

const iconMap = {
  warning: <AlertCircleIcon />,
  success: <CheckCircleIcon />,
  none: null,
};

const Template = (args: AlertDialogStoryArgs) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button>Alert 활성화</Button>
      </AlertDialogTrigger>
      <AlertDialogContent contentSize={args.contentSize}>
        <AlertDialogHeader>
          <AlertDialogTitle>{iconMap[args.titleIcon ?? 'none']}</AlertDialogTitle>
          <AlertDialogDescription>{args.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>확인</AlertDialogAction>
          {args.footerType !== 'confirm' && <AlertDialogCancel>취소</AlertDialogCancel>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const Default: Story = {
  render: Template,
};

export const TitleIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Alert-dialog의 상단 아이콘 타입을 정할 수 있다. <br/> Warning과 Success, 미설정 세 가지 중에 선택한다.',
      },
    },
    controls: {
      exclude: ['titleIcon'],
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
          <Alert className="flex flex-col w-[243px] border border-juiPrimary items-center gap-[10px] bg-juiBackground text-white rounded-none p-[20px]">
            <AlertTitle className="items-center">
              <AlertCircleIcon />
            </AlertTitle>
            <AlertDescription className="text-white">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
              {args.footerType !== 'confirm' && <Button>취소</Button>}
            </div>
          </Alert>
        </div>
        <div className="flex flex-col gap-2">
          <div>Success</div>
          <Alert className="flex flex-col w-[243px] border border-juiPrimary items-center gap-[10px] bg-juiBackground text-white rounded-none p-[20px]">
            <AlertTitle className="items-center">
              <CheckCircleIcon />
            </AlertTitle>
            <AlertDescription className="text-white">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
              {args.footerType !== 'confirm' && <Button>취소</Button>}
            </div>
          </Alert>
        </div>
        <div className="flex flex-col gap-2">
          <div>미설정</div>
          <Alert className="flex flex-col w-[243px] border border-juiPrimary items-center gap-[10px] bg-juiBackground text-white rounded-none p-[20px]">
            <AlertTitle className="items-center"></AlertTitle>
            <AlertDescription className="text-white">{args.description}</AlertDescription>
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

export const FooterType: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Alert-dialog의 하단 버튼 타입을 정할 수 있다. <br/> 확인 / 취소 버튼 노출은 update, 확인 버튼 단독은 confirm으로 제어한다.',
      },
    },
    controls: {
      exclude: ['footerType'],
    },
  },
  argTypes: {
    titleIcon: {
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
          <Alert className="flex flex-col w-[243px] border border-juiPrimary items-center gap-[10px] bg-juiBackground text-white rounded-none p-[20px]">
            <AlertTitle className="items-center">
              {args.titleIcon === 'warning' && <AlertCircleIcon />}
              {args.titleIcon === 'success' && <CheckCircleIcon />}
            </AlertTitle>
            <AlertDescription className="text-white">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
              <Button>취소</Button>
            </div>
          </Alert>
        </div>
        <div className="flex flex-col gap-2">
          <div>Confirm</div>
          <Alert className="flex flex-col w-[243px] border border-juiPrimary items-center gap-[10px] bg-juiBackground text-white rounded-none p-[20px]">
            <AlertTitle className="items-center">
              {args.titleIcon === 'warning' && <AlertCircleIcon />}
              {args.titleIcon === 'success' && <CheckCircleIcon />}
            </AlertTitle>
            <AlertDescription className="text-white">{args.description}</AlertDescription>
            <div className="flex gap-1">
              <Button variant="primary">확인</Button>
            </div>
          </Alert>
        </div>
      </div>
    );
  },
};
