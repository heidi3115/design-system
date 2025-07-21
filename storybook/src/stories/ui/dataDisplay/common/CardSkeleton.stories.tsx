import type { Meta, StoryObj } from '@storybook/react';
import { CardSkeleton } from '@common/ui';
import { skeletonVariants } from '@common/ui/components/Skeleton/Skeleton.tsx';

const variantArr = Object.keys(skeletonVariants.variants.variant);
const sizeArr = Object.keys(skeletonVariants.variants.size);

const meta: Meta<typeof CardSkeleton> = {
  title: 'UI/DataDisplay/Common/Skeleton/CardSkeleton',
  component: CardSkeleton,
  args: {
    variant: 'default',
    textSize: 'basic',
    cardSize: 'large',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: variantArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description: 'CardSkeleton 컴포넌트의 색상 스타일을 지정하는 props 입니다.',
    },
    textSize: {
      control: 'radio',
      options: sizeArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'basic' } },
      description: 'CardSkeleton의 텍스트 영역 크기를 지정하는 props 입니다.',
    },
    cardSize: {
      control: 'radio',
      options: sizeArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'large' } },
      description: ['CardSkeleton의 카드 영역 크기를 지정하는 props 입니다.'].join('<br/>'),
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: 'CardSkeleton의 외곽 div 에 적용할 Tailwind CSS 클래스명입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'CardSkeleton 컴포넌트의 문서입니다. CardSkeleton은 카드 형태의 콘텐츠가 로딩 중일 때 보여주는 placeholder UI 요소입니다.',
          '텍스트 영역과 카드 영역의 크기를 각각 설정할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type SkeletonStory = StoryObj<typeof CardSkeleton>;

export const Default: SkeletonStory = {
  args: {
    variant: 'default',
    textSize: 'basic',
    cardSize: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card형 Skeleton 컴포넌트 예시입니다.',
      },
    },
  },
  render: (args) => {
    return <CardSkeleton {...args} />;
  },
};

export const Size: SkeletonStory = {
  parameters: {
    docs: {
      description: {
        story: 'Card형 Skeleton 컴포넌트의 size 예시들을 확인할 수 있습니다.',
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
