import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants } from '@common/ui/components/Badge';
import { BookmarkIcon, CheckIcon } from '@common/ui/icons';
import { Button, GradeBadge } from '@common/ui';

const meta: Meta<typeof GradeBadge> = {
  title: 'UI/Badge/GradeBadge',
  component: GradeBadge,
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description: 'Slot을 통해 Badge 스타일을 다른 태그에 이식하여 badge 스타일을 적용할 때 사용',
    },
    grade: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.grade),
      table: { defaultValue: { summary: 'info' } },
      description: '필수값. grade 스타일 (info, boundary, alert, critical, urgency) 중에서 선택해야 합니다.',
    },
    children: {
      control: 'text',
      table: { defaultValue: { summary: 'GradeBadge' } },
      description: 'GradeBadge 내부에 들어갈 내용을 표기합니다.',
    },
    className: {
      control: 'text',
      table: { defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
  args: {
    children: 'GradeBadge',
    grade: 'info',
    asChild: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'GradeBadge 컴포넌트의 문서입니다. GradeBadge 의 경우 기본 Badge 에서 variant는 "grading" 를 고정한 컴포넌트로서, GradeBadge 는 grade 등을 필수값으로 받습니다.<br/>asChild로 전환을 하더라도 해당 GradeBadge 의 스타일을 우선적으로 받도록 되어있으니 해당 부분에 유의하셔야 합니다.<br/>기본적인 스타일은 Badge를 따르되 GradeBadge 별도 스타일이 있습니다.',
      },
    },
  },
};

export default meta;

type GradeStory = StoryObj<typeof GradeBadge>;

export const Default: GradeStory = {
  parameters: {
    docs: {
      description: {
        story: '기본 GradeBadge 컴포넌트의 예시입니다.',
      },
    },
  },
  render: (args) => {
    return <GradeBadge {...args} />;
  },
};

// variant : grading 일 때의 Badge 렌더링 스토리
export const Basic: GradeStory = {
  args: {
    asChild: false,
    grade: 'info',
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { disable: true },
    },
    children: {
      control: 'text',
      table: { disable: true },
    },
    grade: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.grade),
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'variant 가 `grading` 일 때의 Badge 렌더링 스토리입니다. `grade` 를 받으며, grade 는 목록에서 선택하실 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[]).map((grade) => (
            <div className={'flex flex-col gap-0.5'} key={grade}>
              <span className="text-xs text-juiText-blue">{grade}</span>
              <GradeBadge {...args} grade={grade}>
                {grade}
              </GradeBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">With Icon</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[]).map((grade) => (
            <div className={'flex flex-col gap-0.5'} key={grade}>
              <span className="text-xs text-juiText-blue">{grade}</span>
              <GradeBadge {...args} grade={grade}>
                <CheckIcon size={'small'} />
                {grade}
              </GradeBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          Only Icon
          <span className={'block text-xs'}>
            children안에 Icon만 있다 하더라도 앞에 grade 별 아이콘이 있는 GradeBadge 스타일 자체는 유지되니
            유의해주세요.
          </span>
        </span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[]).map((grade) => (
            <div className={'flex flex-col gap-0.5'} key={grade}>
              <span className="text-xs text-juiText-blue">{grade}</span>
              <GradeBadge {...args} grade={grade}>
                <BookmarkIcon size={'small'} />
              </GradeBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AsChild: GradeStory = {
  args: {
    asChild: true,
    grade: 'info',
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      table: { disable: false, defaultValue: { summary: 'true' } },
    },
    children: {
      control: 'text',
      table: { disable: false },
    },
    grade: {
      control: 'select',
      options: Object.keys(badgeVariants.variants.grade),
      table: { disable: false },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'asChild 는 boolean 으로서 true 시 Slot을 이용하여 자식의 컴포넌트 혹은 태그로 치환되고 스타일은 부모의 것을 유지할 수 있게 됩니다. 현재로서는 대표적인 예시를 Button, a, div 로 잡았습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          asChild - Button
          <span className={'block text-xs'}>asChild를 적용 시 children 언제나 단일 요소여야 합니다.</span>
        </span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">grade: {args.grade}</span>
            <GradeBadge {...args}>
              <Button>{args.children}</Button>
            </GradeBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">grade: {args.grade}</span>
            <GradeBadge {...args}>
              <Button>
                <BookmarkIcon size={'small'} />
                {args.children}
              </Button>
            </GradeBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">
          asChild - a 태그
          <span className={'block text-xs'}>
            a 태그의 경우, normalize.css 에서 data-slot이 button이 아닌 경우 배경이 transparent 으로 고정되는 부분
            유의해주세요.
          </span>
        </span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">grade: {args.grade}</span>
            <GradeBadge {...args}>
              <a href={'/'} target={'_blank'}>
                {args.children}
              </a>
            </GradeBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">grade: {args.grade}</span>
            <GradeBadge {...args}>
              <a href={'/'} target={'_blank'}>
                <BookmarkIcon size={'small'} />
                {args.children}
              </a>
            </GradeBadge>
          </div>
        </div>
      </div>
      <hr />
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">asChild - div 태그</span>
        <div className="flex flex-row flex-wrap gap-4 p-5">
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">grade: {args.grade}</span>
            <GradeBadge {...args}>
              <div>{args.children}</div>
            </GradeBadge>
          </div>
          <div className={'flex flex-col gap-1'}>
            <span className="text-xs text-juiText-blue text-center">grade: {args.grade}</span>
            <GradeBadge {...args}>
              <div>
                <BookmarkIcon size={'small'} />
                {args.children}
              </div>
            </GradeBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};
