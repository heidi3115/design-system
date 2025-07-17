import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@common/ui';
import { skeletonVariants } from '@common/ui/components/Skeleton/Skeleton.tsx';

const variantArr = Object.keys(skeletonVariants.variants.variant);
const sizeArr = Object.keys(skeletonVariants.variants.size);

const meta: Meta<typeof Skeleton> = {
  title: 'UI/DataDisplay/Common/Skeleton',
  component: Skeleton,
  args: {
    variant: 'default',
    size: 'basic',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: variantArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      description: 'Skeleton 컴포넌트의 색상 스타일을 지정하는 props 입니다.',
    },
    size: {
      control: 'radio',
      options: sizeArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'basic' } },
      description: 'Skeleton 컴포넌트의 크기를 지정하는 props 입니다.',
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스명입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Skeleton 컴포넌트의 문서입니다. Skeleton은 콘텐츠가 로딩 중일 때 보여주는 플레이스홀더 UI 요소입니다.',
          '다양한 variant와 size 옵션을 통해 용도에 맞게 사용할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;

type SkeletonStory = StoryObj<typeof Skeleton>;

export const Default: SkeletonStory = {
  parameters: {
    docs: {
      description: {
        story: '기본 Skeleton 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => {
    return <Skeleton {...args} />;
  },
};

export const Size: SkeletonStory = {
  parameters: {
    docs: {
      description: {
        story: 'Skeleton 컴포넌트의 다양한 size별 예시를 확인할 수 있습니다.',
      },
    },
  },
  render: (args) => {
    return <Skeleton {...args} />;
  },
};
