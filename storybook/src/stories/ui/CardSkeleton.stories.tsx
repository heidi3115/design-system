import type { Meta, StoryObj } from '@storybook/react';
import { CardSkeleton } from '@common/ui';
import { skeletonVariants } from '@common/ui/components/Skeleton/Skeleton.tsx';

const meta: Meta<typeof CardSkeleton> = {
  title: 'UI/Skeleton/CardSkeleton',
  component: CardSkeleton,
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.keys(skeletonVariants.variants.variant),
      description: 'skeleton 컴포넌트 지정 색상 설정',
    },
    textSize: {
      control: 'radio',
      options: Object.keys(skeletonVariants.variants.size),
      description: 'card형 skeleton의 text 사이즈 설정. 기본 값은 basic이다.',
    },
    cardSize: {
      control: 'radio',
      options: Object.keys(skeletonVariants.variants.size),
      description: 'card형 skeleton의 card 사이즈 설정. 기본 값은 large이다.',
    },
    className: {
      control: 'text',
      description: 'card형 Skeleton의 외곽 div에 적용되는 className',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type SkeletonStory = StoryObj<typeof CardSkeleton>;

export const Default: SkeletonStory = {
  parameters: {
    docs: {
      description: {
        story: 'Card형 Skeleton 컴포넌트 예시',
      },
    },
  },
  args: {
    variant: 'default',
    textSize: 'basic',
    cardSize: 'large',
  },
  render: (args) => {
    return <CardSkeleton {...args} />;
  },
};

export const Size: SkeletonStory = {
  parameters: {
    docs: {
      description: {
        story: 'Skeleton 컴포넌트의 지정된 size를 확인할 수 있다.',
      },
    },
  },
  args: {
    variant: 'default',
    textSize: 'basic',
    cardSize: 'large',
  },
  render: (args) => {
    return <CardSkeleton {...args} />;
  },
};
