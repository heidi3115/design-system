import type { Meta, StoryObj } from '@storybook/react';

import { AlertDialog } from '@common/ui/components';
import { AlertCircleIcon, CheckSquareIcon } from '@common/ui/icons';
import { useState } from 'react';
import { Button } from '@common/ui';
import { Alert, AlertDescription, AlertTitle } from '@common/ui/components/Alert';

type AlertDialogStoryArgs = {
  titleIcon: keyof typeof ICON_MAP;
  description: string;
  footerType: string;
};

const ICON_MAP = {
  warning: <AlertCircleIcon />,
  success: <CheckSquareIcon />,
};

const BUTTON_TYPE = {
  update: 'update',
  confirm: 'confirm',
};

const meta: Meta<AlertDialogStoryArgs> = {
  title: 'ui/AlertDialog',
  component: AlertDialog,
  argTypes: {
    titleIcon: {
      control: { type: 'radio' },
      options: Object.keys(ICON_MAP),
      description: '타이틀 아이콘 선택',
    },
    footerType: {
      control: { type: 'radio' },
      options: Object.keys(BUTTON_TYPE),
      description: '버튼 타입 선택',
    },
    description: {
      control: { type: 'text' },
      description: '내용 입력',
    },
  },
  args: {
    titleIcon: 'warning',
    description: '저장하시겠습니까?',
    footerType: 'confirm',
  },
};

export default meta;
type Story = StoryObj<AlertDialogStoryArgs>;

const Template = (args: AlertDialogStoryArgs) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Alert 활성화</Button>
      <AlertDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        description={args.description}
        titleIcon={args.titleIcon}
        footerType={args.footerType}
      />
    </>
  );
};

export const Default: Story = {
  render: Template,
};

export const TitleIcon: Story = {
  parameters: {
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
              <CheckSquareIcon />
            </AlertTitle>
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
    controls: {
      exclude: ['footerType'],
    },
  },
  argTypes: {
    titleIcon: {
      control: { type: 'radio' },
      options: Object.keys(ICON_MAP),
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
              {args.titleIcon === 'warning' ? <AlertCircleIcon /> : <CheckSquareIcon />}
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
              {args.titleIcon === 'warning' ? <AlertCircleIcon /> : <CheckSquareIcon />}
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
