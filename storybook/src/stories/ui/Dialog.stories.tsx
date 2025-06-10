import type { Meta, StoryObj } from '@storybook/react';
import { type ReactElement } from 'react';
import { Button, Input } from '@common/ui';
import BaseDialog from '@common/ui/components/Dialog/BaseDialog.tsx';
import { EditIcon } from '@common/ui/icons';

type DialogStoryArgs = {
  title: string;
  titleIcon?: ReactElement;
  description: string;
  contentSize?: 'small' | 'medium' | 'large';
  confirmLabel?: string;
  cancelLabel?: string;
  footerLocate?: 'start' | 'center' | 'end';
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
    confirmLabel: {
      control: { type: 'text' },
      description: '확인 버튼 라벨',
    },
    cancelLabel: {
      control: { type: 'text' },
      description: '취소 버튼 라벨',
    },
    footerLocate: {
      control: { type: 'radio' },
      description: '버튼 위치',
    },
  },
  args: {
    title: 'Example Title',
    titleIcon: <EditIcon />,
    description: '내용 예시',
    contentSize: 'medium',
    confirmLabel: '저장',
    cancelLabel: '취소',
    footerLocate: 'center',
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
  // const [open, setOpen] = useState(false);

  return (
    <BaseDialog
      trigger={<Button>{args.title}</Button>}
      titleIcon={args.titleIcon}
      title="Example Title"
      buttons={[
        {
          langKey: '저장',
          icon: 'check',
          color: 'primary',
          handleClick: () => console.log('확인'),
        },
        {
          langKey: '삭제',
          icon: 'delete',
          color: 'error',
          handleClick: () => console.log('삭제'),
          close: true,
        },
        {
          langKey: '닫기',
          icon: 'cancel',
          color: 'secondary',
          close: true,
        },
      ]}>
      <Input />
    </BaseDialog>
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
