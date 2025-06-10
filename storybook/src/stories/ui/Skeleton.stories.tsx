import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@common/ui';
import { skeletonVariants } from '@common/ui/components/Skeleton/Skeleton.tsx';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.keys(skeletonVariants.variants.variant),
      description: 'skeleton 컴포넌트 지정 색상 설정',
    },
    size: {
      control: 'radio',
      options: Object.keys(skeletonVariants.variants.size),
      description: 'skeleton 지정 사이즈 설정. 기본 값은 basic이다.',
    },
    className: {
      control: 'text',
      table: { defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
};

export default meta;

type SkeletonStory = StoryObj<typeof Skeleton>;

export const Default: SkeletonStory = {
  parameters: {
    docs: {
      description: {
        story: '기본 Skeleton 컴포넌트 예시',
      },
    },
  },
  args: {
    variant: 'default',
    size: 'basic',
  },
  render: (args) => {
    return <Skeleton {...args} />;
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
    size: 'basic',
  },
  render: (args) => {
    return <Skeleton {...args} />;
  },
};
