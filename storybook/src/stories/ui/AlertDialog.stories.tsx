import type { Meta, StoryObj } from '@storybook/react';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@common/ui/components';
import { Button } from '@common/ui';

type AlertDialogStoryArgs = {
  title: string;
  description: string;
};

const meta: Meta<AlertDialogStoryArgs> = {
  title: 'ui/AlertDialog',
  component: AlertDialog,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: '사용자 설정',
    description: '저장하시겠습니까?',
  },
};

export default meta;
type Story = StoryObj<AlertDialogStoryArgs>;

const Template = (args: AlertDialogStoryArgs) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="jui">Alert 열기</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{args.title}</AlertDialogTitle>
        <AlertDialogDescription>{args.description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction>확인</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export const Default: Story = {
  render: Template,
};
