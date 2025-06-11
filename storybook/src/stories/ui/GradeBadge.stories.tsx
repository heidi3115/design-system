import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants, GradeBadge } from '@common/ui/components/Badge';

const gradeKeys = Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[];

const meta: Meta<typeof GradeBadge> = {
  title: 'UI/Badge/GradeBadge',
  component: GradeBadge,
  args: {
    isBtn: false,
    grade: 'info',
    children: 'GradeBadge',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description:
        'isBtn 활성화 시, 버튼처럼 hover:, active:, focus:의 이벤트 상태 시 변화가 추가되며, cursor 및 pointer events 관련 css가 추가됩니다.',
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
      description: 'GradeBadge 내부에 들어갈 내용을 표기합니다. `string` 만 받을 수 있습니다.',
    },
    className: {
      control: 'text',
      table: { defaultValue: { summary: '' } },
      description: '추가적으로 적용할 Tailwind CSS 클래스',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'GradeBadge 컴포넌트의 문서입니다. GradeBadge 는 등급에 대한 표기를 전문으로 하는 Badge 로서 각 grade별 아이콘이 지정되어 있습니다.<br/>GradeBadge 의 경우 기본 Badge 에서 variant는 "grading" 를 고정한 컴포넌트입니다.<br/>GradeBadge 는 grade, children가 필수값이며 이들만 받을 수 있습니다. grade 별 아이콘이 고정되어 있고 children는 `string` 으로만 받을 수 있습니다.<br/>기본적인 스타일은 Badge를 따르되 GradeBadge 별도 스타일이 고정되어 있습니다.<br/>props 들의 예시와 isBtn 대한 내역은 아래 스토리에서 확인해주세요. 다만, asChild는 기본 Badge 컴포넌트에서만 가능하다는 것을 유의해주세요.',
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

export const Grade: GradeStory = {
  args: {
    isBtn: false,
    grade: 'info',
  },
  argTypes: {
    isBtn: {
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
          'GradeBadge 에서 쓰이는 모든 `grade`의 종류와 다양한 예시들을 확인하실 수 있습니다.<br/>GradeBadge 의 경우, grade 별 아이콘이 고정되어 있고 기본값은 `info` 로 처리되고 있습니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-3'}>
        <span className="text-sm font-bold">Text</span>
        <div className="flex flex-wrap gap-4 p-5">
          {(Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[]).map((grade) => (
            <div className={'flex flex-col gap-0.5 text-center'} key={grade}>
              <span className="text-xs text-juiText-blue">{grade}</span>
              <GradeBadge {...args} grade={grade}>
                {grade}
              </GradeBadge>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </div>
  ),
};

export const IsBtn: GradeStory = {
  args: {
    isBtn: true,
    grade: 'info',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { disable: false, defaultValue: { summary: 'true' } },
    },
    children: {
      control: 'text',
      table: { disable: false },
    },
    grade: {
      control: 'select',
      options: gradeKeys,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'isBtn 는 boolean 으로서 true 시 button 처럼 hover:, active:, focus:의 이벤트 적인 내역들에 대한 이펙트가 추가됩니다. 기본적으로는 false 입니다.<br/>GradeBadge 의 경우 border 나 배경색의 변화 보다는 isBtn 활성화 시의 이펙트가 조금 다르게 처리됩니다.',
      },
    },
  },
  render: (args) => (
    <div className={'flex flex-col gap-4'}>
      <span className="text-sm font-bold">
        isBtn
        <span className={'block text-xs'}>
          isBtn 를 적용해도 해당의 컴포넌트 및 태그 자체는 Badge 에서 벗어나는 것은 아닙니다.
        </span>
      </span>
      <div className="flex flex-row flex-wrap gap-4 p-5">
        {gradeKeys.map((grade) => (
          <div className={'flex flex-col gap-1 text-center'} key={grade}>
            <span className="text-xs text-juiText-blue">{`grage: ${grade} | isBtn: ${args.isBtn}`}</span>
            <GradeBadge {...args} grade={grade} />
          </div>
        ))}
      </div>
    </div>
  ),
};
