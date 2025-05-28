import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Label } from '@common/ui';

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
  title: 'ui/Label',
  component: Label,
  args: {},
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

const Template = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
};

export const Default: Story = {
  render: Template,
};
