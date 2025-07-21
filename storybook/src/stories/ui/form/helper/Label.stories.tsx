import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Input, Label } from '@common/ui';
import type { ComponentProps } from 'react';

// 공통 상수
const componentExampleOptions = ['checkbox', 'input'] as const;

type ComponentExample = (typeof componentExampleOptions)[number];

type Args = ComponentProps<typeof Label> & {
  componentExample: ComponentExample;
};

const meta: Meta<Args> = {
  title: 'UI/Form/Helper/Label',
  component: Label,
  args: {
    componentExample: 'checkbox',
    children: 'Label Text',
    htmlFor: 'testId',
    className: undefined,
  },
  argTypes: {
    componentExample: {
      control: 'select',
      options: componentExampleOptions,
      table: {
        type: { summary: componentExampleOptions.join(' | ') },
        defaultValue: { summary: 'checkbox' },
      },
      description: [
        'Storybook 에서 Label과 연결할 컴포넌트를 선택합니다.',
        'Label 연결 컴포넌트의 예시로, 실제 개발에서는 이 prop을 사용하지 않습니다.',
      ].join('<br/>'),
    },
    children: {
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Label Text' },
      },
      description: 'Label에 표시할 텍스트 또는 내용입니다.',
    },
    htmlFor: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'testId' },
      },
      description: [
        '연결하고자 하는 form 요소의 id와 동일하게 지정합니다.',
        '접근성을 위해 반드시 설정해야 합니다.',
      ].join('<br/>'),
    },
    className: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'Label에 적용할 CSS 클래스명입니다.',
    },
    // 나머지 HTML 속성들은 테이블에서 숨김
    onClick: { table: { disable: true } },
    onMouseEnter: { table: { disable: true } },
    onMouseLeave: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    ref: { table: { disable: true } },
    key: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Label 컴포넌트의 문서입니다.',
          'Label 컴포넌트는 form 요소와 연결되어 접근성을 향상시키는 컴포넌트입니다.',
          'htmlFor 속성을 통해 연결된 form 요소의 id와 일치시켜야 합니다.',
          'Label을 클릭하면 연결된 form 요소가 포커스되거나 활성화됩니다.',
          'Radix UI의 Label 컴포넌트를 기반으로 구현되었습니다.',
        ].join('<br/>'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '기본 Label 컴포넌트의 예시입니다.',
          'form 요소와 연결되어 접근성을 향상시킵니다.',
          'Label을 클릭하면 연결된 form 요소가 포커스되거나 활성화됩니다.',
        ].join('<br/>'),
      },
    },
  },
  render: ({ componentExample, children, htmlFor, className }) => {
    return (
      <div className="flex items-center space-x-2">
        {componentExample === 'checkbox' ? <Checkbox id={htmlFor} /> : <Input id={htmlFor} />}
        <Label htmlFor={htmlFor} className={className}>
          {children}
        </Label>
      </div>
    );
  },
};

export const WithDifferentElements: Story = {
  argTypes: {
    componentExample: { table: { disable: true } },
    htmlFor: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '다양한 form 요소와 연결된 Label의 예시입니다.',
          'Checkbox와 Input 요소 모두와 연결할 수 있습니다.',
          '각 요소의 id와 Label의 htmlFor가 일치해야 합니다.',
        ].join('<br/>'),
      },
    },
  },
  render: ({ children }) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="checkbox-example" />
        <Label htmlFor="checkbox-example">{children}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Input id="input-example" placeholder="Enter text..." />
        <Label htmlFor="input-example">{children}</Label>
      </div>
    </div>
  ),
};

export const Styling: Story = {
  args: {
    className: 'text-blue-600 font-bold',
  },
  argTypes: {
    componentExample: { table: { disable: true } },
    htmlFor: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Label 컴포넌트의 스타일링 예시입니다.',
          'className을 통해 다양한 스타일을 적용할 수 있습니다.',
          '기본적으로 텍스트 색상, 폰트 굵기, 크기 등을 변경할 수 있습니다.',
        ].join('<br/>'),
      },
    },
  },
  render: ({ children, className }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="styled-checkbox" />
          <Label htmlFor="styled-checkbox" className={className}>
            {children}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-checkbox" />
          <Label htmlFor="default-checkbox">Default Label</Label>
        </div>
      </div>
    );
  },
};

export const AccessibilityExample: Story = {
  argTypes: {
    componentExample: { table: { disable: true } },
    htmlFor: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'Label 컴포넌트의 접근성 기능을 보여주는 예시입니다.',
          '스크린 리더가 Label과 연결된 form 요소를 올바르게 인식합니다.',
          'Label 클릭 시 연결된 요소가 활성화되어 키보드 사용자에게 도움이 됩니다.',
        ].join('<br/>'),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="accept-terms" />
        <Label htmlFor="accept-terms">약관에 동의합니다</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">뉴스레터 구독</Label>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email-input">이메일 주소</Label>
        <Input id="email-input" type="email" placeholder="example@domain.com" />
      </div>
    </div>
  ),
};
