import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Input, Label } from '@common/ui';

type ComponentExample = 'checkbox' | 'input';

type Args = {
  componentExample: ComponentExample;
  children: string;
  htmlFor: string;
};

const meta: Meta<Args> = {
  title: 'ui/Label',
  component: Label,
  argTypes: {
    componentExample: {
      control: {
        type: 'select',
      },
      description: 'Label 연결 컴포넌트(예시)',
      options: ['checkbox', 'input'],
    },
    children: {
      control: 'text',
    },
    htmlFor: {
      control: 'text',
      description: '연결하고자 하는 컴포넌트와 동일하게 지정',
    },
  },
  args: {
    componentExample: 'checkbox',
    children: 'Label Text',
    htmlFor: 'testId',
  },
  parameters: {
    docs: {
      description: {
        component: 'Label 컴포넌트 문서',
      },
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  render: ({ componentExample, children, htmlFor }) => {
    return (
      <div className="flex items-center space-x-2">
        {componentExample === 'checkbox' ? <Checkbox id={htmlFor} /> : <Input id={htmlFor} />}
        <Label htmlFor={htmlFor}>{children}</Label>
      </div>
    );
  },
};
