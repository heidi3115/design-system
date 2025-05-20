import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle, alertVariants } from '@common/ui/components';

// 👇 우리가 사용할 args 타입을 명시
type AlertStoryArgs = {
  variant: keyof typeof alertVariants.variants.variant;
  title: string;
  description: string;
};

const meta: Meta<AlertStoryArgs> = {
  title: 'ui/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(alertVariants.variants.variant),
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<AlertStoryArgs>;

const Template = (args: AlertStoryArgs) => (
  <Alert variant={args.variant}>
    <AlertTitle>{args.title}</AlertTitle>
    <AlertDescription>{args.description}</AlertDescription>
  </Alert>
);

export const Default: Story = {
  render: Template,
  args: {
    variant: 'default',
    title: '타이틀',
    description: '내용',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(Object.keys(alertVariants.variants.variant) as (keyof typeof alertVariants.variants.variant)[]).map(
        (variant) => (
          <div key={variant}>
            <div className="mb-3">{variant}</div>
            <Alert variant={variant}>
              <AlertTitle>타이틀</AlertTitle>
              <AlertDescription>내용</AlertDescription>
            </Alert>
          </div>
        ),
      )}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
