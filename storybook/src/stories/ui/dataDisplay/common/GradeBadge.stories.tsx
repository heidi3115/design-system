import type { Meta, StoryObj } from '@storybook/react';
import { badgeVariants, GradeBadge } from '@common/ui/components/Badge';

const gradeArr = Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[];

const meta: Meta<typeof GradeBadge> = {
  title: 'UI/DataDisplay/Common/Badge/GradeBadge',
  component: GradeBadge,
  args: {
    isBtn: false,
    grade: 'info',
    children: 'GradeBadge',
  },
  argTypes: {
    isBtn: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'isBtn 활성화 시 버튼처럼 hover, active, focus 이벤트 상태 시 변화가 추가되며,',
        'cursor 및 pointer events 관련 CSS가 추가됩니다.',
      ].join('<br/>'),
    },
    grade: {
      control: 'select',
      options: gradeArr,
      table: { type: { summary: 'string' }, defaultValue: { summary: 'info' } },
      description: [
        'GradeBadge의 등급 스타일을 지정하는 필수 props 입니다.',
        'info, boundary, alert, critical, urgency 중에서 선택해야 합니다.',
      ].join('<br/>'),
    },
    children: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'GradeBadge' } },
      description: [
        'GradeBadge 내부에 들어갈 내용을 지정하는 필수 props 입니다.',
        'string 타입만 받을 수 있습니다.',
      ].join('<br/>'),
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
          'GradeBadge 컴포넌트의 문서입니다. GradeBadge는 등급에 대한 표기를 전문으로 하는 Badge 로 각 grade별 아이콘이 지정되어 있습니다.',
          'GradeBadge는 기본 Badge 에서 variant를 "grading"으로 고정한 컴포넌트입니다.',
          'grade, children이 필수값이며, grade별 아이콘이 고정되어 있고 children는 string 타입으로만 받을 수 있습니다.',
          '기본적인 스타일은 Badge를 따르되 GradeBadge 별도 스타일이 고정되어 있습니다.',
          'asChild는 기본 Badge 컴포넌트에서만 가능합니다.',
        ].join('<br/>'),
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
        story: [
          'GradeBadge 에서 쓰이는 모든 `grade`의 종류와 다양한 예시들을 확인할 수 있습니다.',
          'GradeBadge 의 경우, grade 별 아이콘이 고정되어 있고 기본값은 `info` 로 처리되고 있습니다.',
        ].join('<br/>'),
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
      options: gradeArr,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'isBtn 는 boolean 으로 true 시 button 처럼 hover:, active:, focus:의 이벤트 적인 내역들에 대한 이펙트가 추가됩니다. 기본적으로는 false 입니다.',
          'GradeBadge 의 경우 border 나 배경색의 변화 보다는 isBtn 활성화 시의 이펙트가 조금 다르게 처리됩니다.',
        ].join('<br/>'),
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
        {gradeArr.map((grade) => (
          <div className={'flex flex-col gap-1 text-center'} key={grade}>
            <span className="text-xs text-juiText-blue">{`grade: ${grade} | isBtn: ${args.isBtn}`}</span>
            <GradeBadge {...args} grade={grade} />
          </div>
        ))}
      </div>
    </div>
  ),
};
