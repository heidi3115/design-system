import type { Meta, StoryObj } from '@storybook/react';

import { AlertDialog } from '@common/ui/components';
import { AlertCircleIcon, CheckSquareIcon } from '@common/ui/icons';
import { useState } from 'react';
import { Button } from '@common/ui';

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
